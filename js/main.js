import { loadContent } from "./loadContent.js";

const fileInput = document.getElementById('file');
const filedisplay = document.getElementById('nameOfFile');
const deleteFileBtn = document.getElementById('deleteFile');

document.addEventListener('DOMContentLoaded', async () => {
    loadContent();

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            filedisplay.innerText = fileInput.files[0].name;
            return;
        } else {
            filedisplay.innerText = "";
        }
    });

    deleteFileBtn.addEventListener('click', () => {
        fileInput.value = "";
        filedisplay.innerText = "";
    })
}); 