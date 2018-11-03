import React, {PureComponent} from 'react';
import {Container, Row, Card,CardHeader,CardTitle, CardBody, Col} from 'reactstrap';
import _ from 'lodash';
import Table from "./components/Table";
// import Pagination from "../../components/Pagination";
import connect from "react-redux/es/connect/connect";
import {landActions} from "../../redux/actions/landActions";
import ReactDataGrid from 'react-data-grid';
import LandDetailForm from './components/LandDetailForm';
import LandItem from './components/LandItem'

class LandManagement extends PureComponent {
    constructor(props) {
        super(props);
        this._columns = [
            { key: 'id', name: 'ID' },
            { key: 'quadKey', name: 'quadKey' },
            { key: 'sellPrice', name: 'sellPrice' },
            { key: 'userName', name: 'userName' },
            { key: 'dataLng', name: 'dataLng' },
            { key: 'dataLat', name: 'dataLat' },
            { key: 'createdDate', name: 'createdDate' } 
        
        ]; 

        this.state = {
            formToggle : false,
            model:{
                id:'',
                quadKey:'',
                sellPrice:'',
                userName:'',
                dataLng:'',
                dataLat:'',
                createdDate:''
            }
        };


    }

    handleToClose(isClose){
        this.setState({            
            formToggle : isClose
        });
    }

    componentDidMount() {
        this.props.getLands();
    }

       // toggle redux
    onToggleForm = () => {
        this.setState({            
            formToggle : !this.state.formToggle
        });
    }

    elmLands = (lands) =>{
        let elmLands = []
        _.forEach(lands.items, function(land, key) {
            // if(key > 10)
            //     return;
            elmLands.push(<LandItem
                model={land}
                createdDate={land.createdDate}
                />);
        });
        return elmLands;
    }

    render() {
        const { lands } = this.props;
        var elmLands = this.elmLands(lands);
        var	handleToClose =	this.handleToClose;
        return (
            <Container>
                <Row>
                    <Col md={12} lg={12}>
                        <Card> 
                           
                            <CardBody >
                                <CardTitle>
                                    <h3>Land Management</h3>
                                </CardTitle>
                                <div className="function-style">
                                    <button type="button" className="btn btn-warning btn-sm" onClick={this.onToggleForm} >
                                        <span className="lnr lnr-plus-circle"></span> Thêm
                                    </button>
                                </div>

                                <LandDetailForm model={this.state.model} formToggle={this.state.formToggle} handleToClose={handleToClose.bind(this)} MODE_ADD={true}/> 

                                <div>
                                    <table className="table table--bordered"  >
                                            <tr>
                                                <th>ID</th>
                                                <th>quadKey</th>
                                                <th>sellPrice</th>
                                                <th>userName</th>
                                                <th>createdDate</th>
                                                <th></th>
                                                {/* <th className="text-center">dataLng</th>
                                                <th className="text-center">dataLat</th>
                                                <th className="text-center">Action</th> */}
                                            </tr>
                                        { elmLands }
                                    </table>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    const { lands, authentication,isDisplayForm,itemEditing } = state;
    const { user } = authentication;
    return {
        isDisplayForm,
        itemEditing,
        lands,
        user,
       
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getLands:()=>{
            dispatch(landActions.getAll());
        }
        
    };
};

const connectedLands = connect(mapStateToProps,mapDispatchToProps)(LandManagement);
export default connectedLands;