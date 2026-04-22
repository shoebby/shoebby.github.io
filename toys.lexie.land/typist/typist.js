import stringifyStylesheet from '../libraries/stringify-css-rule.js'

const writingText = document.querySelector("#text");
let replaceAll = false;

const typingSound = new Howl({
    src: ['./assets/type.mp3']
});

const buttonSounds = new Howl({
    src: ['./assets/buttonsounds.mp3'],
    sprite: {
        red:    [0,     550],
        yellow: [550,   743],
        blue:   [1293,  673],
        shake:  [1966,  755],
        drip:   [2721,  633],
        glow:   [3354,  796],
        tilt:   [4150,  825]
    }
});

const fireSound = new Howl({
    src: ['../divbrush/assets/audio/flames.mp3']
});

const paperSound_reveal = new Howl({
    src: ['./assets/paper-reveal.mp3']
});
const paperSound_crush = new Howl({
    src: ['./assets/paper-crush.mp3']
});

const laughSound = new Howl({
    src: ['./assets/laugh.mp3']
});

const animStyle = document.createElement("style");
document.head.appendChild(animStyle);
const animsSheet = animStyle.sheet;
animsSheet.insertRule(`@keyframes shake {0%, 100% {transform: translateX(-4px);}50% {transform: translateX(4px);}}`, animsSheet.cssRules.length);
animsSheet.insertRule(`@keyframes shake {0%, 100% {transform: translateX(-4px);}50% {transform: translateX(4px);}}`, animsSheet.cssRules.length);
animsSheet.insertRule(`@keyframes drip {0% {text-shadow: 0 0 0 black;}19% {text-shadow: 0 10px 5px transparent;}20% {text-shadow: 0 0 0 black;}49% {text-shadow: 0 10px 5px transparent;}50% {text-shadow: 0 0 0 black;}100% {text-shadow: 0 10px 5px transparent;}}`, animsSheet.cssRules.length);
animsSheet.insertRule(`@keyframes wave {0%, 100% {text-shadow: 0 0 2px blue;}25%, 75% {text-shadow: 0 0 5px blue;}50% {text-shadow: 0 0 10px blue;}}`, animsSheet.cssRules.length);
animsSheet.insertRule(`body { display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; margin: 0; }`, animsSheet.cssRules.length);
animsSheet.insertRule(`p { font-size: 3vh; overflow: visible; margin: 0; }`, animsSheet.cssRules.length);
animsSheet.disabled = true;

let replaceModeToggle = document.querySelector("#replaceMode")
replaceModeToggle.addEventListener('change', (event) => {replaceAll = !replaceAll; console.log(`replaceAll is ${replaceAll}`)})

function ApplyEffect(styleString, sound) {
    let startIndex = window.getSelection().anchorOffset; console.log(startIndex);
    let endIndex = window.getSelection().focusOffset; console.log(endIndex);

    let target = document.getSelection().toString();
    let fulltext = writingText.innerHTML.toString();

    if (replaceAll)
        writingText.innerHTML = fulltext.replaceAll(target, `<span ${styleString}>${target}</span>`);
    else if (!replaceAll)
        writingText.innerHTML = fulltext.replace(target, `<span ${styleString}>${target}</span>`);

    buttonSounds.play(sound)
}

const bgparent = document.querySelector("#background");
let pointsArray_circle = [[250, 0], [-250, 0], [0, -250], [0, 250], [175, 175], [-175, 175], [175, -175], [-175, -175]];

let pointsArray_startip_1 = [[175, 75], [0, -50], [-175, 75]];
let pointsArray_startip_2 = [[0, 200], [125, -150], [-75, 0]];
let pointsArray_startip_3 = [[0, 200], [-125, -150], [75, 0]];
let colorStep;
let sizeStep;
let startSize = 4;

function initbg(depth) {
    colorStep = 50 / depth;
    sizeStep = startSize / depth;

    const startPoint_circle = document.createElement("div");
    startPoint_circle.classList = "point spins";
    startPoint_circle.style.left = "50vw";
    startPoint_circle.style.top = "45vh";
    setPointStyle(startPoint_circle, depth + 1);
    bgparent.appendChild(startPoint_circle);

    const startPoint_star = document.createElement("div");
    startPoint_star.classList.add("point");
    startPoint_star.style.left = "50vw";
    startPoint_star.style.top = "45vh";
    setPointStyle(startPoint_star, depth + 1);
    bgparent.appendChild(startPoint_star);

    //circle
    buildbg(pointsArray_circle, depth, startPoint_circle, 0.7);

    //star
    buildbg(pointsArray_startip_1, 5, startPoint_star, 0.7);
    buildbg(pointsArray_startip_2, 5, startPoint_star, 0.7);
    buildbg(pointsArray_startip_3, 5, startPoint_star, 0.7);
}

