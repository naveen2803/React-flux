/**
 * Created By: Naveen Malhotra
 * Created Date: 28/02/2018(dd/mm/yyyy)
*/

import React from 'react';

class ItemSuppliers extends React.Component{
    constructor(props) {
        super(props);
        console.log(props.item[0].item_code);
        this.state = {};
    }

    render (){
        return (
            <div>
                hello
            </div>
        );
    }
}

export default ItemSuppliers;
