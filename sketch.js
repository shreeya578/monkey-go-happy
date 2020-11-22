var bg,bgImg,monkey,monkeyrun,bananaimg,jungle,jungleimg,stoneimg,ground,obstacle,obsGrp,banGrp,score=0;

function preload(){
monkeyrun=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");  
  bgImg = loadImage("jungle.jpg")
  bananaimg=loadImage("banana.png");
  jungleimg=loadImage("jungle.jpg");
  stoneimg=loadImage("stone.png");
}

function setup() {
  createCanvas(600, 300);
  bg=createSprite(100,0,600,300);
  bg.addImage(bgImg);
  bg.scale = 1.5;
  bg.x = bg.width /2;
  bg.velocityX = -4;

  monkey = createSprite(50,250,20,50);
  monkey.addAnimation("run",monkeyrun);
  
  monkey.scale = 0.1;
  monkey.x = 50;

  ground = createSprite(400,290,800,20);
  ground.visible = false;
  obsGrp=new Group();
  banGrp=new Group();

}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    obstacle = createSprite(600,265,10,40);
    obstacle.addImage(stoneimg);
    obstacle.velocityX = -6;
    
       //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 100;
    obsGrp.add(obstacle);
  }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    banana = createSprite(600,220,40,10);
    banana.y = random(80,220);
    banana.addImage(bananaimg);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    banGrp.add(banana);
  }
  
}


function draw() {
  background(220);
  if (bg.x < 0){
    bg.x = bg.width/2;
  }
  
  //jump when the space key is pressed
  if(keyDown("space") && monkey.y > 200){
     monkey.velocityY = -10 ;
  }
  
  //add gravity
  monkey.velocityY =  monkey.velocityY + 0.8;
  
  //stop trex from falling down
   monkey.collide(ground);

   if(monkey.isTouching(banGrp)){
     score=score+2;
     banGrp.destroyEach();
   }

   if(monkey.isTouching(obsGrp)){
     monkey.scale=0.1;
   }
   switch(score){
     case 10:monkey.scale=0.15;
     break;

     case 20:monkey.scale=0.2;
     break;

     case 30:monkey.scale=0.25;
     break;

     case 40:monkey.scale=0.3;
     break;

     case 50:monkey.scale=0.35;
     break;

     default:break;

   }

  spawnBananas();
  spawnObstacles();
  drawSprites();
  textSize(18);
  fill(255);
  text("score "+score,500,20);
}