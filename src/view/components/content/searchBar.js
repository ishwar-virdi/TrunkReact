import React from 'react';
import "../../../stylesheets/content/searchBar.css";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="search-container">
                <div className="searchBar-rest">

                </div>
                <div className="searchBar-container">
                    <div className="searchBar-box">
                        <input type="text"/>

                    </div>
                    <div className="searchBar-Submit">
                        <p>Filter</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;