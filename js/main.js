import { loadContent } from "./loadContent.js";
import { createElement } from "./createElement.js";

const messageList = document.getElementById('messageList');
const API_URL = 'https://friendship-api.onrender.com/api';
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