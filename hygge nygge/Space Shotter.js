let player 
//bullets er en liste til alle kuglerne
let bullets = []
//enemies er en liste (et array) med fjender
let enemies = []
//array til ekspolsioner 
let explosions = []
//animeret gif med ekspolsion: 
let explosion


function preload(){
  explosion = loadImage('explosion.gif') 
}
function setup() {
  createCanvas(400, 400)
  //player er et JSON objekt 
  //med variabler og funktioner 
  //som viser og styrer playeren 
  player = {
    x: width/2,
    y:height - 30, 
    w:40,
    h:30,
    s:5,
    show: function (){
      rectMode(CENTER)
      fill(0)
      rect(this.x, this.y, this.w, this.h)
    },
    move: function(direction){
      //flyt playerens x-værdi med direction * 5 
      this.x += direction * this.s
      //begræns x værdien til skærmens bredde 
      this.x = constrain(this.x, 0, width)
    },
    shoot: function(){
      //createBullet returnerer en JSON kugle  
      let b = createBullet()
      //bullets er arrayet med kugler
      bullets.push(b)
    }
  }
}

function draw() {
  background(220)
  

  
  //player 
  if(keyIsDown(LEFT_ARROW)){
    player.move(-1)
  }
  if(keyIsDown(RIGHT_ARROW)){
    player.move(1)
  }
  player.show()

  //bullets 
  //løb alle kuglerne i bullets igennem med et loop
  //og kald show og move funktionen på hver kugle
  for(let i = 0; i < bullets.length; i++){
    bullets[i].show()
    bullets[i].move()    
  }
  //HVIS vi ville affyre kugler automatisk
  //if(frameCount % 50 == 0){
  //  player.shoot()   
  //}
  
  //enemies
  //modulo 60 betyder at når der er NUL i rest af         //divisionen, så er betingelsen opfyldt
  if(frameCount % 60 == 0){
    let enemyType = round(random(1))
    let e = createEnemy()
    enemies.push(e)
  }
  for(let i = 0; i < enemies.length; i++){
    enemies[i].show()
    enemies[i].move()    
  }
  //nu skal vi tjekke om kugler rammer fjender 
  //vi laver et loop, som kigger på hver eneste kugle 
  //og kigger ALLE fjenderne igennem for at se om den     //rammer dem 
  for(let i = 0; i < bullets.length; i++){
    //vi tager hver kugle:
    let theBullet = bullets[i]
    //så kigger vi ALLE fjenderne igennem 
    //med theBullet
    for(let n = 0; n < enemies.length; n++){
      //vi tager en fjende: 
      let anEnemy = enemies[n]
      //og ser om den kolliderer med kuglen: 
      if(bulletHitEnemy(theBullet, anEnemy)){
        //vi sletter dem begge fra deres arrays: 
        bullets.splice(i, 1)
        enemies.splice(n, 1)
        explosions.splice(n, 1)
        createExplosion(theBullet.x, theBullet.y)
      }
    }
  }
  //vis ekplosioner 
  for(let i = 0; i < explosions.length; i++){
    // vi laver en variabel til at referere til 
    //eksplosionen 
    let e = explosions[i]
    image(explosion, e.x, e.y, 100, 100)   
  }
  
  function createExplosion(x, y){
    let e = {
      x: x, 
      y: y, 
      end: millis() + 1000
    }
    explosions.push(e)
  }
  
}

function createBullet(){
  //giv et objekt med en ny kugle tilbage
  return {
    x: player.x,
    y: player.y,
    d: 8, 
    s: 10, 
    show: function(){
      fill('yellow')
      ellipse(this.x, this.y, this.d)
    },
    move: function(){
      this.y -= this.s
    }
  }
}

function createEnemy(type){
  //giv et nyt enemy objekt tilbage
  return {
    x: random(width),
    y: -20,
    d: 30,
    s: 2,
    t: type,
    show: function(){
      if(this.t == 0){
        fill(255, 0, 0)
      }
      if(this.t == 1){
        fill(0, 255, 0)
        
      }
      fill(255, 0, 0)
      ellipse(this.x, this.y, this.d)
    },
    move: function(){
      this.y += this.s
    }
  }
}

function bulletHitEnemy(bullet, enemy){
  //vi opfatter fjender og kugler som firkanter 
  //derfor gemmer vi lige deres sider's x og y værdi 
  //i nogle variabler
  let enemyLeft = enemy.x - enemy.d / 2
  let enemyRight = enemy.x + enemy.d / 2
  let enemyTop = enemy.y - enemy.d / 2
  let enemyBottom = enemy.y + enemy.d / 2

  let bulletLeft = bullet.x - bullet.d / 2
  let bulletRight = bullet.x + bullet.d / 2
  let bulletTop = bullet.y - bullet.d / 2
  let bulletBottom = bullet.y + bullet.d / 2

  //nu bruger vi udelukkelsesmetoden 
  let collision = true 
  
  if(
    //kuglens højre side er mindre end fjendens venstre
    bulletRight < enemyLeft ||
    //kuglens bund er over fjendens top
    bulletBottom < enemyTop ||
    //kuglens top under fjendens bund
    bulletTop > enemyBottom ||
    //kuglen er til højre for fjenden
    bulletLeft > enemyRight
  ){
     collision = false 
  }
  //returner hvorvidt de rammer hinanden 
  return collision 
}

function keyPressed(){
  if(key == " "){
    //vi kalder shoot funktionen inde i player objektet
    player.shoot()
  }
}