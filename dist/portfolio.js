const links = document.querySelectorAll("input.tab-link");
initLinks();
links[0].click();

function initLinks() {
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", (event) => {
            let el = event.target;
            let target = el.getAttribute("target");
            openProject(event, target);
        });
    }
}

function openProject(evt, projName) {
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tab");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(projName).style.display = "grid";
    evt.currentTarget.className += " active";
}