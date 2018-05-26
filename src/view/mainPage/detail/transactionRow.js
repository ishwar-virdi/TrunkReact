import React from "react";
import "../../../stylesheets/mainPage/detail/transactionTable.css";
import NumberFormat from 'react-number-format';
import {selfurl} from "../../../config/constants";


class TransactionRow extends React.Component {

    constructor(props) {
        super(props);

        let className = this.props.isHeader ? "table-header" : "table-row";

        this.state = {
            backTo: this.props.backTo,
            isHeader: this.props.isHeader,
            className : className,
            isChecked : this.props.value.isChecked,
            dateTime : this.props.value.dateTime,
            description : this.props.value.description,
            accountNumber : this.props.value.accountNumber,
            transactionType : this.props.value.transactionType,
            rule : this.props.value.rule,
        };

        this.rowClicked = this.rowClicked.bind(this);

    }

    rowClicked = (link) => {
        window.open(link,"_self");
    };

    render() {
        const value = this.props.value;

        var amount = value.amount;
        var reconciled = "Successful";

        //Formats the amount if it is not the header
        if (!this.state.isHeader)
            amount = <NumberFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'}/>;

        if (!value.reconciled && !this.props.isHeader)
            reconciled = "Failed";


        return (
            <tr className={this.state.className} onClick={() => {
                if(!this.props.isHeader){
                    this.rowClicked(selfurl + "/transactiondetails/" + this.state.backTo + "/" + this.state.accountNumber);
                }
                }}>
                <td><InputCheckbox value={this.state.isChecked} onChange={this.props.selectChanged} index={this.props.index}/></td>
                <td>{this.state.dateTime}</td>
                <td>{this.state.description}</td>
                <td>{amount}</td>
                <td>{this.state.accountNumber}</td>
                <td>{this.state.transactionType}</td>
                <td>{reconciled}</td>
                <td>{this.state.rule}</td>
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
