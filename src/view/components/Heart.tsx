import * as React from 'react';
import { Point, CubicBezierCurve, pathFromBezierCurve } from '../utils/formulas';

interface HeartProps {
    position: Point;
}

const Heart = (props: HeartProps) => {
    const heartStyle: React.CSSProperties = {
        fill: '#da0d15',
        stroke: '#a51708',
        strokeWidth: '2px'
    };

    const leftSide: CubicBezierCurve = {
        initialAxis: {
            x: props.position.x,
            y: props.position.y
        },
        initialControlPoint: {
            x: -20,
            y: -20
        },
        endingControlPoint: {
            x: -40,
            y: 10
        },
        endingAxis: {
            x: 0,
            y: 40
        }
    };

    const rightSide: CubicBezierCurve = {
        initialAxis: {
            x: props.position.x,
            y: props.position.y
        },
        initialControlPoint: {
            x: 20,
            y: -20
        },
        endingControlPoint: {
            x: 40,
            y: 10
        },
        endingAxis: {
            x: 0,
            y: 40
        }
    };

    return (
        <g filter="url(#shadow)">
            <path
                style={heartStyle}
                d={pathFromBezierCurve(leftSide)}
            />
            <path
                style={heartStyle}
                d={pathFromBezierCurve(rightSide)}
            />
        </g>
    );
}

export default Heart;