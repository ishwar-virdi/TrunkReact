import React from "react";
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


class SingDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate:"",
        }
    }

    render() {
        return(
            <div>
                <SingleDatePicker
                    date={this.state.date}
                    onDateChange={date => this.setState({ date })}
                    focused={this.state.focused}
                    onFocusChange={({ focused }) => this.setState({ focused })}
                />
            </div>
        )
    };
}

export default SingDatePicker;