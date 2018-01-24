/**
 * Created By: Naveen Malhotra
 * Created Date: 16/01/2018 (dd/mm/yyyy)
*/

import React from 'react';
import jwt from 'jsonwebtoken';
import './loginViewCSS.css';
import EventTypes from '../../constants/eventTypes';
import LoginStore from '../../stores/loginStore';
import LoginActions from '../../actions/loginActions';
import IconFlame from '../../assets/iconFlame';
import KeyGen from '../../utils/secret';

import { Button, Label, Input, FormGroup, Form } from 'reactstrap';

let self;
class LoginView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};

        this.loginClick = this.loginClick.bind(this);
        self = this;
        console.log("keygen ", KeyGen.generate());
    }

    /**
     * WHEN: Before initial render, both client and server
     * WHY: Good spot to set initial state
    */
    componentWillMount() {
        LoginStore.addChangeListener(EventTypes.LOGIN_EVENT, this.cb_onLoginResult);

        var element = document.getElementById("wrapper");
        element.classList.remove("wrapperPatternStyle");
        element.classList.add("wrapperSolidStyle");
    }

    componentWillUnmount() {
        LoginStore.removeChangeListener(EventTypes.LOGIN_EVENT, this.cb_onLoginResult);
    }

    loginClick() {
        LoginActions.login({
            username: this.props.username,
            password: this.props.password
        });
    }

    cb_onLoginResult(event) {
        if(event.status === "SUCCESS") {
            var token = jwt.sign({ username: event.username, role:'admin' }, event.secret);
            sessionStorage.setItem("token", token);
            self.props.history.push("/main");
        }
        else {
            alert("Wrong username or password!");
        }
    }

    render (){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-3 col-md-5"></div>
                        <div className="loginView_shadow">
                        	<div className="loginView_flameContent">
                                <IconFlame />
                        	</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 col-md-5"></div>
                        <div className="loginView_line"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-12"></div>
                        <div id="loginSection" className="loginView_loginSectionStyle col-md-4 col-sm-12">
                            <Form>
                                <FormGroup>
                                    <Label for="username" className="sectionHeadingStyle">Login</Label>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="email" name="username" id="username" value={this.props.username} onChange={this.props.onChange} placeholder="Username" className="formItemVerticalStyle"/>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="password" name="password" id="password" value={this.props.password} onChange={this.props.onChange} placeholder="Password" className="formItemVerticalStyle"/>
                                </FormGroup>
                                <FormGroup>
                                    <Button color="success" className="col-12 formItemHorizontalStyle" onClick={this.loginClick}>Login</Button>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LoginView.propTypes = {

}

LoginView.defaultProps = {

}

export default LoginView;
