// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// See HW4 writeup for more hints and details.
class App {
  constructor() {
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);

    const musicElement = document.querySelector('#music');
    this.music = new MusicScreen(musicElement, this.menu.submitted);

    this.notifyUser = this.notifyUser.bind(this);
    this._showMusicScreen = this._showMusicScreen.bind(this);

    document.addEventListener('enough', this._showMusicScreen);
    document.addEventListener('not-enough', this.notifyUser);
  }

  notifyUser() {
    let errorMessage = document.querySelector('#error');
    errorMessage.classList.remove('inactive');
  }

  _showMusicScreen() {
    this.menu.hide();
    this.music.show();
  }
}
