let slideAmount = 1;

const currentSlideElement = document.querySelector("#currentSlide");
const editableSlideTemplate = document.querySelector(".editslide");

const thumbnailTemplate = document.querySelector(".slide-thumbnail");

const slidesContainer = document.querySelector("#slidesContainer");

let activeSlide;
let activeThumb;
let slides = [];

function init() {
    let infoLines = document.querySelectorAll(".infoline");
    infoLines.forEach(line => {
        makeDraggable(line);
    });
}; init();

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const addSlideBtn = document.querySelector("button[target='addPage']");
addSlideBtn.addEventListener('click', (event) => {
        AddSlide();
});

const focusSlideBtn = document.querySelector("button[target='focusPage']");
focusSlideBtn.addEventListener('click', (event) => {
        FocusSlide(focusSlideBtn.value.toString());
});

function FocusSlide(int) {
    document.querySelectorAll(".slide-thumbnail").forEach(element => {
        element.classList.remove("thumb-focused");
    });
    document.querySelectorAll(".editslide").forEach(element => {
        element.classList.remove("slide-focused");
    });
    document.querySelectorAll("video, audio").forEach(element => {
        element.pause();
        element.currentTime = 0;
    });

    activeSlide = document.querySelector(`.slide${int}`);
    activeThumb = document.querySelector(`.thumb${int}`);

    activeThumb.classList.add("thumb-focused");
    activeSlide.classList.add("slide-focused");

    activeSlide.querySelectorAll("video, audio").forEach(element => {
        element.play();
    });
}
FocusSlide(1);

function AddSlide() {
    slideAmount++

    let newThumb = thumbnailTemplate.cloneNode(true);
    newThumb.classList.remove("thumb1");
    newThumb.classList.add(`thumb${slideAmount.toString()}`);
    
    let newFocus = newThumb.querySelector("button[target='focusPage']");
    newFocus.value = slideAmount.toString();
    newFocus.innerHTML = `${slideAmount}`;
    newFocus.addEventListener('click', (event) => {
        FocusSlide(newFocus.value);
    });
    
    slidesContainer.appendChild(newThumb);

    let newSlide = editableSlideTemplate.cloneNode(true);
    newSlide.classList.remove("slide1");
    newSlide.classList.add(`slide${slideAmount.toString()}`);
    newSlide.innerHTML = ``;
    
    currentSlideElement.appendChild(newSlide);

    FocusSlide(slideAmount)
}

// #region drag-and-dropping files

let dropbox;

dropbox = document.getElementById("editor");
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

function makeDraggable(file) {
    $( file ).draggable({
        stack: ".ui-draggable",
        distance: 0,
    });

    file.addEventListener('click', () => {
        DoToolEffect(file);
    });
}

