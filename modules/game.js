class Bird
{
    static #count=0;
    constructor(source){
        if (new.target.name === 'Bird') {
            throw new Error("This class cannot be instantiated directly.")
        }
        else{
            Bird.#count++;
            this.birdObject = document.createElement("img");
            this.birdObject.src = source;
            this.birdObject.style.left = "0px";
            this.birdObject.classList.add("img");
            this.birdObject.style.top = Math.random()*(window.innerHeight-300)+"px";
            let body = document.querySelector(".birds");
            body.appendChild(this.birdObject);
        }
    } 
    static count(){return Bird.#count}
    moveBird(value=10){
        let step = 0;
        let id = setInterval(()=>{
            step+=value;
            if(step<(window.innerWidth-this.birdObject.width))
            {
                this.birdObject.style.left = step+ "px";
            }
            else{
                clearInterval(id);
                this.birdObject.remove();
            }
        },100)
    }
    
}

class Bomb{
    constructor(){
        this.bomb = document.createElement("img");
        this.bomb.src = "../images/bomb.gif";
        this.bomb.style.left = parseInt(Math.random() * (window.innerWidth - 350)) + "px";
        this.bomb.style.top = "0px";
        this.bomb.classList.add("bomb");
        let body = document.querySelector(".birds");
        body.appendChild(this.bomb);
        // console.log("im in create!");
    }
    moveBomb(){
        let step = 0 ;
        // console.log(this.bomb.height);
        let top = parseInt(this.bomb.style.top);
        let id = setInterval(()=>{
            step += 10;
            if(top+step <= window.innerHeight-250)
                this.bomb.style.top = top + step + "px";
            else{
                clearInterval(id);
                this.bomb.remove();
            }
        },100);
    }
}


class BrownBird extends Bird
{
    constructor(){
        super("../images/brown.gif");
        this.birdObject.value = 5;
        this.birdObject.classList.add("flip");
    }
}
class BlueBird extends Bird
{
    constructor(){
        super("../images/cyan.gif");
        this.birdObject.value = -10;
    }
}
class BlackBird extends Bird
{
    constructor(){
        super("../images/black.gif");
        this.birdObject.value = 10;
    }
}


let flag = 1;
function createBomb(){
    let id = setInterval(()=>{
        new Bomb().moveBomb(); 
        flag++;
        if(flag >= 65){
            clearInterval(id);
        }
    },5000)
}
function creatBrown (){
    let id = setInterval(()=>{
        new BrownBird().moveBird(15); 
        flag++;
        if(flag >= 75){
            clearInterval(id);
        }
    },2000)
}
function creatBlue (){
    let id = setInterval(()=>{
        new BlueBird().moveBird(); 
        flag++;
        if(flag >= 73){
            clearInterval(id);
        }
    },2500)
}
function creatBlack (){ 
    let id = setInterval(()=>{
        new BlackBird().moveBird(25);
        flag++;
        if(flag >= 75){
            clearInterval(id);
        } 
    },3000)
}

let seconds = 60;
function countDown(){
    let id = setInterval(()=>{
        if(seconds>0){
            seconds--;
            let timerDiv = document.querySelector(".timer h2 span");
            timerDiv.innerText = "0 : "+ seconds;
        }else{
            clearInterval(id);
        }
    },1000)
    
}

function checkCollision(bird,bomb){
    let destroyRange = 100;
    if(parseInt(bird.style.left)+bird.width >= parseInt(bomb.style.left)-destroyRange && 
        parseInt(bird.style.left)-destroyRange <= parseInt(bomb.style.left)+bomb.width &&
        parseInt(bird.style.top)+bird.height >= parseInt(bomb.style.top)-destroyRange &&
        parseInt(bird.style.top)-destroyRange <= parseInt(bomb.style.top)+bomb.height
        ){
        killBird(bird);
    }
}

function killBird(object){
    let scoreDiv = document.querySelector(".score h2 span");
    let birdsKilledDiv = document.querySelector(".birdsKilled h2 span");
    score += object.value;
    scoreDiv.innerText = score;
    birdsKilled++;
    birdsKilledDiv.innerText = birdsKilled;
    object.src = "../images/caak.gif";
    setTimeout(()=>{
        object.remove();
    },250);
}

let score = 0;
let birdsKilled = 0;
window.addEventListener("load",()=>{
    let scoreDiv = document.querySelector(".score h2 span");
    scoreDiv.innerText = 0;
    let birdsKilledDiv = document.querySelector(".birdsKilled h2 span");
    birdsKilledDiv.innerText = 0;
    let nameDiv = document.querySelector(".welcome h2 span");
    nameDiv.innerText = localStorage.getItem("userName");
    window.addEventListener("click",(e)=>{
        if(Number.isInteger(e.target.value) ){
            let gunSound = new Audio("../audio/scifi-air-gun-SBA-300063840-preview.mp3");
            gunSound.play();
            killBird(e.target);
        }
        else{
        score += 0;
        birdsKilled += 0;
        }
    });
    window.addEventListener("click",(e)=>{
        if(e.target.classList.value == "bomb"){
            new Audio("../audio/bomb.wav").play();
            let birds = document.querySelectorAll(".img");
            for(let i=0 ; i<birds.length ; i++){
                checkCollision(birds[i],e.target);
            }
             e.target.remove();
        }
    });
    setTimeout(()=>{
        if(score >= 50){
            document.querySelector(".winner h1 span").innerText = score;
            document.querySelector(".winner").classList.remove("hide");
        }
        else{
            document.querySelector(".loser h1 span").innerText = score;
            document.querySelector(".loser").classList.remove("hide");
        }
        localStorage.setItem("userName",userName,"score",score);
    },60000);
});
window.addEventListener("load",()=>{
    document.querySelector(".winner").classList.add("hide");
    document.querySelector(".loser").classList.add("hide");
    let gameSound = new Audio("../audio/battle-theme-looping-SBA-300554546-preview.mp3");
    gameSound.play();
    countDown();
    creatBrown();
    creatBlue();
    creatBlack();
    createBomb();
});