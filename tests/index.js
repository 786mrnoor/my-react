import { createElement, createRoot } from "../index.js";
import App from "./Component.js";

const root = createRoot(document.getElementById('root'));
const root2 = createRoot(document.getElementById('root-2'));
root.render(createElement(App, { propCount: 10 }));
root2.render(createElement(App, { propCount: 10 }));


let propCount = 0;
document.getElementById('btn-prop').addEventListener('click', () => {
    propCount++;
    root.render(createElement(App, { propCount }));
    root2.render(createElement(App, { propCount }));
})

document.getElementById('remove-all-btn').addEventListener('click', () => {
    root.unmount();
    root2.unmount();
})