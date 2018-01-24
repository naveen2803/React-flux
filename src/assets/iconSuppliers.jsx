/**
 * Created By: Naveen Malhotra
 * Created Date: 19/01/2018(dd/mm/yyyy)
*/

import React from 'react';

class IconSuppliers extends React.Component{
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render (){
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 32 32">
            <title>cog</title>
            <path fill="#303a29" d="M26.99 18.615c2.156 1.607 4.004 3.078 4.004 3.078l-2.631 4.614-4.755-2.099-4.406 2.577c-0.298 2.717-0.571 5.215-0.571 5.215h-5.262l-0.584-5.231-4.342-2.583-4.807 2.122-2.63-4.614c0 0 1.817-1.464 3.968-3.066v-5.259l-3.968-3.060 2.63-4.615 4.692 2.088 4.658-2.527 0.383-5.255h5.262l0.381 5.233 4.594 2.578 4.758-2.118 2.631 4.615-4.004 3.071v5.236zM16 12c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z"></path>
            </svg>
        );
    }
}

export default IconSuppliers;
