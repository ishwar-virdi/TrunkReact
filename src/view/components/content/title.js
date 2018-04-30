import React from 'react';
import "../../../stylesheets/content/title.css";

class Title extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="title-container">
                <p>{this.props.title}</p>
            </div>
        );
    }
}

export default Title;