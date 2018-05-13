import React from 'react';
import "../../../stylesheets/content/header.css";
import {Link, Redirect } from 'react-router-dom';

import {apiurl} from "../../../config/constants"
import axios from "axios/index";
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            clicked:props.clickedClass,
            redirect:null,
            items:["Home","Result","Upload"],
            logoutUrl: apiurl + "/api/v1/userLogout",
            isLogin:null,
        };
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    componentDidMount() {
        axios({
            withCredentials: true,
            method: 'POST',
            url: apiurl + "/api/v1/userLogin",
            data: JSON.stringify({
            }),
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            }
        })
            .then(
                (response) => {
                    let data = response.data.result;
                    if(data === true){
                        this.setState({
                            isLogin:true,
                        });
                    }else{
                        this.setState({
                            isLogin:false,
                        });
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    handleLogOut(e){
        axios({
            withCredentials: true,
            method: 'POST',
            url: apiurl + "/api/v1/userLogout",
            data: JSON.stringify({
            }),
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            }
        })
            .then(
                (response) => {
                    let data = response.data.result;
                    if(data === true){
                        this.setState({
                           isLogin:false
                        });
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    }
    handleClick(params,e){
        if(params.value !== this.state.clicked){
            this.setState({
                redirect: params.value,
            });

        }
    }


    render() {
        const {items,isLogin} = this.state;
        let item = items.map((value,i)=>(
            this.state.clicked === value ? (
                <li key={i}><Link to={{pathname:"/"+value.toLowerCase()}} onClick={this.handleClick.bind(this,{value})} className="header-item clicked">{value}</Link></li>
            ) : (
                <li key={i}><Link to={{pathname:"/"+value.toLowerCase()}} onClick={this.handleClick.bind(this,{value})} className="header-item" >{value}</Link></li>
            )
        ));
        return (
            <header>
                {
                    // console.log(redirect);
                    isLogin === false || "" ? (<Redirect to={{pathname:'/login'}}/>)
                        : null
                }
                <div className="headerLayer">
                    <div className="header-item-panel">
                        <ul className="header-content">
                            {item}
                        </ul>
                    </div>
                    <div className="logout">
                        <a onClick={this.handleLogOut} className="gstBtn">LogOut</a>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;