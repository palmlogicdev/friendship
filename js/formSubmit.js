import { swalAlert } from './swalAlert.js'
import { upload } from './upload.js';
import { createData } from './createData.js';
import { loadContent } from './loadContent.js';

const apiKey = 'e4bb5b8a1bf55d83f82724c3551ed6de9a7644449f3df700f5b620972a069fbd';

const form = document.getElementById('form');
const messageInput = document.getElementById('message');
const fileInput = document.getElementById('file');
const nameInput = document.getElementById('name');

function isEmpty(value) {
    if (value && value.length > 0) {
        return true;
    }
    return false
}

function checkExt(filename) {
    const ext = filename.split('.').pop();
    const allowed = ['jpg', 'gif', 'jpeg', 'png'];
    
    return allowed.includes(ext);
}

fileInput.addEventListener('change', () => {
    const filename = fileInput.files[0].name;
    if (!checkExt(filename)) {
        swalAlert('Extension issue', 'โปรดตรวจสอบนามสกุลไฟล์รูปภาพของคุณ', 'error');
        fileInput.value = "";
    }
})

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = messageInput.value;
    const name = nameInput.value;
    const file = fileInput.files[0];

    if (!isEmpty(message)) {
        swalAlert('Empty field', 'โปรดใส่ข้อความของคุณ', 'error');
        return;
    }
    if (!isEmpty(name)) {
        swalAlert('Empty field', 'โปรดใส่ชื่อของคุณ', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
        Swal.fire({
            title: 'Loading.....',
            text: 'Please wait....',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        let filename = "";
        if (fileInput && fileInput.files.length > 0) {
            // call api upload photo
            const uploadData = await upload(formData, apiKey);
            if (uploadData.success) {
                // call api create data
                filename = uploadData.filename;
                const insertData = await createData({name, message, filename}, apiKey);

                if (insertData.success) {
                    Swal.close();
                    swalAlert('Inserted success', insertData.messageStatus.thai, 'success');

                    message = "";
                    name = "";
                    fileInput.value = "";
                    loadContent();
                } else {
                    Swal.close();
                    swalAlert('Failed', insertData.messageStatus.thai, 'error');
                }
            }
        } else {
            // call api create data
            const insertData = await createData({name, message, filename}, apiKey);
            if (insertData.success) {
                Swal.close();
                swalAlert('Inserted success', insertData.messageStatus.thai, 'success');
                
                message = "";
                name = "";
                fileInput.value = "";
                loadContent();
            } else {
                Swal.close();
                swalAlert('Failed', insertData.messageStatus.thai, 'error');
            }
        }
    } catch (error) {
        Swal.close();
        swalAlert('Failed', insertData.messageStatus.thai, 'error');
    }
})