import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
import "../../../stylesheets/mainPage/upload/upload.css";
import SearchBar from "../../components/content/searchBar";
import Footer from "../../components/content/footer";
import Dropzone from 'react-dropzone';
import {apiurl} from "../../../config/constants";
import axios from "axios";


class upload extends Component{

    constructor(props) {
        super(props);
        this.state = {
            docType: "Bank",
            files: [] };
        this.onDrop = this.onDrop.bind(this);
        this.handleDocTypeChange = this.handleDocTypeChange.bind(this);
        this.uploadDocs = this.uploadDocs.bind(this);
    }

    onDrop(files) {
        this.setState({
            files
        });
    }

    handleDocTypeChange(e) {
        this.setState({
            docType: e.target.value,
        })
    };

    uploadDocs() {
        let data = new FormData();
        this.state.files.forEach(file => {
            data.append("file",file);
        });
        var self = this;
        axios
            .post(
                apiurl + "/" + this.state.docType.toString() + "/upload",
                data
            )
            .then(function(res){
                self.render();
            })
            .catch(function(err){
                console.log("Error in Upload JS");
            })
    };

    render(){
        return (
            <div className="container">
                <Header clickedClass="Upload"/>
                <div className="body">
                    <Title title="RECONCILE"/>
                    <div className="upload-view">
                            <Dropzone onDrop={this.onDrop.bind(this)}>
                                Drop the files here, or click to select files to upload.
                            </Dropzone>
                        <h2>Dropped files</h2>
                            <ul>
                                {
                                    this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                                }
                            </ul>
                        Select document type:
                        <select id="documentType" name="DocumentType" onChange={this.handleDocTypeChange}>
                            <option value="Bank">Bank statement</option>
                            <option value="Settlement">Settlement file</option>
                        </select>
                        <button className="button" position = "top center" onClick={this.uploadDocs}>Upload</button>
                    </div>
                </div>
                <Footer/>
            </div>

        )
    }
};

export default upload;
