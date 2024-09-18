export default function propsChanged(prev, next) {
    for (let k in next) {
        if (!Object.is(prev[k], next[k])) {
            return true;
        }
    }
};