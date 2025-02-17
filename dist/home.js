import "../node_modules/jquery/dist/jquery.js";

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
    var link = document.getElementById("trackLink");
    var cover = document.getElementById("trackCover");
    var title = document.getElementById("trackName");
    var artist = document.getElementById("trackArtist");

    function CurrentlyPlaying() {
        // eslint-disable-next-line no-undef
        $.get(`http://ws.audioscrobbler.com/2.0/`,
            {
                "method": "user.getrecenttracks",
                "limit": "1",
                "user": "shoebby",
                "api_key": API_KEY,
                "format": "json"
            }, (data, status) => {
                console.log(data);
                console.log(status);

                cover.src = data.recenttracks.track[0].image[1]["#text"];
                link.href = data.recenttracks.track[0].url;
                title.innerHTML = data.recenttracks.track[0].name;
                artist.innerHTML = data.recenttracks.track[0].artist["#text"];
            }
        )
    };
    CurrentlyPlaying();

    //pfp arf and shake on click
    var pfp = document.getElementById("pfp");
    var pfpSize = 200;
    
    pfp.onclick = function () {
        pfpSize -= 10;
        pfp.style.width = pfpSize + "px";

        var sound_oof = new Audio("sounds/oof.mp3");
        sound_oof.play();
    };

    //image spin on click
    var spinners = Array.from(document.getElementsByClassName("spinner"));
    var _loop = function _loop() {
        var spinner = spinners[_i4];
        spinner.onclick = function () {
            if (!spinner.style.transform) {
                spinner.style.transform = "rotate(90deg)";
            } else {
                spinner.style.transform = "rotate(".concat(parseInt(spinner.style.transform.split("(")[1].split("deg")[0]) + 90,"deg)");
            }
        };
    };
    for (var _i4 in spinners) {
        _loop();
    }
    
    // document.getElementById("welcomeBox").style.color = "blue";
};

//--------------------------------jana containment field-----------------------------------
// function fib(n) {
//     if (n == 0) throw "penis";
//     if (n == 1) return 1;
//     return fib(n - 1) + fib(n - 2);
// }

// function checkorder(arr) {
//     if (length(arr) == 0) throw "cock";
//     for (var i = 1; i < length(arr); i++) {
//         if (arr[i - 1] > arr[i]) {
//             return false;
//         }
//     }
//     return true;
// }

// function sleepsort(arr) {
//     var out = [];
//     var sleepers = [];
//     for (var i = 0; i < arr.length; i++) {

//         setTimeout(() => {out.push(i)}, i);
//     }
// }