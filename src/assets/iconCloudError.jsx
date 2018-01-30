/**
 * Created By: Naveen Malhotra
 * Created Date: 19/01/2018(dd/mm/yyyy)
*/

import React from 'react';

class IconCloudError extends React.Component{
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render (){
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 32 32">
            <title>cloud-error</title>
            <path fill="#303a29" d="M16.5 22v0c0.268 0 0.5-0.224 0.5-0.5 0-0.268-0.224-0.5-0.5-0.5-0.268 0-0.5 0.224-0.5 0.5 0 0.268 0.224 0.5 0.5 0.5zM26.999 15.415c1.768 0.771 3.001 2.534 3.001 4.585 0 2.756-2.238 5-4.999 5h-17.001c-2.767 0-4.999-2.239-4.999-5 0-2.051 1.24-3.818 3.012-4.588v0c-0.008-0.136-0.012-0.273-0.012-0.412 0-3.866 3.134-7 7-7 2.298 0 4.337 1.107 5.614 2.817 0.839-0.518 1.828-0.817 2.886-0.817 3.009 0 5.454 2.416 5.499 5.415v0 0zM16.5 14c-0.276 0-0.5 0.228-0.5 0.491v5.018c0 0.271 0.232 0.491 0.5 0.491 0.276 0 0.5-0.228 0.5-0.491v-5.018c0-0.271-0.232-0.491-0.5-0.491v0z"></path>
            </svg>
        );
    }
}

export default IconCloudError;
