import * as React from "react";
import "./Funds.css";

import { Table } from "react-bootstrap";


export default function Funds() {
    return (
        <div className="Funds">
            <Table>
                <thead>
                    <tr>
                        <th>Fund Name</th>
                        <th>Balance</th>
                    </tr>
                </thead>
            </Table>
        </div>
    );
}