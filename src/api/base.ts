const baseUrl = `http://localhost:8000/api/`;

const apiUrl = (endpoint: string) => {
    return `${baseUrl}${endpoint}`;
};

export const fetchToken = async (data: { username: string, password: string }) => {
    const response = await fetch(apiUrl(`token/`), {
        method: `POST`,
        headers: {
            "Content-Type": `application/json`
        },
        body: JSON.stringify(data)
    });
    const token = await response.json();

    if (token.access) {
        localStorage.setItem(`token`, token.access);
    }
    return token;
};

export const fetchFunds = async () => {
    const response = await fetch(apiUrl(`funds/`), {
        method: `GET`,
        headers: {
            "Content-Type": `application/json`,
            "Authorization": `Bearer ${localStorage.getItem(`token`)}`,
        }
    });

    const json = await response.json();

    if (json.detail) {
        // TODO: https://github.com/ksiondag/base_webapp/issues/3
        localStorage.removeItem(`token`);
    }
    return json;
};