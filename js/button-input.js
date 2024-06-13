const fullscreenButton = document.getElementById("fullscreen-button");
var isFullScreen = false;

fullscreenButton.addEventListener("click", function (e) {
    if(!isFullScreen) document.documentElement.requestFullscreen().catch((e) => console.log(e));
    else document.exitFullscreen().catch((e) => console.log(e));

    isFullScreen = !isFullScreen;
})