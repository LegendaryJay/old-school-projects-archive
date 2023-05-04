var sentence = [];
var rules = [];
var slider = $('#slide')[0];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 120);
    background(0);
    validate();
    generateString();
    generateTree();
}

//get angle from input
function getAngle() {
    return toRad($('#angle').val());
}
//change to not degrees
function toRad(angle){
  return angle * (Math.PI / 180);
}

function validate() {
    tempRules = [$('#start').val().replace(/\s/g, ''), $('#rule1').val().replace(/\s/g, ''), $('#rule2').val().replace(/\s/g, '')];
    if (tempRules[0].length === 0) {
        return false;
    }

    //checks each character in each input that is not automatically validated
    for (var i = 0; i < 3; i++) {
        var checkMe = tempRules[i];
        for (var j = 0; j < checkMe.length; j++) {
            checkChar = checkMe.charAt(j).toUpperCase();
            switch (checkChar) {
                case 'A':
                    break;
                case 'B':
                    break;
                case '+':
                    break;
                case '-':
                    break;
                case '[':
                    break;
                case ']':
                    break;
                default:
                    alert("invalid characters");
                    return false;
            }

        }

    }

    rules = tempRules;
    return true;
}

//on submit, do stuff
$("#form").submit(function(e) {
    e.preventDefault();
    validate();
    generateString();
    generateTree();
});

function generateTree() {
  //clear board
    background(0);
    stroke(255);
    resetMatrix();
    //start off in some place that is an offset of the middle
    translate((width / 2) * (1 + $('#hOff').val() / 100), (height / 2) * (1 - $('#vOff').val() / 100));
    var read = sentence[$('#slide').val()];
    for (var i = 0; i < read.length; i++) {
        c = read.charAt(i);
        length = ($('#scale').val() * $('#scale').val()) / 4;
        switch (c.toUpperCase()) {
            case 'A':
                line(0, 0, 0, length);
                translate(0, length);
                break;
            case 'B':
                line(0, 0, 0, length);
                translate(0, length);
                break;
            case '+':
                rotate(getAngle());
                break;
            case '-':
                rotate(-getAngle());
                break;
            case '[':
            //save angle and position
                push();
                break;
            case ']':
            //reproduce previous andle and position
                pop();
                break;
            default:
                return false;
        }
    }
}
//takes in stuff expands it
function generateString() {
    sentence[0] = rules[0];
    for (var j = 1; j <= 10; j++) {
        var next = '';
        for (var i = 0; i < sentence[j - 1].length; i++) {
            var c = sentence[j - 1].charAt(i).toUpperCase();
            if (c == "A") {
                next += rules[1];
            } else if (c == "B") {
                next += rules[2];
            } else {
                next += c;
            }
        }
        sentence[j] = next;
        logStuff(j, next);
    }
}
function logStuff(index,  stringThing) {
  console.log("Sentence " + index + ": " + stringThing);
  console.log("***********************");
}
//
