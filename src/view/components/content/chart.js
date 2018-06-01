/**
 *
 * Deprecated
 *
 * import React, { Component } from 'react';
 // import { Link,Redirect} from 'react-router-dom';
 import {Bar} from 'react-chartjs-2';


 class Chart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data :{
                labels: ['Jan',"Feb","March","April","May"],
                datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: [20, 16,19, 20, 17,]
                    },
                    {
                        label: 'My First dataset',
                        backgroundColor: '#FAEBCC',
                        borderColor: '#FAEBCC',
                        borderWidth: 1,
                        hoverBackgroundColor: '#FAEBCC',
                        hoverBorderColor: '#FAEBCC',
                        data: [20, 16,19, 20, 13]
                    }
                ]
            }
        };

    }

    componentDidMount() {
    }

    render() {
        return (
            <Bar
                data={this.state.data}
                options={{
                    //maintainAspectRatio: false
                }}
            />
        )
    }
};

 export default Chart;
 */

