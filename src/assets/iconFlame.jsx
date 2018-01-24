/**
 * Created By: Naveen Malhotra
 * Created Date: 19/01/2018(dd/mm/yyyy)
*/

import React from 'react';

class IconFlame extends React.Component{
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render (){
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
            <title>flame</title>
            <path fill="#303a29" d="M33.828 3.516c3.906 10.469 1.875 16.172-2.5 20.703-4.766 5-12.188 8.75-17.422 16.094-6.953 9.766-8.125 31.25 16.953 36.875-10.547-5.547-12.813-21.641-1.406-31.719-2.969 9.766 2.5 16.016 9.297 13.75 6.641-2.266 11.016 2.5 10.859 7.969-0.078 3.75-1.563 6.953-5.391 8.75 16.328-2.891 22.891-16.406 22.891-26.719 0-13.594-12.109-15.469-6.016-26.875-7.266 0.625-9.766 5.391-9.063 13.203 0.469 5.156-4.922 8.672-8.906 6.328-3.203-1.953-3.125-5.703-0.313-8.516 6.016-5.938 8.359-19.609-8.984-29.844z"></path>
            </svg>
        );
    }
}

export default IconFlame;
