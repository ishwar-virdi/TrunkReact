import {Component} from "react";
//import "../../../../stylesheets/mainPage/upload/success/uploadSuccItem.css";
import React from "react";
import moment from "moment";

class UploadSuccessItem extends Component{


    returnList(){
        let list = [];
        if("SETTLEMENT" === this.props.type){
            let isTitle = this.props.isTitle;
            if(isTitle === "true"){
                list.push(<div key="0" className="uploadSucc-table-short fontBold"><p>{this.props.value[0]}</p></div>);
                list.push(<div key="1" className="uploadSucc-table-short fontBold"><p>{this.props.value[1]}</p></div>);
                list.push(<div key="2" className="uploadSucc-table-short fontBold"><p>{this.props.value[2]}</p></div>);
                list.push(<div key="3" className="uploadSucc-table-long fontBold"><p>{this.props.value[3]}</p></div>);
            }else{
                list.push(<div key="0" className="uploadSucc-table-short"><p>{this.props.value[0]}</p></div>);
                list.push(<div key="1" className="uploadSucc-table-short"><p>{this.props.value[1]}</p></div>);
                list.push(<div key="2" className="uploadSucc-table-short"><p>{this.props.value[2]}</p></div>);
                list.push(<div key="3" className="uploadSucc-table-long"><p>{this.props.value[3]}</p></div>);
            }

        }else if("BANKSTATEMENT" === this.props.type){
            let date = moment(this.props.value[0]).format('DD MMM. YY');
            let isTitle = this.props.isTitle;
            if(isTitle === "true"){
                list.push(<div key="0" className="uploadSucc-table-short fontBold"><p>{this.props.value[0]}</p></div>);
                list.push(<div key="1" className="uploadSucc-table-long fontBold"><p>{this.props.value[1]}</p></div>);
                list.push(<div key="2" className="uploadSucc-table-short fontBold"><p>{this.props.value[2]}</p></div>);
                list.push(<div key="3" className="uploadSucc-table-short fontBold"><p>{this.props.value[3]}</p></div>);
            }else{
                list.push(<div key="0" className="uploadSucc-table-short"><p>{date}</p></div>);
                list.push(<div key="1" className="uploadSucc-table-long"><p>{this.props.value[1]}</p></div>);
                list.push(<div key="2" className="uploadSucc-table-short"><p>{this.props.value[2]}</p></div>);
                list.push(<div key="3" className="uploadSucc-table-short"><p>{this.props.value[3]}</p></div>);
            }
        }
        return list;
    }
    render(){
        let list = this.returnList();
        return (
            <li>
                {list}
            </li>
        )
    }
};

export default UploadSuccessItem;