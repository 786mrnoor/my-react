import state from "./global.js";
import setProps from "./utils/setProps.js";

export default function render(component) {

    if (component.type === 'text') {
        let elem = document.createTextNode(String(component.value));
        component.node = elem;
        return elem;
    }
    if (typeof component.type === 'function') {
        return renderFunction(component);
    }

    const elem = document.createElement(component.type);
    component.node = elem;
    setProps(elem, component.props);

    const children = component.children;
    for (let i in children) {
        let c = render(children[i]);
        elem.appendChild(c);
    }
    return elem;
}

function renderFunction(functionComponent) {
    state.id = 0;
    state.effectId = 0;
    state.component = functionComponent;

    const component = functionComponent.type(functionComponent.props);
    const node = render(component);
    functionComponent.component = component;

    functionComponent.effects.forEach(e => e.cleanup = e.callback());
    return node;
}