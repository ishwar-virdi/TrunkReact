import React from 'react';
import "../../../stylesheets/content/footer.css";

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer>
                <p>© Copyright 2018. Trunk Platform Pty Ltd.</p>
            </footer>
        );
    }
}

export default Footer;