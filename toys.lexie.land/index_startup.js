const overlay = document.querySelector('#startupOverlay');
const buttons = overlay.querySelector('.buttonContainer');
const title = overlay.querySelector('span');
const scanlines = overlay.querySelector('#scanlines');
const projector = overlay.querySelector('.projector');

overlay.querySelector("button[target='startup']").addEventListener('click', () => {startupSeq()});
overlay.querySelector("button[target='quickstart']").addEventListener('click', () => {quickStart()});
overlay.querySelector("button[target='introseq']").addEventListener('click', () => {introSeq()});

function startupSeq() {
    overlay.style.setProperty('transition', '3s');
    overlay.style.setProperty('background', 'none');
    overlay.style.setProperty('pointer-events', 'none');
    scanlines.style.setProperty('pointer-events', 'none');

    buttons.remove();
    setTimeout(() => {
        overlay.style.setProperty('transition', 'none');
        title.remove();
    }, 4500);

    const audio = new Audio('sounds/webtoys/visunov_alien_var.mp3');
    audio.play();
}

function quickStart() {
    overlay.style.setProperty('background', 'none');
    overlay.style.setProperty('pointer-events', 'none');
    scanlines.style.setProperty('pointer-events', 'none');

    buttons.remove();
    title.remove();
}

const screenOpen = new Howl({
    src: ['./sounds/screenOpen.mp3'],
    volume: 0.5
});
const screenClose = new Howl({
    src: ['./sounds/screenClose.mp3'],
    volume: 0.5
});
const projectorRunning = new Howl({
    src: ['./sounds/projectorRunning.mp3'],
    loop: true
});

function introSeq() {

    screenOpen.play();
    projector.style.top = '0';

    setTimeout(function(){
        let introVid = document.createElement('video');
        introVid.src = "./divbrush/assets/storm.mp4";
        introVid.autoplay = true;
        introVid.volume = .2;
        projector.appendChild(introVid);
        projectorRunning.loop = true;
        projectorRunning.play();

        setTimeout(function(){
            //cleanup
            projectorRunning.stop();
            introVid.remove();
            screenClose.play();
            projector.style.top = '-100vh';
        }, 54000);
    }, 2500);
}