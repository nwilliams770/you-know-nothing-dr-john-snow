import React from 'react';
import { geoMercator, geoPath } from "d3-geo";

// To-do:
//  - Add legend
//  - refactor to a functional component? There is not really any state
// refer to this https://medium.com/@thechrisbull/4-different-kinds-of-components-creating-a-react-ui-component-framework-saga-a-designer-9043c0cc597

class MapModule extends React.Component {
    constructor(props) {
        super(props);
    }

    projection() {
        const { width, height } = this.props;
        return geoMercator()
            .scale( 43e5 )
            .center([ -0.1376, 51.5131 ])
            .translate([ width/2, height/2 ])
            .clipExtent([ [ 0, 0 ], [ width, height ] ])
            .precision( 0 );
    }

    render () {
        const { houses, borders, roadLabels, placeLabels, pumps, deaths } = this.props;
        return (
            <g className='map-module'>
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
                <g className='border' >
                    {
                        borders.map((d, i) => (
                            <path
                                key={`border-${i}`}
                                d={geoPath().projection(this.projection())(d)}
                            />
                        ))
                    }
                </g>
                <g className='places' >
                    {
                        placeLabels.map((d, i) => (
                            <text
                                key={`place-${i}`}
                                dy='0.32em'
                                transform={`translate(${geoPath().projection(this.projection()).centroid(d)})`}
                            >
                            {d.properties.title}
                            </text>
                        ))
                    }
                </g>
                <g className='roads' >
                    {
                        roadLabels.map((d, i) => {
                            let xy = this.projection()(d.geometry.coordinates)
                            , deg = d.properties.angle * (180 / Math.PI);
                            return (
                                <text
                                    key={`road-${i}`}
                                    dy='0.32em'
                                    transform={`translate(${xy}) rotate(${deg})`}
                                >
                                {d.properties.title}
                                </text>
                            )  
                        })
                    }
                </g>
                <g className='pumps'>
                    {
                        pumps.map((d, i) => (
                            <rect
                                // the name of the pump
                                key={`${d.properties.title}`}
                                width={9}
                                height={9}
                                transform={`translate(${this.projection()(d.geometry.coordinates)}) rotate(45)`}
                            />
                        ))
                    }
                </g>
                <g className='deaths'>
                    {
                        deaths.map((d, i) => (
                            <circle
                                key={`death-${i}`}
                                r={2}
                                transform={`translate(${this.projection()(d.coordinates)})`}
                            />
                        ))      
                    }
                </g>
                <g className='legend' transform={'translate(15,15)'}>
                    
                </g>
            </g>
        )
    }
}

export default MapModule;