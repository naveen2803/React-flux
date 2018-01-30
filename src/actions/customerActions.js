/**
 * Created By: Naveen Malhotra
 * Created Date: 30/01/2018(dd/mm/yyyy)
*/

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

var CustomerActions = {
    getCustomers: function() {
        console.log("I am going to fetch customers");
        Dispatcher.dispatch({
            actionType: ActionTypes.GET_CUSTOMERS,
            data: ""
        });
    }
};

export default CustomerActions;
