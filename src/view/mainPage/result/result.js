import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
import SearchBar from "../../components/content/searchBar";
//import "../../../stylesheets/mainPage/result/result.css";
import Reconcile from "../result/reconcile";
import Footer from "../../components/content/footer";
import 'react-dates/initialize';
import DateRangePicker from "react-dates/esm/components/DateRangePicker";
import Loading from "../../components/content/loading";
import SearchNotFound from "./searchNotFound";

class result extends Component{

    constructor(props) {
        super(props);
        this.state=({
            sort:"time",
            searchResult:[],

            //loading
            loading:"false",

            //datePicker
            startDate:null,
            endDate:null,
            startDateId: "startDateId",
            endDateId: "endDateId",
            focusedInput:null,

            //search not found
            searchResultVisible:"false",
        });
    }



    setSearchResult(result) {
        this.setState({
            searchResult: result
        });
    }

    setNotFoundVisible(result) {
        this.setState({
            searchResultVisible: result,
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

    visibleLoading = (visible)=>{
        this.setState({
            loading:visible,
        });
    };

    render(){
        return (
            <div className="container">
                <Header clickedClass="Result"/>
                <div className="body">
                    <Title title="Reconciliation Results"/>
                    <div className="result-search">
                        <div className="result-search-bar">
                            <SearchBar setSort={(sort) => this.setSort(sort)}  // PropTypes.func.isRequired,
                                       setSearchResult={(result) => this.setSearchResult(result)} // PropTypes.func.isRequired,
                                       page = "result" // PropTypes.string.isRequired,
                                       visibleLoading = {(visible)=>this.visibleLoading(visible)} // PropTypes.string.isRequired,
                                       startDate = {this.state.startDate}
                                       endDate = {this.state.endDate}
                                       setNotFoundVisible = {(visible)=>this.setNotFoundVisible(visible)}
                            />
                        </div>
                    </div>
                    <div className="result-view">
                        <Reconcile  sort={this.state.sort}
                                    searchResult={this.state.searchResult}  // PropTypes.func.isRequired,
                                    setSort={(sort) => this.setSort(sort)}
                                    visibleLoading = {(visible)=>this.visibleLoading(visible)}
                                    setNotFoundVisible={(visible) => this.setNotFoundVisible(visible)}
                        />
                        <SearchNotFound visible={this.state.searchResultVisible}/>
                    </div>
                </div>
                <Loading visible={this.state.loading}/>
                <Footer/>
            </div>
        )
    }
};

 export default result;