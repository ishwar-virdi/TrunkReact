import React from "react";
import FormSeperateLayerfrom from "./formSeperateLayer";
//import "../../../stylesheets/mainPage/result/reconcile.css";
import ReconcileItem from './reconcileItem';
import moment from "moment";
import {apiurl} from "../../../config/constants";
import axios from "axios/index";
import {Redirect} from "react-router-dom";


let history;
let historyBackUp = [
    //{month:0,letter:"Recently"},
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
let sortItems = [];
class Reconcile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: {
                isTitle: true,
                time: "Last Modified ",
                dateRange: "Month",
                status: "Reconciled (%)"
            },
            pageIndex:0,
            items: [],
            isEnd: false,
            notDataFound:"rt-notDateFound",
        };
        this.handleNextPage = this.handleNextPage.bind(this);
    }

    componentDidMount() {
        this.setState({
            notDataFound:"rt-notDateFound"
        });
        this.requestResult(0);
    }

    componentWillUnmount() {
        this.props.visibleLoading("false");
    }

    componentDidUpdate(previousProps){
        if(
            previousProps.searchResult !== this.props.searchResult
        ){
            let list = [];
            for(let i = 0; i < this.props.searchResult.length;i++){
                list.push(this.jsonToResult(this.props.searchResult[i]));
            }
            sortItems = list;
        }
    }

    requestResult(pageIndex){
        this.props.visibleLoading("true");
        axios({
            withCredentials: true,
            method: 'GET',
            url: apiurl + "/api/v1/results?page=" + pageIndex,
        })
            .then(
                (response) => {
                    this.props.visibleLoading("false");
                    let data = response.data;
                    if(data === ""){
                        localStorage.clear();
                        this.forceUpdate();
                        return;
                    }
                    for(let i = 0; i < data.length;i++){
                        let result = this.jsonToResult(data[i]);
                        this.setState(prevState => ({
                            items: [...prevState.items, result]
                        }))
                    }
                    if(data.length < 20){
                        this.setState({
                            isEnd:true
                        })
                    }
                },
                (error) => {
                    console.log(error);
                    this.props.visibleLoading("false");
                }
            );
        this.setState({
            notDataFound:"rt-notDateFound rt-notDateFound-hidden"
        });
    }

    jsonToResult(json){
        if(json['reconcileDate'] === ""){
            return;
        }
        let result = {};
        let date;
        let month;
        date = moment(json['reconcileDate'].toString(),"MM/DD/YYYY HH:mm").format('DD MMM. YY HH:mm');
        month = json['startDate'].toString();
        result.id = json['reconcileResultId'].toString();
        result.time = date;
        result.dateRange = month;
        result.status = json['percentage'];
        return result;
    };
    calculateTime(timeArray) {
        let time;
        let num = timeArray[0];
        let unit = timeArray[1];
        switch(unit){
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
                time = 0;
        }
        return time;
    };
    isTimeTitle(totalTime){
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
    pushTimeTitle(lists,key){
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

    handleNextPage(){
        if(this.state.isEnd === false
        && this.props.sort === "time"){
            let index = this.state.pageIndex + 1;
            this.setState({
                pageIndex: index,
            });
            this.requestResult(index);
        }
    };
    returnListByTime(){
        //restore history
        [ ...history] = historyBackUp;
        sortItems = this.state.items;

        let lists = [];
        const items = this.state.items;

        let timeFromNow = [];
        let totalTime;
        for (let i=0; i<items.length; i++) {
            timeFromNow = moment(items[i].time,"DD MMM. YY HH:mm").fromNow().split(" ");
            totalTime = this.calculateTime(timeFromNow);

            if(this.isTimeTitle(totalTime)){
                this.pushTimeTitle(lists,"time"+i);
            }
            lists.push(<ReconcileItem key={i} value={items[i]}/>);
        }
        return lists;
    };
    returnListByDateRange(){
        let getTime = (item) =>{
            let timeFromNow = moment(item.dateRange,"MMM. YY").fromNow().split(" ");
            return timeFromNow
        };
        let lists = [];
        let value;
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
    returnListByStatus(){
        let lists = [];
        let value;
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
    returnSearchList(){
        let lists = [];
        if(this.props.searchResult.length <= 0){
        }else{
            for(let i = 0; i < sortItems.length;i++){
                let value = sortItems[i];
                lists.push(<ReconcileItem key={i} value={value}/>);
            }
        }
        return lists;
    };
    render() {
        const sort = this.props.sort;
        const isLogin = localStorage.getItem('login');
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
            <ul className="reconcile-content" ref={ (divElement) => this.divElement = divElement}>
                {
                    isLogin === null ? (<Redirect to={{pathname:'/login'}}/>)
                        : null
                }
                <ReconcileItem value={this.state.title}
                               setSort={sort => this.props.setSort(sort)}
                               setNotFoundVisible = {(visible)=>this.props.setNotFoundVisible(visible)}
                />
                {lists}
                <p onClick={this.handleNextPage} className="transition result-nextPage">Next Page</p>
            </ul>
        );
    }
}

export default Reconcile;