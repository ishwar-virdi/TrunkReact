import {Component} from "react";
import axios from "axios/index";
import {apiurl} from "../../../config/constants";
//import "../../../stylesheets/mainPage/upload/dropZone.css";
import Dropzone from 'react-dropzone';
import React from "react";
import {Redirect} from "react-router-dom";
import Loading from "../../components/content/loading";
class DropZone extends Component{
    constructor(props) {
        super(props);
        this.state = {
            docType: "",
            files: [] ,
            status: "none",
            dropZone:"upload-dropZone upload-default",
            uploadRedirect:false,
            loading:"false",
        };
        this.onDrop = this.onDrop.bind(this);
        this.handleDocTypeChange = this.handleDocTypeChange.bind(this);
        this.uploadDocs = this.uploadDocs.bind(this);
    }

    componentWillUnmount() {
        this.setState({
            loading:"true",
        });
    }


    onDrop(files) {
        this.setState({
            files:files,
            dropZone:"upload-dropZone upload-active",
            status:"none",
            uploadSuccess:"",
        });
    }

    onDragEnter() {
        this.setState({
            dropZone:"upload-dropZone upload-active"
        });
    }
    onDragLeave() {
        this.setState({
            dropZone:"upload-dropZone upload-default"
        });
    }

    handleDocTypeChange(e) {
        this.setState({
            docType: e.target.value,
        })
    };

    uploadDocs() {

        if(this.state.files.length === 0){
            this.setState({
                status : "Please select upload file"
            });
            return;
        }
        if(this.state.docType === ""){
            this.setState({
                status : "Please select document type"
            });
            return;
        }
        this.setState({
            status : "none",
            loading: "true",
        });
        let data = new FormData();
        this.state.files.forEach(file => {
            data.append("file",file);
        });
        axios({
            withCredentials: true,
            method: 'POST',
            url: apiurl + "/" + this.state.docType.toString() + "/upload",
            data: data,
        })
            .then(
                (response) => {
                    let data = response.data;
                    if(data === ""){
                        localStorage.clear();
                        this.forceUpdate();
                        return;
                    }
                    if(data.result === "success"){
                        this.setState({
                            uploadRedirect: true,
                            loading:"false",
                        });
                    }else{
                        this.setState({
                            status : response.data.reason,
                            loading:"false",
                        });
                    }
                })
            .catch((error) => {
                console.log(error);
                this.setState({
                    status : "Error in calling Upload API",
                    loading:"false",
                });
            })
    };

    render() {
        const {status,uploadRedirect} = this.state;
        const warnLabel = (status !== "none") ? (
            <p className="upload-fail">{this.state.status}</p>
        ) : (
            null
        );

        return (
            <div className="upload-view-Handler">
                {
                    uploadRedirect === true ? ( <Redirect to={{pathname:'/uploadSuccess'}}/>)
                        : null
                }
                <div className="upload-view-context">
                    <div className="upload-title">
                        <p>Import Documents</p>
                    </div>
                    <Dropzone
                        className={this.state.dropZone}
                        onDrop={this.onDrop.bind(this)}
                        onDragEnter={this.onDragEnter.bind(this)}
                        onDragLeave={this.onDragLeave.bind(this)}
                    >
                        <div className="upload-dropZone-handle">
                            <div className="upload-warning">
                                {warnLabel}
                            </div>
                            <div className="upload-dropZone-north">
                                <div className="upload-dropZone-btn upload-border transition">
                                    <p>Select a CSV file to upload</p>
                                </div>
                                <div className="upload-dropZone-file upload-border">
                                    {this.state.files.map(f => <p key={f.name}>{f.name} - {f.size} bytes</p>)}
                                </div>
                            </div>
                            <div className="upload-dropZone-south">
                                <div className="upload-dropZone-text">
                                    <p>- OR -</p>
                                    <p>Drag and drop files to this box to upload</p>
                                </div>
                            </div>
                        </div>
                    </Dropzone>
                    <div className="upload-select">
                        <div className="upload-select-text">
                            <p>Select document type</p>
                        </div>
                        <div className="upload-select-option">
                            <select id="documentType" name="DocumentType" onChange={this.handleDocTypeChange} defaultValue="">
                                <option value="" defaultValue disabled >--Select a document type--</option>
                                <option value="Bank">Bank statement</option>
                                <option value="Settlement">Settlement file</option>
                            </select>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-xiangxia"></use>
                            </svg>
                        </div>
                    </div>
                    <div className="upload-submit">
                        <p className="transition" onClick={this.uploadDocs}>Submit</p>
                    </div>
                </div>
                <Loading visible={this.state.loading}/>
            </div>
        );
    }
}

export default DropZone;