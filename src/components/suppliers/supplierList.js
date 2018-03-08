/**
 * Created By: Naveen Malhotra
 * Created Date: (dd/mm/yyyy)
*/

import React from 'react';
import {    TabContent, TabPane,
            Nav, NavItem, NavLink,
            Card, CardTitle, CardText,
            Row, Col,
            Button, Input, Table,
            FormGroup, Form } from 'reactstrap';

import IconLoading from '../../assets/iconLoading';
import IconCloudError from '../../assets/iconCloudError';
class SupplierList extends React.Component{
    constructor(props) {
        super(props);

        this.state = {};
    }

    render (){
        return (
            <div>
                <div className="supplierView_actionBarContainerStyle">
                    <div className="supplierView_actionBarItemStyle">
                        <Button onClick={this.props.showAddSupplierPopup} className="appButtonStyle">Add Supplier</Button>
                    </div>
                    <div className="supplierView_actionBarItemStyle">
                        <Input type="text" name="searchBar" id="searchBar" onChange={this.props.updateSearch} placeholder="Search"/>
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.loadingStatus == 0?<tr><td colSpan="5" height="100px"><div className="supplierView_loadingContainerStyle"><IconLoading width="50" height="40"/><span className="supplierView_loadingTextStyle">Loading...</span></div></td></tr>:(this.props.loadingStatus == 1?<tr className="hideStyle"><td></td></tr>:<tr><td colSpan="5" height="150px"><div className="supplierView_loadingContainerStyle"><IconCloudError width="80" height="100"/><span className="supplierView_errorTextStyle">Error loading the data</span></div></td></tr>)}
                    {this.props.filteredSuppliers.map(this.props.rowElement)}
                    </tbody>
              </Table>
          </div>
        );
    }
}

SupplierList.propTypes = {

}

SupplierList.defaultProps = {

}

export default SupplierList;
