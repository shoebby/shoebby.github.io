const windowTemplate = document.querySelector("#windowNaked");
const guyTemplate = document.querySelector("#guy");
const guyLines = [
    'sounds/webtoys/jc_augmentedvision.mp3',
    'sounds/webtoys/jc_getmeinside.mp3',
    'sounds/webtoys/jc_gladnothurt.mp3',
    'sounds/webtoys/jc_noproblem.mp3',
    'sounds/webtoys/jc_notarmed.mp3',
    'sounds/webtoys/jc_performduties.mp3',
    'sounds/webtoys/jc_risk.mp3',
    'sounds/webtoys/jc_wontletdown.mp3',
];
const mainStyle = document.styleSheets[0];

$( function() {
    $( ".container" ).draggable({
        handle: ".title-bar",
        stack: ".ui-draggable", /* Stack the currently dragged item on top of all other items. */
		distance: 0, /* I believe this has to do with mouse distance? */
		containment: "document", /* Makes it so pieces don't get lost off the page while dragging them */
    });
} );

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function changeStylesheetRule(stylesheet, selector, property, value) {
    // Make the strings lowercase
    selector = selector.toLowerCase();
    property = property.toLowerCase();
    value = value.toLowerCase();
    
    // Change it if it exists
    for(var i = 0; i < stylesheet.cssRules.length; i++) {
        var rule = stylesheet.cssRules[i];
        if(rule.selectorText === selector) {
            rule.style[property] = value;
            return;
        }
    }
  
    // Add it if it does not
    stylesheet.insertRule(selector + " { " + property + ": " + value + "; }", 0);
}



//settings
const settingsWindow = document.querySelector("#settings");
document.querySelector("a[target='openSettings']").addEventListener('click', (event) => {openSettings()});
settingsWindow.querySelector("button[target='closeSettings']").addEventListener('click', (event) => {closeSettings()});

function openSettings(){
    settingsWindow.style.setProperty("display", "inline-block");
}
function closeSettings(){
    settingsWindow.style.setProperty("display", "none");
}

settingsWindow.querySelector("#toggle_sl").addEventListener('change', function() {
    if (this.checked) {
        scanlines.style.setProperty("display","flex");
    } else {
        scanlines.style.setProperty("display","none");
    }
});
settingsWindow.querySelector("#toggle_hum").addEventListener('change', function() {
if (this.checked) {
        powerHum.play();
    } else {
        powerHum.pause();
    }
});
settingsWindow.querySelector("#set_bg").addEventListener('input', function() {
    document.body.style.background = this.value;
});
settingsWindow.querySelector("#set_frame").addEventListener('input', function() {
    changeStylesheetRule(mainStyle, ".title-bar", "background", this.value);
    changeStylesheetRule(mainStyle, ".window-body", "border-left-color", this.value);
    changeStylesheetRule(mainStyle, ".window-body", "border-right-color", this.value);
    changeStylesheetRule(mainStyle, ".window-body", "border-bottom-color", this.value);
    changeStylesheetRule(mainStyle, "#settings", "border-left-color", this.value);
    changeStylesheetRule(mainStyle, "#settings", "border-right-color", this.value);
    changeStylesheetRule(mainStyle, "#settings", "border-bottom-color", this.value);
    changeStylesheetRule(mainStyle, "#taskbar", "background", this.value);
});


//guymode
document.querySelector("a[target='guyMode']").addEventListener('click', (event) => {guyMode()});

function guyMode() {
    for (let i = 0; i < 10; i++){
        const newGuy = guyTemplate.cloneNode(true);
        newGuy.removeAttribute('id');

        newGuy.style.setProperty("display", "inline-block");
        newGuy.style.setProperty("top", getRandomInt(100) + "vh" );
        newGuy.style.setProperty("left", getRandomInt(100) + "vw" );

        $(newGuy).draggable({
            distance: 0,
            containment: "document",
        });

        document.body.appendChild(newGuy);
    }

    playAudio(guyLines[getRandomInt(guyLines.length)]);
}

//spinny
document.querySelector("a[target='spinny']").addEventListener('click', (event) => {spinny()});