function handleFiles(files) {
    let activeSlide = document.querySelector(".slide-focused");

    for (const file of files) {

        console.log(file)

        if (/image\/.*/.test(file.type)) {
            const img = document.createElement("img");
            img.classList.add("obj");
            img.file = file;
            activeSlide.appendChild(img);

            makeDraggable(img);

            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        else if (/video\/.*/.test(file.type)) {
            const vid = document.createElement("video");
            vid.classList.add("obj");
            vid.loop = true;
            vid.autoplay = true;
            vid.file = file;
            activeSlide.appendChild(vid);

            makeDraggable(vid);

            const reader = new FileReader();
            reader.onload = (e) => {
                vid.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        else if (/audio\/.*/.test(file.type)) {
            const aud = document.createElement("audio");
            aud.classList.add("obj");
            aud.loop = true;
            aud.autoplay = true;
            aud.file = file;
            activeSlide.appendChild(aud);

            makeDraggable(aud);

            const reader = new FileReader();
            reader.onload = (e) => {
                aud.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        else if (/.*html/.test(file.type)) {
            const divContainer = document.createElement("div");
            divContainer.classList.add("obj");
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

function urlToPromise(url) {
    return new Promise(function(resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

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
            element.style.maxHeight = "100%";
        });
        slide.querySelectorAll("div.obj").forEach(element => {
            element.style.width = "100%";
            element.style.height = "100%";
        });
        slide.querySelectorAll("iframe.obj").forEach(element => {
            element.style.width = "100%";
            element.style.height = "100%";
            element.style.border = "none";
            element.style.boxSizing = "border-box";
            element.style.pointerEvents = "none";
        });

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";
        container.style.width = "100vw";
        container.style.height = "100vh";
        container.style.overflow = "hidden";
        container.style.background = "radial-gradient(circle at top left, #009bff 0%, #009bff 7%, transparent 7.5%),radial-gradient(circle at top, #ff8500 0%, #ff8500 7%, transparent 7.5%),radial-gradient(circle at top right, #009bff 0%, #009bff 7%, transparent 7.5%),radial-gradient(circle at center left, #ff0043 0%, #ff0043 7%, transparent 7.5%),radial-gradient(circle at center, #009bff 0%, #009bff 14%, transparent 15%),radial-gradient(circle at center right, #ff0043 0%, #ff0043 7%, transparent 7.5%),radial-gradient(circle at bottom left, #009bff 0%, #009bff 7%, transparent 7.5%),radial-gradient(circle at bottom, #ff8500 0%, #ff8500 7%, transparent 7.5%),radial-gradient(circle at bottom right, #009bff 0%, #009bff 7%, transparent 7.5%),#000";
        container.style.backgroundSize = "10vw 10vw";
        container.style.backgroundRepeat = "repeat";
        container.style.backgroundPosition = "0 0";

        const page = document.createElement("div");
        page.style.background = "white";
        page.style.width = "70vw";
        page.style.height = "39vw";
        page.style.position = "relative";
        page.style.overflow = "hidden";
        page.style.border = "2vw groove #FF0043";
        page.style.boxSizing = "content-box";

        let slideClone = slide.cloneNode(true);

        let slideWidth = parseInt(window.getComputedStyle(document.querySelector('#currentSlide')).getPropertyValue("width"));
        let slideHeight = parseInt(window.getComputedStyle(document.querySelector('#currentSlide')).getPropertyValue("height"));
        let elementLeft
        let elementTop

        let elementWidth
        let elementHeight

        slideClone.querySelectorAll(".obj").forEach(element => {
            element.classList.remove("ui-draggable", "ui-draggable-handle");

            elementLeft = parseInt(element.style.left);
            elementTop = parseInt(element.style.top);

            element.style.left = `${(elementLeft / slideWidth) * 100}%`;
            element.style.top = `${(elementTop / slideHeight) * 100}%`;
        });
        slideClone.querySelectorAll("img.obj, video.obj").forEach(element => {
            elementWidth = parseInt(element.style.width);
            elementHeight = parseInt(element.style.height);

            element.style.width = `${(elementWidth / slideWidth) * 100}%`;
            element.style.height = `${(elementHeight / slideHeight) * 100}%`;
        });

        container.appendChild(page);
        page.appendChild(slideClone);

        if ((index + 1) < slides.length) {
            let nextBtn = document.createElement("a");
            nextBtn.setAttribute("href", `page${index+1}.html`);
            nextBtn.innerHTML = "NEXT PAGE";
            
            nextBtn.style.position = "absolute";
            nextBtn.style.bottom = "0";
            nextBtn.style.zIndex = "999";
            nextBtn.style.background = "#FF0043";
            nextBtn.style.border = "1vw groove #FF0043";
            nextBtn.style.fontFamily = "Arial";
            nextBtn.style.fontWeight = "900";
            nextBtn.style.fontSize = "3vh";
            nextBtn.style.color = "white";
            nextBtn.style.marginBottom = "3vh";
            nextBtn.style.padding = "1vw";
            nextBtn.style.textDecoration = "none";
            
            container.appendChild(nextBtn);
        } else {}

        let htmlContent = [`<!DOCTYPE html><head><style>html,body{margin: 0; overflow: hidden;}</style></head><body>` + container.outerHTML + `</body>`];
        let bl = new Blob(htmlContent, {type: "text/html"});

        if (index == 0) {
            zip.file(`index.html`, bl);
        } else {
            zip.file(`page${index}.html`, bl);
        }
    });

    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, "flippad-book.zip");
    });
}

// #endregion

// #region toolbar tools

function GetActiveElements() {
    return activeSlide.querySelectorAll("video, div, img");
}

const clip_skew = new Howl({
    src: ['./assets/skew.mp3']
});
const clip_shuffle = new Howl({
    src: ['./assets/shuffle.mp3']
});
const clip_gun_unholster = new Howl({
    src: ['./assets/gun_unholster.mp3']
});
const clip_gun_holster = new Howl({
    src: ['./assets/gun_holster.mp3']
});
const clip_gun_fire = new Howl({
    src: ['./assets/gun_fire.mp3']
});

const skewer = document.querySelector("button[target='skewer']");
skewer.addEventListener('click', (event) => {
    Skew();
});
function Skew() {
    GetActiveElements().forEach(element => {
        element.style.rotate = `${randomIntFromInterval(-15,15)}deg`;
        clip_skew.load();
        clip_skew.play();
    });
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
        element.style.zIndex = `${randomIntFromInterval(0,count)}`;
    });

    clip_shuffle.load();
    clip_shuffle.play();
}

const inputTools = {
    gun: 1,
    pump: 2,
    needle: 3
};
let activeTool = null;

const gun = document.querySelector("button[target='gun']");
const gunIcon = gun.querySelector("img");
gun.addEventListener('click', (event) => {
    HandleInputTool(inputTools.gun);
});

const pump = document.querySelector("button[target='pump']");
const pumpIcon = pump.querySelector("img");
pump.addEventListener('click', (event) => {
    HandleInputTool(inputTools.pump);
});
const needle = document.querySelector("button[target='needle']");
const needleIcon = needle.querySelector("img");
needle.addEventListener('click', (event) => {
    HandleInputTool(inputTools.needle);
});

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
        SetToolAssets(gunIcon, "./assets/gun_active.png", clip_gun_unholster, "url('./assets/cursor_gun.png') 0 0, auto");
        break;
    case inputTools.pump:
        SetToolAssets(pumpIcon, "./assets/gun_active.png", clip_gun_unholster, "url('./assets/cursor_gun.png') 0 0, auto");
        break;
    case inputTools.needle:
        SetToolAssets(needleIcon, "./assets/gun_active.png", clip_gun_unholster, "url('./assets/cursor_gun.png') 0 0, auto");
        break;
    default:
        console.log(`Can't find asset-setting function for a tool called ${inputTool}.`);
    }

    activeTool = inputTool;

    elements.forEach(element => {
        if (element.classList.contains("ui-draggable")) { $(element).draggable( "disable" ); }
    });
}

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
    default:
        console.log(`Can't find worker function for a tool called ${activeTool}.`);
    }
}

