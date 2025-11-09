const messageList = document.getElementById('messageList');
const API_URL = 'https://friendship-api.onrender.com/api';

export function createElement(data) {

    messageList.innerHTML = ""

    data.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('message-item');
        div.innerHTML = `
            ${item.filename ? `<img src='${API_URL}/uploads/${item.filename}'>` : ''}
            <div class='text'>
                <h1>${item.name}</h1>
                <p>${item.message}</p>
            </div>
        `
        messageList.append(div);
    });
}