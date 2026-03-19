let slideAmount = 1;

const currentSlideElement = document.querySelector("#currentSlide");
const editableSlideTemplate = document.querySelector(".editslide");

const thumbnailTemplate = document.querySelector(".slide-thumbnail");

const slidesContainer = document.querySelector("#slidesContainer");

const addSlideBtn = document.querySelector("button[target='addPage']");
addSlideBtn.addEventListener('click', (event) => {
        AddSlide();
});

const focusSlideBtn = document.querySelector("button[target='focusPage']");
focusSlideBtn.addEventListener('click', (event) => {
        FocusSlide(focusSlideBtn.value.toString());
});

function FocusSlide(int) {
    document.querySelectorAll(".slide-thumbnail").forEach(element => {
        element.style.setProperty("border", "none");
    });
    document.querySelectorAll(".editslide").forEach(element => {
        element.style.setProperty("display", "none");
    });

    let targetSlide = document.querySelector(`.slide${int}`);
    let targetThumb = document.querySelector(`.thumb${int}`);

    targetThumb.style.setProperty("border", "6px solid red");
    targetSlide.style.setProperty("display", "block");
}
FocusSlide(1);

function AddSlide() {
    slideAmount++

    let newThumb = thumbnailTemplate.cloneNode(true);
    newThumb.classList.remove("thumb1");
    newThumb.classList.add(`thumb${slideAmount.toString()}`);
    
    let newFocus = newThumb.querySelector("button[target='focusPage']");
    newFocus.value = slideAmount.toString();
    newFocus.innerHTML = `${slideAmount}`;
    newFocus.addEventListener('click', (event) => {
        FocusSlide(newFocus.value);
    });
    
    slidesContainer.appendChild(newThumb);

    let newSlide = editableSlideTemplate.cloneNode(true);
    newSlide.classList.remove("slide1");
    newSlide.classList.add(`slide${slideAmount.toString()}`);
    newSlide.innerHTML = `${slideAmount}`;
    
    currentSlideElement.appendChild(newSlide);

    FocusSlide(slideAmount)
}