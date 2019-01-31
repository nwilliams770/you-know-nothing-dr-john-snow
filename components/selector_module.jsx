import React from 'react';
import Select from 'react-select';

const SelectorModule = props => {
    const options =[ { value: 'voronoi', label:'Voronoi diagram'}, {value: 'contour-fill', label: 'Density contours (heatmap)'}, {value: 'contour-outline', label: 'Density contours (outlines)'}, {value: null, label: 'None'} ]
    return (
        <div className='selector module'>
            <Select
            options={options}
            className='basic-single'
            classNamePrefix='select'
            autosize={false}
            placeholder='Select overlay...'
            onChange={ input => props.updateActiveOverlay(input) }
            />
        </div>
    )
}

export default SelectorModule;