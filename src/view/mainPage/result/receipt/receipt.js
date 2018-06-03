import React,{Component} from "react";
import Header from "../../../components/content/header";
import Title from "../../../components/content/title";
import ReceiptContent from "../../../mainPage/result/receipt/receiptContent"
import "../../../../stylesheets/mainPage/result/receipt/receipt.css";
import Footer from "../../../components/content/footer";
class receipt extends Component{

    constructor(props) {
        super(props);
        this.state={
            id:props.match.params.id,
            title: "RECEIPT NUMBER: " + props.match.params.id,
            backTo:props.match.params.backTo,
        };

    }

    componentDidMount() {
    }

    render(){
        return (
            <div className="containerUpdated">
                <Header clickedClass="Result"/>
                <div className="body">
                    <Title title={this.state.title}/>
                    <div className="recipe-view">
                        <ReceiptContent receipt={this.state.id} backTo={this.state.backTo}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
};

export default receipt;