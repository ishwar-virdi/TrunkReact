import React, { Component } from 'react';
import '../stylesheets/login.css';
import {apiurl} from '../config/constants';
import { Redirect } from 'react-router-dom';
import Loading from './components/content/loading';
import axios from 'axios';

let validation = (email,password)=>{
    let result = "";
    const reg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))){2,6}$/i;
    if(!reg.test(email)){
        result += "Email ";
    }
    if(password.length < 8){
        if(result.length > 0){
            result += "and";
        }
        result += " Password ";
    }
    if(result.length > 0){
        result += "is invalid";
    }
    return result;
};



class Login extends Component{

    constructor(props) {
        super(props);
        this.state={
            token:"",
            email:"",
            password:"",
            warning:"none",
            redirect: null,
            warnClass: null,
            loading:false,
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.loadToken();
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
                        isLoaded: true,
                        token: response.data.token,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                    });
                }
            )
    }

    handleEmailChange(e){
        this.setState({
            email:e.target.value,
            warning: validation(e.target.value,this.state.password),
        });


    }
    handlePasswordChange(e){
        this.setState({
            password:e.target.value,
            warning:validation(this.state.email,e.target.value)
        });
    }

    handleReset(event) {
        this.setState({
            email:"",
            password:"",
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        if(this.state.warning === ""
            || this.state.warning === "Website expired. Please try again"){
            let token = this.state.token;
            let email = this.state.email.toLowerCase();
            let password = this.state.password;
            //this.visibleLoading();
            this.setState({
                loading:true,
            });
            axios({
                withCredentials: true,
                method: 'POST',
                url: apiurl + "/api/v1/login",
                data: JSON.stringify({
                    token: token,
                    username: email,
                    password: password,
                }),
                headers: {
                    'Content-Type' : 'application/json; charset=utf-8'
                }
            })
            .then(
                    (response) => {
                        console.log(response.data.result);
                        this.hiddenLoading();
                        let res = response.data.result;
                        if(res==="expired"){
                            this.loadToken();
                            this.setState({
                                warning: "Website expired. Please try again",
                            });
                        }else if(res==="fail"){
                            this.loadToken();
                            this.setState({
                                warning: "Email or password is wrong",
                            });
                        }else{
                            localStorage.setItem('login', "true");
                            this.setState({
                                redirect: res,
                            });
                        }
                    },
                    (error) => {
                        this.hiddenLoading();
                        console.log(error);
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
            },1500);
        }
    }

    hiddenLoading = ()=>{
        this.setState({
            loading:false,
        });
    };
    visibleLoading = ()=>{
        this.setState({
            loading:true,
        });
    };
    render(){
        const {redirect,warning} = this.state;
        const warnLabel = warning !== "none" ? (
            <p className={this.state.warnClass}>{this.state.warning}</p>
        ) : (
            null
        );
        return (
            <div className="container">
                    {
                        redirect === "success" || "" ? (<Redirect to={{pathname:'/home'}}/>)
                                : null
                        }
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
                            <div className="submit">
                                <input className="submit-btn submit-btn-left" onClick={this.handleReset} type="reset"/>
                                <input onClick={this.handleSubmit} className="submit-btn submit-btn-right" value="Login" type="submit"/>
                            </div>
                            <div className="forget">
                                <a>Forget password?</a>
                            </div>
                        </form>
                    </div>
                </div>
                <Loading visible={this.state.loading}/>
            </div>
        )
    }
};

export default Login;