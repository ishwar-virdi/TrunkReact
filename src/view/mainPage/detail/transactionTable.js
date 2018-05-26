import React from "react";
import "../../../stylesheets/mainPage/detail/transactionTable.css";
import TransactionRow from './transactionRow';
import {apiurl} from "../../../config/constants";
import axios from "axios/index";

class TransactionTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isAllChecked: false
        };

        this.jsonToResult = this.jsonToResult.bind(this);

    }

    componentDidMount() {
        this.props.visibleLoading("true");
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
                    isAllChecked: false
                });
        });
    }

    jsonToResult = (json) =>{
        let result = {};
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
            list.push(<TransactionRow key={i} value={items[i]} isHeader={false} selectChanged={this.selectOne} index={i} backTo={this.props.id}/>);
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
                        dateTime: "Transaction Date",
                        description: "Customer",
                        amount: "Amount",
                        accountNumber: "Receipt Number",
                        transactionType: "Transaction Type",
                        reconciled: "Reconciled?",
                        rule: "Reconciled Method"
        };

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

export default TransactionTable;
