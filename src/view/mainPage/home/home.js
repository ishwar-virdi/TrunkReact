import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
import Dashboard from "../../mainPage/home/dashboard";
import Footer from "../../components/content/footer";
import "../../../stylesheets/mainPage/home/home.css";

class home extends Component{

    render(){
        return (
            <div className="containerUpdated">
                <Header clickedClass="Home"/>
                <div className="body">
                    <Title title="REPORTS"/>
                </div>
                <div className="home-view">
                    <Dashboard/>
                </div>
                <Footer/>
            </div>
        )
    }
};

export default home;