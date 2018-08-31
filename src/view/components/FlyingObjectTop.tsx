import * as React from 'react';
import { Point, CubicBezierCurve, pathFromBezierCurve } from '../utils/formulas';

interface FlyingObjectTopProps {
    position: Point;
}

const FlyingObjectTop = (props: FlyingObjectTopProps) => {
    const style: React.CSSProperties = {
        fill: '#b6b6b6',
        stroke: '#7d7d7d'
    };

    const baseWidth = 40;
    const halfBase = 20;
    const height = 25;

    const cubicBezierCurve: CubicBezierCurve = {
        initialAxis: {
            x: props.position.x - halfBase,
            y: props.position.y
        },
        initialControlPoint: {
            x: 10,
            y: -height
        },
        endingControlPoint: {
            x: 30,
            y: -height
        },
        endingAxis: {
            x: baseWidth,
            y: 0
        }
    }

    return (
        <path
            style={style}
            d={pathFromBezierCurve(cubicBezierCurve)}
        />
    )
}

export default FlyingObjectTop;