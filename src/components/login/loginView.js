/**
 * Created By: Naveen Malhotra
 * Created Date: 16/01/2018 (dd/mm/yyyy)
*/

import React from 'react';
import './loginViewCSS.css';
import EventTypes from '../../constants/eventTypes';
import LoginStore from '../../stores/loginStore';
import LoginActions from '../../actions/loginActions';
import IconFlame from '../../assets/iconFlame';
import { generateToken } from '../../utils/secret';
import Loader from '../loader/loader';

import { Button, Label, Input, FormGroup, Form } from 'reactstrap';

import toastr from 'toastr';
import 'toastr/build/toastr.css'

class LoginView extends React.Component{
    constructor(props) {
        super(props);
        let flameLogoSize = 80;
        if(window.innerWidth < 500) {
            flameLogoSize = 55;
        }
        this.state = {
            flameLogoSise: flameLogoSize,
            btnDisable: false,
            loaderDisplayClassName: "loginView_loaderHide"
        };

        this.loginClick = this.loginClick.bind(this);
        this.checkEnterPress = this.checkEnterPress.bind(this);
        this.cb_onLoginResult = this.cb_onLoginResult.bind(this);
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

    componentDidMount() {
        this.props.resetValues();
    }

    loginClick() {
        if(this.props.username.trim() === "" || this.props.password.trim() === "") {
            toastr.error("Wrong username or password!", "Error");
        }
        else {
            LoginActions.login({
                username: this.props.username,
                password: this.props.password
            });

            this.setState({
                btnDisable: true,
                loaderDisplayClassName: "loginView_loaderShow"
            });
        }
    }

    cb_onLoginResult(event) {
        this.setState({
            btnDisable: false,
            loaderDisplayClassName: "loginView_loaderHide"
        });

        if(event.status === "SUCCESS") {
            var token = generateToken(event.user[0].username, event.user[0].role);
            sessionStorage.setItem("token", token);
            this.props.history.push("/items");
        }
        else {
            toastr.error("Wrong username or password!", "Error");
        }
    }

    checkEnterPress(event) {
        if(event.currentTarget.name === "password") {
            if(event.key === "Enter") {
                this.loginClick();
            }
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
                                <IconFlame id="flame" width={this.state.flameLogoSise} height={this.state.flameLogoSise}/>
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
                                    <Input type="email" name="username" id="username" value={this.props.username} onChange={this.props.onChange} onKeyPress={this.checkEnterPress} placeholder="Username" className="formItemVerticalStyle"/>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="password" ref={(input) => { this.passwordInput = input; }}  name="password" id="password" value={this.props.password} onChange={this.props.onChange} onKeyPress={this.checkEnterPress} placeholder="Password" className="formItemVerticalStyle"/>
                                </FormGroup>
                                <FormGroup>
                                    <Button color="success" className="col-12 formItemHorizontalStyle" onClick={this.loginClick} disabled={this.state.btnDisable}>
                                        Login
                                        <div className={this.state.loaderDisplayClassName}><Loader /></div>
                                    </Button>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginView;
