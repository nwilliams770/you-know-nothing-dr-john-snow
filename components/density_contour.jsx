import React from 'react';
import { geoPath } from "d3-geo";
import { contourDensity } from 'd3-contour';

// TO DO: Refactor to a different style component, do we need to create a class? REFER TO MAP for more info

class DensityContour extends React.Component {
    active () {
        const { activeOverlay } = this.props;
        return activeOverlay == "contour";
    }

    render() {
        if (!this.active()) return null;
        const { deathCoords, width, height } = this.props;
        const contours = contourDensity()
                        .size([width, height])
                        .bandwidth(20)
                        .thresholds(15)
                    (deathCoords)
        return (
            <g className="contour">
                {
                    contours.map((d, i) => (
                        <path 
                            key={`contour-${i}`}
                            d={geoPath()(d)}
                            fill='transparent'
                            stroke='black'
                            strokeWidth='1px'
                        /> 
                    ))
                }
            </g>
        )
    }
}

export default DensityContour;