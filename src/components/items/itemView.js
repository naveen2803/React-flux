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
import { decodeToken } from '../../utils/secret';
import toastr from 'toastr';
import 'toastr/build/toastr.css'
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
        this.toggleModel = this.toggleModel.bind(this);
        this.cb_onGetItemsResult = this.cb_onGetItemsResult.bind(this);
        this.cb_onAddItemResult = this.cb_onAddItemResult.bind(this);

        // Action calls
        ItemActions.getItems(sessionStorage.getItem("token"));
    }

    /**
     * WHEN: Before initial render, both client and server
     * WHY: Good spot to set initial state
    */
    componentWillMount() {
        ItemStore.addChangeListener(EventTypes.GET_ITEMS_EVENT, this.cb_onGetItemsResult);
        ItemStore.addChangeListener(EventTypes.ADD_ITEM_EVENT, this.cb_onAddItemResult);
    }

    componentWillUnmount() {
        ItemStore.removeChangeListener(EventTypes.GET_ITEMS_EVENT, this.cb_onGetItemsResult);
        ItemStore.removeChangeListener(EventTypes.ADD_ITEM_EVENT, this.cb_onAddItemResult);
    }

    cb_onAddItemResult(event) {
        if(event.status === "SUCCESS") {
            // this.setState({
            //     filteredItems: event.items,
            //     orignalItems: event.items,
            //     loadingStatus: 1
            // });
        }
        else {
            toastr.error("Adding the item", "Error");
            // this.setState({
            //     loadingStatus: 2
            // });
        }
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
            if(decoded.role === 'ADMIN') {
                return(
                    <div>
                        <HeaderComp {...this.props} title="Items"/>
                        <AddItemPopup {...this.props} showpopup={this.state.showpopup} toggleModel={this.toggleModel} items={this.state.orignalItems}/>
                        <div className="itemView_actionBarContainerStyle">
                            <div className="itemView_actionBarItemStyle">
                                <Button className="appButtonStyle" onClick={this.toggleModel}>Add Item</Button>
                            </div>
                            <div className="itemView_actionBarItemStyle">
                                <Input type="text" name="searchBar" id="searchBar" onChange={this.updateSearch} placeholder="Search"/>
                            </div>
                        </div>
                        <Table responsive>
                            <thead>
                                <tr>
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
            else {
                return(
                    <div>
                        <HeaderComp {...this.props} title="Items"/>
                        <AddItemPopup {...this.props} showpopup={this.state.showpopup} toggleModel={this.toggleModel} items={this.state.orignalItems}/>
                        <div className="itemView_actionBarContainerStyle">
                            <div className="itemView_actionBarItemStyle">
                                <Input type="text" name="searchBar" id="searchBar" onChange={this.updateSearch} placeholder="Search"/>
                            </div>
                        </div>
                        <Table responsive>
                            <thead>
                                <tr>
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
