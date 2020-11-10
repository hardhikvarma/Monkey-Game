
var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var survivalTime = 0;
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=(0.1);
  
  ground = createSprite(400,350,900,15);
  ground.velocityX =-4;
  console.log(ground.x);
  
  score = 0;
  
  FoodGroup =new Group();
  obstaclesGroup =new Group();
}


function draw() {
  background("white");
  
  //monkey.debug = (true);
  
  stroke("white");
  textSize(20);
  fill("black");
  text("score:" + score,70,50);
  
   stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time:" + survivalTime,300,50);
  survivalTime = Math.ceil(frameCount/getFrameRate());
  
 if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  monkey.collide(ground);
  
  if(keyDown("space")&& monkey.y >= 100){
    monkey.velocityY = -10;
   
  }
    monkey.velocityY = monkey.velocityY + 0.8;
  
   if(FoodGroup.isTouching(monkey)){
    score = score+1;
    FoodGroup.destroyEach();
  }
  
  if(obstaclesGroup.isTouching(monkey)){
  textSize(30);
  text("gameOver",180,200);
   monkey.velocityX = 0;
   FoodGroup.destroyEach();
   obstaclesGroup.setVelocityXEach(0); 
   obstaclesGroup.setLifetimeEach(-1);
    ground.velocityX = 0;
   score = 0;
   survivalTime = 0; 
    
  }
  
  food();
  obstacles();
  
  drawSprites();
}

function food(){
 if(frameCount % 80 === 0)
 {
  var banana = createSprite(); 
   banana.x = Math.round(random(70,400));
   banana.velocityX = - 3
   banana.y = Math.round(random(120,200)); 
   banana.addImage("banana",bananaImage);
   banana.scale = (0.08);
   banana.lifetime = 300; 
   banana.debug=(true);
 
   FoodGroup.add(banana);
   
 } 
}

function obstacles(){
 if (frameCount % 300   === 0){
   var obstacle = createSprite(600,312,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage("obstacles",obstacleImage)
   obstacle.scale = (0.2);
   obstacle.lifetime = 200;
   
   obstaclesGroup.add(obstacle);
   
 }
   
}