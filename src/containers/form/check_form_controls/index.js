import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import DefaultControls from './components/DefaultControls';
import ColoredControls from './components/ColoredControls';
import ColoredControlsOnClick from './components/ColoredControlsOnClick';
import ButtonTypeControls from './components/ButtonTypeControls';
import showResults from '../form_layouts/components/Show';
import {translate} from 'react-i18next';

class CheckFormControls extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>{t('forms.check_form_controls.title')}</h3>
            <h3 className='page-subhead subhead'>Use this elements, if you want to show some hints or additional
              information</h3>
          </Col>
        </Row>
        <Row>
          <DefaultControls onSubmit={showResults}/>
          <ColoredControls onSubmit={showResults}/>
          <ColoredControlsOnClick onSubmit={showResults}/>
          <ButtonTypeControls onSubmit={showResults}/>
        </Row>
      </Container>
    )
  }
}

export default translate('common')(CheckFormControls);
