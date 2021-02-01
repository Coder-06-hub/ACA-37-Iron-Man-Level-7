
var bg, bgImage;
var Iron;
var edges;
var brickGroup, brickImage;
var diamondsGroup, diamondImage;
var coinScore=0;

function preload() {
  bgImage = loadImage("images/bg.jpg");
 Iron =loadImage("images/iron.png")
 brickImage= loadImage("images/stone.png");
 diamondImage= loadImage("images/diamond.png");
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
 bg.addImage(bgImage);
 bg.scale=2;
 bg.velocityX=-6;
 IronMan=createSprite(200,350,20,50);
 IronMan.addImage(Iron);
 IronMan.scale=0.3;
 IronMan.debug=true;
 brickGroup=new Group();
 diamondsGroup= new Group();
 IronMan.setCollider("rectangle",100,0,200,400);
}

function draw() {

  if(bg.x<100)
    {
    bg.x=bg.width/4;
    }
    if(IronMan.x<200)
    {
IronMan.x=200;
    }
    if(IronMan.y<50)
    {
IronMan.y=50;
    }
  if (keyDown("up")) {
    IronMan.velocityY = -10;
  }
  if (keyDown("left")) {
    IronMan.x = IronMan.x - 5;
  }
  if (keyDown("right")) {
    IronMan.x = IronMan.x + 5;
  }
  IronMan.velocityY = IronMan.velocityY + 0.5;
  generateBricks();
  for (var i = 0; i < brickGroup.length; i++) {
    var temp = brickGroup.get(i);

    if (temp.isTouching(IronMan)) {
      IronMan.collide(temp);
    }
  }
  for(var i=0;i<(diamondsGroup).length;i++)
  {
      var temp=(diamondsGroup).get(i);
      if(temp.isTouching(IronMan))
      {
          coinScore++;
          temp.destroy();
          temp=null;
      }
  }
generateDiamonds();
drawSprites();
textSize(20);
fill("brown");
text("Coins Collected "+coinScore,400,50)
   
}
function generateBricks() {
  if (frameCount % 60 === 0) {
    var brick = createSprite(1200, 10, 40, 10);
    brick.x = random(50, 850);
    brick.addImage(brickImage);
    brick.velocityY = 5;
    brick.lifetime = 250;
    brickGroup.add(brick);
  }
}

function generateDiamonds()
{
    if(frameCount%50==0)
    {
var diamonds= createSprite(1200,120,40,10);
diamonds.addAnimation("diamond",diamondImage);
diamonds.x = random(50, 850);
diamonds.scale = 0.5;
diamonds.velocityY = 3;
diamonds.lifetime=1200;
diamondsGroup.add(diamonds);
    }
}

