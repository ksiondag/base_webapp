import { apiUrl } from "./util";
import { getHeaders, verifyLoggedIn } from "./token";

export default class FundApi {
    @verifyLoggedIn
    static async get() {
        const response = await fetch(apiUrl(`funds/`), {
            method: `GET`,
            headers: getHeaders(),
        });

        const json = await response.json();

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
    }

    @verifyLoggedIn
    static async post(data: { name: string, balance: number }) {
        const response = await fetch(apiUrl(`funds/`), {
            method: `POST`,
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const json = await response.json();

        if (json.detail) {
            return {
                success: false,
                message: json.detail,
            }
        }
        return {
            success: true,
            fund: json,
        }
    }

    @verifyLoggedIn
    static async delete(id: number) {

    }
};