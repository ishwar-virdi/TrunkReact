import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
import Dashboard from "../../mainPage/home/dashboard";
import Footer from "../../components/content/footer";
//import "../../../stylesheets/mainPage/home/home.css";

class home extends Component{

    constructor(props){
        super(props);
        this.state={
            page:"monthly",
            chartMinIndex:96,
            chartIndex:100,
            chartMaxIndex:104,
            title:"",
            hint:"Shows the total monetary amount for the bank statement and settlement documents for each month",
        };
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount() {
        window.addEventListener('wheel', this.handleScroll, { passive: true });
        this.setState({
            title:"Bank and Settlement Total Amounts by Month"
        });
    }

    componentWillUnmount() {
        window.removeEventListener('wheel',this.handleScroll);
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
        }

        if(nextIndex < this.state.chartMinIndex || nextIndex > this.state.chartMaxIndex){
            return
        }

        this.setState({
            chartIndex:nextIndex,
        });
    }

    chartUpdate(){
        let index = this.state.chartIndex;

        if(index === this.state.chartMinIndex){
            this.setState({
                page:"daily",
                title:"Bank and Settlement Total Amounts by Day",
                hint:"Shows the total monetary amount categorized by transaction types for the bank statement and settlement documents for each day",
            });
        }else if(index === 100){
            this.setState({
                page:"monthly",
                title:"Bank and Settlement Total Amounts by Month",
                hint:"Shows the total monetary amount for the bank statement and settlement documents for each month",
            });
        }else if(index === this.state.chartMaxIndex){
            this.setState({
                page:"reconcile",
                title:"Reconcile Quantity by Month",
                hint:"Shows the count of reconciled and not reconciled settlement items",
            });
        }else{
        }
    }


    render(){
        return (
            <div className="container">
                <Header clickedClass="Dashboard"/>
                <div className="body">
                    <Title title={this.state.title}/>
                    <div className="chart-hint">
                        <svg className="transition icon" aria-hidden="true">
                            <use xlinkHref="#icon-icon"></use>
                        </svg>
                        <div className="transition chart-hint-box">
                            <div className="chart-hint-arrow"></div>
                            <div className="chart-hint-text">
                                <p>{this.state.hint}</p>
                            </div>
                        </div>
                    </div>
                    <div className="home-view">
                        <Dashboard
                            hintMessage = {this.state.hint}
                            title={this.state.title}
                            page={this.state.page}
                            chartIndex={this.state.chartIndex}
                        />
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
};

export default home;