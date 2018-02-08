/**
 * Created By: Naveen Malhotra
 * Created Date: 05/02/2018(dd/mm/yyyy)
*/

import React from 'react';
import './loaderCSS.css';

class Loader extends React.Component{
    constructor(props) {
        super(props);

        this.state = {};
    }

    render (){
        return (
            <div>
                <div className="loader_loader">
                    <svg className="loader_circular" viewBox="25 25 50 50">
                        <circle className="loader_path" cx="50" cy="50" r="20" fill="none" strokeWidth="4" strokeMiterlimit="10"/>
                    </svg>
                </div>
            </div>
        );
    }
}


export default Loader;
