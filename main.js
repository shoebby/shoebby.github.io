//how tf do i not make it need to do this bru
window.onload = () => {
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