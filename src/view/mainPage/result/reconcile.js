import React from "react";
import FormSeperateLayerfrom from "./formSeperateLayer";

import "../../../stylesheets/mainPage/result/reconcile.css";
import ReconcileItem from './reconcileItem';
import moment from "moment";
import {apiurl} from "../../../config/constants";
import axios from "axios/index";

let parseToDate = (string) =>{
    return string.slice(4,6) + "/" + string.slice(6,8)  + "/" + string.slice(0,4);
};
let history;
let historyBackUp = [
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

            items: [],
            sortItems:[],
        };
    }

    componentDidMount() {
        this.props.visibleLoading();
        axios({
            withCredentials: true,
            method: 'GET',
            url: apiurl + "/api/v1/results",
        })
            .then(
                (response) => {
                    this.props.hiddenLoading();
                    let items = [];
                    let data = response.data;
                    for(let i = 0; i < data.length;i++){
                        let result = this.jsonToResult(data[i]);
                        items.push(result);
                    }
                    this.setState({
                        sortItems:items,
                        items:items
                    });
                },
                (error) => {
                    this.props.hiddenLoading();
                }
            );
    }
    componentDidUpdate(previousProps){
        if(
            (previousProps.searchResult !== this.props.searchResult)

        ){
            let list = [];
            for(let i = 0; i < this.props.searchResult.length;i++){
                list.push(this.jsonToResult(this.props.searchResult[i]));
            }
            this.setState({
                sortItems:list,
            });
        }
    }
    jsonToResult =(json) =>{
        let result = {};
        let reconcileDate;
        let dateRange;
        reconcileDate = json['reconcileDate'].toString();
        reconcileDate = parseToDate(reconcileDate) + " "
            + json['reconcileTime'];
        //dateRange
        dateRange = parseToDate(json['startDate'].toString()) + " - " + parseToDate(json['endDate'].toString());
        result.id = json['startDate'].toString() + json['endDate'].toString();
        result.time = reconcileDate;
        result.dateRange = dateRange;
        result.status = json['percentage'];

        return result;
    };
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
        //restore history
        [ ...history] = historyBackUp;
        let lists = [];
        const items = this.state.items;
        let timeFromNow = [];
        let totalTime;
        for (let i=0; i<items.length; i++) {
            timeFromNow = moment(items[i].time,"MM/DD/YYYY HH:mm").fromNow().split(" ");
            totalTime = this.calculateTime(timeFromNow);
            if(this.isTimeTitle(totalTime)){
                this.pushTimeTitle(lists,"time"+i);
            }
            lists.push(<ReconcileItem key={i} value={items[i]}/>);
        }
        return lists;
    };
    returnListByDateRange = () =>{
        let getTime = (item) =>{
            let tempTime = item.dateRange.split("-");
            let endTime = tempTime[1];
            let timeFromNow = moment(endTime,"MM/DD/YYYY").fromNow().split(" ");
            return timeFromNow
        };
        let lists = [];
        let value;
        const sortItems = this.state.sortItems;

        let order = Object.keys(sortItems).sort(
            (a,b)=>{
                let aTimeFromNow = this.calculateTime(getTime(sortItems[a]));
                let bTimeFromNow = this.calculateTime(getTime(sortItems[b]));
                return aTimeFromNow - bTimeFromNow;
            }
        );
        for(let key in order){
            value = sortItems[order[key]];
            lists.push(<ReconcileItem key={key} value={value}/>);
        }
        return lists;
    };
    returnListByStatus = () =>{
        let lists = [];
        let value;
        const sortItems = this.state.sortItems;
        let order = Object.keys(sortItems).sort(
            function(a,b){
                return sortItems[a].status - sortItems[b].status;
                }
            );
        for(let key in order){
            value = sortItems[order[key]];
            lists.push(<ReconcileItem key={key} value={value}/>);
        }
        return lists;
    };
    returnSearchList = ()=>{
        let lists = [];
        if(this.props.searchResult.result === "fail"){
        }else{
            let result = this.state.sortItems;
            for(let i = 0; i < result.length;i++){
                let value = result[i];
                lists.push(<ReconcileItem key={i} value={value}/>);
            }
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
            <ul className="reconcile-content">
                <ReconcileItem value={this.state.title} setSort={sort => this.props.setSort(sort)}/>
                {lists}
            </ul>
        );
    }
}


export default Reconcile;