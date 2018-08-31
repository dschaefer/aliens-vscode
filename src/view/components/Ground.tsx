import * as React from 'react';
import { skyAndGroundWidth } from '../utils/constants';

const Ground = () => {
    const groundStyle: React.CSSProperties = {
        fill: '#59a941'
    };

    const division: React.CSSProperties = {
        stroke: '#458232',
        strokeWidth: '3px'
    };

    const groundWidth = skyAndGroundWidth;

    return (
        <g id="ground">
            <rect
                id="ground-2"
                data-name="ground"
                style={groundStyle}
                x={groundWidth / -2}
                y={0}
                width={groundWidth}
                height={100}
            />
            <line
                x1={groundWidth / -2}
                y1={0}
                x2={groundWidth / 2}
                y2={0}
                style={division}
            />
        </g>
    );
};

export default Ground;