var data = new Array(100);
var ws_size = {
  "x":0,
  "y":0,
  "x_Border":0,
  "y_Border":0
};
var img_size = {
  "x":22,
  "y":22
};

function init(){
  ws_size.x = $(window).width();
  ws_size.y = $(window).height();
  ws_size.x_Border = ws_size.x - (ws_size.x/10);
  ws_size.y_Border = ws_size.y - (ws_size.y/10);

  for(var i=0;i<data.length;i++){
    addimg(i,0);
  }

  var d = document.getElementById("draw");
  for (var i=0;i<data.length;i++){
    var newimg = document.createElement('img');
    newimg.id = data[i].ID;
    newimg.src = "snow.png";
    newimg.style.opacity = data[i].op;
    newimg.border = "0";
    d.appendChild(newimg);
  }

  update();
  setInterval("update()",40);
}

$(window).resize(function() {
  ws_size.x = $(window).width();
  ws_size.y = $(window).height();
  ws_size.x_Border = ws_size.x - (ws_size.x/10);
  ws_size.y_Border = ws_size.y - (ws_size.y/10);

  for(var i=0;i<data.length;i++){
    addimg(i,0);
  }
});

function addimg(id,mode){
  var _img = document.getElementById(id);
  var x,y,op;

  if(mode == 0){
    x=Math.floor((Math.random() * ws_size.x) - 0);
    y=Math.floor((Math.random() * ws_size.y) - 0);
  }
  else if(mode == 1){
    x=Math.floor((Math.random() * ws_size.x));
    y=-img_size.y;
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
  //mov
  for (var id=0;id<data.length;id++){
    var _img = document.getElementById(id);

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

    _img.style.top = data[id].y;
    _img.style.left = data[id].x;
    //mov end

    //opacity
    if(data[id].y > ws_size.y_Border){
      data[id].op -= 0.01;
      _img.style.opacity = data[id].op;
    }
    if(data[id].op < 0){
      addimg(id,1);
      _img.style.opacity = data[id].op;
    }
    //opacity end
  }
}
