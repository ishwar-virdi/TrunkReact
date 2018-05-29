import {Component} from "react";
import ReceiptTable from "./receiptTable";
import {Link} from 'react-router-dom';
import "../../../../stylesheets/mainPage/result/receipt/receiptContent.css";
import React from "react";
import axios from "axios/index";
import {apiurl} from "../../../../config/constants";
import Loading from "../../../components/content/loading";

class ReceiptContent extends Component{
    constructor(props) {
        super(props);
        this.state={
            result:"",
            loading : "true",
            receipt:props.receipt,
            transaction:{
                header:["Transaction",""],
                date:["Transaction Date",""],
                time:["Transaction Time",""],
                customerName:["Customer Name",""],
                MID:["Merchant ID",""],
                bankReference:["Bank Reference",""],
            },
            status:{
                header:["Status",""],
                date:["Settlement Date",""],
                reconcileStatus:["Reconcile Status",""],
                reconcileDate:["Reconciled Date",""]
            },
            card:{
                header:["Card",""],
                pan:["Card PAN",""],
                scheme:["Card Scheme",""],
                expiry:["Card Expiry",""],
            },
            amount:{
                header:["Amount",""],
                amount:["Principle Amount",""],
                surcharge:["Surcharge",""],
                currency:["Currency",""],
            },
        };
        this.markAsReconcile = this.markAsReconcile.bind(this);
    };

    componentDidMount() {
        this.setState({
            loading : "true",
            result : ""
        });

        axios.get(apiurl + "/receipt/" + this.state.receipt)
            .then(
                (response) => {
                    if(response.data.result === "fail"){
                        this.setState({
                            loading : "true",
                            result : response.data.reason
                        });
                    } else {
                        this.setState({
                            loading: "false",
                            transaction: {
                                header: ["Transaction", ""],
                                date: ["Transaction Date", response.data.TransactionDate],
                                time: ["Transaction Time", response.data.TransactionTime],
                                customerName: ["Customer Name", response.data.CustomerName],
                                MID: ["Merchant ID", response.data.MerchantID],
                                bankReference: ["Bank Reference", response.data.BankReference],
                            },
                            status: {
                                header: ["Status", response.data.Status],
                                date: ["Settlement Date", response.data.SettlementDate],
                                reconcileStatus: ["Reconcile Status", response.data.ReconcileStatus],
                                reconcileDate: ["Reconciled Date", response.data.ReconciledDate]
                            },
                            card: {
                                header: ["Card", ""],
                                pan: ["Card PAN", response.data.CardPAN],
                                scheme: ["Card Scheme", response.data.CardScheme],
                                expiry: ["Card Expiry", response.data.CardExpiry],
                            },
                            amount: {
                                header: ["Amount", ""],
                                amount: ["Principle Amount", response.data.PrincipleAmount],
                                surcharge: ["Surcharge", response.data.Surcharge],
                                currency: ["Currency", response.data.Currency],
                            },
                        });
                    }
                })
            .catch(() => {
                    this.setState({
                        loading: "false",
                        result : "Error in connect to Receipt API"
                    });
                }
            )
    }

    markAsReconcile(){
        this.setState({
            loading : "true",
            result : ""
        });

        axios.put(apiurl + "/manualReconcile/" + this.state.receipt)
            .then(
                (response) => {
                    if(response.data.result === "fail"){
                        this.setState({
                            loading: "false",
                            result : response.data.reason,
                            transaction: {
                                header: ["Transaction", ""],
                                date: ["Transaction Date", this.state.transaction.date],
                                time: ["Transaction Time", this.state.transaction.time],
                                customerName: ["Customer Name", this.state.transaction.customerName],
                                MID: ["Merchant ID", this.state.transaction.MID],
                                bankReference: ["Bank Reference", this.state.transaction.bankReference],
                            },
                            status: {
                                header: ["Status", this.state.status.header],
                                date: ["Settlement Date", this.state.status.date],
                                reconcileStatus: ["Reconcile Status", this.state.status.reconcileStatus],
                                reconcileDate: ["Reconciled Date", this.state.status.reconcileDate]
                            },
                            card: {
                                header: ["Card", ""],
                                pan: ["Card PAN", this.state.card.pan],
                                scheme: ["Card Scheme", this.state.card.scheme],
                                expiry: ["Card Expiry", this.state.card.expiry],
                            },
                            amount: {
                                header: ["Amount", ""],
                                amount: ["Principle Amount", this.state.amount.amount],
                                surcharge: ["Surcharge", this.state.amount.surcharge],
                                currency: ["Currency", this.state.amount.currency],
                            },
                        });
                    } else {
                        this.setState({
                            loading: "false",
                            result : response.data.reason,
                            status: {
                                header: ["Status", this.state.status.header[1]],
                                date: ["Settlement Date", this.state.status.date[1]],
                                reconcileStatus: ["Reconcile Status", response.data.ReconcileStatus],
                                reconcileDate: ["Reconciled Date", response.data.ReconciledDate]
                            },
                        });
                    }
                })
            .catch(() => {
                    this.setState({
                        loading: "false",
                        result : "Error in connect to Reconcile API"
                    });
                }
            )


    }

    render(){
        return (
            <div className="receipt-content">
                <h1>{this.state.result}</h1>
                <Loading visible={this.state.loading}/>
                <div className="receipt-content-table">
                    <div className="receipt-table">
                        <div>
                            <ReceiptTable data={this.state.transaction}/>
                        </div>
                        <div>
                            <ReceiptTable data={this.state.status}/>
                        </div>
                        <div>
                            {
                                this.state.status.reconcileStatus[1].valueOf() === "AutoReconciled" || this.state.status.reconcileStatus[1].valueOf() ===  "Manually Reconciled" ? null : (<div className="receipt-table-reconciled">
                                    <button onClick={this.markAsReconcile}>Mark as Reconciled</button>
                                </div>)
                            }
                        </div>
                    </div>
                    <div className="receipt-table">
                        <div>
                            <ReceiptTable data={this.state.card}/>
                        </div>
                        <div>
                            <ReceiptTable data={this.state.amount}/>
                        </div>
                    </div>
                </div>
                <div className="receipt-content-back">
                    <div className="receipt-back-btn">

                        <Link className="transition" to={{pathname:"/reconciledresult/details/" + this.props.backTo}}>Back</Link>
                    </div>
                </div>
            </div>
        )
    }
};
export default ReceiptContent;
