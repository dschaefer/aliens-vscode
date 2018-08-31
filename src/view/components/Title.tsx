import * as React from 'react';
import { CubicBezierCurve, pathFromBezierCurve } from '../utils/formulas';

const Title = () => {
    const textStyle: React.SVGProps<SVGTextElement> = {
        fontFamily: '"Joti One", cursive',
        fontSize: 120,
        fill: '#cbca62'
    };

    const aliensLineCurve: CubicBezierCurve = {
        initialAxis: {
            x: -190,
            y: -950
        },
        initialControlPoint: {
            x: 95,
            y: -50
        },
        endingControlPoint: {
            x: 285,
            y: -50
        },
        endingAxis: {
            x: 380,
            y: 0
        }
    }

    const goHomeLineCurve: CubicBezierCurve = {
        ...aliensLineCurve,
        initialAxis: {
            x: -250,
            y: -780
        },
        initialControlPoint: {
            x: 125,
            y: -90
        },
        endingControlPoint: {
            x: 375,
            y: -90
        },
        endingAxis: {
            x: 500,
            y: 0
        }
    };

    return (
        <g filter="url(#shadow)">
            <defs>
                <path
                    id="AliensPath"
                    d={pathFromBezierCurve(aliensLineCurve)}
                />
                <path
                    id="GoHomePath"
                    d={pathFromBezierCurve(goHomeLineCurve)}
                />
            </defs>
            <text {...textStyle}>
                <textPath xlinkHref="#AliensPath">
                    Aliens,
                </textPath>
            </text>
            <text {...textStyle}>
                <textPath xlinkHref="#GoHomePath">
                    Go Home!
                </textPath>
            </text>
        </g>
    );
}

export default Title;