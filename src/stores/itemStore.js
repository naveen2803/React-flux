/**
 * Created By: Naveen Malhotra
 * Created Date: 30/01/2018(dd/mm/yyyy)
*/

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import EventTypes from '../constants/eventTypes';
import Events from 'events';
import request from 'request';

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
            request.get('https://wt-naveen-malhotra28-gmail-com-0.run.webtask.io/getItems', function(error, response, body) {
                let requestStatus = "ERROR";
                let itemsData;
                var result = JSON.parse(body);
                if(result.code == undefined) {
                    requestStatus = "SUCCESS";
                    itemsData = result;
                }

                ItemStore.emitChange(EventTypes.GET_ITEMS_EVENT, {eventName: "GET_ITEMS", items: itemsData, status: requestStatus});
            });
            break;
        }

        default:
            // no op
    }
});

export default ItemStore;
