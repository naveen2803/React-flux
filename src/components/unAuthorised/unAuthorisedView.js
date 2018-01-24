/**
 * Created By: Naveen Malhotra
 * Created Date: 19/01/2018(dd/mm/yyyy)
*/

import React from 'react';
import './unAuthorisedViewCSS.css';
import IconBug from '../../assets/iconBug';

class UnAuthorised extends React.Component{

    componentWillMount() {
        var element = document.getElementById("wrapper");
        element.classList.remove("wrapperPatternStyle");
        element.classList.add("wrapperSolidStyle");
    }

    render (){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="unAuthorisedView_centerStyle col-12">
                            <IconBug width="300" height="300"/>
                        </div>
                        <div className=" unAuthorisedView_centerStyle col-12">
                            <p className="unAuthorisedView_headerStyle col-12">Access denied</p>
                            <p className="unAuthorisedView_subHeadStyle2 col-12">You are not authorized to access this page.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UnAuthorised;
