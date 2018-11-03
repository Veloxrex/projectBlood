import React, {PureComponent} from 'react';
import VerifyForm from './components/VerifyForm'

export default class Verify extends PureComponent
{
    render() {
        return (
            <div className='account'>
                <div className='account__wrapper'>
                    <div className='account__card'>
                        <div className='account__head'>
                            <h3 className='account__title'>Welcome to <span className='account__logo'>Blood<span
                                className='account__logo-accent'>LAND</span></span></h3>
                            <h4 className='account__subhead subhead'>Start your business easily</h4>
                        </div>
                        <VerifyForm />
                    </div>
                </div>
            </div>
        )
    }
}