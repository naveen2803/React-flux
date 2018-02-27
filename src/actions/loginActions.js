/**
 * Created By: Naveen Malhotra
 * Created Date: (dd/mm/yyyy)
*/

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

var LoginActions = {
    changePassword: function(token, oldPassword, newPassword) {
        Dispatcher.dispatch({
            actionType: ActionTypes.CHANGE_PASSWORD,
            data: {
                'token': token,
                'oldPassword': oldPassword,
                'newPassword': newPassword
            }
        });
    },

    login: function(params) {
        Dispatcher.dispatch({
            actionType: ActionTypes.LOGIN,
            data: params
        });
    },

    logout: function() {
        console.log("I am going to logout");
        Dispatcher.dispatch({
            actionType: ActionTypes.LOGOUT,
            data: ""
        });
    },

    getOrders: function(token) {
        console.log("I am going to fetch suppliers");
        Dispatcher.dispatch({
            actionType: ActionTypes.GET_ORDERS,
            data: {
                token: token
            }
        });
    }
};

export default LoginActions;
