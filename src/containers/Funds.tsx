import * as React from "react";
import "./Funds.css";

import { Table } from "react-bootstrap";

import fundsApi from "../api/funds";
import * as token from "../api/token";
import { RouterAppProps } from "../interfaces";

export default function Funds(props: React.PropsWithChildren<RouterAppProps>) {
    const [funds, setFunds] = React.useState([]);

    React.useEffect(() => {
        loadFunds();
    }, []);

    const loadFunds = async () => {
        const response = await fundsApi.get();

        if (response.success) {
            setFunds(response.funds)
        } else if (!await token.verify()) {
            props.history.push("/login");
        } else {
            alert(response.message)
        }
    }

    return (
        <div className="Funds">
            <Table>
                <thead>
                    <tr>
                        <th>Fund Name</th>
                        <th>Balance</th>
                    </tr>
                    {
                        funds.map(({ id, name, balance }) => {
                            return <tr key={id}>
                                <td>{name}</td>
                                <td>{balance}</td>
                            </tr>
                        })
                    }
                </thead>
            </Table>
        </div>
    );
}