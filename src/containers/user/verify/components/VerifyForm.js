import React, { PureComponent } from 'react';
import {history} from './../../../../redux/services/history';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../../../redux/actions/userActions';

class VerifyForm extends PureComponent {
    constructor(props) {
        super(props);
      
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const { socialUser} = this.props;
        if(!socialUser){
           history.push('/login');
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        const { socialUser,dispatch} = this.props;
        dispatch(userActions.socialUserSubmit(socialUser));
    }

    render() {
        const { socialUser ,userImgUrl} = this.props;
        return (
            <form name="form" onSubmit={this.handleSubmit}>
                <h4>Do you want login as </h4>
                <h3>{socialUser ? socialUser.userName : ''} ?</h3>
                <img src={userImgUrl ? userImgUrl : ''} alt={socialUser.userName}/>
                <br/>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/login" className="btn btn-link">Cancel</Link>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        socialUser: state.users.socialUser,
        userImgUr: state.users.userImgUrl
    };
}

export default connect(mapStateToProps, null)(VerifyForm);