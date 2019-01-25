import React from 'react';
import { feature } from "topojson-client";
import { geoMercator } from "d3-geo";
import MapModule from './map_module';
import SelectorModule from './selector_module';


// Add projection
// Pass pre-processed data (add method to extract Coordinates)
// Add ability to turn off and on other modules

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
                fetch('/soho_1854.json').then(response => response.json()),
                fetch('/pumps-topo.json').then(response => response.json()),
                fetch('/deaths-topo.json').then(response => response.json()),
                fetch('/test.json').then(response => response.json())

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
            if ("geometry" in point) {
                return (projection(point.geometry.coordinates))
            }
            return (projection(point.coordinates))
        })
        )
    }

    render() {
        // This is where we can add a spinner
        // TO DO: Perhaps this is where we should add the projection, and then just pass it down
        //  perhaps pass an options hash with the proection, width, height
        if (!this.state.isDataFetched) return (<div>I'm a spinner!</div>);
        const width = 960
            , height = 800;
        const mapProjection = this.projection();
        return (
            <div className="content">
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

            // To-do:
            // We want to have all the elements in the same bounding box
            // So in content, we can have an svg wrapper, and moodules will just return wrapped
            // in a <g> tag, which is just the div of svgs
            // Maybe just pass {...this.state}? 
        )
    }
}

export default Content;