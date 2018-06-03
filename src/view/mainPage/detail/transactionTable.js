import React from "react";
import "../../../stylesheets/mainPage/detail/transactionTable.css";
import NumberFormat from 'react-number-format';
import {apiurl, selfurl} from "../../../config/constants";
import axios from "axios/index";
//React table
import ReactTable from "react-table";
// React button
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap'
import {ButtonToolbar} from 'react-bootstrap'

class TransactionTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // items: [],
       //filling dummy data for items

            items: [
                {
                    uniqueId: "0",
                    isChecked: false,
                    dateTime: "07/04/2018 15:20",
                    description: "",
                    amount: "533",
                    accountNumber: "12345678",
                    transactionType: "Direct Debit",
                    reconciled: true,
                    rule: "1"
                },
                {
                    uniqueId: "1",
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
                    uniqueId: "2",
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
                    uniqueId: "3",
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
                    uniqueId: "4",
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
                    uniqueId: "5",
                    isChecked: false,
                    dateTime: "07/04/2018 15:18",
                    description: "",
                    amount: "1460",
                    accountNumber: "12345678",
                    transactionType: "Visa",
                    reconciled: true,
                    rule: "1"
                }
            ],

            // filling end

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
                    // items: details,
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

    // markAsReconciled = () => {
    //     this.props.visibleLoading("true");
    //     axios({
    //         withCredentials: true,
    //         method: 'POST',
    //         url: apiurl + "/api/markReconcile",
    //         headers: {
    //             'Content-Type' : 'application/json; charset=utf-8'
    //         },
    //         data: {
    //             markAsReconcile: true,
    //             items: Object.keys(this.state.selected)
    //         }
    //     })
    //         .then(
    //             (response) => {
    //                 this.props.visibleLoading("false");
    //                 if(response.data.result === "success"){
    //                     let details = [];
    //
    //                     for(let i = 0; i < this.state.items.length;i++){
    //                         let currentRow = this.state.items[i];
    //                         if(typeof this.state.selected[currentRow.receiptNumber] !== 'undefined'){
    //                             currentRow.reconciled = "Success";
    //                             currentRow.rule = "Manually Reconciled";
    //                         }
    //                         details.push(currentRow);
    //                     };
    //
    //                     this.setState({
    //                         items: details,
    //                         selected: {},
    //                         selectAll: 0
    //                     });
    //                 } else {
    //
    //                 }
    //             })
    //         .catch(() => {
    //             this.props.visibleLoading("false");
    //         })
    //
    // };

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
                            // items: details,
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
                <ButtonToolbar className="transaction-table-ButtonToolbar">
                    <Button className="transaction-table-ButtonToolbarButton" bsStyle="success" bsSize="large" onClick={this.markAsReconciled}>Mark as Reconciled</Button>
                    <Button className="transaction-table-ButtonToolbarButton " bsStyle="danger" bsSize="large" onClick={this.markAsNotReconciled}>Mark as Failed</Button>
                </ButtonToolbar>
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
            </div>

        );
    }
}

export default TransactionTable;
