import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
//import Square from './Square';
import PropTypes from 'prop-types';
import Tile from './Tile';

import SimpleMap from './SimpleMap';
import './MutipleMap.css';

//import connect from "react-redux/es/connect/connect";
//import { landService } from "../../../redux/services/landService";

import connect from "react-redux/es/connect/connect";
//import { landService } from "../../../redux/services/landService";
import { mapActions } from "../../../redux/actions/mapActions";

import {
	LatLongToTileXY,
	Clip,
	MapSize,
	PixelXYToLatLong,
	TileXYToLatLong,
	TileXYToQuadKey,

	QuadKeyToTileXY,
	QuadKeyToLatLong
} from './System'

class MutipleMap extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mainMap: {
				center: [37.566535, 126.9779692],
				zoom: 22,
				mapOptions: {
					disableDoubleClickZoom: true,
				},
				loadTile: true,
				loadPin: false,
			},
			areaMap: {
				center: [37.566535, 126.9779692],
				zoom: 3,
				mapOptions: {

				},
				loadTile: false,
				loadPin: true,
			},
		}

	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		//nextProps.map.center
		//onsole.log( this.state )
		this.setState({ mainMap: { center: nextProps.map.center } });
		this.setState({ areaMap: { center: nextProps.map.center } });
	}

	render() {
		// if(this.props.map.center){
		// 	console.log('this.props.map')
			// console.log(this.props.map.center);
			// console.log(this.state.areaMap);
			// this.setState({ areaMap: { center: this.props.map.center } });
		// }
		//console.log(this.state.areaMap);
		return (
			// Important! Always set the container height explicitly
			<div style={{ height: '100%', width: '100%' }}>
				<div className={ 'mainMap' } style={{ height: '90vh', width: '100%' }} >	
					<SimpleMap
						dataMap={ this.state.mainMap }
					/>
				</div>
				<div className={ 'areaMap left-bottom-m wrap-m' } style={{ height: '300px', width: '300px' }}>
					<SimpleMap
						dataMap={ this.state.areaMap }
					/>
				</div>

			</div>
		);
	}
}
function mapStateToProps(state) {
	//console.log(state);

    // const { lands } = state;
    // const { user } = authentication;
    return {
        map: state.map,
    };
}

const connectedMutipleMap = connect(mapStateToProps)(MutipleMap);
//export default connectedSimpleMap;
export default connectedMutipleMap;