import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
//import Square from './Square';
import PropTypes from 'prop-types';
import Tile from './Tile';
import Pin from './Pin';



import connect from "react-redux/es/connect/connect";
import { landService } from "../../../redux/services/landService";
import { mapActions } from "../../../redux/actions/mapActions";

import cat from './cat.png';
import girl from './girl.png';

//import connect from "react-redux/es/connect/connect";
//import { landService } from "../../../redux/services/landService";
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

// Private Static Constants
const DEFAULT_LEVEL_OFFSET = 2;
const LOAD_OUT_BOUNDS = 5;
const MAX_TILE_LEVEL = 24;

const dataUsers = [
	// { 
	//     "sellPrice" : 0, 
	//     "userName" : "user 1", 
	//     "dataLat" : "37.579412513438385", 
	//     "dataLng" : "126.9635009765625", 
	//     "quadKey" : "1321103201201001",
	//     "pet": true,
	// },
	// { 
	//     "sellPrice" : 0, 
	//     "userName" : "user 2", 
	//     "dataLat" : "37.575059005149946", 
	//     "dataLng" : "126.990966796875", 
	//     "quadKey" : "1321103201201112",
	//     "pet": true,
	// },
	{ 
	    "sellPrice" : 0, 
	    "userName" : "user 3", 
	    "dataLat" : "37.56631720822982", 
	    "dataLng" : "126.97742700576782", 
	    "quadKey" : "1321103201201031323202",
	    char: [
			{ 
				name: 'Little Cat',
				image: cat,
				quadKey: "132110320120103132320232"
			},
			{ 
				name: 'Little Girl',
				image: girl,
				quadKey: '132110320120103132320211'
			}
		]
	}
];

class SimpleMap extends Component {
	static propTypes = {
		center: PropTypes.array,
		zoom: PropTypes.number,
		onCenterChange: PropTypes.func,
		onZoomChange: PropTypes.func,

		bounds: PropTypes.any,
		size: PropTypes.any,
	};

	constructor(props) {
		super(props);
		this.state = {
			size: null,
			center: this.props.dataMap.center,
			zoom: this.props.dataMap.zoom,//22,
			mapOptions: this.props.dataMap.mapOptions,
			bounds: null,
			map: null,
			maps: null,
			tiles: [],
			lands: [],
			loadTile: this.props.dataMap.loadTile,
			loadPin: this.props.dataMap.loadPin,
			pinLeft: 0,
			pinTop: 0,
		}
	}

	_onChange = async ({ center, zoom, size, bounds}) => {
		//console.log(this.state.loadTile)
		if(this.state.loadTile){
			this.setState({
				center,
				zoom,
				size,
				bounds,
				lands: dataUsers
			});
			this.drawTiles();
		}
		//update center after move
		this.props.dispatch(mapActions.updateCenter(center));
		//set center after move
		this.setState({ pinLeft: 0, pinTop: 0 });
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({ center: nextProps.dataMap.center });
		//this.drawTiles();
		if(this.state.loadTile && nextProps.tile && nextProps.tile.movables){
			//console.log('nextProps', nextProps.tile.movables);
			//nextProps.tile.movables
			let addMovableTiles = this.state.tiles.map( tile => {
				tile.movable = nextProps.tile.movables.some( mvTile => mvTile.x === tile.x && mvTile.y === tile.y );
				return tile;
			});
			//console.log( 'addMovableTiles', addMovableTiles.filter(tile => tile.movable) );
			//this.setState({ tiles: addMovableTiles });
			const tiles = this.state.tiles;
			this.setState((tiles)=>{
				tiles: addMovableTiles
			});
			//this.drawTiles();
		}
		//console.log(this.state)

		//console.log('simple map nextProps');
		//console.log(nextProps);
	}

    // shouldComponentUpdate(nextProps, nextState){
    // 	//console.log(nextProps)
    // 	console.log(nextState.tiles.filter( tile => tile.movable ))
    // 	//return nextProps.dataTile.movable
    // 	// if(nextProps.dataTile.movable){
	   //  // 	console.log(nextProps.dataTile)
    // 	// 	console.log(nextState)
    		
    // 	// }
    // 	return
    // }

	changePin(map, maps){
		let minimap = new maps.OverlayView();
		minimap.setMap(map);
	    var overlayProjection = minimap.getProjection();
	    
	    const bounds = map.getBounds();
	    //console.log(bounds.getSouthWest())
	    var sw = overlayProjection.fromLatLngToDivPixel(bounds.getSouthWest());
	    var ne = overlayProjection.fromLatLngToDivPixel(bounds.getNorthEast());
		this.setState({
			pinLeft: (sw.x + ne.x) / 2,
			pinTop: (ne.y + sw.y) / 2
		});
	}

