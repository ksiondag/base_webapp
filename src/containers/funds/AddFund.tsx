import * as React from "react";
import { FormControl, ButtonToolbar, Button } from "react-bootstrap";

interface AddFundProps {
    setAddFund: React.Dispatch<React.SetStateAction<boolean>>;
    saveFund: (name: string, balance: number) => Promise<void>;
};

export default function AddFund(props: React.PropsWithChildren<AddFundProps>) {
    const [fundName, setFundName] = React.useState("");
    const [balance, setBalance] = React.useState(0.00);

    return (
        <tr key="add">
            <td>
                <FormControl
                    autoFocus
                    value={fundName}
                    type="text"
                    placeholder="Fund name"
                    onChange={e => setFundName((e.target as HTMLTextAreaElement).value)}
                />
            </td>
            <td>
                <FormControl
                    type="text"
                    value={balance}
                    placeholder="0.00"
                    onChange={e => setBalance(parseFloat((e.target as HTMLTextAreaElement).value))}
                />
            </td>
            <td>
                <ButtonToolbar>
                    <Button onClick={() => props.saveFund(fundName, balance)}>Save</Button>
                    <Button onClick={() => props.setAddFund(false)}>Cancel</Button>
                </ButtonToolbar>
            </td>
        </tr>
    );
}