/**
 * Created By: Naveen Malhotra
 * Created Date: 23/01/2018(dd/mm/yyyy)
*/

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

var SupplierActions = {
    getSuppliers: function(token) {
        Dispatcher.dispatch({
            actionType: ActionTypes.GET_SUPPLIERS,
            data: {
                token: token
            }
        });
    },

    addSupplier: function(token, supplier) {
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_SUPPLIER,
            data: {
                token: token,
                supplier: supplier
            }
        });
    },

    deleteSupplier: function(token, s_id) {
        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_SUPPLIER,
            data: {
                token: token,
                s_id: s_id
            }
        });
    }
};

export default SupplierActions;