function spinny() {
    let allDivs = document.querySelectorAll("div");

    for (let i = 0; i < allDivs.length; i++){
        allDivs[i].style.setProperty("rotate", getRandomInt(360) + "deg");
        allDivs[i].style.setProperty("transition", ".2s");
    }

    playAudio("./sounds/webtoys/poppyHonk.mp3");
}

//bin

document.querySelector("a[target='bin']").addEventListener('click', (event) => {bin()});

function bin() {
    openWindow("Recycling Bin", "./bin/", "./images/placeholder.jpg");
}


// poppy
const poppy = document.querySelector("#poppy");
const poppyBox = poppy.querySelector("div");
const poppyDialog = poppy.querySelector("#poppyTxt");

document.querySelector("a[target='openPoppy']").addEventListener('click', (event) => {startPoppy()});

function startPoppy() {
    poppy.style.setProperty("bottom", "10vh");
    poppy.style.setProperty("right", "5vw");

    poppyBox.style.setProperty("top", "5%");
    poppyBox.style.setProperty("left", "-150%");

    poppyDialog.innerHTML = "Hi! I'm Poppy, your personal <red>V</red>isunov<red>OS</red> assistant! Let me show you around."

    poppy.style.setProperty('display', 'block');

    playAudio("./sounds/webtoys/poppyHonk.mp3");
}
function closePoppy() {
    poppyStep = 0;
    poppy.style.setProperty('display', 'none');
    playAudio("./sounds/webtoys/poppyHonk.mp3");
}
function movePoppy(poppy_y, poppy_x, text_y, text_x) {
    poppy.style.setProperty("bottom", poppy_y + "vh");
    poppy.style.setProperty("right", poppy_x + "vw");

    poppyBox.style.setProperty("top", text_y + "%");
    poppyBox.style.setProperty("left", text_x + "%");
}

let poppyStep = 0;
poppy.querySelector("input[target='progressPoppy']").addEventListener('click', (event) => {progressPoppy()});

function progressPoppy() {
    poppyStep += 1;

    switch (poppyStep) {
        case 1:
            movePoppy(65, 70, 10, 100);

            poppyDialog.innerHTML = "Over here you can see your installed <b>Toywares</b>, Recurse^3 is my favourite!";
            break;
        case 2:
            poppyDialog.innerHTML = "<b>Toywares</b> is what we call the programs in <red>VOS</red> that enable you to create, lets take a look at the ones included in this demo!";
            break;
        case 3:
            document.querySelector(".recurse").click();
            
            movePoppy(5, 25, 30, -140);

            poppyDialog.innerHTML = "<b>Recurse^3</b> lets you trees out of divs, using CSS styling for positioning and making the branches look pretty!<br>My favourite recipe is width === height, a high border radius, and a radial gradient to make them look like balls!";
            break;
        case 4:
            document.querySelector(".window").remove();
            document.querySelector(".divbrush").click();

            movePoppy(5, 25, 50, -140);
            
            poppyDialog.innerHTML = "<b>DivBRUSH</b> lets you draw using self-styled divs! You can apply complex background patterns, borders, and animations to your brush to create one-of-a-kind artworks!";
            break;
        case 5:
            document.querySelector(".window").remove();
            document.querySelector(".popupcollage").click();

            movePoppy(5, 10, 50, -140);

            poppyDialog.innerHTML = "<b>Pop-Up Collager</b> lets you make collages of injected HTML and webpages using pop-ups! Set the width, height, positions, and contents of each pop-up exactly to your liking!";

            break;
        case 6:
            document.querySelector(".window").remove();

            movePoppy(35, 10, 60, -150);

            poppyDialog.innerHTML = "The <b>Taskbar</b> contains a variety of things, like a clock, a media playe-...";
            break;
        case 7:
            poppyDialog.innerHTML = "Oh, wait, it's not implemented yet. Whoops, awkwardddd ehe moving on...";
            break;
        case 8:
            movePoppy(70, 85, 10, 90);

            poppyDialog.innerHTML = "Ignore the recycling bin! Whatever you do, do <b>NOT</b> open it!";
            break;
        case 9:
            movePoppy(50, 50, 100, 0);

            poppyDialog.innerHTML = "I wish I could tell you more, but this is just a demo version of <red>V</red>isunov<red>OS</red>, so look around and get excited for when 1.0 comes your way!";
            break;
        case 10:
            poppyDialog.innerHTML = "<red>V</red>isunov<red>OS</red>, storycrafting the HTML way!";
            break;
        default:
            closePoppy();
    }
}



