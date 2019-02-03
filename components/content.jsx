import React from 'react';
import { feature } from 'topojson-client';
import { geoMercator } from 'd3-geo';
import MapModule from './map_module';
import SelectorModule from './selector_module';

class Content extends React.Component {
    constructor() {
        super();
        this.state = {
            houses: {},
            borders: {},
            roadLabels: {},
            pumps: {},
            deaths: {},
            isDataFetched: false,
            activeOverlay: null,
        }
        this.updateActiveOverlay = this.updateActiveOverlay.bind(this);
    }

    componentDidMount() {
        this.getData().then(data => {
            this.setState({
                houses: feature(data[0], data[0].objects.houses).features,
                placeLabels: feature(data[0], data[0].objects.houses).features.filter( d => d.properties.title ),
                borders: feature(data[0], data[0].objects.border).features,
                roadLabels: feature(data[0], data[0].objects.roads).features,
                pumps: feature(data[0], data[0].objects.pumps).features,
                pumpCoords: this.calcProjectionCoords(feature(data[0], data[0].objects.pumps).features),
                deaths: data[2].objects.deaths.geometries,
                deathCoords: this.calcProjectionCoords(data[2].objects.deaths.geometries),
                isDataFetched: true
            })
        })
    }
    
    async getData() {
        try {
            let data = await Promise.all([
                fetch('https://nwilliams770.github.io/you-know-nothing-dr-john-snow/data/soho_1854.json').then(response => response.json()),
                fetch('https://nwilliams770.github.io/you-know-nothing-dr-john-snow/data/pumps-topo.json').then(response => response.json()),
                fetch('https://nwilliams770.github.io/you-know-nothing-dr-john-snow/data/deaths-topo.json').then(response => response.json())
            ]);
            return data;
        } catch(err) {
            console.log(`Whoops! Error fetching data: ${err}`);
        }
    }

    updateActiveOverlay(dropdownInput) {
        dropdownInput.value == null ? this.setState({activeOverlay: null}) : this.setState({activeOverlay: dropdownInput.value})
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

    // Returns projected points from array of points
    calcProjectionCoords(points) {
        const projection = this.projection();
        return (points.map(point => {
            if ('geometry' in point) {
                return (projection(point.geometry.coordinates))
            }
            return (projection(point.coordinates))
        })
        )
    }

    render() {
        // **
        if (!this.state.isDataFetched) return ('');
        const width = 960
            , height = 800;
        const mapProjection = this.projection();
        return (
            <div className='content'>
                <SelectorModule
                    activeOverlay={this.state.activeOverlay}
                    updateActiveOverlay={this.updateActiveOverlay}
                 />
                <MapModule
                    mapProjection={mapProjection}
                    width={width}
                    height={height}
                    {...this.state}
                />
            </div>
        )
    }
}

export default Content;