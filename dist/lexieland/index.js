const hand = document.querySelector("#hand");
const handimg = hand.querySelector("img");

const actors = document.querySelectorAll(".interactable a");

const itemToScroll = document.querySelector("html");

const talker = document.querySelector("#talker");
let dia_name = dialogue.querySelector("#name");
let dia_text = dialogue.querySelector("#text");
let dia_link = dialogue.querySelector("#link");
let dia_cancel = dialogue.querySelector("#cancel");

let currentActor = null;
let currentLink = "";

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
	volume: [.2]
});
const leadup = new Howl({
  	src: ['../sounds/lexieland/grab-leadup.wav'],
  	volume: [.5]
});

document.addEventListener("wheel", function(e) {
  	if (Math.abs(e.deltaY) > 0) {
    	e.preventDefault();
    	itemToScroll.scrollLeft += e.deltaY;
  	}
});

dia_link.addEventListener("click", () => {
	let outlink = document.createElement("a");
	outlink.href = currentLink;

	handimg.src = "../images/lexieland/hand-snap.gif";
    handimg.style.transform = "scale(1.5)";
    bg.stop();
    snap.play();
    
    setTimeout( function() { outlink.click(); }, 1000 );
})

dia_cancel.addEventListener("click", () => {
	talker.style.display = "none";
	currentActor.removeAttribute("style");
	currentActor = null;

	actors.forEach(element => {
		element.style.pointerEvents = "all";
	})
})

actors.forEach(element => {
    element.addEventListener("click", () => {
        actors.forEach(element => {
			element.style.pointerEvents = "none";
		})
		currentActor = element;
		currentActor.style.visibility = "hidden";

		if (element.id == "jack") {
			dia_name.innerHTML = "Jack the Bipper";
			dia_text.innerHTML = "Hey bozo, I got this shed full of cool websites 'n webpages. Wanna check it out?";
			dia_link.innerHTML = "Let's follow this sassy child.";
			currentLink = "../coolwebsites.html";
			dia_cancel.innerHTML = "Sketchy ass fucker. Hell no."
			
		}
		talker.style.display = "block";
    });
});

window.addEventListener( "pageshow", function ( event ) {
    let historyTraversal = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );

    if ( historyTraversal ) {
        // page restore.
        window.location.reload(true);
    }
});

export function delay (URL) {

    
}