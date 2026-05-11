//used to attach a stylesheet to the export
import stringifyStylesheet from '../libraries/stringify-css-rule.js'

const textContainer = document.querySelector("#text-container");
const writingText = document.querySelector("#text");

// typing sound
const typingSound = new Howl({
    src: ['./assets/type.mp3']
});
writingText.addEventListener('input', (event) => {
    typingSound.play();
});

// incantation sounds
const buttonSounds = new Howl({
    src: ['./assets/buttonsounds.mp3'],
    sprite: {
        red:    [0,     550],
        yellow: [550,   743],
        blue:   [1293,  673],
        shake:  [1966,  755],
        drip:   [2721,  633],
        glow:   [3354,  796],
        tilt:   [4150,  825],
        highlight: [4975, 1142]
    }
});

// export sounds
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

// #region construct export stylesheet

// need to do some weird stuff in order to prep a stylesheet for the export.
// because most of the styling is applied directly to the element with spans this only handles out-of-element things like
// animations and element-specific styling (<body>, <p>)
// this code block is placed here to leave open the option to insert rules into it dynamically

const exportStyle = document.createElement("style");
document.head.appendChild(exportStyle);
const exportSheet = exportStyle.sheet;
exportSheet.insertRule(`@keyframes shake {0%, 100% {transform: translateX(-4px);}50% {transform: translateX(4px);}}`, exportSheet.cssRules.length);
exportSheet.insertRule(`@keyframes shake {0%, 100% {transform: translateX(-4px);}50% {transform: translateX(4px);}}`, exportSheet.cssRules.length);
exportSheet.insertRule(`@keyframes drip {0% {text-shadow: 0 0 0 black;}19% {text-shadow: 0 10px 5px transparent;}20% {text-shadow: 0 0 0 black;}49% {text-shadow: 0 10px 5px transparent;}50% {text-shadow: 0 0 0 black;}100% {text-shadow: 0 10px 5px transparent;}}`, exportSheet.cssRules.length);
exportSheet.insertRule(`@keyframes wave {0%, 100% {text-shadow: 0 0 2px blue;}25%, 75% {text-shadow: 0 0 5px blue;}50% {text-shadow: 0 0 10px blue;}}`, exportSheet.cssRules.length);
exportSheet.insertRule(`body { display: flex; justify-content: center; align-items: center; width: 50%; margin: 0 auto; }`, exportSheet.cssRules.length);
exportSheet.insertRule(`p { font-size: 5vh; overflow: visible; margin: 0; font-family: Arial, Helvetica, sans-serif; font-weight: bold; color: white; -webkit-text-stroke: .2vh black; filter: saturate(10); }`, exportSheet.cssRules.length);
exportSheet.disabled = true;

// #endregion

// #region effect application function

// this function finds the currently highlighted text and applies the selected style incantation to it
// current problem with it is that it applies styling to the first instance of a word that occurs,
// i.e. in the sentence "We live in dangerous times, but we live.", even when highlighting the second 'live',
// text effects only ever get applied to the first instance. *NEEDS TO BE SOLVED*

String.prototype.replaceAtIndex = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function ApplyEffect(styleString, sound) {

    let targetString = window.getSelection().toString(); console.log(targetString);
    let newString = `<span ${styleString}>${targetString}</span>`; console.log(newString);

    writingText.innerHTML = writingText.innerHTML.replace(targetString, newString);

    buttonSounds.play(sound);
}

// #endregion

// #region background
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

// #endregion

// #region effect application functions

// Every effect is a button with a 'target' attribute

const effect_red = document.querySelector("button[target='eff_red'");
effect_red.addEventListener('click', (event) => {
    ApplyEffect(`style="color: red; -webkit-text-stroke: 0;"`, 'red');
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
    ApplyEffect(`style="color: transparent; text-transform: full-width; animation: wave 2s linear infinite; -webkit-text-stroke: 0;"`, 'blue');
});
const effect_tilt = document.querySelector("button[target='eff_tilt'");
effect_tilt.addEventListener('click', (event) => {
    ApplyEffect(`style="display: inline-block; rotate: 45deg; transform: skewX(45deg);"`, 'tilt');
});
const effect_hl = document.querySelector("button[target='eff_hl'");
effect_hl.addEventListener('click', (event) => {
    ApplyEffect(`style="background-color: yellow; -webkit-text-stroke: 0;"`, 'highlight');
});
const effect_cursive = document.querySelector("button[target='eff_cursive'");
effect_cursive.addEventListener('click', (event) => {
    ApplyEffect(`style="font-style: italic; vertical-align: super; font-size: .75em;"`, 'cursive');
});
const effect_bregje = document.querySelector("button[target='eff_bregje'");
effect_bregje.addEventListener('click', (event) => {
    ApplyEffect(`style="font-style: italic; color: magenta; font-family: 'Times New Roman', Times, serif; background: blue; -webkit-text-stroke: white .03em; border-radius: 99%;"`, 'cursive');
});

document.querySelector("button[target='saveTypings']").addEventListener('click', function() {
    capture();
});

// #endregion

// #region exporting

function capture() {
    let htmlContent = [`<head><style>${stringifyStylesheet(exportSheet)}</style></head><body><p id="typist-text">${writingText.innerHTML}</p></body>`];
    let bl = new Blob(htmlContent, {type: "text/html"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(bl);
    a.download = `${writingText.innerText.substring(0,10)}.html`;
    a.hidden = true;
    document.body.appendChild(a);
    a.innerHTML = "beep boop downloading";

    writingText.innerHTML = "";
    textContainer.style.animation = "incant 5s 1 ease-out";

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
        textContainer.style.animation = "";
        writingText.innerHTML = "New Text";
        a.click();
    }, 5000);
}

// #endregion