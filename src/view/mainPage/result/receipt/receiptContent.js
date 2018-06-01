import {Component} from "react";
import ReceiptTable from "./receiptTable";
import {Link, Redirect} from 'react-router-dom';
import "../../../../stylesheets/mainPage/result/receipt/receiptContent.css";
import React from "react";
import axios from "axios/index";
import {apiurl} from "../../../../config/constants";
import Loading from "../../../components/content/loading";

const notReconcile = "Not Reconciled by AutoReconciler";
const reconcile = "Manually Reconciled";


class ReceiptContent extends Component{
    constructor(props) {
        super(props);
        this.state={
            loadingVisible:"false",
            receipt:props.receipt,
            btnText:"",
            transaction:{
                header:["Transaction",""],
                date:["Transaction Date",""],
                time:["Transaction Time",""],
                customerName:["Customer Name",""],
                MID:["Merchant ID",""],
                bankReference:["Bank Reference",""],
            },
            status:{
                header:["Reconcile Information",""],
                status:["Status",""],
                date:["Settlement Date",""],
                reconcileStatus:["Reconcile Status",""],
                reconcileDate:["Reconciled Date",""]
            },
            card:{
                header:["Card Details",""],
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
            loadingVisible:"true"
        });
        axios({
            withCredentials: true,
            method: 'GET',
            url: apiurl + "/api/v1/receipt/" + this.state.receipt,
        })
            .then(
                (response) => {
                    let data = response.data;
                    let transaction = {};
                    let status = {};
                    let card = {};
                    let amount = {};
                    let btnText = "";
                    this.setState({
                        loadingVisible:"false"
                    });
                    if(data === ""){
                        localStorage.clear();
                        this.forceUpdate();
                        return;
                    }else if(data.result === "fail"){
                        return;
                    }else{
                        transaction = {
                            header:["Transaction",""],
                            date:["Transaction Date",data.TransactionDate],
                            time:["Transaction Time",data.TransactionTime],
                            customerName:["Customer Name",data.CustomerName],
                            MID:["Merchant ID",data.MerchantID],
                            bankReference:["Bank Reference",data.BankReference],
                        };
                        status = {
                            header:["Reconcile Information",""],
                            status:["Status",data.Status],
                            date:["Settlement Date",data.SettlementDate],
                            reconcileStatus:["Reconcile Status",data.ReconcileStatus],
                            reconcileDate:["Reconciled Date",data.ReconciledDate]
                        };
                        card = {
                            header:["Card Details",""],
                            pan:["Card PAN",data.CardPAN],
                            scheme:["Card Scheme",data.CardScheme],
                            expiry:["Card Expiry",data.CardExpiry],
                        };
                        amount = {
                            header:["Amount",""],
                            amount:["Principle Amount",data.PrincipleAmount],
                            surcharge:["Surcharge",data.Surcharge],
                            currency:["Currency",data.Currency],
                        };
                    }

                    if(data.ReconcileStatus === reconcile){
                        btnText = "Mark as not Reconciled";
                    }else if(data.ReconcileStatus === notReconcile){
                        btnText = "Mark as Reconciled";
                    }

                    this.setState({
                        transaction:transaction,
                        status:status,
                        card:card,
                        amount:amount,
                        btnText:btnText,
                    });
                    console.log(response);

                },
                (error) => {
                    this.setState({
                        loadingVisible:"false"
                    });
                }
            )
    }

    markAsReconcile(){
        if(this.state.btnText === "Mark as Reconciled"){
            this.requestReconcile("reconcileBtn");
        }if(this.state.btnText === "Mark as not Reconciled"){
            this.requestReconcile("notReconcileBtn");
        }
    }

    requestReconcile(type){
        let url = "";
        let resultStatue = "";
        let btnText = "";
        if(type === "reconcileBtn"){
            url =  apiurl + "/api/v1/manualReconcile/" + this.state.receipt;
            resultStatue = reconcile;
            btnText = "Mark as not Reconciled";
        }else if(type === "notReconcileBtn"){
            url =  apiurl + "/api/v1/manualNotReconcile/" + this.state.receipt;
            resultStatue = notReconcile;
            btnText = "Mark as Reconciled";
        }else{
            throw new Error("type is wrong (reconcile or notReconcile)");
        }

        this.setState({
            loadingVisible:"true"
        });
        axios({
            withCredentials: true,
            method: 'PUT',
            url: url,
        })
            .then(
                (response) => {
                    this.setState({
                        loadingVisible:"false"
                    });
                    let data = response.data;
                    if(data.result === "success"){
                        let status = this.state.status;
                        status.reconcileStatus[1] = resultStatue;
                        this.setState({
                            status : status,
                            btnText: btnText,
                        });
                    }
                }
                ,
                (error) => {
                    this.setState({
                        loadingVisible:"false"
                    });
                }
            )
    }


    render(){
        const isLogin = localStorage.getItem('login');
        return (
            <div className="receipt-content">
                {
                    isLogin === null ? (<Redirect to={{pathname:'/login'}}/>)
                        : null
                }
                <h1>{this.state.result}</h1>
                <div className="receipt-content-table">
                    <div className="receipt-table">
                        <div>
                            <ReceiptTable data={this.state.transaction}/>
                            <ReceiptTable data={this.state.status}/>
                        </div>
                    </div>
                    <div className="receipt-table">
                        <div>
                            <ReceiptTable data={this.state.card}/>
                            <ReceiptTable data={this.state.amount}/>
                        </div>
                    </div>
                </div>
                <div className="receipt-content-btn-group">
                    <div className="receipt-content-btn">
                        <p className="transition" onClick={this.markAsReconcile}>{this.state.btnText}</p>
                    </div>
                    <div className="receipt-content-btn">
                        <Link className="transition default-btn" to={{pathname:"/reconciledresult/details/" + this.props.backTo}}>Back</Link>
                    </div>
                </div>
                <Loading visible={this.state.loadingVisible}/>
            </div>
        )
    }
};
export default ReceiptContent;
