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

const beanie_std = "0.023 0.023 0.023";
const beanie_hl = "0.073 0.073 0.073";

const hair_std = "0.131 0.089 0.062";
const hair_hl = "0.231 0.189 0.162";

const fur_std = "0.540 0.410 0.344";
const fur_hl = "0.740 0.610 0.544";

const snout_std = "0.000 0.000 0.000";
const snout_hl = "0.025 0.025 0.025";

function changeColor(colorID) {
    const expr = colorID;
    var elementID = "";
    var color_hl = "";

    switch (expr) {
        case 'beanie':
            elementID = "beanie";
            color_hl = beanie_hl;
            break;
        case 'hair':
            elementID = "hair";
            color_hl = hair_hl;
            break;
        case 'fur':
            elementID = "fur";
            color_hl = fur_hl;
            break;
        case 'snout':
            elementID = "snout";
            color_hl = snout_hl;
            break;
    }
    document.getElementById(elementID).setAttribute('diffuseColor', color_hl);
}

function resetColors() {
    document.getElementById("beanie").setAttribute('diffuseColor', beanie_std);
    document.getElementById("hair").setAttribute('diffuseColor', hair_std);
    document.getElementById("fur").setAttribute('diffuseColor', fur_std);
    document.getElementById("snout").setAttribute('diffuseColor', snout_std);
}