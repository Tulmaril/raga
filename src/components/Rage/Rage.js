import React from 'react';

import RageLevel from '../RageLevels/RageLevel/RageLevel'
import classes from './Rage.css'

const Rage = (props) => (
    <div className={classes.Rage}>
        <RageLevel
            id={props.level}
        />   
        <div>{props.date}</div>
        <div className={classes.Rage__text}>{props.text}</div>
    </div>
);

export default Rage;