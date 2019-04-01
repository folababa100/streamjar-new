import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './main';
import { Provider } from "react-redux";
import  allReducer  from "./reducer/index"
import { createStore } from "redux";
import jwt from "jsonwebtoken";
import { setCurrentUser } from "./actions/index"
import setAuthorizationToken from "./component/auth"
import 'semantic-ui-css/semantic.min.css';
var store = createStore(allReducer);
if (window.localStorage.jartoken) {
    setAuthorizationToken(window.localStorage.jartoken);
    var decodedToken = jwt.decode(window.localStorage.jartoken);
    store.dispatch(setCurrentUser(decodedToken))
}
ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider >
</BrowserRouter>, document.getElementById('root'));