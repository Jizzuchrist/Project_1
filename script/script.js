/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const gun = new Component(462.5, 465, 65, 135, ctx);

const donald = new Boss (1000, 50, 200, 200, this.ctx);

const game = new Game(ctx, canvas.width, canvas.height, gun, donald);

const reload_sound = new Audio("./sounds/First Shell.mp3");
reload_sound.volume = 1;

const shot_fired = new Audio("./sounds/10 Guage Shotgun-SoundBible.com-74120584.wav")
shot_fired.volume = 0.05;
/* const restartBtn = document.getElementById("btnRestart"); */

let btn = document.getElementById("restart-button").style.display='none';


 window.onload = () => { 
    document.getElementById('button').onclick = () => {
      game.start();
      document.getElementById("btnDiv").classList.add("hidden");
      document.getElementById("arrows-info").classList.remove("hidden");
      document.getElementById("keys-info").classList.remove("hidden");
    } 
  }

function showButton(){
  btn = document.getElementById("restart-button").style.display="block";
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
              shot_fired.play();
              game.magazine -= 1;
              game.bullet.push(new Bullets (gun.x + 5,gun.y - 25 , 10, 40, ctx))
              game.bullet.speedY -= 2;
            }
                break;
        case "KeyR" :
          if(game.magazine === 0){
            reload_sound.play();
            setTimeout( () => {
              game.magazine = 5;
            }, 1000)
            }
          break;
          }
})


document.addEventListener("keyup", () => { 
  gun.speedX = 0;
  gun.speedY = 0;

})

