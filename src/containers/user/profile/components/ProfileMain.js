import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Button , ButtonToolbar } from 'reactstrap';
import MessageTextOutlineIcon from 'mdi-react/MessageTextOutlineIcon';
import { connect } from 'react-redux';
import {updateImageUser} from "../../../../redux/actions/userActions";
const Ava = process.env.PUBLIC_URL + '/img/12.png';

const mapDispatchToProps = (dispatch) => ({
   uploadImageUser: (imageData) => {
       dispatch(updateImageUser(imageData))
   }
});

const mapStateToProps = (state) => ({
    imageData: state.users.imageUser
});

class ProfileMain extends PureComponent {
   
    constructor(props){
        super(props);
        this.state = ({
            userName: this.props.user.userName,
            lastName: this.props.user.lastName,
            firstName: this.props.user.firstName,
            email: this.props.user.email,
            file: '',
            imagePreviewUrl: '',
            imageSizeVal: true
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            userName: nextProps.user.userName,
            lastName: nextProps.user.lastName,
            firstName: nextProps.user.firstName,
            email: nextProps.user.email
        })
    }

    onImageUpload = (e) => {
        let reader = new FileReader();
        let image = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: image,
                imagePreviewUrl: reader.result,
                imageSizeVal: image.size / (1024 * 1024) < 1    
            });
            this.props.uploadImageUser(image)

        };
        reader.readAsDataURL(image)
    };
    render() {
        const {imagePreviewUrl,imageSizeVal} = this.state;
        return (
            <Col md={12} lg={12} xl={12}>
                <Card>
                    <CardBody className='profile__card'>
                        <div className='profile__information'>
                            <div className='profile__avatar'>
                                {/*<img src={Ava} alt='avatar' />*/}
                                <img src={imagePreviewUrl ? imagePreviewUrl : Ava} alt='avatar' />
                            </div>
                            <div className='profile__data'>
                                <p className='profile__name'>{this.state.userName}</p>
                                <p className='profile__work'>{`${this.state.firstName}  ${this.state.lastName}`} </p>
                                <p className='profile__contact'>{this.state.email}</p>
                                <ButtonToolbar className='form__button-toolbar'>
                                    <Button color='primary' type='submit'>
                                        Update avatar
                                        <input type='file' name='photo' id="upload-photo" onChange={(e) => this.onImageUpload(e)}/>
                                    </Button>
                                </ButtonToolbar>
                                <p className='profile__image__val'>{imageSizeVal ? '' : 'Image size must smaller 1MB'}</p>
                                {/* <p className='profile__contact'>+23-123-743-23-21</p> */}
                                {/* <Button color='primary' className='icon profile__btn'><p><MessageTextOutlineIcon/> Message</p></Button> */}
                            </div>
                        </div>
                        <div className='profile__stats'>
                            <div className='profile__stat'>
                                <p className='profile__stat-number'>05</p>
                                <p className='profile__stat-title'>Projects</p>
                            </div>
                            <div className='profile__stat'>
                                <p className='profile__stat-number'>24</p>
                                <p className='profile__stat-title'>Tasks</p>
                            </div>
                            <div className='profile__stat'>
                                <p className='profile__stat-number'>12</p>
                                <p className='profile__stat-title'>Reports</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        )
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(ProfileMain)
