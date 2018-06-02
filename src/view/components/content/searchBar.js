import React from 'react';
import "../../../stylesheets/content/searchBar.css";
import {apiurl} from "../../../config/constants";
import axios from "axios/index";
import moment from "moment";
import {Redirect} from "react-router-dom";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            searchInput:"",
            deleteIcon: "icon transition iconFontNonClickColor",
            isDelete:false,
            searchGreater: "Greater than 0 : \">10\"",
            searchLess: "Less than 95 : \"<95\"",
            searchComplex:"or Complex : \">10<95\" or \"<95>10\"",
            searchMonthHint:"",
            searchModifiedHint:"",
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleTextClick = this.handleTextClick.bind(this);
    }

    componentDidMount(){
        this.setState({
            searchModifiedHint: moment().format('DD MMM. YY HH:mm'),
            searchMonthHint: moment().format('MMM. YY'),
        });
    }

    componentWillUnmount() {
        this.props.visibleLoading("false");
    }
    submit=()=>{
        if(this.props.page === undefined){
            throw new Error("props.page is required");
        }
        this.returnSearchResult();
    };

    returnSearchResult = ()=>{
        let dateAllow = this.props.startDate !== null && this.props.endDate !== null;
        let textAllow = this.state.searchInput !== "";
        let startDate;
        let endDate;
        if(dateAllow){
            startDate = this.props.startDate.format('MM/DD/YYYY');
            endDate = this.props.endDate.format('MM/DD/YYYY');
        }
        if(!textAllow && !dateAllow) {
            this.setState({
                warningPlaceHolder: "Please input text",
            });
        }
        else{
            let url = apiurl + "/api/v1/search";
            let data = {
                page:this.props.page,
                value:"",
            };
            if(textAllow){
                data.value += this.state.searchInput;
            }else{
                data.value += startDate;
                data.value += "-";
                data.value += endDate;
            }
            this.requestSearchResult(url,data);
        }
    };

    requestSearchResult = (url,data) =>{
        this.props.visibleLoading("true");
        axios({
            withCredentials: true,
            method: 'POST',
            url: url,
            data: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            }
        })
            .then(
                (response) => {
                    this.props.visibleLoading("false");
                    if(response.data === ""){
                        localStorage.clear();
                        this.forceUpdate();
                        return;
                    }
                    let data = response.data;
                    this.props.setSearchResult(data);
                    this.props.setSort("search");
                    this.clearInputText();
                    this.props.setNotFoundVisible("false");
                    if(data.result === "fail" || data.length === 0){
                        this.props.setNotFoundVisible("true");
                    }else if(data.result === "expired"){
                        localStorage.clear();
                    }
                },
                (error) => {
                    this.props.visibleLoading("false");
                    console.log(error);
                }
            )
    };

    //delete Button
    clearInputText = () =>{
        if(this.state.isDelete){
            this.setState({
                searchInput: "",
            });
        }
    };
    handleTextChange(e){
        this.setState({
            searchInput: e.target.value
        });
    }
    handleClearClick(e){
        if(this.state.isDelete){
            this.setState({
                deleteIcon: "icon transition iconFontNonClickColor",
            });
        }else{
            this.setState({
                searchInput: "",
                deleteIcon: "icon transition iconFontClickColor",
            });
        }
        this.setState({
            isDelete: !this.state.isDelete,
        });
    }
    handleTextClick(e){
        this.setState({
            warningPlaceHolder: "",
        });
    }
    handleSubmitClick(){
        this.submit();
    }

    handSubmitEnter=(e)=>{
        if(e.key === 'Enter'){
            this.submit();
        }
    };

    render() {
        const isLogin = localStorage.getItem('login');
        return (
            <div className="search-container">
                {
                    isLogin === null ? (<Redirect to={{pathname:'/login'}}/>)
                        : null
                }
                <div className="searchBar-rest">
                </div>
                <div className="searchBar-container">
                    <div className="searchBar-hint">
                        <svg className="transition icon" aria-hidden="true">
                            <use xlinkHref="#icon-icon  "></use>
                        </svg>
                        <div className="transition searchBar-hint-box">
                            <div className="searchBar-hint-arrow"></div>
                            <div className="searchBar-hint-text">
                                <p className="fontBold">Hints:</p>
                                <p className="fontBold">Search by percentages:</p>
                                <p style={{ whiteSpace: 'pre-wrap' }} >{this.state.searchGreater}</p>
                                <p style={{ whiteSpace: 'pre-wrap' }} >{this.state.searchLess}</p>
                                <p style={{ whiteSpace: 'pre-wrap' }} >{this.state.searchComplex}</p>
                                <span style={{ whiteSpace: 'pre-wrap' }} className="fontBold">Search by month:  </span><span>"{this.state.searchMonthHint}"</span>
                                <br/>
                                <span style={{ whiteSpace: 'pre-wrap' }} className="fontBold">Search by Last Modified:  </span><span>"{this.state.searchModifiedHint}"</span>
                            </div>
                        </div>
                    </div>
                    <div className="searchBar-box">
                        <input placeholder={this.state.warningPlaceHolder}
                               value= {this.state.searchInput}
                               onChange={this.handleTextChange}
                               onClick={this.handleTextClick}
                               onKeyPress={this.handSubmitEnter} type="text"/>
                    </div>
                    <div className="searchBar-delete-icon">
                        <svg onClick={this.handleClearClick} className={this.state.deleteIcon} aria-hidden="true">
                            <use xlinkHref="#icon-chahao"></use>
                        </svg>
                    </div>
                    <div onClick={this.handleSubmitClick} className="searchBar-Submit">
                        <p>Search</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;