	_onGoogleApiLoaded = ({map, maps}) => {
		this.setState({ map, maps });
		maps.event.addListener(map, 'bounds_changed', () => {
			this.changePin(map, maps);
		});
	}

	async createTile(x, y, level){
	    let tile = {
			x,
			y,
			level,
			buyable: true,
			selectable: true,
			//movable: false,
			selected: false,
			purchased: false,
			latlng: TileXYToLatLong(x, y, level),
			quadKey: TileXYToQuadKey(x, y, level)
		}

		//console.log(this.state.lands)

		const fUser = this.state.lands.find(user => tile.quadKey.indexOf(user.quadKey) !== -1);
		if( fUser ){
			tile.purchased = true;
			tile.selectable = false;
			tile.buyable = false; //only test - change late
			//console.log(fUser)
			tile.userName = fUser.userName;
			tile.landCount = Math.pow(4, MAX_TILE_LEVEL - tile.level);
			tile.char = fUser.char.find(char => char.quadKey === tile.quadKey);

			//console.log(tile.landCount);
			//if()

		}
		return tile;
	}

	async drawTiles(){
		const level = this.state.zoom + DEFAULT_LEVEL_OFFSET;
        const beginTile = LatLongToTileXY(this.state.bounds.ne.lat, this.state.bounds.sw.lng, level);
    	const endTile = LatLongToTileXY(this.state.bounds.sw.lat, this.state.bounds.ne.lng, level);

		if (beginTile.x < endTile.x) {
    		let arrTile = [];
		    for(let x = beginTile.x - LOAD_OUT_BOUNDS; x <= endTile.x + LOAD_OUT_BOUNDS; x++) {
		        for(let y = beginTile.y - LOAD_OUT_BOUNDS; y <= endTile.y + LOAD_OUT_BOUNDS; y++) {
		        	//console.log(this.createTile(x, y, level))
					arrTile.push(this.createTile(x, y, level));
		        }
		    }
		    let tmpTiles = await Promise.all(arrTile);
		    // let userTiles = tmpTiles.filter(tile => {
		    // 	return this.state.lands.some(user => tile.quadKey.indexOf(user.quadKey) !== -1);
		    // });
	    	// let addMovable = tmpTiles.map(tile => {
	    	// 	let isNextTile = userTiles.some(uTile => {
	    	// 		return (uTile.x === tile.x && (uTile.y === tile.y + 1 || uTile.y === tile.y - 1)) ||
	    	// 				(uTile.y === tile.y && (uTile.x === tile.x + 1 || uTile.x === tile.x - 1))
	    	// 	})
	    	// 	if(isNextTile){
	    	// 		tile.movable = true;
	    	// 	}
	    	// 	return tile;
	    	// })
	    	//console.log( "tmpTiles" )
	    	// console.log( addMovable.filter(t => t.movable) )
    		this.setState({ tiles: tmpTiles });
		}
	}

	renderTiles(){
		//console.log('renderTiles');
		//console.log( this.state.tiles.filter( tile => tile.movable ) )
		if(this.state.tiles.length === 0) return;
		return this.state.tiles.map((item, key) => {
			return <Tile
				key={ key }
				lat={ item.latlng.lat }
				lng={ item.latlng.lng }
				dataTile={ item }
			/>;
		})
	}

	renderPin(){
		if(!this.state.loadPin) return;
		//console.log('pinLeft')
		//console.log(this.state.pinLeft)
		return <Pin left={ this.state.pinLeft } top={ this.state.pinTop } />;
	}

	render() {
		//console.log("jfkajsflkajslfal")
		//const { center } = this.props.dataMap;
		//console.log(this.state.pinLeft)
		return (
			// Important! Always set the container height explicitly
			<GoogleMap
				bootstrapURLKeys={{ key: ['AIzaSyC7d9ULHVM8iGkSZwFp6JENYSAxk6XHXKM'] }}
				center={this.state.center}
				zoom={this.state.zoom}
				options={this.props.dataMap.mapOptions}
				onGoogleApiLoaded={this._onGoogleApiLoaded}
				onChange={this._onChange}
				yesIWantToUseGoogleMapApiInternals={true}
			>
				
				{ this.renderTiles() }
				{ this.renderPin() }
				{ /*this.renderSprite()*/ }
			</GoogleMap>
		);
	}
}

function mapStateToProps(state) {
    // const { lands, authentication } = state;
    // const { user } = authentication;
    // return {
    //     lands,
    //     user
    // };
    return {
        map: state.map,
    };
}

const connectedSimpleMap = connect(mapStateToProps)(SimpleMap);
export default connectedSimpleMap;

// lat={center.lat} lng={center.lng} >