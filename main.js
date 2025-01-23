//how tf do i not make it need to do this bru
window.onload = () => {
    //pfp grow on click
    var pfp = document.getElementById("pfp");
    var pfpSize = 125;
    pfp.onclick = function () {
        pfpSize += 10;
        pfp.style.width = pfpSize + "px";
        
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



