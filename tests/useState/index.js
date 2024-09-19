import { createElement, createRoot } from "../../index.js";
import App from "./App.js";

const root = createRoot(document.getElementById('root'));
root.render(createElement(App));

// const root2 = createRoot(document.getElementById('root2'));
// root2.render(createElement(App));


document.getElementById('remove-all-btn').addEventListener('click', () => {
    root.unmount();
    // root2.unmount();
})