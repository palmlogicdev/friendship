const API_URL = 'https://friendship-api.onrender.com/api';

export async function upload(formData, apiKey) {
    const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
            'x-api-key': apiKey
        },
        body: formData
    });

    const data = await res.json();
    return data;
}