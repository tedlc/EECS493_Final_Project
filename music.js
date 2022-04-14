const musicBox = document.getElementById('musicbox');
const playSongButtton = document.getElementById('playSong');
const prevSongButton = document.getElementById('prevSong');
const nextSongButton = document.getElementById('nextSong');
const audio = document.getElementById('audioSong');
const title = document.getElementById('title');
const songList = ['guitar', 'espresso'];

let songIndex = 1;
setupSong(songList[songIndex]);


function setupSong(song) {
    musicBox.classList.add('pause');
    audio.src = `music/${song}.mp3`;
}

function playSong() {
    musicBox.classList.remove('pause');
    musicBox.classList.add('play');
    document.getElementById("nowBtn").src="pauseSongBtn.png";
    audio.play();
}

function pauseSong() {
    musicBox.classList.remove('play');
    musicBox.classList.add('pause');
    document.getElementById("nowBtn").src="playSongBtn.png";
    audio.pause();
}

function switchPrevSong() {
    songIndex = songIndex - 1;
    if (songIndex < 0) {
        songIndex = songList.length - 1;
    }
    setupSong(songList[songIndex]);
    playSong();
}

function switchNextSong() {
    songIndex = songIndex + 1;
    if (songIndex > songList.length - 1) {
        songIndex = 0;
    }
    setupSong(songList[songIndex]);
    playSong();
}

function playCurrentSong() {
    if (musicBox.classList.contains('play')) {
        pauseSong();
    } else {
        playSong();
    }
}

prevSongButton.addEventListener('click', switchPrevSong);
nextSongButton.addEventListener('click', switchNextSong);
playSongButtton.addEventListener('click', playCurrentSong);
audio.addEventListener('ended', switchNextSong);