var startLength = 500;
var angleLeft = 35;
var angleRight = 35;
var ratio = 0.8;
var color = [255, 0, 150, 50];
var depth = 8;
var treeNum = 3;

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
      if (message.command === "beastify") {
        initTrees(1);
      } else if (message.command === "reset") {
        destroyTree();
      }
    });
    
    function initTrees(treeAmount) {
        //var startAngle = 360 / treeAmount;

        for (i = 0; i < treeAmount; i++) {
            webTree(startLength, document.body, null, null, ratio, color);
        }
    }

    function destroyTree() {
        document.body.removeChild(document.getElementById("branch"));
    }

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    function webTree(startLength, parentElement, parentBranch, angle, ratio, color) {
        const newBranch = document.createElement("div");

        newBranch.classList.add("branchDiv");
        newBranch.setAttribute("id", "branch");
        newBranch.innerHTML = "<span>" + parentElement + "</span>";

        newBranch.style.display = "flex";
        newBranch.style.position = "absolute";
        newBranch.style.height = 2 + "px";
        newBranch.style.transformOrigin = "0% 50%";
        newBranch.style.backgroundColor = "red";
        //newBranch.style.mixBlendMode = "exclusion";

        if (parentBranch != null) {
            parentBranch.appendChild(newBranch);

            newBranch.style.left = "100%";
            newBranch.style.width = parentBranch.offsetWidth * ratio + "px";
            newBranch.style.transform = "rotate(" + angle + "deg)";
    
        } else if (parentBranch == null) {
            newBranch.classList.add("rootDiv");
            document.body.appendChild(newBranch);
            
            newBranch.style.left = "50%";
            newBranch.style.top = "0%";
            newBranch.style.width = startLength + "px";
            newBranch.style.transform = "rotate(90deg)";
        }

        newBranch.style.fontSize = "10pt";
        newBranch.style.color = "white";

        var parentChildren = parentElement.children;

        if (parentChildren.length == 0) {
            return;
        }

        for (let i = 0; i < parentChildren.length; i++) {
            console.log("branch " + i + " - " + parentChildren[i + 1]);
            if (parentChildren[i].id == "branch") {
                return;
            }

            var newAngle = getRndInteger(-55, 55);
            var newRatio = getRndInteger(50, 100) / 100;
            webTree(startLength, parentChildren[i], newBranch, newAngle, newRatio, color);
        }
    }
  })();
  