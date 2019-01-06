import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import style from '../stylesheets/application.scss';

document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("main");
    ReactDOM.render(<App />, main);
});
