import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import axios from "axios/index";
import {apiurl} from "../../../config/constants";

class Form extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            result: ""
        };
    }

    componentDidMount() {
        axios.get(apiurl + "/api/token")
            .then(
                (response) => {
                    this.setState({
                        isLoaded: true,
                        result: response.token,
                    });
                    console.log(response);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                    });
                }
            )
    }

    render(){
        return (
            <div>
                <div>{this.state.result}</div>
                <form method="post" action="http://localhost:3001/api/login">
                    <input type="hidden" name="token" value={this.state.result}/>
                    <input name="username" type="text"/>
                    <input name="password" type="password"/>
                    <input type="submit"/>
                </form>
                <form method="post" encType="multipart/form-data" action="http://localhost:3001/api/uploadFile">
                    <input type="file" name="file"/>
                    <input type="submit"/>
                </form>
                <form method="post" action="http://localhost:3001/api/register">
                    <input type="hidden" name="token" value={this.state.result}/>
                    <input name="username" type="text"/>
                    <input name="password" type="password"/>
                    <input type="submit"/>
                </form>
                <Link to="/chart">Test</Link>
                {/*<Redirect to="/22"/>*/}
            </div>
        )
    }
};

export default Form;