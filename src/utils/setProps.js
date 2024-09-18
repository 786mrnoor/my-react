export default function setProps(elem, props) {
    for (let k in props) {
        if (k.startsWith('on')) {
            elem.addEventListener(k.slice('2').toLowerCase(), props[k]);
        } else{
            elem.setAttribute(k, props[k]);
        }
    }
}