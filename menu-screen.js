// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.JSON_PATH = 'https://yayinternet.github.io/hw4-music/songs.json';

    this.songMap = new Map();
    this._onSubmit = this._onSubmit.bind(this);
    this._onJsonReady = this._onJsonReady.bind(this);

    this.choiceArray = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];

    const form = document.querySelector('form');
    form.addEventListener('submit', this._onSubmit);

    this.submitted = {};

    this.loadAlbums();
    this.insertRandomTheme();
  }
  // TODO(you): Add methods as necessary.
  loadAlbums() {
    fetch(this.JSON_PATH).then(this._onResponse).then(this._onJsonReady);
  }

  _onJsonReady(json) {
    const choiceBar = document.querySelector('select');
    for(const set in json) {
      const choice = document.createElement('option');
      choice.textContent = json[set]['artist'] + ": " + json[set]['title'];
      choiceBar.append(choice);
    }
    this.songMap = json;
  }

  _onResponse(response) {
    return response.json();
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min
  }

  insertRandomTheme() {
    const index = this.getRandomInt(0, this.choiceArray.length);
    const randomChoice = this.choiceArray[index];
    let theme = document.querySelector('#query-input');
    theme.value = randomChoice;
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  _onSubmit(event) {
   event.preventDefault();
   const selectElem = document.querySelector('select');
   const index = selectElem.selectedIndex;
   const textInput = document.querySelector('#query-input');

   for(const song in this.songMap) {
     const currSong = this.songMap[song];
     if(currSong.artist + ": " + currSong.title === selectElem.options[index].value) {
       this.submitted['songValue'] = currSong.songUrl;
       break;
     }
   }
   this.submitted['gifValue'] = textInput.value;
 }
}
