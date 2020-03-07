import React, { Component } from 'react';
import {connect} from 'react-redux';
import {FaChevronRight, FaCircleNotch, FaCross,FaRegCircle, FaExclamationCircle} from 'react-icons/fa';
import profilePlaceholder from '../../images/profile-placeholder.png';

import {
    entryLoginFieldInput,
    entryViewChange,
    entryRegisterFieldInput,
    entryRegisterAccount,
    entryLoginAccount,
    entryCheckSession,
    entryErrorSet
} from '../../actions';

import {NormalInput} from '../commonComponents';

const LabelInput = (props) => {
    return (
        <div className="ce_general_input small">
            <div className="label">
                {props.label}
            </div>
            <NormalInput name={props.name} onChange={(e) => props.onChange(e)} 
                disabled={props.disabled}
                value={props.value}
                type={props.type}
                numberOnly={props.numberOnly}
                noNumbers={props.noNumbers}
                />
        </div>
    )
}

const LoginForm = (props) => {
    return props.display === true?
        <div className="login">
            <div className="ce_1rem_distanced_collection padding_1rem">
                <div className="ce_primary_header">
                    Login
                </div>
                <LabelInput value={props.loginData.number} label="Mobile Number"
                            numberOnly
                            disabled={props.loading}
                            onChange={(e)=> {
                            props.entryLoginFieldInput('number',e.target.value)}}/>
                <LabelInput value={props.loginData.password} label="Password"
                            type="password"
                            disabled={props.loading}
                            onChange={(e)=> {
                            props.entryLoginFieldInput('password',e.target.value)}}/>
               
                <div className="ce_rows">
                    <div className="ce_vertical_center">
                        <div className="ce_checkbox_with_label">
                            <input onChange={() => props.entryLoginFieldInput('rememberme',!props.loginData.rememberme)} checked={props.loginData.rememberme} type="checkbox"/>
                            <label>
                                Remember me?
                            </label>
                        </div>
                    </div>
                    <button disabled={props.loading}
                        className={props.loading?'ce_basic_button fluid loading':'ce_basic_button fluid'}
                        onClick={props.loginAccount}>
                        {
                                props.loading?
                                <FaCircleNotch/>
                                :
                                <>
                                    Log In
                                    <FaChevronRight/>
                                </>
                            }
                    </button>
                </div>
                <div className="ce_rows">
                    <div className="ce_small_highlight_font">
                        <button
                            disabled={props.loading}
                            className="ce_invisible_button">
                            Forgot password?
                        </button>
                    </div>
                    <div className="ce_small_highlight_font right_align">
                        <button 
                            disabled={props.loading}
                            onClick={() => props.changeView('register')}
                            className="ce_invisible_button">
                            Register new account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    : null
}

