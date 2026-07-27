let avatar = document.querySelector(".avi img");
const nose = document.querySelector("#nose");
const uwu = document.querySelector("#uwu");

const teethLeft = document.querySelector(".decorL img");
const teethRight = document.querySelector(".decorR img");

const linkHome = document.createElement('a');
const linkPerv = document.createElement('a');
linkHome.href = './homepage.html';
linkPerv.href = './pervzone';

const gun_cock = new Howl({
  src: ['./sounds/index/cocking.mp3'],
  volume: [.5]
});
var gun_fire = new Howl({
  src: ['./sounds/index/shoot.mp3'],
  volume: [.5]
});

const controller = new AbortController();

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

    setTimeout(() => {
        teethLeft.style.animation = "closeL .5s ease-in 1 forwards";
        teethRight.style.animation = "closeR .5s ease-in 1 forwards";
        setTimeout(() => {
            linkHome.click();
        }, 500);
    }, 500);
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

    setTimeout(() => {
        teethLeft.style.animation = "closeL .5s ease-in 1 forwards";
        teethRight.style.animation = "closeR .5s ease-in 1 forwards";
        setTimeout(() => {
            linkPerv.click();
        }, 500);
    }, 500);
}, { signal: controller.signal });