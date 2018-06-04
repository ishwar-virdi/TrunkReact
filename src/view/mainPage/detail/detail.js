import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
//import "../../../stylesheets/mainPage/detail/detail.css";
import Footer from "../../components/content/footer";
import TransactionTable from "../detail/transactionTable"
import Loading from "../../components/content/loading";

class detail extends Component{

    constructor(props) {
        super(props);

        this.state = {
            id : props.match.params.id,
            loading:"false",
            title:"Reconcile Results",
        };
    }
    componentDidMount() {
    }

    visibleLoading(visible){
        this.setState({
            loading:visible,
        });
    };

    setTitle(title){
        this.setState({
            title:title,
        });
    };
    render(){
        return (
            <div className="container">
                <Header clickedClass="Result"/>
                <div className="body">
                    <Title title={this.state.title}/>
                    <div className="detail-view">
                        <TransactionTable
                            setTitle={(title)=>{
                                this.setTitle(title)
                            }}
                            id={this.state.id}
                            visibleLoading = {(visible)=>this.visibleLoading(visible)}/>
                    </div>
                </div>
                <Loading visible={this.state.loading}/>
                <Footer />
            </div>
        )
    }
}

export default detail;