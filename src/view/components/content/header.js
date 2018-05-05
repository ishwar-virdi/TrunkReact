import React from 'react';
import "../../../stylesheets/content/header.css";
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            clicked:props.clickedClass,
            redirect:null,
            items:["Home","Result","Upload"],
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
        let item = items.map((value,i)=>(
            this.state.clicked === value ? (
                <li key={i}><Link to={{pathname:"/"+value.toLowerCase()}} onClick={this.handleClick.bind(this,{value})} className="header-item clicked">{value}</Link></li>
            ) : (
                <li key={i}><Link to={{pathname:"/"+value.toLowerCase()}} onClick={this.handleClick.bind(this,{value})} className="header-item" >{value}</Link></li>
            )
        ));
        return (
            <header>
                <div className="headerLayer">
                    <div className="header-item-panel">
                        <ul className="header-content">
                            {item}
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