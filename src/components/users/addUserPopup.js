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
import UserStore from '../../stores/userStore';
import UserActions from '../../actions/userActions';

import toastr from 'toastr';
import 'toastr/build/toastr.css';

class AddUserpopup extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            showpopup: false,
            user: {
                firstname: "",
                lastname: "",
                phone: "",
                address: "",
                email: "",
                username: "",
                role: "USER"
            }
        };

        this.toggleModel = this.toggleModel.bind(this);
        this.addUser = this.addUser.bind(this);
        this.cb_onAddUsersResult = this.cb_onAddUsersResult.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    /**
     * WHEN: Before initial render, both client and server
     * WHY: Good spot to set initial state
    */
    componentWillMount() {
        UserStore.addChangeListener(EventTypes.ADD_USER_EVENT, this.cb_onAddUsersResult);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(EventTypes.ADD_USER_EVENT, this.cb_onAddUsersResult);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.showPopup !== undefined)
            this.toggleModel();
    }

    toggleModel() {
        this.setState({
            showpopup: !this.state.showpopup
        });
    }

    addUser() {
        var userObject = {};
        console.log(this.state.user);
        UserActions.addUsers(sessionStorage.getItem("token"), this.state.user);
    }

    cb_onAddUsersResult(event) {
        console.log(event);
        if(event.status === "SUCCESS") {
            this.toggleModel();
        }
        else {
            toastr.error("Adding the user", "Error");
        }
    }

    onTextChange(event) {
        var field = event.target.name;
		var value = event.target.value;
        var updatedProperty = {};
        updatedProperty[field] = value;
        var updatedUser = Object.assign(this.state.user, updatedProperty);
        this.setState({
            user: updatedUser
        });
    }

    render (){
        return (
            <div>
                <Modal isOpen={this.state.showpopup} toggle={this.toggleModel}>
                    <ModalHeader toggle={this.toggleModel}>Add User</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Input type="text" name="firstname" id="firstname" value={this.state.user.firstname} onChange={this.onTextChange} placeholder="Firstname" className="formItemVerticalStyle"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="lastname" id="lastname" value={this.state.user.lastname} onChange={this.onTextChange} placeholder="Lastname" className="formItemVerticalStyle"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="phone" id="phone" value={this.state.user.phone} onChange={this.onTextChange} placeholder="Phone" className="formItemVerticalStyle"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="textarea" name="address" id="address" value={this.state.user.address} onChange={this.onTextChange} placeholder="Address" className="formItemVerticalStyle"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="email" name="email" id="email" value={this.state.user.email} onChange={this.onTextChange} placeholder="Email" className="formItemVerticalStyle"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="username" id="username" value={this.state.user.username} onChange={this.onTextChange} placeholder="Username" className="formItemVerticalStyle"/>
                            </FormGroup>
                                <FormGroup>
                                <Input type="select" name="role" id="role" value={this.state.user.role} onChange={this.onTextChange} placeholder="Role" className="formItemVerticalStyle">
                                    <option>USER</option>
                                    <option>ADMIN</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="appButtonStyle" onClick={this.addUser}>Add</Button>
                        <Button color="secondary" onClick={this.toggleModel}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddUserpopup;
