const texturesContainer = document.querySelector("#container");

const texturesAmount = 11;

function addTexture(index, category) {
    if (index <= 0) {
        return;
    }

    let newTex = document.createElement("img");
    newTex.setAttribute("class", "tex");
    newTex.src = `./textures/${category}/tex${index}.webp`;
    texturesContainer.appendChild(newTex);
    
    index -= 1;
    addTexture(index, category);
}

function clearTextures() {
    texturesContainer.innerHTML = null;
}

document.querySelector("input[target='utrecht']").addEventListener("click", function (event) {
    clearTextures();
    addTexture(texturesAmount, "utrecht");
});

