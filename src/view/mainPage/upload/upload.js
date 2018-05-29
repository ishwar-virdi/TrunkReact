import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
import "../../../stylesheets/mainPage/upload/upload.css";
import Footer from "../../components/content/footer";
import Loading from "../../components/content/loading";
import DropZone from '../../mainPage/upload/dropZone'
class upload extends Component{
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
                    <Title title="RECONCILE"/>
                    <div className="upload-view">
                        <DropZone
                            visibleLoading = {(visible)=>this.visibleLoading(visible)} // PropTypes.string.isRequired,
                        />
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
};

export default upload;
