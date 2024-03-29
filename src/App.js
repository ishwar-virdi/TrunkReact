import React, { Component } from 'react';
import { BrowserRouter, Switch,Route } from 'react-router-dom'
import login from './view/login';
import home from './view/mainPage/home/home';
import history from './view/mainPage/result/result';
import upload from './view/mainPage/upload/upload';
import uploadSuccess from './view/mainPage/upload/success/uploadSuccess';
import receipt from './view/mainPage/result/receipt/receipt';
import detail from './view/mainPage/detail/detail';
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
                        <Route path="/reconciledresults" component={history} />
                        <Route path="/upload" component={upload} />
                        <Route path="/uploadSuccess" component={uploadSuccess} />
                        <Route path="/reconciledresult/details/:id" component={detail} />
                        <Route path="/transactiondetails/:backTo/:id" component={receipt} />
                        <Route path="*" component={notFoundPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;