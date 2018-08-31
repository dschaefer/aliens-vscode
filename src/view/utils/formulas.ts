import { MouseEvent } from 'react';

export interface Point {
    x: number;
    y: number;
}

export interface Rectangle {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export interface CubicBezierCurve {
    initialAxis: Point;
    initialControlPoint: Point;
    endingControlPoint: Point;
    endingAxis: Point;
}

export const pathFromBezierCurve = (cubicBezierCurve: CubicBezierCurve) => {
    return `
        M${cubicBezierCurve.initialAxis.x} ${cubicBezierCurve.initialAxis.y}
        c ${cubicBezierCurve.initialControlPoint.x} ${cubicBezierCurve.initialControlPoint.y}
        ${cubicBezierCurve.endingControlPoint.x} ${cubicBezierCurve.endingControlPoint.y}
        ${cubicBezierCurve.endingAxis.x} ${cubicBezierCurve.endingAxis.y}
    `;
}

export const radiansToDegrees = (radians: number) => ((radians * 180) / Math.PI);

export const calculateAngle = (p1: Point, p2: Point) => {
    if (p2.x >= 0 && p2.y >= 0) {
        return 90;
    } else if (p2.x < 0 && p2.y >= 0) {
        return -90;
    }

    const dividend = p2.x - p1.x;
    const divisor = p2.y - p1.y;
    const quotient = dividend / divisor;
    return radiansToDegrees(Math.atan(quotient)) * -1;
}

export const getCanvasPosition = (event: MouseEvent) => {
    const element = document.getElementById('aliens-go-home-canvas')
    if (!element) {
        return { x: 0, y: 0 };
    }

    const svg: SVGSVGElement = <SVGSVGElement><any> element;
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const matrix = svg.getScreenCTM();
    return matrix ? point.matrixTransform(matrix.inverse()) : { x: 0, y: 0 };
}

export const handleResize = () => {
    const element = document.getElementById('aliens-go-home-canvas')
    if (!element) {
        return;
    }

    const svg: SVGSVGElement = <SVGSVGElement><any> element;
    const parent = svg.parentElement;
    if (parent) {
        const height = window.innerHeight - (parent.clientHeight - svg.clientHeight);
        svg.style.height = `${height}px`;
    }
}

const degreesToRadian = (degrees: number) => ((degrees * Math.PI) / 180);

export const calculateNextPosition = (position: Point, angle: number, divisor = 300): Point => {
  const realAngle = (angle * -1) + 90;
  const stepsX = radiansToDegrees(Math.cos(degreesToRadian(realAngle))) / divisor;
  const stepsY = radiansToDegrees(Math.sin(degreesToRadian(realAngle))) / divisor;
  return {
    x: position.x +stepsX,
    y: position.y - stepsY,
  }
};

export const checkCollision = (rectA: Rectangle, rectB: Rectangle) => (
    rectA.x1 < rectB.x2 && rectA.x2 > rectB.x1 &&
    rectA.y1 < rectB.y2 && rectA.y2 > rectB.y1
);