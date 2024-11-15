gamePattern = [];

userClickPattern = [];

buttonColours = ["red", "blue", "yellow", "green"];

var started = false;
var level = 0;

  //starts game
$(document).keydown(function() {
    if (!started) {
         nextSequence();
         started = true;
    }
})

//generates random number and then chooses a sound based on number
function nextSequence() {

    userClickPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level++;

    $("h1").text("Level " + level);
    
}


// this checks for a click
$(".btn").click(function() {

    var userChosenColour = this.id;
    userClickPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickPattern.length - 1);

})

// play sound
    function playSound(name) {

     var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
}

//animate button clicked
function animatePress(currentColour) {
        
        $("#" + currentColour).addClass("pressed");
        setTimeout( function() {
            $("#" + currentColour).removeClass("pressed");
        }, 100);

    }

function checkAnswer(currentLevel) {
    if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickPattern.length === gamePattern.length) {
            setTimeout (function() {
                nextSequence();
            }, 1000)
        }

    } else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout( function() {
            $("body").removeClass("game-over")
        ;}, 200)
        $("h1").text("Game Over. Click any key to restart.")
        startOver();
    }
}

function startOver () {
    started = false;
    level = 0;
}