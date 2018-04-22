import React from 'react';
import "../../stylesheets/title.css";
import "../../stylesheets/resultItem.css"

class ResultItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className={this.props.class}>
                <div className="item-title-name">
                    <p>Week 1</p>
                </div>
                <div className="item-title-result">
                    <a>Show</a>
                </div>
            </li>
        );
    }
}

export default ResultItem;