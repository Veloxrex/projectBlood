import React, {PureComponent} from 'react';
import Menu from './components/Menu';
import Transaction from './components/Transaction';
import Blochat from './components/Blochat';
import Bloodland from './components/Bloodland';
import Game from './components/Game';
import Video from './components/Video';
import Ads from './components/Ads';
import connect from "react-redux/es/connect/connect";
import {history} from "../../redux/services/history";

class MapMenu extends PureComponent {
    render() {
        let currentUrl = history.location.pathname;
        let name = currentUrl.replace('/map_menu/:', '');

        if(name==='index')
            return (
                <Menu />
            );
        else if(name==='transaction')
            return (
                <Transaction />
            );
        else if(name==='blochat')
            return (
                <Blochat />
            );
        else if(name==='bloodland')
            return (
                <Bloodland />
            );
        else if(name==='game')
            return (
                <Game />
            );
        else if(name==='video')
            return (
                <Video />
            );
        else if(name==='ads')
            return (
                <Ads />
            );
        return null;
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

const connectedLands = connect(mapStateToProps)(MapMenu);
export default connectedLands;