import { createElement, useState } from "../../index.js";

export default function Toggle() {
    const [show, setShow] = useState('Header');
    // function toggle() {
    //     if (show === 'Header') {
    //         setShow('Footer');
    //     } else {
    //         setShow('Header');
    //     }
    //     console.log(show);

    // }
    // return (
    //     createElement('div', null,
    //         (show === "Header"
    //             ? createElement('header', null, 'This is Header')
    //             : createElement('footer', null, 'This is Footer')),
    //         createElement('button', { onClick: toggle }, 'Toggle')
    //     )
    // )

    if (show === 'Header') {
        return createElement(Header, { onClick: () => setShow('Footer') })
    } else {
        return createElement(Footer, { onClick: () => setShow('Header') })
    }

};

function Header({ onClick }) {
    const [count, setCount] = useState(0);
    console.log('Header Component');

    function handleShow() {
        setCount(s => s + 1);
        onClick();
    }

    return (
        createElement('Header', { style: { border: '5px solid red', padding: '10px' } },
            createElement('input', { value: 'Noor' }),
            createElement('button', { onClick: handleShow }, 'Footer'),
            createElement('h1', null, 'This is Header')
        )
    )
}

function Footer({ onClick }) {
    const [count, setCount] = useState(0);
    console.log('Hide Component');

    function handleHide() {
        setCount(s => s + 1);
        onClick();
    }
    return (
        createElement('div', null,
            createElement('button', { onClick: handleHide }, 'Header'),
            createElement('h1', null, 'This is Footer')
        )
    )
}