const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");

// 🎵 Song list
const songs = [
  {
    name: "song1.mp3",
    title: "Song One",
    artist: "Artist One",
  },
  {
    name: "song2.mp3",
    title: "Song Two",
    artist: "Artist Two",
  },
  {
    name: "song3.mp3",
    title: "Song Three",
    artist: "Artist Three",
  },
];

let songIndex = 0;
let isPlaying = false;

// Load song
function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = song.name;
}

// Play song
function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.innerText = "⏸";
}

// Pause song
function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.innerText = "▶";
}

// Next song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Previous song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar
function updateProgress() {
  const { duration, currentTime } = audio;

  if (duration) {
    const percent = (currentTime / duration) * 100;
    progress.style.width = percent + "%";

    durationEl.innerText = formatTime(duration);
    currentTimeEl.innerText = formatTime(currentTime);
  }
}

// Format time
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

// Click progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

// Volume control
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Event listeners
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);

// Initial load
loadSong(songs[songIndex]);
