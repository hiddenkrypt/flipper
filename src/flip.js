
var msg = "";
window.onload = function(){

  var canvas = document.getElementById("canvas");
  canvas.width=500;
  canvas.height = 500;
  var ctx = canvas.getContext("2d");
  var coin = new Coin();

  function Coin(){
    this.x = 10;
    this.y = canvas.height/2;
    this.dx = 0;
    this.dy = 0;
    this.w = 0;
    this.rotation = 0
    this.flipping = false;
    this.flipped = false;
  }
  function draw(){
    if(coin.flipping){coin.dy += .098;}
    coin.x += coin.dx;
    coin.y += coin.dy;
    coin.rotation += coin.w;
    coin.rotation = coin.rotation % (2*Math.PI);
    if(coin.y >= canvas.height-30){
      if(coin.dy < 3){
        if(coin.rotation > Math.PI){
          coin.rotation = Math.PI;
          msg = "HEADS";
        }
        else{
          msg= "TAILS";
          coin.rotation = 0;
        }
        if(Math.floor(coin.rotation/Math.PI)%2){console.log("HEADS");}
        coin.dy=0; coin.dx=0;
        coin.flipping = false;
        coin.flipped = true;
        console.log("STOP! ROT: " + coin.rotation)
      }
      coin.dy = -coin.dy*.5;
    }
    if(coin.x >= canvas.width-1){
      coin.dx = -coin.dx;
    }
    if(coin.x <= 0){
      coin.dx = -coin.dx;
    }
    ctx.fillStyle="#000";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle="#300"
    ctx.fillRect(0,canvas.height-20, canvas.width, 5)
    ctx.save();
      ctx.translate(coin.x+15, coin.y+2.5);
      ctx.rotate(coin.rotation);
      ctx.fillStyle = "#fff";
      ctx.fillRect(-15, -2.5, 30, 5);
      ctx.fillStyle = "#888";
      ctx.fillRect(-15, -2.5, 30, 2);
    ctx.restore();
    if(coin.flipping){
      setTimeout(draw, 1000/60);
    }
    ctx.fillStyle = "#fff";
    ctx.font = '30px serif';
    ctx.fillText(msg, 30, 30);
  }
  window.addEventListener("keydown", function (e) {
    console.log(`dx:${coin.dx} dy:${coin.dy} w:${coin.w} `)
    if(!coin.flipping && !coin.flipped){
      console.log("flip")
      coin.dx = 2+ Math.random()*6;
      coin.dy = -(2+Math.random()*6);
      coin.w = .4+(Math.random()/2);
      coin.flipping = true;
      draw();
    }
    else if (coin.flipped){
      msg = "";
      coin = new Coin();
      draw();
    }
  });
  draw();
};
