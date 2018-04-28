import React from "react";
import "../../../stylesheets/mainPage/detail/transactionTable.css";

class TransactionTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        }
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

    returnList = () => {
        const items = this.state.items;
        var list = [];

        for (var i = 0; i < items.length; i++) {
            list.push(<TransactionRow key={i} value={items[i]} />);
        }

        return list;

    };

    render () {
        var list = this.returnList();

        return (
            <table>
                <thead>
                    <TransactionRow />
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        );
    }
}

class TransactionRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rowClass: "reconciled-true"
        };
    }

    componentDidMount() {

    }

    render() {
        const value = this.props.value;

        const dateTime = value.dateTime;
        const description = value.description;
        const amount = value.amount;
        const accountNumber = value.accountNumber;
        const transactionType = value.transactionType;
        const reconciled = value.reconciled;
        const rule = value.rule;

        return (
            <tr className={}>
                <td><input type="checkbox" name="selectAll" /></td>
                <td>{dateTime}</td>
                <td>{description}</td>
                <td>{amount}</td>
                <td>{accountNumber}</td>
                <td>{transactionType}</td>
                <td>{reconciled}</td>
                <td>{rule}</td>
            </tr>
        );
    }
}

export default TransactionTable;
