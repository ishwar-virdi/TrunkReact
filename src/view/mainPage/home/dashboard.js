import React,{Component} from "react";

import "../../../stylesheets/mainPage/home/dashboard.css";
import Indicator from "./indicator";

import {Bar} from 'react-chartjs-2';
import axios from "axios/index";
import {apiurl} from "../../../config/constants";
import Loading from "../../components/content/loading";

class Dashboard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            visible:"false",
            page:"reconcile",
            chartMinIndex:96,
            chartIndex:100,
            chartMaxIndex:104,
            chartData:{},
            chartReconcile:{},
            chartTotalAmount:{},
            chartDailyTransaction:{},
            option:{
                responsive: true,
                maintainAspectRatio: false,
                legend: { display: true},
                scales: {
                    xAxes: [{
                        labelMaxWidth: 200,
                        gridLines: {
                            offsetGridLines: false
                        },
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                        }
                    }],
                },
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
        window.addEventListener('wheel', this.handleScroll, { passive: true })
    }

    requestReconcileChart(){
        this.setState({
            visible:"true"
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
                        visible:"false"
                    });
                    let data = response.data;
                    let reconciled = data.reconciled;
                    let notReconciled = data.notReconciled;


                    let chartReconcile ={
                        labels: data.labels,
                        datasets: [
                            {
                                label: reconciled.label,
                                data: reconciled.data,
                                backgroundColor: "#E57373",
                            },
                            {
                                label: notReconciled.label,
                                data: notReconciled.data,
                                backgroundColor:  "#7986CB",
                            }
                        ]
                    };
                    this.setState({
                        chartData:chartReconcile,
                        chartReconcile:chartReconcile,
                    });

                this.setState({
                    chartData:this._chartMid,
                    loading : "false",

                });
    }
    requestMonthTotalChart(page){
        this.setState({
            visible:"true"
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
                        visible:"false"
                    });
                    let labels = [];
                    let settles = [];
                    let banks = [];
                    let data = response.data;
                    for(let i = 0, length = data.length; i < length;i++){
                        labels.push(data[i].date);
                        settles.push(data[i].settleTotal);
                        banks.push(data[i].bankTotal);
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
                    if(this.state.page === "total"){
                        this.setState({
                            chartData:chart,
                        });
                    }
                });
    }
    requestDailyTransaction(pageIndex){

        this.setState({
            visible:"true"
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
                        visible:"false"
                    });
                    let labels = [];
                    let settleVisa = [];
                    let settleDebit = [];
                    let settleAmex = [];
                    let bankVisa = [];
                    let bankDebit = [];
                    let bankAmex = [];
                    let data = response.data;
                    for(let i = 0, length = data.length; i < length;i++){
                        labels.push(data[i].date);
                        settleVisa.push(data[i].settleVisa);
                        settleDebit.push(data[i].settleDebit);
                        settleAmex.push(data[i].settleAmex);
                        bankVisa.push(data[i].bankVisa);
                        bankDebit.push(data[i].bankDebit);
                        bankAmex.push(data[i].bankAmex);
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
                    if(this.state.page === "daily"){
                        this.setState({
                            chartData:chart,
                        });
                    }
                });
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
        }else{
            throw new Error("action is wrong");
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
        }else if(index === 100){
            this.setState({
                page:"reconcile",
                chartData:this.state.chartReconcile,

            });
        }else if(index === this.state.chartMaxIndex){
            this.setState({
                page:"total",
                chartData:this.state.chartTotalAmount,

            });
        }else{
        }
    }

    handleLeftClick(){
        let pageIndex;
        switch (this.state.page){
            case "total":{
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
        }
    }

    handleRightClick(){
        let pageIndex = this.state.pageIndex + 1;
        switch (this.state.page){
            case "total":{
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
            }
        }
    }
    pageToolkit = () =>{
        let page  = this.state.page;
        if(page === "daily"
            || page === "total"){
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
        const {chartData} = this.state;

        let toolKit = this.pageToolkit();
        return (

            <div className="dashboard">
                {
                    chartData !== null ||"" ? (<Bar data={this.state.chartData} options={this.state.option}/>)
                        : null
                }

                <Indicator min={this.state.chartMinIndex} max={this.state.chartMaxIndex} index={this.state.chartIndex}/>
                {toolKit}
                <Loading visible={this.state.visible}/>
            </div>
        )
    }
};

export default Dashboard;