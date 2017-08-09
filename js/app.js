var posts = [{header: "This is a Title", content: "This is Quality Content Yo"}] // comment out in production
//var posts = []
document.onload = () => {
  $('.dropify').dropify();

}
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCIMpxIBDw3lSWGNvAE3XpUOOncUrbNYvA",
    authDomain: "shah-cloud.firebaseapp.com",
    databaseURL: "https://shah-cloud.firebaseio.com",
    projectId: "shah-cloud",
    storageBucket: "gs://shah-cloud.appspot.com",
    messagingSenderId: "572378874955"
  };
firebase.initializeApp(config);


class App extends React.Component {
    constructor() {
      super();
      this.state = {
        files: []//[{fileName: "Paper.docx", uploader: "ronak shah", uploadDate: "06/11/17", downloadURL: ""}]
      };
    }

    componentDidMount() {
      var that = this
      firebase.database().ref("files").on("child_added", (child) => {
        var f = child.val()
        var files = that.state.files
        files.push(f)
        that.setState({files: files})
      }, (error) => {
        console.log(error)
      })
    }

    render() {
      return(
        <div>

          <header>
            <nav className="top-nav">
              <div className="container">
                <div className="nav-wrapper">
                  <a className="page-title">Shah Cloud Services</a>
                </div>
              </div>
            </nav>
          </header>
            <main>
              <div className="container">
                <div className="section">
                  <div className="row">
                    <FileUploader/>
                  </div>
                  <div className = "row">
                    {
                      this.state.files.map((f) => {
                        return (
                          <File file={f} />
                        )
                      })
                    }
                    </div>
                  </div>
              </div>
            </main>
          </div>
        )
       }

   }

function getFileType(filename) {
  return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;

}
class File extends React.Component {
  constructor(props) {
    super(props)
    let type = (getFileType(this.props.file.fileName))
    var image = ""
    // $.when(this.getFileIcon(type)).then((i) => {
    //   this.setIcon(i)
    // })
    // let icon = this.getFileIcon(type)
    // alert(icon)
    // this.setIcon(icon)
    this.setIcon(this.getFileIcon(type))
    this.state = {
      imagePreview: ""
    }
  }
  setIcon(icon) {
    var image = ""
    
    console.log("Icon: " + icon)
    if (icon == "image") {
      console.log('imageee')
      image = this.props.file.downloadURL
    }
    else if (icon == "-1") {
      image = "/images/icons/_blank.png"
    }
    else {
      image = icon
    }
    this.setState({
      imagePreview: image
    })
  }
  getIcon(icon) {
    var image = ""
    
    console.log("Icon: " + icon)
    if (icon == "image") {
      console.log('imageee')
      image = this.props.file.downloadURL
    }
    else if (icon == "-1") {
      image = "/images/icons/_blank.png"
    }
    else {
      image = icon
    }
    return image
  }
  getFileIcon(e) {
    console.log(e)
    let supportedTypes = ["aac","aiff","ai","avi","_blank","bmp","c","cpp","css","csv","dat","dmg","doc","dotx","dwg","dxf","eps","exe","filetypes","flv","gif","h","hpp","html","ics","iso","java","jpg","js","key","less","mid","mp3","mp4","mpg","odf","ods","odt","otp","ots","ott","_page","pdf","php","png","ppt","psd","py","qt","rar","rb","rtf","sass","scss","sql","tga","tgz","tiff","txt","wav","xls","xlsx","xml","yml","zip"]

    var extension = e.toLowerCase()
    var icon = "/images/icons/" + extension + ".png"
    
    if (extension == "png" || extension == "gif" || extension == "jpg" || extension == "jpeg" || extension == "tiff") {
      return "image"
    }
    else if (supportedTypes.indexOf(extension) != -1) {
      return icon
    }
    else {
      return "-1"
    }
  }
  deleteFile() {
    Materialize.toast("Feature not implemented yet", 4000)
  }
  render() {
   let image = this.getIcon(this.getFileIcon(getFileType(this.props.file.fileName)))
    console.log("IMAGE" + image)
    return (
      <div className="col s12 m4">
          <div className="card">
            <div className="card-image">
              <img src={image} width="330" height="330" />
              <span className="card-title">{this.props.file.fileName}</span>
            </div>
            <div className="card-content">
              <p>Uploaded by {this.props.file.uploader} on {(new Date(this.props.file.uploadDate)).toLocaleString().split(',')[0]}.</p>
            </div>
            <div className="card-action">
            <a href={"" + this.props.file.downloadURL} download= {this.props.file.fileName} >Download</a>

              <a href="#!" onClick={() => {
                copyStringToClipboard(this.props.file.downloadURL)
                Materialize.toast("Link Copied!", 4000)
                }}>Copy URL</a>

              <a href="#!" onClick={() => {
                this.deleteFile()
                }}>Delete</a>

            </div>
          </div>
        </div>
    )
  }
}
function copyStringToClipboard (string) {
    function handler (event){
        event.clipboardData.setData('text/plain', string);
        event.preventDefault();
        document.removeEventListener('copy', handler, true);
    }

    document.addEventListener('copy', handler, true);
    document.execCommand('copy');
}
class FileUploader extends React.Component {
  uploadFile() {

    var timestamp = Number(new Date())
    var file_data = document.getElementById('file-input').files[0]
    var storageRef = firebase.storage().ref(file_data.name);

    console.log(file_data)
    let author = document.getElementById("first_name").value
    
    var failed = false
    if (!file_data) {
      Materialize.toast("You need to specify a file!", 4000)
      failed = true
    }
    if (author == "") {
      Materialize.toast("You need a username!", 4000)
      failed = true
    }

    if (failed) {
      return
    }
    Materialize.toast("Uploading File", 2000)

    storageRef.put(file_data).then((d) => {

      var url = d.a.downloadURLs[0]
      firebase.database().ref("files").push().set({
        fileName: file_data.name,
        uploader: author,
        uploadDate: timestamp,
        downloadURL: url
      })
      Materialize.toast("File Uploaded")
    });

    


  }

  render() {
    return (
      <div className="section">
      <div className="row">
        <div className="col s12">
          
        <input type="file" id="file-input" className="dropify" />
        </div>
        </div>
      <div className="row">

        <div className="input-field col s6">
            <input id="first_name" type="text" className="validate"/>
            <label for="first_name">Username</label>
          </div>
          <div className="input-field col s6">
          <a className="waves-effect waves-light btn red" onClick={() => {
            this.uploadFile()}}><i className="material-icons">file_upload</i>Upload</a>

          </div>

      </div>
      </div>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'))

function pullFromServer() {
    var db = firebase.database();
    var children = []; // get all of the posts from firebase and return them
    db.ref("posts").once("child_added").then((child)=> {
      children.push(child);
    }).catch((error) => {
      console.log(error.message);
    });
    return children;
}

function pushToServer(h, c) {
    var post = {header: h, content: c}
    var db = firebase.database();

    db.ref("posts").push().set({
      content: post.content,
      header: post.header,
    });
}
