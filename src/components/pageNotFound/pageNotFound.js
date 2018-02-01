/**
 * Created By: Naveen Malhotra
 * Created Date: 01/02/2018(dd/mm/yyyy)
*/

import React from 'react';

class PageNotFound extends React.Component{
    constructor(props) {
        super(props);

        this.state = {};
    }

    render (){
        return (
            <div>
                <p>Page not found!</p>
                <span>The requested page was not found</span>
            </div>
        );
    }
}

export default PageNotFound;
