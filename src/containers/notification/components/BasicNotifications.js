import React, {PureComponent} from 'react';
import {Button, ButtonToolbar, Card, CardBody, Col} from 'reactstrap';
import PropTypes from 'prop-types';
import {Notification} from '../../../components/Notification';
import {translate} from 'react-i18next';

class BasicNotifications extends PureComponent {
    static propTypes = {
        showNotification: PropTypes.func.isRequired,
    };

    show = (position) => {
        this.props.showNotification({
            notification: <Notification title='Remember!'
                                             message='Learning day desirous informed expenses material returned six the.
                                       She enabled invited exposed him another.'
            />,
            position: position
        });
    };

    render() {
        const {t} = this.props;

        return (
            <Col md={12} lg={6} xs={12}>
                <Card>
                    <CardBody>
                        <div className='card__title'>
                            <h5 className='bold-text'>{t('ui_elements.notifications.basic_notifications')}</h5>
                            <h5 className='subhead'>Use BasicNotification with necessary value of property <span
                                className='red-text'>position</span></h5>
                        </div>
                        <ButtonToolbar>
                            <Button outline onClick={() => this.show('left-up')}>Left Up</Button>
                            {/*<Button outline onClick={() => this.show('left-down')}>Left Down</Button>*/}
                            <Button outline onClick={() => this.show('right-up')}>Right Up</Button>
                            {/*<Button outline onClick={() => this.show('right-down')}>Right Down</Button>*/}
                        </ButtonToolbar>
                    </CardBody>
                </Card>
            </Col>
        )
    }
}

export default translate('common')(BasicNotifications);