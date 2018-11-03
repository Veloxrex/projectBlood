import React, { PureComponent } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
// import TwitterLogin from 'react-twitter-auth';
// import TwitterIcon from 'mdi-react/TwitterIcon';
import FacebookIcon from 'mdi-react/FacebookIcon';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';

import { socketActions } from '../../../../redux/actions/socketActions';
import { userActions } from '../../../../redux/actions/userActions';

class LogInForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            userName: '',
            password: '',
            submitted: false
        };

        this.showPassword = this.showPassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    //
    componentDidMount() {
        const _user = JSON.parse(localStorage.getItem("user"));
        if(_user){
            this.props.dispatch(socketActions.userDisconnected(_user.userName));
        }
        this.props.dispatch(userActions.logout());
    }
    responseGoogle(res) {
        // no auto login when use GoogleApiLogin
        window.gapi.auth2.getAuthInstance().disconnect();
        const { dispatch } = this.props;
        const type = `google`;
        if (res && res.profileObj) {
            dispatch(userActions.socialLoginRequest(res, type));
        }
    }

    responseFacebook(res)
    {
        // console.log(res);
        // window.FB.logout((data)=>{
        //     console.log(data);
        // });
        // console.log(window);
        // console.log(window.FB);
        // console.log(window.FB.logout);
        const { dispatch } = this.props;
        const type = `facebook`;
        if (res && res.id) {
            dispatch(userActions.socialLoginRequest(res, type));
        }
    }
    showPassword(e) {
        e.preventDefault();
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { userName, password } = this.state;
        const { dispatch } = this.props;
        if (userName && password) {
            dispatch(userActions.login(userName, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { userName, password, submitted } = this.state;
        return (
            <form name="form" onSubmit={this.handleSubmit}>
                <div className={'form-group' + (submitted && !userName ? ' has-error' : '')}>
                    <label htmlFor="userName">Username</label>
                    <input type="text" className="form-control" name="userName" value={userName} onChange={this.handleChange} />
                    {submitted && !userName &&
                    <div className="help-block">Username is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                    {submitted && !password &&
                    <div className="help-block">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Login</button>
                    {loggingIn &&
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt={loggingIn} />
                    }
                    <Link to="/register" className="btn btn-link">Register</Link>
                </div>
                <div className='account__or'>
                    <p>Or Easily Using</p>
                </div>
                <div className='account__social'>
                    <FacebookLogin
                        appId="541625726264092"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                        cssClass='account__social-btn account__social-btn--facebook'
                        textButton={<FacebookIcon />}
                    />&nbsp;
                    <GoogleLogin
                        clientId="1095934133955-m206kbp3d5qbdhprfla93jvosq572p8q.apps.googleusercontent.com"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        disable={true}
                        className='account__social-btn account__social-btn--google'
                        buttonText={<GooglePlusIcon />}
                    />
                    {/* <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
                        // onFailure={this.onFailed} onSuccess={this.onSuccess}
                        className="account__social-btn account__social-btn--facebook"
                        text={<TwitterIcon />}
                        showIcon={false}
                        requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse" /> */}
                    {/* <div className="account__social-btn account__social-btn--naver">
                    <div id="naverIdLogin"></div>
                    </div> */}
                </div>
            </form>
        )
    }
}

/*const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required email'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.password) {
        errors.password = 'Required password'
    }
    return errors
};*/

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn,
    };
}

const connectedLoginPage = connect(mapStateToProps)(LogInForm);

export default reduxForm({
    form: 'log_in_form', // a unique identifier for this form
    //validate,
    connectedLoginPage
})(LogInForm);