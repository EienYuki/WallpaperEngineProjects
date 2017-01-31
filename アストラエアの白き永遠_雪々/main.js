var data = new Array(70);
var imgf = new Image();
var canvas,ctx;
var ws_size = {
  "x":0,
  "y":0,
  "x_Border":0,
  "y_Border":0
};

function init(){
  canvas = document.getElementById('draw');
  ctx = canvas.getContext('2d');

  ws_size.x = window.innerWidth;
  ws_size.y = window.innerHeight;
  ws_size.x_Border = ws_size.x - (ws_size.x/((ws_size.x/1920.0)*10));
  ws_size.y_Border = ws_size.y - (ws_size.y/((ws_size.y/1080.0)*10));
  canvas.width = ws_size.x;
  canvas.height = ws_size.y;

  ctx.mozImageSmoothingEnabled = false;
  for(var i=0;i<data.length;i++){
    addimg(i,0);
  }

  imgf.onload = function(){
    setInterval("update()",34);
  }
  imgf.src = "snow.png";
}

$(window).resize(function() {
  ws_size.x = window.innerWidth;
  ws_size.y = window.innerHeight;
  ws_size.x_Border = ws_size.x - (ws_size.x/((ws_size.x/1920.0)*10));
  ws_size.y_Border = ws_size.y - (ws_size.y/((ws_size.y/1080.0)*10));
  canvas.width = ws_size.x;
  canvas.height = ws_size.y;

  for(var i=0;i<data.length;i++){
    addimg(i,0);
  }
});

function addimg(id,mode){
  var x,y,op,v1,v2,a;

  if(mode == 0){
    x=Math.floor((Math.random() * ws_size.x) - 0);
    y=Math.floor((Math.random() * ws_size.y) - 0);
  }
  else if(mode == 1){
    x=Math.floor((Math.random() * ws_size.x) - 0);
    y=-imgf.height;
  }

  op = (id%2 == 0)? 0.92:0.77;
  op = (id%3 == 0)? 0.67:op;

  a = 0.001 * 2;
  v1 = Math.pow((Math.random() * 0.5)+0.5,2);
  v2 = 0;

  data[id] = {
    "x":x,
    "y":y,
    "op":op,
    "v1":v1,
    "v2":v2,
    "a":a
  }
}

function update(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var id=0;id<data.length;id++){
    mov(id);
    opacity(id);
    check(id);

    ctx.globalAlpha = data[id].op;
    ctx.drawImage(imgf,data[id].x,data[id].y,imgf.width,imgf.height);
  }
}

function mov(id){
  data[id].v2 = Math.pow(data[id].v1+(data[id].a*(data[id].y+imgf.height)),0.5);

  data[id].x += 0.02;
  data[id].y += data[id].v2;
}

function opacity(id){
  if(data[id].y > ws_size.y_Border){
    data[id].op -= 0.02;
  }
}

function check(id){
  if(data[id].op <= 0){
    addimg(id,1);
  }
  else if( (data[id].y > ws_size.y) || (data[id].x > ws_size.x) || (data[id].x < 0) ){
    addimg(id,1);
  }
}
