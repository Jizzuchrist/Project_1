/** @type {HTMLCanvasElement} */


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
        this.updateBullets(); 
        this.updateObstaclesLeft();
        this.updateObstaclesRight();
        this.collisionDetection();
      
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
        }
        this.ducksLeft[i].x += 1;
        this.ducksLeft[i].draw();
      }
      if (this.frames % 300 === 0) {
        let y = Math.floor((Math.random() * 100 - 50) + 50);
        //calculate the height of the columns/ducksLeft
        //these variables control the size of the gap between obstacles
        let minGap = 200;
        let maxGap = 350;
        //this creates the gap
        let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        //add the obstacles to the array
        //top obstacle
        this.ducksLeft.push(new DucksL(0, y, 70, 50, this.ctx));
        //bottom obstacle
        this.ducksLeft.push(new DucksL(0, this.width - gap, 70, 50, this.ctx));
      }
      
    } 
    updateObstaclesRight(){
      for (let i = 0; i < this.ducksRight.length; i++) {
        if(this.ducksRight[i].x < 0){
          this.ducksRight.splice(i,1)
        }
        this.ducksRight[i].x -= 1;
        this.ducksRight[i].draw();
      }
      if (this.frames % 250 === 0) {
        let y = Math.floor((Math.random() * (200 - 100) + 100));
        //calculate the height of the columns/ducksRight
        //these variables control the size of the gap between obstacles
        let minGap = 300;
        let maxGap = 600;
        //this creates the gap
        let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        //add the obstacles to the array
        //top obstacle
        this.ducksRight.push(new DucksR(1000, y, 70, 50, this.ctx));
        //bottom obstacle
        this.ducksRight.push(new DucksR(1000, gap - this.width, 70, 50, this.ctx));
/*         console.log(gap); */
      }
      
    } 
    updateBullets(){
      for (let i = 0; i < this.bullet.length; i++) {
        if(this.bullet[i].y < 0){
          this.bullet.splice(i,1)
        }
        this.bullet[i].y -= 10;
        this.bullet[i].draw();
      }
      
    }



    
    collisionDetection(){
      for (let c = 0; c < this.ducksLeft.length; c++){
        for(let d = 0; d < this.bullet.length; d++){
          if(this.bullet[d].crashWith(this.ducksLeft[c])){
            this.ducksLeft.splice(c,1);
            this.bullet.splice(d,1);
          }
        }
      }
      for (let c = 0; c < this.ducksRight.length; c++){
        for(let d = 0; d < this.bullet.length; d++){
          if(this.bullet[d].crashWith(this.ducksRight[c])){
            this.ducksRight.splice(c,1);
            this.bullet.splice(d,1);
          }
        }
      }
    }
  }
  

  
/*     checkGameOver(){
      const crashed = this.ducksLeft.some((ducks) => {
        this.bullets.crashWith(ducks)
      })
      if(crashed){
        for(let i=0; i < this.ducksLeft.length; i++){
          if ([i] === crashed){
          let x = crashed.x;
          let y = crashed.y;
          this.ducksLeft.splice(i,1) */
          
          

