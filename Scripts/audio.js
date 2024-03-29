// Define audio files as an object with keys as names
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
}

const rangeInput = document.querySelector('.range');
rangeInput.addEventListener('input', function() {
    rangeSlider(this.value);
});
