/**
 * Created By: Naveen Malhotra
 * Created Date: 23/01/2018(dd/mm/yyyy)
*/

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

var SupplierActions = {
    getSuppliers: function(token) {
        console.log("I am going to fetch suppliers");
        Dispatcher.dispatch({
            actionType: ActionTypes.GET_SUPPLIERS,
            data: {
                token: token
            }
        });
    }
};

export default SupplierActions;
