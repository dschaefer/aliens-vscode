import { observable, action } from 'mobx';
import { Point, calculateAngle, calculateNextPosition, Rectangle, checkCollision } from './utils/formulas';
import { flyingObjectsStarterYAxis, maxFlyingObjects, flyingObjectsStarterPositions, createInterval, gameHeight } from './utils/constants';

class FlyingObject {
    position: Point;
    createdAt = new Date().getTime();

    constructor() {
        const predefinedPosition = Math.floor(Math.random() * maxFlyingObjects);
        const flyingObjectPosition = flyingObjectsStarterPositions[predefinedPosition];
        this.position = {
            x: flyingObjectPosition,
            y: flyingObjectsStarterYAxis
        }
    }

    get id() {
        return this.createdAt;
    }
}

class CannonBall {
    position: Point = { x: 0, y: 0 };
    angle: number;
    id = new Date().getTime();

    constructor(mousePosition: Point) {
        this.angle = calculateAngle({ x: 0, y: 0 }, mousePosition);
    }

    next() {
        this.position = calculateNextPosition(this.position, this.angle, 5);
        return this.position.x < gameHeight;
    }
}

export class Store {
    @observable angle = 45;
    @observable started = false;
    @observable kills = 0;
    @observable lives = 3;
    @observable flyingObjects: FlyingObject[] = [];
    @observable cannonBalls: CannonBall[] = [];

    private lastCreatedAt = new Date().getTime();
   
    setAngle(mousePosition: Point) {
        this.angle = calculateAngle({ x: 0, y: 0 }, mousePosition);
    }

    createFlyingObject() {
        const now = new Date().getTime();
        this.flyingObjects = this.flyingObjects.filter(flyingObject => now - flyingObject.createdAt < 4000);
        if (this.flyingObjects.length < maxFlyingObjects
            && now - this.lastCreatedAt > createInterval) {
                const newFlyingObject = new FlyingObject();
                this.flyingObjects.push(newFlyingObject);
                this.lastCreatedAt = newFlyingObject.createdAt;
        }
    }

    @action
    moveCannonBalls() {
        const finished: number[] = [];
        this.cannonBalls.forEach(cannonBall => {
            if (!cannonBall.next()) {
                finished.push(cannonBall.id);
            }
        });

        if (finished.length > 0) {
            this.cannonBalls = this.cannonBalls.filter(cannonBall => finished.indexOf(cannonBall.id));
        }
    }

    shoot(mousePosition: Point) {
        this.cannonBalls.push(new CannonBall(mousePosition));
    }

    checkCollisions() {
        const destroyedFlyingObjects: number[] = [];
        const destroyedCannonBalls: number[] = [];
        this.flyingObjects.forEach(flyingObject => {
            const currentLifeTime = new Date().getTime() - flyingObject.createdAt;
            const calculatedPosition: Point = {
                x: flyingObject.position.x,
                y: flyingObject.position.y + ((currentLifeTime / 4000) * gameHeight)
            };
            const rectA: Rectangle = {
                x1: calculatedPosition.x - 40,
                y1: calculatedPosition.y - 10,
                x2: calculatedPosition.x + 40,
                y2: calculatedPosition.y + 10
            };

            this.cannonBalls.forEach(cannonBall => {
                const rectB: Rectangle = {
                    x1: cannonBall.position.x - 8,
                    y1: cannonBall.position.y - 8,
                    x2: cannonBall.position.x + 8,
                    y2: cannonBall.position.y + 8
                }

                if (checkCollision(rectA, rectB)) {
                    destroyedFlyingObjects.push(flyingObject.id);
                    destroyedCannonBalls.push(cannonBall.id);
                }
            });
        });

        this.flyingObjects = this.flyingObjects.filter(flyingObject => destroyedFlyingObjects.indexOf(flyingObject.id));
        this.cannonBalls = this.cannonBalls.filter(cannonBall => destroyedCannonBalls.indexOf(cannonBall.id));
        this.kills += destroyedFlyingObjects.length;
    }
}