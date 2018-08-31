import * as React from 'react';
import { skyAndGroundWidth } from '../utils/constants';

const Sky = () => {
    const skyStyle: React.CSSProperties = {
        fill: '#30abef'
    };

    const skyWidth = 5000;
    const gameHeight = skyAndGroundWidth;

    return (
        <rect
            style={skyStyle}
            x={skyWidth / -2}
            y={100 - gameHeight}
            width={skyWidth}
            height={gameHeight}
        />
    );
}

export default Sky;