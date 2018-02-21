/**
 * Created By: Naveen Malhotra
 * Created Date: (dd/mm/yyyy)
*/

import React from 'react';

import ActionTypes from '../../constants/actionTypes';
import EventTypes from '../../constants/eventTypes';
import UserStore from '../../stores/userStore';
import UserActions from '../../actions/userActions';
import IconLoading from '../../assets/iconLoading';
import IconCloudError from '../../assets/iconCloudError';
import IconEdit from '../../assets/iconEdit';
import IconDelete from '../../assets/iconDelete';

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
import AddUserPopup from './addUserPopup';
import ConfirmDialog from '../confirmDialog/confirmDialog';
import { Table } from 'reactstrap';
import './userViewCSS.css';

class UserView extends React.Component{
    constructor(props) {
        super(props);
        /**
        *   loadingStatus:0 (loading)
        *   loadingStatus:1 (got result)
        *   loadingStatus:2 (error)
        **/
        this.state = {
            showpopup: false,
            filteredUsers: [],
            orignalUsers: [],
            loadingStatus:0,
            serverBusy: false,
            confirmDialogOptions: {
                showConfirmDialog: false,
                heading: "Delete User",
                actionBtnLabel: "Delete",
                actionType: ActionTypes.DELETE_USER,
                user_id: "",
                bodyMessage: "Are you sure you want to delete the user?"
            }
        };

        this.updateSearch = this.updateSearch.bind(this);
        //this.showCustomerForm = this.showCustomerForm.bind(this);
        this.cb_onGetUsersResult = this.cb_onGetUsersResult.bind(this);
        this.cb_onAddUsersResult = this.cb_onAddUsersResult.bind(this);
        this.cb_onUserDeleteResult = this.cb_onUserDeleteResult.bind(this);
        this.togglePopupProp = this.togglePopupProp.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.showAddUserpopup = this.showAddUserpopup.bind(this);
        this.toggleConfirmPopupProp = this.toggleConfirmPopupProp.bind(this);

        var decoded = decodeToken(sessionStorage.getItem("token"));
        if(decoded.role === "ADMIN") {
            // Action calls
            UserActions.getUsers(sessionStorage.getItem("token"));

        }
    }

    /**
     * WHEN: Before initial render, both client and server
     * WHY: Good spot to set initial state
    */
    componentWillMount() {
        UserStore.addChangeListener(EventTypes.GET_USERS_EVENT, this.cb_onGetUsersResult);
        UserStore.addChangeListener(EventTypes.ADD_USER_EVENT, this.cb_onAddUsersResult);
        UserStore.addChangeListener(EventTypes.DELETE_USER_EVENT, this.cb_onUserDeleteResult);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(EventTypes.GET_USERS_EVENT, this.cb_onGetUsersResult);
        UserStore.removeChangeListener(EventTypes.ADD_USER_EVENT, this.cb_onAddUsersResult);
        UserStore.removeChangeListener(EventTypes.DELETE_USER_EVENT, this.cb_onUserDeleteResult);
    }

    cb_onGetUsersResult(event) {
        if(event.status === "SUCCESS") {
            this.setState({
                filteredUsers: event.users,
                orignalUsers: event.users,
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

    cb_onAddUsersResult(event) {
        if(event.status === "SUCCESS") {
            this.setState({
                orignalUsers: [...this.state.orignalUsers, event.user],
                filteredUsers: [...this.state.orignalUsers, event.user],
                showpopup: false
            });

            toastr.success("User Added", "Success");
        }
        else {
            toastr.error("Adding the user", "Error");
        }
    }

    cb_onUserDeleteResult(event) {
        if(event.status === "SUCCESS") {
            var arr = this.state.orignalUsers.filter(user => user.user_id != event.user_id);
            this.setState({
                filteredUsers : arr,
                orignalUsers : arr,
                confirmDialogOptions: Object.assign(this.state.confirmDialogOptions, {
                    showConfirmDialog: false
                })
            });

            toastr.success("User deleted", "Success");
        }
        else {
            toastr.error("Deleting the user", "Error");
        }
    }

    updateSearch(event) {
        let value = event.target.value;
        this.setState({
            filteredUsers: this.state.orignalUsers.filter(user => {
                if( user.firstname.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  user.lastname.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  user.address.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  user.email.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  user.username.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  user.password.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  user.role.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  user.phone.toUpperCase().indexOf(value.toUpperCase()) >= 0)
                    return true;
                else return false;
            })
        });
    }

    rowElement(item, index) {
        return(
            <tr key={index}>
                <td>{item.firstname} {item.lastname}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.username}</td>
                <td>{item.password}</td>
                <td>{item.role}</td>
                <td><span className="padding10 handCursor" data-userid={item.user_id} onClick={this.editUser}><IconEdit width="18" height="18"/></span><span data-userid={item.user_id} className="padding10 handCursor" onClick={this.deleteUser}><IconDelete width="18" height="18"/></span></td>
            </tr>
        );
    }

    editUser(event) {
        console.log(event.currentTarget.getAttribute("data-userid"));
    }

    deleteUser(event) {
        this.setState({
            confirmDialogOptions: Object.assign(this.state.confirmDialogOptions, {
                showConfirmDialog: true,
                user_id: event.currentTarget.getAttribute("data-userid")
            })
        });
    }

    showAddUserpopup() {
        this.setState({
            showPopup: true
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

    checkAuthorization() {
        let token = sessionStorage.getItem("token");
        try {
            var decoded = decodeToken(token);
            if(decoded.role === "ADMIN") {
                return(
                    <div>
                        <HeaderComp {...this.props} title="Users" visibleStyle={this.state.serverBusy}/>
                        <AddUserPopup showPopup={this.state.showPopup} togglePopup={this.togglePopupProp} existingUsers={this.state.orignalUsers}/>
                        <ConfirmDialog options={this.state.confirmDialogOptions} togglePopup={this.toggleConfirmPopupProp}/>
                        <div className="userView_actionBarContainerStyle">
                            <div className="userView_actionBarItemStyle">
                                <Button onClick={this.showAddUserpopup} className="appButtonStyle">Add User</Button>
                            </div>
                            <div className="userView_actionBarItemStyle">
                                <Input type="text" name="searchBar" id="searchBar" onChange={this.updateSearch} placeholder="Search"/>
                            </div>
                        </div>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Role</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.loadingStatus == 0?<tr><td colSpan="5" height="100px"><div className="userView_loadingContainerStyle"><IconLoading width="50" height="40"/><span className="userView_loadingTextStyle">Loading...</span></div></td></tr>:(this.state.loadingStatus == 1?<tr className="hideStyle"><td></td></tr>:<tr><td colSpan="5" height="150px"><div className="userView_loadingContainerStyle"><IconCloudError width="80" height="100"/><span className="userView_errorTextStyle">Error loading the data</span></div></td></tr>)}
                            {this.state.filteredUsers.map(this.rowElement.bind(this))}
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
            return(<Redirect to="/notAuthorised"/>);
        }
    }

    render (){
        return (
            this.checkAuthorization()
        );
    }
}

UserView.defaultProps = {

}

export default UserView;
