/**
 * Created By: Naveen Malhotra
 * Created Date: 23/01/2018(dd/mm/yyyy)
*/

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

var OrderActions = {
    getOrders: function(token) {
        console.log("I am going to fetch orders");
        Dispatcher.dispatch({
            actionType: ActionTypes.GET_ORDERS,
            data: {
                token: token
            }
        });
    }
};

export default OrderActions;
