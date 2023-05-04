// first tab open, 1 square unit length, animation speed
var active = "Lesson";
var sqUnit = 70;
var delta = 0.001;
var cont = 0;

// backhround canvas
var c = $('#myCanvas')[0];
var ctx = c.getContext("2d");
var h = $(".wrapper").height();
var w = $(".wrapper").width();

//Lesson Canvas
var c2 = $('#Example')[0];
var ctx2 = c2.getContext("2d");
c2.height = sqUnit * 5;
c2.width = sqUnit * 5;

//Concept Canvas
var newCanvas = $('#Example2')[0];
var newCxt = newCanvas.getContext('2d');
newCanvas.width = c2.width;
newCanvas.height = c2.height;

//Concept Animation Canvas
var layerCanvas = $('#Example2L2')[0];
var layerCxt = layerCanvas.getContext('2d');
layerCanvas.width = c2.width;
layerCanvas.height = c2.height;

//layering canvases is annoying
$('.CanvasContainer').css("padding",((sqUnit * 5)/2) + "px " + ((sqUnit * 5)/2) + "px");

// Some colors and shade
var prime = new Array("#7A296A", "#C697BD", "#9F5791", "#550A47", "#300027");
var sec = new Array("#8AA236", "#E9F6BC", "#BED374", "#5B710D", "#324100");
var shades = [];
var fade = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var tempFade = [0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/0, 0, 0, 0];
// code shorteners
function newBox(thing, inX, inY, inW, inH, inColor) {
    thing.beginPath();
    thing.rect(inX * sqUnit, inY * sqUnit, inW * sqUnit, inH * sqUnit);
    thing.fillStyle = inColor;
    thing.fill();
}

function newText(thing, inX, inY, inString, inColor) {
    thing.beginPath();
    thing.font = "20px Trebuchet MS";
    thing.fillStyle = inColor;
    thing.textAlign = "center";
    thing.textBaseline = "middle";
    thing.fillText(inString, inX * sqUnit, inY * sqUnit);
}

function newText90(thing, inX, inY, inString, inColor) {
    thing.save();
    thing.translate(0, 0);
    thing.rotate(-Math.PI / 2);
    thing.font = "20px Trebuchet MS";
    thing.fillStyle = inColor;
    thing.textAlign = "center";
    thing.textBaseline = "middle";
    thing.fillText(inString, -sqUnit * inY, sqUnit * inX);
    thing.restore();
}

// when the screen resizes, redraw background.
$(window).resize(function() {
    backdrop();
});

$(window).ready(function() {
            example();
    openTab(active);
    backdrop();
});

