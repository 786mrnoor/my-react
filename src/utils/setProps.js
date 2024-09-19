export default function setProps(elem, props) {
    let k, v;
    for (k in props) {
        v = props[k];
        if (k.startsWith('on')) {
            elem.addEventListener(k.slice('2').toLowerCase(), v);
        } else if (k === 'ref') {
            if (typeof v === 'object') v.current = elem;
            if (typeof v === 'function') v(elem);
        } else if (k === 'checked') {
            elem[k] = v;
        } else if (k == 'style' && typeof v == 'object') {
            Object.assign(elem.style, v);
        }
        else {
            elem.setAttribute(k, v);
        }
    }
}