import React,{Component} from "react";
import "../../../stylesheets/mainPage/home/indicator.css"
class Indicator extends Component{
    constructor(props) {
        super(props);
        this.state={
            style:{
                height: null,
            },
            range:props.max - props.min,
        };
    }

    componentDidMount() {
        this.setState({
            style:{
                height: this.calcHeightPercent(this.props.index),
            },
        });
    }

    componentDidUpdate(previousProps){
        if(
            previousProps.index !== this.props.index
        ){
            this.setState({
                nowIndex: this.props.max - this.props.index,
                style:{
                    height: this.calcHeightPercent(this.props.index),
                },
            });
        }
    }
    calcHeightPercent = (index) =>{
        let diffIndex = this.props.max - index;
        return (diffIndex / this.state.range) * 100 + "%";
    };

    render(){
        return (
            <div className="indicator-Container transition">
                <div className="indicator-pointer" style={this.state.style}>
                </div>
            </div>
        )
    }
}

export default Indicator