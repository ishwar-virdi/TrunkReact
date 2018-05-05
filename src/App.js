import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch,Route } from 'react-router-dom'
import login from './view/login';
import rangeDatePicker from "./view/components/datePicker/rangeDatePicker";
import singleDatePicker from "./view/components/datePicker/singleDatePicker";
import home from './view/mainPage/home/home';
import history from './view/mainPage/result/result';
import upload from './view/mainPage/upload/upload';
import receipt from './view/mainPage/result/receipt/receipt';
import detail from './view/mainPage/detail/detail';
import chart from './view/components/content/chart';
import notFoundPage from './view/notFoundPage';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={login} />
                        <Route exact path="/login" component={login} />
                        <Route path="/home" component={home} />
                        <Route path="/chart" component={chart} />
                        <Route path="/result" component={history} />
                        <Route path="/upload" component={upload} />
                        <Route path="/detail/:id" component={detail} />
                        <Route path="/receipt/:id" component={receipt} />
                        <Route path="/rangeDatePicker" component={rangeDatePicker} />
                        <Route path="/singleDatePicker" component={singleDatePicker} />
                        <Route path="*" component={notFoundPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
