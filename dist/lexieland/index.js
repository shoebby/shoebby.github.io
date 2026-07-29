const hand = document.querySelector("#hand");
const handimg = hand.querySelector("img");

const anchors = document.querySelectorAll("a");

const itemToScroll = document.querySelector("html");

const bg = new Howl({
  src: ['../sounds/lexieland/bg.mp3'],
  loop: [true],
  autoplay: [true],
  volume: [.3]
});
const snap = new Howl({
  src: ['../sounds/lexieland/snap.mp3'],
  volume: [1]
});
const grab = new Howl({
  src: ['../sounds/lexieland/grab.wav'],
  volume: [1]
});
const leadup = new Howl({
  src: ['../sounds/lexieland/grab-leadup.wav'],
  volume: [1]
});

document.addEventListener("wheel", function(e) {
  if (Math.abs(e.deltaY) > 0) {
    e.preventDefault();
    itemToScroll.scrollLeft += e.deltaY;
  }
});

anchors.forEach(element => {
    element.addEventListener("click", () => {
        element.style.pointerEvents = "none";

        const grabber = element.querySelector(".grabber");
        const char = element.querySelector(".char");

        grabber.style.animation = "grabber .5s linear 1";
        grabber.src = "../images/lexieland/hand-grab-f1.webp";
        handimg.src = "../images/lexieland/hand-snap.gif";
        bg.stop();
        leadup.play();
        snap.play();

        setTimeout(() => {
            char.style.display = "none";
            grabber.style.zIndex = 0;
            grabber.style.marginLeft = "-15vw";
            grabber.src = "../images/lexieland/hand-grab-f2.webp";
            grab.play();
        }, 500);
    });
});

window.addEventListener( "pageshow", function ( event ) {
    let historyTraversal = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );

    if ( historyTraversal ) {
        // Handle page restore.
        
        window.location.reload(true);
    }
});