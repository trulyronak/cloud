import './snackbar.css'

function toast(message, time) {
    if (!time) {
        time = 3000
    }
    let x = document.createElement('div')
    x.innerHTML = message
    x.id = "snackbar"
    x.className = "show";
    document.body.appendChild(x)
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, time);
}

export default toast