/**
 * Created By: Naveen Malhotra
 * Created Date: 30/01/2018(dd/mm/yyyy)
*/

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

var UserActions = {
    getUsers: function() {
        console.log("I am going to fetch users");
        Dispatcher.dispatch({
            actionType: ActionTypes.GET_USERS,
            data: ""
        });
    }
};

export default UserActions;
