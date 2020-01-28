import * as React from "react";
import "./Funds.css";

import { Table } from "react-bootstrap";


export default function Funds() {
    const [funds, setFunds] = React.useState([]);

    React.useEffect(() => {
        fetchFunds();
    }, []);

    const fetchFunds = async () => {
        const response = await fetch(`http://localhost:8000/api/funds/`, {
            method: `GET`,
            headers: {
                "Content-Type": `application/json`,
                "Authorization": `Bearer ${localStorage.getItem(`token`)}`,
            }
        });

        const json = await response.json();

        if (json.detail) {
            localStorage.removeItem(`token`);
        } else {
            setFunds(json)
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