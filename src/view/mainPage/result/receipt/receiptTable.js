import {Component} from "react";
import React from "react";
import "../../../../stylesheets/mainPage/result/receipt/receiptTable.css";
class ReceiptTable extends Component {

    constructor(props) {
        super(props);
        this.state={

        };

    }

    componentDidMount() {
        this.statusColor();
    }

    statusColor = () =>{
        let data = this.props.data;
        let keys = Object.keys(data);
        let value = data[keys[0]];
        if(value[0] === "Status" && value[1] === "Failed"){
            this.setState({
                fontColor:"fontRed",
            });
        }else if(value[0] === "Status" && value[1] === "Success"){
            this.setState({
                fontColor:"fontGreen",
            });
        }
    };
    returnHeader = () =>{
        let list = [];
        let data = this.props.data;
        let keys = Object.keys(data);
        let value = data[keys[0]];

        list.push(<tr key={0}><th>{value[0]}</th><th className={this.state.fontColor}>{value[1]}</th></tr>);

        return list;
    };

    returnBody = () =>{
        let list = [];
        let data = this.props.data;
        console.log(data);
        let keys = Object.keys(data);
        for(let i = 1 ; i < keys.length;i++){
            let value = data[keys[i]];
            list.push(<tr key={i}><td>{value[0]}</td><td>{value[1]}</td></tr>);
        }
        return list;
    };
    render(){
        let header = this.returnHeader();
        let body = this.returnBody();
        return (
            <table className="receipt-detail-table">
                <thead>
                    {header}
                </thead>
                <tbody>
                    {body}
                </tbody>
            </table>
        )
    };
};


export default ReceiptTable;