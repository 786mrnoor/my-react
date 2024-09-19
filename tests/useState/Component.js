import { createElement, useState } from "../../index.js";
function p(call, ms) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(call())
        }, ms)
    })
}

export default function Component() {
    console.log('App');

    const [count, setCount] = useState(0);

    async function increment() {
        setCount(s => s + 1);
    }

    return (
        createElement('div', { onClick: () => console.log('Div') },
            createElement(Counter, { count, onClick: increment }),
        )
    )
}

function Counter({ count, onClick }) {
    console.log('Counter');

    const [myCount, setCount] = useState(11);

    function increment() {
        console.log('Button');

        setCount(s => s + 2);
        onClick();
    }

    return (
        createElement('div', null,
            createElement('p', null, count),
            createElement('p', null, myCount),
            createElement('button', { onClick: increment }, 'increment')
        )
    )
}