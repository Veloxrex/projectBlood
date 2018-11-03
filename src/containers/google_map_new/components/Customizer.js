import React from 'react';
import classNames from 'classnames';
import CloseIcon from 'mdi-react/CloseIcon';
import {Button} from 'reactstrap';
import $ from 'jquery';
import GoogleTileMap from "./GoogleTileMap";

import {landActions} from "../../../redux/actions/landActions";
import connect from "react-redux/es/connect/connect";
import iconMultiple from "../images/icon-multiple.png";
import iconMultipleBox from "../images/icon-multiple-box.png";
import TileSystem from "./TileSystem";
//const PlusIcon = process.env.PUBLIC_URL + '/img/plus.svg';

class Customizer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            open: false,
            purchase: false,
            buttonSelectOne: 'button mode-selector',
            buttonSelectMulti: 'button mode-selector',
            landCount: 0,
            landsUser: {
                lands: 0,
                tiles: 0,
                totalPay: 0,
                userName: '',
                quadKeys: {}
            }
        };
    }

    handleOpen = () => {
        $('.btnEven').hide();
        $('.status').hide();
        $('.listQuadKey').hide();
        GoogleTileMap.setSelectMode(window.mainMap, 0);
        this.setState({open: !this.state.open});
    };

    handleBuyOpen = () => {
        $('.btnEven').show();
    };

    handleOk = (userName) => {
        var tileSelects = parseFloat($('.tiles-selected').html().substr(0, $('.tiles-selected').html().indexOf(" ")));
        var landSelects = parseFloat($('.lands-selected').html().substr(0, $('.lands-selected').html().indexOf(" ")));
        var totalPay = landSelects * 10000;

        var quadKeys = [];
        $.each($('.listQuadKey>div>p'),function(index, node){
            quadKeys.push({'dataLat': node.getAttribute('data-lat'),'dataLng': node.getAttribute('data-lng'),'quadKey': node.getAttribute('data-quadKey')});
        });
        this.setState({
            purchase: !this.state.purchase,
            purchased: '',
            landsUser: {
                lands: landSelects,
                tiles: tileSelects,
                userName: userName,
                totalPay: totalPay,
                quadKeys: quadKeys
            }
        });
    };

    handleCancel = () => {
        $('.btnEven').hide();
        $('.mode-selector').removeClass('selected');
        GoogleTileMap.setSelectMode(window.mainMap, 0);
    };

    handlePurchase = () => {
        var totalPay = this.state.landsUser.lands*10000;
        const { dispatch } = this.props;
        const { landsUser } = this.state;
        if(totalPay>0) {
            dispatch(landActions.purchase(landsUser));
        }
        this.handleBack();
        this.handleCancel();
        this.setState({open: !this.state.open});
    };

    handleBack = () => {
        this.setState({purchase: !this.state.purchase});
    };

    onSelected = (mode) =>
    {
        this.setState({
            buttonSelectOne: (mode===1)?'button mode-selector selected':'button mode-selector',
            buttonSelectMulti: (mode===2)?'button mode-selector selected':'button mode-selector'
        });

        GoogleTileMap.setSelectMode(window.mainMap, mode);

        GoogleTileMap.setOnTileSelectCallback(window.mainMap, function (map, tile, evt)
        {
            var landCount = (map.selectedCount * Math.pow(4, 24 - map.level));
            if(landCount>0) $('.status').show();
            $('.tiles-selected').html(map.selectedCount + ((map.selectedCount === 1) ? ' Tile' : ' Tiles'));
            $('.lands-selected').html(landCount + ((landCount === 1) ? ' Land' : ' Lands'));
            var quadKeyText = '';
            for (var i in map.quadKeySelectedList) {
                quadKeyText = quadKeyText + '<div><p className="quadKeyPoint" style="cursor: pointer" onClick="mainMap.setCenter(new google.maps.LatLng(' + TileSystem.QuadKeyToLatLong(map.quadKeySelectedList[i]).lat + ',' + TileSystem.QuadKeyToLatLong(map.quadKeySelectedList[i]).lng + '))" data-lat="'+ TileSystem.QuadKeyToLatLong(map.quadKeySelectedList[i]).lat +'" data-lng="'+ TileSystem.QuadKeyToLatLong(map.quadKeySelectedList[i]).lng +'" data-quadKey="'+ map.quadKeySelectedList[i] +'">' + map.quadKeySelectedList[i] + '</p></div>';
            }
            if(quadKeyText!=='')
            {
                $('.listQuadKey').show();
                $('.listQuadKey').html(quadKeyText);
            }
        });
    };

    render()
    {
        const { user } = this.props;
        let customizerButtonGroupClass = classNames({
            'customizer__button__group': true,
            'customizer__button__group--open': this.state.open
        });
        let customizerClass = classNames({
            'customizer__wrap': true,
            'customizer__wrap--open': this.state.open
        });

        let purchaseClass = classNames({
            'purchase__wrap': true,
            'purchase__wrap--open': this.state.purchase
        });

        return (
            <div className='customizer'>
                <div className={customizerButtonGroupClass}>
                    <button className='customizer__btn bg-success text-white' onClick={this.handleOpen}>
                        <span className="lnr lnr-star" style={{fontSize: '20px'}}></span>
                    </button>

                    <button className='customizer__btn bg-success text-white' onClick={this.handleOpen}>
                        <span className="lnr lnr-sun" style={{fontSize: '20px'}}></span>
                    </button>

                    <button className='customizer__btn bg-success text-white' onClick={this.handleOpen}>
                        <span className="lnr lnr-users" style={{fontSize: '20px'}}></span>
                    </button>

                    <button className='customizer__btn bg-success text-white' onClick={this.handleOpen}>
                        <span className="lnr lnr-shirt" style={{fontSize: '20px'}}></span>
                    </button>
                </div>
                <div className={customizerClass}>
                    <div className='customizer__title-wrap'>
                        <h4>블러드랜드 구매</h4>
                        <button className='customizer__close-btn' onClick={this.handleOpen}>
                            <CloseIcon/>
                        </button>
                    </div>
                    <div className={purchaseClass}>
                        <div className="selectState">
                            <div className='customizer__title-wrap' style={{padding: '15px 0', textAlign: 'left'}}>
                                <p className='customizer__caption' style={{marginBottom: '0'}}>광고 구매 방법 소개</p>
                            </div>
                            <div>
                                <Button color='btn btn-primary btn-sm' onClick={this.handleBuyOpen}
                                        style={{margin: '10px 0', textAlign: 'center'}}>구매</Button>
                                <div className="clickAddress">
                                    <div className="btnEven">
                                        <button className={this.state.buttonSelectOne} data-mode="1"
                                                onClick={() => this.onSelected(1)}>
                                            <img src={iconMultiple} title="다중" alt="다중" className="pointEven"/>
                                        </button>
                                        <button className={this.state.buttonSelectMulti} data-mode="2"
                                                onClick={() => this.onSelected(2)}>
                                            <img src={iconMultipleBox} title="박스" alt="박스" className="pointEven"/>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div id="status" className="status">
                                Selected: <span className="tiles-selected"></span> & <span
                                className="lands-selected"></span>
                            </div>
                            <div className='customizer__title-wrap' style={{padding: '15px 0', textAlign: 'center'}}>
                                <p className='customizer__caption' style={{marginBottom: '0'}}> 쿼드 코드</p>
                                <div className="listQuadKey customizer__title-wrap area left-top">

                                </div>
                            </div>
                            <div style={{padding: '15px 0', textAlign: 'center'}}>
                                <Button color='btn btn-outline-primary btn-sm' outline
                                        onClick={() => this.handleOk(user.userName)}>확인</Button>
                                <Button color='btn btn-outline-danger btn-sm' outline
                                        onClick={this.handleCancel}>삭제</Button>
                            </div>
                        </div>
                        <div className="purchaseState">
                            <div className='customizer__title-wrap' style={{padding: '15px 0', textAlign: 'left'}}>
                                <p className='customizer__caption'
                                   style={{marginBottom: '0'}}>수량: {this.state.landsUser.lands} X 10.000 블러드</p>
                                <p className='customizer__caption' style={{marginBottom: '0'}}>결제
                                    총금액: <b>{this.state.landsUser.lands * 10000} 블러드</b></p>
                            </div>
                            <div style={{padding: '15px 0', textAlign: 'center'}}>
                                <Button color='btn btn-primary btn-sm' outline onClick={this.handlePurchase}>결제</Button>
                                <Button color='btn btn-outline-warning btn-sm' outline
                                        onClick={this.handleBack}>이전</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { lands, authentication } = state;
    const { user } = authentication;
    return {
        lands,
        user
    };
}

const connectedCustomizerPage = connect(mapStateToProps)(Customizer);
export default connectedCustomizerPage;