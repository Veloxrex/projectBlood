import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import showResults from './components/Show';
import DropFiles from './components/DropFiles';
import {translate} from 'react-i18next';

class FormDropzone extends PureComponent {
  render() {
    const {t} = this.props;

    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>{t('forms.form_dropzone.title')}</h3>
            <h3 className='page-subhead subhead'>Use this elements, if you want to show some hints or additional
              information</h3>
          </Col>
        </Row>
        <Row>
          <DropFiles onSubmit={showResults}/>
        </Row>
      </Container>
    )
  }
}

export default translate('common')(FormDropzone);
