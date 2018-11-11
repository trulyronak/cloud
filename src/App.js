import React from 'react';
import './App.css';
// import firebase from 'firebase'
import FileUploader from './components/FileUploader.js'
import Navbar from './components/Navbar.js'
import File from './components/File.js'
import toast from './utility/toast.js'
import {firestore} from './utility/firebase.js'
// var config = {
//     apiKey: "AIzaSyAC7mgfB8JG7pLuc787Fg8sEWl_NvuJgp0",
//     authDomain: "shah-cloud-services.firebaseapp.com",
//     databaseURL: "https://shah-cloud-services.firebaseio.com",
//     projectId: "shah-cloud-services",
//     storageBucket: "shah-cloud-services.appspot.com",
//     messagingSenderId: "511211791983"
//   };
// firebase.initializeApp(config);

// firebase.firestore().settings({timestampsInSnapshots: true})

class App extends React.Component {
    constructor() {
      super();
      this.state = {
        files: [] // [{fileName: "Paper.docx", uploader: "ronak shah", uploadDate: "06/11/17", downloadURL: ""}]
      };
    }

    componentDidMount() {
      let self = this
      firestore.collection("files").orderBy("uploadDate", "desc").limit(20).onSnapshot(snapshot => {
        let files = []
        snapshot.forEach(doc => {
          if (!doc.exists) {
            toast(`Document does not exist`)
          } else {
            files.push(doc.data())
            this.setState({
              "files" : files
            })
          }
        })
        this.setState({
          "files" : files
        })
      })
    }

    render() {
      let fileView = (
        <h1><center>No files yet. Start uploading!</center></h1>
        )
      if (this.state.files.length !== 0) {
        fileView = (
        <div className = "row">
          {
            this.state.files.map((f, index) => {
              return (
                <File file={f} key={index}/>
              )
            })
          }
          </div>
        )
      }
      return(
        <div>
          <Navbar/>

            <main>
              <div className="container">
                <div className="section">
                  <div className="row">
                    <FileUploader/>
                  </div>
                  {fileView}
                </div>
              </div>
            </main>
          </div>
        )
       }

   }

export default App;
