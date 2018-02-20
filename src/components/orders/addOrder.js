/**
 * Created By: Naveen Malhotra
 * Created Date: 19/02/2018(dd/mm/yyyy)
*/

import React from 'react';
import EventTypes from '../../constants/eventTypes';
import ItemStore from '../../stores/itemStore';
import ItemActions from '../../actions/itemActions';
import OrderStore from '../../stores/orderStore';
import OrderActions from '../../actions/orderActions';
import SupplierStore from '../../stores/supplierStore';
import SupplierActions from '../../actions/supplierActions';
import IconLoading from '../../assets/iconLoading';
import IconCloudError from '../../assets/iconCloudError';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import _ from 'lodash';

import toastr from 'toastr';
import 'toastr/build/toastr.css'

import { decodeToken } from '../../utils/secret';
import {    TabContent, TabPane,
            Nav, NavItem, NavLink,
            Card, CardTitle, CardText,
            Row, Col,
            Button, Input, Label,
            FormGroup, Form } from 'reactstrap';
import classnames from 'classnames';
import { Redirect } from 'react-router-dom'
import HeaderComp from '../header/headerView';
import AddOrderPopup from './addOrderPopup';
import { Table } from 'reactstrap';
import './ordersCSS.css';

class AddOrder extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            selectedItems: [],
            selectedDate: moment(),
            filteredItems: [],
            orignalItems: [],
            loadingStatus:0
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.cb_onGetItemsResult = this.cb_onGetItemsResult.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
        
        // Action calls
        ItemActions.getItems(sessionStorage.getItem("token"));
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
    
    onItemSelect(event) {
        var items = this.state.selectedItems;
        if(event.target.checked) {
            items.push(event.target.name)
            this.setState({selectedItems: items});
        }
        else {
            _.pull(items, event.target.name);
            this.setState({selectedItems: items});
        }
    }

    handleDateChange(event) {
        this.setState({
            selectedDate: event
        });
    }
    
    updateSearch(event) {
        let value = event.target.value;
        this.setState({
            filteredItems: this.state.orignalItems.filter(item => {
                if( item.item_code.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  item.base.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  item.price.toUpperCase().indexOf(value.toUpperCase()) >= 0
                ||  item.description.toUpperCase().indexOf(value.toUpperCase()) >= 0)
                    return true;
                else return false;
            })
        });
    }
    
    rowElement(item, index) {
        return(
            <tr key={index}>
                <td><input name={item.item_id} onChange={this.onItemSelect} checked={this.state.selectedItems.includes(item.item_id.toString())?true:false} type="checkbox" /></td>
                <td>{item.item_code}</td>
                <td>{item.base}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
            </tr>
        );
    }

    checkAuthorization() {
        let token = sessionStorage.getItem("token");
        try {
            var decoded = decodeToken(token);
            return(
                <div>
                    <HeaderComp {...this.props} title="Add Order"/>
                
                    <div className="itemView_actionBarContainerStyle">
                        <div className="itemView_actionBarItemStyle">
                            <Input type="text" name="customerName" id="customerName" placeholder="Customer Name" />
                        </div>
                        <div className="itemView_actionBarItemStyle">
                            <Input type="text" name="orderNumber" id="orderNumber" placeholder="Order Number" />
                        </div>
                        <div className="itemView_actionBarItemStyle">
                            <DatePicker className="form-control"
                                selected={this.state.selectedDate}
                                onChange={this.handleDateChange}
                                dateFormat="DD-MMM-YYYY"
                            />
                        </div>
                    </div>
                    <div className="itemView_actionBarContainerStyle">
                        <div className="itemView_actionBarItemStyle">
                            <Input type="text" name="searchBar" id="searchBar" onChange={this.updateSearch} placeholder="Search"/>
                        </div>
                        <div className="itemView_actionBarItemStyle">
                            <Button color="success">Save Order</Button>
                        </div>
                    </div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Item Code</th>
                                <th>Base</th>
                                <th>Price</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.loadingStatus == 0?<tr><td colSpan="5" height="100px"><div className="itemView_loadingContainerStyle"><IconLoading width="50" height="40"/><span className="itemView_loadingTextStyle">Loading...</span></div></td></tr>:(this.state.loadingStatus == 1?<tr className="hideStyle"><td></td></tr>:<tr><td colSpan="5" height="150px"><div className="itemView_loadingContainerStyle"><IconCloudError width="80" height="100"/><span className="itemView_errorTextStyle">Error loading the data</span></div></td></tr>)}
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

AddOrder.propTypes = {

}

AddOrder.defaultProps = {

}

export default AddOrder;
