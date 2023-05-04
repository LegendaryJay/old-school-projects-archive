//ToolBox- But things that are specifically called
    //prints a new line in chat
function Newln(computer, string) {
    side = computer ? "comp" : "player";
    $('<div class=' + side + '><span>' + string + '</div></div>').hide().appendTo(".body").fadeIn(600);
}
    //Creates a puzzle to solve without repeating numbers
function NewAnswer() {
    var pool = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (i = 0; i < 4; i++) {
        var random = Math.floor(Math.random() * 10);
        if (random + 1 > pool.length) {
            random -= pool.length;
        }
        answer[i] = pool[random];
        pool.splice(random, 1);
    }
    console.log('Answer:' + answer[0] + answer[1] + answer[2] + answer[3]);
}

function IsValid(guess){
var i;
var j;
var value = false;

  for(i = 0; i<4; i++){
    value = false;
    for(j = 0 ; j<10; j++){
      if (guess[i] == j){
        value = true;
        break;
      }
    }
    if (!value){return false;}
  }
  return true;
}
    //counts bulls and cows
function Check(guess) {
    var i;
    var j;

    var bulls = 0;
    var cows = 0;
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if (guess[i] == answer[j].toString()) {
                if (i === j) {
                    bulls++;
                } else {
                    cows++;
                }
            }
        }
    }
    return {
        bulls: bulls,
        cows: cows
    };
}

    //This is when the user wins... but this game is impossible so it can never be tested
function Win(e) {
    e.preventDefault();
    Newln(true,'You\'ve won in ' + moves + ' moves! Let\'s go another round! Guess a new number');
    NewAnswer();
    moves = 0;
}

//Things i want later but not right now
answer = new Array(4);
body = $(".body")[0];
var moves = 0;

//Things i want right away but not later
NewAnswer();
Newln(true, 'Hello and welcome to Cows vs Bulls.');
setTimeout(function() {
    Newln(true, 'The goal of the game is to guess the four distinct numbers in the order that i am thinking');
    setTimeout(function() {
        Newln(true, 'I will tell you how many numbers are in the correct position (Bulls) and how many numbers are correct, but in the wrong position (Cows).');
        setTimeout(function() {
            Newln(true, 'I am thinking of a number now, what do you think it is?');
        }, 300);
    }, 300);
}, 300);

//Do stuff
$("#form").submit(function(e) {
    //break normal submit function
    e.preventDefault();
    //get input
    inString = $('#guess').val();
    //String --> Array
    var inputArray = inString.toString().split("");

    //if number is 4 digits long. This actually works better than it reasonably should so i didnt expound on it.
    if (inString.length === 4 & IsValid(inputArray)) {
        moves++;

        //empty input
        $('#guess').val("");
        //calculate bulls and cows
        check = Check(inputArray);
        //print input
        Newln(false, inputArray[0] + ' ' + inputArray[1] + ' ' + inputArray[2] + ' ' + inputArray[3]);
        //scroll to bottom
        body.scrollTop = body.scrollHeight;
        //if you win, say that, if you dont, say how close
        setTimeout(function() {
            if (check.bulls === 4) {
                Win(e);
            } else {
                Newln(true, 'Cows - ' + check.cows + ' | Bulls - ' + check.bulls);
            }
            body.scrollTop = body.scrollHeight;
        }, 300);
    }
});

//Pick and choose input number stuff
$('#form').on('focus', function(e) {
    $(this).on('mousewheel.disableScroll', function(e) {
        e.preventDefault();
    });
}).on('blur', function(e) {
    $(this).off('mousewheel.disableScroll');
});
