function listenForClicks() {
    document.addEventListener("click", (e) => {
        
        function sproutify(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {command: "sproutify",});
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