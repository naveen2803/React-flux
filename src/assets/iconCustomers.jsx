/**
 * Created By: Naveen Malhotra
 * Created Date: 19/01/2018(dd/mm/yyyy)
*/

import React from 'react';

class IconCustomers extends React.Component{
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render (){
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 32 32">
            <title>star</title>
            <path fill="#303a29" d="M22.626 19.941l-0.010-0.006-0.066 0.053 0.094 0.014c0 0 4.052 10.204 3.203 11.683-1.669 1.265-8.842-5.595-9.774-6.501l0.006 0.035c0 0-8.059 8.048-9.925 6.609-1.118-0.812 2.947-12.030 2.947-12.030l0.019-0.003c-1.493-0.853-9.693-6.646-9.087-8.731 0.018-1.255 11.414-1.168 11.777-1.119 0.044-0.255 1.997-9.945 4.191-9.945 2.205 0 4.1 9.918 4.123 10.056h0.006l0.002 0.010 0.025-0.053c0 0 11.793-0.181 11.811 1.051 0.668 2.293-9.342 8.877-9.342 8.877z"></path>
            </svg>
        );
    }
}

export default IconCustomers;
