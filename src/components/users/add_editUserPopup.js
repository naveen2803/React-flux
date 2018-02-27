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
                role: "USER",
                user_id: ""
            }
        };

        this.showPopup = this.showPopup.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.add_EditUser = this.add_EditUser.bind(this);
        this.cb_onAddUsersResult = this.cb_onAddUsersResult.bind(this);
        this.cb_onUpdateUserResult = this.cb_onUpdateUserResult.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.clearUserState = this.clearUserState.bind(this);
    }

    /**
     * WHEN: Before initial render, both client and server
     * WHY: Good spot to set initial state
    */
    componentWillMount() {
        UserStore.addChangeListener(EventTypes.ADD_USER_EVENT, this.cb_onAddUsersResult);
        UserStore.addChangeListener(EventTypes.UPDATE_USER_EVENT, this.cb_onUpdateUserResult);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(EventTypes.ADD_USER_EVENT, this.cb_onAddUsersResult);
        UserStore.removeChangeListener(EventTypes.UPDATE_USER_EVENT, this.cb_onUpdateUserResult);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user
        });

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

        this.clearUserState();
        this.props.togglePopup();
    }

    clearUserState() {
        this.setState({
            user: {
                firstname: "",
                lastname: "",
                phone: "",
                address: "",
                email: "",
                username: "",
                role: "USER"
            }
        });
    }

    add_EditUser() {
        if(this.props.isEditMode) {
            if( this.validateExistingUser() ) {
                console.log("update user....");
                UserActions.updateUser(sessionStorage.getItem("token"), this.state.user);
            }
            else {}
        }
        else {
            if( this.validateNewUser() ) {
                console.log("Add user....");
                UserActions.addUser(sessionStorage.getItem("token"), this.state.user);
            }
            else {}
        }
    }

    cb_onUpdateUserResult(event) {
        if(event.status === "SUCCESS") {
            this.hidePopup();
        }
        else {
            toastr.error("Updating the customer", "Error");
        }
    }
    
    cb_onAddUsersResult(event) {
        if(event.status === "SUCCESS") {
            this.hidePopup();
        }
        else {
            toastr.error("Adding the user", "Error");
        }
    }
    
    validateNewUser() {
        var userObject = {};
        var username = this.state.user.username.trim();
        var sameUsername = this.props.existingUsers.find(function(user) {            
            return user.username === username;
        });
        
        if( this.state.user.firstname.trim() === ""
        ||  this.state.user.phone.trim() === ""
        ||  this.state.user.username.trim() === "")
        {
            toastr.error("Firstname, phone and username are mandatory fields", "Error");
        }
        else if(sameUsername != undefined) {
            toastr.error("Username exists", "Error");
        }
        else {
            return true;
        }
        
        return false;
    }
    
    validateExistingUser() {
        if( this.state.user.firstname.trim() === ""
        ||  this.state.user.phone.trim() === ""
        ||  this.state.user.username.trim() === "")
        {
            toastr.error("Firstname, phone and username are mandatory fields", "Error");
        }
        else {
            return true;
        }
        
        return false;
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
                <Modal isOpen={this.state.showpopup} toggle={this.hidePopup}>
                    <ModalHeader toggle={this.hidePopup}>{this.props.isEditMode?'Edit User':'Add User'}</ModalHeader>
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
                                <Input type="text" name="username" id="username" value={this.state.user.username} onChange={this.onTextChange} placeholder="Username" className="formItemVerticalStyle" disabled={this.props.isEditMode?'disabled':''}/>
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
                        <Button className="appButtonStyle" onClick={this.add_EditUser}>{this.props.isEditMode?'Update':'Add'}</Button>
                        <Button color="secondary" onClick={this.hidePopup}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddUserpopup;
