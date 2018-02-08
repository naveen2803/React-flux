/**
 * Created By: Naveen Malhotra
 * Created Date: 30/01/2018(dd/mm/yyyy)
*/

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

var UserActions = {
    getUsers: function(token) {
        console.log("I am going to fetch users");
        Dispatcher.dispatch({
            actionType: ActionTypes.GET_USERS,
            data: {
                token: token
            }
        });
    },

    addUsers: function(token, user) {
        console.log("I am going to add a users");
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_USER,
            data: {
                token: token,
                user: user
            }
        });
    }
};

export default UserActions;
