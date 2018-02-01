/**
 * Created By: Naveen Malhotra
 * Created Date: (dd/mm/yyyy)
*/

import React from 'react';

import EventTypes from '../../constants/eventTypes';
import ItemStore from '../../stores/itemStore';
import ItemActions from '../../actions/itemActions';
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
import AddItemPopup from './addItemPopup';
import { Table } from 'reactstrap';
import './itemViewCSS.css';

class ItemView extends React.Component{
    constructor(props) {
        super(props);
        /**
        *   loadingStatus:0 (loading)
        *   loadingStatus:1 (got result)
        *   loadingStatus:2 (error)
        **/
        this.state = {
            showpopup: false,
            filteredItems: [],
            orignalItems: [],
            loadingStatus:0
        };


        this.updateSearch = this.updateSearch.bind(this);
        //this.showCustomerForm = this.showCustomerForm.bind(this);
        this.toggleModel = this.toggleModel.bind(this);
        this.cb_onGetItemsResult = this.cb_onGetItemsResult.bind(this);

        // Action calls
        ItemActions.getItems();
    }

    /**
     * WHEN: Before initial render, both client and server
     * WHY: Good spot to set initial state
    */
    componentWillMount() {
        ItemStore.addChangeListener(EventTypes.GET_ITEMS_EVENT, this.cb_onGetItemsResult);
    }

    componentWillUnmount() {
        ItemStore.removeChangeListener(EventTypes.GET_ITEMS_EVENT, this.cb_onGetItemsResult);
    }

    cb_onGetItemsResult(event) {
        if(event.status === "SUCCESS") {
            this.setState({
                filteredItems: event.items,
                orignalItems: event.items,
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
            filteredItems: this.state.orignalItems.filter(item => {
                if( item.s_name.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  item.s_address.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  item.s_phone.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  item.description.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  item.s_gst.toUpperCase().indexOf(value.toUpperCase()) >= 0)
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

    checkAuthorization() {
        let token = sessionStorage.getItem("token");
        try {
            var decoded = jwt.verify(token, 'secret key');
            return(
                <div>
                    <HeaderComp {...this.props} title="Items"/>
                    <div className="itemView_actionBarContainerStyle">
                        <div className="itemView_actionBarItemStyle">
                            <Button className="appButtonStyle">Add Item</Button>
                        </div>
                        <div className="itemView_actionBarItemStyle">
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
                        {this.state.loadingStatus == 0?<tr><td colSpan="5" height="100px"><div className="itemView_loadingContainerStyle"><IconLoading width="50" height="40"/><span className="itemView_loadingTextStyle">Loading...</span></div></td></tr>:(this.state.loadingStatus == 1?"":<tr><td colSpan="5" height="150px"><div className="itemView_loadingContainerStyle"><IconCloudError width="80" height="100"/><span className="itemView_errorTextStyle">Error loading the data</span></div></td></tr>)}
                        {this.state.filteredItems.map(this.rowElement.bind(this))}
                        </tbody>
                  </Table>
                </div>
            );

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

ItemView.defaultProps = {

}

export default ItemView;
