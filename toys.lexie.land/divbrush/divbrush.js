import stringifyStylesheet from 'https://unpkg.com/stringify-css-stylesheet/index.js'

$( function() {
    $( ".tool" ).draggable({
        handle: ".handle",
        stack: ".ui-draggable",
		distance: 0,
    });
} );

let isDrawing = false;
let strokeOrder = 0;
let strokingCount = 0;
let erasing = false;

const dotTemplate = document.createElement('div');

const canvasEl = document.querySelector("#canvas");

canvasEl.onmousemove = handleMouseMove;
canvasEl.onmousedown = (event) => { isDrawing = true; setStroke(dotTemplate); handleMouseMove(event);}
canvasEl.onmouseup = (event) => { isDrawing = false; };

const mainStyle = document.styleSheets[0];

const paintStyle = document.createElement("style");
document.head.appendChild(paintStyle);
const paintStyleSheet = paintStyle.sheet;

function handleMouseMove(event) {
    let dot, eventDoc, doc, body, pageX, pageY;

    event = event || window.event;

    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
        (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
        (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }
    if (isDrawing) {
        if (erasing) {
            
        } else {
            strokingCount++;
            draw(event);
        }
    }
    else {
        strokingCount = 0;
        return;
    }
}

function setStroke(target) {
    target.style.setProperty("position", "absolute");
    target.style.setProperty("transform-origin", "50%");

    target.style.setProperty("background", input_background.value);
    target.style.setProperty("background-repeat", "no-repeat");
    target.style.setProperty("background-size", "cover");

    target.style.setProperty("border-left", input_borderL.value);
    target.style.setProperty("border-right", input_borderR.value);
    target.style.setProperty("border-top", input_borderT.value);
    target.style.setProperty("border-bottom", input_borderB.value);
    target.style.setProperty("border-radius", input_borderRadius.value);

    target.style.setProperty("width", input_width.value + "px");
    target.style.setProperty("height", input_height.value + "px");

    target.style.setProperty("filter", input_filter);

    target.style.setProperty("animation", `brushAnim${strokeOrder} ${input_animSettings.value}`);
    paintStyleSheet.insertRule(`@keyframes brushAnim${strokeOrder} {${input_animation.value}}`);

    target.className = "brush";

    strokeOrder++;
}

function draw(event) {
    let newDot = dotTemplate.cloneNode();

    newDot.style.animationDelay = (0.02 * strokingCount) + "s";

    newDot.style.left = event.pageX - (input_width.value/2) + "px";
    newDot.style.top = event.pageY - (input_height.value/2) + "px";

    canvasEl.appendChild(newDot);
}

const input_width = document.querySelector("#width");
const input_height = document.querySelector("#height");
const input_background = document.querySelector("#background");
const input_borderL = document.querySelector("#borderL");
const input_borderR = document.querySelector("#borderR");
const input_borderT = document.querySelector("#borderT");
const input_borderB = document.querySelector("#borderB");
const input_borderRadius = document.querySelector("#borderRadius");
const input_animation = document.querySelector("#animation");
const input_animSettings = document.querySelector("#animSettings");
let input_filter = "none";

const overlay = document.querySelector("#divBrush_bootOverlay");
document.querySelector("button[target='closeOverlay']").addEventListener('click', function() {
    overlay.remove();
});

const previewBrush = document.querySelector(".peviewBrush");
let previewShadow = previewBrush.attachShadow({ mode: "open" });

function SetPreview() {
    setStroke(previewBrush);
    previewBrush.classList = "";
    previewBrush.style.setProperty("animation", `brushAnim ${input_animSettings.value}`);
    previewShadow.adoptedStyleSheets = [new CSSStyleSheet()];
    previewShadow.adoptedStyleSheets[0].replaceSync("@keyframes brushAnim {" + input_animation.value + "}");
}

document.querySelectorAll("input, textarea, details").forEach(element => {
    element.addEventListener('input', function() {
        SetPreview();
    })
});
SetPreview();

document.querySelector("button[target='saveCanvas']").addEventListener('click', function() {
    capture();
});

const eraserButton = document.querySelector("button[target='toggleEraser']");
eraserButton.addEventListener('click', function() {
    toggleEraser();
});
function toggleEraser() {
    erasing = !erasing;

    document.querySelectorAll(".brush").forEach(element => {
        element.addEventListener('mouseover', function() {
            if (erasing)
                element.style.transition = "2s";
                element.style.top = "150vh";
                setTimeout(function(){
                    element.remove();
                }, 2000);
        });
    });

    if (erasing) {
        document.body.style.cursor = "url('./assets/cursor_eraser.png') 16 16, auto";
        mainStyle.cssRules[4].style.pointerEvents = "auto";
        eraserButton.style.filter = "drop-shadow(1px 1px 0 black) drop-shadow(1px -1px 0 black) drop-shadow(-1px 1px 0 black) drop-shadow(-1px -1px 0 black) brightness(100)"
    } else if (!erasing) {
        document.body.style.cursor = "auto";
        mainStyle.cssRules[4].style.pointerEvents = "none";
        eraserButton.style.filter = "drop-shadow(0 0 2px white) drop-shadow(0 0 5px yellow) drop-shadow(0 0 10px orangered)";
    }
}

function capture() {
    let htmlContent = [`<head><style>${stringifyStylesheet(paintStyleSheet)}</style></head>` + canvasEl.innerHTML];
    let bl = new Blob(htmlContent, {type: "text/html"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(bl);
    a.download = "drag-me-into-flippabook.html";
    a.hidden = true;
    document.body.appendChild(a);
    a.innerHTML = "beep boop downloading";
    a.click();
}

let brushPresets = document.querySelectorAll("a[target='setBrush']")
brushPresets.forEach(element => {
    element.addEventListener('click', function() {
        brushPresets.forEach(element => element.classList.remove('active'))
        element.classList.add('active')
        setBrush(element.getAttribute("value"));
    })
});
function setBrush(brush) {
    switch (brush) {
    case "guymode":
        input_background.value =    "url('https://toys.lexie.land/images/guymode.png')";
        input_borderL.value =       "none";
        input_borderR.value =       "none";
        input_borderT.value =       "none";
        input_borderB.value =       "none";
        input_borderRadius.value =  "0px";
        input_width.value =         "50";
        input_height.value =        "50";
        input_animSettings.value =  "infinite 2s linear";
        input_animation.value =     "0% { } 100% { }";
        input_filter =              "none"
        break;
    case "moon":
        input_background.value =    "black";
        input_borderL.value =       "20px solid yellow";
        input_borderR.value =       "none";
        input_borderT.value =       "none";
        input_borderB.value =       "20px solid yellow";
        input_borderRadius.value =  "999px";
        input_width.value =         "100";
        input_height.value =        "100";
        input_animSettings.value =  "infinite 2s linear";
        input_animation.value =     "0% { } 100% { }";
        input_filter =              "none"
        break;
    case "pillar":
        input_background.value =    "white";
        input_borderL.value =       "none";
        input_borderR.value =       "none";
        input_borderT.value =       "4px solid blue";
        input_borderB.value =       "4px solid blue";
        input_borderRadius.value =  "0px";
        input_width.value =         "75";
        input_height.value =        "75";
        input_animSettings.value =  "infinite 2s linear";
        input_animation.value =     "0% { rotate: 0deg; } 100% { rotate: 360deg; }";
        input_filter =              "none"
        break;
    case "orbit":
        input_background.value =    "none";
        input_borderL.value =       "12px dotted black";
        input_borderR.value =       "2px dotted lightgray";
        input_borderT.value =       "none";
        input_borderB.value =       "8px dotted gray";
        input_borderRadius.value =  "999px";
        input_width.value =         "50";
        input_height.value =        "50";
        input_animSettings.value =  "infinite 2s linear";
        input_animation.value =     "0% { rotate: 0deg; } 100% { rotate: 360deg; }";
        input_filter =              "none"
        break;
    case "light":
        input_background.value =    "white";
        input_borderL.value =       "none";
        input_borderR.value =       "none";
        input_borderT.value =       "none";
        input_borderB.value =       "none";
        input_borderRadius.value =  "999px";
        input_width.value =         "20";
        input_height.value =        "20";
        input_animSettings.value =  "infinite 2s linear";
        input_animation.value =     "none";
        input_filter =              "drop-shadow(0 0 2px white) drop-shadow(0 0 5px yellow) drop-shadow(0 0 10px orangered)";
        break;
    case "worm":
        input_background.value =    "#fffb00ff";
        input_borderL.value =       "none";
        input_borderR.value =       "none";
        input_borderT.value =       "none";
        input_borderB.value =       "none";
        input_borderRadius.value =  "999px";
        input_width.value =         "50";
        input_height.value =        "30";
        input_animSettings.value =  "infinite 1s linear";
        input_animation.value =     "0% {background-color: #fffb00ff;transform: translateX(-20px) scale(1);}25% {transform: scale(1.5);}50% {background-color: #0fc20fff;transform: translateX(20px) scale(1);} 75% {transform: scale(1.5);}100% {background-color: #fffb00ff;transform: translateX(-20px) scale(1);}";
        input_filter =              "none";
        break;
    case "wiggly":
        input_background.value =    "#f701ff";
        input_borderL.value =       "none";
        input_borderR.value =       "none";
        input_borderT.value =       "none";
        input_borderB.value =       "none";
        input_borderRadius.value =  "999px";
        input_width.value =         "10";
        input_height.value =        "10";
        input_animSettings.value =  "infinite .5s linear";
        input_animation.value =     "0%, 100% { scale: 1; } 50% { scale: 1.5; }";
        input_filter =              "none";
        break;
    case "leaf":
        input_background.value =    "linear-gradient(to top left, green 0%, green 48%, orange 49%, orange 51%, green 52%, green 100%)";
        input_borderL.value =       "orange 5px solid";
        input_borderR.value =       "none";
        input_borderT.value =       "none";
        input_borderB.value =       "orange 5px solid";
        input_borderRadius.value =  "999px 0px";
        input_width.value =         "35";
        input_height.value =        "35";
        input_animSettings.value =  "infinite 5s ease-out";
        input_animation.value =     "0%, 100% { transform-origin: top left; transform: translateX(50%) rotate(0deg); } 50% { transform-origin: top left; transform: translateX(50%) rotate(90deg); }";
        input_filter =              "none";
        break;
    case "jitter":
        input_background.value =    "black";
        input_borderL.value =       "none";
        input_borderR.value =       "none";
        input_borderT.value =       "none";
        input_borderB.value =       "none";
        input_borderRadius.value =  "999px";
        input_width.value =         "10";
        input_height.value =        "80";
        input_animSettings.value =  ".5s linear infinite";
        input_animation.value =
`0%, 100% {
    transform-origin: 50%;
    transform: translate(0, 0);
    box-shadow: #ff000038 8px -1px 0;
}
10% {
    transform: translate(-9px, 1px);
    box-shadow: #ff00009d 6px -7px 0;
}
20% {
    transform: translate(1px, -5px);
    box-shadow: #ff000080 0px -7px 0;
}
30% {
    transform: translate(-5px, -3px);
    box-shadow: #ff000038 1px 7px 0;
}
40% {
    transform: translate(4px, 2px);
    box-shadow: #ff000038 -9px 5px 0;
}
50% {
    transform: translate(-3px, -8px);
    box-shadow: #ff000038 -6px 3px 0;
}
60% {
    transform: translate(1px, -2px);
    box-shadow: #ff000038 -7px 1px 0;
}
70% {
    transform: translate(1px, 9px);
    box-shadow: #ff000038 6px 8px 0;
}
80% {
    transform: translate(-4px, 3px);
    box-shadow: #ff000038 2px -6px 0;
}
90% {
    transform: translate(-7px, 4px);
    box-shadow: #ff000038 -5px 1px 0;
}`;
        input_filter =              "none";
        break;
    default:
        console.log(`we outta ${brush}.`);
    }
    setStroke(dotTemplate);
    SetPreview();
}