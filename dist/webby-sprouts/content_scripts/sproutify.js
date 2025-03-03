var startLength = 400;
var color = [255, 0, 150, 50];

(() => {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
      	return;
    }
    window.hasRun = true;

    /**
     * Listen for messages from the background script.
     * Call "insertBeast()" or "removeExistingBeasts()".
     */
    browser.runtime.onMessage.addListener((message) => {
      	if (message.command === "sproutify") {
        	webTree(startLength, document.body, null, null, null, color);
      	} else if (message.command === "reset") {
        	destroyTree();
      	}
    });

    function destroyTree() {
    	removeElementsByClass("branchDiv");
    }

    function removeElementsByClass(className){
      const elements = document.getElementsByClassName(className);
      while(elements.length > 0){
          elements[0].parentNode.removeChild(elements[0]);
      }
    }

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    function webTree(startLength, parentElement, parentBranch, angle, ratio, color) {
        const newBranch = document.createElement("div");

        newBranch.classList.add("branchDiv");
        newBranch.innerHTML = "<span style='transform:rotate(-90deg);'>" + parentElement + "</span>";
        parentElement.classList.add("branchElement");

        if (parentBranch != null) {
            parentBranch.appendChild(newBranch);

            newBranch.style.setProperty('--w', parentBranch.offsetWidth * ratio + "px");
            newBranch.style.setProperty('--a', angle + "deg");

        } else if (parentBranch == null) {
            newBranch.classList.add("rootDiv");
            document.body.appendChild(newBranch);

            newBranch.style.setProperty('--w', startLength + "px");
            newBranch.style.setProperty('--a', "90deg");
        }

        newBranch.style.setProperty('--colorR', 255);
        newBranch.style.setProperty('--colorG', 255 - newBranch.offsetWidth);
        newBranch.style.setProperty('--colorB', 0);
        newBranch.style.setProperty('--colorA', 1);

        if (newBranch.hasChildNodes() == false) {
            const newBulb = document.createElement("div");
            newBulb.classList.add("branchDiv");

            newBulb.style.height = "50px";
            newBulb.style.width = "50px";
            newBulb.style.backgroundColor = "white";
        }

        var siblings = parentElement.children;

        for (let i = 0; i < siblings.length; i++) {
            //console.log("branch " + i + " - " + siblings[i + 1]);
            //console.log(siblings[i].tagName);

            if (siblings[i].classList.contains("branchDiv") || siblings[i].tagName == "BR") {
                continue;
            }

            var newAngle = getRndInteger(-55, 55);
            var newRatio = getRndInteger(50, 100) / 100;
            
            webTree(startLength, siblings[i], newBranch, newAngle, newRatio, color);
        }
    }
  })();
  