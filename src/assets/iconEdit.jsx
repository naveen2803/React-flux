/**
 * Created By: Naveen Malhotra
 * Created Date: 19/01/2018(dd/mm/yyyy)
*/

import React from 'react';

class IconEdit extends React.Component{
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render (){
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 28 32">
            <title>pencil</title>
            <path fill="#303a29" d="M22 2l-4 4 6 6 4-4-6-6zM0 24l0.021 6.018 5.979-0.018 16-16-6-6-16 16zM6 28h-4v-4h2v2h2v2z"></path>
            </svg>
        );
    }
}

export default IconEdit;
