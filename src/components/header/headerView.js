/**
 * Created By: Naveen Malhotra
 * Created Date: (dd/mm/yyyy)
*/

import React from 'react';
import './headerViewCSS.css';
import { decodeToken } from '../../utils/secret';
import IconThreeBars from '../../assets/iconThreeBars';
import IconLogout from '../../assets/iconLogout';
import IconKey from '../../assets/iconKey';
import IconAddUser from '../../assets/iconAddUser';
import IconOrders from '../../assets/iconOrders';
import IconSuppliers from '../../assets/iconSuppliers';
import IconCustomers from '../../assets/iconCustomers';
import IconItems from '../../assets/iconItems';

import EventTypes from '../../constants/eventTypes';
import LoginStore from '../../stores/loginStore';
import LoginActions from '../../actions/loginActions';

import toastr from 'toastr';
import 'toastr/build/toastr.css'

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

class HeaderComp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: "",
            newPassword: "",
            reTypeNewPassword: "",
            popoverOpen: false,
            modal: false,
            menuItems: ["Items", "Add Order"]
        };

        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.toggleModel = this.toggleModel.bind(this);
        this.passwordChangeClick = this.passwordChangeClick.bind(this);
        this.changeLink = this.changeLink.bind(this);
        this.on_passwordChanged = this.on_passwordChanged.bind(this);
    }

    /**
     * WHEN: Before initial render, both client and server
     * WHY: Good spot to set initial state
    */
    componentWillMount() {
        LoginStore.addChangeListener(EventTypes.CHANGE_PASSWORD_EVENT, this.on_passwordChanged);
        var token = sessionStorage.getItem("token");
        try {
            var decoded = decodeToken(token);
            if(decoded.role === "ADMIN")
            {
                this.setState({
                    menuItems: ['Items', 'Users', 'Customer Orders', 'Supplier Orders', 'Add Order', 'Suppliers', 'Customers']
                });
            }

            var element = document.getElementById("wrapper");
            element.classList.remove("wrapperSolidStyle");
            element.classList.add("wrapperPatternStyle");
        }
        catch(error) {
            console.log(error);
        }
    }
    
    componentWillUnmount() {
        LoginStore.removeChangeListener(EventTypes.CHANGE_PASSWORD_EVENT, this.on_passwordChanged);
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    toggleModel() {
        this.setState({
          modal: !this.state.modal
        });
    }

    logout() {
        sessionStorage.removeItem("token");
        this.props.history.push("/");
    }

    changePassword() {
        this.toggle();
        this.toggleModel();
    }

    passwordChangeClick() {
        if(this.state.newPassword === this.state.reTypeNewPassword) {
            LoginActions.changePassword(
                sessionStorage.getItem("token"),            
                this.state.oldPassword,
                this.state.newPassword
            );
            this.toggleModel();
        }
        else {
            toastr.warning('Passwords should match', 'Warning'); 
        }
    }
    
    on_passwordChanged(event) {
        if(event.status === "SUCCESS") {
            toastr.success('Password updated!', 'Success');
        }
        else {
            toastr.error('Changing the password', 'Error'); 
        }
    }

    changeLink(event) {
        if(this.props.history.location.pathname === "/" + event.target.name) {
            this.toggle();
        }
        else {
            this.props.history.push("/" + event.target.name);
        }
    }
    
    onTextChange(event) {
        var field = event.target.name;
		var value = event.target.value;
        var updatedProperty = {};
        updatedProperty[field] = value;
        var updatedState = Object.assign(this.state, updatedProperty);
        this.setState(updatedState);
    }

    addMenuItem(menuItem, index) {
        switch(menuItem) {
            case "Users": {
                return (
                    <div key={index}><IconAddUser width="20" height="20"/> <Button color="link" name="users" onClick={this.changeLink} className="logoutTextStyle">{menuItem}</Button></div>
                );
            }
            case "Customer Orders": {
                return (
                    <div key={index}><IconOrders width="20" height="20"/> <Button color="link" name="customerOrders" onClick={this.changeLink} className="logoutTextStyle">{menuItem}</Button></div>
                );
            }
            case "Supplier Orders": {
                return (
                    <div key={index}><IconOrders width="20" height="20"/> <Button color="link" name="supplierOrders" onClick={this.changeLink} className="logoutTextStyle">{menuItem}</Button></div>
                );
            }
            case "Items": {
                return (
                    <div key={index}><IconItems width="20" height="20"/> <Button color="link" name="items" onClick={this.changeLink} className="logoutTextStyle">{menuItem}</Button></div>
                );
            }
            case "Add Order": {
                return (
                    <div key={index}><IconItems width="20" height="20"/> <Button color="link" name="addOrder" onClick={this.changeLink} className="logoutTextStyle">{menuItem}</Button></div>
                );
            }
            case "Suppliers": {
                return (
                    <div key={index}><IconSuppliers width="20" height="20"/> <Button color="link" name="suppliers" onClick={this.changeLink} className="logoutTextStyle">{menuItem}</Button></div>
                );
            }
            case "Customers": {
                return (
                    <div key={index}><IconCustomers width="20" height="20"/> <Button color="link" name="customers" onClick={this.changeLink} className="logoutTextStyle">{menuItem}</Button></div>
                );
            }
        }
    }

    render (){
        return (
            <div className="headerView_headerStyle">
                <div>
                    <span className="companyTitleStyle">{this.props.title}</span>
                    <Button id="Popover1" outline className="appOutlineButtonStyle accountOptionButtonStyle" onClick={this.toggle}>
                        <IconThreeBars />
                    </Button>
                    <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                        <PopoverBody>
                            {this.state.menuItems.map(this.addMenuItem.bind(this))}
                            {this.state.menuItems.length > 0 ? <hr/>:<span></span>}
                            <div><IconKey width="20" height="20"/> <Button color="link" onClick={this.changePassword} className="logoutTextStyle">Change password</Button></div>
                            <div><IconLogout width="20" height="20"/> <Button color="link" onClick={this.logout} className="logoutTextStyle">Logout</Button></div>
                        </PopoverBody>
                    </Popover>

                    <Modal isOpen={this.state.modal} toggle={this.toggleModel}>
                        <ModalHeader toggle={this.toggleModel}>Change Password</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Input type="password" name="oldPassword" id="oldPassword"  placeholder="Old password" value={this.state.oldPassword} onChange={this.onTextChange} className="formItemVerticalStyle"/>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="password" name="newPassword" id="newPassword" placeholder="New password" value={this.state.newPassword} onChange={this.onTextChange } className="formItemVerticalStyle"/>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="password" name="reTypeNewPassword" id="reTypeNewPassword" value={this.state.reTypeNewPassword} onChange={this.onTextChange } placeholder="Re-enter new password" className="formItemVerticalStyle"/>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button className="appButtonStyle" onClick={this.passwordChangeClick}>Change</Button>
                            <Button color="secondary" onClick={this.toggleModel}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default HeaderComp;
