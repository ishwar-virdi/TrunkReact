import React,{Component} from "react";
import Header from "../../components/content/header";
import Title from "../../components/content/title";
import "../../../stylesheets/mainPage/detail/detail.css";
import SearchBar from "../../components/content/searchBar";
import Footer from "../../components/content/footer";

class detail extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render(){
        return (
            <div className="container">
                <Header clickedClass="History"/>
                <div className="body">
                    <Title title="SHOW RESULTS - TIME"/>
                    <SearchBar />

                    <div className="detail-view">
                        <table>
                            <tr>
                                <th>Bethany</th>
                                <th>Lastname</th>
                                <th>Age</th>
                            </tr>
                            <tr>
                                <td>Jill</td>
                                <td>Smith</td>
                                <td>50</td>
                            </tr>
                            <tr>
                                <td>Eve</td>
                                <td>Jackson</td>
                                <td>94</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
};

export default detail;