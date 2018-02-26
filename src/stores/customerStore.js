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
            var customer = {
                'token': action.data.token,
                'c_name': action.data.customer.c_name,
                'c_address': action.data.customer.c_address,
                'c_phone': action.data.customer.c_phone,
                'description': action.data.customer.description,
                'c_gst': action.data.customer.c_gst
            };
            // call service to check the login credentials and trigger event accordingly
            var options = {
                url: getBase() + '/addCustomer',
                method: "POST",
                form: customer
            };

            request(options, function (error, response, body) {
                let requestStatus = "ERROR";
                if (!error && response.statusCode == 200) {
                    let customerData;
                    var result = JSON.parse(body);
                    if(result.code == undefined) {
                        requestStatus = "SUCCESS";
                        customer.c_id = result.insertId;
                    }

                    CustomerStore.emitChange(EventTypes.ADD_CUSTOMER_EVENT, {eventName: "ADD_CUSTOMER", customer: customer, status: requestStatus});
                }
            });
            break;
        }

        case ActionTypes.DELETE_CUSTOMER: {
            console.log("I am here");
            var customer = {
                'token': action.data.token,
                'c_id': action.data.c_id
            };
            // call service to check the login credentials and trigger event accordingly
            var options = {
                url: getBase() + '/deleteCustomer',
                method: "POST",
                form: customer
            };

            request(options, function (error, response, body) {
                let requestStatus = "ERROR";
                if (!error && response.statusCode == 200) {
                    let customerData;
                    var result = JSON.parse(body);
                    if(result.code == undefined) {
                        requestStatus = "SUCCESS";
                    }

                    CustomerStore.emitChange(EventTypes.DELETE_CUSTOMER_EVENT, {eventName: "DELETE_CUSTOMER", c_id: action.data.c_id, status: requestStatus});
                }
            });
            break;
        }

        case ActionTypes.UPDATE_CUSTOMER: {
            var customer = {
                'token': action.data.token,
                'c_name': action.data.customer.c_name,
                'c_phone': action.data.customer.c_phone,
                'c_address': action.data.customer.c_address,
                'c_gst': action.data.customer.c_gst,
                'c_id' : action.data.customer.c_id,
                'description': action.data.customer.description
            };
            // call service to check the login credentials and trigger event accordingly
            var options = {
                url: getBase() + '/updateCustomer',
                method: "POST",
                form: customer
            };

            request(options, function (error, response, body) {
                let requestStatus = "ERROR";
                if (!error && response.statusCode == 200) {
                    var result = JSON.parse(body);
                    if(result.code == undefined) {
                        requestStatus = "SUCCESS";
                    }

                    CustomerStore.emitChange(EventTypes.UPDATE_CUSTOMER_EVENT, {eventName: "UPDATE_CUSTOMER", customer: customer, status: requestStatus});
                }
            });
            break;
        }

        default:
            // no op
    }
});

export default CustomerStore;
