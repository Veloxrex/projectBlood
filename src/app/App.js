import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css'
import '../scss/app.scss';
import RouterWrapper from './RouterWrapper';
import connect from "react-redux/es/connect/connect";
import {history} from "../redux/services/history";
import alertActions from "../redux/actions/alertActions";
import MainWrapper from "./MainWrapper";

class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading: true,
            loaded: false
        };

        const { dispatch } = this.props;
        history.listen((location, action) =>
        {
            dispatch(alertActions.clear());
        });
    }

    componentDidMount() {
        window.addEventListener('load', () => {
            this.setState({loading: false});
            setTimeout(() => this.setState({loaded: true}), 500);
        });
    }

    render() {
        const loaded = this.state.loaded;
        return (
            <div>
                {!loaded && <div className={`load${this.state.loading ? '' : ' loaded'}`}>
                    <div className='load__icon-wrap'>
                        <svg className='load__icon'>
                            <path fill='#4ce1b6' d='M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z'/>
                        </svg>
                    </div>
                </div>}
                <div>
                    <MainWrapper>
                        <RouterWrapper/>
                    </MainWrapper>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state)
{
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(hot(module)(App));
export default connectedApp;