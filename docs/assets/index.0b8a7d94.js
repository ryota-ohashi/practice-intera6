const u=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}};u();class d{constructor(){this.mouse={x:0,y:0},this.scrollY=window.pageYOffset,this.bindMouseMove=this.mouseMove.bind(this),this.bindMousemove()}mouseMove(t){this.mouse.x=t.pageX,this.mouse.y=t.pageY,this.scrollY=window.pageYOffset}bindMousemove(){window.addEventListener("mousemove",this.bindMouseMove)}}class m extends d{constructor(){super(),this.setParams(),this.bind()}setParams(){this.btn=document.querySelector(".btn"),this.img=document.querySelector(".js-img"),this.shutterChildren=document.querySelectorAll(".shutter span"),this.mousedownFlag=!1,this.bindUpdate=this.update.bind(this),this.imgUrl,this.mouseDown={start:{y:0},dist:{y:0}}}mousedown(t){this.mousedownFlag=!0,this.mouseDown.start.x=t.clientX,this.mouseDown.start.y=t.clientY,this.getImage()}mouseup(){this.mousedownFlag=!1,setTimeout(()=>{this.img.setAttribute("src",this.imgUrl)},-this.mouseDown.dist.y/600*1e3)}update(){if(this.mousedownFlag){this.mouseDown.dist.y=this.mouse.y-this.mouseDown.start.y;var t=.8;this.mouseDown.dist.y*=t}else this.mouseDown.dist.y<0?this.mouseDown.dist.y+=10:this.mouseDown.dist.y=0;let o=-this.mouseDown.dist.y/window.innerHeight*100;o<0&&(o=0),o=100-o,document.documentElement.style.setProperty("--height",o+"vh"),window.requestAnimationFrame(this.bindUpdate)}getImage(){fetch("https://picsum.photos/1920").then(t=>{this.imgUrl=t.url})}bind(){document.addEventListener("mousedown",this.mousedown.bind(this)),document.addEventListener("mouseup",this.mouseup.bind(this)),window.requestAnimationFrame(this.bindUpdate)}}window.addEventListener("DOMContentLoaded",()=>{new m});
