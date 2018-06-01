/**
 * Deprecated
 *
 * import React from "react";
 import 'react-dates/initialize';
 import { SingleDatePicker } from 'react-dates';
 import 'react-dates/lib/css/_datepicker.css';


 class SingDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate:"",
            focused:true
        };
    }

    render() {
        return(
            <SingleDatePicker
                date={this.state.startDate}
                onDateChange={startDate => this.setState({ startDate })}
                focused={this.state.focused}
                isOutsideRange={() => false}
                onFocusChange={({ focused }) => this.setState({ focused })}
            />
        )
    };
}

 export default SingDatePicker;
 */

