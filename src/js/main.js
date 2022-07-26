import '../scss/style.scss'

class Intera6{
  constructor() {
    this.setParams();
    this.bind();
  }
  setParams() {
    this.btn = document.querySelector('.btn');
    this.img = document.querySelector('.js-img');
    this.shutterChildren = document.querySelectorAll('.shutter span');
    this.mousedownFlag = false;
    this.bindUpdate = this.update.bind(this);
    this.bindMouseMove = this.mouseMove.bind(this);
    this.mouse = {
      x:0,
      y:0
    }
    this.mouseDown = {
      start:{x: 0, y: 0},
      end:{x: 0, y: 0},
      dist:{x: 0, y: 0}
    }
    this.param = {
      x:0,
      y:0,
      space:0
    }
  }
  mousedown(e) {
    this.mousedownFlag = true;
    this.mouseDown.start.x = e.clientX;
    this.mouseDown.start.y = e.clientY;
  }
  mouseup() {
    this.mousedownFlag = false;
    fetch('https://source.unsplash.com/random')
    .then((result) => {
      this.img.setAttribute('src', result.url);
    });
  }
  update(){
    if(this.mousedownFlag) {
      // マウス押してるときは、マウスダウン時からのマウス移動量をちゃんと計算
      const dx = this.mouse.x - this.mouseDown.start.x;
      const dy = this.mouse.y - this.mouseDown.start.y;
      this.mouseDown.dist.x = dx;
      this.mouseDown.dist.y = dy;

      // ##########################################################
      var friction = 0.8; // 摩擦係数 小さいとより引っ張られる感じに
      this.mouseDown.dist.x *= friction;
      this.mouseDown.dist.y *= friction;
      // ##########################################################
    } else {
    //   // マウス押してないときの移動量は0
      this.mouseDown.dist.x = 0;
      this.mouseDown.dist.y = 0;
    }

    let value =  -this.mouseDown.dist.y/window.innerHeight * 100;
    if(value < 0) value = 0;
    value = 100 - value;

    document.documentElement.style.setProperty('--height', value + "vh");
    // this.shutterChildren.forEach((el) => {
    //   el.style.setPropertyValue('--height', value + "vh");
    // });

    console.log(this.mouseDown.dist.y);
    // 滑らかに移動させるためイージングつける
    // var ease = 0.125; // イージング量 小さいとゆっくり
    // this.param.x += (this.mouseDown.dist.x - this.param.x) * ease;
    // this.param.y += (this.mouseDown.dist.y - this.param.y) * ease;

    // 中心からの距離
    // var d = Math.sqrt(this.param.x * parthis.paramam.x + this.param.y * this.param.y);

    window.requestAnimationFrame(this.bindUpdate);
  }
  mouseMove(e) {
    this.mouse.x = e.pageX;
    this.mouse.y = e.pageY;
    this.scrollY = window.pageYOffset;
  }
  bindMousemove(){
    window.addEventListener('mousemove', this.bindMouseMove);
  }
  bind(){
    document.addEventListener('mousedown', this.mousedown.bind(this));
    document.addEventListener('mouseup', this.mouseup.bind(this));
    this.bindMousemove();
    window.requestAnimationFrame(this.bindUpdate);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new Intera6();
});