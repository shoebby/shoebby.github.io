let slideAmount = 1;

const currentSlideElement = document.querySelector("#currentSlide");
const editableSlideTemplate = document.querySelector(".editslide");

const thumbnailTemplate = document.querySelector(".slide-thumbnail");

const slidesContainer = document.querySelector("#slidesContainer");

let activeSlide;
let activeThumb;
let slides = [];

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
    newSlide.innerHTML = `${slideAmount}`;
    
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

function handleFiles(files) {
    let activeSlide = document.querySelector(".slide-focused");

    for (const file of files) {

        console.log(file)

        if (/image\/.*/.test(file.type)) {
            const img = document.createElement("img");
            img.classList.add("obj");
            img.file = file;
            activeSlide.appendChild(img);

            $( img ).draggable({
                stack: ".ui-draggable", /* Stack the currently dragged item on top of all other items. */
                distance: 0, /* I believe this has to do with mouse distance? */
            });

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

            $( vid ).draggable({
                stack: ".ui-draggable", /* Stack the currently dragged item on top of all other items. */
                distance: 0, /* I believe this has to do with mouse distance? */
            });

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

            $( aud ).draggable({
                stack: ".ui-draggable", /* Stack the currently dragged item on top of all other items. */
                distance: 0, /* I believe this has to do with mouse distance? */
            });

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

            // $( div ).draggable({
            //     stack: ".ui-draggable", /* Stack the currently dragged item on top of all other items. */
            //     distance: 0, /* I believe this has to do with mouse distance? */
            // });

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

    slides.forEach((element, index) => {
        element.querySelectorAll(".obj").forEach(element => {
            element.style.position = "absolute";
            element.style.maxHeight = "100%";
        });
        element.querySelectorAll("div.obj").forEach(element => {
            element.style.top = "0";
            element.style.left = "0";
            element.style.width = "100%";
            element.style.height = "100%";
        });
        element.querySelectorAll("iframe.obj").forEach(element => {
            element.style.width = "100%";
            element.style.height = "100%";
            element.style.border = "2px solid black";
            element.style.boxSizing = "border-box";
            element.style.pointerEvents = "none";
        });

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";
        container.style.width = "100vw";
        container.style.height = "100vh";
        container.style.overflow = "hidden";
        container.style.background = "black";

        const page = document.createElement("div");
        page.style.background = "white";
        page.style.width = "70vw";
        page.style.height = "39vw";
        page.style.position = "relative";
        page.style.overflow = "hidden";

        let elementClone = element.cloneNode(true);

        container.appendChild(page);
        page.appendChild(elementClone);

        let htmlContent = [`<!DOCTYPE html><head><style>html,body{margin: 0; overflow: hidden;}</style></head><body>` + container.outerHTML + `</body>`];
        let bl = new Blob(htmlContent, {type: "text/html"});

        if (index == 0) {
            zip.file(`index.html`, bl);
        } else {
            zip.file(`page${index + 1}.html`, bl);
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

const clip_skew = new Audio("assets/skew.mp3");
const clip_shuffle = new Audio("assets/shuffle.mp3");
const clip_gun_unholster = new Audio("assets/gun_unholster.mp3");
const clip_gun_holster = new Audio("assets/gun_holster.mp3");
const clip_gun_fire = new Audio("assets/gun_fire.mp3");

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

const gun = document.querySelector("button[target='gun']");
const gunIcon = gun.querySelector("img");
let gunDrawn = false;
gun.addEventListener('click', (event) => {
    Gun();
});
function Gun() {
    gunDrawn = !gunDrawn;
    let elements = GetActiveElements();

    if (!gunDrawn) {
        gunIcon.src = "./assets/gun_inactive.png";
        clip_gun_holster.load();
        clip_gun_holster.play();
        activeSlide.style.cursor = "default";
        
        elements.forEach(element => {
            if (element.classList.contains("ui-draggable")) { $(element).draggable( "enable" ); }

            element.removeEventListener('click', (event) => {
                ShootElement(element);
            });
        });
    }
    else {
        gunIcon.src = "./assets/gun_active.png";
        clip_gun_unholster.load();
        clip_gun_unholster.play();
        activeSlide.style.cursor = "crosshair";

        elements.forEach(element => {
            if (element.classList.contains("ui-draggable")) { $(element).draggable( "disable" ); }

            element.addEventListener('click', (event) => {
                ShootElement(element);
            });
        });
    }
}
function ShootElement(element) {
    clip_gun_fire.load();
    clip_gun_fire.play();
    element.remove();
}

// #endregion