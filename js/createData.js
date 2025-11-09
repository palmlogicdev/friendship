const API_URL = 'http://localhost:3000/api';

export async function createData(data, apiKey) {
    const res = await fetch(`${API_URL}/createData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        },
        body: JSON.stringify({
            name: data.name,
            message: data.message,
            filename: data.filename
        })
    });

    const createData = await res.json();
    return createData;
}   