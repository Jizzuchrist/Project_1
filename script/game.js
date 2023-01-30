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
      this.bullets = [];
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
 /*        this.bullets.draw(); */
        this.updateObstacles();
        this.checkGameOver();
    }
    stop(){
      clearInterval(this.intervalId);
    }
    clear(){
      this.ctx.clearRect(0,0,this.width, this.height)
    }
    updateObstacles(){
      for (let i = 0; i < this.ducksLeft.length; i++) {
        this.ducksLeft[i].x += 1;
        this.ducksLeft[i].draw();
      }
      if (this.frames % 210 === 0) {
        let y = Math.floor((Math.random() * 150 - 100) + 100);
        //calculate the height of the columns/ducksLeft
        //these variables control the size of the gap between obstacles
        let minGap = 200;
        let maxGap = 350;
        //this creates the gap
        let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        //add the obstacles to the array
        //top obstacle
        this.ducksLeft.push(new Ducks(0, y, 70, 50, this.ctx));
        //bottom obstacle
        this.ducksLeft.push(new Ducks(0, width - gap, 70, 50, this.ctx));
      }
      
    } 
    checkGameOver(){
      const  crashed = this.ducksLeft.some((ducks) => {
        this.bullets.crashWith(ducks)
      })
      if(crashed){
        for(let i=0; i < this.ducksLeft.length; i++){
          if ([i] === crashed){
          let x = crashed.x;
          let y = crashed.y;
          this.ducksLeft.splice(i,1)
          }
        }
      }
    }
  }