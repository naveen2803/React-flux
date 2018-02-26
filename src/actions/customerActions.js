/**
 * Created By: Naveen Malhotra
 * Created Date: 30/01/2018(dd/mm/yyyy)
*/

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

var CustomerActions = {
    getCustomers: function(token) {
        console.log("I am going to fetch customers");
        Dispatcher.dispatch({
            actionType: ActionTypes.GET_CUSTOMERS,
            data: {
                token: token
            }

        });
    },

    addCustomer: function(token, customer) {
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_CUSTOMER,
            data: {
                token: token,
                customer: customer
            }
        });
    },

    deleteCustomer: function(token, c_id) {
        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_CUSTOMER,
            data: {
                token: token,
                c_id: c_id
            }
        });
    },

    updateCustomer: function(token, customer) {
        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_CUSTOMER,
            data: {
                token: token,
                customer: customer
            }
        });
    }
};

export default CustomerActions;
