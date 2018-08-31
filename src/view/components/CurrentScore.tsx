import * as React from 'react';
import { gameWidth } from '../utils/constants';
import { Store } from '../store';
import { inject, observer } from 'mobx-react';

interface CurrentScoreProps {
    store?: Store;
}

const CurrentScore = inject('store')(observer((props: CurrentScoreProps) => {
    const scoreStyle: React.CSSProperties = {
        fontFamily: '"Joti One", cursive',
        fontSize: 80,
        fill: '#d6d33e'
    };

    return (
        <g filter="url(#shadow)">
            <text
                style={scoreStyle}
                x={gameWidth - 300}
                y="80"
            >
                {(props.store && props.store.kills) || 0}
            </text>
        </g>
    )
}));

export default CurrentScore;