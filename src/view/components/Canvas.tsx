import * as React from 'react';
import Sky from './Sky';
import Ground from './Ground';
import CannonPipe from './CannonPipe';
import CannonBase from './CannonBase';
import { Store } from '../store';
import { getCanvasPosition, Point, handleResize } from '../utils/formulas';
import { inject, observer } from 'mobx-react';
import CannonBall from './CannonBall';
import CurrentScore from './CurrentScore';
import FlyingObject from './FlyingObject';
import Heart from './Heart';
import StartGame from './StartGame';
import Title from './Title';
import { gameHeight, gameWidth } from '../utils/constants';

interface CanvasProps {
    store?: Store;
}

// Needed to compile feDropShadow
interface SVGFEDropShadowElement extends HTMLElement { }
declare global {
    namespace JSX {
        interface IntrinsicElements {
            feDropShadow: React.SVGProps<SVGFEDropShadowElement>;
        }
    }
}

@inject('store')
@observer
export class Canvas extends React.Component<CanvasProps> {
    private mousePosition: Point = { x: 0, y: 0 };

    componentDidMount() {
        setInterval(() => {
            if (this.props.store) {
                this.props.store.setAngle(this.mousePosition);
                if (this.props.store.started) {
                    this.props.store.createFlyingObject();
                    this.props.store.moveCannonBalls();
                    this.props.store.checkCollisions();
                }
            }
        }, 20);

        window.onresize = handleResize;
        window.onresize(new UIEvent('resize'));
    }

    
    trackMouse(event: React.MouseEvent) {
        this.mousePosition = getCanvasPosition(event);
    }

    shoot(event: React.MouseEvent) {
        if (this.props.store && this.props.store.started) {
            this.props.store.shoot(getCanvasPosition(event));
        }
    }

    render() {
        const viewBox = [
            gameWidth / -2,
            100 - gameHeight,
            gameWidth,
            gameHeight
        ];

        const style : React.CSSProperties = {
            width: "100%",
            margin: "0"
        }

        return (
            <svg
                id="aliens-go-home-canvas"
                viewBox={viewBox.join(' ')}
                onMouseMove={(event => this.trackMouse(event))}
                onClick={(event => this.shoot(event))}
                style={style}
            >
                <defs>
                    <filter id="shadow">
                        <feDropShadow dx="1" dy="1" stdDeviation="2"/>
                    </filter>
                </defs>
                <Sky/>
                <Ground/>
                <CurrentScore/>
                <Heart position={{x: 240 - gameWidth, y: 35}}/>
                { (!this.props.store || !this.props.store.started) && 
                    <g>
                        <StartGame/>
                        <Title/>
                    </g>
                }
                { this.props.store && this.props.store.started &&
                    <g>
                        {
                            this.props.store.flyingObjects.map(flyingObject => (
                                <FlyingObject key={flyingObject.id} position={flyingObject.position}/>
                            ))
                        }
                        {
                            this.props.store.cannonBalls.map(cannonBall => (
                                <CannonBall key={cannonBall.id} position={cannonBall.position}/>
                            ))
                        }
                    </g>
                }
                <CannonPipe/>
                <CannonBase/>
            </svg>
        );
    }
}