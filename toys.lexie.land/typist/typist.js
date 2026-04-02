const writingText = document.querySelector("#text");
let storedText = writingText.innerHTML;
let replaceAll = false;

let replaceModeToggle = document.querySelector("#replaceMode")
replaceModeToggle.addEventListener('change', (event) => {replaceAll = !replaceAll; console.log(`replaceAll is ${replaceAll}`)})

function ApplyEffect(styleString) {
    let startIndex = window.getSelection().anchorOffset; console.log(startIndex);
    let endIndex = window.getSelection().focusOffset; console.log(endIndex);

    let target = document.getSelection().toString();
    let fulltext = writingText.innerHTML.toString();

    if (replaceAll)
        writingText.innerHTML = fulltext.replaceAll(target, `<span ${styleString}>${target}</span>`);
    else if (!replaceAll)
        writingText.innerHTML = fulltext.replace(target, `<span ${styleString}>${target}</span>`);
}

const effect_red = document.querySelector("button[target='eff_red'");
effect_red.addEventListener('click', (event) => {
    ApplyEffect(`style="color: red"`);
});
const effect_shake = document.querySelector("button[target='eff_shake'");
effect_shake.addEventListener('click', (event) => {
    ApplyEffect(`style="display: inline-block; animation: shake .2s linear infinite;"`);
});
const effect_drip = document.querySelector("button[target='eff_drip'");
effect_drip.addEventListener('click', (event) => {
    ApplyEffect(`style="animation: drip 1s ease-in infinite;"`);
});
const effect_glow = document.querySelector("button[target='eff_glow'");
effect_glow.addEventListener('click', (event) => {
    ApplyEffect(`style="color: white; text-shadow: 0 0 2px orange, 0 0 10px orangered, 0 0 20px red;"`);
});
const effect_yellow = document.querySelector("button[target='eff_yellow'");
effect_yellow.addEventListener('click', (event) => {
    ApplyEffect(`style="color: yellow; -webkit-text-stroke: black .01em; font-size: 2em;"`);
});
const effect_blue = document.querySelector("button[target='eff_blue'");
effect_blue.addEventListener('click', (event) => {
    ApplyEffect(`style="color: transparent; text-transform: full-width; animation: wave 2s linear infinite;"`);
});
const effect_tilt = document.querySelector("button[target='eff_tilt'");
effect_tilt.addEventListener('click', (event) => {
    ApplyEffect(`style="display: inline-block; rotate: 45deg; transform: skewX(45deg);"`);
});

writingText.addEventListener('focus', (event) => {
    
});
writingText.addEventListener('blur', (event) => {
    
});

// switch (currentText) {
//   case "1":
//     console.log("1");
//     break;
//   case "2":
//     console.log("3");
//     break;
//   case "3":
//     console.log("3");
//     break;
//   default:
//     console.log(`nuthin'`);
// }