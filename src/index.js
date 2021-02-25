import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';

import {Router, Route, Switch, HashRouter, BrowserRouter} from "react-router-dom";
import HomePage from './HomePage'
import SignInPage from './SignInPage'
import SignUpPage from "./SignUpPage";
import BlogPage from "./BlogPage";
import NewBlogPage from "./NewBlogPage";
import axios from "axios";
import './axios'
import AxiosInterceptors from "./axios";
ReactDOM.render(
  // <ThemeProvider theme={theme}>
  //   {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
  //   <CssBaseline />
  //   <Pricing/>
  //   {/*<App />*/}
  // </ThemeProvider>,
    <div >
        <AxiosInterceptors ></AxiosInterceptors>
    <BrowserRouter >
        <Switch>
            <Route path='/Newblog' component={NewBlogPage} />
            <Route path="/SignUp" component={SignUpPage} />
            <Route path="/SignIn" component={SignInPage} />
            <Route path='/blog/:id' component={BlogPage} />

            <Route path="/" component={HomePage} />
        </Switch>
    </BrowserRouter>
    </div>,
  document.querySelector('#root'),
);
