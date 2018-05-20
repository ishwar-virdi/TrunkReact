import React,{Component} from "react";
import "../../../stylesheets/mainPage/result/searchNotFound.css";

class SearchNotFound extends Component{

    constructor(props) {
        super(props);
        this.state={
            visible: props.visible,
            loadingClass:"",
        };
    }
    componentDidMount() {
        this.setVisible();
    }

    componentDidUpdate(previousProps){
        if(
            previousProps.visible !== this.props.visible
        ){
            this.setVisible();
        }
    }

    setVisible = () =>{
        if(this.props.visible === "true"){
            this.setState({
                loadingClass:"searchNotFound-Container searchNotFound-visible"
            });
        }else{
            this.setState({
                loadingClass:"searchNotFound-Container searchNotFound-hidden"
            });
        }

    };

    render(){
        return (
            <div className={this.state.loadingClass}>
                <div >
                    <p>Search was unable to find any results</p>
                </div>
            </div>
        )
    }
}
export default SearchNotFound;