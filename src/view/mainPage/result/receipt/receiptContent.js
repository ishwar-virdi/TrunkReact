import {Component} from "react";
import ReceiptTable from "./receiptTable";
import { Link} from 'react-router-dom';
import "../../../../stylesheets/mainPage/result/receipt/receiptContent.css";
import React from "react";


class ReceiptContent extends Component{

    constructor(props) {
        super(props);
        this.state={
            receipt:props.receipt,
            transaction:{
                header:["Transaction",""],
                date:["Transaction Date","22/04/2018"],
                time:["Transaction Time","15:20"],
                reNumber:["Receipt Number","#32456675#"],
                MID:["Merchant ID","TEST"],
                TranSource:["Transaction Source",""]
            },
            status:{
                header:["Status","Success"],
                date:["Manually Marked","False"],
            },
            statement:{
                header:["Statement",""],
                date:["Statement Date","21/04/2018"],
            },
            card:{
                header:["Card",""],
                date:["Card PAN","1234 5647 9879 2313"],
                time:["Card Scheme","VISA"],
                reNumber:["Currency","AUD"],
            },
            amount:{
                header:["Amount",""],
                date:["Principle Amount","52"],
                time:["Surcharge",""],
            },
        }
    };


    componentDidMount() {
    }

    render(){
        return (
            <div className="receipt-content">
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
                            <ReceiptTable data={this.state.statement}/>
                        </div>
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