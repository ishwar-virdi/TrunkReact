import React from 'react';
import "../../../stylesheets/result.css";
import Chart from "../chart";
import ResultItem from "../resultItem";
import SingleDatePicker from "../datePicker/SingleDatePicker";

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data :{
                labels: ['January'],
                datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: [65]
                    },
                    {
                        label: 'My First dataset',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: [65]
                    }
                ]
            },
            datePicker: "Daily",
        };
    }

    render() {
        return (
            <div className="main-wrapper">
                <div className="result-title">
                    <p>Reconciliation result</p>
                </div>
                <div className="main-content ">
                    <div className="chart-content boxShadow">
                        <p>Recent Results</p>
                        <Chart data={this.state.data}/>
                    </div>
                    <div className="detail-content boxShadow">
                        <div className="timePicker">
                            <div className="time-Label fl">
                                <p>Select week</p>
                            </div>
                            <div className="time-Selected fl">
                                <SingleDatePicker/>
                            </div>

                        </div>
                        <div className="detail-page">
                            <ul>
                                <li className="boxShadow">
                                    <div className="item-title-name fontBold">
                                        <p>Week</p>
                                    </div>
                                    <div className="item-title-result fontBold">
                                        <p>Result</p>
                                    </div>
                                </li>
                                <ResultItem class=""/>
                                <ResultItem class="bgGrey"/>
                            </ul>
                        </div>
                        <div className="detail-btn-group">
                            <ul>
                                <li><a className="gstBtn picker-isClicked">Daily</a></li>
                                <li><a className="gstBtn">Weekly</a></li>
                                <li><a className="gstBtn">Monthly</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Result;