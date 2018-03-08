/**
 * Created By: Naveen Malhotra
 * Created Date: (dd/mm/yyyy)
*/

import React from 'react';
import {    TabContent, TabPane,
            Nav, NavItem, NavLink,
            Card, CardTitle, CardText,
            Row, Col,
            Button, Input,
            FormGroup, Form } from 'reactstrap';

class SupplierItems extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};

        this.goBack = this.goBack.bind(this);
    }

    /**
     * WHEN: Before initial render, both client and server
     * WHY: Good spot to set initial state
    */
    componentWillMount() {
        //For flux
        //MyStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        //For flux
        //MyStore.removeChangeListener(this._onChange);
    }

    goBack() {
        this.props.history.push("/suppliers");
    }

    render (){
        return (
            <div>
                <Button className="appButtonStyle" onClick={this.goBack}>Back</Button>
            </div>
        );
    }
}

export default SupplierItems;
