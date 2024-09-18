import { createElement, useState, useEffect, useMemo } from "../../index.js";

export default function App() {
    const [count, setCount] = useState(0);
    console.log('App');

    useEffect(() => {
        console.log('App Mount');

        return () => {
            console.log('App Unmount');
        }
    }, [count]);
    return (
        createElement('div', null,
            createElement(Print, { message: "Counter" }),
            createElement(Counter, { count }),
            createElement('button', { onClick: () => setCount(s => s + 1) }, 'increment'),
        )
    )
}

function Counter({ count }) {
    console.log('Counter');

    useEffect(() => {
        console.log('Counter Mount');

        return () => {
            console.log('Counter Unmount');
        }

    }, [count]);
    return (
        createElement('p', null, count)
    )
}

function Print({ message }) {
    console.log('Print');

    useEffect(() => {
        console.log('Print Mount');

    }, [message]);

    return createElement('h1', null, message);
}