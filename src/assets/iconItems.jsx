/**
 * Created By: Naveen Malhotra
 * Created Date: 19/01/2018(dd/mm/yyyy)
*/

import React from 'react';

class IconItems extends React.Component{
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render (){
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 32 32">
            <title>t-shirt</title>
            <path fill="#303a29" d="M31.25 6.438l-5-4c-0.355-0.284-0.797-0.438-1.25-0.438h-18c-0.454 0-0.895 0.154-1.25 0.438l-5 4c-0.654 0.524-0.912 1.4-0.647 2.195l2 6c0.197 0.591 0.659 1.057 1.249 1.259 0.21 0.072 0.43 0.108 0.648 0.108 0.348 0 0.693-0.091 1-0.268v12.268c0 1.104 0.896 2 2 2h18c1.104 0 2-0.896 2-2v-12.268c0.307 0.177 0.652 0.268 1 0.268 0.219 0 0.438-0.036 0.648-0.108 0.59-0.202 1.051-0.668 1.248-1.259l2-6c0.266-0.795 0.008-1.671-0.646-2.195zM19.754 4c-0.553 1.161-2.018 2-3.754 2s-3.202-0.839-3.754-2h7.508zM28 14l-3-2v16h-18v-16l-3 2-2-6 5-4h4.177c0.557 1.722 2.496 3 4.823 3s4.266-1.278 4.822-3h4.178l5 4-2 6z"></path>
            </svg>
        );
    }
}

export default IconItems;
