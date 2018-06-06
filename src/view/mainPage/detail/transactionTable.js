import React from "react";
//import "../../../stylesheets/mainPage/detail/transactionTable.css";
import NumberFormat from 'react-number-format';
import {apiurl, selfurl} from "../../../config/constants";
import axios from "axios/index";
import ReactTable from "react-table";
import {Redirect} from "react-router-dom";
import Loading from "../../components/content/loading";

class TransactionTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            selected: {},
            selectAll: 0,
            notDataFound:"rt-notDateFound rt-notDateFound-hidden",
            loading:"false",
        };

        this.jsonToResult = this.jsonToResult.bind(this);
        this.markAsNotReconciled = this.markAsNotReconciled.bind(this);
        this.markAsReconciled = this.markAsReconciled.bind(this);
    }

    componentDidMount() {
        this.setState({
            loading:"true",
        });
        this.setState({
            notDataFound:"rt-notDateFound rt-notDateFound-hidden"
        });
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

                let data = response.data;

                if(data === ""){
                    localStorage.clear();
                    this.forceUpdate();
                    return;
                }
                if(response.data.length === 0){
                    this.setState({
                        notDataFound:"rt-notDateFound"
                    });
                    return;
                }

                let details = [];
                for(let i = 0; i < data.length;i++){
                    details.push(this.jsonToResult(data[i]));
                }
                this.setState({
                    items: details,
                    selectAll: 0,
                    loading:"false",
                });
        }).then((error)=>{
            this.setState({
                loading:"false",
            });
        });
    };

    jsonToResult(json){
        let result = {};
        result.isChecked = false;
        result.dateTime = json.date.slice(0, -12);
        result.description = json.description;
        result.amount = <NumberFormat value={json.amount} displayType={'text'} thousandSeparator={true} prefix={'$'}/>;
        result.receiptNumber = json.accountNumber;
        result.transactionType = json.transactionType;
        if (json.status){
            result.reconciled = "Success";
        }else{
            result.reconciled = "Unsuccessful";
        }
        result.rule = json.rule;
        return result;
    };

    markAsReconciled (){
        this.setState({
            loading:"true",
        });
        let selectedItemKey = Object.keys(this.state.selected);
        let selectedItems = [];
        for(let i = 0, keys = selectedItemKey.length;i<keys;i++){
            if(this.state.selected[selectedItemKey[i]] === true){
                selectedItems.push(selectedItemKey[i]);
            }
        }
        axios({
            withCredentials: true,
            method: 'POST',
            url: apiurl + "/api/markReconcile",
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            },
            data: {
                markAsReconcile: true,
                items: selectedItems,
            }
        })
            .then(
                (response) => {
                    this.setState({
                        loading:"true",
                    });
                    let data = response.data;
                    if(data === ""){
                        localStorage.clear();
                        this.forceUpdate();
                        return;
                    }
                    if(data.result === "success"){
                        let items = this.state.items;
                        for(let i = 0,selectedLength = selectedItems.length;i<selectedLength;i++){
                            let id = Number(selectedItems[i]);
                            for(let j = 0, itemLen = items.length;j<itemLen;j++){
                                if(items[j].receiptNumber === id){
                                    items[j].reconciled = "Success";
                                    items[j].rule = "Manually Reconciled";
                                    break;
                                }
                            }
                        }
                        this.setState({
                            items: items,
                            loading:"false",
                        });
                    }
                }).then((error)=>{
            this.setState({
                loading:"false",
            });
        });
    };

    markAsNotReconciled () {
        this.setState({
            loading:"true",
        });
        let selectedItemKey = Object.keys(this.state.selected);
        let selectedItems = [];
        for(let i = 0, keys = selectedItemKey.length;i<keys;i++){
            if(this.state.selected[selectedItemKey[i]] === true){
                selectedItems.push(selectedItemKey[i]);
            }
        }
        axios({
            withCredentials: true,
            method: 'POST',
            url: apiurl + "/api/markReconcile",
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            },
            data: {
                markAsReconcile: false,
                items: selectedItems,
            }
        })
            .then(
                (response) => {

                    let data = response.data;
                    if(data === ""){
                        localStorage.clear();
                        this.forceUpdate();
                        return;
                    }
                    if(data.result === "success"){
                        let items = this.state.items;
                        for(let i = 0,selectedLength = selectedItems.length;i<selectedLength;i++){
                            let id = Number(selectedItems[i]);
                            for(let j = 0, itemLen = items.length;j<itemLen;j++){
                                if(items[j].receiptNumber === id){
                                    items[j].reconciled = "Failed";
                                    items[j].rule = "Manually Not Reconciled";
                                    break;
                                }
                            }
                        }
                        this.setState({
                            items: items,
                            loading:"false",
                        });
                    }
                })
            .then((error)=>{
                this.setState({
                    loading:"false",
                });
        });

    };

    toggleRow(receiptNumber) {

        const newSelected = Object.assign({}, this.state.selected);
        newSelected[receiptNumber] = !this.state.selected[receiptNumber];
        this.setState({
            selected: newSelected,
            selectAll: 2
        });
    }

    toggleSelectAll(){
        let newSelected = {};

        if (this.state.selectAll === 0) {
            this.state.items.forEach(item => {
                newSelected[item.receiptNumber] = true;
            });
        }

        this.setState({
            selected: newSelected,
            selectAll: this.state.selectAll === 0 ? 1 : 0
        });
    };

    render () {
        // Table structure
        const { items } = this.state;
        const isLogin = localStorage.getItem('login');

        return (
            // Defining table structure
            <div>
                {
                    isLogin === null ? (<Redirect to={{pathname:'/login'}}/>)
                        : null
                }
                <div className="transaction-btn-group">
                    <p className="transition" onClick={this.markAsReconciled}>Mark as Reconciled</p>
                    <p className="transition" onClick={this.markAsNotReconciled}>Mark as Failed</p>
                </div>
                <ReactTable
                    data={items}
                    columns={[
                        {
                            id: "checkbox",
                            accessor: "",
                            Header: x => {
                                return (
                                    <input type="checkbox" className="checkbox"
                                           checked={this.state.selectAll === 1}
                                           ref={input => {
                                               if (input) {
                                                   input.indeterminate = this.state.selectAll === 2;
                                               }
                                           }}
                                           onChange={() => this.toggleSelectAll()}
                                    />
                                );
                            },
                            Cell: ({ original }) => {
                                return (
                                    <input type="checkbox" className="checkbox"
                                           checked={this.state.selected[original.receiptNumber] === true}
                                           onChange={() => this.toggleRow(original.receiptNumber)}
                                    />
                                );
                            },

                            sortable:false,
                            width: 45
                        },
                        {
                            Header: "Transaction Date",
                            accessor: "dateTime"
                        },
                        {
                            Header: "Customer Name",
                            accessor: "description"
                        },
                        {
                            Header: "Amount",
                            accessor: "amount"
                        },
                        {
                            Header: "Receipt Number",
                            accessor: "receiptNumber"
                        },
                        {
                            Header: "Transaction Type",
                            accessor: "transactionType"
                        },
                        {
                            Header: "Reconciled ",
                            accessor: "reconciled"
                        },
                        {
                            Header: "Rule",
                            accessor: "rule"
                        }
                    ]
                    }
                    // Default page size
                    defaultPageSize={20}


                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick: (e, handleOriginal) => {
                                if (column.id === "checkbox")
                                    return;

                                if(rowInfo) {
                                    let account = rowInfo['original']['receiptNumber'];

                                    let link = selfurl + "/transactiondetails/" + this.props.id + "/" + account

                                    window.open(link,"_self");
                                }
                                if (handleOriginal) {
                                    handleOriginal();
                                }
                            }
                        };
                    }}
                    noDataText = ''
                />
                <br />
                <div className={this.state.notDataFound}>
                    <p>No data Found</p>
                </div>
                <Loading visible={this.state.loading}/>
            </div>

        );
    }
}

export default TransactionTable;
