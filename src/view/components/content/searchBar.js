import React from 'react';
import "../../../stylesheets/content/searchBar.css";

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
        if(this.state.searchInput === ""){
            this.setState({
                warningPlaceHolder: "Please input text",
            });
            return;
        }

        if(this.state.isDelete){
            this.setState({
                searchInput: "",
            });
        }
        let items = [
            {
                id:1,
                time: "10/4/2018 17:10",
                dateRange: "10/3/2018 - 10/4/2018",
                status: "80"
            },
            {
                id:2,
                time: "10/3/2018 17:20",
                dateRange: "10/2/2018 - 10/3/2018",
                status: "100"
            }];
        this.props.setSearchResult(items);
        this.props.setSort("search");
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