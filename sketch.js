
var bg, bgImage;
var Iron;
var edges;

function preload() {
  bgImage = loadImage("images/bg.jpg");
 Iron =loadImage("images/iron.png")
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
 bg.addImage(bgImage);
 bg.scale=2;
 IronMan=createSprite(200,350,20,50);
 IronMan.addImage(Iron)
 IronMan.scale=0.3;
}

function draw() {
  if(keyDown("up")){
    IronMan.velocityY= -10;
} 
if(keyDown("left")){
  IronMan.x = IronMan.x -5;
} 
if(keyDown("right")){
  IronMan.x = IronMan.x +5;
} 
IronMan.velocityY = IronMan.velocityY +0.5;  
    drawSprites();
   
}

