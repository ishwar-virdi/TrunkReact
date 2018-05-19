import React from "react";
import "../../../stylesheets/mainPage/detail/transactionTable.css";
import NumberFormat from 'react-number-format';
import ReactTable from "react-table";
import moment from "moment/moment";

class TransactionTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isAllChecked: false
        }
        this.sortColumns = this.sortColumns.bind(this)
    }

    componentDidMount() {
        this.setState({
            items: [
                {
                    uniqueId: "0",
                    isChecked: false,
                    dateTime: "07/04/2018 15:20",
                    description: "",
                    amount: "533",
                    accountNumber: "12345678",
                    transactionType: "Direct Debit",
                    reconciled: true,
                    rule: "1"
                },
                {
                    uniqueId: "1",
                    isChecked: false,
                    dateTime: "09/04/2018 10:05",
                    description: "",
                    amount: "158",
                    accountNumber: "12345678",
                    transactionType: "Visa",
                    reconciled: true,
                    rule: "1"
                },
                {
                    uniqueId: "2",
                    isChecked: false,
                    dateTime: "09/04/2018 10:20",
                    description: "",
                    amount: "697",
                    accountNumber: "12345678",
                    transactionType: "Direct Debit",
                    reconciled: false,
                    rule: "4"
                },
                {
                    uniqueId: "3",
                    isChecked: false,
                    dateTime: "09/04/2018 12:30",
                    description: "",
                    amount: "451",
                    accountNumber: "12345678",
                    transactionType: "Mastercard",
                    reconciled: false,
                    rule: "5"
                },
                {
                    uniqueId: "4",
                    isChecked: false,
                    dateTime: "09/04/2018 16:14",
                    description: "",
                    amount: "20",
                    accountNumber: "12345678",
                    transactionType: "Visa",
                    reconciled: true,
                    rule: "1"
                },
                {
                    uniqueId: "5",
                    isChecked: false,
                    dateTime: "07/04/2018 15:18",
                    description: "",
                    amount: "1460",
                    accountNumber: "12345678",
                    transactionType: "Visa",
                    reconciled: true,
                    rule: "1"
                }
            ]
        });
    }

    selectOne = (isChecked, index) => {
        var items = this.state.items;

        items[index].isChecked = !isChecked;

        this.setState({
            items: items
        });
    };

    markAsReconciled = () => {
        var items = this.state.items;

        for (var i = 0; i < items.length; i++) {
            if (items[i].isChecked) {
                items[i].reconciled = true;
                items[i].rule = "Manually Marked"
            }
        }

        this.setState({
           items: items
        });
    };

    markAsNotReconciled = () => {
        var items = this.state.items;

        for (var i = 0; i < items.length; i++) {
            if (items[i].isChecked) {
                items[i].reconciled = false;
                items[i].rule = "Manually Marked"
            }
        }

        this.setState({
            items: items
        });
    };

    returnList = () => {
        const items = this.state.items;
        var list = [];

        for (var i = 0; i < items.length; i++) {
            list.push(<TransactionRow key={i} value={items[i]} isHeader={false} selectChanged={this.selectOne} index={i}/>);
        }

        return list;
    };


  /*  returnListByTime = () =>{
        let lists = [];
        const items = this.state.items;
        let timeFromNow = [];
        let totalTime;
        for (let i=0; i<items.length; i++) {
            timeFromNow = moment(items[i].time,"DD/MM/YYYY HH:mm").fromNow().split(" ");
            totalTime = this.calculateTime(timeFromNow);
            if(this.isTimeTitle(totalTime)){
                this.pushTimeTitle(lists,"time"+i);
            }
            lists.push(<ReconcileItem key={i} value={items[i]}/>);
        }
        //restore history
        [ ...history] = historyBackUp;
        return lists;
    };
*/

    returnListByAmount = () =>{
        let lists = [];
        let value;
        const items = this.state.items;

        let order = Object.keys(items).sort(
            function(a,b){
                return items[a].amount - items[b].amount;
            }
        );

        for (var i = 0; i < items.length; i++) {

            console.log(items)
            console.log(order)

        }

        for(let key in order){
            value = items[order[key]];
            lists.push(<TransactionRow key={key} value={items[key]} isHeader={false} selectChanged={this.selectOne} index={key}/>);
        }
        return lists;
    };



    sortColumns = (sortColumnName) => {

        let lists;
        switch(sortColumnName) {
            case "Amount":
                console.log("This is from amount switch...")
                lists = this.returnListByAmount();
                break;
            default:
                lists = this.returnList();
        }

        return lists;
    };


    selectAll = () => {
        var items = this.state.items;
        var changeTo = true;

        if (this.state.isAllChecked)
            changeTo = false;

        for (var i = 0; i < items.length; i++) {
            items[i].isChecked = changeTo;
        }

        this.setState({
            items: items,
            isAllChecked: changeTo
        });
    };

    onRowClick = (state, rowInfo, column, instance) => {
        return {
            onClick: e => {
                console.log('A Td Element was clicked!')
                console.log('it produced this event:', e)
                console.log('It was in this column:', column)
                console.log('It was in this row:', rowInfo)
                console.log('It was in this table instance:', instance)
            }
        }
    }

    render () {

        // table structure
        const { items } = this.state;

        var list = this.sortColumns();

        console.log("This is from render : ")


        var isAllChecked = true;

        for (var i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i].isChecked == false) {
                isAllChecked = false;
                break;
            }
        }

        const title  = {isChecked: isAllChecked,
                        dateTime: "Date/Time",
                        description: "Description",
                        amount: "Amount",
                        accountNumber: "Account Number",
                        transactionType: "Transaction Type",
                        reconciled: "Reconciled",
                        rule: "Rule"};


        return (

            <div>
                <ReactTable
                    data={items}
                    columns={[
                        {
                            Header: "Date / Time",
                            accessor: "dateTime"
                        },
                        {
                            Header: "description",
                            accessor: "description"
                        },
                        {
                            Header: "Amount",
                            accessor: "amount"
                        },
                        {
                            Header: "Account Number",
                            accessor: "accountNumber"
                        },
                        {
                            Header: "Transaction Type",
                            accessor: "transactionType"
                        },
                        {
                            Header: "Reconciled ",
                            accessor: "reconciled"
                        },
                        {
                            Header: "Rule",
                            accessor: "rule"
                        }
                    ]
                    }
                    defaultPageSize={10}
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick: (e, handleOriginal) => {
                                // console.log("A Td Element was clicked!");
                                // console.log("it produced this event:", e);
                                // console.log("It was in this column:", column);
                                console.log("It was in this row:", rowInfo);
                                // console.log("It was in this table instance:", instance);

                                // IMPORTANT! React-Table uses onClick internally to trigger
                                // events like expanding SubComponents and pivots.
                                // By default a custom 'onClick' handler will override this functionality.
                                // If you want to fire the original onClick handler, call the
                                // 'handleOriginal' function.
                                if (handleOriginal) {
                                    handleOriginal();
                                }
                            }
                        };
                    }}
                    />
                <br />
                <button type="button" onClick={this.markAsReconciled}>Mark as Reconciled</button>
                <button type="button" onClick={this.markAsNotReconciled}>Mark as Failed</button>
            </div>

