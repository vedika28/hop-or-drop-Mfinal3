//declaring all variables:
var block1Img, block2Img, block1, block2, block = [];
var bgImg, bg, plank;
var player, playerAnm, player_jump, player_die, player_shield;
var enemy1, enemy2, enemy = [];
var resetButton, gameState;
var life = 0, score = 0, blockX, shieldImg = 0;
var scoreSound, gameOverSound, playerImgNum=0;

//all images
function preload() {
  block1Img = loadImage("imgs/block1.jpg");
  block2Img = loadImage("imgs/block2.jpg");
  bgImg = loadImage("imgs/bg2.jpg");
  enemy1 = loadImage("imgs/rock1.png");
  enemy2 = loadImage("imgs/rock2.png");
  playerAnm = loadAnimation("imgs/c1.png", "imgs/c2.png", "imgs/c3.png",
    "imgs/c4.png", "imgs/c5.png", "imgs/c6.png", "imgs/c7.png", "imgs/c8.png");
  player_jump = loadImage("imgs/c8.png");
  player_die = loadImage("imgs/cat_die.png");
  player_shield = loadImage("imgs/player_shield.png");
  player_shield = loadAnimation("imgs/cs1.png", "imgs/cs2.png", "imgs/cs3.png",
    "imgs/cs4.png", "imgs/cs5.png", "imgs/cs6.png", "imgs/cs7.png", "imgs/cs8.png");

  gameOverSound = loadSound("sounds/game_over.mp3");
  scoreSound = loadSound("sounds/score.mp3");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  gameState = "play";

  //creating the objects for the classes:
  player = new Player(width/2, height/2-height/4, 20, 20);
  plank = new Block(width/2, height/2, width/14, 10);
  block1 = new Block((width / 2) + width/4, height/2, width/12, 10)
  block2 = new Block((width / 2) + width/2, height/2, width/9, 10)
  resetButton = new Button();
}

function draw() {
  background(bgImg);
  camera.position.x = player.body.position.x;

  if (gameState === "play") {
    //creating planks for player to jump in them:
    adaptivity();

    //creating enemy:
    var rand3 = random((player.body.x) + 10, (player.body.x) + 200)
    if (frameCount % 250 === 0) {
      enemy = new Enemy(rand3, -20);
    }

    //adding behaviour to player.
    player.behaviour();

    //adding shield to player when "s" key is pressed:
    player.shield();

    //to make reset button position outside canvas
    resetButton.hide();

    //adding behaviour to block and making player collide with it.
    if (block.length > 0) {
      for (var i = 0; i < block.length; i++) {
        block[i].behaviour();
      }
    }
    for (var i = 0; i < block.length; i++) {
      player.body.collide(block[i].body);
    }
    player.body.collide(plank.body);
    player.body.collide(block1.body);
    player.body.collide(block2.body);

    //scoring system:
    if (frameCount % 4 === 0 && frameCount > 150 && shieldImg != 1) {
      score += 1;
    }

    //sound for score:
    if (score % 100 === 0 && score > 10) {
      scoreSound.play();
    }

    //to end game once the enemy(rock) touches the player:
    if (enemy.body) {
      player.die();
    }
  }

  //calling gameOver and reset function once game ends:
  if (gameState === "end") {
    player.body.velocityX = 0;
    player.body.changeImage("die", player_die);
    
    if (block.length > 0) {
      for (var i = 0; i < block.length; i++) {
        block[i].body.destroy();
      }
    }
  }

  drawSprites();

  //instructions when gameState=play:
  if (gameState === "play") {
    textSize(18);
    text("Press 's' to create shield to save yourself from the enemies", player.body.x - 215, 50);
    text("Press the 'up arrow' or 'space key' to jump", player.body.x - 160, 75);
  }
  textSize(22);
  textFont("BOLD")
  text("score: " + score, (player.body.position.x) - width/3, height/6);
  text ("x"+mouseX+"y"+mouseY, mouseX, mouseY);

  // when gameState=end: 
  if (gameState === "end") {
    textSize(34);
    textFont("BOLD")
    resetButton.display();
    text("Game Over!!", player.body.position.x-90, height/2-height/4);
  }
}

//function to make blocks with adaptivity:
function adaptivity() {
  var rand = Math.round(random(width/8, width/14))
  blockX = random((player.body.x + width/2+175), (player.body.x + width/2+275));
  if (score <= 200 && score >= 5) {
    if (frameCount % 60 === 0) {
      block.push(new Block(blockX, height/2, rand, 10));
    }
    player.body.velocityX = 6;
  }
  if (score <= 400 && score > 200) {
    if (frameCount % 70 === 0) {
      block.push(new Block(blockX, height/2, rand, 10));
    }
    player.body.velocityX = 8;
  }
  if (score <= 800 && score > 400) {
    if (frameCount % 85 === 0) {
      block.push(new Block(blockX, height/2, rand, 10));
    }
    player.body.velocityX = 9.5;
  }
  if (score > 800) {
    if (frameCount % 95 === 0) {
      block.push(new Block(blockX, height/2, rand, 10));
    }
    player.body.velocityX = 11;
  }
}