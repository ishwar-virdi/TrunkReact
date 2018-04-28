import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
import SearchBar from "../../components/content/searchBar";
import "../../../stylesheets/mainPage/result/result.css";
import Reconcile from "../result/reconcile";
import Footer from "../../components/content/footer";
class result extends Component{

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
                    <Title title="RECONCILIATION PROGRESS"/>
                    <div className="result-search">
                        <SearchBar/>
                    </div>
                    <div className="result-view">
                        <Reconcile/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
};

export default result;