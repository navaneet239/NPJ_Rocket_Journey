var SET = 0,
  JUMP = 1,
  ESCAPE = 2
  END = 3;
var gameState = SET;

var bk, bkk;

var astro, astrobk;

var stone, stonebk, stoneGroup, astone, astoneGroup;

var score = 0;

var holdbar, holdbarbk;

var hold1, hold2;

function preload() {

  bkk = loadImage("space floatbk.jpg")

  astrobk = loadImage("astronaut.png");

  stonebk = loadImage("astroid.png");

  holdbarbk = loadImage("rocket.png")



}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background("black");

  bk = createSprite(200, 200, 400, 400);
  bk.addImage(bkk);
  bk.scale = 3;
  //bk.velocityX = -5;

  astro = createSprite(120, bk.y/2 + 130, 50, 50);
  astro.addImage(astrobk);
  astro.scale = 0.30;
  // astro.setCollider("rectangle", 0, 0, 150, 150, 0)
  //astro.debug = true

  stoneGroup = createGroup();

  astoneGroup = createGroup();
 
  holdbar = createSprite(110, 300, 400, 200);
  holdbar.addImage(holdbarbk);
  holdbar.setCollider("rectangle", 0, 0, 200, 50, 0)
  //holdbar.debug = true;

  hold1 = createSprite(width/2, 60,width,10);
  hold1.visible = false

  hold2 = createSprite(width/2, height/2 + 150 ,width,10);
  hold2.visible = false

}

function draw() {

  drawSprites();


  
  text("Score: " + score, width/2 - 30, 30, fill("white"),textSize(20));

  astro.collide(holdbar)

  if (gameState === SET) {
    bk.velocityX = 0;
    astro.visible = false;
    holdbar.visible = false;



    text("Press 'j' to play jump from the astroid or press 'e' to play escape from the astroid.", width/2 - 450   , bk.y/2 + 100, fill("white"),textSize(25))
    
    if (keyWentDown("j")) {
      gameState = JUMP;
      
    }

    if (keyWentDown("e")) {
      gameState = ESCAPE;
      
    }


  }

  if (gameState === JUMP) {
    astro.visible = true;
    holdbar.visible = true;


    holdbar.y = 300;

    score = score + Math.round(setFrameRate() / 60);
    
    bk.velocityX = -(8 + 3 * score / 100);

    if (bk.x < 0) {
      bk.x = bk.width / 2;
    }

    if (keyDown("SPACE") && astro.y >= 120) {
      astro.velocityY = -13;
    }

    astro.velocityY = astro.velocityY + 0.8
    
    astroid1();

    if(stoneGroup.isTouching(astro)){
      gameState = END;
      astro.velocityY = 0;
    }

  }

  if (gameState === ESCAPE) {
    astro.visible = false;
    holdbar.visible = true;


    score = score + Math.round(setFrameRate() / 60);
    
    bk.velocityX = -(8 + 3 * score / 100);

    if (bk.x < 0) {
      bk.x = bk.width / 2;
    }

    if (keyWentDown("UP_ARROW")) {
      holdbar.velocityY = -10
    }

    if(keyWentDown("DOWN_ARROW")){
      holdbar.velocityY = 10
    }
    
    astroid2();

    if(astoneGroup.isTouching(holdbar)){
      gameState = END;

      holdbar.velocityY = 0;
    }

    holdbar.collide(hold1)
  

    holdbar.collide(hold2)

  }

  if (gameState === END){
    bk.velocityX = 0;
    
    stoneGroup.setVelocityXEach(0);
    stoneGroup.destroyEach();
    
    stoneGroup.setLifetimeEach(-1);

    astoneGroup.setVelocityXEach(0);
    astoneGroup.destroyEach();
    
    astoneGroup.setLifetimeEach(-1);

    
    text("Press Space to restart",width/2 - 150,200, textSize(30));
    
    if (keyWentDown("SPACE")){
      replay();
    }
  }
  
}

function astroid1() {

  if (frameCount % 80 === 0) {
    stone = createSprite(width, 200, 20, 20);
    stone.addImage(stonebk);
    stone.scale = 0.5;
    stone.velocityX = -(8 + 3 * score / 100);
    
    stone.setCollider("rectangle",0,0,90,90,0);
     // stone.debug = true;
    
    stone.lifetime = width/-(8 + 3 * score / 100);
    
    stoneGroup.add(stone);
    

  }
}

function astroid2() {

  if (frameCount % 80 === 0) {
    astone = createSprite(width, 200, 20, 20);
    astone.addImage(stonebk);
    astone.scale = 0.5;
    astone.velocityX = -(8 + 3 * score / 100);
    astone.y = random(90, 275);
    
    astone.setCollider("rectangle",0,0,90,90,0);
    //  stone.debug = true;
    
    astone.lifetime = width/-(8 + 3 * score / 100);
    
    astoneGroup.add(astone);
    

  }
}

function replay (){
  
  gameState = SET;
  
  score = 0;
  
  astro.y = bk.y/2 + 100;

  
}