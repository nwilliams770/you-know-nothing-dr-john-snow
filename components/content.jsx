import React from 'react';
import { feature } from "topojson-client";
import MapModule from './map_module';

class Content extends React.Component {
    constructor() {
        super();
        this.state = {
            houses: {},
            borders: {},
            // houseLabels: {}, houselabels we can extract from houses properties
            roadLabels: {},
            pumps: {},
            deaths: {},
            isDataFetched: false
        }
    }
    componentDidMount() {
        this.getData().then(data => {
            this.setState({
                houses: feature(data[0], data[0].objects.houses).features,
                placeLabels: feature(data[0], data[0].objects.houses).features.filter( d => d.properties.title ),
                borders: feature(data[0], data[0].objects.border).features,
                roadLabels: feature(data[0], data[0].objects.roads).features,
                pumps: data[1],
                deaths: data[2],
                isDataFetched: true
            })
        })
    }
    
    async getData() {
        try {
            let data = await Promise.all([
                fetch('/soho_1854.json').then(response => response.json()),
                fetch('/pumps-topo.json').then(response => response.json()),
                fetch('/deaths-topo.json').then(response => response.json())
            ]);
            return data;
        } catch(err) {
            console.log(`Whoops! Error fetching data: ${err}`);
        }
    }

    render() {
        // This is where we can add a spinner
        if (!this.state.isDataFetched) return null;
        const { houses, borders, roadLabels, placeLabels } = this.state;
        return (
            <MapModule
                houses={houses}
                borders={borders}
                roadLabels={roadLabels}
                placeLabels={placeLabels}

             />
        )
    }
}

export default Content;





// var width = 960,
// height = 800;

// var proj = d3.geoMercator()
// .scale( 43e5 )
// .center([ -0.1376, 51.5131 ])
// .translate([ width/2, height/2 ])
// .clipExtent([ [ 0, 0 ], [ width, height ] ])
// .precision( 0 );

// var path = d3.geoPath()
// .projection( proj );

// var svg = d3.select( 'body' ).append( 'svg' )
// .attr( 'width', width )
// .attr( 'height', height );

// queue()
// .defer( d3.json, './updated-data/soho_1854.json' )
// .await( ready );

// function ready ( err, map, deaths ) {
// if (err) throw err;

// // houses and squares
// svg.append( 'g' )
// .attr( 'class', 'city' )
// .selectAll( 'path' )
//   .data( topojson.feature(map, map.objects.houses).features )
// .enter().append( 'path' )
//   .attr( 'class', d => d.properties.type )
//   .attr( 'd', path );

// // area border
// svg.append( 'g' )
// .attr( 'class', 'border' )
// .selectAll( 'path' )
//   .data( topojson.feature(map, map.objects.border).features )
// .enter().append( 'path' )
//   .attr( 'd', path );

// // houses labels
// svg.append( 'g' )
// .attr( 'class', 'places' )
// .selectAll( 'text' )
//   .data( topojson.feature(map, map.objects.houses).features
//       .filter( d => d.properties.title ) )
// .enter().append( 'text' )
//   .attr( 'dy', '0.32em' )
//   .text( d => d.properties.title )
//   .attr( 'transform', d => `translate(${path.centroid(d)})` );

// // road labels
// svg.append( 'g' )
// .attr( 'class', 'roads' )
// .selectAll( 'text' )
//   .data( topojson.feature(map, map.objects.roads).features )
// .enter().append( 'text' )
//   .text( d => d.properties.title )
//   .attr( 'dy', '0.32em' )
//   .attr( 'transform', d => {
//     var xy = proj( d.geometry.coordinates ),
//         deg = d.properties.angle * (180 / Math.PI);
//     return `translate(${xy}) rotate(${deg})`;
//   });
// }  