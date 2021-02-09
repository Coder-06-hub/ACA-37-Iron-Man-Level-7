// Global Variable of background
var bg, bgImage;

// Global Variable of IronMan
var IronImage;

// Global Variables of Stones
var brickGroup,stoneImage;

// Global Variables of Diamonds
var diamondsGroup, diamondImage;

// Global Variable of ScoreBoard
var coinScore=0;

// Global Variable Of Game-State
var gameState="PLAY";



function preload()
{
    // Loading Background Image
    bgImage = loadImage("images/bg.jpg");

    // Loading IronMan Image
    IronImage=loadImage("images/iron.png");

    // Loading Diamond Image
    diamondImage= loadImage("images/diamond.png");

    // Loading Stone Image
    stoneImage= loadImage("images/stone.png");

    // Loading Spike Image
    spikeImage= loadImage("images/spikes.png");

    // Loading Restart Image
    restartImage=loadImage("images/restart.png");
}

function setup() 
{
    // Creation Of Canvas
    createCanvas(1000, 600);

    // Creation Of Background Sprite
    bg = createSprite(580,300);
    bg.addImage(bgImage);
    bg.scale=2;
    bg.velocityX=-6;

    // Creation Of IronMan Sprite
    IronMan=createSprite(200,350,20,50);
    IronMan.addImage(IronImage);
    IronMan.scale=0.3;
    IronMan.debug=true;

    // Creation Of Groups
    stoneGroup=new Group();
    diamondsGroup= new Group();
    obstacleGroup= new Group();

    // Creation Of Restart Button
    restart=createSprite(500,300);
    restart.addImage(restartImage);
    restart.visible=false;

    // Creation Of Collider For IronMan
    IronMan.setCollider("rectangle",100,0,200,400);
}

function draw()
{
    
    if(gameState=="PLAY")
    {
        IronMan.setCollider("rectangle",100,0,200,400);
        IronMan.scale=0.3;
        bg.velocityX=-6;

    // Scroll Background
    if(bg.x<100)
    {
    bg.x=bg.width/4;
    }

    // Preventing IronMan Moving Out With Stones
    if(IronMan.x<200)
    {
      IronMan.x=200;
    }

    // PreventingIronMan Moving Out From Top
    if(IronMan.y<50)
    {
      IronMan.y=50;
    }

    // Moving IronMan By Pressing Upkey
    if (keyDown("up"))
    {
      IronMan.velocityY = -10;
    }

    // Moving IronMan By Pressing Upkey
    if (keyDown("left"))
    {
      IronMan.x = IronMan.x - 5;
    }

    // Moving IronMan By Pressing Upkey
    if (keyDown("right"))
    {
      IronMan.x = IronMan.x + 5;
    }

    // Gravity Of IronMan
    IronMan.velocityY=IronMan.velocityY + 0.5;

    // Calling The FUNCTION To Generate Stones
    generateStones();

    // Make IronMan Collide With Stones
    for(var i = 0; i < stoneGroup.length; i++)
    {
       var temp = stoneGroup.get(i);
       if (temp.isTouching(IronMan))
       {
          IronMan.collide(temp);
       }
    }

    // Make IronMan Collect The Diamonds
    for(var i=0;i<(diamondsGroup).length;i++)
    {
        var temp=(diamondsGroup).get(i);
        if(temp.isTouching(IronMan))
        {
            // Increase The Score On The ScoreBoard
            coinScore++;

            // Destroy Diamonds When IronMan Collects Them
            temp.destroy();
            temp=null;
        }
    }

    // Make IronMan Collide With The Obstacles
    for(var i=0;i<(obstacleGroup).length;i++)
    {
        var temp=(obstacleGroup).get(i);
        if(temp.isTouching(IronMan))
        {
            // Decrease The Score On The ScoreBoard
            coinScore=coinScore-5; 
            
            // Destroy Obstacles When IronMan Collides With Them
            temp.destroy();
            temp=null;
        }
    }

    // Calling The FUNCTION To Generate Diamonds
    generateDiamonds();

    // Calling The FUNCTION To Generate Obstacles
    generateObstacles();
    if(coinScore<=-11)
    {
        gameState="END";
    }

    if(IronMan.y>=610)
    {
        gameState="END";
    }
}

// Ending Of If Statement
else if(gameState=="END")
{
    bg.velocityX=0;
    IronMan.velocityY=0;
    IronMan.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    diamondsGroup.setVelocityXEach(0);
    diamondsGroup.setLifetimeEach(-1);
    stoneGroup.setVelocityXEach(0);
    stoneGroup.setLifetimeEach(-1);
    IronMan.scale=0.3;
    IronMan.y=350;
    restart.visible=true;
    if(mousePressedOver(restart))
    {
        restartGame();
    }
}

    // Calling The FUNCTION To Draw Sprites
    drawSprites();

    // Text Size
    textSize(20);

    // Text Color
    fill("brown");

    // ScoreBoard
    text("Diamonds Collected: "+coinScore,400,50)  
}

// FUNCTION For Generating The Stones
function generateStones()
{
   if(frameCount%60==0) 
   {
      // Creating Bricks After Every 60 FrameCounts
      var stone = createSprite(1200, 10, 40, 10);
      stone.x = random(50,850);
      stone.addImage(stoneImage);
      stone.velocityY=6;

      // To Prevent The Memory Leakage Problem
      stone.lifetime = 250;
      stoneGroup.add(stone);
   }
}

// FUNCTION For Generating The Diamonds
function generateDiamonds()
{
    if(frameCount%70==0)
    {
        // Creating Bricks After Every 50 FrameCounts
        var diamonds= createSprite(1200, 0, 40, 10);
        diamonds.addAnimation("diamond",diamondImage);
        diamonds.x = random(50, 850);
        diamonds.scale = 0.5;
        diamonds.velocityY = 3;

        // To Prevent The Memory Leakage Problem
        diamonds.lifetime=1200;
        diamondsGroup.add(diamonds);
    }
}

// FUNCTION For Generating The Obstacles
function generateObstacles()
{
    if(frameCount%50==0)
    {
        // Creating Spikes After Every 50 FrameCounts
        var spikes = createSprite(1200, 90, 10, 40);
        spikes.addAnimation("spike", spikeImage);
        spikes.x = random(50, 850);
        spikes.scale = 0.5;
        spikes.velocityY = 3;

        // To Prevent The Memory Leakage Problem
        spikes.lifetime = 600;
        obstacleGroup.add(spikes);
    }
}

function restartGame()
{
    gameState="PLAY";
    obstacleGroup.destroyEach();
    stoneGroup.destroyEach();
    diamondsGroup.destroyEach();
    coinScore=0;
    restart.visible=false;
}
