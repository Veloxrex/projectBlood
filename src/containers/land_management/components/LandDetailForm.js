import React, {PureComponent} from 'react';
import {Container, Row, Card, CardBody, Col} from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import connect from "react-redux/es/connect/connect";
import {formActions} from "../../../redux/actions/formActions";

class LandDetailForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            MODE_ADD:false,
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
    

    componentWillMount() {
        if(this.props.itemEditing && this.props.itemEditing.id !== null){
            this.setState({
                id : this.props.itemEditing.id,
                name : this.props.itemEditing.name,
            });
        }else{
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.itemEditing){
            this.setState({
                id : nextProps.itemEditing.id,
                name : nextProps.itemEditing.name,
            });
        }else{
            this.onClear();
        }
    }

    onHandelInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSave = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onClear();
        this.onExitForm();
    }

    onClear = () => {
        this.setState({
            name : '',
            status : false
        });
    }


    onExitForm = () => {
        
        this.setProps({
            formToggle : false
        });
    }

    render() {
        const {quadkey} = this.state.model;
        let	handleToClose	=	this.props.handleToClose;
        return (
            <div className={ this.props.formToggle === true ? 'col-md-12 col-lg-12' : 'd-none' }>
                                    <div className="card-deck panel-warning">
                                        <div class="card box-shadow">
                                            <div className={ this.props.MODE_ADD === true ? 'card-header bg-success' : 'd-none' }>
                                                <h4 class="my-0 font-weight-normal text-white">Thêm</h4>
                                            </div>
                                            <form class={this.props.MODE_ADD === true ? 'card-body' : 'card-body editor-row'} onSubmit={this.onSave}  >
                                                    <div class="form-row">
                                                        <div class="col-md-4 mb-3">
                                                            <label for="txtID">ID</label>
                                                            <input type="text" class="form-control" id="ID" placeholder="ID" value={this.props.model.id}  readOnly />
                                                        </div>
                                                        <div class="col-md-4 mb-3">
                                                            <label for="txtQuadKey">Quad key</label>
                                                            <input type="text" class="form-control" id="txtQuadKey"
                                                                   placeholder="Quad key"
                                                                   value={quadkey ? quadkey : this.props.model.quadkey}
                                                                   onChange={this.onHandelInputChange} required />
                                                        </div>
                                                        <div class="col-md-4 mb-3">
                                                            <label for="txtPrice">Price</label>
                                                            <div class="input-group">
                                                                <div class="input-group-prepend">
                                                                    <span class="input-group-text" id="inputGroupPrepend2">$$</span>
                                                                </div>
                                                                <input type="text" class="form-control" id="txtPrice" 
                                                                       placeholder="Price"
                                                                       value={this.props.model.sellPrice}
                                                                       onChange={this.onhandelInputChange} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-row">
                                                        <div class="col-md-5 mb-3">
                                                            <label for="txtDataLag">DataLag</label>
                                                            <input type="text" class="form-control" id="txtDataLag" placeholder="DataLag" value={this.props.model.dataLng} required />
                                                        </div>
                                                        <div class="col-md-5 mb-3">
                                                            <label for="txtDataLat">DataLat</label>
                                                            <input type="text" class="form-control" id="txtDataLat" placeholder="DataLat" value={this.props.model.dataLat} required />
                                                        </div>
                                                        <div class="col-md-2 mb-3">
                                                            <label for="txtUsername">Username</label>
                                                            <input type="text" class="form-control" id="txtUsername" placeholder="Username" value={this.props.model.userName} required />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required />
                                                            <label class="form-check-label" for="invalidCheck2">
                                                                is checked for featured land
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <button class="btn btn-primary btn-sm" type="submit">
                                                     <span className="lnr lnr-enter-down"></span> Save
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleToClose(false)}>
                                                        <span className="lnr lnr-cross"></span> Cancel
                                                    </button>
                                                </form>
                                            
                                        </div>
                                     
                                    </div>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask : (task) => {
            dispatch(formActions.saveTask(task));
        },
        onCloseForm : () => {
            dispatch(formActions.closeForm());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LandDetailForm);