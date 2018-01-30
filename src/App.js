import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import LoginView from './components/login/loginView';
import Orders from './components/orders/orders';
import Customers from './components/customers/customerView';
import Suppliers from './components/suppliers/supplierView';
import Users from './components/users/userView';
import Items from './components/items/itemView';
import UnAuthorised from './components/unAuthorised/unAuthorisedView';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.onChange = this.onChange.bind(this);
        this.resetValues = this.resetValues.bind(this);
    }

    onChange(event) {
        var field = event.target.name;
		var value = event.target.value;
        switch(field) {
            case "username": {
                this.state.username = value;
                this.setState({username: this.state.username});
                break;
            }
            case "password": {
                this.state.password = value;
                this.setState({password: this.state.password});
                break;
            }
        }
    }

    resetValues() {
        this.state.username = "";
        this.state.password = "";
        this.setState({
            username: this.state.username,
            password: this.state.password
        });
    }

    render() {
        return (
          <Router>
            <div>
                <Route exact path="/" render={(props) => <LoginView
                    {...props}
                    username={this.state.username}
                    password={this.state.password}
                    onChange={this.onChange}/>} />
                <Route exact path="/items" component={Items}/>
                <Route exact path="/orders" component={Orders}/>
                <Route exact path="/customers" component={Customers}/>
                <Route exact path="/suppliers" component={Suppliers}/>
                <Route exact path="/users" component={Users}/>
                <Route exact path="/notAuthorised" component={UnAuthorised}/>
            </div>
          </Router>

        );
    }
}

export default App;
