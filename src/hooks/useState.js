import state from "../global.js";
import { diffFunctionComponent } from "../diff.js";

let updateQueue = []
function addToQueue(component) {
    // if the component is not in update queue
    if (!updateQueue.includes(component)) {
        component.shouldUpdate = true;
        updateQueue.push(component);
    }
}

let timeoutId;
function flushUpdates() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        updateQueue.sort((a, b) => a.depth - b.depth);
        updateQueue.forEach((component) => {
            if (component.shouldUpdate) {
                diffFunctionComponent(component);
            }
        });
        updateQueue = [];
    }, 0);
}

export default function useState(initialState) {
    const { id, component } = state;
    const { cache } = component;
    // let parent = state.node;
    state.id += 1;

    // first time component render;
    if (cache[id] == null) {
        cache[id] = {
            value: typeof initialState === 'function' ? initialState() : initialState
        };
    }

    function setState(state) {
        if (typeof state === 'function') {
            cache[id].value = state(cache[id].value);
        } else {
            cache[id].value = state;
        }
        component.shouldUpdate = true;
        addToQueue(component);
        flushUpdates();
    }

    return [cache[id].value, setState];
};
