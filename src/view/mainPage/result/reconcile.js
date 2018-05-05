import React from "react";
import FormSeperateLayerfrom from "./formSeperateLayer";

import "../../../stylesheets/mainPage/result/reconcile.css";
import ReconcileItem from './reconcileItem';
import moment from "moment";
let history = [
    {month:0,letter:"Recently"},
    {month:1,letter:"One month ago"},
    {month:2,letter:"Two month ago"},
    {month:4,letter:"Four month ago"},
    {month:8,letter:"Eight month ago"},
    {month:12,letter:"One year ago"},
    {month:24,letter:"Two year ago"},
    {month:36,letter:"Three year ago"},
    {month:48,letter:"Older..."}
];
let historyBackUp;
let removeIndex = [];
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
            items: []
        };
        [ ...historyBackUp] = history;
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
                time = Number(num);
                break;
            case "year":
                time = 12;
                break;
            case "years":
                time = Number(num) * 12;
                break;
            default:
                throw new Error("time is wrong");
        }
        return time;
    };
    isTimeTitle = (totalTime)=>{
        if(history.length === 1 && totalTime >= history[0].month){
            return true;
        }

        for(let i = 0; i < history.length-1;i++){
            if(totalTime < history[i].month){
                return false;
            }else if(totalTime >= history[i].month && totalTime < history[i+1].month){
                return true;
            }else{
                removeIndex.push(i);
            }
        }
        return false;
    };
    pushTimeTitle = (lists,key) =>{
        let removeFix = 0;
        for(let i = 0; i < removeIndex.length;i++){
            history.splice(i-removeFix,1);
            removeFix++;
        }
        removeIndex = [];
        let title = history[0].letter;
        //push title
        lists.push(<FormSeperateLayerfrom key={key} title={title}/>);
        history.splice(0,1);
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
        [ ...history] = historyBackUp;
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
            default:
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


export default Reconcile;