function cleanupActiveTool(elements) {
    switch (activeTool) {
    case inputTools.gun:
        SetToolAssets(gunIcon, "./assets/gun_inactive.png", clip_gun_holster, "default");
        break;
    case inputTools.pump:
        SetToolAssets(pumpIcon, "./assets/gun_inactive.png", clip_gun_holster, "default");
        break;
    case inputTools.needle:
        SetToolAssets(needleIcon, "./assets/gun_inactive.png", clip_gun_holster, "default");
        break;
    default:
        console.log(`Can't find worker function for a tool called ${activeTool}.`);
    }

    elements.forEach(element => {
        if (element.classList.contains("ui-draggable")) { $(element).draggable( "enable" ); }
    });

    activeTool = null;
}

function SetToolAssets(icon, icon_src, sound, cursor_src) {
    icon.src = icon_src;
    sound.play();
    activeSlide.style.cursor = cursor_src;
}

function ShootElement(element) {
    clip_gun_fire.play();
    element.remove();
}
function PumpElement(element) {
    let currentHeight = parseInt(window.getComputedStyle(element).getPropertyValue("height"));
    element.style.height = (currentHeight + 10) + "px";
}
function PrickElement(element) {
    let currentHeight = parseInt(window.getComputedStyle(element).getPropertyValue("height"));
    element.style.height = (currentHeight - 10) + "px";
}

// #endregion