function buildbg(points, depth, parent, ratio) {
    if (depth == 0) {
        return;
    }

    for (var i = 0; i < points.length; i++) {
        const newPixel = document.createElement("div");
        
        parent.appendChild(newPixel);
        if (parent.classList == "point spins")
            newPixel.classList = "point spins";
        else
            newPixel.classList = "point";
        
        newPixel.style.transform += `translateX(${ points[i][0] }px) translateY(${ points[i][1] }px)`;

        setPointStyle(newPixel, depth);

        var newPoints = points.map((point) => point.map((coord) => coord * ratio));

        buildbg(newPoints, depth - 1, newPixel, ratio);
    }
}
function setPointStyle(point, pointDepth) {
    point.style.backgroundColor = `hsl(${(((colorStep * pointDepth) * 2) - 80)}deg, 100%, ${(colorStep * pointDepth) + 10}%)`;
    point.style.boxShadow = `
        0 0 10px 3px
        hsl(${(((colorStep * pointDepth) * 2) - 80)}deg, 100%, ${(colorStep * pointDepth) + 10}%)
        `;
    point.style.width = `${(sizeStep * pointDepth) + 2}px`;
    point.style.height = `${(sizeStep * pointDepth) + 2}px`;
}
initbg(3);

const effect_red = document.querySelector("button[target='eff_red'");
effect_red.addEventListener('click', (event) => {
    ApplyEffect(`style="color: red"`, 'red');
});
const effect_shake = document.querySelector("button[target='eff_shake'");
effect_shake.addEventListener('click', (event) => {
    ApplyEffect(`style="display: inline-block; animation: shake .2s linear infinite;"`, 'shake');
});
const effect_drip = document.querySelector("button[target='eff_drip'");
effect_drip.addEventListener('click', (event) => {
    ApplyEffect(`style="animation: drip 1s ease-in infinite;"`, 'drip');
});
const effect_glow = document.querySelector("button[target='eff_glow'");
effect_glow.addEventListener('click', (event) => {
    ApplyEffect(`style="color: white; text-shadow: 0 0 2px orange, 0 0 10px orangered, 0 0 20px red;"`, 'glow');
});
const effect_yellow = document.querySelector("button[target='eff_yellow'");
effect_yellow.addEventListener('click', (event) => {
    ApplyEffect(`style="color: yellow; -webkit-text-stroke: black .01em; font-size: 2em;"`, 'yellow');
});
const effect_blue = document.querySelector("button[target='eff_blue'");
effect_blue.addEventListener('click', (event) => {
    ApplyEffect(`style="color: transparent; text-transform: full-width; animation: wave 2s linear infinite;"`, 'blue');
});
const effect_tilt = document.querySelector("button[target='eff_tilt'");
effect_tilt.addEventListener('click', (event) => {
    ApplyEffect(`style="display: inline-block; rotate: 45deg; transform: skewX(45deg);"`, 'tilt');
});

writingText.addEventListener('focus', (event) => {
    
});
writingText.addEventListener('blur', (event) => {
    
});
writingText.addEventListener('input', (event) => {
    typingSound.play();
});

document.querySelector("button[target='saveTypings']").addEventListener('click', function() {
    capture();
});

function capture() {
    let htmlContent = [`<head><style>${stringifyStylesheet(animsSheet)}</style></head><body><p>${writingText.innerHTML}</p></body>`];
    let bl = new Blob(htmlContent, {type: "text/html"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(bl);
    a.download = "typist-incantation.html";
    a.hidden = true;
    document.body.appendChild(a);
    a.innerHTML = "beep boop downloading";

    writingText.innerHTML = "";
    writingText.style.animation = "incant 5s 1 ease-out";

    paperSound_crush.rate(1.5);
    paperSound_crush.play();
    
    let laugh1 = laughSound.play();
    let laugh2 = laughSound.play();
    let laugh3 = laughSound.play();
    laughSound.rate(.5, laugh1);
    laughSound.rate(.9, laugh2);
    laughSound.rate(1.1, laugh3);

    setTimeout(function(){    
        fireSound.fade(0, 1, 500);
        fireSound.play();
        setTimeout(function(){
            fireSound.fade(1, 0, 500);
        }, 2000);
    }, 2000);

    setTimeout(function(){
        paperSound_reveal.play();
    }, 4500);

    setTimeout(function(){
        writingText.style.animation = "";
        a.click();
    }, 5000);
}