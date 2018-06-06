import React,{Component} from "react";
//import "../../../stylesheets/mainPage/home/dashboard.css";
import {Bar} from 'react-chartjs-2';
import axios from "axios/index";
import {apiurl} from "../../../config/constants";
import Loading from "../../components/content/loading";
import {Redirect} from "react-router-dom";

class Dashboard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loading:"false",
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
                            labelString: 'Total Amount ($)'
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
                            labelString: 'Total Amount ($)'
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
            arrowLeft:"home-arrowLeft",
            arrowRight:"home-arrowRight border-right",
        };

        this.handleLeftClick = this.handleLeftClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
    }

    componentDidMount() {
        this.requestReconcileChart();
        this.requestMonthTotalChart(0);
        this.requestDailyTransaction(0);
    }

    componentDidUpdate(previousProps){
        if(
            previousProps.chartIndex !== this.props.chartIndex
        ){
            this.indicator();
        }
    }

    indicator(){
        let chartIndex = this.props.chartIndex;
        switch (chartIndex){
            case 104:
                this.setState({
                    arrowLeft:"home-arrowLeft border-top",
                    arrowRight:"home-arrowRight"
                });
                break;
            case 102:
                this.setState({
                    arrowLeft:"home-arrowLeft",
                    arrowRight:"home-arrowRight border-top"
                });
                break;
            case 100:
                this.setState({
                    arrowLeft:"home-arrowLeft",
                    arrowRight:"home-arrowRight border-right"
                });
                break;
            case 98:
                this.setState({
                    arrowLeft:"home-arrowLeft",
                    arrowRight:"home-arrowRight border-bottom"
                });
                break;
            case 96:
                this.setState({
                    arrowLeft:"home-arrowLeft border-bottom",
                    arrowRight:"home-arrowRight"
                });
                break;
        }
    };
    componentWillUnmount() {
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
                                backgroundColor:  "#7986CB",
                            },
                            {
                                label: notReconciled.label,
                                data: notReconciled.data.reverse(),
                                backgroundColor: "#E57373",
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
                                label: "Total amounts of settlement ($)",
                                data: settles,
                                backgroundColor: "#70bf54",
                            },
                            {
                                label: "Total amounts of bank statement ($)",
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
                                backgroundColor: "#4056A1",
                            },
                            {
                                label: "Bank visa",
                                data: bankVisa,
                                backgroundColor: "#1B9CE5",
                            },
                            {
                                label: "Settle debit",
                                data: settleDebit,
                                backgroundColor: "#1a1a1a",
                            },
                            {
                                label: "Bank debit",
                                data: bankDebit,
                                backgroundColor: "#8590AA",
                            },{
                                label: "Settle amex",
                                data: settleAmex,
                                backgroundColor: "#3AAFA9",
                            },
                            {
                                label: "Bank amex",
                                data: bankAmex,
                                backgroundColor: "#88DDBC",
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


    handleLeftClick(){
        let pageIndex = this.state.pageIndex + 1;
        switch (this.props.page){
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
        switch (this.props.page){
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
    pageToolkit(){
        let page  = this.props.page;
        if(page === "daily"
            || page === "monthly"){
            return (
            <div className="transition date-Button">
                <div className={this.state.arrowLeft}>
                    <svg onClick={this.handleLeftClick} className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-xiangzuo"></use>
                    </svg>
                </div>
                <div className={this.state.arrowRight}>
                    <svg onClick={this.handleRightClick} className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-msnui-triangle-right"></use>
                    </svg>
                </div>
            </div>
            );
        }else if(page === "reconcile"){
            return (
                <div className="transition date-Button">
                    <div className={this.state.arrowLeft}>
                    </div>
                    <div className={this.state.arrowRight}>
                    </div>
                </div>
            );
        }
    };

    render(){
        const isLogin = localStorage.getItem('login');
        let toolKit = this.pageToolkit();

        let lists;

        switch (this.props.page){
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
                {toolKit}
                <Loading visible={this.state.loading}/>
            </div>
        )
    }
};

export default Dashboard;