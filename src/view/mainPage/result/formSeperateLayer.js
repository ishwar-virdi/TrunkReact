import React from 'react';
import "../../../stylesheets/mainPage/result/formSeparateLayer.css";

class formSeparateLayer extends React.Component {
    render() {
        return (
            <li className="formSeparateLayer">
                <p>{this.props.title}</p>
            </li>
        );
    }
}

export default formSeparateLayer;