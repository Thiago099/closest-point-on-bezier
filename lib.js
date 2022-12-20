//source: https://stackoverflow.com/questions/2742610/closest-point-on-a-cubic-bezier-curve

import * as vmath from 'vmath';

/** Find the ~closest point on a Bézier curve to a point you supply.
 * out    : A vector to modify to be the point on the curve
 * curve  : Array of vectors representing control points for a Bézier curve
 * pt     : The point (vector) you want to find out to be near
 * tmps   : Array of temporary vectors (reduces memory allocations)
 * returns: The parameter t representing the location of `out`
 */
export default function closestPoint(out, curve, pt, tmps) {
    let mindex, scans=25; // More scans -> better chance of being correct
    const vec=vmath['w' in curve[0]?'vec4':'z' in curve[0]?'vec3':'vec2'];
    for (let min=Infinity, i=scans+1;i--;) {
        let d2 = vec.squaredDistance(pt, bézierPoint(out, curve, i/scans, tmps));
        if (d2<min) { min=d2; mindex=i }
    }
    let t0 = Math.max((mindex-1)/scans,0);
    let t1 = Math.min((mindex+1)/scans,1);
    let d2ForT = t => vec.squaredDistance(pt, bézierPoint(out,curve,t,tmps));
    return localMinimum(t0, t1, d2ForT, 1e-4);
}

/** Find a minimum point for a bounded function. May be a local minimum.
 * minX   : the smallest input value
 * maxX   : the largest input value
 * ƒ      : a function that returns a value `y` given an `x`
 * ε      : how close in `x` the bounds must be before returning
 * returns: the `x` value that produces the smallest `y`
 */
function localMinimum(minX, maxX, ƒ, ε) {
    if (ε===undefined) ε=1e-10;
    let m=minX, n=maxX, k;
    while ((n-m)>ε) {
        k = (n+m)/2;
        if (ƒ(k-ε)<ƒ(k+ε)) n=k;
        else               m=k;
    }
    return k;
}

/** Calculate a point along a Bézier segment for a given parameter.
 * out    : A vector to modify to be the point on the curve
 * curve  : Array of vectors representing control points for a Bézier curve
 * t      : Parameter [0,1] for how far along the curve the point should be
 * tmps   : Array of temporary vectors (reduces memory allocations)
 * returns: out (the vector that was modified)
 */
function bézierPoint(out, curve, t, tmps) {
    if (curve.length<2) console.error('At least 2 control points are required');
    const vec=vmath['w' in curve[0]?'vec4':'z' in curve[0]?'vec3':'vec2'];
    if (!tmps) tmps = curve.map( pt=>vec.clone(pt) );
    else tmps.forEach( (pt,i)=>{ vec.copy(pt,curve[i]) } );
    for (var degree=curve.length-1;degree--;) {
        for (var i=0;i<=degree;++i) vec.lerp(tmps[i],tmps[i],tmps[i+1],t);
    }
    return vec.copy(out,tmps[0]);
}
