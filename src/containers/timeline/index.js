import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import TimelineHistory from './components/TimelineHistory';
import {translate} from 'react-i18next';

class Timeline extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>{t('ui_elements.timeline.title')}</h3>
            <h3 className='page-subhead subhead'>This interface let you to see your activity history</h3>
          </Col>
        </Row>
        <Row>
          <TimelineHistory/>
        </Row>
      </Container>
    )
  }
}

export default translate('common')(Timeline);
