# you-know-nothing-dr-john-snow
Contrary to this Game of Thrones-inspired project title, [Dr. John Snow](https://en.wikipedia.org/wiki/John_Snow) was in fact quite knowledgeable and vastly modernized anaesthesia, epidemiology, and public health. During an outbreak of cholera in the Soho neighborhood of London in 1854, Snow was skeptical of the pervasive [miasma theory](https://en.wikipedia.org/wiki/Miasma_theory) and hypothesized an agent in contaminated water was the true cause of the outbreak. He explored his theory by drawing a map of the area and mapping all cholera fatalities and public water pumps within the area. 

Many thanks to [Borgar](https://github.com/borgar) for map topoJSON

### Features
- SVG map of Soho neighborhood with mapped cholera fatalities and public water pumps
- Dropdown to toggle data analysis overlays
- Voronoi diagram where water pump positions serve as generators
- Heatmap and density contour of cholera fatalities
- Tooltip detailing the number of cholera fatalities per Voronoi cell and details of public water pumps

### Technologies
- D3 (contour, delaunay, geo, scale, scale-chromatic)
- React
- HTML5
- CSS5
- Sass
- Webpack
- Babel
- ES6
- TopoJSON-Client
- React-Select
- Express

## Component Structure
### D3, React, Component Reusability
Multiple D3 libraries I employed in this project directly access or mutate the DOM and therefore could cause issues with React integration, particularly with re-renders. Although this particular visualization does not have any case that would require a full re-render, I still structured my components in a 'React-y' fashion to take full advantage of the expressiveness of JSX and relinquish control of the DON to React.

- D3 is used for any visualization-related logic within components, returning generated SVG paths that are declared using JSX. 
- Because of this structure, with minor tweaking of expected props, each visualization component can be reused independently with the ability to handle state changes and re-renders if the need arises.
- `<Content>` contains the main logic to fetch and extract desired features asynchronously, passing them down to the appropriate components.
- `<SelectorModule>` is responsible for toggling the voronoi diagram (`<Voronoi>`) and density contour (`<DensityContour>`) components via a `activeOverlay` prop. Both `<Voronoi>` and `<DensityContour>` could be implemented as functional components but are implemented as class components as they must maintain a local state for the toggling functionality.

## Setup
- `$ npm install` to install dependencies
- `$npm start` to start Express server
- open in browser `http://localhost:8080`
