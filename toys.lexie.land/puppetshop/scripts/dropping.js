// #region drag-and-dropping files

let dropbox;

dropbox = document.querySelector("#tabs-7");
dropbox.addEventListener("dragenter", dragenter);
dropbox.addEventListener("dragover", dragover);
dropbox.addEventListener("drop", drop);

function dragenter(e) {
    dropbox.style.border = "2px dotted blue";
    e.stopPropagation();
    e.preventDefault();
}

function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}

function drop(e) {
    dropbox.style.border = "none";
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files);
}

function handleFiles(files) {
    for (const file of files) {

        console.log(file)

        if (/image\/.*/.test(file.type)) {
            const img = document.createElement("img");
            img.file = file;
            img.style.maxWidth = "200px";
            img.style.imageRendering = "pixelated";
            dropbox.appendChild(img);

            $( img ).draggable({
                stack: ".ui-draggable", /* Stack the currently dragged item on top of all other items. */
                distance: 0, /* I believe this has to do with mouse distance? */
            });

            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        else if (/link\/.*/.test(file.type)) {
            const img = document.createElement("img");
            img.file = file;
            img.style.maxWidth = "200px";
            img.style.imageRendering = "pixelated";
            dropbox.appendChild(img);

            $( img ).draggable({
                stack: ".ui-draggable", /* Stack the currently dragged item on top of all other items. */
                distance: 0, /* I believe this has to do with mouse distance? */
            });

            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        else {
            console.log("What the heck is that!");
            return;
        }
    }
}
// #endregion