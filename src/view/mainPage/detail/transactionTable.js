import React from "react";
import "../../../stylesheets/mainPage/detail/transactionTable.css";
import NumberFormat from 'react-number-format';
import {apiurl} from "../../../config/constants";
import axios from "axios/index";
import { withRouter } from 'react-router-dom'

class TransactionTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isAllChecked: false
        }
    }

    componentDidMount() {
        this.props.visibleLoading("true");
        console.log(this.props.id);
        axios({
            withCredentials: true,
            method: 'GET',
            url: apiurl + "/api/resultDetails/" + this.props.id,
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            }
        })
            .then(
            (response) => {
                this.props.visibleLoading("false");
                let data = response.data;
                let details = [];
                for(let i = 0; i < data.length;i++){
                    details.push(this.jsonToResult(data[i]));
                }
                this.setState({
                    items: details,
                });
            },
            (error) => {
                this.visibleLoading("false");
                console.log(error);
            }
        );

    }

    jsonToResult =(json) =>{
        let result = {};
        console.log(json);
        result.uniqueId = json.id;
        result.isChecked = false;
        result.dateTime = json.date.slice(0, -12);
        result.description = json.description;
        result.amount = json.amount;
        result.accountNumber = json.accountNumber;
        result.transactionType = json.transactionType;
        result.reconciled = json.status;
        result.rule = json.rule;
        return result;
    };
    selectOne = (isChecked, index) => {
        var items = this.state.items;

        items[index].isChecked = !isChecked;

        this.setState({
            items: items
        });
    };

    markAsReconciled = () => {
        var items = this.state.items;

        for (var i = 0; i < items.length; i++) {
            if (items[i].isChecked) {
                items[i].reconciled = true;
                items[i].rule = "Manually Marked"
            }
        }

        this.setState({
           items: items
        });
    };

    markAsNotReconciled = () => {
        var items = this.state.items;

        for (var i = 0; i < items.length; i++) {
            if (items[i].isChecked) {
                items[i].reconciled = false;
                items[i].rule = "Manually Marked"
            }
        }

        this.setState({
            items: items
        });
    };

    returnList = () => {
        const items = this.state.items;
        var list = [];

        for (var i = 0; i < items.length; i++) {
            list.push(<TransactionRow key={i} value={items[i]} isHeader={false} selectChanged={this.selectOne} index={i}/>);
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
            if (this.state.items[i].isChecked === false) {
                isAllChecked = false;
                break;
            }
        }

        const title  = {isChecked: isAllChecked,
                        dateTime: "Date",
                        description: "Customer",
                        amount: "Amount",
                        accountNumber: "Receipt Number",
                        transactionType: "Transaction Type",
                        reconciled: "Reconciled?",
                        rule: "Reconciled Method"};

        return (
            <div>
                <table className="transaction-table">
                    <thead>
                        <TransactionRow value={title} isHeader={true} selectChanged={this.selectAll}/>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
                <br />
                <button type="button" onClick={this.markAsReconciled}>Mark as Reconciled</button>
                <button type="button" onClick={this.markAsNotReconciled}>Mark as Failed</button>
            </div>
        );
    }
}

class TransactionRow extends React.Component {

    rowClicked = (accountNumber) => {
        window.open("https://trunksmartreconcilereact.herokuapp.com/transactiondetails/receipt/" + this.props.index,"_self");
        console.log(accountNumber);
        //window.open("http://localhost:3000/transactiondetails/" + accountNumber,"_self");
    };

    render() {
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
            <tr className={className} onClick={() => { this.rowClicked(accountNumber); }}>
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

export default TransactionTable;