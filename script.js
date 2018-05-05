(function() {
    initializeCanvas()
})();

var canvas, ctx, flag = false,
    prevXpos = 0,
    currXpos = 0,
    prevYpos = 0,
    currYpos = 0,
    dot_flag = false;

var x = "black",
    y = 2;

function initializeCanvas() {
    canvas = document.getElementById('canvas-signature');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function(e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function(e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function(e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function(e) {
        findxy('out', e)
    }, false);
}

function color(element) {
    if (element.id == "black") {
        x = "black"
    }

    if (element.id == "white") {
        x = "white";
        y = 14;
    } else y = 2;
}


function draw() {
    ctx.beginPath();
    ctx.moveTo(prevXpos, prevYpos);
    ctx.lineTo(currXpos, currYpos);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function erase() {
    ctx.clearRect(0, 0, w, h);
    document.getElementById("savedSignature").style.display = "none";
}

function save() {
    document.getElementById("savedSignature").style.border = "2px solid #DDD";
    var dataURL = canvas.toDataURL();
    document.getElementById("savedSignature").src = dataURL;
    document.getElementById("savedSignature").style.display = "inline";
}

function findxy(res, e) {
    if (res == 'down') {
        prevXpos = currXpos;
        prevYpos = currYpos;
        currXpos = e.clientX - canvas.offsetLeft;
        currYpos = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currXpos, currYpos, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevXpos = currXpos;
            prevYpos = currYpos;
            currXpos = e.clientX - canvas.offsetLeft;
            currYpos = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}