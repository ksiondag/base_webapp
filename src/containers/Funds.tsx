import * as React from "react";
import "./Funds.css";

import { Table } from "react-bootstrap";

import * as api from "../api/base";

export default function Funds() {
    const [funds, setFunds] = React.useState([]);

    React.useEffect(() => {
        fetchFunds();
    }, []);

    const fetchFunds = async () => {
        const funds = await api.fetchFunds();

        if (!funds.detail) {
            setFunds(funds)
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