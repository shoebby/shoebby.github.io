document.body.onload = addElement()

function addElement() {
    const newBranch = document.createElement("div");

    newBranch.classList.add("branchDiv");

    const treeContainerDiv = document.getElementById("container");

    document.body.insertBefore(treeContainerDiv, newBranch);
    
    treeContainerDiv.appendChild(newBranch);
}
