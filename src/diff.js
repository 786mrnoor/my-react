import state from "./global.js";
import render from "./render.js";
import cleanup from "./utils/cleanup.js";
import dependenciesChanged from "./utils/dependenciesChanged.js";
import propsChanged from "./utils/propsChanged.js";

export default function diff(component, newComponent) {
    //if both are same type
    if (component.type === newComponent.type) {

        // if both are text node
        if (component.type === 'text') {
            // if text changes
            if (component.value !== newComponent.value) {
                component.value = newComponent.value;
                component.node.nodeValue = newComponent.value;
            }
            return component;
        }
        // if it is a function
        else if (typeof component.type === 'function') {
            // check new Component props with old Component prop
            let isChanged = propsChanged(component.props, newComponent.props);

            // if props are changed, change the component prop and diff the function again
            if (isChanged) {
                component.props = newComponent.props;
                diffFunctionComponent(component);
            }
            return component;
        }

        else {
            // attributes
            diffAttributes(component.node, component.props, newComponent.props);

            const { children: newChildren } = newComponent;
            const { children: oldChildren } = component;
            // both component have same children length
            if (oldChildren.length === newChildren.length) {
                for (let i in oldChildren) {
                    oldChildren[i] = diff(oldChildren[i], newChildren[i]);
                }
                return component;
            }
            // if old Children are higher
            else if (oldChildren.length > newChildren.length) {
                for (let i in newChildren) {
                    oldChildren[i] = diff(oldChildren[i], newChildren[i]);
                }

                let i = newChildren.length;
                while (oldChildren[i]) {
                    if (typeof oldChildren[i].type === 'function') {
                        oldChildren[i].node.node.remove();
                    } else {
                        console.log(oldChildren[i]);

                        oldChildren[i].node.remove();
                    }
                    oldChildren.splice(i, 1);
                }
                return component;
            }
            else {
                for (let i in oldChildren) {
                    oldChildren[i] = diff(oldChildren[i], newChildren[i]);
                }

                let i = oldChildren.length;
                while (newChildren[i]) {

                    let elem = render(newChildren[i]);
                    component.node.appendChild(elem);
                    component.children.push(newChildren[i]);
                    i++;
                }
                return component;
            }
        }
        return component;
    }
    else {
        const elem = render(newComponent);

        if (typeof component.type === 'function') {
            cleanup(component);
            component.component.node.replaceWith(elem);
            return newComponent;
        }
        else {
            component.node.replaceWith(elem);
            return newComponent;
        }
    }
};

export function diffFunctionComponent(functionComponent) {
    state.id = 0;
    state.effectId = 0;
    state.component = functionComponent;
    let oldEffects = [...functionComponent.effects];

    const component = functionComponent.type(functionComponent.props);
    diff(functionComponent.component, component);

    functionComponent.effects.forEach((effect, i) => {
        effect.cleanup = oldEffects[i].cleanup;
        let hasChanged = !effect.dependencies || dependenciesChanged(effect.dependencies, oldEffects[i].dependencies);
        if (hasChanged) {
            effect.cleanup && effect.cleanup();
            effect.cleanup = effect.callback();
        }
    });
}

function diffAttributes(elem, prev, next) {
    for (let k in next) {
        // if the attribute value is not same
        if (next[k] !== prev[k]) {
            if (k.startsWith('on')) {
                let key = k.slice('2').toLowerCase();
                elem.removeEventListener(key, prev[k]);
                elem.addEventListener(key, next[k]);
            }
            else {
                elem.setAttribute(k, next[k]);
            }
            prev[k] = next[k];
        }
    }
}