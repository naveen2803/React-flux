/**
 * Created By: Naveen Malhotra
 * Created Date: 18/01/2018(dd/mm/yyyy)
*/

import React from 'react';

import EventTypes from '../../constants/eventTypes';
import OrderStore from '../../stores/orderStore';
import OrderActions from '../../actions/orderActions';
import SupplierStore from '../../stores/supplierStore';
import SupplierActions from '../../actions/supplierActions';
import IconLoading from '../../assets/iconLoading';
import IconCloudError from '../../assets/iconCloudError';

import toastr from 'toastr';
import 'toastr/build/toastr.css'

import jwt from 'jsonwebtoken';
import {    TabContent, TabPane,
            Nav, NavItem, NavLink,
            Card, CardTitle, CardText,
            Row, Col,
            Button, Input,
            FormGroup, Form } from 'reactstrap';
import classnames from 'classnames';
import { Redirect } from 'react-router-dom'
import HeaderComp from '../header/headerView';
import AddOrderPopup from './addOrderPopup';
import { Table } from 'reactstrap';
import './ordersCSS.css';
let adminTabs = ['Orders', 'Customers', 'Suppliers', 'Items', 'Users'];
let employeeTabs = ['Items'];

class Orders extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showpopup: false,
            filteredOrders: [],
            orignalOrders: [],
            suppliers:[],
            loadingStatus:0
        };

        this.updateSearch = this.updateSearch.bind(this);
        this.showOrderForm = this.showOrderForm.bind(this);
        this.toggleModel = this.toggleModel.bind(this);
        this.cb_onGetOrdersResult = this.cb_onGetOrdersResult.bind(this);
        this.cb_onGetSuppliersResult = this.cb_onGetSuppliersResult.bind(this);

        // Action calls
        OrderActions.getOrders();
        SupplierActions.getSuppliers();
    }

    rowElement(item, index) {
        return(
            <tr key={index}>
                <td>{item.order_id}</td>
                <td>{item.order_date}</td>
                <td>{item.item_id}</td>
                <td>{item.cost}</td>
                <td>{item.qty}</td>
                <td>{item.s_id}</td>
                <td>{item.s_order_number}</td>
            </tr>
        );
    }

    updateSearch(event) {
        let value = event.target.value;
        this.setState({
            filteredOrders: this.state.orignalOrders.filter(order => {
                if( order.order_id.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  order.order_date.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  order.item_id.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  order.cost.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  order.qty.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  order.s_id.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  order.s_order_number.toUpperCase().indexOf(value.toUpperCase()) >= 0)
                    return true;
                else return false;
            })
        });
    }

    toggleModel() {
        this.setState({
            showpopup: !this.state.showpopup
        });
    }

    checkAuthorization() {
        let token = sessionStorage.getItem("token");
        try {
            var decoded = jwt.verify(token, 'secret key');
            return(
                <div>
                    <HeaderComp {...this.props} title="Orders"/>
                    <AddOrderPopup {...this.props} showpopup={this.state.showpopup} toggleModel={this.toggleModel} suppliers={this.state.suppliers}/>
                    <div className="orders_actionBarContainerStyle">
                        <div className="orders_actionBarItemStyle">
                            <Button className="appButtonStyle" onClick={this.toggleModel}>Add Order</Button>
                        </div>
                        <div className="orders_actionBarItemStyle">
                            <Input type="text" name="searchBar" id="searchBar" onChange={this.updateSearch} placeholder="Search"/>
                        </div>
                    </div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Buyer Order Number</th>
                                <th>Order Date</th>
                                <th>Item ID</th>
                                <th>Cost</th>
                                <th>Qty</th>
                                <th>Supplier ID</th>
                                <th>Supplier Order Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.loadingStatus == 0?<tr><td colSpan="6" height="100px"><div className="customersView_loadingContainerStyle"><IconLoading width="50" height="40"/><span className="customersView_loadingTextStyle">Loading...</span></div></td></tr>:(this.state.loadingStatus == 1?"":<tr><td colSpan="6" height="150px"><div className="customersView_loadingContainerStyle"><IconCloudError width="80" height="100"/><span className="customersView_errorTextStyle">Error loading the data</span></div></td></tr>)}
                            {this.state.filteredOrders.map(this.rowElement.bind(this))}
                        </tbody>
                  </Table>
              </div>
            );

        }
        catch(error) {
            console.log(error);
            return(<Redirect to="/notAuthorised"/>);
        }
    }

    showOrderForm() {

    }

    /**
     * WHEN: Before initial render, both client and server
     * WHY: Good spot to set initial state
    */
    componentWillMount() {
        //For flux
        OrderStore.addChangeListener(EventTypes.GET_ORDERS_EVENT, this.cb_onGetOrdersResult);
        SupplierStore.addChangeListener(EventTypes.GET_SUPPLIERS_EVENT, this.cb_onGetSuppliersResult);
    }

    componentWillUnmount() {
        //For flux
        OrderStore.removeChangeListener(EventTypes.GET_ORDERS_EVENT, this.cb_onGetOrdersResult);
        SupplierStore.removeChangeListener(EventTypes.GET_SUPPLIERS_EVENT, this.cb_onGetSuppliersResult);

    }

    render (){
        return (
            this.checkAuthorization()
        );
    }

    // Callbacks
    cb_onGetOrdersResult(event) {
        if(event.status === "SUCCESS") {
            this.setState({
                filteredOrders: event.orders,
                orignalOrders: event.orders,
                loadingStatus: 1
            });
        }
        else {
            toastr.error("Loading the data", "Error");
            this.setState({
                loadingStatus: 2
            });
        }
    }

    cb_onGetSuppliersResult(event) {
        console.log("Suppliers", event.suppliers);
        if(event.status === "SUCCESS") {
            this.setState({
                suppliers: event.suppliers
            });
        }
        else {
            toastr.error("Loading the data", "Error");
        }
    }
}

export default Orders;
