//Mastermind GAME
let gameSeq=[];
let userSeq=[];
let higharr=[];

let btns=["red","yellow","green","blue"];

let started=false;
let level=0;
let h2=document.querySelector("h2");

// Step:1
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game is started");
        started=true;
        levelUp();
    }
})

// Step:2 Flash Button and level Up
// Making the random btn which comes as argument flash and 
//removing that flash after one second to moving that button into its original color
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`; 
    //random button
    let randIdx=Math.floor(Math.random()*3);//choose the index
    let randColor=btns[randIdx];//store the choosed index element into randColor
    let randbtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log("game squence=",gameSeq);
    gameFlash(randbtn);
}

//Check sequence
function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML=`GAME OVER! Your Score was:<b>${level}</b><br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        let high=document.querySelector("#highscore");
        higharr.push(level);
        let greatest=higharr[0];
        
        high.addEventListener("click",function(){
            for(let i=1;i<higharr.length;i++){
                if(higharr[i]>greatest){
                    greatest=higharr[i];
                }
            }
          high.innerText=`High Score:${greatest}`;
        })
        reset();    
    }
}

//User Pressed
function btnpress(){
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    console.log("user color=",userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function reset(){
    started=false;
    gameSeq=[];lk
    userSeq=[];
    level=0;
    
}

