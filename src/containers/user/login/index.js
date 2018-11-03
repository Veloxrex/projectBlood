import React, {PureComponent} from 'react';
import LogInForm from './components/LogInForm';
import Alert from "../../../components/Alert";
import connect from "react-redux/es/connect/connect";
import {translate} from "react-i18next";

class LogIn extends PureComponent
{
    render() {
        const { alert } = this.props;
        return (
            <div className='account'>
                <div className='account__wrapper'>
                    <div className='account__card'>
                        <div className='account__head'>
                            <h3 className='account__title'>Welcome to <span className='account__logo'>Blood<span
                                className='account__logo-accent'>LAND</span></span></h3>
                            <h4 className='account__subhead subhead'>Start your business easily</h4>
                        </div>
                        {alert.message &&
                        <Alert color={`${alert.type}`}>
                            <p>{alert.message}</p>
                        </Alert>
                        }
                        <LogInForm onSubmit/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state)
{
    const { alert } = state;
    return {
        alert,
    };
}

const connectedGoogleMap = connect(mapStateToProps)(translate('common')(LogIn));
export default connectedGoogleMap;