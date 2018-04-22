import React from "react";
import ReactDOM from "react-dom";

class Test extends React.Component {
    constructor() {
        super();
        this.state = {navStatus: "navHide"};
    }

    navClose() {
        var navOpened = document.getElementById("myNav");
        this.setState({navStatus: "navHide"});
    }

    navOpen() {
        this.setState({navStatus: "navShow"});
    }

    render() {
        return(
            <nav onClick={this.navOpen.bind(this)}>
                <div id="myNav" className={this.state.navStatus}>
                    <div className="navClose" onClick={this.navClose.bind(this)}>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Test;