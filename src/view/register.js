import React, { Component } from 'react';
//import '../stylesheets/login.css';
import {apiurl} from '../config/constants';
import { Redirect } from 'react-router-dom';
import Loading from './components/content/loading';
import axios from 'axios';


class register extends Component{

    constructor(props) {
        super(props);
        this.state={
            token:"",
            email:"",
            password:"",
            warning:"",
            warnClass: null,
            loading:"false",
            registerCode:"",
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRegisterCodeChange = this.handleRegisterCodeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.loadToken();
    }

    componentWillUnmount() {
        this.visibleLoading("false");
    }

    loadToken(){
        axios({
            withCredentials: true,
            method: 'GET',
            url: apiurl + "/api/v1/token",
        })
            .then(
                (response) => {
                    this.setState({
                        token: response.data.token,
                    });
                }).catch(
            (error) => {
                this.setState({
                    isLoaded: false,
                });
            }
        )
    }

    handleEmailChange(e){
        this.setState({
            email:e.target.value,
            warning:""
        });
    }

    handlePasswordChange(e){
        this.setState({
            password:e.target.value,
            warning:""
        });
    }

    handleRegisterCodeChange(e){
        this.setState({
            registerCode:e.target.value,
            warning:""
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.warning === ""
            || this.state.warning === "Please try again"){
            let token = this.state.token;
            let email = this.state.email.toLowerCase();
            let password = this.state.password;
            let registerCode = this.state.registerCode;
            this.visibleLoading("true");
            axios({
                withCredentials: true,
                method: 'POST',
                url: apiurl + "/api/v1/register",
                data: JSON.stringify({
                    token: token,
                    username: email,
                    password: password,
                    registerCode:registerCode,
                }),
                headers: {
                    'Content-Type' : 'application/json; charset=utf-8'
                }
            })
                .then(
                    (response) => {
                        this.visibleLoading("false");
                        let res = response.data.result;

                        if(res==="expired"){
                            this.loadToken();
                            this.setState({
                                warning: "Please try again",
                            });
                        }else if(res==="fail"){
                            this.loadToken();
                            this.setState({
                                warning: "Incorrect credentials",
                            });
                        }else{
                            this.setState({
                                warning: "Register successful",
                            });
                        }
                    },
                    (error) => {
                        this.visibleLoading("false");
                    }
                );
        }else{
            this.setState({
                warnClass: "animation",
            });
            setTimeout(()=>{
                this.setState({
                    warnClass: null,
                });
            },700);
        }
    }

    visibleLoading(visible){
        this.setState({
            loading:visible,
        });
    };
    render(){
        const {redirect,warning} = this.state;
        const warnLabel = warning !== "" ? (
            <p className={this.state.warnClass}>{this.state.warning}</p>
        ) : (
            null
        );

        return (
            <div className="container">
                <div className="login">
                    <div className="title">
                        <p>SMART</p>
                        <p>RECONCILATION</p>
                    </div>
                    <div className="inputPanel">
                        <div className="warning">
                            {warnLabel}
                        </div>

                        <form>
                            <input value= {this.state.email} onChange={this.handleEmailChange} className="inputBox" type="text" placeholder="Email"/>
                            <input value= {this.state.password} onChange={this.handlePasswordChange} className="inputBox" type="password" placeholder="Password"/>
                            <input value= {this.state.registerCode} onChange={this.handleRegisterCodeChange} className="inputBox" type="text" placeholder="Register Code"/>
                            <div className="submit">
                                <input onClick={this.handleSubmit} className="submit-btn transition" value="Login" type="submit"/>
                            </div>
                        </form>
                    </div>
                </div>
                <Loading visible={this.state.loading}/>
            </div>
        )
    }
};

export default register;