//////////////////////////////////////////////////
// Tab logic
function openTab(id) {
    //Close Tab - Hide Content
    $("#" + active + 'X').css("display", "none");
    $("#" + active).attr("class", "tablinks");
    //Open Tab - Show Content - Set up to close later
    active = id;
    $('#' + active + "X").css("display", "table-row");
    $("#" + active).attr("class", "tablinks active");
}
// on click, do tab stuff, pass the target's id down
$('.tablinks').click(
    function() {
        openTab($(this).attr("id"));
    }
);
/////////////////////////////////////////////////
//background logic
function backdrop() {
    h = $(".wrapper").height();
    w = $(".wrapper").width();
    c.height = h;
    c.width = w;
    //make background background- a gradient between 2 colors
    var grd = ctx.createLinearGradient(0, 0, h, w);
    grd.addColorStop(0, prime[4]);
    grd.addColorStop(1, "#000");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);
    //make background forground. (for loop calculates density)
    for (i = 0; i < Math.floor((h * w) * 0.0007); i++) {
        var color,
            height,
            width,
            size;

        // 6/7 chance for primary color pool, 1/7 for secondary pool 
        if (Math.random() * 6 + 1 <= 6) {
            color = prime[Math.floor(Math.random() * 4)];
        } else {
            color = sec[Math.floor(Math.random() * 5)];
        }

        //pick a random point on the canvas
        width = Math.floor(Math.random() * w + 1);
        height = Math.floor(Math.random() * h + 1);

        //the center of the canvas returns 1, the corners return 0. 
        size = (1 - Math.abs(height - (h / 2)) / (h / 2)) * (1 - Math.abs(width - (w / 2)) / (w / 2));

        //draw a circle
        ctx.beginPath();
        ctx.arc(width,
            height,
            Math.floor((Math.random() * 0.8 + 0.2) * 50 * (size * 0.5 + 0.5)),
            0,
            2 * Math.PI,
            false);
        ctx.fillStyle = color;
        ctx.globalAlpha = (Math.floor(Math.random() * (6)) / 10) + 0.5;
        ctx.fill();
    }
}
//////////////////////////////////////////////
// draw a chart one box at a time
function example() {
    //background 
    newBox(ctx2, 0.5, 0.5, 4.5, 4.5, prime[4]);

    // A coop
    newBox(ctx2, 1, 0, 2, 0.5, sec[2]);
    //newBox(ctx2, 1, 0.5, 1, 0.5, "#444");

    // A defect
    newBox(ctx2, 3, 0, 2, 0.5, prime[2]);
    //newBox(ctx2, 3, 0.5, 1, 0.5, "#444");

    // B coop
    newBox(ctx2, 0, 1, 0.5, 2, sec[2]);
    //newBox(ctx2, 0.5, 2, 0.5, 1, "#bbb");

    // B defect
    newBox(ctx2, 0, 3, 0.5, 2, prime[2]);
    //newBox(ctx2, 0.5, 4, 0.5, 1, "#bbb");

    // TL Box
    newBox(ctx2, 1, 1, 1, 1, sec[0]);
    newBox(ctx2, 2, 2, 1, 1, sec[0]);

    // BL Box
    newBox(ctx2, 1, 3, 1, 1, sec[0]);
    newBox(ctx2, 2, 4, 1, 1, prime[0]);

    // TR Box
    newBox(ctx2, 3, 1, 1, 1, prime[0]);
    newBox(ctx2, 4, 2, 1, 1, sec[0]);

    // BR Box
    newBox(ctx2, 3, 3, 1, 1, prime[0]);
    newBox(ctx2, 4, 4, 1, 1, prime[0]);

    //Borders
    ctx2.beginPath();
    ctx2.rect(1 * sqUnit, 1 * sqUnit, 4 * sqUnit, 4 * sqUnit);
    ctx2.lineWidth = 2;
    ctx2.strokeStyle = "#fff";
    ctx2.stroke();

    ctx2.beginPath();
    ctx2.rect(1 * sqUnit, 1 * sqUnit, 2 * sqUnit, 4 * sqUnit);
    ctx2.lineWidth = 2;
    ctx2.strokeStyle = "#fff";
    ctx2.stroke();

    ctx2.beginPath();
    ctx2.rect(1 * sqUnit, 1 * sqUnit, 4 * sqUnit, 2 * sqUnit);
    ctx2.lineWidth = 2;
    ctx2.strokeStyle = "#fff";
    ctx2.stroke();

    // Top text
    newText(ctx2, 2, 0.25, "Cooperation", sec[4]);
    newText(ctx2, 4, 0.25, "Defection", prime[4]);

    // Top A text
    newText(ctx2, 1.5, 0.75, "A", "#bbb");
    newText(ctx2, 3.5, 0.75, "A", "#bbb");

    //left text
    newText90(ctx2, 0.25, 2, "Cooperation", sec[4]);
    newText90(ctx2, 0.25, 4, "Defection", prime[4]);

    //left B text
    newText90(ctx2, 0.75, 2.5, "B", "#bbb");
    newText90(ctx2, 0.75, 4.5, "B", "#bbb");

    // TL text
    newText(ctx2, 1.5, 1.35, "1", sec[4]);
    newText(ctx2, 1.5, 1.65, "Year", sec[4]);
    newText(ctx2, 2.5, 2.5, "1 Year", sec[4]);

    // BL text
    newText(ctx2, 1.5, 3.35, "10", sec[4]);
    newText(ctx2, 1.5, 3.65, "Years", sec[4]);
    newText(ctx2, 2.5, 4.5, "Free", prime[4]);

    // TR text
    newText(ctx2, 3.5, 1.5, "Free", prime[4]);
    newText(ctx2, 4.5, 2.35, "10", sec[4]);
    newText(ctx2, 4.5, 2.65, "Years", sec[4]);

    // BR text
    newText(ctx2, 3.5, 3.35, "3", prime[4]);
    newText(ctx2, 3.5, 3.65, "Years", prime[4]);
    newText(ctx2, 4.5, 4.35, "3", prime[4]);
    newText(ctx2, 4.5, 4.65, "Years", prime[4]);

    // ctrl + c, ctrl + v
    newCxt.drawImage(c2, 0, 0);
}

