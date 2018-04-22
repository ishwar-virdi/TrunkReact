import React, { Component } from 'react';
// import { Link,Redirect} from 'react-router-dom';
import {Bar} from 'react-chartjs-2';


class Chart extends Component{
    constructor(props) {
        super(props);


    }

    componentDidMount() {
    }

    render() {
        return (
            <Bar
                data={this.props.data}
                options={{
                    maintainAspectRatio: false
                }}
            />
        )
    }
};

export default Chart;