import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { Point } from '../utils/formulas';
import FlyingObjectBase from './FlyingObjectBase';
import FlyingObjectTop from './FlyingObjectTop';
import { gameHeight } from '../utils/constants';

const moveVertically = keyframes`
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(${gameHeight}px);
    }
`;

const Move = styled.g`
    animation: ${moveVertically} 4s linear;
`;

console.log("Move: " + Move);

interface FlyingObjectProps {
    position: Point;
}

const FlyingObject = (props: FlyingObjectProps) => (
    <Move>
        <FlyingObjectBase position={props.position}/>
        <FlyingObjectTop position={props.position}/>
    </Move>
)

export default FlyingObject;