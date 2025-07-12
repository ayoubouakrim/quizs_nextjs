export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async get(endpoint: string ) : Promise<any>  {
        const token = localStorage.getItem('token');
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
             },
        });

        if (!response.ok) {
            throw new Error(`GET request failed: ${response.statusText}`);
        }
        return response.json();
        
    }

    async post(endpoint: string, data: any): Promise<any> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`POST request failed: ${response.statusText}`);
        }

        return response.json();
    }

    async put(endpoint: string, data: any): Promise<any> {
        const token = localStorage.getItem('token');
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`PUT request failed: ${response.statusText}`);
        }

        return response.json();
    }

    async postFile(endpoint: string, data: any): Promise<any> {
        const token = localStorage.getItem('token');
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                
            },
            body: data
        });

        if (!response.ok) {
            throw new Error(`POST request failed: ${response.statusText}`);
        }

        return response.json();
    }
        
}