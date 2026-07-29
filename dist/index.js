let avatar = document.querySelector(".avi img");
const nose = document.querySelector("#nose");
const uwu = document.querySelector("#uwu");

const teethLeft = document.querySelector(".decorL img");
const teethRight = document.querySelector(".decorR img");

const linkHome = document.createElement('a');
const linkPerv = document.createElement('a');
linkHome.href = './homepage.html';
linkPerv.href = './pervzone';

const anchors = document.querySelectorAll("a");

const gun_cock = new Howl({
  src: ['./sounds/index/cocking.mp3'],
  volume: [.5]
});
const gun_fire = new Howl({
  src: ['./sounds/index/shoot.mp3'],
  volume: [.5]
});

let controller = new AbortController();

nose.addEventListener("mouseenter", (e) => { 
    gun_cock.play();
    avatar.src = "./images/index/avatar-aim.webp";
}, { signal: controller.signal });

nose.addEventListener("mouseleave", (e) => { 
    avatar.src = "./images/index/avatar.webp";
}, { signal: controller.signal });

nose.addEventListener("click", (e) => { 
    gun_fire.play();
    avatar.src = "./images/index/avatar-headless.webp";
    controller.abort();

    Shoot(linkHome);

}, { signal: controller.signal });

uwu.addEventListener("mouseenter", (e) => { 
    gun_cock.play();
    avatar.src = "./images/index/avatar-uwu.webp";
}, { signal: controller.signal });

uwu.addEventListener("mouseleave", (e) => { 
    avatar.src = "./images/index/avatar.webp";
}, { signal: controller.signal });

uwu.addEventListener("click", (e) => { 
    gun_fire.play();
    avatar.src = "./images/index/avatar-srs.webp";
    controller.abort();

    Shoot(linkPerv);

}, { signal: controller.signal });

anchors.forEach((el) => {
    el.addEventListener("click", () => {
        let target = el.querySelector("div");
        target.style.transform = "rotateY(1800deg)";
        gun_fire.play();
    });
});

function Shoot(href) {

    setTimeout(() => {
        if(window.innerHeight > window.innerWidth){
            teethLeft.style.animation = "closeBottom .5s ease-in 1 forwards";
            teethRight.style.animation = "closeTop .5s ease-in 1 forwards";
        } else {
            teethLeft.style.animation = "closeL .5s ease-out 1 forwards";
            teethRight.style.animation = "closeR .5s ease-out 1 forwards";
        }
        
        setTimeout(() => { href.click(); }, 500);

    }, 500);

}

window.addEventListener( "pageshow", function ( event ) {
    let historyTraversal = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );

    if ( historyTraversal ) {
        // Handle page restore.
        teethLeft.removeAttribute('style');
        teethRight.removeAttribute('style');
        avatar.src = "./images/index/avatar.webp";
        gun_fire.stop();
        controller = new AbortController();
        window.location.reload();
    }
});