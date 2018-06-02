import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
import Dashboard from "../../mainPage/home/dashboard";
import Footer from "../../components/content/footer";
import "../../../stylesheets/mainPage/home/home.css";

class home extends Component{

    constructor(props){
        super(props);
        this.state={
            title:"CHART",
        }
    }

    setTitle = (title)=>{
        this.setState({
            title:title,
        });
    };
    render(){
        return (
            <div className="container">
                <Header clickedClass="Dashboard"/>
                <div className="body">
                    <Title title={this.state.title}/>
                    <div className="home-view">
                        <Dashboard setTitle={(title)=> this.setTitle(title)}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
};

export default home;