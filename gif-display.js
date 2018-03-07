// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
//
// See HW4 writeup for more hints and details.
const GIPHY_PATH = 'http://api.giphy.com/v1/gifs/search?q=';
class GifDisplay {
  constructor(image) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.gif = image;
    this.foreground = document.querySelector('.front');
    this.background = document.querySelector('.back');

    this.gifArray = [];
    this.getGifs = this.getGifs.bind(this);
    this._onJsonReadyGif = this._onJsonReadyGif.bind(this);
    this.changeGif = this.changeGif.bind(this);

    document.addEventListener('submit', this.getGifs);
    document.addEventListener('change-gif', this.changeGif);
  }
  // TODO(you): Add methods as necessary.
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min
  }

  changeGif() {
    let foreground = document.querySelector('.front');
    let background = document.querySelector('.back');

    foreground.classList.remove('front');
    foreground.classList.add('back');

    background.classList.remove('back');
    background.classList.add('front');
    let index = this.getRandomInt(0, this.gifArray.length);
    let gifUrl = this.gifArray[index].images.downsized.url;
    let gifImage = 'url("' + gifUrl + '")';

    while(gifImage === background.style.backgroundImage) {
      index = this.getRandomInt(0, this.gifArray.length);
      gifUrl = this.gifArray[index].images.downsized.url
      gifImage = 'url(' + gifUrl + ')';
    }

    foreground.style.backgroundImage = gifImage;
  }

  _onJsonReadyGif(json) {
    this.gifArray = json.data;
    if(this.gifArray.length > 2) {
      document.dispatchEvent(new CustomEvent('enough'));
      const gifUrl = this.gifArray[0].images.downsized.url;
      const gifImage = 'url(' + gifUrl + ')';

      const secondGifUrl = this.gifArray[1].images.downsized.url;
      const secondGifImage = 'url(' + secondGifUrl + ')';
      this.foreground.style.backgroundImage = gifImage;
      this.background.style.backgroundImage = secondGifImage;
    } else {
      document.dispatchEvent(new CustomEvent('not-enough'));
    }
  }

  _onResponse(response) {
    return response.json();
  }

  getGifs() {
    fetch(GIPHY_PATH + this.gif.gifValue + '&rating=g&api_key=dc6zaTOxFJmzC')
         .then(this._onResponse)
         .then(this._onJsonReadyGif);
  }
}
