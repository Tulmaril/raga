import React, { Component } from 'react';

import classes from './NewRage.css';
import RageLevels from '../RageLevels/RageLevels';

class NewRage extends Component {
    state = {
        id: '',
        level: 0,
        text: '',
        date: null,
        visible: false
    }

    rageLevelSelectedHandler = (level) => {
        this.setState({level: level});
    }

    toggleNewRage = () => {
        this.setState({visible: !this.state.visible});
        this.setState({text: ''});
    }

    addRageHandler = () => {
        let date = new Date();
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
        date = `${date} ${time}`
        this.setState({date: date},
            () => {this.props.addRage(this.state); this.toggleNewRage()});
    }

    render () {
        let rageBody = null;

        if (this.state.visible) {
            rageBody = (
                <>
                <label>Rage level</label>
                <RageLevels 
                    rageLevelSelected={(level) => this.rageLevelSelectedHandler(level)}
                />                
                <label>Text your Rage</label>
                <textarea value={this.state.text} onChange={(event) => this.setState({text: event.target.value})}></textarea>
                <button onClick={this.addRageHandler}>rrrage</button>
                </>
            )
        }

        return (
            <div className={classes.NewRage}>
                <h1 onClick={this.toggleNewRage}>Add a Rage</h1>

                {rageBody}
            </div>
        );
    }
}

export default NewRage;