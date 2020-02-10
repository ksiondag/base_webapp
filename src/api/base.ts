import { apiUrl } from "./util";
import { refresh } from "./token";

export const fetchFunds = async () => {
    const loggedIn = await refresh();
    if (!loggedIn.success) {
        return {
            success: false,
            message: loggedIn.message
        };
    }

    const response = await fetch(apiUrl(`funds/`), {
        method: `GET`,
        headers: {
            "Content-Type": `application/json`,
            "Authorization": `Bearer ${localStorage.getItem(`access_token`)}`,
        }
    });

    const json = await response.json();

    console.log(json);

    if (json.detail) {
        return {
            success: false,
            message: json.detail
        };
    }
    return {
        success: true,
        funds: json
    };
};