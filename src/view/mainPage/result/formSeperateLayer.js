import React from 'react';
import "../../../stylesheets/mainPage/result/formSeparateLayer.css";

class formSeparateLayer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="formSeparateLayer">
                <p>{this.props.title}</p>
            </div>
        );
    }
}

export default formSeparateLayer;