import React from 'react';
import Map from './map';
import Voronoi from './voronoi';
import DensityContour from './density_contour';

const MapModule = props => {
    const { houses, borders, roadLabels, placeLabels, pumps, deaths, pumpCoords, deathCoords, width, height, mapProjection, activeOverlay } = props;
    return (
        <svg id="vis" width={`${width}`} height={`${height}`} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
            <Map
                houses={houses}
                borders={borders}
                roadLabels={roadLabels}
                placeLabels={placeLabels}
                pumps={pumps}
                deaths={deaths}
                width={width}
                height={height}
                mapProjection={mapProjection}
            />
            <Voronoi
                width={width}
                height={height}
                pumpCoords={pumpCoords}
                deathCoords={deathCoords}
                activeOverlay={activeOverlay}
            />
            <DensityContour
                deathCoords={deathCoords}
                width={width}
                height={height}
                activeOverlay={activeOverlay}
            />
        </svg>
    )
}

export default MapModule;