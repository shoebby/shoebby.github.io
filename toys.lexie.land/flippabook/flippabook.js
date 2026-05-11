let slideAmount = 1;

const currentSlideElement = document.querySelector("#currentSlide");
const editableSlideTemplate = document.querySelector(".editslide");

const thumbnailTemplate = document.querySelector(".slide-thumbnail");

const slidesContainer = document.querySelector("#slidesContainer");

let activeSlide = document.querySelector(".slide1");
let activeThumb = document.querySelector(".thumb1");
let activeSlideIndex = 1;

let infoLines = document.querySelectorAll(".infoline");
infoLines.forEach(line => {
    makeDraggable(line);
});

// #region helper functions

// perhaps more accurately makeInteractable, since it also adds the DoToolEffect() event listener
// order of these is important, as the dragging functionality takes precedent this way unless it's disabled
function makeDraggable(element) {
    $( element ).draggable({
        stack: ".ui-draggable",
        distance: 0,
    });

    element.addEventListener('click', () => {
        DoToolEffect(element);
    });
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function PixelizeSize(element) {
    //gets the width and height of an element in pixel units using getComputedStyle
    let el_height = parseInt(window.getComputedStyle(element).getPropertyValue("height"));
    let el_width = parseInt(window.getComputedStyle(element).getPropertyValue("width"));

    //assigns new pixel-unit sizes to the element, the actual size of the element shouldn't change from this process
    element.style.height = el_height + "px";
    element.style.width = el_width + "px";
}

function SetThumbImg(slide, thumb) {
    //the width and height of the thumbnail have to be identical to the slide at first
    let containerWidth = slide.offsetWidth;
	let containerHeight = slide.offsetHeight;

    //makes a similar-enough <canvas> copy of the slide, which is then turned into a webp which can then be freely scaled down to size
    html2canvas(slide, {
        backgroundColor: null,
        removeContainer: true,
        scale: .1,
        width: containerWidth,
        height: containerHeight,
        x: 0,
        y: 0,
    }).then(canvas => {
        thumb.querySelector("img").src = canvas.toDataURL("image/webp");
    });
}

//returns an array of the elements inside of the focused slide
function GetActiveElements() {
    return activeSlide.querySelectorAll("video, div, img");
}

// #endregion

// #region adding and focusing slides

const addSlideBtn = document.querySelector("button[target='addPage']");
addSlideBtn.addEventListener('click', (event) => {
        AddSlide();
});

const focusSlideBtn = document.querySelector("button[target='focusPage']");
focusSlideBtn.addEventListener('click', (event) => {
        FocusSlide(focusSlideBtn.value.toString());
});

function FocusSlide(int) {
    //converts an element's width/height values into px, which is necessary for exports to convert into % properly
    activeSlide.querySelectorAll("div.obj, video.obj, img.obj").forEach(element => {
        PixelizeSize(element);
    });

    //sets thumbnail of the blurred slide
    SetThumbImg(activeSlide, activeThumb);

    //removes the focus classes from the blurred slide/thumbnail pair, iterates through all slides/thumbnails
    document.querySelectorAll(".slide-thumbnail").forEach(element => {
        element.classList.remove("thumb-focused");
    });
    document.querySelectorAll(".editslide").forEach(element => {
        element.classList.remove("slide-focused");
    });

    //pauses and resets any and all video/audio elements inside of the blurred slide
    document.querySelectorAll("video, audio").forEach(element => {
        element.pause();
        element.currentTime = 0;
    });

    //sets and assigns classes to the focused slide
    activeSlide = document.querySelector(`.slide${int}`);
    activeThumb = document.querySelector(`.thumb${int}`);
    activeSlideIndex = int;
    activeThumb.classList.add("thumb-focused");
    activeSlide.classList.add("slide-focused");

    //autoplay focused slide video/audio elements
    activeSlide.querySelectorAll("video, audio").forEach(element => {
        element.play();
    });

    //sets thumbnail of the focused slide
    SetThumbImg(activeSlide, activeThumb);
}
FocusSlide(1);

function AddSlide() {
    slideAmount++;

    //creating a new thumbnail from template node
    let newThumb = thumbnailTemplate.cloneNode(true);
    newThumb.classList.remove("thumb1");
    newThumb.classList.add(`thumb${slideAmount.toString()}`);
    
    //wiring up the new slide's thumbnail button
    let newFocus = newThumb.querySelector("button[target='focusPage']");
    newFocus.value = slideAmount.toString();
    newFocus.addEventListener('click', (event) => {
        FocusSlide(newFocus.value);
    });
    
    //creating a new slide from template node
    let newSlide = editableSlideTemplate.cloneNode(true);
    newSlide.classList.remove("slide1");
    newSlide.classList.add(`slide${slideAmount.toString()}`);
    newSlide.innerHTML = ``;
    
    //appending thumbnail and slide to document and focusing on the new slide
    slidesContainer.appendChild(newThumb);
    currentSlideElement.appendChild(newSlide);
    FocusSlide(slideAmount)
}

// #endregion

// #region drag-and-dropping files

//this set of functions handles the dragging-and-dropping of various filetypes
//each filetype needs to be handled specifically, because the function has to construct specific elements to accommodate them
//verified support for:
//// images (jpeg, png, gif, webp, avif, bmp, ico)
//// video (mp4, mkv, webm)
//// audio (mp3, wav, flac, avif)
//// HTML
//according to MDN docs, support for other markdown languages is theoretically possible, but would need additional parsing

let dropbox;

dropbox = document.querySelector("#main-grid");
dropbox.addEventListener("dragenter", dragenter);
dropbox.addEventListener("dragover", dragover);
dropbox.addEventListener("drop", drop);

function dragenter(e) {
    document.querySelector(".slide-focused").style.border = "2px dotted blue";
    e.stopPropagation();
    e.preventDefault();
}

function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}

