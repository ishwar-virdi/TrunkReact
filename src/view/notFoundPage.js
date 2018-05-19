import {Component} from "react";
import { Link } from 'react-router-dom';
import React from "react";
import '../stylesheets/notFoundPage.css';
class notFoundPage extends Component {


    constructor(props) {
        super(props);
    }

    render(){

        return (
            <div className="notFound-container">
                <div className="notFound-Title-handle">
                    <p>404 - Page not found</p>
                    <p>__</p>
                </div>
                <div className="notFound-Context-handle">
                    <div className="notFound-Context-title">
                        <p>The page you are looking for is not found</p>
                    </div>
                    <div className="notFound-context-text">
                        <p>The page you are looking for does not exist.  It may have been moved, or removed altogether. Perhaps you can return back to the site’s homepage and see if you can find what you are looking for.</p>
                    </div>
                    <div className="notFound-context-Back">
                        <Link className="transition" to={{pathname:"/home/"}} >BACK TO HOMEPAGE</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default notFoundPage;