//keep track of our socket connection
var socket;

function setup() {
  createCanvas(400,400);
  background(0);

  //start a socket connection to the server
  socket = io.connect('http://localhost:3000');//some day we would run the server somewhere else

  //received backend mouse event and draw different collored circle on x aand y
  socket.on('mouse', function(data){
    fill(0,0,255);
    noStroke();
    ellipse(data.x,data.y, 15, 15)
  });
}

function draw() {
  //not going to use draw
}

function mouseDragged(){
  //draw some white circles
  fill(255);
  noStroke();
  ellipse(mouseX, mouseY, 15, 15);

  //call send mouse
  sendMouse(mouseX, mouseY);
}

function sendMouse(xpos, ypos){
  console.log("sendMouse:"+xpos+""+ypos);
  //send the mouse coordinates
  var data = {
    x: mouseX,
    y: mouseY
  };
  //send that object to the sockets
  socket.emit('mouse', data);
}