/*
            <div>
                <table className="transaction-table">
                    <thead>
                        <TransactionHeadings sortCallBack={this.sortColumns} value={title} isHeader={true} selectChanged={this.selectAll}/>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
                <br />
                <button type="button" onClick={this.markAsReconciled}>Mark as Reconciled</button>
                <button type="button" onClick={this.markAsNotReconciled}>Mark as Failed</button>
            </div>

 */

        );
    }
}


// added another component as a table header
class TransactionHeadings extends React.Component {
    constructor(props) {
        super(props);
        this.sortByColumn = this.sortByColumn.bind(this)
    }

    sortByColumn = (columnName) => {
        console.log(columnName)

        this.props.sortCallBack(columnName);

    };

    render() {
        const value = this.props.value;
        // let className = this.props.isHeader ? "table-header" : "table-row";
        var amount = value.amount;
        var reconciled = "Successful";
        

        if (!value.reconciled)
            reconciled = "Failed";

        const isChecked = value.isChecked;
        const dateTime = value.dateTime;
        const description = value.description;
        const accountNumber = value.accountNumber;
        const transactionType = value.transactionType;
        const rule = value.rule;

        return (
            <tr className="table-header" >
                <th><InputCheckbox value={isChecked} onChange={this.props.selectChanged} index={this.props.index}/></th>
                <th onClick={() => this.sortByColumn(dateTime)}>{dateTime}</th>
                <th >{description}</th>
                <th onClick={() => this.sortByColumn(amount)}>{amount}</th>
                <th>{accountNumber}</th>
                <th>{transactionType}</th>
                <th>{reconciled}</th>
                <th>{rule}</th>
            </tr>
        );
    }
}

class TransactionRow extends React.Component {
    constructor(props) {
        super(props);
    }

    rowClicked = () => {
        console.log("Row " + this.props.index + " was clicked!");
    };

    render() {
        const value = this.props.value;
        let className = this.props.isHeader ? "table-header" : "table-row";
        var amount = value.amount;
        var reconciled = "Successful";

        //Formats the amount if it is not the header
        if (!this.props.isHeader)
            amount = <NumberFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'}/>;

        if (!value.reconciled)
            reconciled = "Failed";

        const isChecked = value.isChecked;
        const dateTime = value.dateTime;
        const description = value.description;
        const accountNumber = value.accountNumber;
        const transactionType = value.transactionType;
        const rule = value.rule;

        return (
            <tr className={className} onClick={this.rowClicked}>
                <td><InputCheckbox value={isChecked} onChange={this.props.selectChanged} index={this.props.index}/></td>
                <td>{dateTime}</td>
                <td>{description}</td>
                <td>{amount}</td>
                <td>{accountNumber}</td>
                <td>{transactionType}</td>
                <td>{reconciled}</td>
                <td>{rule}</td>
            </tr>
        );
    }
}


class InputCheckbox extends React.Component {
    constructor(props) {
        super(props);
    }

    handleOnChange = () => {
        //If it is the "Select All" checkbox, then don't try and parse the props
        if (this.props.index != null)
            this.props.onChange(this.props.value, this.props.index);
        else
            this.props.onChange()
    };

    render() {
        return (
            <input checked={this.props.value} type='checkbox' onChange={this.handleOnChange}/>
        )
    }
}

export default TransactionTable;