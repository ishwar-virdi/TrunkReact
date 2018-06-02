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
            items:["Dashboard","Result","Upload"],
            logoutUrl: apiurl + "/api/v1/userLogout",
            url:{
                "Dashboard":"home",
                "Result":"reconciledresults",
                "Upload":"upload",
            },
        };
        this.handleLogOut = this.handleLogOut.bind(this);
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
                    localStorage.clear();
                    this.forceUpdate();
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

    returnHeader =()=>{
        let list = [];
        let items = this.state.items;
        for(let i = 0; i < items.length;i++){
            let value = items[i];
            let url = this.state.url[value].toLowerCase();
            if(this.state.clicked === items[i]){
                list.push(<li key={i}><Link to={{pathname:"/"+url}} onClick={this.handleClick.bind(this,{value})} className="header-item clicked">{value}</Link></li>);
            }else{
                list.push(<li key={i}><Link to={{pathname:"/"+url}} onClick={this.handleClick.bind(this,{value})} className="header-item" >{value}</Link></li>);
            }
        }
        return list;
    };
    render() {
        const isLogin = localStorage.getItem('login');
        let list = this.returnHeader();
        this.returnHeader();
        return (
            <header>
                {
                    isLogin === null ? (<Redirect to={{pathname:'/login'}}/>)
                        : null
                }
                <div className="headerLayer">
                    <div className="header-item-panel">
                        <ul className="header-content">
                            {list}
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