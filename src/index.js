import { MathUtils, Vector2 } from "three";

const treeButton = document.getElementById("treeButton");
const clearButton = document.getElementById("clearButton");
const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");

const slider_depth = document.getElementById("slider_depth");
const slider_angleL = document.getElementById("slider_angleL");
const slider_angleR = document.getElementById("slider_angleR");
const slider_startX = document.getElementById("slider_startX");
const slider_startY = document.getElementById("slider_startY");
const slider_endX = document.getElementById("slider_endX");
const slider_endY = document.getElementById("slider_endY");
const slider_ratio = document.getElementById("slider_ratio");

const output_depth = document.getElementById("output_depth");
const output_angleL = document.getElementById("output_angleL");
const output_angleR = document.getElementById("output_angleR");
const output_startX = document.getElementById("output_startX");
const output_startY = document.getElementById("output_startY");
const output_endX = document.getElementById("output_endX");
const output_endY = document.getElementById("output_endY");
const output_ratio = document.getElementById("output_ratio");

output_depth.innerHTML = slider_depth.value;
output_angleL.innerHTML = slider_angleL.value;
output_angleR.innerHTML = slider_angleR.value;
output_startX.innerHTML = slider_startX.value;
output_startY.innerHTML = slider_startY.value;
output_endX.innerHTML = slider_endX.value;
output_endY.innerHTML = slider_endY.value;
output_ratio.innerHTML = slider_ratio.value;

slider_depth.oninput = function () {
    output_depth.innerHTML = this.value;
}

slider_angleL.oninput = function () {
    output_angleL.innerHTML = this.value;
}

slider_angleR.oninput = function () {
    output_angleR.innerHTML = this.value;
}

slider_startX.oninput = function () {
    output_startX.innerHTML = this.value;
}

slider_startY.oninput = function () {
    output_startY.innerHTML = this.value;
}

slider_endX.oninput = function () {
    output_endX.innerHTML = this.value;
}

slider_endY.oninput = function () {
    output_endY.innerHTML = this.value;
}

slider_ratio.oninput = function () {
    output_ratio.innerHTML = this.value;
}

treeButton.onclick = function () {
    var x1 = parseInt(slider_startX.value);
    var y1 = parseInt(slider_startY.value);
    var x2 = parseInt(slider_endX.value);
    var y2 = parseInt(slider_endY.value);
    var angleLeft = parseInt(slider_angleL.value);
    var angleRight = parseInt(slider_angleR.value);
    var ratio = parseFloat(slider_ratio.value);
    var depth = parseInt(slider_depth.value);

    tree(x1,
        y1,
        x2,
        y2,
        angleLeft,
        angleRight,
        ratio,
        depth);
}

clearButton.onclick = function () {
    ctx.reset();
}

/*
function rotate(vector, angle) {
    var rads = MathUtils.DEG2RAD(angle);
    var a = Math.cos(rads);
    var b = Math.sin(rads);
    var R = new Matrix2(a, -b, b, a);
    return R * vector;
}
*/
function tree(x1, y1, x2, y2, angleLeft, angleRight, ratio, depth) {
    console.log("entered tree depth: " + depth)
    if (depth <= 0) {
        return;
    }

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    console.log("(" + x1 + ", " + y1 + ") to (" + x2 + ", " + y2 + ")");

    var base = new Vector2(x2 - x1, y2 - y1);

    var new_base = base.clone().multiplyScalar(ratio);

    var angleLeft_rad = MathUtils.degToRad(angleLeft);
    var angleRight_rad = MathUtils.degToRad(angleRight);

    var left = new_base.clone().rotateAround(new Vector2(0, 0), -angleLeft_rad);
    var right = new_base.clone().rotateAround(new Vector2(0, 0), angleRight_rad);

    //var left = rotate(new_base, -angleLeft);
    //var right = rotate(new_base, angleRight);
    
    var end = new Vector2(x2, y2);
    var left_end = end.clone().add(left);
    var right_end = end.clone().add(right);


    tree(x2, y2, left_end.x, left_end.y, angleLeft, angleRight, ratio, depth - 1);
    tree(x2, y2, right_end.x, right_end.y, angleLeft, angleRight, ratio, depth - 1);
}