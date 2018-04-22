import React from 'react';
import "../../stylesheets/header.css";
import { Link,Redirect } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            clicked:props.clickedClass,
            redirect:null,
            items:["Home","Reconcile","History","Admin"],
        };

    }


    handleClick(params,e){
        if(params.value !== this.state.clicked){
            this.setState({
                redirect: params.value,
            });

        }
    }

    render() {
        const {items} = this.state;

        const fillItem = items.map((value,i)=>(
            this.state.clicked === value ? (
                <li><Link to={value.toLowerCase()} onClick={this.handleClick.bind(this,{value})} className="header-item clicked" key={i}>{value}</Link></li>
            ) : (
                <li><Link to={value.toLowerCase()} onClick={this.handleClick.bind(this,{value})} className="header-item" key={i}>{value}</Link></li>
            )
        ));
        return (
            <header>
                {/*{redirect === "Home" ||"" ? <Redirect to="/dashboard" />*/}
                    {/*: redirect === "Reconcile" ||"" ? <Redirect to="/reconcile" />*/}
                        {/*: redirect === "History" ||"" ? <Redirect to="/history" />*/}
                            {/*: redirect === "Admin" ||"" ? <Redirect to="/admin" />*/}
                        {/*: null}*/}
                <div className="headerLayer">
                    <div className="header-item-panel">
                        <ul className="header-content">
                            {fillItem}
                        </ul>
                    </div>
                    <div className="logout">
                        <a className="gstBtn">LogOut</a>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;