////////////////////////////////////////////////////////
// Animation on chart
//object
function Shade(shadeX, shadeY, index) {
    this.shadeX = shadeX;
    this.shadeY = shadeY;
    this.index = index;
}
//take from Shade object, manipulate stuff, draw
Shade.prototype.update = function() {
    //Fade animation
    if (fade[this.index] > 0) {
        //draw stuff
        layerCxt.beginPath();
        layerCxt.rect(this.shadeX, this.shadeY, sqUnit, sqUnit);
        layerCxt.fillStyle = "rgba(198, 151, 189," + fade[this.index] + ")";
        layerCxt.fill();
    }
};
//start the animation with default values
function setupShades() {
    for (var i2 = 1; i2 < 5; i2++) {
        for (var j2 = 1; j2 < 5; j2++) {
            //calculate x and y coords around the white borders
            var newX = j2 * sqUnit + (j2 % 2) - 1;
            var newY = i2 * sqUnit + (i2 % 2) - 1;
            // make a new shade object 
            var newShade = new Shade(newX, newY, shades.length);
            // stick to the end of array
            shades.push(newShade);
        }
    }
    animate();
}
setupShades();
//animation loop
function animate() {
    // nuke the canvas
    layerCxt.clearRect(0, 0, sqUnit * 5, sqUnit * 5);
    // look at each shade, run it through update()
    for (var i = 0; i < shades.length; i++) {
        var thing = shades[i];
        thing.update();
    }
}
//the actual animation
layerCanvas.addEventListener('mousemove', function(evt) {
    var rect = layerCanvas.getBoundingClientRect();
    var mouseX = Math.floor((evt.clientX - rect.left) / (rect.right - rect.left) * layerCanvas.width);
    var mouseY = Math.floor((evt.clientY - rect.top) / (rect.bottom - rect.top) * layerCanvas.height);

    if ((mouseX > sqUnit * 1 && mouseX < sqUnit * 3) && (mouseY > 0 && mouseY < sqUnit * 0.5 )) {
        fade = [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1];
    } else if ((mouseX > sqUnit * 3 && mouseX < sqUnit * 5) && (mouseY > 0 && mouseY < sqUnit * 0.5 )) {
        fade = [1, 1, 0, 1, /**/ 1, 1, 0, 1, /**/ 1, 1, 0, 1, /**/1, 1, 0, 1];
    } else if (((mouseX > sqUnit * 1 && mouseX < sqUnit * 2) || (mouseX > sqUnit * 3 && mouseX < sqUnit * 4)) && (mouseY > 0.5 && mouseY < sqUnit * 1 )) {
        fade = [0, 1, 0, 1, /**/ 0, 1, 0, 1, /**/ 0, 1, 0, 1, /**/0, 1, 0, 1];
    } else if ((mouseY > sqUnit * 1 && mouseY < sqUnit * 3) && (mouseX > 0 && mouseX < sqUnit * 0.5 )) {
        fade = [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
    } else if ((mouseY > sqUnit * 3 && mouseY < sqUnit * 5) && (mouseX > 0 && mouseX < sqUnit * 0.5 )) {
        fade = [1, 1, 1, 1, /**/ 1, 1, 1, 1, /**/ 1, 1, 1, 1, /**/0, 0, 0, 0];
    } else if (((mouseY > sqUnit * 2 && mouseY < sqUnit * 3) || (mouseY > sqUnit * 4 && mouseY < sqUnit * 5)) && (mouseX > 0.5 && mouseX < sqUnit * 1 )) {
        fade = [1, 1, 1, 1, /**/ 0, 0, 0, 0, /**/ 1, 1, 1, 1, /**/0, 0, 0, 0];
    } else if ((mouseX > sqUnit * 1) && (mouseX < sqUnit * 3) && (mouseY > sqUnit * 1) && (mouseY < sqUnit * 3)){
        fade = [0, 0, 1, 1, /**/ 0, 0, 1, 1, /**/ 1, 1, 1, 1, /**/1, 1, 1, 1];
    } else if ((mouseX > sqUnit * 3) && (mouseX < sqUnit * 5) && (mouseY > sqUnit * 1) && (mouseY < sqUnit * 3)){
        fade = [1, 1, 0, 0, /**/ 1, 1, 0, 0, /**/ 1, 1, 1, 1, /**/1, 1, 1, 1];
    } else if ((mouseX > sqUnit * 1) && (mouseX < sqUnit * 3) && (mouseY > sqUnit * 3) && (mouseY < sqUnit * 5)){
        fade = [1, 1, 1, 1, /**/ 1, 1, 1, 1, /**/ 0, 0, 1, 1, /**/0, 0, 1, 1];
    } else if ((mouseX > sqUnit * 3) && (mouseX < sqUnit * 5) && (mouseY > sqUnit * 3) && (mouseY < sqUnit * 5)){
        fade = [1, 1, 1, 1, /**/ 1, 1, 1, 1, /**/ 1, 1, 0, 0, /**/1, 1, 0, 0];
    } else {
        fade = tempFade;
    }
    animate()
}, false);
/////////////////////////////////////////////////////////////////////////
//Forms - if one is selected, show info
$("#A").change(function () {
    if ($("#A").val()=="Empty"){
        tempFade = [0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/0, 0, 0, 0];
        $("#Scenario").text("");

    }
    else if ($("#A").val()=="Cooperate") {
        $("#B").val("Empty");
        tempFade = [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1];
        $("#Scenario").text("If one cooperates, he will either serve the maximum time of 10 years- the most time of all the options- or serve for only one year. " +
         "The average time he might have to serve is 5.5 years which would make this the worst decision of the two.");
        fade = tempFade;
        animate();
    }
    else {
        $("#B").val("Empty");
        tempFade = [1, 1, 0, 1, /**/ 1, 1, 0, 1, /**/ 1, 1, 0, 1, /**/1, 1, 0, 1]
        $("#Scenario").text("If one defects, he will either serve no time at all or 3 years. " +
            "The average time he might have to serve is only 1.5 years which would make this the best option of the two.");
        fade = tempFade;
        animate();
    }
    $("#Scenario2").text("");
});
$("#B").change(function () {
    if ($("#B").val()=="Empty") {
        tempFade = [0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/ 0, 0, 0, 0, /**/0, 0, 0, 0];
        $("#Scenario2").text("");
        fade = tempFade;
    }
    else if ($("#B").val()=="Cooperate") {
        $("#A").val("Empty");
        tempFade = [0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        $("#Scenario2").text("If both cooperate, they will both only serve one year. " +
         "The total time the group would serve is 2 years. That would make this the best group behavior.");
        fade = tempFade;
        animate();
    }
    else if ($("#B").val()=="Defect") {
        $("#A").val("Empty");
        tempFade = [1, 1, 1, 1, /**/ 1, 1, 1, 1, /**/ 1, 1, 0, 0, /**/1, 1, 0, 0]
        $("#Scenario2").text("If both defect, they will both serve 3 years. " +
         "The total time the group would serve is 6 years. That would make this the median group behavior.");
        fade = tempFade;
        animate();
    } else {
        $("#A").val("Empty");
        tempFade = [1, 1, 0, 0, /**/ 1, 1, 0, 0, /**/ 1, 1, 1, 1, /**/1, 1, 1, 1]
        $("#Scenario2").text("If one takes advantage of the other's cooperation, he becomes free while the other serves 10 years. " +
        "The total time the group would serve is 10 years. That would make this the worst group behavior.")
        fade = tempFade;
        animate();
    }
    $("#Scenario").text("");
});