import React, { PureComponent } from 'react';
import {  Container, Row, Card, Col } from 'reactstrap';
import { translate } from 'react-i18next';

import GoogleTileMap from './components/GoogleTileMap';
import GoogleMapUtils from './components/GoogleMapUtils';
import Customizer from "./components/Customizer";
import connect from "react-redux/es/connect/connect";

import RpsGame from '../events/rps'

import {Notification} from "../../components/Notification";
import NotificationSystem from "rc-notification";
let notification = null;
NotificationSystem.newInstance({}, (n) => notification = n);

class GoogleMap extends PureComponent
{
    componentDidMount()
    {
        const google = window.google;
        const seoul = new google.maps.LatLng(37.566535, 126.9779692);
        const mainMap = window.mainMap = new window.google.maps.Map(document.getElementById('MainMap'), {
            center: seoul,
            mapTypeId: 'roadmap',
            streetViewControl: false,
            mapTypeControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            zoom: 14
        });

        google.maps.event.addListenerOnce(mainMap, 'tilesloaded', function ()
        {
            GoogleTileMap.init(mainMap);
            mainMap.addListener('bounds_changed', function () {
                GoogleTileMap.reload(mainMap);
                return true;
            });
            GoogleMapUtils.setZoomRange(mainMap, 5, 22);
            GoogleTileMap.setOnTileClickCallback(mainMap, function(map, tile, evt) {
                //tile.toggleInformation();
            });
        });
    }

    // show = (content) => {
    //     notification.notice({
    //         content: <Notification color='primary' message={content}/>,
    //         duration: 5,
    //         closable: true,
    //         style: {top: 0, left: 'calc(100vw - 100%)'},
    //         className: 'right-up'
    //     });
    // };

    render() {
        const { alert } = this.props;
        if(alert.message)
            notification.notice({
                content: <Notification color='primary' message={alert.message}/>,
                duration: 5,
                closable: true,
                style: {top: 0, left: 'calc(100vw - 100%)'},
                className: 'right-up'
            });
        return (
            <Container style={{overflow: 'hidden'}}>
                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <Card id="MainPart">
                            <div id='MainMap' className='map' style={{ height: `815px` }} />
                            <Customizer/>
                            <div className="events">
                                <RpsGame />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state)
{
    const { alert, lands, authentication } = state;
    const { user } = authentication;
    return {
        lands,
        user,
        alert
    };
}

const connectedGoogleMap = connect(mapStateToProps)(translate('common')(GoogleMap));
export default connectedGoogleMap;