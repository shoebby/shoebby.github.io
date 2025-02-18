//const input_startLength = document.getElementById("startLength");
//const input_angleLeft = document.getElementById("angleLeft");
//const input_angleRight = document.getElementById("angleRight");
//const input_ratio = document.getElementById("ratio");
//const input_depth = document.getElementById("depth");
//const input_treeNum = document.getElementById("treeNum");

//var startLength = input_startLength.value;
//var angleLeft = input_angleLeft.value;
//var angleRight = input_angleRight.value;
//var ratio = input_ratio.value / 100;
//var color = [255, 0, 150, 50];
//var depth = input_depth.value;
//var treeNum = input_treeNum.value;

// input_startLength.oninput = function () {
//     startLength = this.value;
// }
// input_angleLeft.oninput = function () {
//     angleLeft = this.value;
// }
// input_angleRight.oninput = function () {
//     angleRight = this.value;
// }
// input_ratio.oninput = function () {
//     ratio = this.value / 100;
// }
// input_depth.oninput = function () {
//     depth = this.value;
// }
// input_treeNum.oninput = function () {
//     treeNum = this.value;
// }

const branchCSS =   `.branchDiv { 
                        position: absolute;
                        display: flex;
                        width: var(--w);
                        height: 3px;
                        left: 100%;
                        transform-origin: 0% 50%;
                        transform: rotate(var(--a));
                        background-color: rgba(var(--colorR), var(--colorG), var(--colorB), var(--colorA));
                        color: rgba(0, 0, 0, 0);
                        font-size: 10px;

                        animation-name: branchFlow;
                        animation-duration: 0s;
                        animation-iteration-count: infinite;
                        animation-timing-function: ease-in-out;
                    }
                    .rootDiv {
                        left: 50%;
                        top: 0%;
                        transform-origin: 0% 50%;
                    }
                    .branchDiv:hover {
                        color: white;
                        background-color: orange;
                    }
                    @keyframes branchFlow {
                        0% {
                            height: 1px;
                            rotate: -1deg;
                        }
                        50% {
                            height: 4px;
                            rotate: 1deg;
                        }
                        100% {
                            height: 1px;
                            rotate: -1deg;
                        }
                    }
                `;

function listenForClicks() {
    document.addEventListener("click", (e) => {

        function sproutify(tabs) {
            browser.tabs.insertCSS({ code: branchCSS }).then(() => browser.tabs.sendMessage(tabs[0].id, {command: "sproutify",}));
        }

        function reset(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {command: "reset",});
        }

        function reportError(error) {
            console.error(`Could not sproutify: ${error}`);
        }

        if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
            // Ignore when click is not on a button within <div id="popup-content">.
            return;
        }

        if (e.target.type === "reset") {
            browser.tabs
                .query({ active: true, currentWindow: true })
                .then(reset)
                .catch(reportError);
        } else {
            browser.tabs
                .query({ active: true, currentWindow: true })
                .then(sproutify)
                .catch(reportError);
        }
    });
}

function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute webby sprout content script: ${error.message}`);
}

browser.tabs
    .executeScript({ file: "/content_scripts/sproutify.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);