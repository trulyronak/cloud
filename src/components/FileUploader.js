import {firestore, storage, TIMESTAMP} from './../utility/firebase'
import React from 'react'
import {Button} from 'react-materialize'
import guid from './../utility/guid.js'
import toast from './../utility/toast.js'


class FileUploader extends React.Component {
  constructor(props) {
    super(props)
    this.uploadFile = this.uploadFile.bind(this)
  }

  uploadFile() {
    if (!document.getElementById('file-input').files[0]) {
      toast("You need to upload a file first!")
      return
    }
    let file_data = document.getElementById('file-input').files[0]
    let uuid = guid()
    let fileName = `${uuid}<==>${file_data.name}`
    let storageRef = storage.ref(fileName);

    // console.log(file_data)
    
    let failed = false
    if (!file_data) {
      toast("You need to specify a file!", 4000)
      failed = true
    }

    if (failed) {
      return
    }
    toast("Uploading File", 2000)

    storageRef.put(file_data).then((d) => {
      console.log(d)
      let path = `gs://${d.metadata.bucket}/${d.metadata.fullPath}`
      const timestamp = TIMESTAMP

      storageRef.getDownloadURL().then(url => {
        firestore.collection("files").add({
          uploadDate: new Date(),
          fileName: fileName,
          storageURI: path,
          downloadURL: url
        }).then(snapshot => {
          console.log(snapshot)
          firestore.collection("files").doc(snapshot.id).set({
            id: snapshot.id
          }, {merge: true})
        })
      })

      toast("File Uploaded")
    });


  }

  render() {
    return (
    <div className="section">
      <div className="row">
        <div className="col s8">
<input type="file" id="file-input" className="dropify" data-height="300" />
        </div>

        <div className="input-field col s4">
          <Button waves="light" node="a" onClick={this.uploadFile} icon="file_upload"> Upload File </Button>
        </div>
      </div>
    </div>
    )
  }

  componentDidMount() {
    // let $this = $(ReactDOM.findDOMNode(this))

  }
}


export default FileUploader