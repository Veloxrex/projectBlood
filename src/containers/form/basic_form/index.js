import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import HorizontalForm from './components/HorizontalForm';
import VerticalForm from './components/VerticalForm';
import showResults from './components/Show';
import {translate} from 'react-i18next';

class BasicForm extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>{t('forms.basic_form.title')}</h3>
            <h3 className='page-subhead subhead'>Use this elements, if you want to show some hints or additional
              information</h3>
          </Col>
        </Row>
        <Row>
          <HorizontalForm onSubmit={showResults}/>
        </Row>
        <Row>
          <VerticalForm onSubmit={showResults}/>
        </Row>
      </Container>
    )
  }
}

export default translate('common')(BasicForm);
