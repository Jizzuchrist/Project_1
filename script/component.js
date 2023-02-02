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
      this.image.src="./images/shotgun.png"
      ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    newPos(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    top (){
        return this.y;
    }
    bottom (){
        return this.y + this.h;
    }
    left(){
        return this.x;
    }
    right(){
        return this.x + this.w;
    }
    stop(){
        return this.y;
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
    crashWith(egg){ 
        return !(this.bottom() < egg.top() || this.top() > egg.bottom() || this.right() < egg.left() || this.left() > egg.right())
    }
}

class DucksL extends Component {
    constructor(x, y, w, h, ctx){
    super(x, y, w, h, ctx)
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        this.image = new Image();
        this.speedX = 0;
    }
    draw(){
        this.image.src="./images/pato.png"
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    newPos(){
        this.x += this.speedX;
    }
    top (){
        return this.y;
    }
    bottom (){
        return this.y + this.h;
    }
    left(){
        return this.x;
    }
    right(){
        return this.x + this.w;
    }

}
class DucksR extends Component {
    constructor(x,y,w,h,ctx){
        super(x, y, w, h, ctx)  
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        this.image = new Image();
        this.speedX = 0;
    }
    draw(){
        this.image.src="./images/pato-invertido.png"
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    newPos(){
        this.x += this.speedX;
    }
    top (){
        return this.y;
    }
    bottom (){
        return this.y + this.h;
    }
    left(){
        return this.x;
    }
    right(){
        return this.x + this.w;
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
        this.speedY = 0;
    }
    draw(){
        this.image.src="./images/bullet.png";
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    newPos(){
        this.y += this.speedY;
    } 
    top (){
        return this.y;
    }
    bottom (){
        return this.y + this.h;
    }
    left(){
        return this.x;
    }
    right(){
        return this.x + this.w;
    }
    crashWith(duck){
        return !(this.bottom() < duck.top() || this.top() > duck.bottom() || this.right() < duck.left() || this.left() > duck.right())
    }
}

class Heart extends Component{
    constructor(x,y,w,h,ctx, heartSpeed) {
        super(x,y,w,h,ctx)
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.ctx = ctx;  
            this.image = new Image(); 
            this.speedX = heartSpeed;
    }
    draw(){
        this.image.src="./images/heart.png";
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    newPos(){
        this.x += this.speedX;
    } 
    top (){
        return this.y;
    }
    bottom (){
        return this.y + this.h;
    }
    left(){
        return this.x;
    }
    right(){
        return this.x + this.w;
    }
}

class Boss extends Component{
    constructor(x,y,w,h,ctx) {
        super(x,y,w,h,ctx)
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ctx = ctx;  
        this.image = new Image(); 
        this.speedX = 0;
        this.health = 20;
    }
    draw(){
        this.image.src="./images/madDuck.png";
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    newPos(){
        this.x += this.speedX;
    } 
    top (){
        return this.y;
    }
    bottom (){
        return this.y + this.h;
    }
    left(){
        return this.x;
    }
    right(){
        return this.x + this.w;
    }
}

class Egg extends Component{
    constructor(x,y,w,h,ctx) {
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
        this.image.src="./images/eggweapon.png";
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    newPos(){
        this.x += this.speedX;
        this.y += this.speedY;
    } 
    top (){
        return this.y;
    }
    bottom (){
        return this.y + this.h;
    }
    left(){
        return this.x;
    }
    right(){
        return this.x + this.w;
    }
    crashWith(duck){
        return !(this.bottom() < duck.top() || this.top() > duck.bottom() || this.right() < duck.left() || this.left() > duck.right())
    }
}