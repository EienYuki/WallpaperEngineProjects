var data = new Array(100);
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

  ws_size.x = $(window).width();
  ws_size.y = $(window).height();
  ws_size.x_Border = ws_size.x - (ws_size.x/10);
  ws_size.y_Border = ws_size.y - (ws_size.y/10);
  canvas.width = ws_size.x;
  canvas.height = ws_size.y;

  ctx.mozImageSmoothingEnabled = false;
  for(var i=0;i<data.length;i++){
    addimg(i,0);
  }

  imgf.onload = function(){
    setInterval("update()",40);
  }
  imgf.src = "snow.png";
}

$(window).resize(function() {
  ws_size.x = $(window).width();
  ws_size.y = $(window).height();
  ws_size.x_Border = ws_size.x - (ws_size.x/10);
  ws_size.y_Border = ws_size.y - (ws_size.y/10);
  canvas.width = ws_size.x;
  canvas.height = ws_size.y;

  for(var i=0;i<data.length;i++){
    addimg(i,0);
  }
});

function addimg(id,mode){
  var x,y,op;

  if(mode == 0){
    x=Math.floor((Math.random() * ws_size.x) - 0);
    y=Math.floor((Math.random() * ws_size.y) - 0);
  }
  else if(mode == 1){
    x=Math.floor((Math.random() * ws_size.x));
    y=-imgf.height;
  }
  op = (id%2 == 0)? 1:0.8;
  data[id] = {
    "ID":id,
    "x":x,
    "y":y,
    "op":op,
    "sp":Math.floor((Math.random() * 2)+1),
    "mode":0
  }
}

function update(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //mov
  for (var id=0;id<data.length;id++){
    //往 左? 右? 不變?
    if(data[id].mode == 1){
      data[id].x -= data[id].sp;
    }
    else if (data[id].mode == 2){
      data[id].x += data[id].sp;
    }
    data[id].y += data[id].sp;

    //預防出界
    if( (data[id].y > ws_size.y) || (data[id].x > ws_size.x) || (data[id].x < 0) ){
      addimg(id,1);
    }
    //mov end

    //opacity
    if(data[id].y > ws_size.y_Border){
      data[id].op -= 0.01;
    }
    if(data[id].op < 0){
      addimg(id,1);
    }
    //opacity end

    ctx.globalAlpha = data[id].op;
    ctx.drawImage(imgf,data[id].x,data[id].y,imgf.width,imgf.height);
  }
}
