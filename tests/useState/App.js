import createElement from "../../src/createElement.js";
import Component from "./Component.js";
import MouseMove from './MouseMove.js';
import Toggle from './Toggle.js';

export default function App(prop) {
    return (
        createElement(Toggle, prop)
    )
};
