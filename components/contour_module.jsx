import React from 'react';
import { geoMercator, geoPath } from "d3-geo";
import contours from 'd3-contour';

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
        const { deaths } = this.props;
        const projection = this.projection();
        var deathPos = [];

        deaths.forEach (death => {
            deathPos.push( projection(death.coordinates));
        })

        // console.log(contours);
        // var contours = contours()
        //     .size([n, m])
        //     .thresholds(d3.range(2, 21).map(p => Math.pow(2, p)))
        //     (deathPos);

        return (
            <g className="contour">
            </g>
        );
    }
}

export default ContourModule;