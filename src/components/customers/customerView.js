/**
 * Created By: Naveen Malhotra
 * Created Date: (dd/mm/yyyy)
*/

import React from 'react';

import EventTypes from '../../constants/eventTypes';
import CustomerStore from '../../stores/customerStore';
import CustomerActions from '../../actions/customerActions';
import IconLoading from '../../assets/iconLoading';
import IconCloudError from '../../assets/iconCloudError';
import { decodeToken } from '../../utils/secret';
import toastr from 'toastr';
import 'toastr/build/toastr.css'
import {    TabContent, TabPane,
            Nav, NavItem, NavLink,
            Card, CardTitle, CardText,
            Row, Col,
            Button, Input,
            FormGroup, Form } from 'reactstrap';
import classnames from 'classnames';
import { Redirect } from 'react-router-dom'
import HeaderComp from '../header/headerView';
import AddCustomerPopup from './addCustomerPopup';
import { Table } from 'reactstrap';
import './customerViewCSS.css';

class CustomerView extends React.Component{
    constructor(props) {
        super(props);
        /**
        *   loadingStatus:0 (loading)
        *   loadingStatus:1 (got result)
        *   loadingStatus:2 (error)
        **/
        this.state = {
            showpopup: false,
            filteredCustomers: [],
            orignalCustomers: [],
            loadingStatus:0
        };


        //this.updateSearch = this.updateSearch.bind(this);
        //this.showCustomerForm = this.showCustomerForm.bind(this);
        this.toggleModel = this.toggleModel.bind(this);
        this.cb_onGetCustomersResult = this.cb_onGetCustomersResult.bind(this);

        // Action calls
        CustomerActions.getCustomers(sessionStorage.getItem("token"));
    }

    /**
     * WHEN: Before initial render, both client and server
     * WHY: Good spot to set initial state
    */
    componentWillMount() {
        CustomerStore.addChangeListener(EventTypes.GET_CUSTOMERS_EVENT, this.cb_onGetCustomersResult);
    }

    componentWillUnmount() {
        CustomerStore.removeChangeListener(EventTypes.GET_CUSTOMERS_EVENT, this.cb_onGetCustomersResult);
    }

    cb_onGetCustomersResult(event) {
        if(event.status === "SUCCESS") {
            this.setState({
                filteredCustomers: event.customers,
                orignalCustomers: event.customers,
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

    toggleModel() {
        this.setState({
            showpopup: !this.state.showpopup
        });
    }

    rowElement(item, index) {
        return(
            <tr key={index}>
                <td>{item.c_name}</td>
                <td>{item.c_address}</td>
                <td>{item.c_phone}</td>
                <td>{item.description}</td>
                <td>{item.c_gst}</td>
            </tr>
        );
    }

    checkAuthorization() {
        let token = sessionStorage.getItem("token");
        try {
            var decoded = decodeToken(token);
            if(decoded.role === "ADMIN") {
                return(
                    <div>
                        <HeaderComp {...this.props} title="Customers"/>
                        <div className="customersView_actionBarContainerStyle">
                            <div className="customersView_actionBarItemStyle">
                                <Button className="appButtonStyle">Add Customer</Button>
                            </div>
                            <div className="customersView_actionBarItemStyle">
                                <Input type="text" name="searchBar" id="searchBar" placeholder="Search"/>
                            </div>
                        </div>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Description</th>
                                    <th>GST</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.loadingStatus == 0?<tr><td colSpan="5" height="100px"><div className="customersView_loadingContainerStyle"><IconLoading width="50" height="40"/><span className="customersView_loadingTextStyle">Loading...</span></div></td></tr>:(this.state.loadingStatus == 1?<tr className="hideStyle"><td></td></tr>:<tr><td colSpan="5" height="150px"><div className="customersView_loadingContainerStyle"><IconCloudError width="80" height="100"/><span className="customersView_errorTextStyle">Error loading the data</span></div></td></tr>)}
                            {this.state.filteredCustomers.map(this.rowElement.bind(this))}
                            </tbody>
                      </Table>
                    </div>
                );
            }
            else {
                return(<Redirect to="/notAuthorised"/>);
            }
        }
        catch(error) {
            console.log(error);
            return(<Redirect to="/notAuthorised"/>);
        }
    }

    render (){
        return (
            this.checkAuthorization()
        );
    }
}

CustomerView.defaultProps = {

}

export default CustomerView;
