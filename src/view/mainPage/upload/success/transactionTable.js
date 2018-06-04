import {Component} from "react";
import axios from "axios/index";
import {apiurl} from "../../../../config/constants";
//import "../../../../stylesheets/mainPage/upload/success/uploadSuccTable.css";
import React from "react";
import UploadSuccessItem from "./uploadSuccessItem";
import Loading from "../../../components/content/loading";
import {Link, Redirect} from "react-router-dom";
class UploadSuccTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fileName:null,
            number:0,
            title:{},
            type:null,
            transactions:[],
            visible:"false",
            successLabel:"Successfully Uploaded",
            successBar:"uploadSucc-processBar uploadBar-success",
            noDataLabel:"",
        };
    }

    componentDidMount(){
        this.setState({
            visible:"true",
        });
        axios({
            withCredentials: true,
            method: 'GET',
            url: apiurl + "/api/v1/uploadRecords",
        })
            .then(
                (response) => {

                    console.log(response);
                    if(response.data === ""){
                        localStorage.clear();
                        this.forceUpdate();
                        return;
                    }
                    this.setState({
                        visible:"false",
                    });
                    let data = response.data;
                    let transactions = [];
                    let number = 0;
                    if(data.result === "fail"){
                        this.setState({
                            noDataLabel:"No data be found",
                            successLabel:"You have not upload any documents",
                            successBar:"uploadSucc-processBar uploadBar-fail",
                        });
                        return;
                    }
                    if(data.transactions[0] == null){
                        this.setState({
                            noDataLabel:"No data to show",
                            successLabel:"No New Transactions have been added. Duplicate File used.",
                            successBar:"uploadSucc-processBar uploadBar-fail",
                        });
                        return;
                    }
                    let keys = Object.keys(data.transactions[0]);
                    for(let i=0,length = data.transactions.length;i<length;i++){
                        transactions.push(this.jsonToData(keys,data.transactions[i]));
                        number++;
                    }
                    this.setState({
                        fileName: data.fileName,
                        title:keys,
                        type:data.type,
                        number:number,
                        transactions:transactions,
                    });
                },
                (error) => {
                    this.setState({
                        visible:"false",
                    });
                    console.log(error);
                }
            );
    }

    componentWillUnmount() {
        this.setState({
            visible:"false"
        });
    }

    jsonToData(key,value){
        let transaction = [];
        for(let i = 0,length = key.length;i<length;i++){

            if(isNaN(Number(value[key[i]]))){
                value[key[i]] = value[key[i]].replace(/"/g,"");
            }
            transaction.push(value[key[i]]);
        }
        return transaction;
    }

    returnTitle = () =>{
        let lists = [];
        let titles = this.state.title;
        let displayTitles = [];
        for (let i = 0,length = titles.length;i < length; i++){
            let displayTitle = "";
            for(let j = 0,letterLen = titles[i].length; j<letterLen; j++){
                if(j === 0){
                    displayTitle += titles[i][j].toUpperCase();
                }else if(/[A-Z]/.test(titles[i][j]) === true){
                    displayTitle += " " + titles[i][j];
                }else{
                    displayTitle += titles[i][j];
                }

                if(j === titles[i].length-1){
                    displayTitles[i] = displayTitle;
                }
            }
        }
        lists.push(<UploadSuccessItem key="-1" type={this.state.type} value={displayTitles} isTitle="true"/>);
        return lists;
    };
    returnTransactions = () =>{
        let lists = [];
        let transactions = this.state.transactions;
        for(let i = 0,length = transactions.length;i < length;i++){
            lists.push(<UploadSuccessItem key={i} type={this.state.type} value={transactions[i]} isTitle="false"/>);
        }
        return lists;
    };
    render() {
        let titles = this.returnTitle();
        let transactions = this.returnTransactions();
        const isLogin = localStorage.getItem('login');
        return (
            <div className="upload-view-Handler">
                {
                    isLogin === null ? (<Redirect to={{pathname:'/login'}}/>)
                        : null
                }
                <div className="uploadSucc-view-context">
                    <div className="upload-title">
                        <p>Import Documents</p>
                    </div>
                    <div className="uploadSucc-process">
                        <p>{this.state.successLabel} <span>{this.state.fileName}</span></p>
                        <div className={this.state.successBar}>
                        </div>
                    </div>
                    <div className="uploadSucc-received">
                        <div className="uploadSucc-file">
                            <p>We have received your file</p>
                        </div>
                        <div className="uploadSucc-records">
                            <span>It contains <span>{this.state.number}</span> transactions</span>
                        </div>
                        <div className="uploadSucc-preview">
                            <p>This is a preview of the document</p>
                        </div>
                    </div>
                    <div className="uploadSucc-table">
                        <ul>
                            {titles}
                            {transactions}
                        </ul>
                        <p className="uploadSucc-NoData">{this.state.noDataLabel}</p>
                    </div>
                    <div className="uploadSucc-ButtonHandler">
                        <Link to={{pathname:"/upload"}} className="transition">Back</Link>
                    </div>
                </div>
                <Loading visible={this.state.visible}/>
            </div>
        );
    }
}

export default UploadSuccTable;