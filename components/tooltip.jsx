import React from 'react';

export function showPumpTooltip(evt) {
    const tooltip = document.querySelector(".tooltip");
    tooltip.innerHTML = evt.target.dataset.title.replace("/", "X");
    tooltip.style.display = "block";
    tooltip.style.left = evt.pageX + 10 + 'px';
    tooltip.style.top = evt.pageY - 25 + 'px';
}

export function showVoronoiTooltip(evt) {
    // CSS :hover was jerky, trying this for a cleaner UX
    const cell = evt.target;
    cell.style.fill = "#888888";
    cell.style.fillOpacity = "0.3";

    const tooltip = document.querySelector(".tooltip");
    const deathCount = tooltip.childNodes[0];
    const copy = tooltip.childNodes[1];
    tooltip.classList.add("voronoi-format");
    deathCount.innerHTML = evt.target.dataset.deaths;
    copy.innerHTML = evt.target.dataset.deaths != 1 ? "deaths from Cholera" : "death from Cholera";

    tooltip.style.display = "block";
    tooltip.style.left = evt.pageX + 10 + 'px';
    tooltip.style.top = evt.pageY - 25 + 'px';
    return
}
  
export function hideTooltip(evt) {
    const tooltip = document.querySelector(".tooltip");
    tooltip.style.display = "none";

    // if a Voronoi tooltip, must revert cell fill back
    if (evt.target.dataset.hasOwnProperty("deaths")) {
        evt.target.style.fill = "transparent";
        tooltip.classList.remove("voronoi");

    }
    return
}

const Tooltip = () => (
    <div className="tooltip"><h2 className="voronoi-count"></h2><p></p></div>
)

export default Tooltip;