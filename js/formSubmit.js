import { swalAlert } from './swalAlert.js'
import { loadContent } from './loadContent.js';
import { fetchAPI as FetchAPIClass} from './classes/fetchAPI.js';

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

function resetValue() {
    messageInput.value = "";
    nameInput.value = "";
    fileInput.value = "";
}

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

    const fetchAPI = new FetchAPIClass();

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
            console.log('Has file input');
            // call api upload photo
            const uploadRes = await fetchAPI.upload(formData);
            console.log('(fecthAPI > upload) response : ', uploadRes);
            if (uploadRes.success) {
                console.log(uploadRes.filename);
                filename = uploadRes.filename;
                console.log(filename);
                console.log('filename : ', filename);
                const createDataRes = await fetchAPI.createData({name, message, filename});
                console.log('(fetchAPI > createData) response : ', createDataRes)
                if (createDataRes.success) {
                    Swal.close();
                    swalAlert('Inserted success', createDataRes.successMessage.thai, 'success');

                    resetValue();
                    loadContent();
                } else {
                    Swal.close();
                    swalAlert('Failed', createDataRes.errorMessage.thai, 'error');
                }
            }
        } else {
            console.log('No file input');
            // call api create data
            const createDataRes = await fetchAPI.createData({name, message, filename});
            console.log('(fetchAPI > createData) response : ', createDataRes);
            if (createDataRes.success) {
                Swal.close();
                swalAlert('Inserted success', createDataRes.successMessage.thai, 'success');
                
                resetValue();
                loadContent();
            } else {
                Swal.close();
                swalAlert('Failed', createDataRes.errorMessage.thai, 'error');
            }
        }
    } catch (error) {
        console.log('error : ', error);
        Swal.close();
        swalAlert('Failed', 'Cant inserted', 'error');
    }
})