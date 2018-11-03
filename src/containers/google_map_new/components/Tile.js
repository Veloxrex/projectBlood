import React, { /*Component*/ } from 'react';
import './Tile.css';

import connect from "react-redux/es/connect/connect";
import { landService } from "../../../redux/services/landService";
import { mapActions } from "../../../redux/actions/mapActions";
import TWEEN from '@tweenjs/tween.js';

import Character from './Character';

class Tile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...props.dataTile,
			pet: true,
			hover: false,
			selected: false,

			//current: {}
		};
	}

	_onMouseEnter = () => {
		//console.log(this.state.pet)
		//if(!this.state.pet)
		this.setState({ hover: true });
		
    }

    _onMouseLeave = () => {
    	//if(!this.state.pet)
		this.setState({ hover: false });
    	
    }

    UNSAFE_componentWillReceiveProps(nextProps){
    	//console.log(nextProps.dataTile)
		// if(this.state.movable){
		//console.log(nextProps.dataTile)
		// }
		// if(nextProps.dataTile.movable){
		// 	console.log(nextProps.dataTile.movable);
		// }
		if(nextProps.dataTile){
			//console.log('update data tile')
			this.setState({ ...nextProps.dataTile })
		}
    }

    // shouldComponentUpdate(nextProps, nextState){
    // 	return nextProps.dataTile.movable
    // 	// if(nextProps.dataTile.movable){
	   //  // 	console.log(nextProps.dataTile)
    // 	// 	console.log(nextState)
    		
    // 	// }

    // }

    //132110320120103132320211


    _onClick = (e) => {
    	//console.log('this.state.char');
    	//console.log(this.props.map);
    	//only effect when char empty
    	if(!this.state.char){
			//hightlight tile
	    	if(this.state.selected){

				//this.setState({ selected: false });
				//this.props.getSelectedTiles({ x: this.state.x, y: this.state.y, isSelected: true })
				//this.props.dispatch( mapActions.addSelected({ x: this.state.x, y: this.state.y }) );
			} else {
				//this.setState({ selected: true });
				const objStep = {
					tile: this.state,
				};
				this.props.dispatch(mapActions.addSelected(objStep));
			}
    	}
		//console.log(this.state.selected)
		//this.props.getDataFromChild(this.state.selected);
    }

    // _onChange = () => {
    // 	this.setState(this.props.dataTile);
    // }

    // _onMouseMove = () => {
    // 	// /console.log("move");
    // }

    // _onMouseOut = () => {
    // 	//console.log("out");
    // }

    // _onMouseOver = () => {
    // 	//console.log("over");
    // }

    renderPet(){
    	if(!this.state.pet) return;
    	if(!this.state.purchased) return;
    	//const char = chars.find(char => char.quadKey === this.state.quadKey);
    	if(this.state.char){
    		//console.log(this.state.char)
			return ([
				//<img src={cat} width="60" height="60" onClick={this._onClickChar.bind(this)} />,
				<Character char={this.state.char} tile={this.state} />
			]);
    	}
    }

	render() {
		//console.log(this.props.dataTile);
		let clsName = this.state.purchased ? 'purchased ' : "";
			clsName += this.state.hover ? 'hover ' : "";
			clsName += this.state.selected ? 'selected ' : "";
			//clsName += this.state.movable ? 'movable ' : "";
		return (
			<div
				className={ 'tile-n '+ clsName }
				data-tile-x={this.props.dataTile.x}
				data-tile-y={this.props.dataTile.y}
				data-quadkey={this.props.dataTile.quadKey}
				onMouseOver={this._onMouseEnter}
				onMouseLeave={this._onMouseLeave}
				onClick={this._onClick}
				//onChange={this._onChange}
				// onMouseMove={this._onMouseMove}
				// onMouseOut={this._onMouseOut}
				// onMouseOver={this._onMouseOver}
			>
				{ /*(this.state.userName ? this.state.userName : "") + (this.state.landCount ? ' '+this.state.landCount : '')*/ }
				{ this.renderPet() }
			</div>
			
		);
	}
}

function mapStateToProps(state) {
    // const { lands, authentication } = state;
    // const { user } = authentication;
    return {
        map: state.map,
    };
}

const connectedTile = connect(mapStateToProps)(Tile);
export default connectedTile;
//export default Tile;