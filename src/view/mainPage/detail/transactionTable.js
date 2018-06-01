import React from "react";
import "../../../stylesheets/mainPage/detail/transactionTable.css";
import NumberFormat from 'react-number-format';
import {apiurl, selfurl} from "../../../config/constants";
import axios from "axios/index";
import ReactTable from "react-table";
import moment from "moment";

class TransactionTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            selected: {},
            selectAll: 0,
            notDataFound:"rt-notDateFound rt-notDateFound-hidden",
        };

        this.jsonToResult = this.jsonToResult.bind(this);

    }

    componentDidMount() {
        this.props.visibleLoading("true");
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
                this.props.visibleLoading("false");
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
                let date = moment(data[0].date,"MMM DD, YYYY HH:mm").format('MMMM YYYY');
                this.props.setTitle("Reconcile Results: " + date);
                for(let i = 0; i < data.length;i++){
                    details.push(this.jsonToResult(data[i]));
                }
                this.setState({
                    items: details,
                    selectAll: 0
                });
        }).then((error)=>{
            this.props.visibleLoading("false");
        });;
    };

    jsonToResult = (json) =>{
        let result = {};
        result.isChecked = false;
        result.dateTime = json.date.slice(0, -12);
        result.description = json.description;
        result.amount = <NumberFormat value={json.amount} displayType={'text'} thousandSeparator={true} prefix={'$'}/>;
        result.receiptNumber = json.accountNumber;
        result.transactionType = json.transactionType;
        if (json.status)
            result.reconciled = "Success";
        else
            result.reconciled = "Failed";
        result.rule = json.rule;
        return result;
    };

    markAsReconciled = () => {
        console.log(this.state.selected);
        this.props.visibleLoading("true");
        axios({
            withCredentials: true,
            method: 'POST',
            url: apiurl + "/api/markReconcile",
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            },
            data: {
                markAsReconcile: true,
                items: this.state.selected
            }
        })
            .then(
                (response) => {
                    this.props.visibleLoading("false");
                    let data = response.data;
                    // if(data === ""){
                    //     localStorage.clear();
                    //     this.forceUpdate();
                    //     return;
                    // }
                }).then((error)=>{
            this.props.visibleLoading("false");
        });
        /*var items = this.state.items;

        for (var i = 0; i < items.length; i++) {
            if (items[i].isChecked) {
                items[i].reconciled = true;
                items[i].rule = "Manually Marked"
            }
        }

        this.setState({
            items: items
        });*/
    };

    markAsNotReconciled = () => {
        console.log(this.state.selected);
        this.props.visibleLoading("true");
        axios({
            withCredentials: false,
            method: 'POST',
            url: apiurl + "/api/markReconcile",
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            },
            data: {
                markAsReconcile: true,
                items: this.state.selected
            }
        })
            .then(
                (response) => {
                    this.props.visibleLoading("false");
                    let data = response.data;
                    // if(data === ""){
                    //     localStorage.clear();
                    //     this.forceUpdate();
                    //     return;
                    // }
                })
            .then((error)=>{
            this.props.visibleLoading("false");
        });

/*        var items = this.state.items;

        for (var i = 0; i < items.length; i++) {
            if (items[i].isChecked) {
                items[i].reconciled = false;
                items[i].rule = "Manually Marked"
            }
        }

        this.setState({
            items: items
        });*/
    };

    toggleRow(receiptNumber) {
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[receiptNumber] = !this.state.selected[receiptNumber];

        this.setState({
            selected: newSelected,
            selectAll: 2
        });
    }

    toggleSelectAll = () => {
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

        return (
            // Defining table structure
            <div>
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
            </div>

        );
    }
}

export default TransactionTable;
