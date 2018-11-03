import React, { PureComponent } from 'react';
import {  Container, Row, Card, Col } from 'reactstrap';
import { translate } from 'react-i18next';

import GoogleTileMap from './components/GoogleTileMap';
import GoogleMapUtils from './components/GoogleMapUtils';
import Customizer from "./components/Customizer";
import connect from "react-redux/es/connect/connect";

import {Notification} from "../../components/Notification";
import NotificationSystem from "rc-notification";

import MutipleMap from "./components/MutipleMap";

let notification = null;
NotificationSystem.newInstance({}, (n) => notification = n);

class GoogleMap extends PureComponent
{
    render() {
        //const lands
        const { alert, lands } = this.props;
        //console.log(this.props);
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
{/*                            <div id='MainMap' className='map' style={{ height: '715px' }}>
                                
                            </div>*/}
                            <MutipleMap />
                            <Customizer/>
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