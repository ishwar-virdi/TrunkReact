import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
//import "../../../stylesheets/mainPage/upload/upload.css";
import Footer from "../../components/content/footer";
import DropZone from '../../mainPage/upload/dropZone'

class upload extends Component{

    render(){
        return (
            <div className="updatedContainer">
                <Header clickedClass="Upload"/>
                <div className="body">
                    <Title title="Upload"/>
                    <div className="upload-view">
                        <DropZone/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
};

export default upload;
