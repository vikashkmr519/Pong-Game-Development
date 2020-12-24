// alert("js connected");

let ball = document.querySelector(".ball");

let board = document.querySelector(".board");
let boardBound = board.getBoundingClientRect();
let x=true;
let y = true;
let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");

let leftPlayerLives =3;
let rightPlayerLives = 3;


//user input listen
document.addEventListener("keydown" ,function(e){
    console.log("koi toh key hai");
    if(e.key=="w"){
        movePaddle(leftPaddle,-window.innerHeight * 0.1);
    }else if(e.key=="s"){
        movePaddle(leftPaddle,window.innerHeight * 0.1);
    }else if(e.key=="ArrowUp"){
        movePaddle(rightPaddle,-window.innerHeight * 0.1);
    }else if(e.key=="ArrowDown"){
        movePaddle(rightPaddle,window.innerHeight * 0.1);
    }
});


function setColor(idx){
    let allIcon = document.querySelectorAll(".fas.fa-circle");
    allIcon[idx].style.color="#686de0"
}

function movePaddle(cPaddle,change){
 let cPaddleBounds =   cPaddle.getBoundingClientRect();

 if((cPaddleBounds.top+change)>=boardBound.top && (cPaddleBounds.bottom+change)<= boardBound.bottom){
 cPaddle.style.top = cPaddleBounds.top+change+"px";
}

}

function moveBall(){

    let ballCord = ball.getBoundingClientRect();
    let ballTop = ballCord.top;
    let ballLeft = ballCord.left;
    let ballBottom = ballCord.bottom;
    let ballRight = ballCord.right;
    //geting board bounds and working on them so that ball doesn't go out of the box

    if(ballTop<=boardBound.top || ballBottom>=boardBound.bottom){
        // vertically outside

        //y represent vertical
        y=!y;
    }

    // if(ballLeft<=boardBound.left || ballRight>=boardBound.right){
    //     //horizontally outside
    //     //x represent horizontal
    //     x =!x; 
    // }

    //if collided with any players boundary
    let hasTouchedLeft = ballLeft< boardBound.left;
    let hasTouchedRight = ballRight>boardBound.right;

    if(hasTouchedLeft || hasTouchedRight){
        if(hasTouchedLeft){
            leftPlayerLives--;
            setColor(leftPlayerLives);
            if(leftPlayerLives ==0){
               
                alert('Game Over Right Player won')
                window.location.reload();
                
            }else{
                return resetGame();
            }
        }else{
            rightPlayerLives--;
            setColor(3+rightPlayerLives)
            if(rightPlayerLives ==0){
                
                alert('Game Over Left Player won')
                window.location.reload();
                
            }else{
                return resetGame();
            }


        }
    }

    function resetGame(){
        ball.style.top = window.innerHeight*0.45+"px";
        ball.style.left = window.innerWidth*0.45+"px";
        
        requestAnimationFrame(moveBall);
    }
    //left hit of ball with paddle
    let leftPaddleBounds = leftPaddle.getBoundingClientRect();
    let rightPaddleBounds = rightPaddle.getBoundingClientRect();
    if(ballLeft <= leftPaddleBounds.right && ballRight >= leftPaddleBounds.left &&
         ballTop+30 >= leftPaddleBounds.top && ballBottom-30<= leftPaddleBounds.bottom ) {
        x =!x;
    }

    if(ballLeft <= rightPaddleBounds.right && ballRight >= rightPaddleBounds.left &&
        ballTop+30 >= rightPaddleBounds.top && ballBottom-30<= rightPaddleBounds.bottom ) {
       x =!x;
   }

    //below will increase the top and left of the ball
    
    ball.style.top = y==true ? ballTop+6+"px" : ballTop-6+"px";
    ball.style.left= x== true ? ballLeft+6+"px" : ballLeft-6+"px";
    requestAnimationFrame(moveBall);

}

requestAnimationFrame(moveBall);