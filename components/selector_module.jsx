import React from 'react';
import Select from 'react-select';

const SelectorModule = props => {
    // const { options, defaultValue }= props;
    const options =[ { value: "voronoi", label:"Voronoi diagram"}, {value: "contour", label: "Density contours"}, {value: null, label: "None"} ]
    return (
        <div>
        <Select
        options={options}
        // defaultValue={defaultValue}
        className='basic-single'
        classNamePrefix='select'
        // isSearchable={true}
        autosize={false}
        onChange={ input => props.updateActiveOverlay(input) }
        />
        </div>
    )
}

export default SelectorModule;