import '../scss/style.scss'

import Mousemove from './core/mousemove';

class Intera6 extends Mousemove{
  constructor() {
    super()
    this.setParams();
    this.bind();
  }
  setParams() {
    this.btn = document.querySelector('.btn');
    this.img = document.querySelector('.js-img');
    this.shutterChildren = document.querySelectorAll('.shutter span');
    this.mousedownFlag = false;
    this.bindUpdate = this.update.bind(this);
    this.imgUrl;

    this.mouseDown = {
      start:{y: 0},
      dist:{y: 0}
    }
  }
  mousedown(e) {
    this.mousedownFlag = true;
    this.mouseDown.start.x = e.clientX;
    this.mouseDown.start.y = e.clientY;
    this.getImage();
  }
  mouseup() {
    this.mousedownFlag = false;
    setTimeout(() => {
      this.img.setAttribute('src', this.imgUrl);
    }, -this.mouseDown.dist.y/600 * 1000);
  }
  update(){
    if(this.mousedownFlag) {
      // マウス押してるときは、マウスダウン時からのマウス移動量をちゃんと計算
      this.mouseDown.dist.y = this.mouse.y - this.mouseDown.start.y;

      var friction = 0.8; // 摩擦係数
      this.mouseDown.dist.y *= friction;
    } else {
    // マウス押してないときはシャッターをゆっくり下げる
      if (this.mouseDown.dist.y < 0) {
        this.mouseDown.dist.y += 10;
      }else{
        this.mouseDown.dist.y = 0;
      }
    }

    let value =  -this.mouseDown.dist.y/window.innerHeight * 100;
    if(value < 0) value = 0;
    value = 100 - value;

    document.documentElement.style.setProperty('--height', value + "vh");
    window.requestAnimationFrame(this.bindUpdate);
  }
  getImage(){
    fetch('https://source.unsplash.com/random')
    .then((result) => {
      this.imgUrl = result.url;
    });
  }
  bind(){
    document.addEventListener('mousedown', this.mousedown.bind(this));
    document.addEventListener('mouseup', this.mouseup.bind(this));
    window.requestAnimationFrame(this.bindUpdate);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new Intera6();
});