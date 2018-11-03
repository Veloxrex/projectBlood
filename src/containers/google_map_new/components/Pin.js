import React, { /*Component*/ } from 'react';
//import './Tile.css';

class Tile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			top: this.props.top,
			left: this.props.left,
		}
	}

    UNSAFE_componentWillReceiveProps(nextProps){
    	//console.log(nextProps)
		this.setState({
			top: nextProps.top,
			left: nextProps.left
		});
    }

	render() {
		//console.log(this.state.top);
		//console.log(this.state.left);
		return (
			<div className={ "minimap pin" } style={{  top: this.state.top, left: this.state.left  }} />
		);
	}
}

export default Tile;