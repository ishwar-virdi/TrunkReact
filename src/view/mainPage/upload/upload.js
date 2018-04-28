import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
import "../../../stylesheets/mainPage/upload/upload.css";
import SearchBar from "../../components/content/searchBar";
import Footer from "../../components/content/footer";
class upload extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render(){
        return (
            <div className="container">
                <Header clickedClass="Upload"/>
                <div className="body">
                    <Title title="RECONCILE"/>
                    <div className="upload-search">
                        <SearchBar/>
                    </div>
                    <div className="upload-view">
                        {/*fill*/}
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
};

export default upload;