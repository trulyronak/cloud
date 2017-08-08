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
        files: [{name: "Paper.docx", type: "word", uploader: "ronak shah", date: "06/11/17"}]
      };
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

class File extends React.Component {
  render() {
    return (
      <div className="col s4">
          <div className="card">
            <div className="card-image">
              <img src="https://lorempixel.com/300/300/nature"/>
              <span className="card-title">{this.props.file.name}</span>
            </div>
            <div className="card-content">
              <p>Uploaded by {this.props.file.uploader} on {this.props.file.date}.</p>
            </div>
            <div className="card-action">
              <a href="#">Download</a>
            </div>
          </div>
        </div>
    )
  }
}

class FileUploader extends React.Component {
  uploadFile() {
    Materialize.toast("Uploading File", 4000)

    var timestamp = Number(new Date())
    var storageRef = firebase.storage().ref(timestamp.toString());
    var file_data = document.getElementById('file-input').files[0]
    console.log(file_data)
    storageRef.put(file_data);

    


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
