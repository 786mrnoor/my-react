import diff from "./diff.js";
import render from "./render.js";
import cleanup from "./utils/cleanup.js";

export default function createRoot(root) {
    let component;
    return {
        render(nextComponent) {
            if (component) {
                component = diff(component, nextComponent);
            }
            else {
                const node = render(nextComponent);
                root.appendChild(node);
                component = nextComponent;
                console.log(component);
            }
        },
        unmount() {
            if (typeof component.type === 'function') {
                cleanup(component);
                component.component.node.remove();
            }
            else {
                component.node.remove();
            }
            component = null;
        }
    }
}