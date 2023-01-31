/** @type {HTMLCanvasElement} */

const quack_sound = new Audio("../sounds/duck-quack-112941.mp3")
quack_sound.volume = 1;





class Game {
    constructor(ctx, width, height, gun) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.gun = gun;
      this.intervalId = null;
      this.frames= 0;
      this.ducksLeft = [];
      this.ducksRight = [];
      this.bullet = [];
      this.heart = [];
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
      this.lifesImage = new Image();
      this.lifesImage2 = new Image();
      this.magazineImage = new Image();
    }

    start() {
        this.intervalId = setInterval(this.update, 1000 / 60)
        
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
        this.collisionDetectionLeft();
        this.collisionDetectionRight();
        this.collisionDetectionHeart();
        this.drawInfoImages();
        this.checkGameOver();
    }

    stop(){
      clearInterval(this.intervalId);
    }

    clear(){
      this.ctx.clearRect(0,0,this.width, this.height)
    }

    updateObstaclesLeft(){
      if(this.currentTime > 600) {
        this.ducksLeft = [];
      }
      /* if (this.currentTime < 600){ */
        for (let i = 0; i < this.ducksLeft.length; i++) {
          if(this.ducksLeft[i].x > 1000){
            this.ducksLeft.splice(i,1)
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
          this.ducksLeft[i].draw();
        }
          if (this.frames % 220 === 0) {
            let y = 0;
              while (y <= 50 || y >= 150) {
                y = Math.floor((Math.random() * 150) + 50);
              }
            this.ducksLeft.push(new DucksL(0, y, 70, 50, this.ctx));
          }
       /* else {
          this.ducksLeft.splice(0, ducksLeft.length - 1)
      }  */
    } 

    updateObstaclesRight(){
      if(this.currentTime > 600) {
        this.ducksRight = [];
        
      }
      /* if (this.currentTime < 600){ */
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
        if (this.frames % 220 === 0) {
            let y = 150;
            while (y <= 150 || y >= 300) {
              y = Math.floor((Math.random() * 200) + 150);
            }
          this.ducksRight.push(new DucksR(1000, y, 70, 50, this.ctx));
        }
      /* } else {
        this.ducksRight.splice(0, ducksRight.length - 1);
      } */
    } 

    updateBullets(){
      for (let i = 0; i < this.bullet.length; i++) {
        this.bullet[i].y -= 10;
        this.bullet[i].draw();
      }
    }

    updateHeart(){
      for (let i = 0; i < this.heart.length; i++) {
        this.heart[i].newPos();
        this.heart[i].draw();
      }
    }

    drawInfoImages() {
      ctx.font = "20px Helvetica";
      ctx.fillStyle = "black";
      ctx.fillText(`Time: ${this.computeTwoDigitNumber(this.getMinutes())}:${this.computeTwoDigitNumber(this.getSeconds())}`, 700, 30);
      ctx.font = "20px Helvetica";
      ctx.fillStyle = "black";
      ctx.fillText(`Score: ${this.score}`, 80, 30);
      ctx.font = "20px Helvetica";
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
      ctx.font = "20px Helvetica";
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

  checkGameOver(){
     if (this.lifes < 1){
      ctx.drawImage(this.lifesImage2, 250, 12, 20, 20);
      ctx.drawImage(this.lifesImage2, 280, 12, 20, 20);
      ctx.fillStyle = "black";
      ctx.fillRect(50, 200, 400, 250);
      ctx.font = "32px Helvetica";
      ctx.fillStyle = "red";
      ctx.fillText(`GAME OVER`, 150, 300);
      ctx.fillStyle = "white";
      ctx.fillText(`Your final score`, 135, 350);
      ctx.fillText(`${this.score}`, 230, 400);
      this.stop();
     }
    }
  }

          
          

