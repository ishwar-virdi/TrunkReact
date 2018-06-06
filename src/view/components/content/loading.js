import React from 'react';
//import "../../../stylesheets/content/loading.css";

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

    setVisible(){
        if(this.props.visible === "false"){
            this.setState({
                loadingClass:"loading loading-hidden",
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
                <div className="loading-spinner0"></div>
                <div className="loading-spinner1"></div>
                <div className="loading-spinner2"></div>
                <div className="loading-spinner3"></div>
            </div>

        );
    }
}

export default Loading;