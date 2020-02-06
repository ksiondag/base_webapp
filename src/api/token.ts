import { apiUrl } from "./util";

export const login = async (data: { username: string, password: string }) => {
    const response = await fetch(apiUrl(`token/`), {
        method: `POST`,
        headers: {
            "Content-Type": `application/json`
        },
        body: JSON.stringify(data)
    });
    const token = await response.json();

    let ret: { success: boolean, message: string } = { success: false, message: `Unknown error` };
    if (token.access) {
        localStorage.setItem(`access_token`, token.access);
        localStorage.setItem(`refresh_token`, token.refresh);
        ret.success = true;
    } else {
        ret.success = false;
        ret.message = token.detail;
    }
    return ret;
};

export const verify = async () => {
    const response = await fetch(apiUrl(`token/verify/`), {
        method: `POST`,
        headers: {
            "Content-Type": `application/json`
        },
        body: JSON.stringify({
            token: localStorage.getItem(`refresh_token`)
        })
    });

    return response.status === 200;
};

export const refresh = async () => {
    if (!await verify()) {
        return {
            success: false,
            message: `Refresh token has expired, please login again`
        };
    }

    const response = await fetch(apiUrl(`token/refresh/`), {
        method: `POST`,
        headers: {
            "Content-Type": `application/json`
        },
        body: JSON.stringify({
            refresh: localStorage.getItem(`refresh_token`)
        })
    });
    const token = await response.json();

    let ret: { success: boolean, message: string } = { success: false, message: `Unknown error` };
    if (token.access) {
        localStorage.setItem(`access_token`, token.access);
        ret.success = true;
    } else {
        ret.success = false;
        ret.message = token.detail;
    }
    return ret;
};