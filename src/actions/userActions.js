/**
 * Created By: Naveen Malhotra
 * Created Date: 30/01/2018(dd/mm/yyyy)
*/

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

var UserActions = {
    getUsers: function(token) {
        Dispatcher.dispatch({
            actionType: ActionTypes.GET_USERS,
            data: {
                token: token
            }
        });
    },

    addUser: function(token, user) {
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_USER,
            data: {
                token: token,
                user: user
            }
        });
    },

    deleteUser: function(token, user_id) {
        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_USER,
            data: {
                token: token,
                user_id: user_id
            }
        });
    },

    updateUser: function(token, user) {
        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_USER,
            data: {
                token: token,
                user: user
            }
        });
    }
};

export default UserActions;
