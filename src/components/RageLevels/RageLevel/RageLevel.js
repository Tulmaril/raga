import React from 'react';

import classes from './RageLevel.css'

function importAll(r) {
    return r.keys().map(r);
}
const images = importAll(require.context('../../../assets/images/', false, /\.(png|jpe?g|svg)$/));

const RageLevel = (props) => {

    return (
        <img className={classes.RageLevel}
            alt={props.id + 1}
            src={images[props.id]}
            onClick={props.selected}
        />
    )
};

export default RageLevel;