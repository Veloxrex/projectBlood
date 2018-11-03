import React, { PureComponent } from 'react';

class TimeCounter extends PureComponent {
    constructor(props) {
        super(props);
        let fixDate = (new Date()).setMinutes(0,0);
        if(new Date().getMinutes()>=0&&new Date().getMinutes()<20)
            fixDate = (new Date()).setMinutes(20,0);
        else if(new Date().getMinutes()>=20&&new Date().getMinutes()<40)
            fixDate = (new Date()).setMinutes(40,0);
        else if(new Date().getMinutes()>=40&&new Date().getMinutes()<60)
            fixDate = (new Date()).setMinutes(59,0);

        let currDate = new Date();
        this.state = { fixDate, diff: fixDate-currDate };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState((prevState, props) => ({
            diff: prevState.fixDate - (new Date()).getTime(),
        }));
        if(this.state.diff<0)
        {
            let fixDate = (new Date()).setMinutes(0,0);
            if(new Date().getMinutes()>=0&&new Date().getMinutes()<20)
                fixDate = (new Date()).setMinutes(20,0);
            else if(new Date().getMinutes()>=20&&new Date().getMinutes()<40)
                fixDate = (new Date()).setMinutes(40,0);
            else if(new Date().getMinutes()>=40&&new Date().getMinutes()<60)
                fixDate = (new Date()).setMinutes(59,0);

            this.setState({fixDate, diff: this.fixDate - (new Date()).getTime()});
        }
    }

    render() {
        let { diff } = this.state;
        let hours = Math.floor(diff/(60*60*1000));
        let mins = Math.floor((diff-(hours*60*60*1000))/(60*1000));

        if (mins < 10)
            mins = '0' + mins;
        if(isNaN(mins))
            mins = 20;

        let secs = Math.floor((diff-(hours*60*60*1000)-(mins*60*1000))/1000);
        if (secs < 10)
            secs = '0' + secs;
        if(isNaN(secs))
            secs = '00';

        return (
            <div>
                <h2>{mins}:{secs}</h2>
            </div>
        );
    }
}
export default TimeCounter;