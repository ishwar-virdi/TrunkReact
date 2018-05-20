import React from 'react';
import "../../../stylesheets/content/loading.css";

class Loading extends React.Component {

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
        if(this.props.visible === "false"){
            this.setState({
                loadingClass:"loading loading-hidden"
            });
        }else{
            this.setState({
                loadingClass:"loading"
            });
        }

    };

    render() {
        return (
            <div className={this.state.loadingClass}>
                <div className="loading-spinner1">
                    <div className="loading-dot1"></div>
                    <div className="loading-dot2"></div>
                    <div className="loading-dot3"></div>
                    <div className="loading-dot4"></div>
                </div>
                <div className="loading-spinner2">
                    <div className="loading-dot5"></div>
                    <div className="loading-dot6"></div>
                    <div className="loading-dot7"></div>
                    <div className="loading-dot8"></div>
                </div>
            </div>

        );
    }
}

export default Loading;