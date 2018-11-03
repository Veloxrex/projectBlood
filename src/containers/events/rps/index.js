import React, {PureComponent} from 'react';
import RpsItem from './components/RpsItem';
import TimeCounter from '../../../components/TimeCounter';
import connect from "react-redux/es/connect/connect";
import _ from 'lodash';
import { rpsActions } from "../../../redux/actions/rpsActions";
import { DefaultPlayer as Video } from 'react-html5video';

import PropTypes from 'prop-types';
import {Modal} from 'reactstrap';
import {FaHackerrank} from 'react-icons/fa';


import {Notification} from "../../../components/Notification";
import NotificationSystem from "rc-notification";
let notification = null;
NotificationSystem.newInstance({}, (n) => notification = n);


class RpsGame extends PureComponent
{
    static propTypes = {
        title: PropTypes.string,
        color: PropTypes.string,
        colored: PropTypes.bool,
        header: PropTypes.bool,
    };

    constructor(props)
    {
        super(props);
        
        this.state={
            modal: false,
            rpsList:[],
            isPlayed:false,
            isConfirmed:false,
            isSuccess:false,
            isShowResult:false,
            winner:'',
            validate:{
                checkQuantity:false
            }
        };
        this.toggle = this.toggle.bind(this);
    }

    setGameStatus(){
        const { dispatch, user } = this.props;
        // kiem tra user da tham gia chua
        dispatch(rpsActions.findUser({'userName':user.userName}));
        this.setState({
            isShowResult:false,
            isPlayed: this.props.rps.found,
            isConfirmed:this.props.rps.found
        });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    componentWillMount()
    {
        const { dispatch, user } = this.props;
        dispatch(rpsActions.findUser({'userName':user.userName}));
    }
    
    handleToAddList = (slot,selectedRps) =>{
        var rpsList = this.state.rpsList;
        var index = _.findIndex(rpsList,{'slot': slot});
        (index!==-1)?rpsList.splice(index, 1, {'slot': slot, 'selected': selectedRps}):rpsList.push({'slot': slot, 'selected': selectedRps});
        this.setState({rpsList: _.sortBy(rpsList, 'slot')})
    };

    componentWillReceiveProps = (nextProps) => {
        // console.log(this.props);

        // console.log(nextProps);
    }

    playGame = () =>{
        this.setState({
            isPlayed :true
        });
    };



    showResult = () =>{
        this.setState({
            isShowResult:!this.state.isShowResult
        });
    };

    getCurrentTime = (mins,secs) => {
        if(mins < 1 && secs < 2){
            this.setGameStatus();
        }
    };

    getIntroScreen = () =>{
        return(
            <div className="rps-intro">
                <Video autoPlay muted
                        controls={[]}//'PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen'
                        poster={process.env.PUBLIC_URL + '/videos/rps/rps-intro-bg.mp4'}
                        onCanPlayThrough={() => {}}
                        >
                        <source src={process.env.PUBLIC_URL + '/videos/rps/rpsIntro.mp4'}
                        type="video/mp4" />
                </Video>
                <div className="rps-intro-content">
                    <h1>가위 바위 보</h1>
                </div>
                <div className="rps-btn-group">
                    <button className="rps-btn" onClick={this.playGame}>놀다</button>
                    <button className="rps-btn" onClick={this.cancelGame}>출구</button>
                </div>
            </div>
        )
    }

    cancelGame = () => {
        this.setState({
            isPlayed:false,
            isConfirmed:false,
            validate:{
                checkQuantity:false
            },
            rpsList:[]
        });
        this.toggle();
    };

    saveData = () => {
        const { dispatch, user } = this.props;
        const { rpsList } = this.state;

        const selectedRps = rpsList.map(rps => {
            return rps.selected
        });

        if(selectedRps.length < 12){
            this.getNotice('danger','Bạn phải chọn đủ 12 vòng game!');
            this.setState({
                validate:{
                    checkQuantity:true
                }
            });
            return;
        }

        dispatch(rpsActions.create({ 'userName': user.userName, 'selectedRps': selectedRps }));

        this.setState({
            isConfirmed :true
        });
    };

    getGameScreen = () =>{
        let	handleToAddList = this.handleToAddList;
        var items = [];
        const rounds = [0, 1, 2, 3, 4, 5,6,7,8,9,10, 11];
        if(this.state.validate.checkQuantity && this.state.rpsList.length < 12){
            let list = this.state.rpsList;
            for (let i = 0; i < 12; i++) {
                let selectedItem = _.find(list,{'slot': i});
                if(selectedItem)
                    items.push(<RpsItem key={i} slot={i} handleToAddList={handleToAddList.bind(this)} selectedRps={selectedItem.selectedRps} highlightUnselectedRound={-1} />)
                else
                    items.push(<RpsItem key={i} slot={i} handleToAddList={handleToAddList.bind(this)} selectedRps={-1} highlightUnselectedRound={i} />)
            }
        }
        else{
            items = rounds.map((round,i) =>  <RpsItem key={i} slot={round} handleToAddList={handleToAddList.bind(this)} selectedRps={-1}  />);
        }
        return(
            <div className="rps-game">
                {/* <div className="cloud"></div>
                <div className="cloud_2"></div>
                <div className="cloud_3"></div>
                <div className="cloud_4"></div> */}
                <div className="rps-game-content">
                    {items}
                </div>
                <div className="rps-btn-group">
                    <button className="rps-btn" onClick={this.saveData}>
                        완료
                    </button>
                    <button  className="rps-btn" onClick={this.cancelGame}>
                        출구
                    </button>
                </div>
            </div>
        )
    }

    getGameEnding = () =>{
        return (
            <div className="rpg-ending">
                <div className="rpg-ending-content">
                    <h1>참여해 주셔서 감사합니다.</h1>
                    <h2>잠시 기다려주십시오.</h2>
                </div>
                <div className="rps-btn-group">
                    <button  className="rps-btn" onClick={this.toggle}>
                        출구
                    </button>
                </div>
            </div>
        );
    }

    getSuccessInfo = () =>{
        return (
            <div className="rpg-success-info">
                <div className="rpg-success-info-content">
                    
                </div>
                <div className="rps-btn-group">
                    <button  className="rps-btn">
                        결과보기
                    </button>
                    <button  className="rps-btn" onClick={this.toggle}>
                        출구
                    </button>
                </div>
            </div>
        );
    }

    getResultInfo = () =>{
        return (
            <div className="rpg-result-info">
                <div className="rps-result-info-title">
                    결과
                </div>
                <div className="rpg-result-info-content">
                    <span className="cloud-char">
                        <img className="char" src="/img/gamerps/users/user (15).png" />
                        <img className="char" src="/img/gamerps/handPaper.png" />
                    </span>

                    <div className="cloud-char">
                        <img className="char" src="/img/gamerps/users/user (15).png" />
                        <img className="char" src="/img/gamerps/handPaper.png" />
                    </div>
                </div>
                <div className="rps-btn-group">
                    <button  className="rps-btn" onClick={this.showResult}>
                        돌아오다
                    </button>
                </div>
            </div>
        );
    }

    getRpsModalButton = () =>{
        return (
            <a href="#" className="rps-menu-btn" onClick={this.toggle} >
                <img src={`/img/gamerps/logo-sm-${
                    this.props.rps ? 
                    ( 
                        this.props.rps.event ? 
                        (
                            this.props.rps.event.eventJoined ? "confirmed" : "alert"
                        ) :"alert" 
                    ) :"alert"
                }.png`}
                className={ this.props.rps ? 
                            ( 
                                this.props.rps.event ? 
                                (
                                    this.props.rps.event.eventJoined ? "rps-logo" : "rps-logo logo-alert"
                                ) :"rps-logo logo-alert" 
                            ) :"rps-logo logo-alert"
            
            } />
                <span className={`rps-btn-content rps-btn--${
                     this.props.rps ? 
                     ( 
                         this.props.rps.event ? 
                         (
                             this.props.rps.event.eventJoined ? "confirmed" : "alert"
                         ) :"alert" 
                     ) :"alert"
                }`} >
                    <TimeCounter getCurrentTime={this.getCurrentTime} /> <span className="lnr lnr-user"></span> 
                    <span style={{
                        marginLeft: '3px'
                    }}>{ 
                        this.props.rps ? ( this.props.rps.event ? this.props.rps.event.usersCount :'0' ) :'0' }
                    </span>
                </span>
            </a>
        );
    }


    getModalPopup = () =>{
        console.log('gia tri tra ve', this.props);
        return(
            <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop="static"
                   className={`modal-dialog-header--customize`}>
                <a className="btn-rps-result" href="#" onClick={this.showResult}>
                    <FaHackerrank style={{fontSize: '40px', color:'white'}} />
                </a>
                <div className='modal__body'>
                    {
                        this.state.isSuccess ? this.getSuccessInfo() : 
                        (
                            this.state.isShowResult ? this.getResultInfo() :
                                this.props.rps ? 
                                ( this.props.rps.event ? 
                                    (
                                        this.props.rps.event.eventJoined || this.state.isConfirmed ? this.getGameEnding() : 
                                        (
                                            this.state.isPlayed ? this.getGameScreen() : this.getIntroScreen() 
                                        )
                                    ): this.getIntroScreen() 
                                ): this.getIntroScreen()
                        )
                    }
                </div>
            </Modal>
        );
    }

    getNotice(color,message){
        notification.notice({
            content: <Notification color={color} message={message}/>,
            duration: 5,
            closable: true,
            style: {top: 0, left: 'calc(100vw - 100%)'},
            className: 'right-up'
        });
    }

    render() {
        const rpsModalBtn = this.getRpsModalButton();
        const modalPopup = this.getModalPopup();

        return (
            <React.Fragment>
                { rpsModalBtn }
                { modalPopup }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    const { alert, rps, authentication } = state;
    const { user } = authentication;
    return {
        alert,
        rps,
        user
    };
};

const connectedRpsGame = connect(mapStateToProps)(RpsGame);
export default connectedRpsGame;