import React from 'react';
import { geoMercator, geoPath, centroid, geoProjection } from "d3-geo";

class MapModule extends React.Component {
    constructor(props) {
        super(props);
    }

    projection() {
        const width = 960
            , height = 800;
        return geoMercator()
            .scale( 43e5 )
            .center([ -0.1376, 51.5131 ])
            .translate([ width/2, height/2 ])
            .clipExtent([ [ 0, 0 ], [ width, height ] ])
            .precision( 0 );
    }

    render () {
        const { houses, borders, roadLabels, placeLabels } = this.props;
        return (
            <svg width={ 960 } height={ 800 } viewBox='0 0 960 800'>
                <g className='city'>
                    {
                        houses.map((d, i) => (
                            <path
                                key={`city-${i}`}
                                d={geoPath().projection(this.projection())(d)}
                                className={ d.properties.type }
                            />
                        ))
                    }
                </g>
                <g className="border" >
                    {
                        borders.map((d, i) => (
                            <path
                                key={`border-${i}`}
                                d={geoPath().projection(this.projection())(d)}
                            />
                        ))
                    }
                </g>
                <g className="places" >
                    {
                        placeLabels.map((d, i) => (
                            <text
                                key={`place-${i}`}
                                dy="0.32em"
                                transform={`translate(${geoPath().projection(this.projection()).centroid(d)})`}
                            >
                            {d.properties.title}
                            </text>
                                
                        ))
                    }
                </g>
                <g className="roads" >
                    {
                        roadLabels.map((d, i) => {
                            let xy = this.projection()(d.geometry.coordinates)
                            , deg = d.properties.angle * (180 / Math.PI);
                            console.log(xy);
                            console.log(deg);
                            return (
                            <text
                                key={`road-${i}`}
                                dy="0.32em"
                                transform={`translate(${xy}) rotate(${deg})`}
                            >
                            {d.properties.title}
                            </text>
                            )  
                        })
                    }
                </g>
            </svg>
        )
    }
}

export default MapModule;

