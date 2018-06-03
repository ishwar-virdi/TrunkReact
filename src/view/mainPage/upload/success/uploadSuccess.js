import React,{Component} from "react";
import Header from "../../../components/content/header";
import Title from "../../../components/content/title";
import "../../../../stylesheets/mainPage/upload/upload.css";
import Footer from "../../../components/content/footer";
import Loading from "../../../components/content/loading";
import UploadSuccTable from './transactionTable'
class uploadSuccess extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: "false",
        };
    }

    visibleLoading = (visible)=>{
        this.setState({
            loading:visible,
        });
    };

    render(){
        return (
            <div className="container">
                <Header clickedClass="Upload"/>
                <Loading visible={this.state.loading}/>
                <div className="body">
                    <Title title="UPLOAD RESULT"/>
                    <div className="upload-view">
                        <UploadSuccTable/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
};

export default uploadSuccess;