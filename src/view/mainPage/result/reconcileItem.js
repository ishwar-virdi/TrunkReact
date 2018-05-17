import { Link } from 'react-router-dom';
import React from "react";
import "../../../stylesheets/mainPage/result/reconcileItem.css";

class ReconcileItem extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            btnClass:"reconcileItem ren-Item-hover",
            statusClass:"reconcile-dateRange fl",
            btn:"Show",
            recordIsTitle:false,
            width: props.value.status,
            progressClass:"reconcile-progress-bar",
            progressStyle:{
                width:0 +"%",
            },
        };
        this.handleTimeClick = this.handleTimeClick.bind(this);
        this.handleRangeClick = this.handleRangeClick.bind(this);
        this.handleStatusClick = this.handleStatusClick.bind(this);
    }

    componentDidMount() {
        this.isTitle(this.props.value);
        this.progressSetColor(this.props.value.status);
        this.setState({
            progressStyle:{
                width:this.props.value.status +"%",
            },
        });
    }

    componentDidUpdate(previousProps){
        if(
            previousProps.value.dateRange !== this.props.value.dateRange
            || previousProps.value.status !== this.props.value.status
        ){
            this.progressAnimation(this.props.value.status);
        }
    }

    progressSetColor = (status) =>{
        let percent = Number(status);
        if(percent >= 80){
            this.setState({
                progressClass: "reconcile-progress-bar bgGreen"
            });
        }else if( percent >= 60 && percent < 80){
            this.setState({
                progressClass: "reconcile-progress-bar bgBlue"
            });
        }else if( percent > 40 && percent < 60){
            this.setState({
                progressClass:  "reconcile-progress-bar bgYellow"
            });
        }else{
            this.setState({
                progressClass: "reconcile-progress-bar bgRed"
            });
        }
    };
    progressAnimation = (status)=>{
        let percent = Number(status);
        this.progressSetColor(percent);
        let i = 0;
        let interval = setInterval(()=>{
            this.setState({
                progressStyle:{
                    width:i +"%",
                },
            });
            if(i >= percent){
                clearInterval(interval);
                this.setState({
                    progressStyle:{
                        width:percent +"%",
                    },
                });
            }
            i = i + 5;
        },5);
    };


    isTitle = (value) =>{
        if(value.isTitle === true || ""){
            this.setState({
                btnClass:"reconcileItem gl-title",
                btn:"",
                recordIsTitle:true
            });
        }
    };

    handleTimeClick(e){
        this.props.setSort("time");
        this.props.setNotFoundVisible("false");
    }
    handleRangeClick(e){
        this.props.setSort("dateRange");
    }
    handleStatusClick(e){
        this.props.setSort("status");
    }
    render() {
        const value = this.props.value;
        const {recordIsTitle} = this.state;

        const time = recordIsTitle ? (
            <div onClick={this.handleTimeClick} className="reconcile-date fl">
                <p className="title-hover" >{value.time}</p>
            </div>
        ) : (
            <div className="reconcile-date fl">
                <p>{value.time}</p>
            </div>
        );
        const status = recordIsTitle ? (
            <div onClick={this.handleRangeClick} className={this.state.statusClass}>
                <p className="title-hover">{value.dateRange}</p>
            </div>
        ) : (
            <div className={this.state.statusClass}>
                <p>{value.dateRange}</p>
            </div>
        );
        const showBtn = (
            <div className="reconcile-btn fl">
                <Link to={{pathname:"/reconciledetails/" + value.id}} target="_blank">{this.state.btn}</Link>
            </div>
        );
        const method = recordIsTitle ? (
            <div onClick={this.handleStatusClick} className="reconcile-status fl ">
                <p className="title-hover">{value.status}</p>
            </div>
        ) : (
            <div className="reconcile-status fl ">
                <div className="reconcile-border">
                    <div className={this.state.progressClass} style={this.state.progressStyle}>

                    </div>
                    <p>{value.status}</p>
                </div>
            </div>
        );
        return (
            <li className={this.state.btnClass}>
                {time}
                {status}
                {showBtn}
                {method}
            </li>
        );
    }
}

export default ReconcileItem;