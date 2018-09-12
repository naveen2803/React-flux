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
            var options = {
                url: getBase() + '/getSuppliers',
                method: "POST",
                form: {'token': action.data.token}
            };

            request(options, function (error, response, body) {
                let requestStatus = "ERROR";
                if (!error && response.statusCode == 200) {
                    let suppliersData;
                    var result = JSON.parse(body);
                    if(result.code == undefined) {
                        requestStatus = "SUCCESS";
                        suppliersData = result;
                    }

                    SupplierStore.emitChange(EventTypes.GET_SUPPLIERS_EVENT, {eventName: "GET_SUPPLIERS", suppliers: suppliersData, status: requestStatus});
                }
            });
            break;
        }

        case ActionTypes.ADD_SUPPLIER: {
            var supplier = {
                'token': action.data.token,
                's_name': action.data.supplier.s_name,
                's_address': action.data.supplier.s_address,
                's_phone': action.data.supplier.s_phone,
                'description': action.data.supplier.description,
                's_gst': action.data.supplier.s_gst
            };
            // call service to check the login credentials and trigger event accordingly
            var options = {
                url: getBase() + '/addSupplier',
                method: "POST",
                form: supplier
            };

            request(options, function (error, response, body) {
                let requestStatus = "ERROR";
                if (!error && response.statusCode == 200) {
                    let supplierData;
                    var result = JSON.parse(body);
                    if(result.code == undefined) {
                        requestStatus = "SUCCESS";
                        supplier.s_id = result.insertId;
                    }

                    SupplierStore.emitChange(EventTypes.ADD_SUPPLIER_EVENT, {eventName: "ADD_SUPPLIER", supplier: supplier, status: requestStatus});
                }
            });
            break;
        }

        case ActionTypes.DELETE_SUPPLIER: {
            var supplier = {
                'token': action.data.token,
                's_id': action.data.s_id
            };
            // call service to check the login credentials and trigger event accordingly
            var options = {
                url: getBase() + '/deleteSupplier',
                method: "POST",
                form: supplier
            };

            request(options, function (error, response, body) {
                let requestStatus = "ERROR";
                if (!error && response.statusCode == 200) {
                    let supplierData;
                    var result = JSON.parse(body);
                    if(result.code == undefined) {
                        requestStatus = "SUCCESS";
                    }

                    SupplierStore.emitChange(EventTypes.DELETE_SUPPLIER_EVENT, {eventName: "DELETE_SUPPLIER", s_id: action.data.s_id, status: requestStatus});
                }
            });
            break;
        }

        case ActionTypes.UPDATE_SUPPLIER: {
            var supplier = {
                'token': action.data.token,
                's_name': action.data.supplier.s_name,
                's_phone': action.data.supplier.s_phone,
                's_address': action.data.supplier.s_address,
                's_gst': action.data.supplier.s_gst,
                's_id' : action.data.supplier.s_id,
                'description': action.data.supplier.description
            };
            // call service to check the login credentials and trigger event accordingly
            var options = {
                url: getBase() + '/updateSupplier',
                method: "POST",
                form: supplier
            };

            request(options, function (error, response, body) {
                let requestStatus = "ERROR";
                if (!error && response.statusCode == 200) {
                    var result = JSON.parse(body);
                    if(result.code == undefined) {
                        requestStatus = "SUCCESS";
                    }

                    SupplierStore.emitChange(EventTypes.UPDATE_SUPPLIER_EVENT, {eventName: "UPDATE_SUPPLIER", supplier: supplier, status: requestStatus});
                }
            });
            break;
        }

        default:
            // no op
    }
});

export default SupplierStore;
