import React, { PureComponent } from 'react';
import Scrollbar from 'react-smooth-scrollbar';
//import ChatRoom from './ChatRoom';
import { connect } from 'react-redux';
import { userActions } from './../../../redux/actions/userActions'
class ChatContactList extends PureComponent {
    componentDidMount = () => {
        this.props.onGetAllUsers();
    };
    onOpenContacts = () => {
        this.props.onOpenContacts();
    };
    // onRenderChatRooms = () => {
    //     const { chatRooms,currentRoom } = this.props.chatRooms;
    //     const { onJoinRoom, onLeaveRoom } = this.props;
    //     let result = null;
    //     if (chatRooms) {
    //         result = chatRooms.map((roomContact, index) => {
    //             return <a key={index}>
    //                 <ChatRoom
    //                     contact={roomContact}
    //                     onJoinRoom={onJoinRoom}
    //                     onLeaveRoom={onLeaveRoom}
    //                     currentRoom={currentRoom}
    //                     onOpenContacts={this.onOpenContacts}
    //                 />
    //             </a>
    //         });
    //     }
    //     return result;
    // }

    // onRenderUsers = () => {
    //     const {users} = this.props;
    //     const {currentRoom } = this.props.chatRooms;
    //     const { onJoinRoom, onLeaveRoom } = this.props;
    //     let result = null;
    //     if (users) {
    //         result = users.map((user, index) => {

    //             return <a key={index}>
    //                 <ChatRoom
    //                     name={user.userName}
    //                     onJoinRoom={onJoinRoom}
    //                     onLeaveRoom={onLeaveRoom}
    //                     currentRoom={currentRoom}
    //                     onOpenContacts={this.onOpenContacts}
    //                 />
    //             </a>
    //         });
    //     }
    //     return result;
    // }

    render() {
        return (
            <div className='chat__contacts'>
                <Scrollbar className='scroll chat__contacts-scroll' alwaysShowTracks>
                <h1>test</h1>
                </Scrollbar>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetAllUsers : () => {
            dispatch(userActions.getAll());
        }
    }
};

const mapStateToProps = (state) => {
    return {
        users:state.users.user
    }
}

const connectedChatContactList = connect(mapStateToProps, mapDispatchToProps)(ChatContactList);
export default connectedChatContactList;
