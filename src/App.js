import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch,Route } from 'react-router-dom'
import login from './view/login';
import form from './view/components/test/form';
import rangeDatePicker from "./view/components/datePicker/rangeDatePicker";
import singleDatePicker from "./view/components/datePicker/singleDatePicker";
import reconcile from "./view/mainPage/result/reconcile";
import dashboard from './view/mainPage/home/dashboard';
import history from './view/mainPage/result/result';
import upload from './view/mainPage/upload/upload';
import transactionReceipt from './view/mainPage/transactionReceipt/transactionReceipt';
import admin from './view/mainPage/admin/admin';
import detail from './view/mainPage/detail/detail';
import chart from './view/components/content/chart';
class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={login} />
                    <Route exact path="/login" component={login} />
                    <Route path="/home" component={dashboard} />
                    <Route path="/form" component={form} />
                    <Route path="/chart" component={chart} />
                    <Route path="/result" component={history} />
                    <Route path="/upload" component={upload} />
                    <Route path="/detail" component={detail} />
                    <Route path="/receipt" component={transactionReceipt} />
                    <Route path="/admin" component={admin} />
                    <Route path="/rangeDatePicker" component={rangeDatePicker} />
                    <Route path="/singleDatePicker" component={singleDatePicker} />
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
