import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
import Dashboard from "../../mainPage/home/dashboard";
import Footer from "../../components/content/footer";
//import "../../../stylesheets/mainPage/home/home.css";

class home extends Component{

    constructor(props){
        super(props);
        this.state={
            title:"CHART",
            hintMessage:"",
        }
    }

    setHintMessage(message){
        this.setState({
            hintMessage:message,
        });
    };

    setTitle(title){
        this.setState({
            title:title,
        });
    };
    render(){
        return (
            <div className="updatedContainer">
                <Header clickedClass="Dashboard"/>
                <div className="body">
                    <Title title={this.state.title}/>

                    <div className="chart-hint">
                        <svg className="transition icon" aria-hidden="true">
                            <use xlinkHref="#icon-icon  "></use>
                        </svg>
                        <div className="transition chart-hint-box">
                            <div className="chart-hint-arrow"></div>
                            <div className="chart-hint-text">
                                <p>{this.state.hintMessage}</p>
                            </div>
                        </div>
                    </div>

                    <div className="home-view">
                        <Dashboard
                            setHintMessage = {(message)=>this.setHintMessage((message))}
                            setTitle={(title)=> this.setTitle(title)}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
};

export default home;