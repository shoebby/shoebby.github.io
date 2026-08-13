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

const bio = document.querySelector("#hud_bio");
const bio_handle = document.querySelector("#bio-handle");
let bioExpanded = false;

const item_left = document.querySelector("#item-left");
const item_right = document.querySelector("#item-right");
const item_focus = document.querySelector("#item-focus");
const item_focus_name = item_focus.querySelector("#item-focus-name");
const items = {
	Games: "../mygames.html",
	VisunovOS: "https://toys.lexie.land",
	Drawings: "../mydrawings.html",
	Videos: "https://www.youtube.com/@lexieland",
	Music: "https://lexieland.bandcamp.com",
	Resources: "https://resources.lexie.land",
	Plamo: "../plamo/plamo-main.html",
	Websites: "../coolwebsites.html",
}
let focusedItem = items.Games;

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

bio_handle.addEventListener("click", () => {
	bioExpanded = !bioExpanded;
	
	if (bioExpanded == true) {
		bio.style.transform = "translateY(0)";
	}
	else if (bioExpanded == false) {
		bio.removeAttribute("style");
	}
});

window.addEventListener("pageshow", function ( event ) {
    let historyTraversal = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );

    if ( historyTraversal ) {
        // page restore.
        window.location.reload(true);
    }
});

item_left.addEventListener("click", () => {
	ScrollItem("left");
});
item_right.addEventListener("click", () => {
	ScrollItem("right");
});
item_focus.addEventListener("click", () => {
	let itemLink = document.createElement("a");
	itemLink.href = focusedItem;
	itemLink.target = "_blank"
	itemLink.click();
});

function ScrollItem(dir) {
	if (dir == "left") {
		switch (focusedItem) {
			case items.Games:
				focusedItem = items.Websites;
				break;
			case items.VisunovOS:
				focusedItem = items.Games;
				break;
			case items.Drawings:
				focusedItem = items.VisunovOS;
				break;
			case items.Videos:
				focusedItem = items.Drawings;
				break;
			case items.Music:
				focusedItem = items.Videos;
				break;
			case items.Resources:
				focusedItem = items.Music;
				break;
			case items.Plamo:
				focusedItem = items.Resources;
				break;
			case items.Websites:
				focusedItem = items.Plamo;
				break;
		}
	} else if (dir == "right") {
		switch (focusedItem) {
			case items.Games:
				focusedItem = items.VisunovOS;
				break;
			case items.VisunovOS:
				focusedItem = items.Drawings;
				break;
			case items.Drawings:
				focusedItem = items.Videos;
				break;
			case items.Videos:
				focusedItem = items.Music;
				break;
			case items.Music:
				focusedItem = items.Resources;
				break;
			case items.Resources:
				focusedItem = items.Plamo;
				break;
			case items.Plamo:
				focusedItem = items.Websites;
				break;
			case items.Websites:
				focusedItem = items.Games;
				break;
		}
	}

	switch (focusedItem) {
		case items.Games:
			item_focus_name.innerHTML = "GAMES";
			item_focus.style.backgroundImage = "url(../images/lexieland/items/games.webp)";
			item_left.style.backgroundImage = "url(../images/lexieland/items/websites.webp)";
			item_right.style.backgroundImage = "url(../images/lexieland/items/visunovos.webp)";
			break;
		case items.VisunovOS:
			item_focus_name.innerHTML = "VISUNOVOS";
			item_focus.style.backgroundImage = "url(../images/lexieland/items/visunovos.webp)";
			item_left.style.backgroundImage = "url(../images/lexieland/items/games.webp)";
			item_right.style.backgroundImage = "url(../images/lexieland/items/drawings.webp)";
			break;
		case items.Drawings:
			item_focus_name.innerHTML = "DRAWINGS";
			item_focus.style.backgroundImage = "url(../images/lexieland/items/drawings.webp)";
			item_left.style.backgroundImage = "url(../images/lexieland/items/visunovos.webp)";
			item_right.style.backgroundImage = "url(../images/lexieland/items/videos.webp)";
			break;
		case items.Videos:
			item_focus_name.innerHTML = "VIDEOS";
			item_focus.style.backgroundImage = "url(../images/lexieland/items/videos.webp)";
			item_left.style.backgroundImage = "url(../images/lexieland/items/drawings.webp)";
			item_right.style.backgroundImage = "url(../images/lexieland/items/music.webp)";
			break;
		case items.Music:
			item_focus_name.innerHTML = "MUSIC";
			item_focus.style.backgroundImage = "url(../images/lexieland/items/music.webp)";
			item_left.style.backgroundImage = "url(../images/lexieland/items/videos.webp)";
			item_right.style.backgroundImage = "url(../images/lexieland/items/resources.webp)";
			break;
		case items.Resources:
			item_focus_name.innerHTML = "RESOURCES";
			item_focus.style.backgroundImage = "url(../images/lexieland/items/resources.webp)";
			item_left.style.backgroundImage = "url(../images/lexieland/items/music.webp)";
			item_right.style.backgroundImage = "url(../images/lexieland/items/plamo.webp)";
			break;
		case items.Plamo:
			item_focus_name.innerHTML = "PLAMO";
			item_focus.style.backgroundImage = "url(../images/lexieland/items/plamo.webp)";
			item_left.style.backgroundImage = "url(../images/lexieland/items/resources.webp)";
			item_right.style.backgroundImage = "url(../images/lexieland/items/websites.webp)";
			break;
		case items.Websites:
			item_focus_name.innerHTML = "WEBSITES";
			item_focus.style.backgroundImage = "url(../images/lexieland/items/websites.webp)";
			item_left.style.backgroundImage = "url(../images/lexieland/items/plamo.webp)";
			item_right.style.backgroundImage = "url(../images/lexieland/items/games.webp)";
			break;
	}
}