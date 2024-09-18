import state from "../global.js";

export default function useRef(initialValue) {
    const { id, component } = state;
    const { cache } = component;
    state.id += 1;

    // first time component render;
    if (cache[id] == null) {
        cache[id] = {
            current: initialValue
        };
    }

    return cache[id];
};
