const API_URL = 'http://localhost:3000/api';

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