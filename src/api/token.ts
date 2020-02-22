import { apiUrl } from "./util";

const updateTimestamp = () => {
    localStorage.setItem(`token_timestamp`, Date.now().toString());
};

export const getHeaders = () => {
    return {
        "Content-Type": `application/json`,
        "Authorization": `Bearer ${localStorage.getItem(`access_token`)}`,
    }
}

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
        updateTimestamp();
        ret.success = true;
    } else {
        ret.success = false;
        ret.message = token.detail;
    }
    return ret;
};

const shouldUpdate = (maxAge: number) => {
    const timestamp = parseFloat(localStorage.getItem(`token_timestamp`));

    return isNaN(timestamp) || (Date.now() - timestamp) > maxAge;
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

const refresh = async () => {
    // If timestamp is within last 4.5 minutes, assume token is good
    const timestamp = parseFloat(localStorage.getItem(`token_timestamp`));
    if (!shouldUpdate(5 * 60 * 1000 - 30 * 60)) {
        return {
            success: true,
            message: ``,
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
        ret.message = ``;
        updateTimestamp();
    } else {
        ret.success = false;
        ret.message = token.detail;
    }
    return ret;
};

export function verifyLoggedIn(target: Object, proertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function () {
        const loggedIn = await refresh();
        if (!loggedIn.success) {
            return {
                success: false,
                message: loggedIn.message
            };
        }

        return method.apply(this, arguments);
    };
};