/**
 * Created By: Naveen Malhotra
 * Created Date: 19/01/2018(dd/mm/yyyy)
*/

import React from 'react';

class IconKey extends React.Component{
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render (){
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 28 32">
            <title>key</title>
            <path fill="#303a29" d="M20.028 1.997c-4.419 0-8 3.581-8 8 0 0.613 0.069 1.206 0.2 1.778l-12.228 12.225v2l2 2h4l2-2v-2h2v-2h2v-2h4l2.213-2.212c0.584 0.134 1.191 0.206 1.816 0.206 4.419 0 8-3.581 8-8s-3.584-7.997-8-7.997zM12 16l-10 10v-2l10-10v2zM22 10c-1.103 0-2-0.897-2-2s0.897-2 2-2 2 0.897 2 2c0 1.103-0.897 2-2 2z"></path>
            </svg>
        );
    }
}

export default IconKey;
