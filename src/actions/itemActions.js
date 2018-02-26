/**
 * Created By: Naveen Malhotra
 * Created Date: 30/01/2018(dd/mm/yyyy)
*/

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

var ItemActions = {
    getItems: function(token) {
        Dispatcher.dispatch({
            actionType: ActionTypes.GET_ITEMS,
            data: {
                token: token
            }
        });
    },

    addItem: function(token, item) {
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_ITEM,
            data: {
                token: token,
                item: item
            }
        });
    },

    deleteItem: function(token, item_id) {
        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_ITEM,
            data: {
                token: token,
                item_id: item_id
            }
        });
    },

    updateItem: function(token, item) {
        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_ITEM,
            data: {
                token: token,
                item: item
            }
        });
    }
};

export default ItemActions;
