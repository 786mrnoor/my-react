export default function dependenciesChanged(prev, next) {
    return next.some((d, i) => {
        return !Object.is(prev[i], d);
    })
};
