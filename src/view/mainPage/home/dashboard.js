import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
import Result from "../../components/content/result";
import Footer from "../../components/content/footer";
class Dashboard extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render(){
        return (
            <div className="container">
                <Header clickedClass="Home"/>
                <div className="body">
                    <Title title="REPORTS"/>
                    <Result/>
                </div>
                <Footer/>
            </div>
        )
    }
};

export default Dashboard;