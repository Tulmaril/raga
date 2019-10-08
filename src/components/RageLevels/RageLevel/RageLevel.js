import React, { useState } from 'react';

import classes from './RageLevel.css'

function importAll(r) {
    return r.keys().map(r);
}
const images = importAll(require.context('../../../assets/images/', false, /\.(png|jpe?g|svg)$/));
const sounds = importAll(require.context('../../../assets/sounds/', false, /\.(mp3|ogg)$/));

const RageLevel = (props) => {
    const [animation, setAnimation] = useState('none');

    let style = {animation: animation};

    const playAudio = () => {
        const audio = new Audio(sounds[props.id]);
        setAnimation(`${classes.scale} .4s linear`);
        audio.play();
    };

    return (
        <>
            <img className={[classes.RageLevel, ]}
                style={style}
                alt={props.id + 1}
                src={images[props.id]}
                onAnimationEnd={() => {setAnimation('none')}}
                onClick={() => {
                    playAudio();
                    if (props.choosing) props.selected();
                }}
            />
        </>
    )
};

export default RageLevel;