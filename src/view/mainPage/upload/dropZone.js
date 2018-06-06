
import {Component} from "react";
import axios from "axios/index";
import {apiurl} from "../../../config/constants";
import "../../../stylesheets/mainPage/upload/dropZone.css";
import Dropzone from 'react-dropzone';
import React from "react";
import {Redirect} from "react-router-dom";
import Loading from "../../components/content/loading";
import { Button, ButtonToolbar} from "react-bootstrap";
import {SettlementStatementAlert,BankStatementAlert} from "./instruction";

class DropZone extends Component{
    constructor(props, context) {
        super(props, context);


        this.state = {
            docType: "",
            files: [] ,
            status: "none",
            dropZone:"upload-dropZone upload-default",
            uploadRedirect:false,
            loading:"false",
            //variables for popup function
            infoButton:"dropZone-hidden",
            docName:"",
            showAlertBank:false,
            showAlertStatement:false,
            showStructureAlertBank:"dropZone-hidden",
            showStructureAlertStatement:"dropZone-hidden"

        };
        this.onDrop = this.onDrop.bind(this);
        this.handleDocTypeChange = this.handleDocTypeChange.bind(this);
        this.uploadDocs = this.uploadDocs.bind(this);
        this.showStructureAlert= this.showStructureAlert.bind(this);
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

        // Displaying the infoButton
        if(e.target.value==="Bank"){

            this.state.docName = e.target.value;
            this.setState({
                infoButton:"dropZone-show",
            })

        }else if(e.target.value==="Settlement"){
            this.state.docName = e.target.value;
            this.setState({
                infoButton:"dropZone-show"
            })
        }else{
            this.setState({
                infoButton:"dropZone-hidden"
            })
        };

        this.setState({
            docType: e.target.value,
        })
    };

    uploadDocs() {
        this.setState({
            status : "none",
            loading: "true",
        });
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



    showStructureAlert(){

// logic for bank alert
        if(this.state.docName==="Bank" && this.state.showAlertBank=== false) {
            this.setState({
                showStructureAlertBank: "dropZone-show",
                showAlertBank: true,
            });
        }else{

            this.setState({
                showStructureAlertBank : "dropZone-hidden",
                showAlertBank: false,
            });
        }

console.log(this.state.docName)
        if(this.state.docName==="Settlement" && this.state.showAlertStatement=== false) {
            this.setState({
                showStructureAlertStatement: "dropZone-show",
                showAlertStatement: true,
            });
        }else{

            this.setState({
                showStructureAlertStatement : "dropZone-hidden",
                showAlertStatement: false,
            });
        }



    }
    render() {


        const {status,uploadRedirect} = this.state;
        const warnLabel = (status !== "none") ? (
            <p className="upload-fail">{this.state.status}</p>
        ) : (
            null
        );

        return (
            <div>
                <div className={this.state.showStructureAlertBank} >
                <BankStatementAlert />
                </div>
                <div className={this.state.showStructureAlertStatement}>
                <SettlementStatementAlert/>
                </div>
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
                        <Button className={this.state.infoButton} id="dropZone-warning" onClick={this.showStructureAlert} bsStyle="warning"> ? </Button>
                    </div>

                    <ButtonToolbar className="dropZone-ButtonToolbar">
                        <Button className="dropZone-ButtonToolbarButton" bsStyle="primary" bsSize="large" onClick={this.uploadDocs}>Submit</Button>
                    </ButtonToolbar>
                </div>
                <Loading visible={this.state.loading}/>
            </div>

            </div>
        );
    }
}

export default DropZone;