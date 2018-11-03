import React, {PureComponent} from 'react';
import {Collapse} from 'reactstrap';
import Dice6Icon from 'mdi-react/Dice6Icon';
import GameModal from '../../../components/GameModal';
import TimeCounter from '../../../components/TimeCounter';
import RpsGame from '../../events/rps';
import connect from "react-redux/es/connect/connect";

class TopbarEvent extends PureComponent
{
    constructor(props) {
        super(props);
        this.state = {
            collapse: false
        };
    }
    toggle = () => {
        this.setState({collapse: !this.state.collapse});
    };
    render() {
        return (
            <div className='topbar__collapse'>
                <button className='topbar__btn topbar__btn--new' onClick={this.toggle}>
                    <Dice6Icon className="test"/> <TimeCounter />
                    <div className='topbar__btn-new-label'>
                        <div/>
                    </div>
                </button>
                {this.state.collapse && <div className='topbar__back' onClick={this.toggle}/>}
                <Collapse
                    isOpen={this.state.collapse}
                    className='topbar__collapse-content'
                >
                    <div className='topbar__collapse-title-wrap'>
                        <p className='topbar__collapse-title'>Event</p>
                        <button className='topbar__collapse-button'>Help ?</button>
                    </div>
                    <div className='topbar__collapse-event-item'>
                        <GameModal color='primary' title='Game Oẳn tù tì' header
                        linkClass="topbar__collapse-link"
                        linkBody={
                            <img src={process.env.PUBLIC_URL + '/img/game_event/kbb-event.png'} />
                        }
                        body={
                            <RpsGame></RpsGame>
                        } />
                    </div>
                </Collapse>
            </div>
        )
    }
}


const mapStateToProps = state => {
    const { alert } = state;
    return {
        alert
    };
};

const connectedRpsGame = connect(mapStateToProps)(TopbarEvent);
export default connectedRpsGame;