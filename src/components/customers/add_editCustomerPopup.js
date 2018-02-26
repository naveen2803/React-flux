/**
 * Created By: Naveen Malhotra
 * Created Date: (dd/mm/yyyy)
*/

import React from 'react';
import {    Button,
            Popover,
            PopoverBody,
            Modal,
            ModalHeader,
            ModalBody,
            ModalFooter,
            Label,
            Input,
            FormGroup,
            Form } from 'reactstrap';

import EventTypes from '../../constants/eventTypes';
import CustomerStore from '../../stores/customerStore';
import CustomerActions from '../../actions/customerActions';

import toastr from 'toastr';
import 'toastr/build/toastr.css';

class AddEditCustomerPopup extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            showpopup: false,
            customer: {
                c_name: "",
                c_address: "",
                c_phone: "",
                description: "",
                c_gst: "",
                c_id: ""
            }
        };

        this.showPopup = this.showPopup.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.add_EditCustomer = this.add_EditCustomer.bind(this);
        this.cb_onAddCustomerResult = this.cb_onAddCustomerResult.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.clearCustomerState = this.clearCustomerState.bind(this);
        this.cb_onUpdateCustomerResult = this.cb_onUpdateCustomerResult.bind(this);
    }

    /**
     * WHEN: Before initial render, both client and server
     * WHY: Good spot to set initial state
    */
    componentWillMount() {
        CustomerStore.addChangeListener(EventTypes.ADD_CUSTOMER_EVENT, this.cb_onAddCustomerResult);
        CustomerStore.addChangeListener(EventTypes.UPDATE_CUSTOMER_EVENT, this.cb_onUpdateCustomerResult);
    }

    componentWillUnmount() {
        CustomerStore.removeChangeListener(EventTypes.ADD_CUSTOMER_EVENT, this.cb_onAddCustomerResult);
        CustomerStore.removeChangeListener(EventTypes.UPDATE_CUSTOMER_EVENT, this.cb_onUpdateCustomerResult);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            customer: nextProps.customer
        });

        if(nextProps.showPopup)
            this.showPopup();
    }

    showPopup() {
        this.setState({
            showpopup: true,
        });
    }

    hidePopup() {
        this.setState({
            showpopup: false
        });

        this.clearCustomerState();
        this.props.togglePopup();
    }

    clearCustomerState() {
        this.setState({
            customer: {
                c_name: "",
                c_address: "",
                c_phone: "",
                description: "",
                c_gst: "",
                c_id: ""
            }
        });
    }

    add_EditCustomer() {
        if(this.props.isEditMode) {
            CustomerActions.updateCustomer(sessionStorage.getItem("token"), this.state.customer);
        }
        else {
            CustomerActions.addCustomer(sessionStorage.getItem("token"), this.state.customer);
        }

    }

    cb_onAddCustomerResult(event) {
        if(event.status === "SUCCESS") {
            this.hidePopup();
        }
        else {
            toastr.error("Adding the customer", "Error");
        }
    }

    cb_onUpdateCustomerResult(event) {
        if(event.status === "SUCCESS") {
            this.hidePopup();
        }
        else {
            toastr.error("Updating the customer", "Error");
        }
    }

    onTextChange(event) {
        var field = event.target.name;
		var value = event.target.value;
        var updatedProperty = {};
        updatedProperty[field] = value;
        var updatedCustomer = Object.assign(this.state.customer, updatedProperty);
        this.setState({
            customer: updatedCustomer
        });
    }

    render (){
        return (
            <div>
                <Modal isOpen={this.state.showpopup} toggle={this.hidePopup}>
                    <ModalHeader toggle={this.hidePopup}>{this.props.isEditMode?'Edit Customer':'Add Customer'}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Input type="text" name="c_name" id="c_name" value={this.state.customer.c_name} onChange={this.onTextChange} placeholder="Name" className="formItemVerticalStyle"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="c_phone" id="c_phone" value={this.state.customer.c_phone} onChange={this.onTextChange} placeholder="Phone" className="formItemVerticalStyle"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="c_address" id="c_address" value={this.state.customer.c_address} onChange={this.onTextChange} placeholder="Address" className="formItemVerticalStyle"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="c_gst" id="c_gst" value={this.state.customer.c_gst} onChange={this.onTextChange} placeholder="GST" className="formItemVerticalStyle"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="textarea" name="description" id="description" value={this.state.customer.description} onChange={this.onTextChange} placeholder="Description" className="formItemVerticalStyle"/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="appButtonStyle" onClick={this.add_EditCustomer}>{this.props.isEditMode?'Update':'Add'}</Button>
                        <Button color="secondary" onClick={this.hidePopup}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddEditCustomerPopup;
