import * as vmath from 'vmath';
import _closestPoint from './lib';


export default function closestPoint(bezier,point)
{
    const vec2 = vmath.vec2;

    const tmpVecs = bezier.map(() => vec2.create());
    
    const closest = vec2.create();
    
    const relative_position = _closestPoint(closest, bezier.map(p=> vec2.new(p.x,p.y)), vec2.new(point.x, point.y), tmpVecs);

    return {
        relative_position,
        absolute_point: {
            x: closest.x,
            y: closest.y,
        },
    }
}