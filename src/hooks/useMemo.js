import state from "../global.js";
import dependenciesChanged from "../utils/dependenciesChanged.js";

export default function useMemo(callback, dependencies) {
    const { id, component } = state;
    const { cache } = component;
    // let parent = state.node;
    state.id += 1;

    // if there are no dependencies passed;
    if (!dependencies) {
        return callback();
    }

    // first time component render;
    if (cache[id] == null) {
        cache[id] = { dependencies }
        cache[id].value = callback();
        return cache[id].value;
    }

    let changed = dependenciesChanged(cache[id].dependencies, dependencies);

    if (changed) {
        cache[id].value = callback();
        cache[id].dependencies = dependencies;
        return cache[id].value;
    }

    return cache[id].value;
};