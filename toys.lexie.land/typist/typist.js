import stringifyStylesheet from '../libraries/stringify-css-rule.js'

const writingText = document.querySelector("#text");
let storedText = writingText.innerHTML;
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

const animStyle = document.createElement("style");
document.head.appendChild(animStyle);
const animsSheet = animStyle.sheet;
animsSheet.insertRule(`@keyframes shake {0%, 100% {transform: translateX(-4px);}50% {transform: translateX(4px);}}`, animsSheet.cssRules.length);
animsSheet.insertRule(`@keyframes shake {0%, 100% {transform: translateX(-4px);}50% {transform: translateX(4px);}}`, animsSheet.cssRules.length);
animsSheet.insertRule(`@keyframes drip {0% {text-shadow: 0 0 0 black;}19% {text-shadow: 0 10px 5px transparent;}20% {text-shadow: 0 0 0 black;}49% {text-shadow: 0 10px 5px transparent;}50% {text-shadow: 0 0 0 black;}100% {text-shadow: 0 10px 5px transparent;}}`, animsSheet.cssRules.length);
animsSheet.insertRule(`@keyframes wave {0%, 100% {text-shadow: 0 0 2px blue;}25%, 75% {text-shadow: 0 0 5px blue;}50% {text-shadow: 0 0 10px blue;}}`, animsSheet.cssRules.length);
animsSheet.insertRule(`p { font-size: 1.8em; overflow: visible; }`, animsSheet.cssRules.length);

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
    a.click();
}