import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {ToastContainer, ToastStore} from 'react-toasts';
import rootReducer from './reducers/index';
import './index.css';
import Login from './containers/auth/Login';
import Registration from './containers/auth/Registration';
import Dashboard from './containers/Dashboard';
import { PrivateRoute } from './components/PrivateRoute';

const store = createStore(
    rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk),
  );

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
             <Switch>
              <Route path="/login" component={Login} />
              <Route path="/registration" component={Registration} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route exact path="/" component={Login} />
              <PrivateRoute path="/posts/new" component={Dashboard} />
              <PrivateRoute path="/posts/edit" component={Dashboard} />
              <PrivateRoute path="/posts/view" component={Dashboard} />
              <PrivateRoute path="/profile" component={Dashboard} />
              <PrivateRoute path="/change-password" component={Dashboard} />
             
              <Route path="/:test/edit" component={Dashboard} />
              </Switch>
             <ToastContainer store={ToastStore}/>
            </div>
        </BrowserRouter>
    </Provider>
     , document.getElementById('root')
    );
