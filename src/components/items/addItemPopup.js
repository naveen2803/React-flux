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
            item: {
                item_code: "",
                base: "",
                price: "",
                description: ""
            }
        };

        this.addItem = this.addItem.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.clearUserState = this.clearUserState.bind(this);
    }

    addItem() {
        if( this.validateItemData() ) {
            ItemActions.addItem(sessionStorage.getItem("token"), this.state.item);
            this.clearUserState();
        }
        else {
            
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

    clearUserState() {
        this.setState({
            item: {
                item_code: "",
                base: "",
                price: "",
                description: ""
            }
        });
    }

    render (){
        return (
            <div>
                <Modal isOpen={this.props.showpopup} toggle={this.props.toggleModel}>
                    <ModalHeader toggle={this.props.toggleModel}>Add Item</ModalHeader>
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
                        <Button color="primary" onClick={this.addItem}>Add</Button>
                        <Button color="secondary" onClick={this.props.toggleModel}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddItemPopup;
