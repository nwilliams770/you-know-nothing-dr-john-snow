import React from 'react';
import { geoPath } from "d3-geo";
import { contourDensity } from 'd3-contour';
import { scaleSequential } from 'd3-scale';
import { interpolateViridis} from 'd3-scale-chromatic';

class DensityContour extends React.Component {
    active () {
        const { activeOverlay } = this.props;
        if (activeOverlay == "contour-fill") return " show";
        if (activeOverlay == "contour-outline") return " show outlines";
        return "";
    }

    render() {
        const { deathCoords, width, height } = this.props;
        const contours = contourDensity()
                        .size([width, height])
                        .bandwidth(24)
                        .thresholds(14)
                        (deathCoords);
        // const color = scaleLinear()
        //                 .domain([0, 0.003, 0.05])
        //                 .range(["transparent", "red", "blue"]);

        var color = scaleSequential(interpolateViridis)
                    .domain([0, 0.01]);    
        return (
            <g className={'contour' + `${this.active()}`}>
                {
                    contours.map((d, i) => (
                        <path 
                            key={`contour-${i}`}
                            d={geoPath()(d)}
                            fill={color(d.value)}
                        /> 
                    ))
                }
            </g>
        )
    }
}

export default DensityContour;