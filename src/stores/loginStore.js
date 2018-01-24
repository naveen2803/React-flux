/**
 * Created By: Naveen Malhotra
 * Created Date: 17/01/2018(dd/mm/yyyy)
*/

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import EventTypes from '../constants/eventTypes';
import Events from 'events';

var EventEmitter = Events.EventEmitter;

var LoginStore = Object.assign({}, EventEmitter.prototype, {
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
        case ActionTypes.LOGIN: {
            // call service to check the login credentials and trigger event accordingly
            LoginStore.emitChange(EventTypes.LOGIN_EVENT, {eventName: "Login_Event", secret: "secret key", user: action.data.username, status: "SUCCESS"});
            break;
        }
        case ActionTypes.LOGOUT: {
            LoginStore.emitChange(EventTypes.LOGOUT_EVENT, {eventName: "Logout_Event"});
            break;
        }

        default:
            // no op
    }
});

export default LoginStore;
