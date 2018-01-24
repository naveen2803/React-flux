/**
 * Created By: Naveen Malhotra
 * Created Date: 19/01/2018(dd/mm/yyyy)
*/

import React from 'react';

class IconOrders extends React.Component{
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render (){
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 24 32">
            <title>list-ordered</title>
            <path fill="#303a29" d="M10 18h14v-4h-14v4zM10 26h14v-4h-14v4zM10 6v4h14v-4h-14zM2.469 14h2.438v-8h-1.125l-2.656 0.719v1.563l1.344-0.063v5.781zM5.906 20.438c0-1.125-0.375-2.438-3-2.438-1.031 0-2 0.188-2.594 0.5l0.031 2.063c0.656-0.313 1.313-0.469 2.094-0.469s1 0.344 1 0.875c0 0.813-0.938 1.813-3.438 3.5v1.563h6v-2.094l-2.844 0.063c1.531-0.938 2.719-2.063 2.719-3.531l0.031-0.031z"></path>
            </svg>
        );
    }
}

export default IconOrders;
