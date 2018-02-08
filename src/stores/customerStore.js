/**
 * Created By: Naveen Malhotra
 * Created Date: 23/01/2018(dd/mm/yyyy)
*/

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import EventTypes from '../constants/eventTypes';
import Events from 'events';
import request from 'request';
import { getBase } from '../utils/secret';

var EventEmitter = Events.EventEmitter;

var CustomerStore = Object.assign({}, EventEmitter.prototype, {
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
        case ActionTypes.GET_CUSTOMERS: {
            // call service to check the login credentials and trigger event accordingly
            var options = {
                url: getBase() + '/getCustomers',
                method: "POST",
                form: {'token': action.data.token}
            };

            request(options, function (error, response, body) {
                let requestStatus = "ERROR";
                if (!error && response.statusCode == 200) {
                    let customersData;
                    var result = JSON.parse(body);
                    if(result.code == undefined) {
                        requestStatus = "SUCCESS";
                        customersData = result;
                    }

                    CustomerStore.emitChange(EventTypes.GET_CUSTOMERS_EVENT, {eventName: "GET_CUSTOMERS", customers: customersData, status: requestStatus});
                }
            });

            break;
        }

        case ActionTypes.ADD_CUSTOMER: {
            break;
        }

        default:
            // no op
    }
});

export default CustomerStore;
