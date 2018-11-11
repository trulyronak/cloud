import React from 'react'
import toast from './../utility/toast.js'
import {firestore, storage} from './../utility/firebase'

class File extends React.Component {
  constructor(props) {
    super(props)

    this.getFileType = this.getFileType.bind(this)
    this.getFileIcon = this.getFileIcon.bind(this)
    this.deleteFile = this.deleteFile.bind(this)
    this.setIcon = this.setIcon.bind(this)
    this.getIcon = this.getIcon.bind(this)

    this.state = {}
    console.log(this.props.file)
    let type = this.getFileType(this.props.file.fileName)
    let icon = this.getFileIcon(type)
    let image = this.setIcon(icon)

    this.state = {
      imagePreview: image
    }
  }


  getFileType(filename) {
    if (filename) {
      return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
    }
    return "unsupported"
  }

  setIcon(icon) {
    var image = ""
    
    // console.log("Icon: " + icon)
    if (icon === "image") {
      // console.log('imageee')
      image = this.props.file.downloadURL
    }
    else if (icon === "-1") {
      image = "https://cloud.ronakshah.net/images/icons/file.png"
    }
    else {
      image = icon
    }
    return image
  }

  getIcon(icon) {
    var image = ""
    
    // console.log("Icon: " + icon)
    if (icon === "image") {
      image = this.props.file.downloadURL
    }
    else if (icon === "-1") {
      image = "https://cloud.ronakshah.net/images/icons/file.png"
    }
    else {
      image = icon
    }
    return image
  }

  getFileIcon(e) {
    // console.log(e)
    let supportedTypes = ["aac","aiff","ai","avi","_blank","bmp","c","cpp","css","csv","dat","dmg","doc","dotx","dwg","dxf","eps","exe","filetypes","flv","gif","h","hpp","html","ics","iso","java","jpg","js","key","less","mid","mp3","mp4","mpg","odf","ods","odt","otp","ots","ott","_page","pdf","php","png","ppt","psd","py","qt","rar","rb","rtf","sass","scss","sql","tga","tgz","tiff","txt","wav","xls","xlsx","xml","yml","zip"]

    var extension = e.toLowerCase()
    var icon = "https://cloud.ronakshah.net/images/icons/" + extension + ".png"
    
    if (extension === "png" || extension === "gif" || extension === "jpg" || extension === "jpeg" || extension === "tiff") {
      return "image"
    }
    else if (supportedTypes.indexOf(extension) !== -1) {
      return icon
    }
    else {
      return "-1"
    }
  }

  deleteFile() {
    console.log(this.props)
    let ref = storage.refFromURL(this.props.file.storageURI)
    ref.delete().then(() => {
      firestore.collection('files').doc(this.props.file.id).delete()
      toast("Successfully Deleted!")
    }).catch(error => {
      toast(`Error ${error} occured`)
    })
  }

  render() {
   let image = this.getIcon(this.getFileIcon(this.getFileType(this.props.file.fileName)))
    // console.log("IMAGE" + image)
    let fileName = this.props.file.fileName.split('<==>').slice(1).join("<==>")


    return (
      <div className="col s12 m4">
          <div className="card">
            <div className="card-image">
              <img src={image} alt="file logo" width="330" height="330" />
              <span className="card-title">{fileName}</span>
            </div>
            <div className="card-content">
              <p>Uploaded on {((this.props.file.uploadDate.toDate())).toLocaleString().split(',')[0]}.</p>
            </div>
            <div className="card-action">
            <a 
              href={this.props.file.downloadURL} 
              download={this.props.file.fileName.split('<==>').slice(1).join("<==>")}>
                Download
            </a>

              <a href="#!" onClick={() => {
                // console.log("KLSDJFLKDSJFLKDSJFKLSDJFKLJSDKLJ")
                console.log(this.props.file.fileName)
                copyStringToClipboard(this.props.file.downloadURL)
                toast("Link Copied!", 4000)
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

export default File