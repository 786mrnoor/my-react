import { createElement, useState, useEffect, useMemo } from "../index.js";

export default function App({ propCount }) {
    const [count, setCount] = useState(0);

    const doubleCount = useMemo(function () {
        return count * 2;
    });

    useEffect(() => {
        console.log('App Mount');

        return () => {
            console.log('App Unmount');
        }
    }, [])

    return (
        createElement('div', null,
            createElement('p', null, 'State Count = ', count),
            createElement('p', null, 'Prop Count = ', propCount),
            createElement('p', null, 'Double Count = ', doubleCount),
            count % 2 == 0 ? createElement(Print, { message: "Noor" }) : 'None',
            createElement('button', { onClick: () => setCount(s => s + 1) }, 'Increment')
        )
    )
}

function Print({ message }) {
    return createElement('h1', null, message);
}