export default function createElement(type, props, ...children) {
    for (let i in children) {
        if (typeof children[i] === 'string' || typeof children[i] === 'number') {
            children[i] = {
                type: 'text',
                value: children[i]
            }
        }
    }
    let component = {
        type,
        props: props || {},
        children
    }
    if (typeof type === 'function') {
        component.cache = [];
        component.effects = [];
        component.component = null;
        component.depth = null;
        component.shouldUpdate = false;
    }
    return component;
}