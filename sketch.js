var soldr, soldrImg, soldrDead;
var bg1
var bg;
var zombie, zombieImg, zombieKill, zombieGroup;
var platform, platformImg;
var bullet, bulletsImg, bulletsGroup;
var invGround;
var coin, coinImage, coinGroup;
var starScore = 0;
var gameState = "PLAY";
var gameOver, gameOverImg, restart, restartImg;

function preload(){
  soldrImg = loadImage('sprites/sold.png');
  soldrDead = loadImage('sprites/soldier_slide.png');
  bg = loadImage('sprites/background.png');
  zombieImg = loadImage('sprites/zombie_skid.png');
  zombieKill = loadImage('sprites/zombie_slide.png');
  platformImg = loadImage('sprites/groundDirt.png');
  bulletImg = loadImage('sprites/bullet.png');
  coinImage = loadImage('sprites/star.png');
  gameOverImg = loadImage('sprites/gameOver.png');
  restartImg = loadImage('sprites/restart.png');
}

function setup(){
  canvas = createCanvas(1100,400);

  ground = createSprite(400,200,1100,100);
  ground.addImage(bg);
  ground.scale = 1.8;
  ground.velocityX = -2;

  soldr = createSprite(150,250,50,50);
  soldr.addImage(soldrImg);

  // invGround = createSprite(550,395,2000,5);
  // invGround.visible = false;

  bulletsGroup = createGroup();
  zombieGroup = createGroup();
  coinGroup = createGroup();

}

function draw(){
  background("skyblue");
  drawSprites();

  fill("red");
  textSize(15);
  text("Score : "+ starScore,100,50);

  if(frameCount < 100){
    textSize(20);
    fill("blue");
    text("Use Arrow keys to move the player.",300,50);
    text("Use space key to shoot.",350,100);
  }

  console.log(frameCount);

  if(gameState === "PLAY"){

  fill("red");
  textSize(15);
  text("Survival Time : "+frameCount/100,900,50);

  ground.velocityX = -2;

  if(ground.x < 380){
    ground.x=ground.width/2;
  }

  if(keyCode === 38){
      soldr.y = soldr.y - 4;
  }

  if(keyCode === 40){
      soldr.y = soldr.y + 1;
  }

  if(keyCode === 39){
    soldr.x = soldr.x + 2;
  }

  if(keyCode === 37){
    soldr.x = soldr.x - 1;
  }

  if(keyCode === 32){
    shoot();
  }

  soldr.y = soldr.y + 0.8

  spawnZombies();

 if(zombieGroup.isTouching(bullet)){
     bulletsTouch();
     spawnCoins();
  }

  if(soldr.isTouching(zombieGroup)){
    soldr.addImage(soldrDead);
    gameState = "END";
  }

  if(soldr.isTouching(coinGroup)){
    starScore = starScore+Math.round(random(1,5));
    for(var i=0; i < coinGroup.length; i++){
      if(coinGroup.get(i).isTouching(soldr)){
        coinGroup.get(i).remove();
      }
    }
  }

  if(gameState === "END"){
    gameEnd();
  }
}

  if(mousePressedOver(restart)){
    restartGame();
  }

}

function shoot(){
  bullet = createSprite(soldr.x,soldr.y,5,5);
  bullet.addImage(bulletImg);

  bullet.velocityX = 20;
  bullet.velocityY = 1;
  bullet.rotation = -20;
  bullet.lifetime = 1000;
  //bulletsGroup.add(bullet);
}

function spawnZombies(){
  var xPos = random(700,1050);
  var yPos = random(75,325);
  if(frameCount % 80 === 0){
    zombie = createSprite(xPos,yPos,50,50);
    zombie.addImage(zombieImg);
    zombie.velocityX = -5;
    zombie.lifetime = 1000;
    zombieGroup.add(zombie);
  }
}
function spawnCoins(){
  coin = createSprite(zombie.x,zombie.y,10,10);
  coin.addImage(coinImage);
  coin.velocityX = -2;
  coin.lifetime = 1000;
  coinGroup.add(coin);
}

function bulletsTouch(){
  zombie.destroy([1]);
  bulletsGroup.destroyEach();
}

function gameEnd(){
  soldr.velocityX = 0;
  soldr.velocityY = 0;
  zombieGroup.destroyEach();
  coinGroup.destroyEach();
  ground.velocityX = 0;
  gameOver = createSprite(550,200,100,100);
  gameOver.addImage(gameOverImg);
  restart = createSprite(520,300,50,50);
  restart.addImage(restartImg);
}

function restartGame(){
  gameOver.visible = false;
  restart.visible = false;
  soldr.addImage(soldrImg);
  gameState = "PLAY";
}