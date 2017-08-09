$(".button-collapse").sideNav();

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

$(document).ready(function() {
    var file = (window.location.hash)
    if (file) {
        downloadFile(file)
    }
    else {
        intro()
    }
})



function intro() {
    $("#file-status-header").text("Search for a File")
    $("#file-status-info").text("Brought to you by SCS")
}
function noFileFound(file) {
    var txt = ""
    if (file) {
        txt = ", " + file + ","
    }
    $("#file-status-header").text("File not found")
    $("#file-status-info").text("The file" + txt + " you are trying to download doensn't exist in our database.")
}
function fileFound(file) {
    $("#file-status-header").text("Your File is Downloading")
    $("#file-status-info").text(file + " is downloading")
}
$("#filename").keyup(function(event){
    if(event.keyCode == 13){
        downloadFile(false)
    }
});

function downloadFile(hash) {
    file = ""
    if (hash) {
        file = hash.split("#").splice(1,hash.length).join()

    }
    else {
        file = $("#filename").val()
        if (!file) {
            Materialize.toast("You didn't specify a file!", 4000)
            return
        }

    }
    var storage = firebase.storage()
    var ref = storage.refFromURL("gs://shah-cloud.appspot.com/" + file)
    ref.getDownloadURL().then(function(url) {
        var link=document.createElement("a");
        link.id = 'someLink'; //give it an ID!
        link.href= url
        link.download = file

        //Add the link somewhere, an appendChild statement will do.
        //Then run this
        $('body').append(link)
        document.getElementById('someLink').click();
        $("#someLink").remove()
        console.log(url)
        fileFound(file)
    }).catch(function(error) {
        noFileFound(file)
    })

}