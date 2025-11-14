export class fetchAPI {
    constructor() {
        this.host = {
            localhost: "http://localhost:2000/api",
            mainhost: "https://friendship-api.onrender.com/api"
        },
        this.key = "e4bb5b8a1bf55d83f82724c3551ed6de9a7644449f3df700f5b620972a069fbd",
        this.post = {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.key
            }
        }
    }

    async createData(data) {
        const res = await fetch(`${this.host.mainhost}/createData`, {
            method: 'POST',
            headers: this.post.headers,
            body: JSON.stringify(data)
        });

        return await res.json();
    }

    async getAllData() {
        const res = await fetch(`${this.host.mainhost}/getAllData`, {
            method: 'GET',
            headers: this.post.headers
        });

        return await res.json();
    }

    async upload(formData) {
        const res = await fetch(`${this.host.mainhost}/upload`, {
            method: 'POST',
            headers: {
                'x-api-key' : this.key
            },
            body: formData
        });

        return await res.json();
    }

    async test() {
        console.log('FetchAPI : TEST');
    }
}