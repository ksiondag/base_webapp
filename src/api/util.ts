const BASE_URL = `http://localhost:8000/api/`;

export const apiUrl = (endpoint: string) => {
    return `${BASE_URL}${endpoint}`;
};