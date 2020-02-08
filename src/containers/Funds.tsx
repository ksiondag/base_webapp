import * as React from "react";
import "./Funds.css";

import { Table, ButtonToolbar, Button, FormControl } from "react-bootstrap";

import fundsApi from "../api/funds";
import * as token from "../api/token";
import { RouterAppProps } from "../interfaces";

interface Fund {
    id: number;
}

function DeleteFund(props: React.PropsWithChildren<Fund>) {
    return (
        <ButtonToolbar>
            <Button bsStyle="danger">Delete</Button>
        </ButtonToolbar>
    );
}

export default function Funds(props: React.PropsWithChildren<RouterAppProps>) {
    const [funds, setFunds] = React.useState([]);
    const [addFund, setAddFund] = React.useState(false);

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
                        <th>
                            <ButtonToolbar>
                                <Button onClick={() => setAddFund(true)}>Add</Button>
                            </ButtonToolbar>
                        </th>
                    </tr>
                    {addFund
                        ?
                        <tr key="add">
                            <td>
                                <FormControl
                                    type="text"
                                    placeholder="Fund name"
                                />
                            </td>
                            <td>
                                <FormControl
                                    type="text"
                                    placeholder="0.00"
                                />
                            </td>
                            <td>
                                <ButtonToolbar>
                                    <Button onClick={() => setAddFund(false)}>Cancel</Button>
                                </ButtonToolbar>
                            </td>
                        </tr>
                        :
                        <></>
                    }
                    {
                        funds.map(({ id, name, balance }) => {
                            return <tr key={id}>
                                <td>{name}</td>
                                <td>{balance}</td>
                                <td>
                                    <DeleteFund id={id} />
                                </td>
                            </tr>
                        })
                    }
                </thead>
            </Table>
        </div>
    );
}