// audio functionality
document.querySelectorAll("button, summary, input, a").forEach(element => {
    element.addEventListener('click', (event) => {
        playAudio('./sounds/webtoys/click.mp3')
    })
});

function playAudio(path) {
    console.log("playing " + path)
    const audio = new Audio(path);
    audio.play();
}


// const playButton = document.querySelector("button[target='toggleMusic']");
// let playState = playButton.getAttribute("state");
// let song = new Audio('sounds/strawberriesandlancables.mp3');
// song.volume = 0.2;
// const visualizerIframe = document.querySelector("#cat_media iframe");

// playButton.addEventListener('click', function() {
//     if (playState === "paused") {
//         playButton.innerHTML = "⏸";
//         playState = "playing";
//         visualizerIframe.setAttribute("src", "./visualizer.html");
//         song.play();
//     } else if (playState === "playing") {
//         playButton.innerHTML = "▶";
//         playState = "paused";
//         visualizerIframe.setAttribute("src", "");
//         song.pause();
//     }
// });



// maximizing and closing windows
document.querySelectorAll("button[target='maximize']").forEach(element => {
    element.addEventListener('click', (event) => {
        ToggleWindowSize(element);
    })
});
function ToggleWindowSize(button) {
    const target = button.parentNode.parentNode.parentNode;

    if (button.getAttribute("aria-label") == 'Maximize') {
        target.setAttribute('style', 'width: 100vw; height: 100vh; position: fixed; top: 0; left: 0;');
        button.setAttribute('aria-label','Restore');
    }
    else if (button.getAttribute("aria-label") == 'Restore') {
        const daddy = target.parentNode.id;
        if (daddy == 'cat_fractal' || daddy == 'cat_popup' || daddy == 'cat_art'){
            target.setAttribute('style', 'width: 36vw;');
        } else if (daddy == 'cat_media') {
            target.setAttribute('style', 'width: 25vw;');
        } else if (daddy == 'cat_recurse') {
            target.setAttribute('style', 'width: 90vw;');
        }
        button.setAttribute('aria-label','Maximize');
    }
}
document.querySelectorAll("button[target='close']").forEach(element => {
    element.addEventListener('click', (event) => {
        element.parentNode.parentNode.parentNode.parentNode.open = false;
    })
});

// creating and closing instantiated windows
document.querySelectorAll("input[target='openWindow'], a[target='openWindow']").forEach(element => {
    element.addEventListener('click', (event) => {
        const page_title = element.getAttribute("value");
        const page_url = element.getAttribute("link");
        const page_icon = element.getAttribute("icon");
        openWindow(page_title, page_url, page_icon);
    })
});
document.querySelectorAll("button[target='closeInstWindow']").forEach(element => {
    element.addEventListener('click', (event) => {
        element.parentNode.parentNode.parentNode.remove();
    })
});
function openWindow(title, url, icon) {
    const newWindow = windowTemplate.cloneNode(true);
    newWindow.setAttribute('id', title);
    document.body.appendChild(newWindow);
    newWindow.setAttribute('style', 'display: block; width: 90vw; height: 90vh; position: fixed; top: 5vh; left: 5vw; z-index: 999;');
    newWindow.querySelector("button[target='closeInstWindow']").addEventListener('click', (event) => {newWindow.remove();});
    newWindow.querySelectorAll("button, input, a").forEach(element => {element.addEventListener('click', (event) => {playAudio('./sounds/webtoys/click.mp3')})});
    newWindow.querySelector('img').setAttribute('src', icon);
    newWindow.querySelector('div.title-bar-text').innerHTML = title;
    newWindow.querySelector('iframe').setAttribute('src', url);

    $( newWindow ).draggable({
        handle: ".title-bar",
        stack: ".ui-draggable", /* Stack the currently dragged item on top of all other items. */
		distance: 0, /* I believe this has to do with mouse distance? */
    });
}