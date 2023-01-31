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
      this.duckX
      this.duckY
      this.lifesImage = new Image();
      this.lifesImage2 = new Image();
      this.magazineImage = new Image();
    }

    start() {
        this.intervalId = setInterval(this.update, 1000 / 60)
      }
    
    update = () => {
    //Game logic here
        this.frames ++;
        this.clear();
        this.gun.draw();
        this.gun.newPos();
        this.gun.boundaries();
        /* this.bullet.draw(); */
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
      
        /* this.checkGameOver(); */
    }
    stop(){
      clearInterval(this.intervalId);
    }
    clear(){
      this.ctx.clearRect(0,0,this.width, this.height)
    }
    updateObstaclesLeft(){
      for (let i = 0; i < this.ducksLeft.length; i++) {
        if(this.ducksLeft[i].x > 1000){
          this.ducksLeft.splice(i,1)
          this.lifes -=1 ;
          this.score -=2 ;
          setTimeout( () => {
            this.heart.push(new Heart(1000, Math.floor((Math.random() * 300) + 50), 70, 50, this.ctx))}, 5000);
        }
        this.ducksLeft[i].x += 1;
        this.ducksLeft[i].draw();
      }
      if (this.frames % 220 === 0) {
        let y = 0;
          while (y <= 50 || y >= 150) {
            y = Math.floor((Math.random() * 150) + 50);
          }
        /* let y = (Math.floor((Math.random() * 150) + 50)); */
        //calculate the height of the columns/ducksLeft
        //these variables control the size of the gap between obstacles
/*         let minGap = 200;
        let maxGap = 350;
        //this creates the gap
        let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap); */
        //add the obstacles to the array
        //top obstacle
        this.ducksLeft.push(new DucksL(0, y, 70, 50, this.ctx));
        //bottom obstacle
        /* this.ducksLeft.push(new DucksL(0, this.width - gap, 70, 50, this.ctx)); */
      }
      
    } 
    updateObstaclesRight(){
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
        /* console.log(this.ducksRight) */
      }
      if (this.frames % 220 === 0) {
          let y = 150;
          while (y <= 150 || y >= 300) {
            y = Math.floor((Math.random() * 200) + 150);
          }
       /*  let y = Math.floor((Math.random() * 250) + 150); */
        //calculate the height of the columns/ducksRight
        //these variables control the size of the gap between obstacles
/*         let minGap = 300;
        let maxGap = 600;
        //this creates the gap
        let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap); */
        //add the obstacles to the array
        //top obstacle
        this.ducksRight.push(new DucksR(1000, y, 70, 50, this.ctx));
        //bottom obstacle
     /*    this.ducksRight.push(new DucksR(1000, gap - this.width, 70, 50, this.ctx)); */
/*         console.log(gap); */
      }
      
    } 
    updateBullets(){
      for (let i = 0; i < this.bullet.length; i++) {
/*         if(this.bullet[i].y < 0){
          this.bullet.splice(i,1)
        } */
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
/*       ctx.fillRect(200, 100, 100, 100);
      ctx.clearRect(220, 120, 90, 90); */
      ctx.font = "20px Helvetica";
      ctx.fillStyle = "black";
      ctx.fillText(`Score: ${this.score}`, 80, 30);
      ctx.font = "20px Helvetica";
      ctx.fillStyle = "black";
      ctx.fillText(`Lives: `, 190, 30);
      if (this.lifes === 2){
        this.lifesImage.src="../images/heart.png"
        this.lifesImage2.src="../images/emptyheart.png";
        ctx.drawImage(this.lifesImage, 250, 12, 25, 20);
        ctx.drawImage(this.lifesImage, 280, 12, 25, 20);
      } if( this.lifes === 1){
        ctx.drawImage(this.lifesImage, 250, 12, 25, 20);
        ctx.drawImage(this.lifesImage2, 280, 12, 20, 20);
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
    /*     drawCollision(x, y){
      feather.image.src = "../images/feather.png";
      ctx.drawImage(feather, x, y, 70, 50);
    } */

    duckAnimation(x,y){
      if (this.animation){
        this.ctx.drawImage(this.feather, x, y , 70, 50)
        setTimeout(() => {
          this.animation = false
        }, 500)
        }
    }  

    collisionDetectionLeft(){
  /*     let x = 0;
      let y = 0; */
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
          /*    console.log(this.animation);  */
          }
        }
      }
    }

/*         if(this.animation){
          this.ctx.drawImage(this.feather, duckX, duckY , 70, 50)
          this.time++;
          console.log(this.time);
        }
        if(this.time > 60){
          this.time = 0;
          this.animation = false; 
         console.log(this.time)
         }  */
 /*      }
    } 
       */
   
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
         /*  feather.image.src = "../images/feather.png";
          ctx.drawImage(feather, this.ducksRight[c].x, this.ducksRight[c].y, this.ducksRight[c].w, this.ducksRight[c].h); */
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
          
          

