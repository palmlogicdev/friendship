const API_URL = 'https://friendship-api.onrender.com/api';
const apiKey = 'e4bb5b8a1bf55d83f82724c3551ed6de9a7644449f3df700f5b620972a069fbd';

import { createElement } from "./createElement.js";

export async function loadContent() {
    const res = await fetch(`${API_URL}/getAllData`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        }
    });

    const data = await res.json();
    createElement(data);
    return data;
}   