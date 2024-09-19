import { createElement, useEffect, useState } from "../../index.js";
function f(n) {
    if (n === 0) return 1;
    return n * f(n - 1);
}

export default function MouseMove() {
    const [count, setCount] = useState(0);
    console.log(count, 'render');
    console.log(f(10));

    function increment() {

        console.log(count);

        setCount(s => s + 1);
    }
    useEffect(() => {
        console.log('effect');
        document.body.addEventListener('mousemove', increment);
        return () => document.body.removeEventListener('mousemove', increment);
    }, []);

    return (
        createElement('h1', null, count)
    )
};
