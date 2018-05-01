import React from "react";
import FormSeperateLayerfrom from "./formSeperateLayer";
import { Link } from 'react-router-dom';
import "../../../stylesheets/mainPage/result/reconcile.css";
import moment from "moment";
class Reconcile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: {
                isTitle: true,
                time: "",
                dateRange: "DateRange",
                status: "Status"
            },
            items: [],
            historyBackUp:[
                {month:0,letter:"Recently"},
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
                {month:0,letter:"Recently"},
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
        }
    }

    componentDidMount() {
        this.setState({
            items: [
                {
                    id:1,
                    time: "10/4/2018 17:10",
                    dateRange: "10/3/2018 - 10/4/2018",
                    status: "80"
                },
                {
                    id:2,
                    time: "10/3/2018 17:20",
                    dateRange: "10/2/2018 - 10/3/2018",
                    status: "100"
                },
                {
                    id:3,
                    time: "10/2/2018 17:10",
                    dateRange: "10/1/2018 - 10/2/2018",
                    status: "70"
                },
                {
                    id:4,
                    time: "10/2/2018 17:20",
                    dateRange: "5/1/2018 - 10/2/2018",
                    status: "100"
                },
                {
                    id:5,
                    time: "8/2/2018 17:20",
                    dateRange: "4/1/2018 - 10/2/2018",
                    status: "60"
                }
                ,
                {
                    id:6,
                    time: "10/1/2018 17:20",
                    dateRange: "5/11/2017 - 10/12/2017",
                    status: "55"
                }
                ,
                {
                    id:7,
                    time: "1/1/2018 17:20",
                    dateRange: "5/11/2017 - 10/12/2017",
                    status: "67"
                },
                {
                    id:8,
                    time: "16/04/2017 17:20",
                    dateRange: "5/11/2017 - 10/12/2017",
                    status: "20"
                },
                {
                    id:9,
                    time: "16/02/2016 17.20",
                    dateRange: "5/11/2017 - 10/12/2017",
                    status: "50"
                },
                {
                    id:10,
                    time: "15/02/2016 17.20",
                    dateRange: "5/11/2017 - 10/12/2017",
                    status: "30"
                },
                {
                    id:11,
                    time: "14/02/2016 17.20",
                    dateRange: "5/11/2017 - 10/12/2017",
                    status: "60"
                },
                {
                    id:12,
                    time: "16/02/2015 17.20",
                    dateRange: "5/11/2017 - 10/12/2017",
                    status: "76"
                },
                {
                    id:13,
                    time: "16/02/2014 17.20",
                    dateRange: "5/11/2017 - 10/12/2017",
                    status: "100"
                },
            ],
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
    returnListByDateRange = () =>{
        let getTime = (item) =>{
            let tempTime = item.dateRange.split("-");
            let endTime = tempTime[1];
            let timeFromNow = moment(endTime,"DD/MM/YYYY").fromNow().split(" ");
            return timeFromNow
        };
        let lists = [];
        let value;
        const items = this.state.items;

        let order = Object.keys(items).sort(
            (a,b)=>{
                let aTimeFromNow = this.calculateTime(getTime(items[a]));
                let bTimeFromNow = this.calculateTime(getTime(items[b]));
                return aTimeFromNow - bTimeFromNow;
            }
        );
        for(let key in order){
            value = items[order[key]];
            lists.push(<ReconcileItem key={key} value={value}/>);
        }

        return lists;
    };
    returnListByStatus = () =>{
        let lists = [];
        let value;
        const items = this.state.items;

        let order = Object.keys(items).sort(
            function(a,b){
                return items[a].status - items[b].status;
                }
            );
        for(let key in order){
            value = items[order[key]];
            lists.push(<ReconcileItem key={key} value={value}/>);
        }
        return lists;
    };
    returnSearchList = ()=>{
        let lists = [];
        let result = this.props.searchResult;
        let value;
        for(let i = 0; i < result.length;i++){
            value = result[i];
            lists.push(<ReconcileItem key={i} value={value}/>);
        }
        return lists;
    };
    render() {
        const sort = this.props.sort;

        let lists = [];

        switch (sort){
            case "time":
                lists = this.returnListByTime();
                break;
            case "dateRange":
                lists = this.returnListByDateRange();
                break;
            case "status":
                lists = this.returnListByStatus();
                break;
            case "search":
                lists = this.returnSearchList();
                break;
        }

        return (
            <div className="reconcile-content">
                <ReconcileItem value={this.state.title} setSort={sort => this.props.setSort(sort)}/>
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
            btn:"detail",
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



export default Reconcile;