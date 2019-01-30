import React from 'react';
import { Delaunay } from 'd3-delaunay';
import { showVoronoiTooltip, hideTooltip } from './tooltip';

class Voronoi extends React.Component {
    calcDeathsPerCell(delaunay, coords, numCells) {
        const deathsPerCell = {};
        for (let i = 0; i <= numCells; i ++) {
            deathsPerCell[i] = 0;
        }

        coords.forEach(coord => {
            // for given point, returns index of cell where it exists
            deathsPerCell[delaunay.find(coord[0],coord[1])] += 1;
        })
        return deathsPerCell;
    }

    calcPolygonPaths(voronoi, numCells) {
        const polygonPaths = {};
        for (let i = 0; i <= 12; i++) {
            polygonPaths[i] = voronoi.renderCell(i);
        }
        return polygonPaths;
    }

    active () {
        const { activeOverlay } = this.props;
        return activeOverlay == "voronoi" ? " show" : ""
    }

    render() {
        const { width, height, pumpCoords, deathCoords } = this.props;
        // minus 1 for 0-indexing
        const numCells = pumpCoords.length - 1;
        const delaunay = Delaunay.from(pumpCoords);
        // translate to -1, -1 to prevent overlap of cell borders and vis border
        const voronoi = delaunay.voronoi([-1,-1,width,height]);

        const deathsPerCell = this.calcDeathsPerCell(delaunay, deathCoords, numCells);
        const polygonPaths = this.calcPolygonPaths(voronoi, numCells);

        return (
            <g className={"voronoi" + `${this.active()}`}>
                    {
                        Object.values(polygonPaths).map((d, i) => (
                            <path
                                key={`voronoi-${i}`}
                                d={`${d}`}
                                data-deaths={`${deathsPerCell[i]}`}
                                data-i={`${i}`}
                                onMouseOver={showVoronoiTooltip}
                                onMouseMove={showVoronoiTooltip}
                                onMouseLeave={hideTooltip}
                            />
                        ))
                    }
            </g>
        )
    }
}

export default Voronoi;

