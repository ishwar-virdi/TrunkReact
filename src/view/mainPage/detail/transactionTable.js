import React from "react";
import "../../../stylesheets/mainPage/detail/transactionTable.css";

class TransactionTable extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({
            items: [
                {
                    dateTime: "07/04/2018 15:18",
                    description: "",
                    amount: "533",
                    accountNumber: "12345678",
                    transactionType: "Direct Debit",
                    reconciled: true,
                    rule: "1"
                },
                {
                    dateTime: "09/04/2018 10:05",
                    description: "",
                    amount: "158",
                    accountNumber: "12345678",
                    transactionType: "Visa",
                    reconciled: true,
                    rule: "1"
                },
                {
                    dateTime: "07/04/2018 15:18",
                    description: "",
                    amount: "533",
                    accountNumber: "12345678",
                    transactionType: "Direct Debit",
                    reconciled: true,
                    rule: "1"
                },
                {
                    dateTime: "07/04/2018 15:18",
                    description: "",
                    amount: "533",
                    accountNumber: "12345678",
                    transactionType: "Direct Debit",
                    reconciled: true,
                    rule: "1"
                },
                {
                    dateTime: "07/04/2018 15:18",
                    description: "",
                    amount: "533",
                    accountNumber: "12345678",
                    transactionType: "Direct Debit",
                    reconciled: true,
                    rule: "1"
                },
                {
                    dateTime: "07/04/2018 15:18",
                    description: "",
                    amount: "533",
                    accountNumber: "12345678",
                    transactionType: "Direct Debit",
                    reconciled: true,
                    rule: "1"
                }
            ]
        });
    }

    render () {
        return (
            <table>
                <tr>
                    <th><input type="checkbox" name="selectAll" /></th>
                    <th>Transaction Date/Time</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Account Number</th>
                    <th>Transaction Type</th>
                    <th>Reconciled?</th>
                    <th>Rule</th>
                </tr>
                <tr>
                    <td><input type="checkbox" name="selectAll" /></td>
                    <td>Smith</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td><input type="checkbox" name="selectAll" /></td>
                    <td>Jackson</td>
                    <td>94</td>
                </tr>
                <tr>
                    <th><input type="checkbox" name="selectAll" /></th>
                    <th>Lastname</th>
                    <th>Age</th>
                </tr>
                <tr>
                    <th><input type="checkbox" name="selectAll" /></th>
                    <th>Lastname</th>
                    <th>Age</th>
                </tr>
                <tr>
                    <th><input type="checkbox" name="selectAll" /></th>
                    <th>Lastname</th>
                    <th>Age</th>
                </tr>
            </table>
        );
    }
}

export default TransactionTable;
