import React, {PureComponent} from 'react';
import {Container, Row} from 'reactstrap';
import {Card, CardBody, Col} from 'reactstrap';
import Table from "./components/Table";
import Pagination from "../../components/Pagination";
import connect from "react-redux/es/connect/connect";

class DataTable extends PureComponent {
    constructor(props) {
        super(props);
        this.heads = [
            {
                key: 'id',
                name: '#',
                width: 80
            },
            {
                key: 'quadKey',
                name: 'QuadKey',
                sortable: true
            },
            {
                key: 'dataLat',
                name: 'Data Lat',
                sortable: true
            },
            {
                key: 'dataLng',
                name: 'Data Lng',
                sortable: true
            }
        ];

        this.state = {
            rows: this.createRows(23),
            pageOfItems: []
        };
        this.createRows = this.createRows.bind(this);
        this.getRandomDate = this.getRandomDate.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        this.setState({pageOfItems: pageOfItems});
    }

    getRandomDate = (start, end) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
    };

    createRows = (numberOfRows) => {
        let rows = [];
        for (let i = 1; i < numberOfRows + 1; i++) {
            rows.push({
                id: i,
                quadKey: ['Maria', 'Bobby  ', 'Alexander'][Math.floor((Math.random() * 3))],
                dataLat: ['Morisson', 'Brown  ', 'Medinberg'][Math.floor((Math.random() * 3))],
                dataLng: ['@dragon', '@hamster', '@cat'][Math.floor((Math.random() * 3))]
            });
        }
        return rows;
    };

    render() {
        //const { user, lands } = this.props;
        //console.log(lands);
        return (
            <Container>
                <Row>
                    <Col md={12} lg={12}>
                        <Card>
                            <CardBody>
                                <div className='card__title'>
                                    <h5 className='bold-text'>Data Land Bought</h5>
                                    <h5 className='subhead'>Use table with column's option <span className='red-text'>sortable</span></h5>
                                </div>
                                <p>Show
                                    <select className='select-options'>
                                        <option value='10'>10</option>
                                        <option value='20'>20</option>
                                        <option value='30'>30</option>
                                    </select>
                                    entries
                                </p>
                                <Table heads={this.heads} rows={this.state.rows}/>
                                <Pagination items={this.state.rows} onChangePage={this.onChangePage}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    const { lands, authentication } = state;
    const { user } = authentication;
    return {
        lands,
        user
    };
}

const connectedLands = connect(mapStateToProps)(DataTable);
export default connectedLands;