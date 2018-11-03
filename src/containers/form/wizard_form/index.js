import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import showResults from './components/Show';
import Wizard from './components/WizardForm';
import {translate} from 'react-i18next';

class WizardForm extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>{t('forms.wizard_from.title')}</h3>
            <h3 className='page-subhead subhead'>Use this elements, if you want to show some hints or additional
              information</h3>
          </Col>
        </Row>
        <Wizard onSubmit={showResults}/>
      </Container>
    )
  }
}

export default translate('common')(WizardForm);
