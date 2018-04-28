import React from "react";
import "../../../stylesheets/mainPage/detail/transactionTable.css";

class TransactionTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isAllChecked: false
        }
    }

    componentDidMount() {
        this.setState({
            items: [
                {
                    isChecked: false,
                    dateTime: "07/04/2018 15:18",
                    description: "",
                    amount: "533",
                    accountNumber: "12345678",
                    transactionType: "Direct Debit",
                    reconciled: true,
                    rule: "1"
                },
                {
                    isChecked: false,
                    dateTime: "09/04/2018 10:05",
                    description: "",
                    amount: "158",
                    accountNumber: "12345678",
                    transactionType: "Visa",
                    reconciled: true,
                    rule: "1"
                },
                {
                    isChecked: false,
                    dateTime: "09/04/2018 10:20",
                    description: "",
                    amount: "697",
                    accountNumber: "12345678",
                    transactionType: "Direct Debit",
                    reconciled: false,
                    rule: "4"
                },
                {
                    isChecked: false,
                    dateTime: "09/04/2018 12:30",
                    description: "",
                    amount: "451",
                    accountNumber: "12345678",
                    transactionType: "Mastercard",
                    reconciled: false,
                    rule: "5"
                },
                {
                    isChecked: false,
                    dateTime: "09/04/2018 16:14",
                    description: "",
                    amount: "20",
                    accountNumber: "12345678",
                    transactionType: "Visa",
                    reconciled: true,
                    rule: "1"
                },
                {
                    isChecked: false,
                    dateTime: "07/04/2018 15:18",
                    description: "",
                    amount: "533",
                    accountNumber: "12345678",
                    transactionType: "Visa",
                    reconciled: true,
                    rule: "1"
                }
            ]
        });
    }

    selectOne = (isChecked, index) => {
        var items = this.state.items;

        items[index].isChecked = !isChecked;

        this.setState({
            items: items
        });
    }

    returnList = () => {
        const items = this.state.items;
        var list = [];

        for (var i = 0; i < items.length; i++) {
            list.push(<TransactionRow key={i} value={items[i]} isHeader={false} onChange={this.selectOne} index={i}/>);
        }

        return list;
    };

    selectAll = () => {
        var items = this.state.items;
        var changeTo = true;

        if (this.state.isAllChecked)
            changeTo = false;

        for (var i = 0; i < items.length; i++) {
            items[i].isChecked = changeTo;
        }

        this.setState({
            items: items,
            isAllChecked: changeTo
        });
    };

    render () {
        var list = this.returnList();
        var isAllChecked = true;

        for (var i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i].isChecked == false) {
                isAllChecked = false;
                break;
            }
        }

        const title  = {isChecked: isAllChecked,
                        dateTime: "Date/Time",
                        description: "Description",
                        amount: "Amount",
                        accountNumber: "Account Number",
                        transactionType: "Transaction Type",
                        reconciled: "Reconciled",
                        rule: "Rule"};

        return (
            <table className="transaction-table">
                <thead>
                    <TransactionRow value={title} isHeader={true} onChange={this.selectAll}/>
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

    render() {
        const value = this.props.value;
        let className = this.props.isHeader ? "table-header" : "table-row";

        const isChecked = value.isChecked;
        const dateTime = value.dateTime;
        const description = value.description;
        const amount = value.amount;
        const accountNumber = value.accountNumber;
        const transactionType = value.transactionType;
        const reconciled = value.reconciled;
        const rule = value.rule;

        return (
            <tr className={className}>
                <td><InputCheckbox value={isChecked} onChange={this.props.onChange} index={this.props.index}/></td>
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

class InputCheckbox extends React.Component {
    constructor(props) {
        super(props);
    }

    handleOnChange = () => {
        if (this.props.index != null)
            this.props.onChange(this.props.value, this.props.index);
        else
            this.props.onChange()
    };

    render() {
        return (
            <input checked={this.props.value} type='checkbox' onChange={this.handleOnChange}/>
        )
    }
}

export default TransactionTable;
