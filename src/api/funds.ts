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
    static async post({ name, balance }: { name: string, balance: number }) {
        const response = await fetch(apiUrl(`funds/`), {
            method: `POST`,
            headers: getHeaders(),
        });
    }

    @verifyLoggedIn
    static async delete(id: number) {

    }
};