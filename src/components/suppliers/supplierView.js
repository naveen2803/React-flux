/**
 * Created By: Naveen Malhotra
 * Created Date: (dd/mm/yyyy)
*/

import React from 'react';

import ActionTypes from '../../constants/actionTypes';
import EventTypes from '../../constants/eventTypes';
import SupplierStore from '../../stores/supplierStore';
import SupplierActions from '../../actions/supplierActions';
import IconLoading from '../../assets/iconLoading';
import IconCloudError from '../../assets/iconCloudError';
import IconEdit from '../../assets/iconEdit';
import IconDelete from '../../assets/iconDelete';
import ConfirmDialog from '../confirmDialog/confirmDialog';
import _ from 'lodash';

import toastr from 'toastr';
import 'toastr/build/toastr.css';

import { decodeToken } from '../../utils/secret';
import {    TabContent, TabPane,
            Nav, NavItem, NavLink,
            Card, CardTitle, CardText,
            Row, Col,
            Button, Input,
            FormGroup, Form } from 'reactstrap';
import classnames from 'classnames';
import { Redirect } from 'react-router-dom'
import HeaderComp from '../header/headerView';
import AddEditSupplierPopup from './add_editSupplierPopup';
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
            isEditMode: false,
            showpopup: false,
            filteredSuppliers: [],
            orignalSuppliers: [],
            loadingStatus:0,
            confirmDialogOptions: {
                showConfirmDialog: false,
                heading: "Delete Supplier",
                actionBtnLabel: "Delete",
                actionType: ActionTypes.DELETE_SUPPLIER,
                s_id: "",
                bodyMessage: "Are you sure you want to delete the supplier?"
            },
            supplier: {
                s_name: "",
                s_address: "",
                s_phone: "",
                description: "",
                s_gst: ""
            }
        };


        this.updateSearch = this.updateSearch.bind(this);
        this.cb_onGetSuppliersResult = this.cb_onGetSuppliersResult.bind(this);
        this.cb_onAddSupplierResult = this.cb_onAddSupplierResult.bind(this);
        this.togglePopupProp = this.togglePopupProp.bind(this);
        this.showAddUserpopup = this.showAddUserpopup.bind(this);
        this.editSupplier = this.editSupplier.bind(this);
        this.deleteSupplier = this.deleteSupplier.bind(this);
        this.toggleConfirmPopupProp = this.toggleConfirmPopupProp.bind(this);
        this.cb_onSupplierDeleteResult = this.cb_onSupplierDeleteResult.bind(this);

        // Action calls
        SupplierActions.getSuppliers(sessionStorage.getItem("token"));
    }

    /**
     * WHEN: Before initial render, both client and server
     * WHY: Good spot to set initial state
    */
    componentWillMount() {
        SupplierStore.addChangeListener(EventTypes.GET_SUPPLIERS_EVENT, this.cb_onGetSuppliersResult);
        SupplierStore.addChangeListener(EventTypes.ADD_SUPPLIER_EVENT, this.cb_onAddSupplierResult);
        SupplierStore.addChangeListener(EventTypes.DELETE_SUPPLIER_EVENT, this.cb_onSupplierDeleteResult);
    }

    componentWillUnmount() {
        SupplierStore.removeChangeListener(EventTypes.GET_SUPPLIERS_EVENT, this.cb_onGetSuppliersResult);
        SupplierStore.removeChangeListener(EventTypes.ADD_SUPPLIER_EVENT, this.cb_onAddSupplierResult);
        SupplierStore.removeChangeListener(EventTypes.DELETE_SUPPLIER_EVENT, this.cb_onSupplierDeleteResult);
    }
    
    cb_onAddSupplierResult(event) {
        if(event.status === "SUCCESS") {
            this.setState({
                orignalSuppliers: [...this.state.orignalSuppliers, event.supplier],
                filteredSuppliers: [...this.state.orignalSuppliers, event.supplier],
                showpopup: false
            });

            toastr.success("Supplier Added", "Success");
        }
        else {
            toastr.error("Adding the supplier", "Error");
        }
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
    
    cb_onSupplierDeleteResult(event) {
        if(event.status === "SUCCESS") {
            var arr = this.state.orignalSuppliers.filter(user => user.s_id != event.s_id);
            this.setState({
                filteredSuppliers : arr,
                orignalSuppliers : arr,
                confirmDialogOptions: Object.assign(this.state.confirmDialogOptions, {
                    showConfirmDialog: false
                })
            });

            toastr.success("Supplier deleted", "Success");
        }
        else {
            toastr.error("Deleting the Supplier", "Error");
        }
    }
    
    showAddUserpopup() {
        this.setState({
            showPopup: true,
            supplier: {
                s_name: "",
                s_address: "",
                s_phone: "",
                description: "",
                s_gst: ""
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
    
    editSupplier(event) {
        let supplierToEdit = _.filter(this.state.orignalSuppliers, function(supplier) { return (supplier.s_id == event.currentTarget.getAttribute("data-supplierid")) })[0];
        this.setState({
            supplier: supplierToEdit,
            isEditMode: true,
            showPopup: true
        });
    }
    
    deleteSupplier(event) {
        this.setState({
            confirmDialogOptions: Object.assign(this.state.confirmDialogOptions, {
                showConfirmDialog: true,
                s_id: event.currentTarget.getAttribute("data-supplierid")
            })
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
                <td><span className="padding10 handCursor" data-supplierid={item.s_id} onClick={this.editSupplier}><IconEdit width="18" height="18"/></span><span data-supplierid={item.s_id} className="padding10 handCursor" onClick={this.deleteSupplier}><IconDelete width="18" height="18"/></span></td>
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
                        <HeaderComp {...this.props} title="Suppliers"/>
                        <AddEditSupplierPopup showPopup={this.state.showPopup} togglePopup={this.togglePopupProp} supplier={this.state.supplier} isEditMode={this.state.isEditMode}/>
                        <ConfirmDialog options={this.state.confirmDialogOptions} togglePopup={this.toggleConfirmPopupProp}/>
                        <div className="supplierView_actionBarContainerStyle">
                            <div className="supplierView_actionBarItemStyle">
                                <Button onClick={this.showAddUserpopup} className="appButtonStyle">Add Supplier</Button>
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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.loadingStatus == 0?<tr><td colSpan="5" height="100px"><div className="supplierView_loadingContainerStyle"><IconLoading width="50" height="40"/><span className="supplierView_loadingTextStyle">Loading...</span></div></td></tr>:(this.state.loadingStatus == 1?<tr className="hideStyle"><td></td></tr>:<tr><td colSpan="5" height="150px"><div className="supplierView_loadingContainerStyle"><IconCloudError width="80" height="100"/><span className="supplierView_errorTextStyle">Error loading the data</span></div></td></tr>)}
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
