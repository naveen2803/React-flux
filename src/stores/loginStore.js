/**
 * Created By: Naveen Malhotra
 * Created Date: 17/01/2018(dd/mm/yyyy)
*/

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import EventTypes from '../constants/eventTypes';
import Events from 'events';
import request from 'request';

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
            var options = {
                url: 'http://localhost:4000/checkUser',
                method: "POST",
                form: {'username': action.data.username, 'password': action.data.password}
            };

            request(options, function (error, response, body) {
                let requestStatus = "ERROR";
                if (!error && response.statusCode == 200) {
                    let userData;
                    var result = JSON.parse(body);
                    if(result.length > 0) {
                        requestStatus = "SUCCESS";
                        userData = result;
                    }
                    LoginStore.emitChange(EventTypes.LOGIN_EVENT, {eventName: "Login_Event", secret: "secret key", user: userData, status: requestStatus});
                }
            });

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
