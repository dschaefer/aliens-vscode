import * as React from 'react';
import { Point } from '../utils/formulas';

interface FlyingObjectBaseProps {
    position: Point;
}

const FlyingObjectBase = (props: FlyingObjectBaseProps) => {
    const style: React.CSSProperties = {
        fill: '#979797',
        stroke: '#5c5c5c'
    };

    return (
        <ellipse
            cx={props.position.x}
            cy={props.position.y}
            rx="40"
            ry="10"
            style={style}
        />
    )
}

export default FlyingObjectBase;