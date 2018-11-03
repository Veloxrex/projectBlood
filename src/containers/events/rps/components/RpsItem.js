import React, {PureComponent} from 'react';
import {translate} from 'react-i18next';

class RpsItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedRps:this.props.selectedRps
        };
    }

    selectRps = (selectedRps) =>{
        this.setState({
            selectedRps:selectedRps
        });
        return selectedRps;
    };

    render() {
        let	handleToAddList	=	this.props.handleToAddList;
        return (
            <div className="rps-item">
                <button className={`btn btn-round btn-custom handPaper-btn ${this.state.selectedRps === 0 ? 'handPaper-btn--selected':''}`} 
                    onClick={ () => handleToAddList(this.props.slot, this.selectRps(0))}> 
                </button>
                <button className={`btn btn-round btn-custom handPeace-btn ${this.state.selectedRps === 1 ? 'handPeace-btn--selected':''}`} 
                    onClick={ () => handleToAddList(this.props.slot, this.selectRps(1))}> 
                </button>
                <button className={`btn btn-round btn-custom handRock-btn ${this.state.selectedRps === 2 ? 'handRock-btn--selected':''}`} 
                    onClick={ () => handleToAddList(this.props.slot, this.selectRps(2))}>
                </button>
                
                 <div className={`rps-round ${this.props.highlightUnselectedRound === this.props.slot ? 'rps-round-notice' : '' }`}>{this.props.slot + 1}</div> 
            </div>
        )
    }
}

export default translate('common')(RpsItem);