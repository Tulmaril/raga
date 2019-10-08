import React, {Component} from 'react';

import RageLevel from './RageLevel/RageLevel'
import classes from './RageLevels.css'

class RageLevels extends Component {

    state = {
        levels: [0,1,2,3,4,5]
    }

    render () {

        return (
            <div className={classes.RageLevels}>
                {this.state.levels.map((level) => (
                    <RageLevel 
                        key={level}
                        id={level}
                        choosing={true}
                        selected={() => this.props.rageLevelSelected(level)}
                         />
                ))}
            </div>
        )
    }
}
   

export default RageLevels;