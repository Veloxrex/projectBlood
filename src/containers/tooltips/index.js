import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import TooltipTop from './components/TooltipTop';
import TooltipBottom from './components/TooltipBottom';
import TooltipRight from './components/TooltipRight';
import TooltipLeft from './components/TooltipLeft';
import PopoverTop from './components/PopoverTop';
import PopoverBottom from './components/PopoverBottom';
import PopoverRight from './components/PopoverRight';
import PopoverLeft from './components/PopoverLeft';
import {translate} from 'react-i18next';

class TooltipsPopovers extends PureComponent {
    render() {
        const {t} = this.props;

        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <h3 className='page-title'>{t('ui_elements.tooltips_popovers.title')}</h3>
                        <h3 className='page-subhead subhead'>Use this elements, if you want to show some hints or additional
                            information</h3>
                    </Col>
                </Row>
                <Row>
                    <TooltipTop/>
                    <TooltipBottom/>
                    <TooltipRight/>
                    <TooltipLeft/>
                    <PopoverTop/>
                    <PopoverBottom/>
                    <PopoverRight/>
                    <PopoverLeft/>
                </Row>
            </Container>
        )
    }
}

export default translate('common')(TooltipsPopovers);
