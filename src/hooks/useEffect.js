import state from "../global.js";

export default function useEffect(callback, dependencies) {
    const { effectId, component } = state;
    const { effects } = component;
    state.effectId += 1;

    effects[effectId] = {
        dependencies,
        callback
    }
    return;
};