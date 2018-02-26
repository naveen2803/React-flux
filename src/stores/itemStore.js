/**
 * Created By: Naveen Malhotra
 * Created Date: 30/01/2018(dd/mm/yyyy)
*/

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import EventTypes from '../constants/eventTypes';
import Events from 'events';
import request from 'request';
import { getBase } from '../utils/secret';

var EventEmitter = Events.EventEmitter;

var ItemStore = Object.assign({}, EventEmitter.prototype, {
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
        case ActionTypes.GET_ITEMS: {
            // call service to check the login credentials and trigger event accordingly
            var options = {
                url: getBase() + '/getItems',
                method: "POST",
                form: {'token': action.data.token}
            };

            request(options, function (error, response, body) {
                let requestStatus = "ERROR";
                if (!error && response.statusCode == 200) {
                    let itemsData;
                    var result = JSON.parse(body);
                    if(result.code == undefined) {
                        requestStatus = "SUCCESS";
                        itemsData = result;
                    }

                    ItemStore.emitChange(EventTypes.GET_ITEMS_EVENT, {eventName: "GET_ITEMS", items: itemsData, status: requestStatus});
                }
            });
            break;
        }

        case ActionTypes.ADD_ITEM: {
            var formData = {
                'token': action.data.token,
                'item_code': action.data.item.item_code,
                'base': action.data.item.base,
                'price': action.data.item.price,
                'description': action.data.item.description,
                'image_url': '',
                'item_id': ''
            };
            // call service to check the login credentials and trigger event accordingly
            var options = {
                url: getBase() + '/addItem',
                method: "POST",
                form: formData
            };

            request(options, function (error, response, body) {
                let requestStatus = "ERROR";
                if (!error && response.statusCode == 200) {
                    let itemData;
                    var result = JSON.parse(body);
                    if(result.code == undefined) {
                        requestStatus = "SUCCESS";
                        formData.item_id = result.insertId;
                        itemData = formData;
                    }

                    ItemStore.emitChange(EventTypes.ADD_ITEM_EVENT, {eventName: "ADD_ITEM", item: itemData, status: requestStatus});
                }
            });
            break;
        }

        case ActionTypes.DELETE_ITEM: {
            var item = {
                'token': action.data.token,
                'item_id': action.data.item_id
            };
            // call service to check the login credentials and trigger event accordingly
            var options = {
                url: getBase() + '/deleteItem',
                method: "POST",
                form: item
            };

            request(options, function (error, response, body) {
                let requestStatus = "ERROR";
                if (!error && response.statusCode == 200) {
                    let itemData;
                    var result = JSON.parse(body);
                    if(result.code == undefined) {
                        requestStatus = "SUCCESS";
                    }

                    ItemStore.emitChange(EventTypes.DELETE_ITEM_EVENT, {eventName: "DELETE_ITEM", item_id: action.data.item_id, status: requestStatus});
                }
            });
            break;
        }

        case ActionTypes.UPDATE_ITEM: {
            var item = {
                'token': action.data.token,
                'item_code': action.data.item.item_code,
                'base': action.data.item.base,
                'price': action.data.item.price,
                'description': action.data.item.description,
                'image_url': '',
                'item_id': action.data.item.item_id
            };
            // call service to check the login credentials and trigger event accordingly
            var options = {
                url: getBase() + '/updateItem',
                method: "POST",
                form: item
            };

            request(options, function (error, response, body) {
                let requestStatus = "ERROR";
                if (!error && response.statusCode == 200) {
                    var result = JSON.parse(body);
                    if(result.code == undefined) {
                        requestStatus = "SUCCESS";
                    }

                    ItemStore.emitChange(EventTypes.UPDATE_ITEM_EVENT, {eventName: "UPDATE_ITEM", item: item, status: requestStatus});
                }
            });
            break;
        }

        default:
            // no op
    }
});

export default ItemStore;
