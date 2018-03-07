// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen {
  constructor(containerElement, song) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.containerElement = containerElement;
    this.songThemeMap = song;

    this.gif = new GifDisplay(this.songThemeMap);

    this.audioPlayer = new AudioPlayer();

    this._onSubmit = this._onSubmit.bind(this);
    this._onKick = this._onKick.bind(this);
    this.pauseOrPlay = this.pauseOrPlay.bind(this);

    this.JSON_PATH = 'https://yayinternet.github.io/hw4-music/songs.json';

    let button = document.querySelector('#pause-play');
    document.addEventListener('enough', this._onSubmit);
    button.addEventListener('click', this.pauseOrPlay);
  }
  // TODO(you): Add methods as necessary.
  _onSubmit(event) {
    event.preventDefault();

    this.audioPlayer.setSong(this.songThemeMap.songValue);
    this.audioPlayer.setKickCallback(this._onKick);
    this.audioPlayer.play();
  }

  pauseOrPlay(event) {
    let button = event.currentTarget;
    if(button.className === "pause") {
      button.src = "images/play.png";
      this.audioPlayer.pause();
      button.className = "play";
    } else {
      button.src = "images/pause.png";
      this.audioPlayer.play();
      button.className = "pause";
    }
  }

  _onKick() {
    document.dispatchEvent(new CustomEvent('change-gif'));
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
