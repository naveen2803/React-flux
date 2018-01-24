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

import moment from 'moment';
class AddOrderPopup extends React.Component{
    constructor(props) {
        super(props);

        this.state = {};

        this.addOrder = this.addOrder.bind(this);
    }

    addOrder() {

    }

    optionElement(item, index) {
        return(<option key={index}>{item.s_name}</option>);
    }

    onDateChange() {

    }

    render (){
        return (
            <div>
                <Modal isOpen={this.props.showpopup} toggle={this.props.toggleModel}>
                    <ModalHeader toggle={this.props.toggleModel}>Add Order</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Input type="text" name="new_order_number" id="new_order_number"  placeholder="Order number" className="formItemVerticalStyle"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="select" name="supplier" id="supplier" className="formItemVerticalStyle">
                                    {this.props.suppliers.map(this.optionElement.bind(this))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Input type="date" name="orderDate" id="orderDate" placeholder="OrderDate" className="formItemVerticalStyle"/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addOrder}>Add</Button>
                        <Button color="secondary" onClick={this.props.toggleModel}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

AddOrderPopup.defaultProps = {
    suppliers: [{
        s_id: 0,
        s_name: "Manu Textile",
        s_address: "Delhi",
        s_phone: "XXX-XXX-XXXX",
        s_gst: "XXX-XXXX"
    }]
}

export default AddOrderPopup;
