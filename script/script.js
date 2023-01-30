/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const gun = new Component(462.5, 470, 80, 135, ctx);

const game = new Game(ctx, canvas.width, canvas.height, gun);

window.onload = () => {
    document.getElementById('button').onclick = () => {
      game.start();
    };
  }

document.addEventListener("keydown", (e) => {
    switch(e.code){
        case "ArrowRight" : 
            gun.speedX += 3; 
            break;
        case "ArrowLeft" : 
            gun.speedX -= 3;
            break;
        case "KeyW" :
          if (game.magazine > 0){
              game.magazine -= 1;
              game.bullet.push(new Bullets (gun.x + 8 ,gun.y - 25 , 10, 40, ctx))
              game.bullet.speedY -= 2;
            }
                break;
        case "KeyR" :
          if(game.magazine === 0){
            setTimeoutgame.magazine = 5;
            }
          break;
          }
})


document.addEventListener("keyup", () => { 
  gun.speedX = 0;
  gun.speedY = 0;

})

