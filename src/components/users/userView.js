/**
 * Created By: Naveen Malhotra
 * Created Date: (dd/mm/yyyy)
*/

import React from 'react';

import EventTypes from '../../constants/eventTypes';
import UserStore from '../../stores/userStore';
import UserActions from '../../actions/userActions';
import IconLoading from '../../assets/iconLoading';
import IconCloudError from '../../assets/iconCloudError';
import IconEdit from '../../assets/iconEdit';
import IconDelete from '../../assets/iconDelete';

import toastr from 'toastr';
import 'toastr/build/toastr.css'

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
            loadingStatus:0
        };

        this.updateSearch = this.updateSearch.bind(this);
        //this.showCustomerForm = this.showCustomerForm.bind(this);
        this.toggleModel = this.toggleModel.bind(this);
        this.cb_onGetUsersResult = this.cb_onGetUsersResult.bind(this);

        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        // Action calls
        UserActions.getUsers(sessionStorage.getItem("token"));
    }

    /**
     * WHEN: Before initial render, both client and server
     * WHY: Good spot to set initial state
    */
    componentWillMount() {
        UserStore.addChangeListener(EventTypes.GET_USERS_EVENT, this.cb_onGetUsersResult);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(EventTypes.GET_USERS_EVENT, this.cb_onGetUsersResult);
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

    toggleModel() {
        this.setState({
            showpopup: !this.state.showpopup
        });
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
                <td><span className="padding10 handCursor" data-userid={item.user_id} onClick={this.editUser}><IconEdit width="18" height="18"/></span><span data-userid={item.user_id} className="padding10 handCursor" onClick={this.deleteUser}><IconDelete width="18" height="18"/></span></td>
            </tr>
        );
    }

    editUser(event) {
        console.log(event.currentTarget.getAttribute("data-userid"));
    }

    deleteUser(event) {
        console.log(event.currentTarget.getAttribute("data-userid"));
        var arr = this.state.orignalUsers.filter(user => user.user_id != event.currentTarget.getAttribute("data-userid"));
        this.setState({
            filteredUsers : arr,
            orignalUsers : arr
        });
    }

    checkAuthorization() {
        let token = sessionStorage.getItem("token");
        try {
            var decoded = decodeToken(token);
            if(decoded.role === "ADMIN") {
                return(
                    <div>
                        <HeaderComp {...this.props} title="Users"/>
                        <div className="userView_actionBarContainerStyle">
                            <div className="userView_actionBarItemStyle">
                                <Button className="appButtonStyle">Add User</Button>
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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.loadingStatus == 0?<tr><td colSpan="5" height="100px"><div className="userView_loadingContainerStyle"><IconLoading width="50" height="40"/><span className="userView_loadingTextStyle">Loading...</span></div></td></tr>:(this.state.loadingStatus == 1?"":<tr><td colSpan="5" height="150px"><div className="userView_loadingContainerStyle"><IconCloudError width="80" height="100"/><span className="userView_errorTextStyle">Error loading the data</span></div></td></tr>)}
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

UserView.defaultProps = {

}

export default UserView;
