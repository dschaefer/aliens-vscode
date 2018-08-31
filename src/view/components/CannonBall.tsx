import * as React from 'react';
import { Point } from '../utils/formulas';

interface CannonBallProps {
    position: Point;
}

const CannonBall = (props: CannonBallProps) => {
    const ballStyle: React.CSSProperties = {
        fill: '#777',
        stroke: '#444',
        strokeWidth: '2px'
    };

    return (
        <ellipse
            style={ballStyle}
            cx={props.position.x}
            cy={props.position.y}
            rx="16"
            ry="16"
        />
    )
}

export default CannonBall;