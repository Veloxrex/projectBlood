import React, { /*Component*/ } from 'react';
import './Character.css';

import connect from "react-redux/es/connect/connect";
import { mapActions } from "../../../redux/actions/mapActions";
import { gameActions } from "../../../redux/actions/gameActions";
import cat from './cat.png';
import girl from './girl.png';

import TWEEN from '@tweenjs/tween.js';

class Character extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.char,
			tile: this.props.tile,
			top: 0,
			left: 0,
			leftLimit: 0,
			topLimit: 0,
			playAnimate: false,
			bgPosRight: 0,
			tID: 0,
			//current: {}
		};
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

    getLimitOneStep(curStep, nextStep){
    	let limit = { leftLimit: 0, topLimit: 0 };
		if(curStep.y === nextStep.y){
			if(nextStep.x > curStep.x){ //move right
				limit.leftLimit = 64;
			} else { //move left
				limit.leftLimit = -64;
			}
		}
		//move top or bottom
		if(nextStep.x === curStep.x){
			if(nextStep.y > curStep.y){ //move bottom
				limit.topLimit = 64;
			} else { //move top
				limit.topLimit = -64;
			}
		}
		return limit
    }

    UNSAFE_componentWillReceiveProps(nextProps){

    	//console.log('nextProps char: ', nextProps.map.selected)
    	if(nextProps.map &&
    		nextProps.map.selected &&
    		nextProps.map.selected.numDice === 0){
    		let { char, numDice, steps } = nextProps.map.selected;
    		if(char.quadKey === this.state.quadKey){
	    		//console.log('steps', steps)
	    		let curStep = steps[0].tile;
	    		let nextStep = steps[steps.length - 1].tile;
	    		//let leftLimit = Math.abs(stepLast.x - stepFirst.x);
				let limit = this.getLimitOneStep(curStep, nextStep);

	    		console.log("limit")
    			console.log(limit)
    			this.setState(limit);
    		}
    		//console.log(topLimit)

    	}
    	//console.log(nextProps.dataTile)
		// if(this.state.movable){
		//console.log(nextProps.dataTile)
		// }
		// if(nextProps.dataTile.movable){
		// 	console.log(nextProps.dataTile.movable);
		// }
		//this.setState({ ...nextProps.dataTile })
    }

	shouldComponentUpdate(nextProps, nextState) {
		console.log('shouldComponentUpdate');
		console.log(nextProps);
		console.log(nextState)
		return true;
		//return this.state.value != nextState.value;
	}

    generateRandomNumber(min, max){
	    return Math.floor( Math.random() * (max-min) + min );
	}

	//move
	moveOneStep = () => {
		if(this.state.leftLimit !== 0 || this.state.topLimit !== 0){
			//move right or left
			if(this.state.leftLimit > 0){
				let leftLimit = this.state.leftLimit - 4;
				console.log(leftLimit)
				if(leftLimit <= 0){
					leftLimit = 0;
					clearInterval(this.state.tID);
				}
				this.setState({ left: this.state.left + 4, leftLimit: leftLimit });
			} else {
				let leftLimit = this.state.leftLimit + 4;
				if(leftLimit >= 0){
					leftLimit = 0;
					clearInterval(this.state.tID, leftLimit: leftLimit );
				}
				this.setState({ left: this.state.left - 4, leftLimit: leftLimit });
			}
			//move bottom or top
			if(this.state.topLimit > 0){
				let topLimit = this.state.topLimit - 4;
				console.log(topLimit)
				if(topLimit <= 0){
					topLimit = 0;
					clearInterval(this.state.tID);
				}
				
				let top = this.state.top + 4;
				console.log(top);
				this.setState({ top: top, topLimit: topLimit });
			}
			//  else {
			// 	let topLimit = this.state.topLimit + 4;
			// 	if(topLimit >= 0){
			// 		topLimit = 0;
			// 		clearInterval(this.state.tID, topLimit: topLimit );
			// 	}
			// 	this.setState({ top: this.state.top - 4, topLimit: topLimit });
			// }
		}
	}

	onClickCharacter() {
		if(!this.state.playAnimate){
			//const numDice = this.generateRandomNumber(1,6);
			const numDice = 1;
			// const movables = [
				// { x: this.state.x, y: this.state.y - 1 },
				// { x: this.state.x, y: this.state.y + 1 },
				// { x: this.state.x - 1, y: this.state.y },
				// { x: this.state.x + 1, y: this.state.y },
    		// ];
			const objChar = {
				tile: this.state.tile,
				char: this.state,
				numDice: numDice,
			}
			//this.props.dispatch(mapActions.addSelected(objChar));
			this.setState({ playAnimate: true });
			let position = 64; //start position for the image slicer
			const interval = 100; //100 ms of interval for the setInterval()
			const diff = 64; //diff as a variable for position offset
			const tID = setInterval(() => {

				//console.log(this.state.topLimit)
				//console.log(this.state.top)
				if(this.state.leftLimit !== 0 || this.state.topLimit !== 0){
					let topLimit = this.state.topLimit - 4;
					if(topLimit <= 0){
						topLimit = 0;
						//this.props.dispatch(mapActions.addSelected(null));
						clearInterval(this.state.tID);
					}
					this.setState({ top: this.state.top + 4, topLimit: topLimit });
				}

				this.setState({ bgPosRight: this.state.bgPosRight - 64 })
				if (position < 384) {
					position = position + diff;
				} else {
					position = 64;
				}
			}, interval); //end of setInterval
			this.setState({ tID: tID });
		} else {
			//console.log('STOP')
			clearInterval(this.state.tID);
			this.setState({ playAnimate: false });
		}
	} //end of animateScript()
	// renderSprite(){
	// 	if(!this.state.loadTile) return;
	// 	return <div id="demo"><p id="image" onMouseEnter={this.animateScript} onMouseLeave={this.stopAnimate} /></div>
	// }

	render() {
		//console.log(this.state)
		return (
			<div id="demo" style={{ top: this.state.top, left: this.state.left, zIndex: 10 }}>
				<p id="image" onClick={this.onClickCharacter.bind(this)} style={{
						height: '64px',
						width: '64px',
						background: `url(${this.state.image})`,
						backgroundPosition: `${ this.state.bgPosRight }px 0px`,
					}} />
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

const connectedCharracter = connect(mapStateToProps)(Character);
export default connectedCharracter;
//export default Tile;

