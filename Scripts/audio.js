const audioFiles = {
    eating: 'Assets/Sounds/eating-v2.mp3',
    start: 'Assets/Sounds/start.mp3',
    gameover: 'Assets/Sounds/gameover.mp3',
    boost: 'Assets/Sounds/boost.mp3'
};

let audioPlayer = null;
let currentVolume = 0.50;

export function playAudio(name) {
    const audioPath = audioFiles[name];
    if (audioPath) {
        if (audioPlayer) {
            audioPlayer.pause();
        }
        audioPlayer = new Audio(audioPath);
        audioPlayer.volume = currentVolume;
        audioPlayer.play();
    }
}

export function rangeSlider(value) {
    document.getElementById('rangeValue').textContent = value;
    currentVolume = parseFloat(value) / 100;
    if (audioPlayer) {
        audioPlayer.volume = currentVolume;
    }

    localStorage.setItem("volume", currentVolume);
}

const rangeInput = document.querySelector('.range');
rangeInput.addEventListener('input', function() {
    rangeSlider(this.value);
});

document.addEventListener('DOMContentLoaded', (event) => {
    const storedVolume = localStorage.getItem("volume");
    if (storedVolume) {
        currentVolume = parseFloat(storedVolume);
        document.querySelector('.range').value = currentVolume * 100;
        document.getElementById('rangeValue').textContent = currentVolume * 100;
        if (audioPlayer) {
            audioPlayer.volume = currentVolume;
        }
    }
});
