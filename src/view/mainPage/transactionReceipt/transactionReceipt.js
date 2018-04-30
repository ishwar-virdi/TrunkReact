import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
import "../../../stylesheets/mainPage/transactionReceipt/transactionReceipt.css";
import Footer from "../../components/content/footer";
class transactionReceipt extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render(){
        return (
            <div className="container">
                <Header clickedClass="Result"/>
                <div className="body">
                    <Title title="RECEIPT NUMBER"/>
                    <div className="recipe-view">
                    <div>
                        whatever
                    </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
};

export default transactionReceipt;