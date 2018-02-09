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

var UserStore = Object.assign({}, EventEmitter.prototype, {
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
        case ActionTypes.GET_USERS: {
            // call service to check the login credentials and trigger event accordingly
            var options = {
                url: getBase() + '/getUsers',
                method: "POST",
                form: {'token': action.data.token}
            };

            request(options, function (error, response, body) {
                let requestStatus = "ERROR";
                if (!error && response.statusCode == 200) {
                    let usersData;
                    var result = JSON.parse(body);
                    if(result.length > 0) {
                        requestStatus = "SUCCESS";
                        usersData = result;
                    }
                    UserStore.emitChange(EventTypes.GET_USERS_EVENT, {eventName: "GET_USERS", users: usersData, status: requestStatus});
                }
            })
            break;
        }

        case ActionTypes.ADD_USER: {
            // call service to check the login credentials and trigger event accordingly
            var user = {
                'token': action.data.token,
                'firstname': action.data.user.firstname,
                'lastname': action.data.user.lastname,
                'phone': action.data.user.phone,
                'address': action.data.user.address,
                'email': action.data.user.email,
                'username': action.data.user.username,
                'role': action.data.user.role,
                'password': 'Password@123'
            };
            var options = {
                url: getBase() + '/addUser',
                method: "POST",
                form: user
            };

            request(options, function (error, response, body) {
                let requestStatus = "ERROR";
                if (!error && response.statusCode == 200) {
                    let usersData;
                    var result = JSON.parse(body);
                    if(result.affectedRows === 1) {
                        requestStatus = "SUCCESS";
                        user.user_id = result.insertId;
                    }
                    UserStore.emitChange(EventTypes.ADD_USER_EVENT, {eventName: "ADD_USER", user: user, status: requestStatus});
                }
            })
            break;
        }

        case ActionTypes.DELETE_USER: {
            // call service to check the login credentials and trigger event accordingly
            var formData = {
                'token': action.data.token,
                'user_id': action.data.user_id
            };
            var options = {
                url: getBase() + '/deleteUser',
                method: "POST",
                form: formData
            };

            request(options, function (error, response, body) {
                let requestStatus = "ERROR";
                if (!error && response.statusCode == 200) {
                    var result = JSON.parse(body);
                    if(result.affectedRows === 1) {
                        requestStatus = "SUCCESS";
                    }
                    UserStore.emitChange(EventTypes.DELETE_USER_EVENT, {eventName: "DELETE_USER_EVENT", user_id: action.data.user_id, status: requestStatus});
                }
            })
            break;
        }

        default:
            // no op
    }
});

export default UserStore;
