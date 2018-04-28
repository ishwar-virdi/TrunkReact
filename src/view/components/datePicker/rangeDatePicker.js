import React from "react";
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class rangeDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate:null,
            endDate:null,
            startDateId: "startDateId",
            endDateId: "endDateId",
            focusedInput:"START_DATE"
        }
    }

    render() {
        return(
            <div>
                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId={this.state.startDateId} // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId={this.state.endDateId} // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    isOutsideRange={() => false}
                />
            </div>
        )
    };
}

export default rangeDatePicker;