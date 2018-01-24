/**
 * Created By: Naveen Malhotra
 * Created Date: 19/01/2018(dd/mm/yyyy)
*/

import React from 'react';

class IconLogout extends React.Component{
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render (){
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 32 32">
            <title>switch</title>
            <path fill="#303a29" d="M30 16c0 7.732-6.268 14-14 14s-14-6.268-14-14c0-3.408 1.226-6.523 3.25-8.95 0.154-0.284 0.368-0.531 0.635-0.71 0.045-0.047 0.085-0.1 0.131-0.146 0.001 0.023 0.011 0.045 0.013 0.068 0.289-0.162 0.617-0.262 0.971-0.262 1.104 0 2 0.896 2 2 0 0.696-0.355 1.308-0.895 1.666 0.035 0.026 0.060 0.058 0.096 0.084-1.375 1.712-2.201 3.883-2.201 6.25 0 5.523 4.477 10 10 10s10-4.477 10-10c0-2.367-0.826-4.538-2.201-6.25 0.036-0.026 0.062-0.058 0.096-0.084-0.54-0.358-0.895-0.97-0.895-1.666 0-1.104 0.896-2 2-2 0.354 0 0.682 0.1 0.971 0.262 0.002-0.023 0.012-0.045 0.014-0.068 0.045 0.046 0.085 0.099 0.131 0.146 0.267 0.179 0.48 0.426 0.635 0.71 2.022 2.427 3.249 5.542 3.249 8.95zM17 18h-2c-0.553 0-1-0.447-1-1v-14c0-0.552 0.447-1 1-1h2c0.553 0 1 0.448 1 1v14c0 0.553-0.447 1-1 1z"></path>
            </svg>
        );
    }
}

export default IconLogout;
