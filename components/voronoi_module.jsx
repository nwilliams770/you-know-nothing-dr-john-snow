import React from 'react';
import { Delaunay } from 'd3-delaunay';
import { voronoi } from 'd3-voronoi';
import { geoMercator, geoPath } from "d3-geo";

import { geom } from 'd3-3';


class VoronoiModule extends React.Component {
    constructor(props) {
        super(props);
    }

    // projection() {
    //     const { width, height } = this.props;
    //     return voronoi().extent([0,0], [width, height]);
    // }

    projection() {
        const { width, height } = this.props;
        return geoMercator()
            .scale( 43e5 )
            .center([ -0.1376, 51.5131 ])
            .translate([ width/2, height/2 ])
            .clipExtent([ [ 0, 0 ], [ width, height ] ])
            .precision( 0 );
    }

    round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    roundPoints(pumps) {
        const points = pumps.map((pump) => {
            let point = []
            point[0] = this.round(pump.geometry.coordinates[0], 5)
            point[1] = this.round(pump.geometry.coordinates[1], 5)
            return point 
        })
        return points
    }
    
    render() {
        // TO-DO refactor and clean up
        const { width, height } = this.props;
        const { pumps, testPumps, deaths } = this.props;
        var projection = this.projection();
        var pumpPos = [];
        var deathPos = [];


        pumps.forEach (pump => {
            pumpPos.push( projection(pump.geometry.coordinates));
        })

        deaths.forEach (death => {
            deathPos.push( projection(death.coordinates));
        })

  
        const delaunay = Delaunay.from(pumpPos);
        const voronoi = delaunay.voronoi([0,0,width,height]);
        const polygons = voronoi.render();

        const polygonPaths = {};

        const deathsPerCell = {}
        Array(12).forEach(i => deathsPerCell[i] = 0)

        deathPos.forEach(death => {
            deathsPerCell[delaunay.find(death[0],death[1])] += 1;
        })

        for (let i = 0; i <= 12; i++) {
            polygonPaths[i] = voronoi.renderCell(i);
        }


        

        // console.log(Object.keys(polygonPaths));

        // let cellPoly = voronoi.cellPolygons();

        // console.log(cellPoly);
        // *****************

        // const vectors = voronoi.vectors;

        // console.log(vectors);
        // const polygonsCoord = polygons.map(function(pol){
        //     return pol.map(function(el){
        //       return projection.invert(el);
        //     });
        //   });

        //   console.log(polygonsCoord);

        // const polygons = diagram.polygons();

        // console.log(diagram);

        // const voronoi = this.projection();
        // console.log(voronoi);
        // const voronoi = voronoi.voronoi().extent([0,0], [width, height])
        // // const polygons = voronoi().extent([0,0], [width, height]).polygons(points);
        // console.log(voronoi);


        // let polygons = this.projection().polygons(points);
        // console.log(polygons);
        return (
            <g className="voronoi">
                    {
                        Object.values(polygonPaths).map((d, i) => (
                            <path
                                key={`voronoi-${i}`}
                                d={`${d}`}
                                stroke="black"
                                fill="transparent"
                                data-deaths={`${deathsPerCell[i]}`}
                                data-i={`${i}`}
                            />
                        ))
                    }
                {/* <path d={`${polygons}`} fill="transparent" stroke="black"/> */}
            </g>
        )

    }
}


export default VoronoiModule;

