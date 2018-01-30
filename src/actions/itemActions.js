/**
 * Created By: Naveen Malhotra
 * Created Date: 30/01/2018(dd/mm/yyyy)
*/

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

var ItemActions = {
    getItems: function() {
        console.log("I am going to fetch items");
        Dispatcher.dispatch({
            actionType: ActionTypes.GET_ITEMS,
            data: ""
        });
    }
};

export default ItemActions;
