let common = {};
common.audio = {};

window.addEventListener("DOMContentLoaded", async () => {
    common.audio.interact = new Audio("sounds/pop.mp3");
    common.audio.interact.volume = 0.3;

    common.audio.context = new AudioContext();
    common.audio.track = {};
    common.audio.track.interact = common.audio.context.createMediaElementSource(common.audio.interact);
    common.audio.track.interact.connect(common.audio.context.destination);

    document.addEventListener("mouseover", (e) => {
        if (e.target.tagName == "A" || (e.target.parentElement != undefined && e.target.parentElement.tagName == "A")) {
            common.audio.interact.play();
        }
    });
});

window.addEventListener("DOMContentLoaded", event => {
  const audio = document.querySelector("audio");
  audio.volume = 0.25;
  audio.loop = true;
  audio.play();
});

//how tf do i not make it need to do this bru
window.onload = () => {
    //pfp arf and shake on click
    var pfp = document.getElementById("pfp");
    var pfpSize = 99;

    pfp.onclick = function () {
        pfpSize -= 1;
        pfp.style.width = pfpSize + "%";
        pfp.style.marginLeft = ((99 - pfpSize) / 2) + "%";
        pfp.style.marginRight = ((99 - pfpSize) / 2) + "%";
        var sound_oof = new Audio("sounds/oof.mp3");
        sound_oof.volume = 0.3;
        sound_oof.play();
    };

    //buddy
    const buddy = document.getElementById("buddy");
    const buddyParent = document.getElementsByClassName("buddyParent");
    var buddy_xpos = 50;
    var xpos_increment = 25;

    buddy.style.setProperty('--xpos', 10 + "px");
    buddy.style.setProperty('--flip', "1");

    buddy.onclick = function () {
        const newBuddy = document.createElement("img");
        newBuddy.src = "images/favicon.ico";
        newBuddy.classList.add("buddy");
        buddyParent[0].appendChild(newBuddy);

        if (getRandomInt(2) == 0) {
            newBuddy.style.setProperty('--flip', "-1");
        } else {
            newBuddy.style.setProperty('--flip', "1");
        }
        
        if (xpos_increment > 0)
            xpos_increment = randomIntFromInterval(15,100);
        else
            xpos_increment = randomIntFromInterval(-15,-100);

        if (buddy_xpos + xpos_increment > 850 || buddy_xpos + xpos_increment < 50)
            xpos_increment *= -1;
        
        buddy_xpos += xpos_increment
        
        newBuddy.style.setProperty('--xpos', buddy_xpos + "px");

        newBuddy.style.filter = "grayscale(" + randomIntFromInterval(0,100) + "%)";

        var sound_buddy = new Audio("sounds/pop.mp3");
        sound_buddy.volume = 0.3;
        sound_buddy.play();
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //image spin on click
    var spinners = Array.from(document.getElementsByClassName("spinner"));
    var _loop = function _loop() {
        var spinner = spinners[_i4];
        spinner.onclick = function () {
            if (!spinner.style.transform) {
                spinner.style.transform = "rotate(360deg)";
            } else {
                spinner.style.transform = "rotate(".concat(parseInt(spinner.style.transform.split("(")[1].split("deg")[0]) + 360,"deg)");
            }
            var sound_spin = new Audio("sounds/woo.mp3");
            sound_spin.volume = 0.3;
            sound_spin.play();
        };
    };
    for (var _i4 in spinners) {
        _loop();
    }
};