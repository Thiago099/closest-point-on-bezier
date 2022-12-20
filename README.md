# closest-point-on-bezier

Given a bezier curve and a point, finds which point in the curve is closest to the given point

## usage:
```js
import closestPoint from "closest-point-on-bezier";

const {relative_position, absolute_point} = closestPoint(
    [
        {x:20,y:20},
        {x:20,y:100},
        {x:200,y:100},
        {x:200,y:20}
    ],
    {x:offsetX,y:offsetY}
)
```

## result:
```ts
{
relative_position : number, // the relative position of the point on the curve (0 - 1)
absolute_point: { // the absolute position of the point(x, y)
    x : number,
    y : number
},
```


example of what data this program cauculates

![image](https://user-images.githubusercontent.com/66787043/208670789-fa2299ea-219a-49ea-88a9-5a2fecf75560.png)