function drop(e) {
    document.querySelector(".slide-focused").style.border = "none";
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files);
}

function handleFiles(files) {
    let activeSlide = document.querySelector(".slide-focused");

    //for each file dragged into the window it checks the file's type with regex
    //all elements' heights are initially capped to accommodate large-scale assets, but this gets ignored when pumped
    //all elements are made draggable
    //since the files are read as DataURL, they are stored in the page itself, which makes exporting easier!
    //low-res assets are preferable however, because the huge blocks of text this generates quickly become unwieldy when further editing of an export is desired
    for (const file of files) {

        console.log(file)

        //images are put into an <img> element
        if (/image\/.*/.test(file.type)) {
            const img = document.createElement("img");
            img.classList.add("obj");
            img.file = file;
            img.style.maxHeight = "100%";
            activeSlide.appendChild(img);

            makeDraggable(img);

            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        // videos go into a <video> element, which loops and autoplays by default
        else if (/video\/.*/.test(file.type)) {
            const vid = document.createElement("video");
            vid.classList.add("obj");
            vid.loop = true;
            vid.autoplay = true;
            vid.file = file;
            vid.style.maxHeight = "100%";
            activeSlide.appendChild(vid);

            makeDraggable(vid);

            const reader = new FileReader();
            reader.onload = (e) => {
                vid.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        // videos go into an <audio> element, which loops and autoplays by default
        else if (/audio\/.*/.test(file.type)) {
            const aud = document.createElement("audio");
            aud.classList.add("obj");
            aud.loop = true;
            aud.autoplay = true;
            aud.file = file;
            aud.style.maxHeight = "100%";
            activeSlide.appendChild(aud);

            makeDraggable(aud);

            const reader = new FileReader();
            reader.onload = (e) => {
                aud.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        // HTML goes into an <iframe> element inside of a <div>
        else if (/.*html/.test(file.type)) {
            const divContainer = document.createElement("div");
            divContainer.classList.add("obj");
            divContainer.style.maxHeight = "100%";
            activeSlide.appendChild(divContainer);

            const ifr = document.createElement("iframe");
            ifr.classList.add("obj");
            ifr.scrolling = "no";
            divContainer.appendChild(ifr);

            makeDraggable(divContainer);

            const reader = new FileReader();
            reader.onload = (e) => {
                ifr.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        else {
            return;
        }
    }
}
// #endregion

// #region exporting

const exportBtn = document.querySelector("button[target='export']");
exportBtn.addEventListener('click', (event) => {
    ExportSlides();
});

function ExportSlides() {
    let zip = new JSZip();

    let slides = document.querySelectorAll(".editslide");

    slides.forEach((slide, index) => {
        slide.querySelectorAll(".obj").forEach(element => {
            element.style.width = window.getComputedStyle(element).getPropertyValue("width");
            element.style.height = window.getComputedStyle(element).getPropertyValue("height");

            element.style.position = "absolute";
        });
        slide.querySelectorAll("iframe.obj").forEach(element => {
            element.style.width = "100%";
            element.style.height = "100%";
            element.style.border = "none";
            element.style.boxSizing = "border-box";
            element.style.pointerEvents = "none";
        });

        const container = document.createElement("div");
        container.classList.add("container");

        const page = document.createElement("div");
        page.classList.add("page");

        let slideClone = slide.cloneNode(true);

        let slideWidth = parseInt(window.getComputedStyle(document.querySelector('#currentSlide')).getPropertyValue("width"));
        let slideHeight = parseInt(window.getComputedStyle(document.querySelector('#currentSlide')).getPropertyValue("height"));

        slideClone.querySelectorAll(".obj").forEach(element => {
            element.classList.remove("ui-draggable", "ui-draggable-handle", "locked");

            let elementLeft = parseInt(element.style.left);
            let elementTop = parseInt(element.style.top);

            element.style.left = `${(elementLeft / slideWidth) * 100}%`;
            element.style.top = `${(elementTop / slideHeight) * 100}%`;
        });
        slideClone.querySelectorAll("img.obj, video.obj, div.obj").forEach(element => {
            let elementWidth = parseInt(element.style.width);
            let elementHeight = parseInt(element.style.height);
            console.log(`width: ${elementWidth}`);
            console.log(`height: ${elementHeight}`);

            element.style.width = `${(elementWidth / slideWidth) * 100}%`;
            element.style.height = `${(elementHeight / slideHeight) * 100}%`;
        });

        container.appendChild(page);
        page.appendChild(slideClone);

        if ((index + 1) < slides.length) {
            let nextBtn = document.createElement("a");
            nextBtn.classList.add("button-next");
            nextBtn.setAttribute("href", `page${index+1}.html`);
            nextBtn.innerHTML = "NEXT PAGE";
            
            container.appendChild(nextBtn);
        } else {}

        let htmlContent = [`<!DOCTYPE html><head>
            <link rel="stylesheet" href="style.css">
            </head>
            <body>` + container.outerHTML + `</body>`];
        let bl = new Blob(htmlContent, {type: "text/html"});

        if (index == 0) {
            zip.file(`index.html`, bl);
        } else {
            zip.file(`page${index}.html`, bl);
        }
    });
    let bl_css = new Blob([`
        html, body { margin: 0; overflow: hidden; }
        .mirrored { transform: scaleX(-1); }
        .deepfried { filter: saturate(4) contrast(3); }
        .button-next {
            position: absolute;
            bottom: 0;
            z-index: 999;
            background: #FF0043;
            border: 1vw groove #FF0043;
            font-family: 'Arial';
            font-weight: 900;
            font-size: 3vh;
            color: white;
            margin-bottom: 3vh;
            padding: 1vw;
            text-decoration: none;
        }
        .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            background: radial-gradient(circle at top left, #009bff 0%, #009bff 7%, transparent 7.5%),radial-gradient(circle at top, #ff8500 0%, #ff8500 7%, transparent 7.5%),radial-gradient(circle at top right, #009bff 0%, #009bff 7%, transparent 7.5%),radial-gradient(circle at center left, #ff0043 0%, #ff0043 7%, transparent 7.5%),radial-gradient(circle at center, #009bff 0%, #009bff 14%, transparent 15%),radial-gradient(circle at center right, #ff0043 0%, #ff0043 7%, transparent 7.5%),radial-gradient(circle at bottom left, #009bff 0%, #009bff 7%, transparent 7.5%),radial-gradient(circle at bottom, #ff8500 0%, #ff8500 7%, transparent 7.5%),radial-gradient(circle at bottom right, #009bff 0%, #009bff 7%, transparent 7.5%),#000;
            background-size: 10vw 10vw;
            background-repeat: repeat;
            background-position: 0 0;
        }
        .page {
            background: white;
            width: 70vw;
            height: 39vw;
            position: relative;
            overflow: hidden;
            border: 2vw groove #FF0043;
            box-sizing: content-box;
        }
    `], {type: "text/css"});
    zip.file(`style.css`, bl_css);

    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, "flippad-book.zip");
    });
}

// #endregion

// #region tools




// #region tool assets


// audio - general tools
const clip_skew = new Howl({
    src: ['./assets/skewer/skew.mp3']
});
const clip_shuffle = new Howl({
    src: ['./assets/shuffler/shuffle.mp3']
});
const clip_unlocker = new Howl({
    src: ['./assets/lock/unlocker.mp3']
});
const clip_cloner = new Howl({
    src: ['./assets/cloner/clone.mp3']
});

// destroyer
const clip_destroyer_hiss = new Howl({
    src: ['./assets/destroyer/clip_destroyer_hiss.mp3']
});
const clip_destroyer_boom = new Howl({
    src: ['./assets/destroyer/clip_destroyer_boom.mp3'],
    volume: .5
});
const clip_destroyer_null = new Howl({
    src: ['./assets/destroyer/clip_destroyer_null.mp3']
});

// gun
const clip_gun_unholster = new Howl({
    src: ['./assets/gun/gun_unholster.mp3']
});
const clip_gun_holster = new Howl({
    src: ['./assets/gun/gun_holster.mp3']
});
const clip_gun_fire = new Howl({
    src: ['./assets/gun/gun_fire.mp3']
});
const gun_icon_active = './assets/gun/gun_active.png';
const gun_icon_inactive = './assets/gun/gun_inactive.png';
const gun_cursor = './assets/gun/cursor_gun.png';

// pump
const clip_pump_unholster = new Howl({
    src: ['./assets/pump/pump_unholster.mp3']
});
const clip_pump_holster = new Howl({
    src: ['./assets/pump/pump_holster.mp3']
});
const clip_pump_fire = new Howl({
    src: ['./assets/pump/pump_fire.mp3']
});
const pump_icon_active = './assets/pump/pump_active.png';
const pump_icon_inactive = './assets/pump/pump_inactive.png';
const pump_cursor = './assets/pump/cursor_pump.png';

// needle
const clip_needle_unholster = new Howl({
    src: ['./assets/needle/needle_unholster.mp3']
});
const clip_needle_holster = new Howl({
    src: ['./assets/needle/needle_holster.mp3']
});
const clip_needle_fire = new Howl({
    src: ['./assets/needle/needle_fire.mp3']
});
const needle_icon_active = './assets/needle/needle_active.png';
const needle_icon_inactive = './assets/needle/needle_inactive.png';
const needle_cursor = './assets/needle/cursor_needle.png';

// lock
const clip_lock_unholster = new Howl({
    src: ['./assets/lock/lock_unholster.mp3']
});
const clip_lock_holster = new Howl({
    src: ['./assets/lock/lock_holster.mp3']
});
const clip_lock_fire = new Howl({
    src: ['./assets/lock/lock_fire.mp3']
});
const lock_icon_active = './assets/lock/lock_active.png';
const lock_icon_inactive = './assets/lock/lock_inactive.png';
const lock_cursor = './assets/lock/cursor_lock.png';

// checker
const clip_checker_unholster = new Howl({
    src: ['./assets/checker/checker_unholster.mp3']
});
const clip_checker_holster = new Howl({
    src: ['./assets/checker/checker_holster.mp3']
});
const clip_checker_fire = new Howl({
    src: ['./assets/checker/checker_fire.mp3']
});
const checker_icon_active = './assets/checker/checker_active.png';
const checker_icon_inactive = './assets/checker/checker_inactive.png';
const checker_cursor = './assets/checker/cursor_checker.png';

// mirrorer
const clip_mirror_unholster = new Howl({
    src: ['./assets/mirror/mirror_unholster.mp3']
});
const clip_mirror_holster = new Howl({
    src: ['./assets/mirror/mirror_holster.mp3']
});
const clip_mirror_fire = new Howl({
    src: ['./assets/mirror/mirror_fire.mp3']
});
const mirror_icon_active = './assets/mirror/mirror_active.png';
const mirror_icon_inactive = './assets/mirror/mirror_inactive.png';
const mirror_cursor = './assets/mirror/cursor_mirror.png';

// deepfrier
const clip_deepfry_unholster = new Howl({
    src: ['./assets/deepfry/deepfry_unholster.mp3']
});
const clip_deepfry_holster = new Howl({
    src: ['./assets/deepfry/deepfry_holster.mp3']
});
const clip_deepfry_fire = new Howl({
    src: ['./assets/deepfry/deepfry_fire.mp3']
});
const deepfry_icon_active = './assets/deepfry/deepfry_active.png';
const deepfry_icon_inactive = './assets/deepfry/deepfry_inactive.png';
const deepfry_cursor = './assets/deepfry/cursor_deepfry.png';

// #endregion

// #region gentool functions

const skewer = document.querySelector("button[target='skewer']");
skewer.addEventListener('click', (event) => {
    Skew();
});
function Skew() {
    GetActiveElements().forEach(element => {
        if (!element.classList.contains("locked")) {
            element.style.rotate = `${randomIntFromInterval(-15,15)}deg`;
        }
    });
    clip_skew.play();
}

const shuffler = document.querySelector("button[target='shuffler']");
shuffler.addEventListener('click', (event) => {
    Shuffle();
});
function Shuffle() {
    let elements = GetActiveElements();
    let count = elements.length;

    if (count == 0) { return; }

    console.log(`elements: ${elements} ----------- count: ${count}`)

    elements.forEach(element => {
        if (!element.classList.contains("locked")) {
            element.style.zIndex = `${randomIntFromInterval(0,count)}`;
        }
    });
    clip_shuffle.play();
}

const unlocker = document.querySelector("button[target='unlock']");
unlocker.addEventListener('click', (event) => {
    Unlock();
});
function Unlock() {
    GetActiveElements().forEach(element => {
        element.classList.remove("locked");
    });
    clip_unlocker.play();
}

const cloner = document.querySelector("button[target='clone']");
cloner.addEventListener('click', (event) => {
    Clone();
});
function Clone() {
    let newSlideContents = activeSlide.innerHTML;
    
    AddSlide();

    activeSlide.innerHTML = newSlideContents;

    GetActiveElements().forEach(element => {
        makeDraggable(element);
    });

    clip_cloner.play();
}

let destroy_countdown = 3;
const destroyer = document.querySelector("button[target='destroy']");
const explosion = document.querySelector(".explosion");
destroyer.addEventListener('click', (event) => {
    Destroy();
});
function Destroy() {
    let targetSlide = document.querySelector(`.slide${activeSlideIndex}`);
    let targetThumb = document.querySelector(`.thumb${activeSlideIndex}`);

    console.log(targetSlide);
    if (targetSlide == null) {
        clip_destroyer_null.play();
        return;
    }

    if (destroy_countdown == 1){

        explosion.style.display = "block";
        clip_destroyer_boom.play();
        
        setTimeout(function(){
            explosion.style.display = "none";
        }, 1000);

        targetSlide.remove();
        targetThumb.remove();

        destroy_countdown = 3;

        if (document.querySelector(`.slide${activeSlideIndex - 1}`) != null)
            FocusSlide(activeSlideIndex - 1);
    } else {
        clip_destroyer_hiss.play();
        destroy_countdown--;
    }
    destroyer.querySelector("img").src = `./assets/destroyer/destroyer_${destroy_countdown}.png`;
}

// #endregion

// #region inputtool defining

const inputTools = {
    gun: 1,
    pump: 2,
    needle: 3,
    lock: 4,
    checker: 5,
    mirror: 6,
    deepfry: 7,
};
let activeTool = null;

const gun = document.querySelector("button[target='gun']");
const gunIcon = gun.querySelector("img");
gun.addEventListener('click', () => {
    HandleInputTool(inputTools.gun);
});
const pump = document.querySelector("button[target='pump']");
const pumpIcon = pump.querySelector("img");
pump.addEventListener('click', () => {
    HandleInputTool(inputTools.pump);
});
const needle = document.querySelector("button[target='needle']");
const needleIcon = needle.querySelector("img");
needle.addEventListener('click', () => {
    HandleInputTool(inputTools.needle);
});
const lock = document.querySelector("button[target='lock']");
const lockIcon = lock.querySelector("img");
lock.addEventListener('click', () => {
    HandleInputTool(inputTools.lock);
});
const checker = document.querySelector("button[target='checker']");
const checkerIcon = checker.querySelector("img");
checker.addEventListener('click', () => {
    HandleInputTool(inputTools.checker);
});
const mirror = document.querySelector("button[target='mirror']");
const mirrorIcon = mirror.querySelector("img");
mirror.addEventListener('click', () => {
    HandleInputTool(inputTools.mirror);
});
const deepfry = document.querySelector("button[target='deepfry']");
const deepfryIcon = deepfry.querySelector("img");
deepfry.addEventListener('click', () => {
    HandleInputTool(inputTools.deepfry);
});

// #endregion

// #region inputtool functions

// inputtools first disable the draggable event listener on the focused slide's elements
// this makes the elements default to the doToolEffect() event listener, which checks which tool is currently active
// there are arguably too many switch cases here, which makes adding inputtools a pain

// gets active slide elements and disables their draggable eventlistener
// checks if an inputtool is already active, and cleans up accordingly
// sets inputtool assets based on the given inputtool and sets it as the active inputtool

function HandleInputTool(inputTool) {
    let elements = GetActiveElements();

    if (activeTool == inputTool) {
        cleanupActiveTool(elements);
        return;
    } else if (activeTool != null) {
        cleanupActiveTool(elements);
    }

    switch (inputTool) {
    case inputTools.gun:
        SetToolAssets(gunIcon, gun_icon_active, clip_gun_unholster, `url(${gun_cursor}) 0 0, auto`);
        break;
    case inputTools.pump:
        SetToolAssets(pumpIcon, pump_icon_active, clip_pump_unholster, `url(${pump_cursor}) 0 0, auto`);
        break;
    case inputTools.needle:
        SetToolAssets(needleIcon, needle_icon_active, clip_needle_unholster, `url(${needle_cursor}) 0 0, auto`);
        break;
    case inputTools.lock:
        SetToolAssets(lockIcon, lock_icon_active, clip_lock_unholster, `url(${lock_cursor}) 0 0, auto`);
        break;
    case inputTools.checker:
        SetToolAssets(checkerIcon, checker_icon_active, clip_checker_unholster, `url(${checker_cursor}) 0 0, auto`);
        break;
    case inputTools.mirror:
        SetToolAssets(mirrorIcon, mirror_icon_active, clip_mirror_unholster, `url(${mirror_cursor}) 0 0, auto`);
        break;
    case inputTools.deepfry:
        SetToolAssets(deepfryIcon, deepfry_icon_active, clip_deepfry_unholster, `url(${deepfry_cursor}) 0 0, auto`);
        break;
    default:
        console.log(`Can't find asset-setting function for a tool called ${inputTool}.`);
    }

    activeTool = inputTool;

    elements.forEach(element => {
        if (element.classList.contains("ui-draggable")) { $(element).draggable( "disable" ); }
    });
}

// does a function based on which inputtool is active
function DoToolEffect(element) {
    switch (activeTool) {
    case inputTools.gun:
        ShootElement(element);
        break;
    case inputTools.pump:
        PumpElement(element);
        break;
    case inputTools.needle:
        PrickElement(element);
        break;
    case inputTools.lock:
        LockElement(element);
        break;
    case inputTools.checker:
        checkerElement(element);
        break;
    case inputTools.mirror:
        mirrorElement(element);
        break;
        case inputTools.deepfry:
            deepfryElement(element);
            break;
    default:
        console.log(`Can't find worker function for a tool called ${activeTool}.`);
    }
}

// sets the active inputtool back to their default modus
// sets active slide's elements back to draggable
// sets active inputtool to null
function cleanupActiveTool(elements) {
    switch (activeTool) {
    case inputTools.gun:
        SetToolAssets(gunIcon, gun_icon_inactive, clip_gun_holster, "default");
        break;
    case inputTools.pump:
        SetToolAssets(pumpIcon, pump_icon_inactive, clip_pump_holster, "default");
        break;
    case inputTools.needle:
        SetToolAssets(needleIcon, needle_icon_inactive, clip_needle_holster, "default");
        break;
    case inputTools.lock:
        SetToolAssets(lockIcon, lock_icon_inactive, clip_lock_holster, "default");
        break;
    case inputTools.checker:
        SetToolAssets(checkerIcon, checker_icon_inactive, clip_checker_holster, "default");
        break;
    case inputTools.mirror:
        SetToolAssets(mirrorIcon, mirror_icon_inactive, clip_mirror_holster, "default");
        break;
    case inputTools.deepfry:
        SetToolAssets(deepfryIcon, deepfry_icon_inactive, clip_deepfry_holster, "default");
        break;
    default:
        console.log(`Can't find worker function for a tool called ${activeTool}.`);
    }

    elements.forEach(element => {
        if (element.classList.contains("ui-draggable")) { $(element).draggable( "enable" ); }
    });

    activeTool = null;
}

// sets the visible/audible assets of a tool when it's (de)selected
function SetToolAssets(icon, icon_src, sound, cursor_src) {
    icon.src = icon_src;
    sound.play();
    activeSlide.style.cursor = cursor_src;
}

// the functions of the specific inputtools
function ShootElement(element) {
    element.remove();
    
    clip_gun_fire.play();
}
function PumpElement(element) {
    let currentHeight = parseInt(window.getComputedStyle(element).getPropertyValue("height"));
    let currentWidth = parseInt(window.getComputedStyle(element).getPropertyValue("width"));
    let q = currentWidth / currentHeight;
    let step = currentHeight / 10;

    element.style.maxHeight = "none";
    element.style.height = (currentHeight + step) + "px";
    element.style.width = (currentWidth + (step * q)) + "px";

    clip_pump_fire.play();
}
function PrickElement(element) {
    let currentHeight = parseInt(window.getComputedStyle(element).getPropertyValue("height"));
    let currentWidth = parseInt(window.getComputedStyle(element).getPropertyValue("width"));
    let q = currentWidth / currentHeight;
    let step = currentHeight / 10;

    element.style.height = (currentHeight - step) + "px";
    element.style.width = (currentWidth - (step * q)) + "px";

    clip_needle_fire.play();
}
function LockElement(element) {
    if (element.classList.contains("locked")) {
        element.classList.remove("locked");
    } else {
        element.classList.add("locked");
    }

    clip_lock_fire.play();
}
function checkerElement(element) {
    if (element.classList.contains("checkered") || element.nodeName.toLowerCase() != "img")
        return;
    else
        element.classList.add("checkered");

    let slideWidth = parseInt(window.getComputedStyle(document.querySelector('#currentSlide')).getPropertyValue("width"));
    let slideHeight = parseInt(window.getComputedStyle(document.querySelector('#currentSlide')).getPropertyValue("height"));
    let elementWidth = parseInt(element.style.width);
    let elementHeight = parseInt(element.style.height);

    element.style.backgroundImage = `url(${element.getAttribute("src")})`;
    element.style.backgroundSize = `${(elementWidth / slideWidth) * 100}% ${(elementHeight / slideHeight) * 100}%`;
    element.setAttribute("src", "");
    element.style.width = "100%";
    element.style.height = "100%";
    element.style.top = "0";
    element.style.left = "0";

    clip_checker_fire.play();
}
function mirrorElement(element) {
    if (element.classList.contains("mirrored"))
        element.classList.remove("mirrored");
    else 
        element.classList.add("mirrored");
}
function deepfryElement(element) {
    if (element.classList.contains("deepfried"))
        element.classList.remove("deepfried");
    else 
        element.classList.add("deepfried");
}

// #endregion

// #endregion