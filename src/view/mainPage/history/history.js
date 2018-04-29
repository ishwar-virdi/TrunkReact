import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
import "../../../stylesheets/mainPage/history/history.css";
import Reconcile from "../history/reconcile";
import Footer from "../../components/content/footer";
class history extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render(){
        return (
            <div className="container">
                <Header clickedClass="History"/>
                <div className="body">
                    <Title title="RECONCILIATION PROGRESS"/>
                    <div className="history-search">

                    </div>
                    <div className="history-view">
                        <Reconcile/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
};

export default history;