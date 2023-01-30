/** @type {HTMLCanvasElement} */

class Component{
    constructor(x, y, w, h, ctx){
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.ctx = ctx;
      this.image = new Image();
      this.speedX = 0;
      this.speedY = 0;
    }

    draw(){
      this.image.src="../images/shotgun.png"
      ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    newPos(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    stop(){
        return this.y;
    }
    crashWith(ducks){
        return !(
            this.bottom() < ducks.top() ||
            this.top() > ducks.bottom() ||
            this.right() < ducks.left());
    } 
    boundaries() {
        const rightBorder = canvas.width - this.w;
        if (this.x < 0) {
            this.x = 0;
        }
    
        if (this.x > rightBorder) {
            this.x = rightBorder;
        }
        }
}

class Ducks extends Component {
    constructor(x,y,w,h,ctx){
    super(x,y,w,h,ctx)
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        this.image = new Image();
        this.speedX = 0;
        this.speedY = 0;
    }
    draw(){
        this.image.src="../images/pato.png"
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    newPos(){
        this.x += this.speedX;
        this.y= this.speedY;
    }
    top(){
        return this.y;
    }
    bottom(){
        return this.y + this.height;
    }
    left(){
        return this.x;
    }
    right(){
        return this.width + this.x;
    }
}

class Bullets extends Component{
    constructor(x,y,w,h,ctx) {
        super(x,y,w,h,ctx)
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ctx = ctx;  
        this.image = new Image(); 
    }
    draw(){
        this.image.src="../images/bullet.png";
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    newPos(){
        this.x += this.speedX;
        this.y += this.speedY;
    } top(){
        return this.y;
    }
    bottom(){
        return this.y + this.height;
    }
    left(){
        return this.x;
    }
    right(){
        return this.width + this.x;
    }
    crashWith(duck){
        return !(
            this.bottom() < duck.top() ||
            this.top() > duck.bottom() ||
            this.right() < duck.left() ||
            this.left() > duck.right()
        );
    }

}