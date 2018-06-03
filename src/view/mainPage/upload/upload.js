import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
import "../../../stylesheets/mainPage/upload/upload.css";
import Footer from "../../components/content/footer";
import Loading from "../../components/content/loading";
import DropZone from '../../mainPage/upload/dropZone'
import axios from 'axios';
import {apiurl} from '../../../config/constants';

class upload extends Component{
    constructor(props) {
        super(props);
    }

    handleDocTypeChange(e) {
        this.setState({
            docType: e.target.value,
        })
    };

    uploadDocs() {
        this.setState({
            loading : "true",
            status : ""
        });

        let data = new FormData();
        this.state.files.forEach(file => {
            data.append("file",file);
        });
        axios
            .post(
                apiurl + "/" + this.state.docType.toString() + "/upload",
                data
            )
            .then(
                (response) => {
                    this.setState({
                        loading: "false",
                        status : response.data.reason
                    });
                })
            .catch(() => {
                this.setState({
                    loading: "false",
                    status : "Error in calling Upload API"
                });
            })
    };

    render(){
        return (
            <div className="container">
                <Header clickedClass="Upload"/>
                <div className="body">
                    <Title title="UPLOAD"/>
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
