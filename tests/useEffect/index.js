import { createElement, createRoot } from "../../index.js";
import App from "./Component.js";

const root = createRoot(document.getElementById('root'));
root.render(createElement(App));


document.getElementById('remove-all-btn').addEventListener('click', () => {
    root.unmount();
})