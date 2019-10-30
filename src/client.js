import reducers from './store/reducers';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';

import BookList from './components/pages/bookList';
import BookForm from './components/pages/bookForm';
import Cart from './components/pages/cart';

import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import NavigationBar from './components/pages/navBar';
import Aux from './hoc/auxillary';
import Footer from './components/pages/footer';

//reducer
const middleware =applyMiddleware(thunk, createLogger());
const store = createStore(reducers, middleware);

const routes=(
    <Provider store={store}>
        <BrowserRouter>
            <Aux>
                <NavigationBar/>    
                <Switch>
                    <Route path="/admin" component={BookForm}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/" exact component={BookList}/>
                </Switch>
                <Footer/>
            </Aux>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(routes,document.getElementById('app'));