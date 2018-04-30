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
        this.state=({
            sort:"time",
            searchResult:[],
        });
    }

    componentDidMount() {
    }

    setSearchResult(result) {
        this.setState({
            searchResult: result
        });
    }

    setSort(displaySort) {
        if(displaySort === this.state.sort){
            return;
        }

        this.setState({
            sort: displaySort
        });
    }

    render(){
        return (
            <div className="container">
                <Header clickedClass="Result"/>
                <div className="body">
                    <Title title="RECONCILIATION PROGRESS"/>
                    <div className="result-search">
                        <SearchBar setSort={(sort) => this.setSort(sort)} setSearchResult={(result) => this.setSearchResult(result)}/>
                    </div>
                    <div className="result-view">
                        <Reconcile  sort={this.state.sort} searchResult={this.state.searchResult} setSort={(sort) => this.setSort(sort)}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
};

export default result;
