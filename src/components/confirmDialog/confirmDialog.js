/**
 * Created By: Naveen Malhotra
 * Created Date: (dd/mm/yyyy)
*/

import React from 'react';
import ActionTypes from '../../constants/actionTypes';
import UserActions from '../../actions/userActions';
import SupplierActions from '../../actions/supplierActions';
import {    Button,
            Popover,
            PopoverBody,
            Modal,
            ModalHeader,
            ModalBody,
            ModalFooter } from 'reactstrap';

class ConfirmDialog extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            showpopup: false
        };

        this.showPopup = this.showPopup.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.takeAction = this.takeAction.bind(this);
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

    /**
     * WHEN: When receiving new props. Not called on initial render
     * WHY: Set state before render
    */
    componentWillReceiveProps(nextProps) {
        if(nextProps.options.showConfirmDialog)
            this.showPopup();
    }

    showPopup() {
        this.setState({
            showpopup: true
        });
    }

    hidePopup() {
        this.setState({
            showpopup: false
        });

        this.props.togglePopup();
    }

    takeAction() {
        switch(this.props.options.actionType) {
            case ActionTypes.DELETE_SUPPLIER: {
                console.log(this.props.options.s_id);
                SupplierActions.deleteSupplier(sessionStorage.getItem("token"), this.props.options.s_id);
                break;
            }
            
            case ActionTypes.DELETE_USER: {
                UserActions.deleteUser(sessionStorage.getItem("token"), this.props.options.user_id);
                break;
            }
        }
        
        this.hidePopup();
    }

    render (){
        return (
            <div>
            <Modal isOpen={this.state.showpopup} toggle={this.hidePopup}>
                <ModalHeader toggle={this.hidePopup}>{this.props.options.heading}</ModalHeader>
                <ModalBody>
                    <h5>{this.props.options.bodyMessage}</h5>
                </ModalBody>
                <ModalFooter>
                    <Button className="appButtonStyle" onClick={this.takeAction}>{this.props.options.actionBtnLabel}</Button>
                    <Button color="secondary" onClick={this.hidePopup}>Cancel</Button>
                </ModalFooter>
            </Modal>
            </div>
        );
    }
}

export default ConfirmDialog;
