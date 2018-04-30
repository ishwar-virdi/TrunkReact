import React,{Component} from "react";

import "../../../stylesheets/mainPage/home/dashboard.css";
import {Bar} from 'react-chartjs-2';



// let _chartSmall = null;
// let _chartMid = null;
// let _chartLarge = null;
// let chartSmall =() =>{
//     let data = {
//         labels: ["Team1", "Team2", "Team3", "Team4", "Team5"],
//         datasets: [
//             {
//                 label: "Team points",
//                 data: [503, 385, 270, 133, 65],
//                 backgroundColor: ["#4DB6AC", "#E57373", "#7986CB", "#F06292", "#E0E0E0"]
//             },
//             {
//                 label: "Team points",
//                 data: [503, 385, 270, 133, 65],
//                 backgroundColor: ["#4DB6AC", "#E57373", "#7986CB", "#F06292", "#E0E0E0"]
//             },
//             {
//                 label: "Team points",
//                 data: [503, 385, 270, 133, 65],
//                 backgroundColor: ["#4DB6AC", "#E57373", "#7986CB", "#F06292", "#E0E0E0"]
//             },
//             {
//                 label: "Team points",
//                 data: [503, 385, 270, 133, 65],
//                 backgroundColor: ["#4DB6AC", "#E57373", "#7986CB", "#F06292", "#E0E0E0"]
//             }
//         ]
//     };
//     return _chartSmall;
// }
// let chartMid = () => {
//     let data1 = {
//         labels: ["Team1", "Team2", "Team3", "Team4", "Team5"],
//         datasets: [
//             {
//                 label: "Team points 1",
//                 data: [503, 385, 21, 133, 65],
//                 backgroundColor: ["#4DB6AC", "#E57373", "#7986CB", "#F06292", "#E0E0E0"]
//             },
//             {
//                 label: "Team points 1",
//                 data: [503, 385, 270, 133, 65],
//                 backgroundColor: ["#4DB6AC", "#E57373", "#7986CB", "#F06292", "#E0E0E0"]
//             }
//         ]
//     };
//     return _chartMid;
//
// };
// let chartLarge = () =>{
//     return _chartLarge;
// };
class Dashboard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            updated: false,
            chartIndex:1,
            chartData:null,
            option:{
                responsive: true,
                maintainAspectRatio: false,
                legend: { display: true},
                onClick: function(event, array) {
                    let element = this.getElementAtEvent(event);
                    if (element.length > 0) {
                        let series= element[0]._model.datasetLabel;
                        let label = element[0]._model.label;
                        let value = this.data.datasets[series].data[label];
                        console.log(value);
                        window.open('http://localhost:3000/detail/'+value);
                    }
                },
                // title: {
                //     display: true,
                //     text: 'Title'
                // },
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
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this._chartSmall = {
            labels: ["Team1", "Team2", "Team3", "Team4", "Team5"],
            datasets: [
                {
                    label: "Team points 0",
                    data: [53, 385, 270, 133, 15],
                    backgroundColor: "#E57373"
                },
                {
                    label: "Team points 1",
                    data: [503, 305, 27, 13, 45],
                    backgroundColor: "#7986CB"
                },
                {
                    label: "Team points 2",
                    data: [153, 325, 239, 133, 25],
                    backgroundColor: "#F06292"
                },
                {
                    label: "Team points 3",
                    data: [523, 185, 170, 96, 64],
                    backgroundColor: "#4DB6AC"
                }
            ]
        };
        this._chartMid = {
            labels: ["Team1", "Team2", "Team3", "Team4", "Team5"],
            datasets: [
                {
                    label: "Team points 1",
                    data: [203, 385, 21, 123, 105],
                    backgroundColor: "#E57373",
                },
                {
                    label: "Team points 12",
                    data: [207, 335, 70, 33, 165],
                    backgroundColor:  "#7986CB",
                }
            ]
        };
        this._chartLarge = {
            labels: ["Team1", "Team2", "Team3", "Team4", "Team5"],
            datasets: [
                {
                    label: "Team points 2",
                    data: [303, 185, 470, 313, 65],
                    backgroundColor: ["#7986CB", "#7986CB", "#7986CB", "#7986CB", "#7986CB"]
                }
            ]
        };
        this.setState({
            chartData:this._chartMid,
        });
        window.addEventListener('wheel', this.handleScroll, { passive: true })
    }

    chartSmall =() =>{
        return this._chartSmall;
    };
    chartMid = () => {
        return this._chartMid;
    };
    chartLarge = () =>{
        return this._chartLarge;
    };

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

        if(nextIndex < 0 || nextIndex > 2){
            return
        }

        this.setState({
            updated:true,
            chartIndex:nextIndex,
        });
    }
    chartUpdate(){
        if(!this.state.updated){
            return
        }

        let index = this.state.chartIndex;
        let chartData;
        if(index === 0){
            chartData = this.chartSmall;
        }else if(index === 1){
            chartData = this.chartMid;
        }else if(index === 2){
            chartData = this.chartLarge;
        }else{
            throw new Error("index is wrong");
        }
        this.setState({chartData, updated: !this.state.updated});
    }

    render(){
        const {chartData} = this.state;
        return (
            <div className="dashboard">
                {
                    chartData !== null ||"" ? (<Bar data={this.state.chartData} options={this.state.option}/>)
                        : null
                }
            </div>
        )
    }
};

export default Dashboard;