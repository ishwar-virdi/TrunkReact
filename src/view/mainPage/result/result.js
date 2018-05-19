import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
import SearchBar from "../../components/content/searchBar";
import RangeDatePicker from "../../components/datePicker/rangeDatePicker";
import "../../../stylesheets/mainPage/result/result.css";
import Reconcile from "../result/reconcile";
import Footer from "../../components/content/footer";
import DateRangePicker from "react-dates/esm/components/DateRangePicker";

class result extends Component{

    constructor(props) {
        super(props);
        this.state=({
            sort:"time",
            searchResult:[],

            //datePicker
            startDate:null,
            endDate:null,
            startDateId: "startDateId",
            endDateId: "endDateId",
            focusedInput:null
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
                        <div className="result-search-dataPicker">
                            <DateRangePicker
                                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                startDateId={this.state.startDateId} // PropTypes.string.isRequired,
                                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                endDateId={this.state.endDateId} // PropTypes.string.isRequired,
                                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                isOutsideRange={() => false}
                            />
                        </div>
                        <div className="result-search-bar">
                            <SearchBar setSort={(sort) => this.setSort(sort)}  // PropTypes.func.isRequired,
                                       setSearchResult={(result) => this.setSearchResult(result)} // PropTypes.func.isRequired,
                                       page = "result" // PropTypes.string.isRequired,
                                       startDate = {this.state.startDate}
                                       endDate = {this.state.endDate}
                            />
                        </div>
                    </div>
                    <div className="result-view">
                        <Reconcile  sort={this.state.sort}
                                    searchResult={this.state.searchResult}  // PropTypes.func.isRequired,
                                    setSort={(sort) => this.setSort(sort)}
                        />
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
};

export default result;
