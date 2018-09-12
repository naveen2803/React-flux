/**
 * Created By: Naveen Malhotra
 * Created Date: (dd/mm/yyyy)
*/

import React from 'react';

import ActionTypes from '../../constants/actionTypes';
import EventTypes from '../../constants/eventTypes';
import CustomerStore from '../../stores/customerStore';
import CustomerActions from '../../actions/customerActions';
import IconLoading from '../../assets/iconLoading';
import IconCloudError from '../../assets/iconCloudError';
import IconEdit from '../../assets/iconEdit';
import IconDelete from '../../assets/iconDelete';
import { decodeToken } from '../../utils/secret';
import ConfirmDialog from '../confirmDialog/confirmDialog';
import _ from 'lodash';

import toastr from 'toastr';
import 'toastr/build/toastr.css';

import {    TabContent, TabPane,
            Nav, NavItem, NavLink,
            Card, CardTitle, CardText,
            Row, Col,
            Button, Input,
            FormGroup, Form } from 'reactstrap';
import classnames from 'classnames';
import { Redirect } from 'react-router-dom'
import HeaderComp from '../header/headerView';
import AddEditCustomerPopup from './add_editCustomerPopup';
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
            isEditMode: false,
            showpopup: false,
            filteredCustomers: [],
            orignalCustomers: [],
            loadingStatus:0,
            confirmDialogOptions: {
                showConfirmDialog: false,
                heading: "Delete Customer",
                actionBtnLabel: "Delete",
                actionType: ActionTypes.DELETE_CUSTOMER,
                c_id: "",
                bodyMessage: "Are you sure you want to delete the customer?"
            },
            customer: {
                c_name: "",
                c_address: "",
                c_phone: "",
                description: "",
                c_gst: "",
                c_id: ""
            }
        };

        this.updateSearch = this.updateSearch.bind(this);
        this.cb_onGetCustomersResult = this.cb_onGetCustomersResult.bind(this);
        this.cb_onAddCustomerResult = this.cb_onAddCustomerResult.bind(this);
        this.togglePopupProp = this.togglePopupProp.bind(this);
        this.showAddCustomerPopup = this.showAddCustomerPopup.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.toggleConfirmPopupProp = this.toggleConfirmPopupProp.bind(this);
        this.cb_onCustomerDeleteResult = this.cb_onCustomerDeleteResult.bind(this);
        this.cb_onCustomerUpdateResult = this.cb_onCustomerUpdateResult.bind(this);

        // Action calls
        CustomerActions.getCustomers(sessionStorage.getItem("token"));
    }

    /**
     * WHEN: Before initial render, both client and server
     * WHY: Good spot to set initial state
    */
    componentWillMount() {
        CustomerStore.addChangeListener(EventTypes.GET_CUSTOMERS_EVENT, this.cb_onGetCustomersResult);
        CustomerStore.addChangeListener(EventTypes.ADD_CUSTOMER_EVENT, this.cb_onAddCustomerResult);
        CustomerStore.addChangeListener(EventTypes.DELETE_CUSTOMER_EVENT, this.cb_onCustomerDeleteResult);
        CustomerStore.addChangeListener(EventTypes.UPDATE_CUSTOMER_EVENT, this.cb_onCustomerUpdateResult);
    }

    componentWillUnmount() {
        CustomerStore.removeChangeListener(EventTypes.GET_CUSTOMERS_EVENT, this.cb_onGetCustomersResult);
        CustomerStore.removeChangeListener(EventTypes.ADD_CUSTOMER_EVENT, this.cb_onAddCustomerResult);
        CustomerStore.removeChangeListener(EventTypes.DELETE_CUSTOMER_EVENT, this.cb_onCustomerDeleteResult);
        CustomerStore.removeChangeListener(EventTypes.UPDATE_CUSTOMER_EVENT, this.cb_onCustomerUpdateResult);
    }

    cb_onCustomerUpdateResult(event) {
        console.log(event);
    }

    cb_onAddCustomerResult(event) {
        if(event.status === "SUCCESS") {
            this.setState({
                orignalCustomers: [...this.state.orignalCustomers, event.customer],
                filteredCustomers: [...this.state.filteredCustomers, event.customer],
                showpopup: false
            });

            toastr.success("Customer Added", "Success");
        }
        else {
            toastr.error("Adding the customer", "Error");
        }
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

    cb_onCustomerDeleteResult(event) {
        if(event.status === "SUCCESS") {
            var arr = this.state.orignalCustomers.filter(customer => customer.c_id != event.c_id);
            this.setState({
                filteredCustomers : arr,
                orignalCustomers : arr,
                confirmDialogOptions: Object.assign(this.state.confirmDialogOptions, {
                    showConfirmDialog: false
                })
            });

            toastr.success("Customer deleted", "Success");
        }
        else {
            toastr.error("Deleting the customer", "Error");
        }
    }

    showAddCustomerPopup() {
        this.setState({
            showPopup: true,
            customer: {
                c_name: "",
                c_address: "",
                c_phone: "",
                description: "",
                c_gst: "",
                c_id: ""
            },
            isEditMode: false
        });
    }

    togglePopupProp() {
        this.setState({
            showPopup: false
        });
    }

    toggleConfirmPopupProp() {
        this.setState({
            confirmDialogOptions: Object.assign(this.state.confirmDialogOptions, {
                showConfirmDialog: false
            })
        });
    }

    editCustomer(event) {
        let customerToEdit = _.filter(this.state.orignalCustomers, function(customer) { return (customer.c_id == event.currentTarget.getAttribute("data-customerid")) })[0];
        this.setState({
            customer: customerToEdit,
            isEditMode: true,
            showPopup: true
        });
    }

    deleteCustomer(event) {
        this.setState({
            confirmDialogOptions: Object.assign(this.state.confirmDialogOptions, {
                showConfirmDialog: true,
                c_id: event.currentTarget.getAttribute("data-customerid")
            })
        });
    }

    updateSearch(event) {
        let value = event.target.value;
        this.setState({
            filteredCustomers: this.state.orignalCustomers.filter(customer => {
                if( customer.c_name.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  customer.c_address.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  customer.c_phone.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  customer.description.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  customer.c_gst.toUpperCase().indexOf(value.toUpperCase()) >= 0)
                    return true;
                else return false;
            })
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
                <td><span className="padding10 handCursor" data-customerid={item.c_id} onClick={this.editCustomer}><IconEdit width="18" height="18"/></span><span data-customerid={item.c_id} className="padding10 handCursor" onClick={this.deleteCustomer}><IconDelete width="18" height="18"/></span></td>
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
                        <AddEditCustomerPopup showPopup={this.state.showPopup} togglePopup={this.togglePopupProp} customer={this.state.customer} isEditMode={this.state.isEditMode}/>
                        <ConfirmDialog options={this.state.confirmDialogOptions} togglePopup={this.toggleConfirmPopupProp}/>
                        <div className="customersView_actionBarContainerStyle">
                            <div className="customersView_actionBarItemStyle">
                                <Button onClick={this.showAddCustomerPopup} className="appButtonStyle">Add Customer</Button>
                            </div>
                            <div className="customersView_actionBarItemStyle">
                                <Input type="text" name="searchBar" id="searchBar" onChange={this.updateSearch} placeholder="Search"/>
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
                                    <th></th>
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
