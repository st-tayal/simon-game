var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var level=0;
var started=false;

$(document).keypress(function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    var lastIndex=userClickedPattern.length-1;
    checkAnswer(lastIndex);
});

function nextSequence(){
    level++;
    $("h1").text("Level "+level);
    var randomNum=Math.random();
    randomNum=randomNum*4;
    randomNum=Math.floor(randomNum);
    var randomChosenColour=buttonColours[randomNum];

    gamePattern.push(randomChosenColour);
    console.log(gamePattern);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("Success!");
        if(currentLevel==gamePattern.length-1){
            setTimeout(function(){
                nextSequence();
            },1000);
            userClickedPattern=[];
        }
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart the Game :(")
        console.log("Wrong!");
        startOver();
    }
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function playSound(name){
    var audio=new Audio('sounds/'+name+'.mp3');
    audio.play();
}