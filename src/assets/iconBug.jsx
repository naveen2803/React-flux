/**
 * Created By: Naveen Malhotra
 * Created Date: 19/01/2018(dd/mm/yyyy)
*/

import React from 'react';

class IconBug extends React.Component{
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render (){
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 23 32">
            <title>bug</title>
            <path fill="#303a29" d="M7.613 4.892c-1.652 1.774-1.196 4.608-1.196 4.608s1.686 2 5 2c3.313 0 5.001-2 5.001-2s0.449-2.796-1.168-4.572c1.012-0.563 1.607-1.378 1.361-1.932-0.279-0.624-1.512-0.68-2.758-0.124-0.463 0.206-0.857 0.468-1.164 0.746-0.389-0.070-0.801-0.118-1.273-0.118-0.439 0-0.83 0.042-1.198 0.102-0.302-0.273-0.689-0.527-1.142-0.73-1.246-0.554-2.48-0.498-2.758 0.124-0.242 0.542 0.321 1.334 1.294 1.895zM20.148 17.805c-0.258-0.055-0.504-0.086-0.742-0.109 0-0.066 0.012-0.129 0.012-0.197 0-1.050-0.148-2.052-0.389-3.004 0.514 0.044 1.168-0.074 1.83-0.368 1.246-0.556 2.031-1.512 1.754-2.132-0.277-0.624-1.512-0.68-2.758-0.124-0.582 0.26-1.057 0.608-1.375 0.966-0.242-0.57-0.516-1.118-0.838-1.616-0.943 0.786-2.729 1.96-5.221 2.221v10.056c0 0-0.008 1-1.001 1s-1-1-1-1v-10.052c-2.494-0.261-4.28-1.437-5.222-2.221-0.309 0.479-0.574 1-0.811 1.542-0.321-0.332-0.77-0.651-1.312-0.894-1.246-0.554-2.48-0.498-2.758 0.124s0.508 1.576 1.754 2.132c0.62 0.276 1.235 0.4 1.733 0.378-0.239 0.95-0.39 1.948-0.39 2.994 0 0.068 0.012 0.133 0.014 0.203-0.21 0.023-0.428 0.055-0.649 0.102-1.624 0.336-2.868 1.176-2.776 1.869 0.092 0.697 1.484 0.984 3.112 0.646 0.212-0.043 0.42-0.098 0.618-0.158 0.286 1.275 0.744 2.459 1.378 3.478-0.376 0.189-0.767 0.469-1.126 0.832-0.996 0.996-1.4 2.207-0.902 2.705s1.708 0.094 2.704-0.9c0.292-0.293 0.526-0.602 0.708-0.906 1.36 1.332 3.064 2.129 4.924 2.129 1.886 0 3.618-0.82 4.985-2.186 0.184 0.322 0.43 0.65 0.738 0.959 0.994 0.996 2.207 1.4 2.705 0.902s0.094-1.707-0.902-2.703c-0.385-0.387-0.803-0.68-1.201-0.873 0.629-1.016 1.082-2.199 1.365-3.471 0.225 0.070 0.459 0.137 0.705 0.189 1.627 0.338 3.020 0.049 3.113-0.646 0.088-0.691-1.156-1.531-2.781-1.867z"></path>
            </svg>
        );
    }
}

export default IconBug;
