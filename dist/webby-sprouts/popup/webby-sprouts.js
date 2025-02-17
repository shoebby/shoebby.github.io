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

const hidePage =    `body > :not(.beastify-image) {
                        display: none;
                    }`;

function listenForClicks() {
    document.addEventListener("click", (e) => {
        /**
         * Given the name of a beast, get the URL to the corresponding image.
         */
        function beastNameToURL(beastName) {
            switch (beastName) {
                case "Soft":
                    return browser.runtime.getURL("images/soft.PNG");
            }
        }

        function beastify(tabs) {
            const url = beastNameToURL(e.target.textContent);
            browser.tabs.sendMessage(tabs[0].id, {
                command: "beastify",
                beastURL: url,
            });
        }

        function reset(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "reset",
            });
        }

        function reportError(error) {
            console.error(`Could not beastify: ${error}`);
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
                .then(beastify)
                .catch(reportError);
        }
    });
}

function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute beastify content script: ${error.message}`);
}

browser.tabs
    .executeScript({ file: "/content_scripts/beastify.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);

// ------------------------------------------------------------------------------------------------------------------------- //

