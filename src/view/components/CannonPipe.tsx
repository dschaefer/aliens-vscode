import * as React from 'react';
import { CubicBezierCurve, pathFromBezierCurve } from '../utils/formulas';
import { Store } from '../store';
import { inject, observer } from '../../../node_modules/mobx-react';

export interface CannonPipeProps {
    store?: Store;
};

const CannonPipe = inject('store')(observer((props: CannonPipeProps) => {
    const cannonPipeStyle: React.CSSProperties = {
        fill: '#999',
        stroke: '#666',
        strokeWidth: '2px'
    };

    const rotation = props.store ? props.store.angle : 45;
    const transform = `rotate(${rotation}, 0, 0)`;

    const muzzleWidth = 40;
    const halfMuzzle = 20;
    const height = 100;
    const yBasis = 70;

    const cubicBezierCurve: CubicBezierCurve = {
        initialAxis: {
            x: -halfMuzzle,
            y: -yBasis
        },
        initialControlPoint: {
            x: -40,
            y: height * 1.7
        },
        endingControlPoint: {
            x: 80,
            y: height * 1.7
        },
        endingAxis: {
            x: muzzleWidth,
            y: 0
        }
    }

    return (
        <g transform={transform}>
            <path
                style={cannonPipeStyle}
                d={pathFromBezierCurve(cubicBezierCurve)}
            />
            <line
                x1={-halfMuzzle}
                y1={-yBasis}
                x2={halfMuzzle}
                y2={-yBasis}
                style={cannonPipeStyle}
            />
        </g>
    );
}));

export default CannonPipe;