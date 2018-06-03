import React,{Component} from "react";

import "../../../stylesheets/mainPage/home/dashboard.css";
import Indicator from "./indicator";

import {Bar} from 'react-chartjs-2';
import axios from "axios/index";
import {apiurl} from "../../../config/constants";
import Loading from "../../components/content/loading";
import {Redirect} from "react-router-dom";
import moment from "moment/moment";

class Dashboard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loading:"false",
            page:"monthly",
            chartMinIndex:96,
            chartIndex:100,
            chartMaxIndex:104,
            chartReconcile:{},
            chartTotalAmount:{},
            chartDailyTransaction:{},
            reconcileOption:{
                responsive: true,
                maintainAspectRatio: false,
                legend: { display: true},
                scales: {
                    xAxes: [{
                        labelMaxWidth: 200,
                        gridLines: {
                            offsetGridLines: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Quantity'
                        }
                    }],
                },
                tooltips: {
                    callbacks: {
                        label: function (t, d) {
                            let xLabel = d.datasets[t.datasetIndex].label;
                            let yLabel =  ' Quantity： ' + t.yLabel;
                            return xLabel + yLabel;
                        }
                    }
                }
            },
            monthlyOption:{
                responsive: true,
                maintainAspectRatio: false,
                legend: { display: true},
                scales: {
                    xAxes: [{
                        labelMaxWidth: 200,
                        gridLines: {
                            offsetGridLines: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Total Amount'
                        }
                    }],
                },
                tooltips: {
                    callbacks: {
                        label: function (t, d) {
                            let xLabel = d.datasets[t.datasetIndex].label;
                            let yLabel = t.yLabel >= 1000 ? '$' + t.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '$' + t.yLabel;
                            return xLabel + ': ' + yLabel;
                        }
                    }
                }
            },
            dailyOption:{
                responsive: true,
                maintainAspectRatio: false,
                legend: { display: true},
                scales: {
                    xAxes: [{
                        labelMaxWidth: 200,
                        gridLines: {
                            offsetGridLines: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Total Amount'
                        }
                    }],
                },
                tooltips: {
                    callbacks: {
                        label: function (t, d) {
                            let xLabel = d.datasets[t.datasetIndex].label;
                            let yLabel = t.yLabel >= 1000 ? '$' + t.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '$' + t.yLabel;
                            return xLabel + ': ' + yLabel;
                        }
                    }
                }
            },
            monthTota1Index:0,
            dailyTransactionIndex:0,
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.handleLeftClick = this.handleLeftClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
    }

    componentDidMount() {
        this.requestReconcileChart();
        this.requestMonthTotalChart(0);
        this.requestDailyTransaction(0);
        window.addEventListener('wheel', this.handleScroll, { passive: true });
        this.props.setTitle("Reconcile quantity chart");
    }

    componentWillUnmount() {
        window.removeEventListener('wheel',this.handleScroll);
        this.setState({
            loading:"false"
        });
    }

    requestReconcileChart(){
        this.setState({
            loading:"true"
        });
        axios({
            withCredentials: true,
            method: 'GET',
            url: apiurl + "/api/getChartData",
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            }
        })
            .then(
                (response) => {
                    this.setState({
                        loading:"false"
                    });
                    if(response.data === ""){
                        localStorage.clear();
                        this.forceUpdate();
                        return;
                    }
                    let data = response.data;
                    //console.log(data.labels);
                    let reconciled = data.reconciled;
                    let notReconciled = data.notReconciled;

                    let chartReconcile ={
                        labels: data.labels.reverse(),
                        datasets: [
                            {
                                label: reconciled.label,
                                data: reconciled.data.reverse(),
                                backgroundColor: "#E57373",
                            },
                            {
                                label: notReconciled.label,
                                data: notReconciled.data.reverse(),
                                backgroundColor:  "#7986CB",
                            }
                        ]
                    };
                    this.setState({
                        chartReconcile:chartReconcile,
                    });
                },
                (error) => {
                    this.setState({
                        loading:"false"
                    });
                });
    }
    requestMonthTotalChart(page){
        this.setState({
            loading:"true"
        });
        axios({
            withCredentials: true,
            method: 'GET',
            url: apiurl + "/api/v1/monthTotalAmount?page="+page,
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            }
        })
            .then(
                (response) => {
                    this.setState({
                        loading:"false"
                    });
                    if(response.data === ""){
                        localStorage.clear();
                        this.forceUpdate();
                        return;
                    }
                    let labels = [];
                    let settles = [];
                    let banks = [];
                    let data = response.data.reverse();
                    for(let i = 0; i < data.length;i++){
                        labels[i] = data[i].date;
                        settles[i] = data[i].settleTotal;
                        banks[i] = data[i].bankTotal;
                    }
                    let chart ={
                        labels: labels,
                        datasets: [
                            {
                                label: "Total amounts of settlement",
                                data: settles,
                                backgroundColor: "#70bf54",
                            },
                            {
                                label: "Total amounts of bank statement",
                                data: banks,
                                backgroundColor:  "#464f53",
                            }
                        ]
                    };
                    this.setState({
                        chartTotalAmount:chart,
                    });
                },
                (error) => {
                    this.setState({
                        loading:"false"
                    });
                    }
                )
            .catch(() => {
                this.setState({
                    loading:"false"
                });
            })
        ;
    }
    requestDailyTransaction(pageIndex){
        this.setState({
            loading:"true"
        });

        axios({
            withCredentials: true,
            method: 'GET',
            url: apiurl + "/api/v1/getDailyTransaction?page=" + pageIndex ,
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            }
        })
            .then(
                (response) => {
                    this.setState({
                        loading:"false"
                    });
                    if(response.data === ""){
                        localStorage.clear();
                        this.forceUpdate();
                        return;
                    }
                    let labels = [];
                    let settleVisa = [];
                    let settleDebit = [];
                    let settleAmex = [];
                    let bankVisa = [];
                    let bankDebit = [];
                    let bankAmex = [];
                    let data = response.data;
                    for(let i = 0; i < data.length;i++){
                        labels[i] = data[i].date;
                        settleVisa[i] = data[i].settleVisa;
                        settleDebit[i] = data[i].settleDebit;
                        settleAmex[i] = data[i].settleAmex;
                        bankVisa[i] = data[i].bankVisa;
                        bankDebit[i] = data[i].bankDebit;
                        bankAmex[i] = data[i].bankAmex;
                    }
                    let chart ={
                        labels: labels,
                        datasets: [
                            {
                                label: "Settle visa",
                                data: settleVisa,
                                backgroundColor: "#1a1f71",
                            },
                            {
                                label: "Bank visa",
                                data: bankVisa,
                                backgroundColor: "#262ca6",
                            },
                            {
                                label: "Settle debit",
                                data: settleDebit,
                                backgroundColor: "#1a1a1a",
                            },
                            {
                                label: "Bank debit",
                                data: bankDebit,
                                backgroundColor: "#262626",
                            },{
                                label: "Settle amex",
                                data: settleAmex,
                                backgroundColor: "#6CC4EE",
                            },
                            {
                                label: "Bank amex",
                                data: bankAmex,
                                backgroundColor: "#9BD4F5",
                            },
                        ]
                    };
                    this.setState({
                        chartDailyTransaction:chart,
                    });
                },
                (error) => {
                    this.setState({
                        loading:"false"
                    });
                    console.log(error);
                })
            .catch(() => {
                this.setState({
                    loading:"false"
                });
            })
        ;
    }
    handleScroll(event) {
        if(this.isScrollUp(event)){
            this.setChartIndex("up");
        }else{
            this.setChartIndex("down");
        }
        this.chartUpdate();
    }

    isScrollUp(event){
        return event.wheelDeltaY > 0;
    }
    setChartIndex(action){
        let nextIndex;
        if(action === "up"){
            nextIndex = this.state.chartIndex + 1;
        }else if(action === "down"){
            nextIndex = this.state.chartIndex - 1;
        }

        if(nextIndex < this.state.chartMinIndex || nextIndex > this.state.chartMaxIndex){
            return
        }

        this.setState({
            updated:true,
            chartIndex:nextIndex,
        });
    }

    chartUpdate(){

        let index = this.state.chartIndex;

        if(index === this.state.chartMinIndex){
            this.setState({
                page:"daily",
                chartData:this.state.chartDailyTransaction,
            });
            this.props.setTitle("Daily total amounts chart");
        }else if(index === 100){
            this.setState({
                page:"monthly",
                chartData:this.state.chartTotalAmount,
            });
            this.props.setTitle("Monthly total amounts chart");
        }else if(index === this.state.chartMaxIndex){
            this.setState({
                page:"reconcile",
                chartData:this.state.chartReconcile,
            });
            this.props.setTitle("Reconcile quantity chart");
        }else{
        }
    }

    handleLeftClick(){
        let pageIndex = this.state.pageIndex + 1;
        switch (this.state.page){
            case "monthly":{
                pageIndex = this.state.monthTota1Index + 1;
                this.setState({
                    monthTota1Index: pageIndex
                });
                this.requestMonthTotalChart(pageIndex);
                break;
            }
            case "daily":{
                pageIndex = this.state.dailyTransactionIndex + 1;
                this.setState({
                    dailyTransactionIndex: pageIndex
                });
                this.requestDailyTransaction(pageIndex);
                break;
            }default:{

            }
        }
    }

    handleRightClick(){
        let pageIndex;
        switch (this.state.page){
            case "monthly":{
                pageIndex = this.state.monthTota1Index - 1;
                if(pageIndex < 0){
                    return;
                }
                this.setState({
                    monthTota1Index: pageIndex
                });
                this.requestMonthTotalChart(pageIndex);
                break;
            }
            case "daily":{
                pageIndex = this.state.dailyTransactionIndex - 1;
                if(pageIndex < 0){
                    return;
                }
                this.setState({
                    dailyTransactionIndex: pageIndex
                });
                this.requestDailyTransaction(pageIndex);
                break;
            }
            default:{

            }
        }

    }
    pageToolkit = () =>{
        let page  = this.state.page;
        if(page === "daily"
            || page === "monthly"){
            //console.log("a");
            return (
            <div className="date-Button">
                <div className="transition home-arrowLeft">
                    <svg onClick={this.handleLeftClick} className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-xiangzuo"></use>
                    </svg>
                </div>
                <div className="transition home-arrowRight">
                    <svg onClick={this.handleRightClick} className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-msnui-triangle-right"></use>
                    </svg>
                </div>
            </div>
            );
        }
    };

    render(){
        const isLogin = localStorage.getItem('login');
        let toolKit = this.pageToolkit();

        let lists;

        switch (this.state.page){
            case "monthly":
                lists = <Bar data={this.state.chartTotalAmount} options={this.state.monthlyOption}/>;
                break;
            case "daily":
                lists = <Bar data={this.state.chartDailyTransaction} options={this.state.dailyOption}/>;
                break;
            case "reconcile":
                lists = <Bar data={this.state.chartReconcile} options={this.state.reconcileOption}/>;
                break;
            default:
                break;
        }

        return (
            <div className="dashboard">
                {
                    isLogin === null ? (<Redirect to={{pathname:'/login'}}/>)
                        : null
                }
                {lists}
                <Indicator min={this.state.chartMinIndex} max={this.state.chartMaxIndex} index={this.state.chartIndex}/>
                {toolKit}
                <Loading visible={this.state.loading}/>
            </div>
        )
    }
};

export default Dashboard;