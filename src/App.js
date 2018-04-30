import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch,Route } from 'react-router-dom'
import login from './view/login';
import form from './view/form';
import chart from './view/components/chart';
import Test from "./view/components/test";
import dashboard from './view/mainPage/home/dashboard';
import fileUpload from './view/mainPage/upload/upload';


class App extends Component {
  render() {
    return (
      <div className="App">
          <Switch>
              <Route exact path="/" component={login} />
              <Route exact path="/login" component={login} />
              <Route path="/home" component={dashboard} />
              <Route path="/form" component={form} />
              <Route path="/test" component={Test} />
              <Route path="/fileUpload" component={fileUpload} />
          </Switch>
      </div>
    );
  }
}

export default App;
