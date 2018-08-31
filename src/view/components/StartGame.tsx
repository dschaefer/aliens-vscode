import * as React from 'react';
import { inject } from 'mobx-react';
import { gameWidth } from '../utils/constants';
import { Store } from '../store';


interface StartGameProps {
    store?: Store;
}

@inject('store')
export default class StartGame extends React.Component<StartGameProps> {
    onClick() {
        if (this.props.store) {
            this.props.store.started = true;
        }
    }

    render() {
        const button: React.SVGProps<SVGRectElement> = {
            x: gameWidth / -2,
            y: -280,
            width: gameWidth,
            height: 200,
            rx: 10,
            ry: 10,
            style: {
                fill: 'transparent',
                cursor: 'pointer'
            },
            onClick: () => this.onClick()
        };

        const text: React.SVGProps<SVGTextElement> = {
            textAnchor: 'middle',
            x: 0,
            y: -150,
            style: {
                fontFamily: '"Joti One", cursive',
                fontSize: 60,
                fill: '#e3e3e3',
                cursor: 'pointer'
            },
            onClick: () => this.onClick()
        };

        return (
            <g filter="url(#shadow)">
                <rect {...button}/>
                <text {...text}>
                    Tap To Start!
                </text>
            </g>
        );
    }
}