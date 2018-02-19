import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import LoginView from './components/login/loginView';
import CustomerOrders from './components/orders/customerOrders';
import SupplierOrders from './components/orders/supplierOrders';
import Customers from './components/customers/customerView';
import Suppliers from './components/suppliers/supplierView';
import Users from './components/users/userView';
import Items from './components/items/itemView';
import UnAuthorised from './components/unAuthorised/unAuthorisedView';
import PageNotFound from './components/pageNotFound/pageNotFound';
import AddOrder from './components/orders/addOrder';
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
                <Switch>
                    <Route exact path="/" render={(props) => <LoginView
                        {...props}
                        username={this.state.username}
                        password={this.state.password}
                        resetValues={this.resetValues}
                        onChange={this.onChange}/>} />
                    <Route exact path="/items" component={Items}/>
                    <Route exact path="/supplierOrders" component={SupplierOrders}/>
                    <Route exact path="/customerOrders" component={CustomerOrders}/>
                    <Route exact path="/addOrder" component={AddOrder}/>
                    <Route exact path="/customers" component={Customers}/>
                    <Route exact path="/suppliers" component={Suppliers}/>
                    <Route exact path="/users" component={Users}/>
                    <Route path="/notAuthorised" component={UnAuthorised}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
          </Router>

        );
    }
}

export default App;
