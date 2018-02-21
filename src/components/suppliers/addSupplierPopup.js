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
import SupplierStore from '../../stores/supplierStore';
import SupplierActions from '../../actions/supplierActions';

import toastr from 'toastr';
import 'toastr/build/toastr.css';

class AddSupplierpopup extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            showpopup: false,
            supplier: {
                s_name: "",
                s_address: "",
                s_phone: "",
                description: "",
                s_gst: ""
            }
        };

        this.showPopup = this.showPopup.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.addSupplier = this.addSupplier.bind(this);
        this.cb_onAddSupplierResult = this.cb_onAddSupplierResult.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.clearSupplierState = this.clearSupplierState.bind(this);
    }

    /**
     * WHEN: Before initial render, both client and server
     * WHY: Good spot to set initial state
    */
    componentWillMount() {
        SupplierStore.addChangeListener(EventTypes.ADD_SUPPLIER_EVENT, this.cb_onAddSupplierResult);
    }

    componentWillUnmount() {
        SupplierStore.removeChangeListener(EventTypes.ADD_SUPPLIER_EVENT, this.cb_onAddSupplierResult);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.showPopup)
            this.showPopup();
    }

    showPopup() {
        this.setState({
            showpopup: true
        });
    }

    hidePopup() {
        this.setState({
            showpopup: false
        });

        this.clearSupplierState();
        this.props.togglePopup();
    }

    clearSupplierState() {
        this.setState({
            supplier: {
                s_name: "",
                s_address: "",
                s_phone: "",
                description: "",
                s_gst: ""
            }
        });
    }

    addSupplier() {
        SupplierActions.addSupplier(sessionStorage.getItem("token"), this.state.supplier);
    }

    cb_onAddSupplierResult(event) {
        if(event.status === "SUCCESS") {
            this.hidePopup();
        }
        else {
            toastr.error("Adding the supplier", "Error");
        }
    }

    onTextChange(event) {
        var field = event.target.name;
		var value = event.target.value;
        var updatedProperty = {};
        updatedProperty[field] = value;
        var updatedSupplier = Object.assign(this.state.supplier, updatedProperty);
        this.setState({
            supplier: updatedSupplier
        });
    }

    render (){
        return (
            <div>
                <Modal isOpen={this.state.showpopup} toggle={this.hidePopup}>
                    <ModalHeader toggle={this.hidePopup}>Add Supplier</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Input type="text" name="s_name" id="s_name" value={this.state.supplier.s_name} onChange={this.onTextChange} placeholder="Name" className="formItemVerticalStyle"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="s_phone" id="s_phone" value={this.state.supplier.s_phone} onChange={this.onTextChange} placeholder="Phone" className="formItemVerticalStyle"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="s_address" id="s_address" value={this.state.supplier.s_address} onChange={this.onTextChange} placeholder="Address" className="formItemVerticalStyle"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="s_gst" id="s_gst" value={this.state.supplier.s_gst} onChange={this.onTextChange} placeholder="GST" className="formItemVerticalStyle"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="textarea" name="description" id="description" value={this.state.supplier.description} onChange={this.onTextChange} placeholder="Description" className="formItemVerticalStyle"/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="appButtonStyle" onClick={this.addSupplier}>Add</Button>
                        <Button color="secondary" onClick={this.hidePopup}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddSupplierpopup;
