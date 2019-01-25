import React from 'react';
import { geoMercator, geoPath } from "d3-geo";

// To-do:
//  - Add legend
const Map =  ({ houses, borders, roadLabels, placeLabels, pumps, deaths, mapProjection }) => (
        <g className='map-module'>
            <g className='city'>
                {
                    houses.map((d, i) => (
                        <path
                            key={`city-${i}`}
                            d={geoPath().projection(mapProjection)(d)}
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
                            d={geoPath().projection(mapProjection)(d)}
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
                            transform={`translate(${geoPath().projection(mapProjection).centroid(d)})`}
                        >
                        {d.properties.title}
                        </text>
                    ))
                }
            </g>
            <g className='roads' >
                {
                    roadLabels.map((d, i) => {
                        let xy = mapProjection(d.geometry.coordinates)
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
            <g className='deaths'>
                {
                    deaths.map((d, i) => (
                        <circle
                            key={`death-${i}`}
                            r={2}
                            transform={`translate(${mapProjection(d.coordinates)})`}
                        />
                    ))      
                }
            </g>
            <g className='pumps'>
                {
                    pumps.map((d, i) => (
                        <rect
                            // the name of the pump
                            key={`${d.properties.title}`}
                            data-title={`${d.properties.title}`}
                            width={9}
                            height={9}
                            transform={`translate(${mapProjection(d.geometry.coordinates)}) rotate(45)`}
                        />
                    ))
                }
            </g>
            <g className='legend' transform={'translate(15,15)'}>
                
            </g>
        </g>
)


export default Map;