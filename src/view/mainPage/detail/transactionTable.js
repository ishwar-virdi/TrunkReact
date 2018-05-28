import React from "react";
import "../../../stylesheets/mainPage/detail/transactionTable.css";
import NumberFormat from 'react-number-format';
import {apiurl, selfurl} from "../../../config/constants";
import axios from "axios/index";
import ReactTable from "react-table";

class TransactionTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            selected: {},
            selectAll: 0
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
                    selectAll: 0
                });
        });
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
                items: Object.keys(this.state.selected)
            }
        })
            .then(
                (response) => {
                    this.props.visibleLoading("false");
                    if(response.data.result === "success"){
                        let details = [];

                        for(let i = 0; i < this.state.items.length;i++){
                            let currentRow = this.state.items[i];
                            if(typeof this.state.selected[currentRow.receiptNumber] !== 'undefined'){
                                currentRow.reconciled = "Success";
                                currentRow.rule = "Manually Reconciled";
                            }
                            details.push(currentRow);
                        };

                        this.setState({
                            items: details,
                            selected: {},
                            selectAll: 0
                        });
                    } else {

                    }
                })
            .catch(() => {
                this.props.visibleLoading("false");
            })

    };

    markAsNotReconciled = () => {
        this.props.visibleLoading("true");
        axios({
            withCredentials: false,
            method: 'POST',
            url: apiurl + "/api/markReconcile",
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            },
            data: {
                markAsReconcile: false,
                items: Object.keys(this.state.selected)
            }
        })
            .then(
                (response) => {
                    this.props.visibleLoading("false");
                    if(response.data.result === "success"){
                        let details = [];
                        for(let i = 0; i < this.state.items.length;i++){
                            let currentRow = this.state.items[i];
                            if(typeof this.state.selected[currentRow.receiptNumber] !== 'undefined'){
                                currentRow.reconciled = "Failed";
                                currentRow.rule = "Not Reconciled by AutoReconciler";
                            }
                            details.push(currentRow);
                        };
                        this.setState({
                            items: details,
                            selected: {},
                            selectAll: 0
                        });
                    } else {

                    }
                })
            .catch(() => {
                this.props.visibleLoading("false");
            })
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
                <ReactTable
                    data={items}
                    columns={[
                        {
                            id: "checkbox",
                            accessor: "",
                            Cell: ({ original }) => {
                                return (
                                    <input type="checkbox" className="checkbox"
                                           checked={this.state.selected[original.receiptNumber] === true}
                                           onChange={() => this.toggleRow(original.receiptNumber)}
                                    />
                                );
                            },
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
                />
                <br />
                <button type="button" onClick={this.markAsReconciled}>Mark as Reconciled</button>
                <button type="button" onClick={this.markAsNotReconciled}>Mark as Failed</button>
            </div>

        );
    }
}

export default TransactionTable;
