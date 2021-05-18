"useStrict"; 


let state = 'title';
let canv;
let points = 0;
let w = 600
let h = 600
let player;
let coins = [];
let astro = [];
let playerImg;
let coinImg;
let astroImg;
let winImg;
let bg2; 
let bg3; 
let bg4;
let bg; 

function preload(){
  playerImg = loadImage('lion.png');
  coinImg = loadImage('star.png');
  astroImg = loadImage('astro.png');
  winImg = loadImage('winnerscreen.png');
 
  
}



function setup() {
  canv = createCanvas(600, 600);
  textFont ('Georgia');
  player = new Player();
  coins.push(new Coins()); 
 
  astro.push(new Astro()); 
  
  bg = loadImage("title.png")
  bg2 = loadImage("night.png")
  bg3 = loadImage('winnerscreen.png')
  bg4 = loadImage('dreams.png')
}

function keyPressed(){
  if (keyCode == LEFT_ARROW){
    player.direction = 'left'
  } else if (keyCode == RIGHT_ARROW ) {
    player.direction = 'right'
  } else if (keyCode == DOWN_ARROW ) {
    player.direction = 'down'
  } else if (key == '') {
    player.direction = 'still'
  }
}

function draw() {
  
switch(state) {
  case 'title':
    title();
    canv.mouseClicked(titleMouseClick);
    break;
  case 'info':
    info();
    canv.mouseClicked(titleMouseClick);
    break;
  case 'level1':
    level1();
    canv.mouseClicked(titleMouseClick);
    break;
  case 'you win':
    youWin();
    canv.mouseClicked(youWinMouseClick);
    break;
  default:
    break;
}
  
}



function title(){
  background(bg)
  
  if (random(1) <= 0.02){
    coins.push(new Coins());
  }
  
  for (let i = 0; i < coins.length; i++){
  coins[i].display();
  coins[i].move();
    
  

    
  }

  
}

function titleMouseClick(){
    console.log('canvas is clicked on title');
    if (state == 'title') {
    state = 'info';
    console.log('Move to info');
  } else if (state == 'info') {
    state = 'level1';
    console.log('Move to game');
}
    
  }


function level1 (){
  background (bg2);
  fill (255, 254, 252);

  if (random(1) <= 0.01){
    coins.push(new Coins());
  }
  
  if (random(1) <= 0.01) {
    astro.push(new Astro());
      }
  
  player.display();
  player.move();
  
  //iterating through coins array to display and move them
  // using for loop
  for (let i = 0; i < astro.length; i++){
  astro[i].display();
  astro[i].move();
  }
  
  for (let i = 0; i < coins.length; i++){
  coins[i].display();
  coins[i].move();
  }
  
  if (points >= 20) {
    state = 'you win';
  }
    
  //check for collision, if collision occurs increase points by 1 and splice that coin out of array
  // need to iterate backwards through array

 for (let i = coins. length - 1; i >= 0; i--) {
   if (dist(player.x, player.y, coins[i].x, coins[i].y) <= (player.r +  coins[i].r) /3){
     points++;
     console.log(points);
     coins.splice(i, 1);
   } else if(coins[i].y > h){
     coins.splice(i,1);
     console.log ('coin is out');
   }
}

 text(`points: ${points} `, w/10, h - 30);
  
  for (let i = astro. length - 1; i >= 1; i--) {
 if (dist(player.x, player.y, astro[i].x, astro[i].y) <= (player.r +  astro[i].r) /3){
    points--;
    console.log(points);
    astro.splice(i, 1);
    } else if(astro[i].y > h){
      astro.splice(i,1);
      console.log ('astro out');
    }
}
  
  
}

function youWin(){
  background (bg3);
  
}

function youWinMouseClick(){
  state = 'title';
  points = 0;
}

function info(){
    background (bg4);
}