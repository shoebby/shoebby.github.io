function delay (URL) {

    handimg.src = "../images/lexieland/hand-snap.gif";
    handimg.style.transform = "scale(1.5)";
    bg.stop();
    snap.play();
    
    setTimeout( function() { window.location = URL }, 1000 );
}