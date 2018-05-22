import React from "react";
import "../../../stylesheets/mainPage/detail/transactionTable.css";
import NumberFormat from 'react-number-format';


class TransactionRow extends React.Component {

    rowClicked = (accountNumber,backTo) => {
        window.open("https://trunksmartreconcilereact.herokuapp.com/transactiondetails/"+ backTo +"/" + accountNumber,"_self");
        console.log(accountNumber);
        //window.open("http://localhost:3000/transactiondetails/" + accountNumber,"_self");
    };

    render() {
        const backTo = this.props.backTo;
        const value = this.props.value;
        let className = this.props.isHeader ? "table-header" : "table-row";
        var amount = value.amount;
        var reconciled = "Successful";

        //Formats the amount if it is not the header
        if (!this.props.isHeader)
            amount = <NumberFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'}/>;

        if (!value.reconciled && !this.props.isHeader)
            reconciled = "Failed";

        const isChecked = value.isChecked;
        const dateTime = value.dateTime;
        const description = value.description;
        const accountNumber = value.accountNumber;
        const transactionType = value.transactionType;
        const rule = value.rule;

        return (
            <tr className={className} onClick={() => { this.rowClicked(accountNumber,backTo); }}>
                <td><InputCheckbox value={isChecked} onChange={this.props.selectChanged} index={this.props.index}/></td>
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

    handleOnChange = () => {
        //If it is the "Select All" checkbox, then don't try and parse the props
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

export default TransactionRow;
