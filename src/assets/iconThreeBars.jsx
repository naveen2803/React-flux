/**
 * Created By: Naveen Malhotra
 * Created Date: 19/01/2018(dd/mm/yyyy)
*/

import React from 'react';

class IconThreeBars extends React.Component{
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render (){
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32">
            <title>three-bars</title>
            <path fill="#FEFEFE" d="M0 6v4h24v-4h-24zM0 18h24v-4h-24v4zM0 26h24v-4h-24v4z"></path>
            </svg>
        );
    }
}

export default IconThreeBars;
