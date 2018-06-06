
import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
//import "../../../stylesheets/mainPage/detail/detail.css";
import Footer from "../../components/content/footer";
import TransactionTable from "../detail/transactionTable"

class detail extends Component{

    constructor(props) {
        super(props);
        this.state = {
            id : props.match.params.id,
            title:"Reconcile Results " + props.match.params.id,
        };
    }

    render(){
        return (
            <div className="container">
                <Header clickedClass="Result"/>
                <div className="body">
                    <Title title={this.state.title}/>
                    <div className="detail-view">
                        <TransactionTable
                            id={this.state.id}
                            />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
export default detail;