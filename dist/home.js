//import "../node_modules/jquery/dist/jquery.js";
//const API_KEY = "a05aca9720151593bd06836456f9cce2";

//how tf do i not make it need to do this bru
window.onload = () => {
    //background music
    // var bgm = new Audio("sounds/strawberriesandlancables.mp3");
    // var bgmText = document.getElementById("bgmText");
    // var playbutton = document.getElementById("playbgm");

    // bgm.loop = true;
    
    // playbutton.onclick = function () {
    //     if (isPlaying(bgm)) {
    //         bgmText.innerHTML = "< 'click me to play some tunes!'";
    //         bgm.pause();
    //         return;
    //     }
    //     bgmText.innerHTML = "< 'click me to pause these tunes!'";
    //     bgm.play();
    // }

    // function isPlaying(audioEl) {
    //     return !audioEl.paused;
    // }

    //checking last.fm for most recent track
    // var link = document.getElementById("trackLink");
    // var cover = document.getElementById("trackCover");
    // var title = document.getElementById("trackName");
    // var artist = document.getElementById("trackArtist");

    // function CurrentlyPlaying() {
    //     // eslint-disable-next-line no-undef
    //     $.get(`http://ws.audioscrobbler.com/2.0/`,
    //         {
    //             "method": "user.getrecenttracks",
    //             "limit": "1",
    //             "user": "shoebby",
    //             "api_key": API_KEY,
    //             "format": "json"
    //         }, (data, status) => {
    //             console.log(data);
    //             console.log(status);

    //             cover.src = data.recenttracks.track[0].image[1]["#text"];
    //             link.href = data.recenttracks.track[0].url;
    //             title.innerHTML = data.recenttracks.track[0].name;
    //             artist.innerHTML = data.recenttracks.track[0].artist["#text"];
    //         }
    //     )
    // };
    // CurrentlyPlaying();

    //pfp arf and shake on click
    var pfp = document.getElementById("pfp");
    var pfpSize = 200;
    
    pfp.onclick = function () {
        pfpSize -= 10;
        pfp.style.width = pfpSize + "px";

        var sound_oof = new Audio("sounds/oof.mp3");
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
            sound_spin.play();
        };
    };
    for (var _i4 in spinners) {
        _loop();
    }
};