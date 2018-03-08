/**
 * Created By: Naveen Malhotra
 * Created Date: (dd/mm/yyyy)
*/

import React from 'react';

import ActionTypes from '../../constants/actionTypes';
import EventTypes from '../../constants/eventTypes';
import ItemStore from '../../stores/itemStore';
import ItemActions from '../../actions/itemActions';
import IconLoading from '../../assets/iconLoading';
import IconCloudError from '../../assets/iconCloudError';
import { decodeToken } from '../../utils/secret';
import IconEdit from '../../assets/iconEdit';
import IconDelete from '../../assets/iconDelete';

import _ from 'lodash';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import ConfirmDialog from '../confirmDialog/confirmDialog';

import {    TabContent, TabPane,
            Nav, NavItem, NavLink,
            Card, CardTitle, CardText,
            Row, Col,
            Button, Input,
            FormGroup, Form } from 'reactstrap';

import {    Route,
            Switch,
            Link } from 'react-router-dom';            

import ItemSuppliers from './itemSuppliers';            
import classnames from 'classnames';
import { Redirect } from 'react-router-dom'
import HeaderComp from '../header/headerView';
import AddEditItemPopup from './add_editItemPopup';
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
            loadingStatus: 0,
            confirmDialogOptions: {
                showConfirmDialog: false,
                heading: "Delete Item",
                actionBtnLabel: "Delete",
                actionType: ActionTypes.DELETE_ITEM,
                item_id: "",
                bodyMessage: "Are you sure you want to delete the item?"
            },
            item: {
                item_code: "",
                base: "",
                price: "",
                description: "",
                image_url: "",
                item_id: ""
            }
        };

        this.showAddItemPopup = this.showAddItemPopup.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.togglePopupProp = this.togglePopupProp.bind(this);
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.cb_onGetItemsResult = this.cb_onGetItemsResult.bind(this);
        this.cb_onAddItemResult = this.cb_onAddItemResult.bind(this);
        this.toggleConfirmPopupProp = this.toggleConfirmPopupProp.bind(this);
        this.cb_onItemDeleteResult = this.cb_onItemDeleteResult.bind(this);
        this.cb_onItemUpdateResult = this.cb_onItemUpdateResult.bind(this);

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
        ItemStore.addChangeListener(EventTypes.DELETE_ITEM_EVENT, this.cb_onItemDeleteResult);
        ItemStore.addChangeListener(EventTypes.UPDATE_ITEM_EVENT, this.cb_onItemUpdateResult);
    }

    componentWillUnmount() {
        ItemStore.removeChangeListener(EventTypes.GET_ITEMS_EVENT, this.cb_onGetItemsResult);
        ItemStore.removeChangeListener(EventTypes.ADD_ITEM_EVENT, this.cb_onAddItemResult);
        ItemStore.removeChangeListener(EventTypes.DELETE_ITEM_EVENT, this.cb_onItemDeleteResult);
        ItemStore.removeChangeListener(EventTypes.UPDATE_ITEM_EVENT, this.cb_onItemUpdateResult);
    }

    
    cb_onItemDeleteResult(event) {
        if(event.status === "SUCCESS") {
            var arr = this.state.orignalItems.filter(item => item.item_id != event.item_id);
            this.setState({
                filteredItems : arr,
                orignalItems : arr,
                confirmDialogOptions: Object.assign(this.state.confirmDialogOptions, {
                    showConfirmDialog: false
                })
            });

            toastr.success("Item deleted", "Success");
        }
        else {
            toastr.error("Deleting the Item", "Error");
        }
    }
    
    toggleConfirmPopupProp() {
        this.setState({
            confirmDialogOptions: Object.assign(this.state.confirmDialogOptions, {
                showConfirmDialog: false
            })
        });
    }
    
    cb_onItemUpdateResult(event) {
        
    }
    
    cb_onAddItemResult(event) {
        if(event.status === "SUCCESS") {
            this.setState({
                orignalItems: [...this.state.orignalItems, event.item],
                filteredItems: [...this.state.orignalItems, event.item],
                showpopup: false
            });

            toastr.success("Item Added", "Success");
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
    showAddItemPopup() {
        this.setState({
            showPopup: true,
            item: {
                item_code: "",
                base: "",
                price: "",
                description: "",
                image_url: "",
                item_id: ""
            },
            isEditMode: false
        });
    }
    
    togglePopupProp() {
        this.setState({
            showPopup: false
        });
    }
    
    editItem(event) {
        let itemToEdit = _.filter(this.state.orignalItems, function(item) { return (item.item_id == event.currentTarget.getAttribute("data-itemid")) })[0];
        this.setState({
            item: itemToEdit,
            isEditMode: true,
            showPopup: true
        });
    }
    
    deleteItem(event) {
        this.setState({
            confirmDialogOptions: Object.assign(this.state.confirmDialogOptions, {
                showConfirmDialog: true,
                item_id: event.currentTarget.getAttribute("data-itemid")
            })
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
        let token = sessionStorage.getItem("token");
        var decoded = decodeToken(token);
        if(decoded.role === "ADMIN") {
            return(
                <tr key={index}>
                    <td>{item.item_code}</td>
                    <td>{item.base}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>
                        <Link to={`${this.props.match.url}/${item.item_id}/suppliers`}>
                            Show suppliers
                        </Link>
                    </td>
                    <td><span className="padding10 handCursor" data-itemid={item.item_id} onClick={this.editItem}><IconEdit width="18" height="18"/></span><span data-itemid={item.item_id} className="padding10 handCursor" onClick={this.deleteItem}><IconDelete width="18" height="18"/></span></td>
                </tr>
            );
        }
        else {
            return(
                <tr key={index}>
                    <td>{item.item_code}</td>
                    <td>{item.base}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                </tr>
            );
        }
    }

    checkAuthorization() {
        let token = sessionStorage.getItem("token");
        try {
            var decoded = decodeToken(token);
            if(decoded.role === 'ADMIN') {
                return(
                    <div>
                        <HeaderComp {...this.props} title="Items"/>
                        <AddEditItemPopup {...this.props} showPopup={this.state.showPopup} togglePopup={this.togglePopupProp} item={this.state.item} items={this.state.orignalItems} isEditMode={this.state.isEditMode}/>
                        <ConfirmDialog options={this.state.confirmDialogOptions} togglePopup={this.toggleConfirmPopupProp}/>
                        
                        <Switch>
                            <Route exact path="/items" render={(props) => (
                                    <div>
                                        <div className="itemView_actionBarContainerStyle">
                                            <div className="itemView_actionBarItemStyle">
                                                <Button className="appButtonStyle" onClick={this.showAddItemPopup}>Add Item</Button>
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
                                                    <th>Suppliers</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.loadingStatus == 0?<tr><td colSpan="5" height="100px"><div className="itemView_loadingContainerStyle"><IconLoading width="50" height="40"/><span className="itemView_loadingTextStyle">Loading...</span></div></td></tr>:(this.state.loadingStatus == 1?<tr className="hideStyle"><td></td></tr>:<tr><td colSpan="5" height="150px"><div className="itemView_loadingContainerStyle"><IconCloudError width="80" height="100"/><span className="itemView_errorTextStyle">Error loading the data</span></div></td></tr>)}
                                            {this.state.filteredItems.map(this.rowElement.bind(this))}
                                            </tbody>
                                      </Table>
                                    </div> 
                            )}/>
                                
                          <Route path={`${this.props.match.url}/:item_id/suppliers`} render={(props) => (
                              <ItemSuppliers {...props} item={this.state.orignalItems.filter(item => item.item_id === parseInt(props.match.params.item_id))}/>
                          )}/>
                      </Switch>
                    </div>
                );
            }
            else {
                return(
                    <div>
                        <HeaderComp {...this.props} title="Items"/>
                        <AddEditItemPopup {...this.props} showPopup={this.state.showPopup} togglePopup={this.togglePopupProp} item={this.state.item} items={this.state.orignalItems} isEditMode={this.state.isEditMode}/>
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
