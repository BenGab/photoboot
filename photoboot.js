function hasUserMedia() {
    return !! (navigator.getUserMedia 
                || navigator.webkitGetUserMedia
                || navigator.mozGetUserMedia
                || navigator.msGetUserMedia);
}

if(hasUserMedia()) {
    navigator.getUserMedia = navigator.getUserMedia 
                || navigator.webkitGetUserMedia
                || navigator.mozGetUserMedia
                || navigator.msGetUserMedia;
    
    var videoElement = document.querySelector('video');
    var canvasElement = document.querySelector('canvas');
    var streaming = false;
    navigator.getUserMedia({
        video: true,
        audio: false
    }, function(stream) {
        videoElement.src = window.URL.createObjectURL(stream);
        streaming = true;
    }, function (error){
        console.log("Raised an error while capturing: ", error);
    });
    document.querySelector('#capture').addEventListener('click', function(event) {
        if(streaming) {
            canvasElement.width = videoElement.clientWidth;
            canvasElement.height = videoElement.clientHeight;
            var context = canvasElement.getContext('2d');
            context.drawImage(videoElement, 0, 0);
        }
    });
} else {
    alert('sorry your browser does not support getUserMedia');
}