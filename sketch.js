var player;
var playerimg;
var playerreverseimg;
var playerjumpimg;
var playercrouchimg;
var playersprintimg;
var playerded;
var playerdedimg;
var playerfartimg;

var virus;
var virusimg;

var vb;
var vb2;
var sv;
var svGroup;
var svcount = 1;
var svimg;

var gameover;

var tun11img;
var tun2img;
var tun3img;
var tun1;
var tun2;
var tun3;

var backimg;
var back;

var ground;
var groundimg;
var invisibleground;

var sprint;
var jump;
var crouch;

var next;

var sprintvalue = 0;
var jumpstate = 0;

var gameState = 1;

var gobacktext = 1;

var vaccineimg;
var sanimg;
var maskimg;

var count = 0

var checkpoint;

var obs;
var obsimg;

var rand;

function preload(){
groundimg = loadImage("ground.png")
playerimg  = loadImage("playerinv.png")
playerreverseimg = loadImage("playerinv1.png")
playerjumpimg = loadImage("player2.png")
playerdedimg = loadImage("ded.png")
playersprintimg = loadImage("playersprint.png")
playercrouchimg = loadImage("playercrouch2.png")
playerfartimg = loadImage("playerfartimg.png")
virusimg = loadImage("virus.png")
svimg = loadImage("spikeimg.png")
tun1img = loadImage("TUN1.png")
vaccineimg = loadImage("VACCINE.png")
sanimg = loadImage("2DSAN.png")
maskimg = loadImage("covmask.png")
obsimg = loadImage("OBSside.png")

checkpoint = loadSound("checkpointsound.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  ground = createSprite(width/2, height/2+350, 10, 10)
  ground.addImage(groundimg)
  ground.scale = 1.8

  invisibleground = createSprite(width/2-500, height/2+300, 10000, 185)
  invisibleground.visible = false;
  
  sprint = createButton("SPRINT")
  sprint.position(width/2+450, height/2+250)
  jump = createButton("JUMP")
  jump.position(width/2+350, height/2+250)

  crouch = createButton("CROUCH")
  crouch.position(width/2+550, height/2+250)

  back = createButton("BACK")
  back.position(width/2, height/2+100)
  back.hide()

  player = createSprite(width/2-500 , height/2+130, 10, 10)
  player.addImage(playerimg)
  player.scale = 0.7
  player.velocityY = player.velocityY+0.4

  virus = createSprite(width/2+500, height/2, 10, 10)
  virus.addImage(virusimg)
  virus.scale = 0.2
  virus.velocityY = -3

  vb = createSprite(width/2+500, height/2-90, 10,10)
  vb.visible = false;
  vb2 = createSprite(width/2+500, height/2+160, 10,10)
  vb2.visible = false; 

  svGroup = new Group();
}

function draw() {
  background(255,255,255);  
if (gameState === 1){

  textSize(15)
  textFont("cooper black")
  text("Score: "+ count, width/2+150, height/2-200);

  ground.velocityX = -(6 + 3*count/100);
      
  count = count+Math.round(World.frameRate/60);

  if (count>0 && count%200 === 0){
    textSize(20)
    textFont("cooper black")
    text("CHECKPOINT", width/2, height/2)
    checkpoint.play()
  }

  rand = random(height/2+200, height/2-200)

  if (count>0 && count%800 === 0){
  if(World.frameCount % 65 === 0) {
    obs = createSprite(width/2+1000, height/2)
    obs.y = rand;
    obs.addImage(obsimg)
    obs.velocityX = -4
  }
}

  ground.velocityX = -8

  virus.bounceOff(vb)
  virus.bounceOff(vb2)

  if (World.frameCount % 60 === 0){
    sv = createSprite(virus.x-10, virus.y, 10, 10)
    sv.addImage(svimg)
    sv.scale = 0.1
    sv.velocityX = -6;
    svGroup.add(sv)
  }

  if (svGroup.isTouching(player)){
    player.addImage(playerdedimg)
    player.scale = 0.3
  }
  else{
    player.scale = 0.7
  }

  if (invisibleground.x < 350){
    invisibleground.x = invisibleground.width/2;
  }

  if (ground.x < 350){
    ground.x = ground.width/2;
  }

  if (player.isTouching(virus)){
    player.visible = false;
    playerded = createSprite(width/2+500, height/2+200)
    playerded.addImage(playerdedimg)
    playerded.scale = 0.3
    player.position
    gameState = 0.1
  }

  if (player.x === 0){
    player.destroy();
    gameState = 0.1
  } 

  crouch.mousePressed(()=>{
  player.addImage(playercrouchimg)
  player.scale = 0.5
  })

  crouch.mouseReleased(()=>{
  player.addImage(playerimg)
  player.scale = 0.7
  })

  sprint.mousePressed(()=>{
    player.addImage(playersprintimg)
    player.x = player.x+200
    sprintvalue = sprintvalue+1
  })

  if (sprintvalue === 1){
    sprint.hide()
  }

  jump.mousePressed(()=>{
    player.addImage(playerjumpimg)
    player.velocityY = -12
  })

  if (player.collide(invisibleground)){
    player.addImage(playerimg)
  }

  if (player.y < height/2-55){
    player.velocityY = 10
  }

  player.collide(invisibleground) 
}

if (gameState === 0.1){
  textSize(25)
  textFont("cooper black")
  fill("red")
  text("YOU LOST. PRESS BACK TO RESTART", width/2-250, height/2)
  back.show()
  sprint.hide()
  player.visible = false;
  sv.visible = false;
  virus.visible = false;
  ground.visible = false;
}

back.mousePressed(()=>{
  gameState = 1;
})
  drawSprites()
}