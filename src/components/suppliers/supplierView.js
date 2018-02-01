/**
 * Created By: Naveen Malhotra
 * Created Date: (dd/mm/yyyy)
*/

import React from 'react';

import EventTypes from '../../constants/eventTypes';
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
import AddSupplierPopup from './addSupplierPopup';
import { Table } from 'reactstrap';
import './supplierViewCSS.css';

class SupplierView extends React.Component{
    constructor(props) {
        super(props);
        /**
        *   loadingStatus:0 (loading)
        *   loadingStatus:1 (got result)
        *   loadingStatus:2 (error)
        **/
        this.state = {
            showpopup: false,
            filteredSuppliers: [],
            orignalSuppliers: [],
            loadingStatus:0
        };


        this.updateSearch = this.updateSearch.bind(this);
        //this.showCustomerForm = this.showCustomerForm.bind(this);
        this.toggleModel = this.toggleModel.bind(this);
        this.cb_onGetSuppliersResult = this.cb_onGetSuppliersResult.bind(this);

        // Action calls
        SupplierActions.getSuppliers();
    }

    /**
     * WHEN: Before initial render, both client and server
     * WHY: Good spot to set initial state
    */
    componentWillMount() {
        SupplierStore.addChangeListener(EventTypes.GET_SUPPLIERS_EVENT, this.cb_onGetSuppliersResult);
    }

    componentWillUnmount() {
        SupplierStore.removeChangeListener(EventTypes.GET_SUPPLIERS_EVENT, this.cb_onGetSuppliersResult);
    }

    cb_onGetSuppliersResult(event) {
        if(event.status === "SUCCESS") {
            this.setState({
                filteredSuppliers: event.suppliers,
                orignalSuppliers: event.suppliers,
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

    updateSearch(event) {
        let value = event.target.value;
        this.setState({
            filteredSuppliers: this.state.orignalSuppliers.filter(supplier => {
                if( supplier.s_name.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  supplier.s_address.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  supplier.s_phone.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  supplier.description.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  supplier.s_gst.toUpperCase().indexOf(value.toUpperCase()) >= 0)
                    return true;
                else return false;
            })
        });
    }

    rowElement(item, index) {
        return(
            <tr key={index}>
                <td>{item.s_name}</td>
                <td>{item.s_address}</td>
                <td>{item.s_phone}</td>
                <td>{item.description}</td>
                <td>{item.s_gst}</td>
            </tr>
        );
    }

    checkAuthorization() {
        let token = sessionStorage.getItem("token");
        try {
            var decoded = jwt.verify(token, 'secret key');
            if(decoded.role === "ADMIN") {
                return(
                    <div>
                        <HeaderComp {...this.props} title="Suppliers"/>
                        <div className="supplierView_actionBarContainerStyle">
                            <div className="supplierView_actionBarItemStyle">
                                <Button className="appButtonStyle">Add Supplier</Button>
                            </div>
                            <div className="supplierView_actionBarItemStyle">
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
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.loadingStatus == 0?<tr><td colSpan="5" height="100px"><div className="supplierView_loadingContainerStyle"><IconLoading width="50" height="40"/><span className="supplierView_loadingTextStyle">Loading...</span></div></td></tr>:(this.state.loadingStatus == 1?"":<tr><td colSpan="5" height="150px"><div className="supplierView_loadingContainerStyle"><IconCloudError width="80" height="100"/><span className="supplierView_errorTextStyle">Error loading the data</span></div></td></tr>)}
                            {this.state.filteredSuppliers.map(this.rowElement.bind(this))}
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

SupplierView.defaultProps = {

}

export default SupplierView;
