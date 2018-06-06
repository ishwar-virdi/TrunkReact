import {Component} from "react";
import {Alert, Button, Label, ListGroup, ListGroupItem} from "react-bootstrap";
import React from "react";
import "../../../stylesheets/mainPage/upload/instruction.css";

export class BankStatementAlert extends Component {


    render () {

        return(
            <Alert bsStyle="info">
                <h4>Please make sure to upload a <strong>Bank statement</strong> with following header </h4>
                <ListGroup >
                    <ListGroupItem bsStyle="success"> * Account description * Account number * Currency,Date * Description of transaction * Debits * Credits * Balance</ListGroupItem>
                </ListGroup>
        </Alert>)
    }
}

export class SettlementStatementAlert extends Component {


    render () {
        return(
            <Alert bsStyle="info">
                <h4>Please make sure to upload a <strong>Settlement statement</strong> with following header </h4>
                <ListGroup >
                    <ListGroupItem bsStyle="success"> * YourBankReference * TransactionSource * OrderType * PrincipalAmount * SurchargeAmount * Amount * Currency * OrderNumber * CustomerReferenceNumber * CustomerName * ECI * User * NoRetries * OriginalOrderNumber * OriginalCustomerReferenceNumber * SummaryCode * ResponseCode * ResponseText * ReceiptNumber * SettlementDate * CardSchemeName * CreditGroup * TransactionDateTime * Status * AuthorisationId * FileName * BPAY Ref * BPAY * Ref * for * Excel * YourSurchargeAccount * Product Purchased * Custom Field 2 * Custom Field 3 * Custom Field 4 * CustomerPayPalAccount * YourPayPalAccount * ParentTransactionReceiptNumber * CustomerBankReference * CustomerIpAddress * FraudResult * CustomerIpCountry * CardCountry</ListGroupItem>
                </ListGroup>
            </Alert>)
    }
}
