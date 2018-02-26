/**
 * Created By: Naveen Malhotra
 * Created Date: (dd/mm/yyyy)
*/

import React from 'react';
import {    Button,
            Modal,
            ModalHeader,
            ModalBody,
            ModalFooter,
            Input,
            FormGroup,
            Form } from 'reactstrap';

import EventTypes from '../../constants/eventTypes';
import ItemStore from '../../stores/itemStore';
import ItemActions from '../../actions/itemActions';
import _ from 'lodash';
import toastr from 'toastr';
import 'toastr/build/toastr.css'

class AddItemPopup extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            showpopup: false,
            item: {
                item_code: "",
                base: "",
                price: "",
                description: "",
                image_url: "",
                item_id: ""
            }
        };
        this.showPopup = this.showPopup.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.add_EditItem = this.add_EditItem.bind(this);
        
        this.cb_onAddItemResult = this.cb_onAddItemResult.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.clearItemState = this.clearItemState.bind(this);
        this.cb_onUpdateItemResult = this.cb_onUpdateItemResult.bind(this);
    }
    
    componentWillMount() {
        ItemStore.addChangeListener(EventTypes.ADD_ITEM_EVENT, this.cb_onAddItemResult);
        ItemStore.addChangeListener(EventTypes.UPDATE_ITEM_EVENT, this.cb_onUpdateItemResult);
    }

    componentWillUnmount() {
        ItemStore.removeChangeListener(EventTypes.ADD_ITEM_EVENT, this.cb_onAddItemResult);
        ItemStore.removeChangeListener(EventTypes.UPDATE_ITEM_EVENT, this.cb_onUpdateItemResult);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            item: nextProps.item
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

        this.clearItemState();
        this.props.togglePopup();
    }
    
    cb_onAddItemResult(event) {
        if(event.status === "SUCCESS") {
            this.hidePopup();
        }
        else {
            toastr.error("Adding the item", "Error");
        }
    }
    
    cb_onUpdateItemResult(event) {
        if(event.status === "SUCCESS") {
            this.hidePopup();
        }
        else {
            toastr.error("Updating the item", "Error");
        }
    }
    
    add_EditItem() {
        if(this.props.isEditMode) {
            ItemActions.updateItem(sessionStorage.getItem("token"), this.state.item);
        }
        else {
            if( this.validateItemData() ) {
                ItemActions.addItem(sessionStorage.getItem("token"), this.state.item);
                this.clearItemState();
            }
            else {
                
            }
        }
        
    }
    
    validateItemData() {
        let newItemCode = this.state.item.item_code;
        let price = this.state.item.price;
        let index = _.findIndex(this.props.items, function(item) { return item.item_code === newItemCode; });
        if(index == -1) {
            if(isNaN(parseFloat(price))) {
                toastr.warning("Please enter valid price", "Warning");
                return false;
            }
            else {
                return true;
            }
        }
        else {
            toastr.warning("Item code already exists.", "Warning");
            return false;
        }
    }

    onTextChange(event) {
        let field = event.target.name;
		let value = event.target.value;
        let updatedProperty = {};
        updatedProperty[field] = value;
        var updatedUser = Object.assign(this.state.item, updatedProperty);
        this.setState({
            user: updatedUser
        });
    }

    clearItemState() {
        this.setState({
            item: {
                item_code: "",
                base: "",
                price: "",
                description: "",
                image_url: "",
                item_id: ""
            }
        });
    }

    render (){
        return (
            <div>
                <Modal isOpen={this.state.showpopup} toggle={this.hidePopup}>
                    <ModalHeader toggle={this.hidePopup}>{this.props.isEditMode?'Edit Item':'Add Item'}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Input type="text" name="item_code" id="new_item_code" value={this.state.item.item_code} onChange={this.onTextChange} placeholder="Item Code" className="formItemVerticalStyle"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="base" id="itemBase" placeholder="Base" value={this.state.item.base} onChange={this.onTextChange} className="formItemVerticalStyle"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="price" id="itemPrice" placeholder="Price" value={this.state.item.price} onChange={this.onTextChange} className="formItemVerticalStyle"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="textarea" name="description" id="itemDescription" value={this.state.item.description} onChange={this.onTextChange} placeholder="Description" className="formItemVerticalStyle"/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="appButtonStyle" onClick={this.add_EditItem}>{this.props.isEditMode?'Update':'Add'}</Button>
                        <Button color="secondary" onClick={this.hidePopup}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddItemPopup;
