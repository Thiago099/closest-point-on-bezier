# closest-point-on-bezier

Given a bezier curve and a point, finds which point in the curve is closest to the given point

usage:
```js
import closestPoint from "closest-point-on-bezier";

const {curve_position, closest_point} = closestPoint(
    [
        {x:20,y:20},
        {x:20,y:100},
        {x:200,y:100},
        {x:200,y:20}
    ],
    {x:offsetX,y:offsetY}
)
```


example of what data this program cauculates

![image](https://user-images.githubusercontent.com/66787043/208670789-fa2299ea-219a-49ea-88a9-5a2fecf75560.png)
