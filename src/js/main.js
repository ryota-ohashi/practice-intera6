import '../scss/style.scss'

var INTERA6 = INTERA6 || {};

INTERA6 = {
  init: function() {
    this.setParams();
    this.bind();
  },
  setParams: function() {
    this.btn = document.querySelector('.btn');
    this.img = document.querySelector('.js-img');
  },
  bind: function() {
    this.btn.addEventListener('click', () => {
      fetch('https://source.unsplash.com/random')
        .then((result) => {
          this.img.setAttribute('src', result.url);
        });
    });
  },
};

window.addEventListener('DOMContentLoaded', () => {
  INTERA6.init();
});

