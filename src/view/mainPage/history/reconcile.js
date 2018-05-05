/**
 * deprecated

import React from "react";
import FormSeperateLayerfrom from "./formSeperateLayer";
import { Link,Redirect } from 'react-router-dom';
import "../../../stylesheets/mainPage/history/reconcile.css";
import moment from "moment";
class Reconcile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: {
                isTitle: true,
                time: "Recently",
                status: "Status",
                method: "Re..method"
            },
            items: [],
            historyBackUp:[
                {month:1,letter:"One month ago"},
                {month:2,letter:"Two month ago"},
                {month:4,letter:"Four month ago"},
                {month:8,letter:"Eight month ago"},
                {month:12,letter:"One year ago"},
                {month:24,letter:"Two year ago"},
                {month:36,letter:"Three year ago"},
                {month:48,letter:"Older..."}
            ],
            history:[
                {month:1,letter:"One month ago"},
                {month:2,letter:"Two month ago"},
                {month:4,letter:"Four month ago"},
                {month:8,letter:"Eight month ago"},
                {month:12,letter:"One year ago"},
                {month:24,letter:"Two year ago"},
                {month:36,letter:"Three year ago"},
                {month:48,letter:"Older..."}
            ],
            removeIndex:[],
            sort:"time",
        }
    }

    componentDidMount() {
        this.setState({
            items: [
                {
                    time: "10/4/2018 17:10",
                    status: "Success",
                    method: "Automatic"
                },
                {
                    time: "10/3/2018 17:20",
                    status: "Not Success",
                    method: "Automatic"
                },
                {
                    time: "10/2/2018 17:10",
                    status: "Success",
                    method: "Automatic"
                },
                {
                    time: "10/2/2018 17:20",
                    status: "Not Success",
                    method: "Manual"
                },
                {
                    time: "8/2/2018 17:20",
                    status: "Success",
                    method: "Automatic"
                }
                ,
                {
                    time: "10/1/2018 17:20",
                    status: "Success",
                    method: "Automatic"
                }
                ,
                {
                    time: "1/1/2018 17:20",
                    status: "Success",
                    method: "Automatic"
                },
                {
                    time: "16/04/2017 17:20",
                    status: "Not Success",
                    method: "Manual"
                },
                {
                    time: "16/02/2016 17.20",
                    status: "Not Success",
                    method: "Automatic"
                },
                {
                    time: "15/02/2016 17.20",
                    status: "Not Success",
                    method: "Automatic"
                },
                {
                    time: "14/02/2016 17.20",
                    status: "Not Success",
                    method: "Automatic"
                },
                {
                    time: "16/02/2015 17.20",
                    status: "Not Success",
                    method: "Automatic"
                },
                {
                    time: "16/02/2014 17.20",
                    status: "Not Success",
                    method: "Automatic"
                },
            ],
        });
    }

    setSort(displaySort) {
        if(displaySort === this.state.sort){
            return;
        }

        this.setState({
            sort: displaySort
        });
    }

    calculateTime = (timeArray) => {
        let time;
        let num = timeArray[0];
        let unit = timeArray[1];
        switch(unit){
            case "day":
                time = 0;
                break;
            case "days":
                time = 0;
                break;
            case "month":
                time = 1;
                break;
            case "months":
                time = parseInt(num);
                break;
            case "year":
                time = 12;
                break;
            case "years":
                time = parseInt(num) * 12;
                break;
        }
        return time;
    };
    isTimeTitle = (totalTime)=>{
        let history = this.state.history;
        if(history.length === 1 && totalTime >= history[0].month){
            return true;
        }

        for(let i = 0; i < history.length-1;i++){
            if(totalTime < history[i].month){
                return false;
            }else if(totalTime >= history[i].month && totalTime < history[i+1].month){
                return true;
            }else{
                this.state.removeIndex.push(i);
            }
        }
        return false;
    };
    pushTimeTitle = (lists,key) =>{
        let removeFix = 0;
        let removeIndex = this.state.removeIndex;
        for(let i = 0; i < removeIndex.length;i++){
            this.state.history.splice(i-removeFix,1);
            removeFix++;
        }
        this.state.removeIndex = [];
        let title = this.state.history[0].letter;
        //push none
        if(lists.length === 0){
            lists.push(<ReconcileNone key={key}/>);
        }
        //push title
        lists.push(<FormSeperateLayerfrom key={key} title={title}/>);
        this.state.history.splice(0,1);
    };
    returnListByTime = () =>{
        let lists = [];
        const items = this.state.items;
        let timeFromNow = [];
        let totalTime;
        for (let i=0; i<items.length; i++) {
            timeFromNow = moment(items[i].time,"DD/MM/YYYY HH:mm").fromNow().split(" ");
            totalTime = this.calculateTime(timeFromNow);
            if(this.isTimeTitle(totalTime)){
                this.pushTimeTitle(lists,"time"+i);
            }
            lists.push(<ReconcileItem key={i} value={items[i]}/>);
        }
        //restore history
        [ ...this.state.history] = this.state.historyBackUp;
        return lists;
    };
    returnListByStatus = () =>{
        let lists = [];
        let succ = [];
        let notSucc = [];
        let succLength;
        const items = this.state.items;
        items.map((value,i)=>{
            let status = items[i].status;
            if(status === "Success"){
                succ.push(items[i]);
            }else{
                notSucc.push(items[i]);
            }
        });
        succLength = succ.length;
        notSucc.map((value,i)=>{
            lists.push(<ReconcileItem key={i + succLength} value={value}/>);
        });
        succ.map((value,i)=>{
            lists.push(<ReconcileItem key={i} value={value}/>);
        });
        return lists;
    };
    returnListByMethod = () =>{
        let lists = [];
        let auto = [];
        let manual = [];
        let autoLength;
        const items = this.state.items;
        items.map((value,i)=>{
            let status = items[i].method;
            if(status === "Automatic"){
                auto.push(items[i]);
            }else{
                manual.push(items[i]);
            }
        });
        autoLength = auto.length;
        auto.map((value,i)=>{
            lists.push(<ReconcileItem key={i} value={value}/>);
        });
        manual.map((value,i)=>{
            lists.push(<ReconcileItem key={i + autoLength} value={value}/>);
        });
        return lists;
    };

    render() {
        const {sort} = this.state;
        let lists = [];

        switch (sort){
            case "time":
                lists = this.returnListByTime();
                break;
            case "status":
                lists = this.returnListByStatus();
                break;
            case "method":
                lists = this.returnListByMethod();
                break;
        }

        return (
            <div className="reconcile-content">
                <ReconcileItem value={this.state.title} setSort={sort => this.setSort(sort)}/>
                {lists}
            </div>
        );
    }
}



class ReconcileItem extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            btnClass:"reconcileItem ren-Item-hover",
            statusClass:"reconcile-status fl",
            btn:"Show",
            recordIsTitle:false,
        };
        this.handleTimeClick = this.handleTimeClick.bind(this);
        this.handleStatusClick = this.handleStatusClick.bind(this);
        this.handleMethodClick = this.handleMethodClick.bind(this);
    }

    componentDidMount() {
        this.isTitle(this.props.value);
        this.isSuccess(this.props.value);
    }

    componentDidUpdate(previousProps){

        if(
            previousProps.value.status !== this.props.value.status
            || previousProps.value.method !== this.props.value.method
        ){
            if(this.props.value.status === "Not Success"){
                this.setState({
                    statusClass:"reconcile-status reconcile-noSuccess fl",
                });
            }else{
                this.setState({
                    statusClass:"reconcile-status fl",
                });
            }
            //console.log(this.state.values.status&&this.state.values.status !== "Status");
            //this.isSuccess();
        }
    }

    isTitle = (value) =>{
        if(value.isTitle === true || ""){
            this.setState({
                btnClass:"reconcileItem gl-title",
                btn:"",
                recordIsTitle:true
            });
        }
    };
    isSuccess = (value) =>{
        if(
            value.status !== "Success"
        &&value.status !== "Status"
        ){
            this.setState({
                statusClass:"reconcile-status reconcile-noSuccess fl",
            });
            //console.log("reconcile-status reconcile-noSuccess fl");
        }else{
            this.setState({
                statusClass:"reconcile-status fl",
            });
            //console.log("reconcile-status fl");
        }
    };

    handleTimeClick(e){
        this.props.setSort("time");
    }
    handleStatusClick(e){
        this.props.setSort("status");
    }
    handleMethodClick(e){
        this.props.setSort("method");
    }
    render() {
        const value = this.props.value;
        const {recordIsTitle} = this.state;

        const time = recordIsTitle ? (
            <p className="title-hover" onClick={this.handleTimeClick}>{value.time}</p>
        ) : (
            <p>{value.time}</p>
        );
        const showBtn = (
            <Link to={this.state.btn}>{this.state.btn}</Link>
        );
        const status = recordIsTitle ? (
            <p className="title-hover" onClick={this.handleStatusClick}>{value.status}</p>
        ) : (
            <p>{value.status}</p>
        );
        const method = recordIsTitle ? (
            <p className="title-hover" onClick={this.handleMethodClick}>{value.method}</p>
        ) : (
            <p>{value.method}</p>
        );
        return (
            <div className={this.state.btnClass}>
                <div className="reconcile-date fl">
                    {time}
                </div>
                <div className="reconcile-btn fl">
                    {showBtn}
                </div>
                <div className={this.state.statusClass}>
                    {status}
                </div>
                <div className="reconcile-method fl ">
                    {method}
                </div>
            </div>
        );
    }
}
class ReconcileNone extends React.Component {

    render() {
        return (
            <div className="reconcileItem">
                <p>none</p>
            </div>
        );
    }
}
export default Reconcile;

*/