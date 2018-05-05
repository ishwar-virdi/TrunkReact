import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
import "../../../stylesheets/mainPage/detail/detail.css";
import SearchBar from "../../components/content/searchBar";
import Footer from "../../components/content/footer";
import TransactionTable from "../detail/transactionTable"

class detail extends Component{

    constructor(props) {
        super(props);

        this.state = {
            id : props.match.params.id
        };

    }

    componentDidMount() {
    }

    render(){
        return (
            <div className="container">
                <Header clickedClass="History"/>
                <div className="body">
                    <Title title="SHOW RESULTS - TIME"/>
                    <div className="result-search">
                        <SearchBar/>
                    </div>
                    <div className="detail-view">
                        <TransactionTable/>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default detail;