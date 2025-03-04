function popUp(popuptext, colorID) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("popup");
    newDiv.setAttribute("id", "popup");

    document.body.appendChild(newDiv);
    newDiv.innerHTML = popuptext;

    changeColor(colorID);
}

function popOut() {
    document.body.removeChild(document.getElementById("popup"));
    resetColors();
}

const color_chestpiece_std = '0.669, 0.325, .1';
const color_chestpiece_hl = '0.769, 0.425, .2';

const color_skin_std = "0.388, 0.241, 0.139"
const color_skin_hl = "0.488, 0.341, 0.239"

const color_gloves_std = "0.55 0.05 0.05"
const color_gloves_hl = "0.65 0.15 0.15"

const color_helmet_std = "0.05 0.05 0.1";
const color_helmet_hl = "0.15 0.15 0.2";

const color_belt_std = "0.1 0.3 0.1";
const color_belt_hl = "0.2 0.4 0.2";

const color_bodysuit_std = "0.05 0.05 0.1";
const color_bodysuit_hl = "0.15 0.15 0.2";

const color_boots_std = "0.01 0.01 0.05";
const color_boots_hl = "0.11 0.11 0.15";

const color_backpack_std = "0.01 0.01 0.05";
const color_backpack_hl = "0.11 0.11 0.15";

function changeColor(colorID) {
    if(colorID == 1) {
        document.getElementById("color_chestpiece").setAttribute('diffuseColor', color_chestpiece_hl);
    }
    const expr = colorID;
    var elementID = "";
    var color_hl = "";

    switch (expr) {
        case 'chestpiece':
            elementID = "color_chestpiece";
            color_hl = color_chestpiece_hl;
            break;
        case 'skin':
            elementID = "color_skin";
            color_hl = color_skin_hl;
            break;
        case 'gloves':
            elementID = "color_gloves";
            color_hl = color_gloves_hl;
            break;
        case 'helmet':
            elementID = "color_helmet";
            color_hl = color_helmet_hl;
            break;
        case 'belt':
            elementID = "color_belt";
            color_hl = color_belt_hl;
            break;
        case 'bodysuit':
            elementID = "color_bodysuit";
            color_hl = color_bodysuit_hl;
            break;
        case 'boots':
            elementID = "color_boots";
            color_hl = color_boots_hl;
            break;
        case 'backpack':
            elementID = "color_backpack";
            color_hl = color_backpack_hl;
            break;
    }
    document.getElementById(elementID).setAttribute('diffuseColor', color_hl);
}

function resetColors() {
    document.getElementById("color_chestpiece").setAttribute('diffuseColor', color_chestpiece_std);
    document.getElementById("color_skin").setAttribute('diffuseColor', color_skin_std);
    document.getElementById("color_gloves").setAttribute('diffuseColor', color_gloves_std);
    document.getElementById("color_helmet").setAttribute('diffuseColor', color_helmet_std);
    document.getElementById("color_belt").setAttribute('diffuseColor', color_belt_std);
    document.getElementById("color_bodysuit").setAttribute('diffuseColor', color_bodysuit_std);
    document.getElementById("color_boots").setAttribute('diffuseColor', color_boots_std);
    document.getElementById("color_backpack").setAttribute('diffuseColor', color_backpack_std);
}