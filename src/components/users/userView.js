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

import toastr from 'toastr';
import 'toastr/build/toastr.css'

import jwt from 'jsonwebtoken';
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

        // Action calls
        UserActions.getUsers();
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
                if( user.s_name.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  user.s_address.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  user.s_phone.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  user.description.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  user.s_gst.toUpperCase().indexOf(value.toUpperCase()) >= 0)
                    return true;
                else return false;
            })
        });
    }

    rowElement(item, index) {
        return(
            <tr key={index}>
                <td>{item.s_name}</td>
                <td>{item.s_address}</td>
                <td>{item.s_phone}</td>
                <td>{item.description}</td>
                <td>{item.s_gst}</td>
            </tr>
        );
    }

    render (){
        return (
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
                            <th>Description</th>
                            <th>GST</th>
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
}

UserView.defaultProps = {

}

export default UserView;
