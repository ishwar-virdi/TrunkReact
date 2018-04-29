import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
import "../../../stylesheets/mainPage/admin/admin.css";
import Footer from "../../components/content/footer";
class admin extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render(){
        return (
            <div className="container">
                <Header clickedClass="Admin"/>
                <div className="body">
                    <Title title="ADMINISTRATOR"/>
                    <div className="admin-view">

                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
};

export default admin;