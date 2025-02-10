import { Vector2 } from "three";

const treeButton = document.getElementById("treeButton");
const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");

treeButton.onclick = function () {
    tree(250,500,250,400,45,45,.75,5);
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

    var new_base = new Vector2(x2 - x1, y2 - y1);

    new_base.multiplyScalar(ratio);

    var left = new_base.rotateAround(new Vector2(0, 0), -angleLeft);
    var right = new_base.rotateAround(new Vector2(0, 0), angleRight);

    //var left = rotate(new_base, -angleLeft);
    //var right = rotate(new_base, angleRight);
    
    var end = new Vector2(x2, y2);
    var left_end = new Vector2(end.x + left, end.y + left);
    var right_end = new Vector2(end.x + right, end.y + right);


    tree(x2, y2, left_end.x, left_end.y, angleLeft, angleRight, ratio, depth - 1);
    tree(x2, y2, right_end.x, right_end.y, angleLeft, angleRight, ratio, depth - 1);
}