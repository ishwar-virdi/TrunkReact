import {Component} from "react";
import ReceiptTable from "./receiptTable";
import {Link, Redirect} from 'react-router-dom';
//import "../../../../stylesheets/mainPage/result/receipt/receiptContent.css";
import React from "react";
import axios from "axios/index";
import {apiurl} from "../../../../config/constants";
import Loading from "../../../components/content/loading";

// importing bootstrap components
import {Alert, Button, ButtonToolbar} from "react-bootstrap";

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
                    console.log(response.data);
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

                    if(data.ReconcileStatusCode <= 1 || data.ReconcileStatusCode === 4)
                        btnText = "Mark as Reconciled";
                    else if (data.ReconcileStatusCode === 2 || data.ReconcileStatusCode === 3)
                        btnText = "Mark as Not Reconciled";

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
                        loadingVisible:"false",
                        result : "Error in Receipt API"
                    });
                }
            )
            .catch(() => {
                this.setState({
                    loadingVisible:"false",
                    result : "Error in calling Receipt API"
                });
            })
    }

    refreshPage(){
        window.location.reload()
    }

    /*Change the button colour according to the states of results */
    changeButtonColour(){
        let buttonStatus;

        if(this.state.btnText==="Mark as Reconciled"){
            buttonStatus="success"
        }else{
            buttonStatus="danger"
        }


        return buttonStatus.toString();
    }


    markAsReconcile(){
        let url = "";
        let btnText = "";
        let resultStatue = "";
        if(this.state.btnText === "Mark as Reconciled"){
            url =  apiurl + "/api/v1/manualReconcile/" + true + "/" + this.state.receipt;
            btnText = "Mark as Not Reconciled";
            resultStatue = "Manually Reconciled";
        }else if(this.state.btnText === "Mark as Not Reconciled"){
            url =  apiurl + "/api/v1/manualReconcile/" + false + "/" + this.state.receipt;
            btnText = "Mark as Reconciled";
            resultStatue = "Manually Not Reconciled";
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
                    if(data === ""){
                        localStorage.clear();
                        this.forceUpdate();
                        return;
                    }
                    if(data.result === "success"){
                        let status = this.state.status;
                        status.reconcileStatus[1] = resultStatue;
                        status.reconcileDate[1] = data.time;
                        this.setState({
                            status : status,
                            btnText: btnText,
                        });
                    }
                }
                ,
                (error) => {
                    this.setState({
                        loadingVisible:"false",
                        result : "Error in Receipt API"
                    });
                }
            ).catch(() => {
            this.setState({
                loadingVisible:"false",
                result: "Error in calling Receipt API"
            });
        })
    }


    render(){
        if (this.state.result==="Error in Receipt API"){
            return(

                <Alert bsStyle="warning">
                    <h1>{this.state.result}</h1>
                    <strong>Problem with connecting Database</strong> Please press the 'Try again' button...
                    <Button className="" bsStyle="danger" bsSize="large" onClick={ this.refreshPage} > Try again</Button>
                </Alert>
            )
        }else{
        const isLogin = localStorage.getItem('login');
        return (
            <div className="receipt-content">
                {
                    isLogin === null ? (<Redirect to={{pathname:'/login'}}/>)
                        : null
                }
                <h1>{this.state.result}</h1>

                <ButtonToolbar className="receiptContent-ButtonToolbar">
                    <Button className="receiptContent-ButtonToolbarButton" bsStyle="default" bsSize="large" ><Link className="transition" to={{pathname:"/reconciledresult/details/" + this.props.backTo}}>Back</Link></Button>
                    <Button className="receiptContent-ButtonToolbarButton " bsStyle={this.changeButtonColour()} bsSize="large" onClick={this.markAsReconcile}>{this.state.btnText}</Button>
                </ButtonToolbar>

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
                <Loading visible={this.state.loadingVisible}/>
            </div>
        )
    }
    }
};
export default ReceiptContent;
