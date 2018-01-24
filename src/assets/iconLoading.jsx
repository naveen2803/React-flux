/**
 * Created By: Naveen Malhotra
 * Created Date: 19/01/2018(dd/mm/yyyy)
*/

import React from 'react';

class IconLoading extends React.Component{
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render (){
        return (
              <svg xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 24 30">
                <rect x="0" y="13" width="4" height="5" fill="#5E6B4E">
                  <animate attributeName="height" attributeType="XML"
                    values="5;21;5"
                    begin="0s" dur="0.6s" repeatCount="indefinite" />
                  <animate attributeName="y" attributeType="XML"
                    values="13; 5; 13"
                    begin="0s" dur="0.6s" repeatCount="indefinite" />
                </rect>
                <rect x="10" y="13" width="4" height="5" fill="#5E6B4E">
                  <animate attributeName="height" attributeType="XML"
                    values="5;21;5"
                    begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                  <animate attributeName="y" attributeType="XML"
                    values="13; 5; 13"
                    begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                </rect>
                <rect x="20" y="13" width="4" height="5" fill="#5E6B4E">
                  <animate attributeName="height" attributeType="XML"
                    values="5;21;5"
                    begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                  <animate attributeName="y" attributeType="XML"
                    values="13; 5; 13"
                    begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                </rect>
              </svg>
        );
    }
}

export default IconLoading;
