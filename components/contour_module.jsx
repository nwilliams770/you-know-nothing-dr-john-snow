import React from 'react';
import { geoMercator, geoPath } from "d3-geo";
import { contours, contourDensity } from 'd3-contour';

class ContourModule extends React.Component {
    projection() {
        const { width, height } = this.props;
        return geoMercator()
            .scale( 43e5 )
            .center([ -0.1376, 51.5131 ])
            .translate([ width/2, height/2 ])
            .clipExtent([ [ 0, 0 ], [ width, height ] ])
            .precision( 0 );
    }

    render() {
        const { deaths, width, height } = this.props;
        const projection = this.projection();
        var deathPos = [];

        deaths.forEach (death => {
            deathPos.push( projection(death.coordinates));
        })
        const test2 = contourDensity()
                        .size([width, height])
                        .bandwidth(20)
                        .thresholds(15)
                    (deathPos)

        // test.forEach(n => console.log(n.coordinates))

        console.log(test2);



        return (
            <g className="contour">
                {
                    test2.map((d, i) => {
                        // console.log(d);
                        return (

                        
                        <path 
                            key={`contour-${i}`}
                            d={geoPath()(d)}
                            fill='transparent'
                            stroke='black'
                            strokeWidth='1px'
                        /> )
                    })
                }
            </g>
        );
    }
}

export default ContourModule;