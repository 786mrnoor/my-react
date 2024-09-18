const f = {
  id: 0,
  effectId: 0,
  component: null
};
function o(e, t) {
  for (let r in t)
    r.startsWith("on") ? e.addEventListener(r.slice("2").toLowerCase(), t[r]) : e.setAttribute(r, t[r]);
}
function n(e) {
  if (e.type === "text") {
    let l = document.createTextNode(String(e.value));
    return e.node = l, l;
  }
  if (typeof e.type == "function")
    return h(e);
  const t = document.createElement(e.type);
  e.node = t, o(t, e.props);
  const r = e.children;
  for (let l in r) {
    let i = n(r[l]);
    t.appendChild(i);
  }
  return t;
}
function h(e) {
  f.id = 0, f.effectId = 0, f.component = e;
  const t = e.type(e.props), r = n(t);
  return e.component = t, e.effects.forEach((l) => l.cleanup = l.callback()), r;
}
function d(e) {
  e.effects.forEach((t) => {
    t.cleanup && t.cleanup();
  }), e.component.children.forEach((t) => {
    typeof t.type == "function" && d(t);
  });
}
function c(e, t) {
  return t.some((r, l) => !Object.is(e[l], r));
}
function p(e, t) {
  for (let r in t)
    if (!Object.is(e[r], t[r]))
      return !0;
}
function s(e, t) {
  if (e.type === t.type) {
    if (e.type === "text")
      return e.value !== t.value && (e.value = t.value, e.node.nodeValue = t.value), e;
    if (typeof e.type == "function")
      return p(e.props, t.props) && (e.props = t.props, a(e)), e;
    {
      y(e.node, e.props, t.props);
      const { children: r } = t, { children: l } = e;
      if (l.length === r.length) {
        for (let i in l)
          l[i] = s(l[i], r[i]);
        return e;
      } else if (l.length > r.length) {
        for (let u in r)
          l[u] = s(l[u], r[u]);
        let i = r.length;
        for (; l[i]; )
          typeof l[i].type == "function" ? l[i].node.node.remove() : (console.log(l[i]), l[i].node.remove()), l.splice(i, 1);
        return e;
      } else {
        for (let u in l)
          l[u] = s(l[u], r[u]);
        let i = l.length;
        for (; r[i]; ) {
          let u = n(r[i]);
          e.node.appendChild(u), e.children.push(r[i]), i++;
        }
        return e;
      }
    }
  } else {
    const r = n(t);
    return typeof e.type == "function" ? (d(e), e.component.node.replaceWith(r), t) : (e.node.replaceWith(r), t);
  }
}
function a(e) {
  f.id = 0, f.effectId = 0, f.component = e;
  let t = [...e.effects];
  const r = e.type(e.props);
  s(e.component, r), e.effects.forEach((l, i) => {
    l.cleanup = t[i].cleanup, (!l.dependencies || c(l.dependencies, t[i].dependencies)) && (l.cleanup && l.cleanup(), l.cleanup = l.callback());
  });
}
function y(e, t, r) {
  for (let l in r)
    if (r[l] !== t[l]) {
      if (l.startsWith("on")) {
        let i = l.slice("2").toLowerCase();
        e.removeEventListener(i, t[l]), e.addEventListener(i, r[l]);
      } else
        e.setAttribute(l, r[l]);
      t[l] = r[l];
    }
}
function v(e) {
  let t;
  return {
    render(r) {
      if (t)
        t = s(t, r);
      else {
        const l = n(r);
        e.appendChild(l), t = r, console.log(t);
      }
    },
    unmount() {
      typeof t.type == "function" ? (d(t), t.component.node.remove()) : t.node.remove(), t = null;
    }
  };
}
function g(e, t, ...r) {
  for (let i in r)
    (typeof r[i] == "string" || typeof r[i] == "number") && (r[i] = {
      type: "text",
      value: r[i]
    });
  let l = {
    type: e,
    props: t || {},
    children: r
  };
  return typeof e == "function" && (l.cache = [], l.effects = [], l.component = null), l;
}
function E(e) {
  const { id: t, component: r } = f, { cache: l } = r;
  f.id += 1, l[t] == null && (l[t] = {
    value: typeof e == "function" ? e() : e
  });
  function i(u) {
    typeof u == "function" ? l[t].value = u(l[t].value) : l[t].value = u, a(r);
  }
  return [l[t].value, i];
}
function b(e, t) {
  const { effectId: r, component: l } = f, { effects: i } = l;
  f.effectId += 1, i[r] = {
    dependencies: t,
    callback: e
  };
}
function I(e, t) {
  const { id: r, component: l } = f, { cache: i } = l;
  return f.id += 1, t ? i[r] == null ? (i[r] = { dependencies: t }, i[r].value = e(), i[r].value) : (c(i[r].dependencies, t) && (i[r].value = e(), i[r].dependencies = t), i[r].value) : e();
}
export {
  g as createElement,
  v as createRoot,
  b as useEffect,
  I as useMemo,
  E as useState
};
