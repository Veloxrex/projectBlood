import React, { PureComponent } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { userActions } from './../../../../redux/actions/userActions';
import Alert from './../../../../components/Alert';
class ProfileSettings extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email,
            password: ''
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    clearInfo = () => {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        })
    }

  componentWillReceiveProps(nextProps){
      this.setState({
          firstName: nextProps.user.firstName,
          lastName : nextProps.user.lastName,
          email: nextProps.user.email
      });
  }

    updateInfo = (e) => {
        e.preventDefault();
        let formData = new FormData();

        console.log('props', this.props)
        let user = {
            id: this.props.user._id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            imageUser: formData
        }
        // console.log(user)
        // if (user.password.length < 1 || user.firstName.length < 1 || user.lastName.length < 1 || user.firstName.length < 1) {
        //     alert("Error");
        // }
        // else {
        //     this.props.dispatch(userActions.update(user));
        //     this.clearInfo();
        // }

    }

    render() {
        const {firstName , lastName , email , password} = this.state;
        const {imageData} = this.props;

        return (
            <form className='material-form'>
                {this.props.alert.message &&
                    <Alert color={`${this.props.alert.type}`}>
                        <p>{this.props.alert.message}</p>
                    </Alert>
                }
                <TextField
                    className='material-form__field'
                    label={`First name`}
                    value={firstName ? firstName : ''}
                    onChange={this.handleChange('firstName')}
                />
                <TextField
                    className='material-form__field'
                    label={`Last name`}
                    value={lastName ? lastName : ''}
                    onChange={this.handleChange('lastName')}
                />

                <TextField
                    className='material-form__field'
                    label={`Email`}
                    value={email ? email : ''}
                    onChange={this.handleChange('email')}
                />

                <TextField
                    className='material-form__field'
                    label={`Password`}
                    type='password'
                    value={password ? password : ''}
                    onChange={this.handleChange('password')}
                />

                <ButtonToolbar className='form__button-toolbar'>
                    <Button disabled={this.state.password !== '' && imageData ? imageData.size / (1024 * 1024) > 1 : true } color='primary' type='submit' onClick={this.updateInfo}>Update profile</Button>
                    <Button type='button' onClick={this.clearInfo}>
                        Cancel
                    </Button>
                </ButtonToolbar>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user,
        alert: state.alert,
        imageData: state.users.imageUser
    }
}

const connectedProfileSettings = connect(mapStateToProps)(ProfileSettings);
export default reduxForm({
    form: 'profile_settings_form', // a unique identifier for this form
})(connectedProfileSettings);

