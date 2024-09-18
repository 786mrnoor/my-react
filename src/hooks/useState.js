import state from "../global.js";
import { diffFunctionComponent } from "../diff.js";

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
        diffFunctionComponent(component);
    }

    return [cache[id].value, setState];
};
