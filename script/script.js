/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const gun = new Component(462.5, 475, 75, 125, ctx);

const game = new Game(ctx, canvas.width, canvas.height, gun);

window.onload = () => {
    document.getElementById('button').onclick = () => {
      game.start();
    };
  }

document.addEventListener("keydown", (e) => {
    switch(e.code){
        case "ArrowRight" : 
            gun.speedX += 4; 
            break;
        case "ArrowLeft" : 
            gun.speedX -= 4;
            break;
    }
})

document.addEventListener("keyup", () => { 
  gun.speedX = 0;
  gun.speedY = 0;

})