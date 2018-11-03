import React, {PureComponent} from 'react';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import LandDetailForm from '../components/LandDetailForm';
import { connect } from 'react-redux';
import {landActions} from "../../../redux/actions/landActions";

class LandItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            model:null,
            formToggle : false
        };
        

    }

    
    handleToClose(isClose){
        this.setState({            
            formToggle : isClose
        });
    }

    onToggleForm = () => {
        
    }

    
    onDeleteItem = () => {
        this.props.onDeleteLand(this.props.id);
    }

    onEditItem = () => {
        this.setState({            
            formToggle : !this.state.formToggle
        });
    }


    render() {
        
        var	handleToClose =	this.handleToClose;
        return (
            <React.Fragment>
                <tr>
                    <td>{this.props.model.id}</td>
                    <td>{this.props.model.quadKey}</td>
                    <td>{this.props.model.sellPrice}</td>
                    <td>{this.props.model.userName}</td>
                    <td>{this.props.model.createdDate}</td>
                    {/* <td>{this.props.id}</td>
                    <td>{this.props.id}</td> */}
                    <td className="text-center">
                        <button
                            type="button"
                            className="btn btn-outline-success btn-sm"
                            onClick={ this.onEditItem }>
                            <span className="lnr lnr-pencil" ></span>
                        </button>
                        &nbsp;
                        <button
                            type="button" className="btn btn-outline-danger btn-sm"
                            onClick={ this.onDeleteItem }>
                            <span className="lnr lnr-cross-circle" ></span>
                        </button>
                    </td>
                </tr>
                {
                    this.state.formToggle === true ?  
                    <tr className='editor-row'>
                        <td colSpan='6'>
                            <LandDetailForm model={this.props.model} formToggle={this.state.formToggle} handleToClose={handleToClose.bind(this)} />
                        </td>
                    </tr>
                    : <React.Fragment />
                }
               
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus : (id) => {
            //dispatch(actions.updateStatus(id));
        },
        onDeleteLand : (id) => {
            dispatch(landActions.delete(id))
        },
        onCloseForm : () => {
            //dispatch(actions.closeForm());
        },
        onOpenForm : () => {
            //dispatch(actions.openForm());
        },
        onEditTask : (task) => {
            //dispatch(actions.editTask(task));
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(LandItem);