/**
 * Created By: Naveen Malhotra
 * Created Date: 23/01/2018(dd/mm/yyyy)
*/

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import EventTypes from '../constants/eventTypes';
import Events from 'events';
import request from 'request';

var EventEmitter = Events.EventEmitter;

var SupplierStore = Object.assign({}, EventEmitter.prototype, {
    addChangeListener: function(eventName, callback) {
        this.on(eventName, callback);
    },

    removeChangeListener: function(eventName, callback) {
        this.removeListener(eventName, callback);
    },

    emitChange: function(eventname, params) {
        this.emit(eventname, params);
    }
});

Dispatcher.register(function(action) {
    switch(action.actionType) {
        case ActionTypes.GET_SUPPLIERS: {
            // call service to check the login credentials and trigger event accordingly
            request.get('https://wt-naveen-malhotra28-gmail-com-0.run.webtask.io/getSuppliers', function(error, response, body) {
                let requestStatus = "ERROR";
                let suppliersData;
                var result = JSON.parse(body);
                if(result.code == undefined) {
                    requestStatus = "SUCCESS";
                    suppliersData = result;
                }

                SupplierStore.emitChange(EventTypes.GET_SUPPLIERS_EVENT, {eventName: "GET_SUPPLIERS", suppliers: suppliersData, status: requestStatus});
            });
            break;
        }

        default:
            // no op
    }
});

export default SupplierStore;