const RegisterForm = (props) => {
    const imageInputRef = React.useRef();
    return props.display === true?
        <form onSubmit={props.registerAccount} enctype="multipart/form-data" method="POST">
            <div className="register padding_1rem">
                <div className="ce_primary_header">
                    Register new account
                </div>
                <div className="holder">
                    <div className="leftSide">
                            <div className="imageHolder">
                                <img src={props.registerData.profilePic === null? profilePlaceholder: props.registerData.profilePic}/>
                            </div>
                            <button  type='button' disabled={props.loading} className="ce_basic_button small" onClick={() => imageInputRef.current.click()}>
                                Upload Profile Pic
                            </button>
                            <span>select a 1 by 1 image</span>
                            <input
                                name="profilePic"
                                accept = "image/*"
                                ref={imageInputRef}
                                type="file"
                                hidden
                                onChange={(e) => {
                                    e.preventDefault();
                                    let reader = new FileReader();
                                    let file = e.target.files[0];
                                    reader.onloadend = () => {
                                        props.entryRegisterFieldInput('profilePic',reader.result);
                                        props.entryRegisterFieldInput('profilePicFile',file);
                                    }
                                    if (file !== undefined){
                                        reader.readAsDataURL(file)
                                    }
                                }}
                            />
                    </div>
                    <div className="rightSide">
                        <div className="ce_1rem_distanced_collection padding_1rem">
                            <LabelInput value={props.registerData.number} label="Mobile Number"
                                numberOnly
                                name="number"
                                disabled={props.loading}
                                onChange={(e)=> {
                                    props.entryRegisterFieldInput('number',Number(e.target.value))}}/>
                            <LabelInput value={props.registerData.fullName} label="Full Name"
                                noNumbers
                                name="fullName"
                                disabled={props.loading}
                                onChange={(e)=> {
                                    props.entryRegisterFieldInput('fullName',e.target.value)}}/>
                            <LabelInput value={props.registerData.email} label="Email Address"
                                disabled={props.loading}      
                                name="email"
                                onChange={(e)=> {
                                    props.entryRegisterFieldInput('email',e.target.value)}}/>
                            <LabelInput value={props.registerData.password} label="Password"
                                name="password"
                                type="password"
                                disabled={props.loading}
                                onChange={(e)=> {
                                    props.entryRegisterFieldInput('password',e.target.value)}}/>
                            <LabelInput value={props.registerData.confirmPassword} label="Confirm Password"
                                type="password"
                                disabled={props.loading}
                                onChange={(e)=> {
                                    props.entryRegisterFieldInput('confirmPassword',e.target.value)}}/>
                        </div>
                    </div>
                </div>
                <div className="ce_rows">
                    <div className="ce_small_highlight_font">
                        <button
                            disabled={props.loading}
                            onClick={() => props.changeView('login')}
                            className="ce_invisible_button"
                            >
                            Login to Existing Account
                        </button>
                    </div>
                    <div>
                        <button type='submit' disabled={props.loading}
                            className={props.loading?'ce_basic_button fluid loading':'ce_basic_button fluid'}>
                            {
                                    props.loading?
                                    <FaCircleNotch/>
                                    :
                                    <>
                                        Register My Account
                                        <FaChevronRight/>
                                    </>
                                }
                        </button>
                    </div>
                </div>
            </div>
        </form>
    :null
}

const HoldingContainer = (props) => {
    return (
        <div className="entry">
            <div className="holder">
                <div className="container">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

const LoadingPage = (props) => {
    return (
        <div className="entry loading">
            <div>Loading</div>
        </div>
    )
}

const ErrorDisplay = (props) => {
    return (
        props.error === null?
            null
            :
            <a onClick={props.onClick} className="errorBox">
                <div className="header">
                    <FaExclamationCircle/> Error
                </div>
                {props.error}
            </a>
    )
}

class EntryPage extends Component {

    componentWillMount = () => {
        this.props.entryCheckSession(this.props.history);
    }

    entryPage = () => {
        return (
            <HoldingContainer>
                <LoginForm
                    loading={this.props.loading}
                    display={this.props.view === 'login'}
                    loginData={this.props.loginData}
                    entryLoginFieldInput={this.props.entryLoginFieldInput}
                    loginAccount={()=>this.props.entryLoginAccount(this.props.loginData, this.props.history)}
                    changeView={(x) => this.props.entryViewChange(x)}    
                />
                <RegisterForm
                    loading={this.props.loading}
                    display={this.props.view === 'register'}
                    registerData={this.props.registerData}
                    entryRegisterFieldInput={this.props.entryRegisterFieldInput}
                    entrySelectProfilePic={this.props.entrySelectProfilePic}
                    changeView={(x) => this.props.entryViewChange(x)}   
                    registerAccount={(event) => this.props.entryRegisterAccount(event, this.props.registerData)} 
                />
                <ErrorDisplay
                    onClick={() => this.props.entryErrorSet(null)}
                    error={this.props.error}
                />
            </HoldingContainer>
        )
    }

    render() {
        return (
            this.props.session != null?
                this.entryPage()
                :
                <LoadingPage/>                 
        );
    }
}

const mstp = (state) => {
    return {
        error: state.entry.error,
        loading: state.entry.loading,
        // loading: true,
        view: state.entry.view,
        // view: 'register',
        loginData: state.entry.loginData,
        registerData: state.entry.registerData,
        session: state.entry.session
    }
}

export default connect(mstp,{
    entryLoginFieldInput,
    entryViewChange,
    entryRegisterFieldInput,
    entryRegisterAccount,
    entryLoginAccount,
    entryCheckSession,
    entryErrorSet
})(EntryPage);