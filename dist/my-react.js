const u = {
  id: 0,
  effectId: 0,
  depth: -1,
  component: null
};
function o(e, r) {
  let i, t;
  for (i in r)
    t = r[i], i.startsWith("on") ? e.addEventListener(i.slice("2").toLowerCase(), t) : i === "ref" ? (typeof t == "object" && (t.current = e), typeof t == "function" && t(e)) : i === "checked" ? e[i] = t : i == "style" && typeof t == "object" ? Object.assign(e.style, t) : e.setAttribute(i, t);
}
function c(e) {
  if (e.type === "text") {
    let t = document.createTextNode(String(e.value));
    return e.node = t, t;
  }
  if (typeof e.type == "function")
    return y(e);
  const r = document.createElement(e.type);
  e.node = r, o(r, e.props);
  const i = e.children;
  for (let t in i) {
    let l = c(i[t]);
    r.appendChild(l);
  }
  return r;
}
function y(e) {
  u.id = 0, u.effectId = 0, u.depth += 1, e.depth = u.depth, u.component = e;
  const r = e.type(e.props), i = c(r);
  return e.component = r, e.effects.forEach((t) => t.cleanup = t.callback()), u.depth -= 1, i;
}
function a(e) {
  e.effects.forEach((r) => {
    r.cleanup && r.cleanup();
  }), e.component.children.forEach((r) => {
    typeof r.type == "function" && a(r);
  });
}
function h(e, r) {
  return r.some((i, t) => !Object.is(e[t], i));
}
function g(e, r) {
  for (let i in r)
    if (!Object.is(e[i], r[i]))
      return !0;
}
function s(e, r) {
  if (e.type === r.type) {
    if (e.type === "text")
      return e.value !== r.value && (e.value = r.value, e.node.nodeValue = r.value), e;
    if (typeof e.type == "function")
      return g(e.props, r.props) && (e.props = r.props, p(e)), e;
    {
      b(e.node, e.props, r.props);
      const { children: i } = r, { children: t } = e;
      if (t.length === i.length) {
        for (let l in t)
          t[l] = s(t[l], i[l]);
        return e;
      } else if (t.length > i.length) {
        for (let f in i)
          t[f] = s(t[f], i[f]);
        let l = i.length;
        for (; t[l]; )
          typeof t[l].type == "function" ? t[l].node.node.remove() : (console.log(t[l]), t[l].node.remove()), t.splice(l, 1);
        return e;
      } else {
        for (let f in t)
          t[f] = s(t[f], i[f]);
        let l = t.length;
        for (; i[l]; ) {
          let f = c(i[l]);
          e.node.appendChild(f), e.children.push(i[l]), l++;
        }
        return e;
      }
    }
  } else {
    const i = c(r);
    return typeof e.type == "function" ? (a(e), e.shouldUpdate = !1, e.component.node.replaceWith(i), r) : (e.node.replaceWith(i), r);
  }
}
function p(e) {
  u.id = 0, u.effectId = 0, u.depth = e.depth, u.component = e;
  let r = [...e.effects];
  const i = e.type(e.props);
  e.component = s(e.component, i), e.effects.forEach((t, l) => {
    t.cleanup = r[l].cleanup, (!t.dependencies || h(t.dependencies, r[l].dependencies)) && (t.cleanup && t.cleanup(), t.cleanup = t.callback());
  }), e.shouldUpdate = !1, u.depth = -1;
}
function b(e, r, i) {
  for (let t in i)
    if (i[t] !== r[t]) {
      if (t.startsWith("on")) {
        let l = t.slice("2").toLowerCase();
        e.removeEventListener(l, r[t]), e.addEventListener(l, i[t]);
      } else t === "ref" ? (typeof v == "object" && (v.current = e), typeof v == "function" && v(e)) : t === "checked" ? e[t] = v : t == "style" && typeof value == "object" ? Object.assign(e.style, v) : e.setAttribute(t, i[t]);
      r[t] = i[t];
    }
}
function U(e) {
  let r;
  return {
    render(i) {
      if (r)
        r = s(r, i);
      else {
        u.depth = -1;
        const t = c(i);
        e.appendChild(t), r = i;
      }
    },
    unmount() {
      typeof r.type == "function" ? (a(r), r.component.node.remove()) : r.node.remove(), r = null;
    }
  };
}
function k(e, r, ...i) {
  for (let l in i)
    (typeof i[l] == "string" || typeof i[l] == "number") && (i[l] = {
      type: "text",
      value: i[l]
    });
  let t = {
    type: e,
    props: r || {},
    children: i
  };
  return typeof e == "function" && (t.cache = [], t.effects = [], t.component = null, t.depth = null, t.shouldUpdate = !1), t;
}
let d = [];
function E(e) {
  d.includes(e) || (e.shouldUpdate = !0, d.push(e));
}
let n;
function j() {
  clearTimeout(n), n = setTimeout(() => {
    d.sort((e, r) => e.depth - r.depth), d.forEach((e) => {
      e.shouldUpdate && p(e);
    }), d = [];
  }, 0);
}
function I(e) {
  const { id: r, component: i } = u, { cache: t } = i;
  u.id += 1, t[r] == null && (t[r] = {
    value: typeof e == "function" ? e() : e
  });
  function l(f) {
    typeof f == "function" ? t[r].value = f(t[r].value) : t[r].value = f, i.shouldUpdate = !0, E(i), j();
  }
  return [t[r].value, l];
}
function L(e, r) {
  const { effectId: i, component: t } = u, { effects: l } = t;
  u.effectId += 1, l[i] = {
    dependencies: r,
    callback: e
  };
}
function O(e, r) {
  const { id: i, component: t } = u, { cache: l } = t;
  return u.id += 1, r ? l[i] == null ? (l[i] = { dependencies: r }, l[i].value = e(), l[i].value) : (h(l[i].dependencies, r) && (l[i].value = e(), l[i].dependencies = r), l[i].value) : e();
}
function T(e) {
  const { id: r, component: i } = u, { cache: t } = i;
  return u.id += 1, t[r] == null && (t[r] = {
    current: e
  }), t[r];
}
export {
  k as createElement,
  U as createRoot,
  L as useEffect,
  O as useMemo,
  T as useRef,
  I as useState
};
