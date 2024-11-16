var audio = document.getElementById("myAudio");

function playSound() {
    audio.play();
}

function stopSound() {
    audio.pause();
    audio.currentTime = 0;
}

function setVolume(volume) {
    audio.volume = volume;
    volumeDisplay.textContent = "Volume: " + Math.round(volume * 100) + "%";
}