import React from 'react';
import "../../../stylesheets/content/searchBar.css";
import moment from "moment";
import {apiurl} from "../../../config/constants";
import axios from "axios/index";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            searchInput:"",
            deleteIcon: "icon transition iconFontNonClickColor",
            isDelete:false,
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleTextClick = this.handleTextClick.bind(this);
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
            startDate = this.props.startDate.format('YYYYMMDD');
            endDate = this.props.endDate.format('YYYYMMDD');
        }
        if(!textAllow && !dateAllow) {
            this.setState({
                warningPlaceHolder: "Please input text",
            });
        }
        else{
            let url = apiurl + "/api/v1/search?page=" + this.props.page + "&value=";
            if(textAllow){
                let searchInput = this.state.searchInput;
                if(
                    this.state.searchInput.indexOf("-") === 11
                    && searchInput.indexOf("/")===2
                    && !isNaN(Number(searchInput.slice(6,10)))
                    && !isNaN(Number(searchInput.slice(0,2)))
                    && !isNaN(Number(searchInput.slice(3,5)))
                ){
                    let search = this.state.searchInput;
                    let startDate;
                    let endDate;
                    search = search.split("-");
                    startDate = this.dateToString(search[0].replace(" ",""));
                    endDate = this.dateToString(search[1].replace(" ",""));
                    url += startDate;
                    url += endDate;
                }
                else if(
                    searchInput.indexOf("/")===2
                    && !isNaN(Number(searchInput.slice(6,10)))
                    && !isNaN(Number(searchInput.slice(0,2)))
                    && !isNaN(Number(searchInput.slice(3,5)))
                ){
                    url += this.dateToString(this.state.searchInput);
                }else{
                    url += this.state.searchInput;
                }
            }else{
                url += startDate;
                url += endDate;
            }
            this.requestSearchResult(url);
        }
    };

    dateToString(date){
        return date.slice(6,10) +date.slice(0,2) + date.slice(3,5);
    }
    requestSearchResult = (url) =>{
        this.props.visibleLoading();
        axios({
            withCredentials: true,
            method: 'GET',
            url: url,
        })
            .then(
                (response) => {
                    this.props.hiddenLoading();
                    let data = response.data;
                    this.props.setSearchResult(data);
                    this.props.setSort("search");
                    this.clearInputText();
                },
                (error) => {
                    this.props.hiddenLoading();
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
        return (
            <div className="search-container">
                <div className="searchBar-rest">
                </div>
                <div className="searchBar-container">
                    <div className="searchBar-box">
                        <input placeholder={this.state.warningPlaceHolder}
                               value= {this.state.searchInput}
                               onChange={this.handleTextChange}
                               onClick={this.handleTextClick}
                               onKeyPress={this.handSubmitEnter} type="text"/>
                    </div>
                    <div className="searchBar-search-icon">
                        {/*<svg className="icon" aria-hidden="true">*/}
                            {/*<use xlinkHref="#icon-chazhao"></use>*/}
                        {/*</svg>*/}
                    </div>
                    <div className="searchBar-delete-icon">
                        <svg onClick={this.handleClearClick} className={this.state.deleteIcon} aria-hidden="true">
                            <use xlinkHref="#icon-delete"></use>
                        </svg>
                    </div>
                    <div onClick={this.handleSubmitClick} className="searchBar-Submit">
                        <p>Filter</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;