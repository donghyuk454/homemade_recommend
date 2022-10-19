import React, {Component} from 'react';
import { useLocation } from "react-router-dom"

function Menu() {
    const location = useLocation();
    console.log(location.state);

    const data = location.state;

    return (
        <div className="App">
            <h1>hi</h1>
            hi
        </div>
    );
}

export default Menu;