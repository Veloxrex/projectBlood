import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import DatePickers from './components/DatePickers';
import TimePickers from './components/TimePickers';
import ColorPickers from './components/ColorPickers';
import showResults from './components/Show';
import {translate} from 'react-i18next';

class FormPicker extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>{t('forms.from_picker.title')}</h3>
            <h3 className='page-subhead subhead'>Use this elements, if you want to show some hints or additional
              information</h3>
          </Col>
        </Row>
        <Row>
          <DatePickers onSubmit={showResults}/>
          <TimePickers onSubmit={showResults}/>
          <ColorPickers onSubmit={showResults}/>
        </Row>
      </Container>
    )
  }
}

export default translate('common')(FormPicker);
