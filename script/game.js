/** @type {HTMLCanvasElement} */

const quack_sound = new Audio("../sounds/duck-quack-112941.mp3")
quack_sound.volume = 1;

const game_over = new Audio("../sounds/game_over.mp3"); 



class Game {
    constructor(ctx, width, height, gun, donald) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.gun = gun;
      this.donald = donald;
      this.highscore = [];
      this.value = [];
      this.intervalId = null;
      this.frames = 0;
      this.ducksLeft = [];
      this.ducksRight = [];
      this.bullet = [];
      this.heart = [];
      this.eggs = [];
      this.magazine = 5;
      this.score = 0;
      this.lifes = 2;
      this.feather = new Image();
      this.feather.src = "../images/feather.png";
      this.animation = false;
      this.time = 0;
      this.currentTime = 0;
      this.duckX
      this.duckY
      this.check = false;
      this.lifesImage = new Image();
      this.lifesImage2 = new Image();
      this.magazineImage = new Image();
      this.crazyDuck = new Image();
      this.crazyDuck.src = "../images/crazy_duck.png";
      this.highScore1 = JSON.parse(localStorage.getItem("highScore1"))
      this.highScore2 = JSON.parse(localStorage.getItem("highScore2"))
      this.highScore3 = JSON.parse(localStorage.getItem("highScore3"))
    }

    start() {
        this.check = false;
        this.intervalId = setInterval(this.update, 1000 / 60);
      }
    getMinutes() {
      return Math.floor((this.currentTime / 3600) % 60);
    }
    getSeconds() {
      return Math.floor((this.currentTime / 60) % 60);
    }
    computeTwoDigitNumber(value) {
      if (value <= 9){
        return `0${value}`
      }else {
        return `${value}`
      }
    }

    update = () => {
    //Game logic here
        this.frames++;
        console.log(this.frames)
        this.currentTime ++;
        this.frames ++;
        this.clear();
        this.gun.draw();
        this.gun.newPos();
        this.gun.boundaries();
        this.duckAnimation(this.duckX, this.duckY)
        this.updateBullets();
        this.updateHeart();
        this.updateObstaclesLeft();
        this.updateObstaclesRight();
        this.updateEggs();
        this.donald.newPos();
        this.collisionDetectionLeft();
        this.collisionDetectionRight();
        this.collisionDetectionHeart();
        this.collisionDetectionDonald();
        this.collisionDetectionEggs();
        this.collisionDetectionEggsGun(); 
        this.drawInfoImages();
        this.checkGameOver();
        if(this.check){
          this.drawEnd();
        }

        
    }

    stop(){
      clearInterval(this.intervalId);
    }

    clear(){
      this.ctx.clearRect(0,0,this.width, this.height)
    }

    updateObstaclesLeft(){
      // BOSS SHOWING UP
      if(this.currentTime > 3600) {
        this.ducksLeft = [];
        this.donald.draw();
          if (this.donald.x >= 800){
            this.donald.speedX = -4;
          } else if( this.donald.x <= 0){
            this.donald.speedX = 4;}
      } 
      //DUCKS AND HEARTS SHOWING UP

        for (let i = 0; i < this.ducksLeft.length; i++) {
          if(this.ducksLeft[i].x > 1000){
            this.ducksLeft.splice(i,1);
            this.lifes -=1 ;
            this.score -=2 ;
            let heartSpeed = Math.floor((Math.random() )* 4 - 4);
            setTimeout( () => {
              if (heartSpeed > 0){
              this.heart.push(new Heart(0, Math.floor((Math.random() * 300) + 50), 70, 50, this.ctx, heartSpeed) ) }
              else {
                this.heart.push(new Heart(1000, Math.floor((Math.random() * 300) + 50), 70, 50, this.ctx, heartSpeed) )
              }
            }, 5000);
          }
          this.ducksLeft[i].x += 1;
          this.ducksLeft[i].x += 1;
          this.ducksLeft[i].draw();
        }
          if (this.frames % 260 === 0) {
            let y = 0;
              while (y <= 50 || y >= 150) {
                y = Math.floor((Math.random() * 150) + 50);
              }
            this.ducksLeft.push(new DucksL(0, y, 70, 50, this.ctx));
          }
    
    }
    updateObstaclesRight(){
      // DELETING DUCKS FROM THE SCREEN
      if(this.currentTime > 3600) {
        this.ducksRight = [];
      } 
      for (let i = 0; i < this.ducksRight.length; i++) {
        if(this.ducksRight[i].x < 0){
          this.ducksRight.splice(i,1)
          this.lifes -= 1;
          this.score -= 2;
          let heartSpeed = Math.floor((Math.random() )* 4 - 4);
          setTimeout( () => {
            if (heartSpeed > 0){
            this.heart.push(new Heart(0, Math.floor((Math.random() * 300) + 50), 70, 50, this.ctx, heartSpeed) ) }
            else {
              this.heart.push(new Heart(1000, Math.floor((Math.random() * 300) + 50), 70, 50, this.ctx, heartSpeed) )
            }
          }, 5000); 
        }
        this.ducksRight[i].x -= 1;
        this.ducksRight[i].draw();
      }
      if (this.frames % 260 === 0) {
          let y = 150;
          while (y <= 150 || y >= 300) {
            y = Math.floor((Math.random() * 200) + 150);
          }
        this.ducksRight.push(new DucksR(1000, y, 70, 50, this.ctx));
      } 
    } 

    updateBullets(){
      for (let i = 0; i < this.bullet.length; i++) {
        this.bullet[i].y -= 10;
        this.bullet[i].draw();
      }
    }

    updateEggs(){
      if (this.currentTime > 3600){
        for(let i = 0; i < this.eggs.length; i++){  
            this.eggs[i].speedY = +2; 
            this.eggs[i].newPos();     
            this.eggs[i].draw(); 
          if(this.eggs[i].y > 600){
            this.eggs.splice(i,1);
          } 
       }
        if (this.frames % 80 === 0){
          this.eggs.push(new Egg (this.donald.x + 80, this.donald.y + 200, 20, 20, this.ctx))
        }  
      } 
    }
    updateHeart(){
      for (let i = 0; i < this.heart.length; i++) {
        this.heart[i].newPos();
        this.heart[i].draw();
      }
    }

    drawInfoImages() {
      ctx.font = "20px Kavoon";
      ctx.fillStyle = "black";
      ctx.fillText(`Time: ${this.computeTwoDigitNumber(this.getMinutes())}:${this.computeTwoDigitNumber(this.getSeconds())}`, 700, 30);
      ctx.font = "20px Kavoon";
      ctx.fillStyle = "black";
      ctx.fillText(`Score: ${this.score}`, 80, 30);
      ctx.font = "20px Kavoon";
      ctx.fillStyle = "black";
      ctx.fillText(`Lifes: `, 190, 30);
      if (this.lifes === 2){
        this.lifesImage.src="../images/heart.png"
        this.lifesImage2.src="../images/emptyheart.png";
        ctx.drawImage(this.lifesImage, 250, 12, 25, 20);
        ctx.drawImage(this.lifesImage, 275, 12, 25, 20);
      } if( this.lifes === 1){
        ctx.drawImage(this.lifesImage, 250, 12, 25, 20);
        ctx.drawImage(this.lifesImage2, 275, 12, 20, 20);
      }
      ctx.font = "20px Kavoon";
      ctx.fillStyle = "black";
      ctx.fillText(`Ammo: `, 310, 30);
      if (this.magazine === 5){
        this.magazineImage.src="../images/bullet-info.png";
        ctx.drawImage(this.magazineImage, 385, 20, 20, 10);
        ctx.drawImage(this.magazineImage, 410, 20, 20, 10);
        ctx.drawImage(this.magazineImage, 435, 20, 20, 10);
        ctx.drawImage(this.magazineImage, 460, 20, 20, 10);
        ctx.drawImage(this.magazineImage, 485, 20, 20, 10);
      } else if (this.magazine === 4){
        ctx.drawImage(this.magazineImage, 385, 20, 20, 10);
        ctx.drawImage(this.magazineImage, 410, 20, 20, 10);
        ctx.drawImage(this.magazineImage, 435, 20, 20, 10);
        ctx.drawImage(this.magazineImage, 460, 20, 20, 10);        
      } else if (this.magazine === 3){
        ctx.drawImage(this.magazineImage, 385, 20, 20, 10);
        ctx.drawImage(this.magazineImage, 410, 20, 20, 10);
        ctx.drawImage(this.magazineImage, 435, 20, 20, 10);
      } else if (this.magazine === 2){
        ctx.drawImage(this.magazineImage, 385, 20, 20, 10);
        ctx.drawImage(this.magazineImage, 410, 20, 20, 10);      
      } else if (this.magazine === 1){
        ctx.drawImage(this.magazineImage, 385, 20, 20, 10);
      }
    }

    duckAnimation(x,y){
      if (this.animation){
        this.ctx.drawImage(this.feather, x, y , 70, 50)
        setTimeout(() => {
          this.animation = false
        }, 500)
      }
    }  

    collisionDetectionLeft(){
      for (let c = 0; c < this.ducksLeft.length; c++){
        for(let d = 0; d < this.bullet.length; d++){
          if(this.bullet[d].crashWith(this.ducksLeft[c])){
            quack_sound.play();
            this.score += 2;
            this.duckX = this.ducksLeft[c].x;
            this.duckY = this.ducksLeft[c].y;
            this.animation = true; 
            this.ducksLeft.splice(c,1);
            this.bullet.splice(d,1);
          }
        }
      }
    }
    collisionDetectionEggs(){
      for (let c = 0; c < this.eggs.length; c++){
        for(let d = 0; d < this.bullet.length; d++){
          if(this.bullet[d].crashWith(this.eggs[c])){
            this.eggs.splice(c,1);
            this.bullet.splice(d,1);
          }
        }
      }
    }
    
    collisionDetectionRight(){
      for (let c = 0; c < this.ducksRight.length; c++){
        for(let d = 0; d < this.bullet.length; d++){
          if(this.bullet[d].crashWith(this.ducksRight[c])){
            this.score += 2;
            this.duckX= this.ducksRight[c].x;
            this.duckY = this.ducksRight[c].y;
            this.animation = true; 
            quack_sound.play();
            this.ducksRight.splice(c,1);
            this.bullet.splice(d,1);
          }
        }
      }
    }

    collisionDetectionHeart(){
      for (let c = 0; c < this.heart.length; c++){
        for(let d = 0; d < this.bullet.length; d++){
          if(this.bullet[d].crashWith(this.heart[c])){
            this.lifes += 1;
            this.heart.splice(c,1);
            this.bullet.splice(d,1);
          }
        }
      }
  }
  collisionDetectionDonald(){
    for (let c = 0; c < this.bullet.length; c++){
        if(this.bullet[c].crashWith(this.donald)){
          this.donald.health -= 1;
          this.score += 2;
          console.log(this.donald.health);
          this.bullet.splice(c,1);
          }
        }
      }
      
      collisionDetectionEggsGun(){
      for (let c = 0; c < this.eggs.length; c++){
        if(this.eggs[c].crashWith(this.gun)){
          this.lifes -= 1;
          this.eggs.splice(c,1);
          let heartSpeed = Math.floor((Math.random() )* 4 - 4);
          setTimeout( () => {
            if (heartSpeed > 0){
            this.heart.push(new Heart(0, Math.floor((Math.random() * 300) + 50), 70, 50, this.ctx, heartSpeed) ) }
            else {
              this.heart.push(new Heart(1000, Math.floor((Math.random() * 300) + 50), 70, 50, this.ctx, heartSpeed) )
            }
          }, 5000);
          }
        }
      } 
      winGameOver(){
        if (this.donald.health === 0) {

        }
      }
      checkGameOver(){
        if (this.lifes < 1){
          ctx.drawImage(this.lifesImage2, 250, 12, 20, 20);
          ctx.drawImage(this.lifesImage2, 280, 12, 20, 20);
        this.stop();
        this.check = true;
        
      document.getElementById("btnRestart").classList.remove("hidden") 
     }
     
  }

  highScore (score) {
    if(this.highScore1 === null){
      let name = prompt('Enter username:');
      const newScore = {username: name, Highscore: score};
      localStorage.setItem("highScore1", JSON.stringify(newScore))
    } else if (this.highScore2 === null){
      let name = prompt('Enter username:');
      const newScore = {username: name, Highscore: score};
      localStorage.setItem("highScore2", JSON.stringify(newScore))
    } else if(this.highScore3 === null){
      let name = prompt('Enter username:');
      const newScore = {username: name, Highscore: score};
      localStorage.setItem("highScore3", JSON.stringify(newScore))
    } else if(score > this.highScore1.Highscore){
      let name = prompt('Enter username:');
      const newScore = {username: name, Highscore: score};
      /* localStorage.setItem("highScore2", JSON.stringify(this.highScore1));
      localStorage.setItem("highScore3", JSON.stringify(this.highScore2)); */
      localStorage.setItem("highScore1", JSON.stringify(newScore))
    } else if (score > this.highScore2.Highscore){
    let name = prompt('Enter username:');
    const newScore = {username: name, Highscore: score};
    /* localStorage.setItem("highScore3", JSON.stringify(this.highScore2)); */
    localStorage.setItem("highScore2", JSON.stringify(newScore))
    } else if (score > this.highScore3.Highscore){
    let name = prompt('Enter username:');
    const newScore = {username: name, Highscore: score};
    localStorage.setItem("highScore3", JSON.stringify(newScore))
    }


  }


  drawEnd() {
    if (this.lifes === 2){
      this.lifesImage.src="../images/heart.png"
      this.lifesImage2.src="../images/emptyheart.png";
      ctx.drawImage(this.lifesImage, 250, 12, 25, 20);
      ctx.drawImage(this.lifesImage, 280, 12, 25, 20);
    } if( this.lifes === 1){
      ctx.drawImage(this.lifesImage, 250, 12, 25, 20);
      ctx.drawImage(this.lifesImage2, 280, 12, 20, 20);
    } 
    game_over.play();
    this.highScore(this.score);
    document.getElementById("btnRestart").classList.remove("hidden");
    document.getElementById("container-gameover").classList.remove("hidden");
    this.clear()
    showButton();
    let score = document.getElementById("score")
    score.innerText = ` Your score is: ${this.score}` 
    }
  }

 
      