import {Component} from "react";
import ReceiptTable from "./receiptTable";
import {Link} from 'react-router-dom';
import "../../../../stylesheets/mainPage/result/receipt/receiptContent.css";
import React from "react";
import axios from "axios/index";
import {apiurl} from "../../../../config/constants";
class ReceiptContent extends Component{
    constructor(props) {
        super(props);
        this.state={
            result:"",
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
        }
    };
    componentDidMount() {
        axios.get(apiurl + "/receipt/" + this.state.receipt)
            .then(
                (response) => {
                    if(response.data.result === "fail"){
                        this.setState({
                            result : response.data.reason
                        });
                    } else {
                        this.setState({
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
                    result : "Error in connect to Receipt API"
                });
                }
            )
    }
    render(){
        return (
            <div className="receipt-content">
                <h1>{this.state.result}</h1>
                <div className="receipt-content-table">
                    <div className="receipt-table">
                        <div>
                            <ReceiptTable data={this.state.transaction}/>
                        </div>
                        <div>
                            <ReceiptTable data={this.state.status}/>
                        </div>
                        <div>
                            <div className="receipt-table-reconciled">
                                <Link className="transition" to={{pathname:"/aaa/"}}>Mark as Reconciled</Link>
                            </div>
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
                        <Link className="transition" to={{pathname:"/detail/1"}}>Back</Link>
                    </div>
                </div>
            </div>
        )
    }
};
export default ReceiptContent;