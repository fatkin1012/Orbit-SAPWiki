import l, { useState as R, useRef as V, useMemo as Le, useEffect as ne, useCallback as _e } from "react";
import { createRoot as vt } from "react-dom/client";
const xt = ({ onSubmit: a }) => {
  const [e, t] = R(""), [r, n] = R(""), [s, o] = R(""), [i, d] = R(""), [u, g] = R([]), S = (k) => new Promise((T, b) => {
    const x = new FileReader();
    x.onload = () => {
      typeof x.result == "string" ? T(x.result) : b(new Error("invalid file result"));
    }, x.onerror = () => b(new Error("file read error")), x.readAsDataURL(k);
  }), O = async (k) => {
    const T = k.target.files;
    if (!(!T || !T.length))
      try {
        const b = Array.from(T), x = await Promise.all(b.map((E) => S(E)));
        g(x);
      } catch (b) {
        console.error("failed to read images", b);
      }
  }, U = async (k) => {
    try {
      const T = k.clipboardData?.items;
      if (!T) return;
      const b = [];
      for (let E = 0; E < T.length; E++) {
        const A = T[E];
        if (A.kind === "file" && A.type.startsWith("image/")) {
          const D = A.getAsFile();
          D && b.push(D);
        }
      }
      if (!b.length) return;
      k.preventDefault();
      const x = await Promise.all(b.map((E) => S(E)));
      g((E) => [...E, ...x]);
    } catch (T) {
      console.error("failed to paste image", T);
    }
  }, z = V(null), B = V(0), [ie, F] = R(!1), oe = (k) => {
    k.preventDefault(), B.current++, F(!0);
  }, J = (k) => {
    k.preventDefault(), B.current--, B.current <= 0 && (B.current = 0, F(!1));
  }, ae = async (k) => {
    k.preventDefault(), F(!1), B.current = 0;
    const T = Array.from(k.dataTransfer.files).filter((b) => b.type.startsWith("image/"));
    if (T.length)
      try {
        const b = await Promise.all(T.map((x) => S(x)));
        g((x) => [...x, ...b]);
      } catch (b) {
        console.error("failed to drop images", b);
      }
  }, $ = (k) => g((T) => T.filter((b, x) => x !== k)), H = (k) => {
    k.preventDefault();
    const T = e.trim();
    if (!T) return;
    const b = r.split(",").map((x) => x.trim()).filter(Boolean);
    a({
      title: T,
      tCodes: b,
      requirement: s,
      steps: i,
      images: u
    }), t(""), n(""), o(""), d(""), g([]);
  };
  return /* @__PURE__ */ l.createElement("form", { className: "task-form", onSubmit: H }, /* @__PURE__ */ l.createElement("div", { className: "field" }, /* @__PURE__ */ l.createElement("label", null, "Title"), /* @__PURE__ */ l.createElement("input", { value: e, onChange: (k) => t(k.target.value), placeholder: "Entry title" })), /* @__PURE__ */ l.createElement("div", { className: "field" }, /* @__PURE__ */ l.createElement("label", null, "T-Codes (comma)"), /* @__PURE__ */ l.createElement(
    "input",
    {
      value: r,
      onChange: (k) => n(k.target.value),
      placeholder: "SE16, MM03"
    }
  )), /* @__PURE__ */ l.createElement("div", { className: "field" }, /* @__PURE__ */ l.createElement("label", null, "Description"), /* @__PURE__ */ l.createElement("textarea", { value: s, onChange: (k) => o(k.target.value), placeholder: "What are we solving?" })), /* @__PURE__ */ l.createElement("div", { className: "field steps-field" }, /* @__PURE__ */ l.createElement("label", null, "Steps"), /* @__PURE__ */ l.createElement(
    "textarea",
    {
      className: "steps-input",
      value: i,
      onChange: (k) => d(k.target.value),
      placeholder: "Step-by-step or reminders"
    }
  )), /* @__PURE__ */ l.createElement(
    "div",
    {
      className: `field attach-field ${ie ? "drag-over" : ""}`,
      onPaste: U,
      onDragOver: (k) => k.preventDefault(),
      onDragEnter: oe,
      onDragLeave: J,
      onDrop: ae,
      tabIndex: 0,
      onClick: () => z.current?.click()
    },
    /* @__PURE__ */ l.createElement("label", null, "Attach screenshots / diagrams (optional)", /* @__PURE__ */ l.createElement("span", { style: { marginLeft: 8, color: "rgba(0,0,0,0.45)", fontSize: 12 } }, "(drop or paste images, or click to select)")),
    /* @__PURE__ */ l.createElement("input", { ref: z, type: "file", accept: "image/*", multiple: !0, onChange: O, style: { display: "none" } }),
    u && u.length ? /* @__PURE__ */ l.createElement("div", { className: "attach-previews" }, u.map((k, T) => /* @__PURE__ */ l.createElement("div", { className: "attach-preview", key: T }, /* @__PURE__ */ l.createElement("img", { src: k, alt: `attachment-${T}` }), /* @__PURE__ */ l.createElement(
      "button",
      {
        type: "button",
        className: "ghost small remove",
        onClick: (b) => {
          b.stopPropagation(), $(T);
        }
      },
      "Remove"
    )))) : /* @__PURE__ */ l.createElement("div", { className: "attach-hint" }, "Drop or paste images here, or click to select")
  ), /* @__PURE__ */ l.createElement("div", { className: "actions" }, /* @__PURE__ */ l.createElement("button", { type: "submit" }, "Save entry")));
}, be = ({ tasks: a, onDelete: e, onUpdate: t }) => {
  const [r, n] = R(null), [s, o] = R("");
  return a.length ? /* @__PURE__ */ l.createElement("div", { className: "task-grid" }, a.map((i) => /* @__PURE__ */ l.createElement("article", { className: "card task-card", key: i.id }, /* @__PURE__ */ l.createElement("header", { className: "task-header" }, /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement("div", { className: "eyebrow" }, new Date(i.createdAt).toLocaleString()), /* @__PURE__ */ l.createElement("h3", null, i.title), /* @__PURE__ */ l.createElement("div", { className: "tags" }, r === i.id ? /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement(
    "input",
    {
      className: "edit-tcodes-input",
      value: s,
      onChange: (d) => o(d.target.value),
      placeholder: "SE16, MM03"
    }
  ), /* @__PURE__ */ l.createElement("div", { className: "edit-actions" }, /* @__PURE__ */ l.createElement(
    "button",
    {
      type: "button",
      className: "ghost small",
      onClick: () => {
        const d = s.split(",").map((u) => u.trim()).filter(Boolean);
        t(i.id, { tCodes: d, tCode: "" }), n(null);
      }
    },
    "Save"
  ), /* @__PURE__ */ l.createElement("button", { type: "button", className: "ghost small", onClick: () => n(null) }, "Cancel"))) : /* @__PURE__ */ l.createElement(l.Fragment, null, i.tCode ? /* @__PURE__ */ l.createElement("span", { className: "pill" }, i.tCode) : null, i.tCodes?.map((d) => /* @__PURE__ */ l.createElement("span", { key: `${i.id}-${d}`, className: "pill" }, d)), /* @__PURE__ */ l.createElement(
    "button",
    {
      type: "button",
      className: "ghost small",
      onClick: () => {
        const d = [
          ...Array.isArray(i.tCodes) ? i.tCodes : []
        ];
        i.tCode && !d.includes(i.tCode) && d.unshift(i.tCode), o(d.join(", ")), n(i.id);
      }
    },
    "Edit"
  )))), /* @__PURE__ */ l.createElement("button", { className: "ghost", onClick: () => e(i.id) }, "Delete")), /* @__PURE__ */ l.createElement("div", { className: "field" }, /* @__PURE__ */ l.createElement("label", null, "Description"), /* @__PURE__ */ l.createElement(
    "textarea",
    {
      defaultValue: i.requirement,
      onBlur: (d) => t(i.id, { requirement: d.target.value }),
      rows: 3
    }
  )), /* @__PURE__ */ l.createElement("div", { className: "field notes-field" }, /* @__PURE__ */ l.createElement("label", null, "Steps / Notes"), /* @__PURE__ */ l.createElement(
    "textarea",
    {
      className: "notes-input",
      defaultValue: i.steps,
      onBlur: (d) => t(i.id, { steps: d.target.value })
    }
  )), (() => {
    const d = Array.isArray(i.images) && i.images.length ? i.images : i.imageData ? [i.imageData] : [];
    return d.length ? /* @__PURE__ */ l.createElement("div", { className: "field images" }, /* @__PURE__ */ l.createElement("label", null, "Image(s)"), /* @__PURE__ */ l.createElement("div", { className: "image-row" }, d.map((u, g) => /* @__PURE__ */ l.createElement(
      "img",
      {
        key: `${i.id}-img-${g}`,
        src: u,
        alt: `${i.title} ${g + 1}`,
        className: "preview clickable",
        onClick: () => {
          typeof be.openViewerCallback == "function" && be.openViewerCallback(i.id, d, g, i.title);
        }
      }
    )))) : null;
  })()))) : /* @__PURE__ */ l.createElement("div", { className: "empty card" }, /* @__PURE__ */ l.createElement("h3", null, "No entries yet"), /* @__PURE__ */ l.createElement("p", { className: "muted" }, "Add a new entry or import from your legacy backup."));
};
function _t({
  isOpen: a,
  images: e,
  initialIndex: t,
  title: r = "",
  onClose: n,
  onSaveAnnotated: s
}) {
  const [o, i] = R(t), [d, u] = R(!1), [g, S] = R(!1), [O, U] = R("#ff3344"), [z, B] = R(4), [ie, F] = R(0), [oe, J] = R(!1), ae = V(null), $ = V(null), H = V(!1), k = V(!1), T = V(null), b = V([]), x = Le(() => e[o], [e, o]);
  ne(() => {
    a && (i(t), u(!1), S(!1));
  }, [t, a]), ne(() => {
    if (!a) return;
    const m = (w) => {
      w.key === "Escape" && n(), w.key === "ArrowRight" && i((Z) => (Z + 1) % e.length), w.key === "ArrowLeft" && i((Z) => (Z - 1 + e.length) % e.length);
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [e.length, a, n]);
  const E = () => {
    const m = $.current;
    if (!m) return;
    const w = m.toDataURL("image/png");
    b.current[b.current.length - 1] !== w && (b.current = [...b.current, w], F(b.current.length - 1));
  }, A = () => {
    const m = ae.current, w = $.current;
    if (!m || !w) return;
    w.width = m.clientWidth, w.height = m.clientHeight;
    const Z = w.getContext("2d");
    Z && (Z.clearRect(0, 0, w.width, w.height), b.current = [w.toDataURL("image/png")], F(0));
  };
  ne(() => {
    if (!a) return;
    const m = () => A();
    return window.addEventListener("resize", m), () => window.removeEventListener("resize", m);
  }, [a, o]), ne(() => {
    if (!a) return;
    const m = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = m;
    };
  }, [a]);
  const D = (m, w) => {
    const Z = $.current;
    if (!Z) return;
    const j = Z.getContext("2d");
    j && (j.globalCompositeOperation = g ? "destination-out" : "source-over", j.strokeStyle = g ? "rgba(0,0,0,1)" : O, j.lineWidth = z, j.lineCap = "round", j.lineJoin = "round", j.beginPath(), j.moveTo(m.x, m.y), j.lineTo(w.x, w.y), j.stroke());
  }, ve = (m) => {
    const w = $.current;
    if (!w) return { x: 0, y: 0 };
    const Z = w.getBoundingClientRect();
    return { x: m.clientX - Z.left, y: m.clientY - Z.top };
  }, ht = (m) => {
    if (!d) return;
    const w = ve(m);
    H.current = !0, k.current = !0, T.current = w, D(w, w), m.currentTarget.setPointerCapture(m.pointerId);
  }, mt = (m) => {
    if (!d || !H.current || !T.current) return;
    const w = ve(m);
    D(T.current, w), k.current = !0, T.current = w;
  }, Me = (m) => {
    H.current && k.current && E(), H.current = !1, k.current = !1, T.current = null, m.currentTarget.hasPointerCapture(m.pointerId) && m.currentTarget.releasePointerCapture(m.pointerId);
  }, gt = () => {
    const m = $.current;
    if (!m || b.current.length <= 1) return;
    b.current = b.current.slice(0, -1);
    const w = b.current[b.current.length - 1];
    if (!w) return;
    const Z = m.getContext("2d");
    if (!Z) return;
    const j = new Image();
    j.onload = () => {
      Z.clearRect(0, 0, m.width, m.height), Z.drawImage(j, 0, 0, m.width, m.height), F(b.current.length - 1);
    }, j.src = w;
  }, Ue = () => {
    const m = $.current;
    if (!m) return;
    const w = m.getContext("2d");
    w && (w.clearRect(0, 0, m.width, m.height), E());
  }, yt = async () => {
    const m = e[o], w = $.current, Z = ae.current;
    if (!(!m || !w || !Z)) {
      J(!0);
      try {
        const j = await new Promise((Be, Fe) => {
          const le = new Image();
          le.onload = () => {
            const W = document.createElement("canvas");
            W.width = le.naturalWidth, W.height = le.naturalHeight;
            const Ae = W.getContext("2d");
            if (!Ae) {
              Fe(new Error("Could not create drawing context."));
              return;
            }
            Ae.drawImage(le, 0, 0, W.width, W.height);
            const xe = new Image();
            xe.onload = () => {
              Ae.drawImage(xe, 0, 0, W.width, W.height), Be(W.toDataURL("image/png"));
            }, xe.onerror = () => Be(W.toDataURL("image/png")), xe.src = w.toDataURL("image/png");
          }, le.onerror = () => Fe(new Error("Failed to load source image.")), le.src = m;
        });
        s(j, o), Ue(), u(!1), S(!1);
      } finally {
        J(!1);
      }
    }
  };
  return !a || e.length === 0 || !x ? null : /* @__PURE__ */ l.createElement("div", { className: "pv-overlay", role: "dialog", "aria-modal": "true" }, /* @__PURE__ */ l.createElement("div", { className: "pv-dialog" }, /* @__PURE__ */ l.createElement("div", { className: "pv-header" }, /* @__PURE__ */ l.createElement("p", { className: "pv-title" }, r, " - Image ", o + 1, " / ", e.length), /* @__PURE__ */ l.createElement("div", { className: "pv-controls" }, /* @__PURE__ */ l.createElement("button", { type: "button", onClick: () => i((m) => (m - 1 + e.length) % e.length) }, "Prev"), /* @__PURE__ */ l.createElement("button", { type: "button", onClick: () => i((m) => (m + 1) % e.length) }, "Next"), /* @__PURE__ */ l.createElement("button", { type: "button", onClick: n, className: "ghost" }, "Close"))), /* @__PURE__ */ l.createElement("div", { className: "pv-toolbar" }, /* @__PURE__ */ l.createElement("button", { type: "button", onClick: () => u((m) => !m), className: d ? "active" : "" }, d ? "Drawing On" : "Enable Draw"), /* @__PURE__ */ l.createElement("button", { type: "button", onClick: () => {
    S((m) => !m), d || u(!0);
  }, className: g ? "active" : "" }, g ? "Eraser On" : "Eraser"), /* @__PURE__ */ l.createElement("label", null, "Color"), /* @__PURE__ */ l.createElement("input", { type: "color", value: O, onChange: (m) => U(m.target.value), "aria-label": "Brush color" }), /* @__PURE__ */ l.createElement("label", { htmlFor: "brush-size" }, "Brush"), /* @__PURE__ */ l.createElement("input", { id: "brush-size", type: "range", min: 2, max: 18, value: z, onChange: (m) => B(Number(m.target.value)) }), /* @__PURE__ */ l.createElement("button", { type: "button", onClick: gt, disabled: ie === 0 }, "Undo"), /* @__PURE__ */ l.createElement("button", { type: "button", onClick: Ue }, "Clear Marks"), /* @__PURE__ */ l.createElement("button", { type: "button", onClick: yt, disabled: oe, className: "primary" }, oe ? "Saving..." : "Save Marked Copy")), /* @__PURE__ */ l.createElement("div", { className: "pv-body" }, /* @__PURE__ */ l.createElement("div", { className: "pv-image-wrap" }, /* @__PURE__ */ l.createElement("img", { ref: ae, src: x, alt: `Viewer image ${o + 1}`, className: "pv-image", onLoad: A }), /* @__PURE__ */ l.createElement("canvas", { ref: $, className: `pv-canvas ${d ? g ? "erase" : "draw" : "disabled"}`, onPointerDown: ht, onPointerMove: mt, onPointerUp: Me, onPointerLeave: Me })))));
}
var N;
(function(a) {
  a.assertEqual = (n) => {
  };
  function e(n) {
  }
  a.assertIs = e;
  function t(n) {
    throw new Error();
  }
  a.assertNever = t, a.arrayToEnum = (n) => {
    const s = {};
    for (const o of n)
      s[o] = o;
    return s;
  }, a.getValidEnumValues = (n) => {
    const s = a.objectKeys(n).filter((i) => typeof n[n[i]] != "number"), o = {};
    for (const i of s)
      o[i] = n[i];
    return a.objectValues(o);
  }, a.objectValues = (n) => a.objectKeys(n).map(function(s) {
    return n[s];
  }), a.objectKeys = typeof Object.keys == "function" ? (n) => Object.keys(n) : (n) => {
    const s = [];
    for (const o in n)
      Object.prototype.hasOwnProperty.call(n, o) && s.push(o);
    return s;
  }, a.find = (n, s) => {
    for (const o of n)
      if (s(o))
        return o;
  }, a.isInteger = typeof Number.isInteger == "function" ? (n) => Number.isInteger(n) : (n) => typeof n == "number" && Number.isFinite(n) && Math.floor(n) === n;
  function r(n, s = " | ") {
    return n.map((o) => typeof o == "string" ? `'${o}'` : o).join(s);
  }
  a.joinValues = r, a.jsonStringifyReplacer = (n, s) => typeof s == "bigint" ? s.toString() : s;
})(N || (N = {}));
var We;
(function(a) {
  a.mergeShapes = (e, t) => ({
    ...e,
    ...t
    // second overwrites first
  });
})(We || (We = {}));
const f = N.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), Y = (a) => {
  switch (typeof a) {
    case "undefined":
      return f.undefined;
    case "string":
      return f.string;
    case "number":
      return Number.isNaN(a) ? f.nan : f.number;
    case "boolean":
      return f.boolean;
    case "function":
      return f.function;
    case "bigint":
      return f.bigint;
    case "symbol":
      return f.symbol;
    case "object":
      return Array.isArray(a) ? f.array : a === null ? f.null : a.then && typeof a.then == "function" && a.catch && typeof a.catch == "function" ? f.promise : typeof Map < "u" && a instanceof Map ? f.map : typeof Set < "u" && a instanceof Set ? f.set : typeof Date < "u" && a instanceof Date ? f.date : f.object;
    default:
      return f.unknown;
  }
}, c = N.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
class q extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(), this.issues = [], this.addIssue = (r) => {
      this.issues = [...this.issues, r];
    }, this.addIssues = (r = []) => {
      this.issues = [...this.issues, ...r];
    };
    const t = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const t = e || function(s) {
      return s.message;
    }, r = { _errors: [] }, n = (s) => {
      for (const o of s.issues)
        if (o.code === "invalid_union")
          o.unionErrors.map(n);
        else if (o.code === "invalid_return_type")
          n(o.returnTypeError);
        else if (o.code === "invalid_arguments")
          n(o.argumentsError);
        else if (o.path.length === 0)
          r._errors.push(t(o));
        else {
          let i = r, d = 0;
          for (; d < o.path.length; ) {
            const u = o.path[d];
            d === o.path.length - 1 ? (i[u] = i[u] || { _errors: [] }, i[u]._errors.push(t(o))) : i[u] = i[u] || { _errors: [] }, i = i[u], d++;
          }
        }
    };
    return n(this), r;
  }
  static assert(e) {
    if (!(e instanceof q))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, N.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (t) => t.message) {
    const t = {}, r = [];
    for (const n of this.issues)
      if (n.path.length > 0) {
        const s = n.path[0];
        t[s] = t[s] || [], t[s].push(e(n));
      } else
        r.push(e(n));
    return { formErrors: r, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
q.create = (a) => new q(a);
const Ie = (a, e) => {
  let t;
  switch (a.code) {
    case c.invalid_type:
      a.received === f.undefined ? t = "Required" : t = `Expected ${a.expected}, received ${a.received}`;
      break;
    case c.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(a.expected, N.jsonStringifyReplacer)}`;
      break;
    case c.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${N.joinValues(a.keys, ", ")}`;
      break;
    case c.invalid_union:
      t = "Invalid input";
      break;
    case c.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${N.joinValues(a.options)}`;
      break;
    case c.invalid_enum_value:
      t = `Invalid enum value. Expected ${N.joinValues(a.options)}, received '${a.received}'`;
      break;
    case c.invalid_arguments:
      t = "Invalid function arguments";
      break;
    case c.invalid_return_type:
      t = "Invalid function return type";
      break;
    case c.invalid_date:
      t = "Invalid date";
      break;
    case c.invalid_string:
      typeof a.validation == "object" ? "includes" in a.validation ? (t = `Invalid input: must include "${a.validation.includes}"`, typeof a.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${a.validation.position}`)) : "startsWith" in a.validation ? t = `Invalid input: must start with "${a.validation.startsWith}"` : "endsWith" in a.validation ? t = `Invalid input: must end with "${a.validation.endsWith}"` : N.assertNever(a.validation) : a.validation !== "regex" ? t = `Invalid ${a.validation}` : t = "Invalid";
      break;
    case c.too_small:
      a.type === "array" ? t = `Array must contain ${a.exact ? "exactly" : a.inclusive ? "at least" : "more than"} ${a.minimum} element(s)` : a.type === "string" ? t = `String must contain ${a.exact ? "exactly" : a.inclusive ? "at least" : "over"} ${a.minimum} character(s)` : a.type === "number" ? t = `Number must be ${a.exact ? "exactly equal to " : a.inclusive ? "greater than or equal to " : "greater than "}${a.minimum}` : a.type === "bigint" ? t = `Number must be ${a.exact ? "exactly equal to " : a.inclusive ? "greater than or equal to " : "greater than "}${a.minimum}` : a.type === "date" ? t = `Date must be ${a.exact ? "exactly equal to " : a.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(a.minimum))}` : t = "Invalid input";
      break;
    case c.too_big:
      a.type === "array" ? t = `Array must contain ${a.exact ? "exactly" : a.inclusive ? "at most" : "less than"} ${a.maximum} element(s)` : a.type === "string" ? t = `String must contain ${a.exact ? "exactly" : a.inclusive ? "at most" : "under"} ${a.maximum} character(s)` : a.type === "number" ? t = `Number must be ${a.exact ? "exactly" : a.inclusive ? "less than or equal to" : "less than"} ${a.maximum}` : a.type === "bigint" ? t = `BigInt must be ${a.exact ? "exactly" : a.inclusive ? "less than or equal to" : "less than"} ${a.maximum}` : a.type === "date" ? t = `Date must be ${a.exact ? "exactly" : a.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(a.maximum))}` : t = "Invalid input";
      break;
    case c.custom:
      t = "Invalid input";
      break;
    case c.invalid_intersection_types:
      t = "Intersection results could not be merged";
      break;
    case c.not_multiple_of:
      t = `Number must be a multiple of ${a.multipleOf}`;
      break;
    case c.not_finite:
      t = "Number must be finite";
      break;
    default:
      t = e.defaultError, N.assertNever(a);
  }
  return { message: t };
};
let kt = Ie;
function bt() {
  return kt;
}
const wt = (a) => {
  const { data: e, path: t, errorMaps: r, issueData: n } = a, s = [...t, ...n.path || []], o = {
    ...n,
    path: s
  };
  if (n.message !== void 0)
    return {
      ...n,
      path: s,
      message: n.message
    };
  let i = "";
  const d = r.filter((u) => !!u).slice().reverse();
  for (const u of d)
    i = u(o, { data: e, defaultError: i }).message;
  return {
    ...n,
    path: s,
    message: i
  };
};
function p(a, e) {
  const t = bt(), r = wt({
    issueData: e,
    data: a.data,
    path: a.path,
    errorMaps: [
      a.common.contextualErrorMap,
      // contextual error map is first priority
      a.schemaErrorMap,
      // then schema-bound map if available
      t,
      // then global override map
      t === Ie ? void 0 : Ie
      // then global default map
    ].filter((n) => !!n)
  });
  a.common.issues.push(r);
}
class P {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, t) {
    const r = [];
    for (const n of t) {
      if (n.status === "aborted")
        return y;
      n.status === "dirty" && e.dirty(), r.push(n.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, t) {
    const r = [];
    for (const n of t) {
      const s = await n.key, o = await n.value;
      r.push({
        key: s,
        value: o
      });
    }
    return P.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, t) {
    const r = {};
    for (const n of t) {
      const { key: s, value: o } = n;
      if (s.status === "aborted" || o.status === "aborted")
        return y;
      s.status === "dirty" && e.dirty(), o.status === "dirty" && e.dirty(), s.value !== "__proto__" && (typeof o.value < "u" || n.alwaysSet) && (r[s.value] = o.value);
    }
    return { status: e.value, value: r };
  }
}
const y = Object.freeze({
  status: "aborted"
}), me = (a) => ({ status: "dirty", value: a }), L = (a) => ({ status: "valid", value: a }), qe = (a) => a.status === "aborted", Je = (a) => a.status === "dirty", de = (a) => a.status === "valid", we = (a) => typeof Promise < "u" && a instanceof Promise;
var h;
(function(a) {
  a.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, a.toString = (e) => typeof e == "string" ? e : e?.message;
})(h || (h = {}));
class ee {
  constructor(e, t, r, n) {
    this._cachedPath = [], this.parent = e, this.data = t, this._path = r, this._key = n;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const He = (a, e) => {
  if (de(e))
    return { success: !0, data: e.value };
  if (!a.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const t = new q(a.common.issues);
      return this._error = t, this._error;
    }
  };
};
function _(a) {
  if (!a)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: r, description: n } = a;
  if (e && (t || r))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: n } : { errorMap: (o, i) => {
    const { message: d } = a;
    return o.code === "invalid_enum_value" ? { message: d ?? i.defaultError } : typeof i.data > "u" ? { message: d ?? r ?? i.defaultError } : o.code !== "invalid_type" ? { message: i.defaultError } : { message: d ?? t ?? i.defaultError };
  }, description: n };
}
class C {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return Y(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: Y(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new P(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: Y(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (we(t))
      throw new Error("Synchronous parse encountered promise.");
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const r = this.safeParse(e, t);
    if (r.success)
      return r.data;
    throw r.error;
  }
  safeParse(e, t) {
    const r = {
      common: {
        issues: [],
        async: t?.async ?? !1,
        contextualErrorMap: t?.errorMap
      },
      path: t?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Y(e)
    }, n = this._parseSync({ data: e, path: r.path, parent: r });
    return He(r, n);
  }
  "~validate"(e) {
    const t = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Y(e)
    };
    if (!this["~standard"].async)
      try {
        const r = this._parseSync({ data: e, path: [], parent: t });
        return de(r) ? {
          value: r.value
        } : {
          issues: t.common.issues
        };
      } catch (r) {
        r?.message?.toLowerCase()?.includes("encountered") && (this["~standard"].async = !0), t.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: t }).then((r) => de(r) ? {
      value: r.value
    } : {
      issues: t.common.issues
    });
  }
  async parseAsync(e, t) {
    const r = await this.safeParseAsync(e, t);
    if (r.success)
      return r.data;
    throw r.error;
  }
  async safeParseAsync(e, t) {
    const r = {
      common: {
        issues: [],
        contextualErrorMap: t?.errorMap,
        async: !0
      },
      path: t?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Y(e)
    }, n = this._parse({ data: e, path: r.path, parent: r }), s = await (we(n) ? n : Promise.resolve(n));
    return He(r, s);
  }
  refine(e, t) {
    const r = (n) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(n) : t;
    return this._refinement((n, s) => {
      const o = e(n), i = () => s.addIssue({
        code: c.custom,
        ...r(n)
      });
      return typeof Promise < "u" && o instanceof Promise ? o.then((d) => d ? !0 : (i(), !1)) : o ? !0 : (i(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((r, n) => e(r) ? !0 : (n.addIssue(typeof t == "function" ? t(r, n) : t), !1));
  }
  _refinement(e) {
    return new fe({
      schema: this,
      typeName: v.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (t) => this["~validate"](t)
    };
  }
  optional() {
    return X.create(this, this._def);
  }
  nullable() {
    return he.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return M.create(this);
  }
  promise() {
    return Te.create(this, this._def);
  }
  or(e) {
    return Ce.create([this, e], this._def);
  }
  and(e) {
    return Ne.create(this, e, this._def);
  }
  transform(e) {
    return new fe({
      ..._(this._def),
      schema: this,
      typeName: v.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new Ze({
      ..._(this._def),
      innerType: this,
      defaultValue: t,
      typeName: v.ZodDefault
    });
  }
  brand() {
    return new qt({
      typeName: v.ZodBranded,
      type: this,
      ..._(this._def)
    });
  }
  catch(e) {
    const t = typeof e == "function" ? e : () => e;
    return new je({
      ..._(this._def),
      innerType: this,
      catchValue: t,
      typeName: v.ZodCatch
    });
  }
  describe(e) {
    const t = this.constructor;
    return new t({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return ze.create(this, e);
  }
  readonly() {
    return De.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Et = /^c[^\s-]{8,}$/i, Ct = /^[0-9a-z]+$/, Nt = /^[0-9A-HJKMNP-TV-Z]{26}$/i, Tt = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, St = /^[a-z0-9_-]{21}$/i, At = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Rt = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, It = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Ot = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Re;
const Zt = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, jt = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Dt = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, $t = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Pt = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Lt = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, ct = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", zt = new RegExp(`^${ct}$`);
function dt(a) {
  let e = "[0-5]\\d";
  a.precision ? e = `${e}\\.\\d{${a.precision}}` : a.precision == null && (e = `${e}(\\.\\d+)?`);
  const t = a.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${t}`;
}
function Vt(a) {
  return new RegExp(`^${dt(a)}$`);
}
function Mt(a) {
  let e = `${ct}T${dt(a)}`;
  const t = [];
  return t.push(a.local ? "Z?" : "Z"), a.offset && t.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${t.join("|")})`, new RegExp(`^${e}$`);
}
function Ut(a, e) {
  return !!((e === "v4" || !e) && Zt.test(a) || (e === "v6" || !e) && Dt.test(a));
}
function Bt(a, e) {
  if (!At.test(a))
    return !1;
  try {
    const [t] = a.split(".");
    if (!t)
      return !1;
    const r = t.replace(/-/g, "+").replace(/_/g, "/").padEnd(t.length + (4 - t.length % 4) % 4, "="), n = JSON.parse(atob(r));
    return !(typeof n != "object" || n === null || "typ" in n && n?.typ !== "JWT" || !n.alg || e && n.alg !== e);
  } catch {
    return !1;
  }
}
function Ft(a, e) {
  return !!((e === "v4" || !e) && jt.test(a) || (e === "v6" || !e) && $t.test(a));
}
class Q extends C {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== f.string) {
      const s = this._getOrReturnCtx(e);
      return p(s, {
        code: c.invalid_type,
        expected: f.string,
        received: s.parsedType
      }), y;
    }
    const r = new P();
    let n;
    for (const s of this._def.checks)
      if (s.kind === "min")
        e.data.length < s.value && (n = this._getOrReturnCtx(e, n), p(n, {
          code: c.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), r.dirty());
      else if (s.kind === "max")
        e.data.length > s.value && (n = this._getOrReturnCtx(e, n), p(n, {
          code: c.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), r.dirty());
      else if (s.kind === "length") {
        const o = e.data.length > s.value, i = e.data.length < s.value;
        (o || i) && (n = this._getOrReturnCtx(e, n), o ? p(n, {
          code: c.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }) : i && p(n, {
          code: c.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }), r.dirty());
      } else if (s.kind === "email")
        It.test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
          validation: "email",
          code: c.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "emoji")
        Re || (Re = new RegExp(Ot, "u")), Re.test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
          validation: "emoji",
          code: c.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "uuid")
        Tt.test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
          validation: "uuid",
          code: c.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "nanoid")
        St.test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
          validation: "nanoid",
          code: c.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "cuid")
        Et.test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
          validation: "cuid",
          code: c.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "cuid2")
        Ct.test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
          validation: "cuid2",
          code: c.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "ulid")
        Nt.test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
          validation: "ulid",
          code: c.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "url")
        try {
          new URL(e.data);
        } catch {
          n = this._getOrReturnCtx(e, n), p(n, {
            validation: "url",
            code: c.invalid_string,
            message: s.message
          }), r.dirty();
        }
      else s.kind === "regex" ? (s.regex.lastIndex = 0, s.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
        validation: "regex",
        code: c.invalid_string,
        message: s.message
      }), r.dirty())) : s.kind === "trim" ? e.data = e.data.trim() : s.kind === "includes" ? e.data.includes(s.value, s.position) || (n = this._getOrReturnCtx(e, n), p(n, {
        code: c.invalid_string,
        validation: { includes: s.value, position: s.position },
        message: s.message
      }), r.dirty()) : s.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : s.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : s.kind === "startsWith" ? e.data.startsWith(s.value) || (n = this._getOrReturnCtx(e, n), p(n, {
        code: c.invalid_string,
        validation: { startsWith: s.value },
        message: s.message
      }), r.dirty()) : s.kind === "endsWith" ? e.data.endsWith(s.value) || (n = this._getOrReturnCtx(e, n), p(n, {
        code: c.invalid_string,
        validation: { endsWith: s.value },
        message: s.message
      }), r.dirty()) : s.kind === "datetime" ? Mt(s).test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
        code: c.invalid_string,
        validation: "datetime",
        message: s.message
      }), r.dirty()) : s.kind === "date" ? zt.test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
        code: c.invalid_string,
        validation: "date",
        message: s.message
      }), r.dirty()) : s.kind === "time" ? Vt(s).test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
        code: c.invalid_string,
        validation: "time",
        message: s.message
      }), r.dirty()) : s.kind === "duration" ? Rt.test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
        validation: "duration",
        code: c.invalid_string,
        message: s.message
      }), r.dirty()) : s.kind === "ip" ? Ut(e.data, s.version) || (n = this._getOrReturnCtx(e, n), p(n, {
        validation: "ip",
        code: c.invalid_string,
        message: s.message
      }), r.dirty()) : s.kind === "jwt" ? Bt(e.data, s.alg) || (n = this._getOrReturnCtx(e, n), p(n, {
        validation: "jwt",
        code: c.invalid_string,
        message: s.message
      }), r.dirty()) : s.kind === "cidr" ? Ft(e.data, s.version) || (n = this._getOrReturnCtx(e, n), p(n, {
        validation: "cidr",
        code: c.invalid_string,
        message: s.message
      }), r.dirty()) : s.kind === "base64" ? Pt.test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
        validation: "base64",
        code: c.invalid_string,
        message: s.message
      }), r.dirty()) : s.kind === "base64url" ? Lt.test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
        validation: "base64url",
        code: c.invalid_string,
        message: s.message
      }), r.dirty()) : N.assertNever(s);
    return { status: r.value, value: e.data };
  }
  _regex(e, t, r) {
    return this.refinement((n) => e.test(n), {
      validation: t,
      code: c.invalid_string,
      ...h.errToObj(r)
    });
  }
  _addCheck(e) {
    return new Q({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...h.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...h.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...h.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...h.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...h.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...h.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...h.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...h.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...h.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...h.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...h.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...h.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...h.errToObj(e) });
  }
  datetime(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof e?.precision > "u" ? null : e?.precision,
      offset: e?.offset ?? !1,
      local: e?.local ?? !1,
      ...h.errToObj(e?.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof e?.precision > "u" ? null : e?.precision,
      ...h.errToObj(e?.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...h.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...h.errToObj(t)
    });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t?.position,
      ...h.errToObj(t?.message)
    });
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...h.errToObj(t)
    });
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...h.errToObj(t)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...h.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...h.errToObj(t)
    });
  }
  length(e, t) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...h.errToObj(t)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, h.errToObj(e));
  }
  trim() {
    return new Q({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new Q({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new Q({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === "base64url");
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
Q.create = (a) => new Q({
  checks: [],
  typeName: v.ZodString,
  coerce: a?.coerce ?? !1,
  ..._(a)
});
function Wt(a, e) {
  const t = (a.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, n = t > r ? t : r, s = Number.parseInt(a.toFixed(n).replace(".", "")), o = Number.parseInt(e.toFixed(n).replace(".", ""));
  return s % o / 10 ** n;
}
class ue extends C {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== f.number) {
      const s = this._getOrReturnCtx(e);
      return p(s, {
        code: c.invalid_type,
        expected: f.number,
        received: s.parsedType
      }), y;
    }
    let r;
    const n = new P();
    for (const s of this._def.checks)
      s.kind === "int" ? N.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), p(r, {
        code: c.invalid_type,
        expected: "integer",
        received: "float",
        message: s.message
      }), n.dirty()) : s.kind === "min" ? (s.inclusive ? e.data < s.value : e.data <= s.value) && (r = this._getOrReturnCtx(e, r), p(r, {
        code: c.too_small,
        minimum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), n.dirty()) : s.kind === "max" ? (s.inclusive ? e.data > s.value : e.data >= s.value) && (r = this._getOrReturnCtx(e, r), p(r, {
        code: c.too_big,
        maximum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), n.dirty()) : s.kind === "multipleOf" ? Wt(e.data, s.value) !== 0 && (r = this._getOrReturnCtx(e, r), p(r, {
        code: c.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), n.dirty()) : s.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), p(r, {
        code: c.not_finite,
        message: s.message
      }), n.dirty()) : N.assertNever(s);
    return { status: n.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, h.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, h.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, h.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, h.toString(t));
  }
  setLimit(e, t, r, n) {
    return new ue({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: r,
          message: h.toString(n)
        }
      ]
    });
  }
  _addCheck(e) {
    return new ue({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: h.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: h.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: h.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: h.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: h.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: h.toString(t)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: h.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: h.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: h.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && N.isInteger(e.value));
  }
  get isFinite() {
    let e = null, t = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
        return !0;
      r.kind === "min" ? (t === null || r.value > t) && (t = r.value) : r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
}
ue.create = (a) => new ue({
  checks: [],
  typeName: v.ZodNumber,
  coerce: a?.coerce || !1,
  ..._(a)
});
class ge extends C {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== f.bigint)
      return this._getInvalidInput(e);
    let r;
    const n = new P();
    for (const s of this._def.checks)
      s.kind === "min" ? (s.inclusive ? e.data < s.value : e.data <= s.value) && (r = this._getOrReturnCtx(e, r), p(r, {
        code: c.too_small,
        type: "bigint",
        minimum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), n.dirty()) : s.kind === "max" ? (s.inclusive ? e.data > s.value : e.data >= s.value) && (r = this._getOrReturnCtx(e, r), p(r, {
        code: c.too_big,
        type: "bigint",
        maximum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), n.dirty()) : s.kind === "multipleOf" ? e.data % s.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), p(r, {
        code: c.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), n.dirty()) : N.assertNever(s);
    return { status: n.value, value: e.data };
  }
  _getInvalidInput(e) {
    const t = this._getOrReturnCtx(e);
    return p(t, {
      code: c.invalid_type,
      expected: f.bigint,
      received: t.parsedType
    }), y;
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, h.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, h.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, h.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, h.toString(t));
  }
  setLimit(e, t, r, n) {
    return new ge({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: r,
          message: h.toString(n)
        }
      ]
    });
  }
  _addCheck(e) {
    return new ge({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: h.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: h.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: h.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: h.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: h.toString(t)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
ge.create = (a) => new ge({
  checks: [],
  typeName: v.ZodBigInt,
  coerce: a?.coerce ?? !1,
  ..._(a)
});
class Ge extends C {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== f.boolean) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: c.invalid_type,
        expected: f.boolean,
        received: r.parsedType
      }), y;
    }
    return L(e.data);
  }
}
Ge.create = (a) => new Ge({
  typeName: v.ZodBoolean,
  coerce: a?.coerce || !1,
  ..._(a)
});
class Ee extends C {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== f.date) {
      const s = this._getOrReturnCtx(e);
      return p(s, {
        code: c.invalid_type,
        expected: f.date,
        received: s.parsedType
      }), y;
    }
    if (Number.isNaN(e.data.getTime())) {
      const s = this._getOrReturnCtx(e);
      return p(s, {
        code: c.invalid_date
      }), y;
    }
    const r = new P();
    let n;
    for (const s of this._def.checks)
      s.kind === "min" ? e.data.getTime() < s.value && (n = this._getOrReturnCtx(e, n), p(n, {
        code: c.too_small,
        message: s.message,
        inclusive: !0,
        exact: !1,
        minimum: s.value,
        type: "date"
      }), r.dirty()) : s.kind === "max" ? e.data.getTime() > s.value && (n = this._getOrReturnCtx(e, n), p(n, {
        code: c.too_big,
        message: s.message,
        inclusive: !0,
        exact: !1,
        maximum: s.value,
        type: "date"
      }), r.dirty()) : N.assertNever(s);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new Ee({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: h.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: h.toString(t)
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
}
Ee.create = (a) => new Ee({
  checks: [],
  coerce: a?.coerce || !1,
  typeName: v.ZodDate,
  ..._(a)
});
class Ye extends C {
  _parse(e) {
    if (this._getType(e) !== f.symbol) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: c.invalid_type,
        expected: f.symbol,
        received: r.parsedType
      }), y;
    }
    return L(e.data);
  }
}
Ye.create = (a) => new Ye({
  typeName: v.ZodSymbol,
  ..._(a)
});
class Ke extends C {
  _parse(e) {
    if (this._getType(e) !== f.undefined) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: c.invalid_type,
        expected: f.undefined,
        received: r.parsedType
      }), y;
    }
    return L(e.data);
  }
}
Ke.create = (a) => new Ke({
  typeName: v.ZodUndefined,
  ..._(a)
});
class Qe extends C {
  _parse(e) {
    if (this._getType(e) !== f.null) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: c.invalid_type,
        expected: f.null,
        received: r.parsedType
      }), y;
    }
    return L(e.data);
  }
}
Qe.create = (a) => new Qe({
  typeName: v.ZodNull,
  ..._(a)
});
class Xe extends C {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return L(e.data);
  }
}
Xe.create = (a) => new Xe({
  typeName: v.ZodAny,
  ..._(a)
});
class et extends C {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return L(e.data);
  }
}
et.create = (a) => new et({
  typeName: v.ZodUnknown,
  ..._(a)
});
class te extends C {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return p(t, {
      code: c.invalid_type,
      expected: f.never,
      received: t.parsedType
    }), y;
  }
}
te.create = (a) => new te({
  typeName: v.ZodNever,
  ..._(a)
});
class tt extends C {
  _parse(e) {
    if (this._getType(e) !== f.undefined) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: c.invalid_type,
        expected: f.void,
        received: r.parsedType
      }), y;
    }
    return L(e.data);
  }
}
tt.create = (a) => new tt({
  typeName: v.ZodVoid,
  ..._(a)
});
class M extends C {
  _parse(e) {
    const { ctx: t, status: r } = this._processInputParams(e), n = this._def;
    if (t.parsedType !== f.array)
      return p(t, {
        code: c.invalid_type,
        expected: f.array,
        received: t.parsedType
      }), y;
    if (n.exactLength !== null) {
      const o = t.data.length > n.exactLength.value, i = t.data.length < n.exactLength.value;
      (o || i) && (p(t, {
        code: o ? c.too_big : c.too_small,
        minimum: i ? n.exactLength.value : void 0,
        maximum: o ? n.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: n.exactLength.message
      }), r.dirty());
    }
    if (n.minLength !== null && t.data.length < n.minLength.value && (p(t, {
      code: c.too_small,
      minimum: n.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.minLength.message
    }), r.dirty()), n.maxLength !== null && t.data.length > n.maxLength.value && (p(t, {
      code: c.too_big,
      maximum: n.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.maxLength.message
    }), r.dirty()), t.common.async)
      return Promise.all([...t.data].map((o, i) => n.type._parseAsync(new ee(t, o, t.path, i)))).then((o) => P.mergeArray(r, o));
    const s = [...t.data].map((o, i) => n.type._parseSync(new ee(t, o, t.path, i)));
    return P.mergeArray(r, s);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new M({
      ...this._def,
      minLength: { value: e, message: h.toString(t) }
    });
  }
  max(e, t) {
    return new M({
      ...this._def,
      maxLength: { value: e, message: h.toString(t) }
    });
  }
  length(e, t) {
    return new M({
      ...this._def,
      exactLength: { value: e, message: h.toString(t) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
M.create = (a, e) => new M({
  type: a,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: v.ZodArray,
  ..._(e)
});
function ce(a) {
  if (a instanceof I) {
    const e = {};
    for (const t in a.shape) {
      const r = a.shape[t];
      e[t] = X.create(ce(r));
    }
    return new I({
      ...a._def,
      shape: () => e
    });
  } else return a instanceof M ? new M({
    ...a._def,
    type: ce(a.element)
  }) : a instanceof X ? X.create(ce(a.unwrap())) : a instanceof he ? he.create(ce(a.unwrap())) : a instanceof se ? se.create(a.items.map((e) => ce(e))) : a;
}
class I extends C {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), t = N.objectKeys(e);
    return this._cached = { shape: e, keys: t }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== f.object) {
      const u = this._getOrReturnCtx(e);
      return p(u, {
        code: c.invalid_type,
        expected: f.object,
        received: u.parsedType
      }), y;
    }
    const { status: r, ctx: n } = this._processInputParams(e), { shape: s, keys: o } = this._getCached(), i = [];
    if (!(this._def.catchall instanceof te && this._def.unknownKeys === "strip"))
      for (const u in n.data)
        o.includes(u) || i.push(u);
    const d = [];
    for (const u of o) {
      const g = s[u], S = n.data[u];
      d.push({
        key: { status: "valid", value: u },
        value: g._parse(new ee(n, S, n.path, u)),
        alwaysSet: u in n.data
      });
    }
    if (this._def.catchall instanceof te) {
      const u = this._def.unknownKeys;
      if (u === "passthrough")
        for (const g of i)
          d.push({
            key: { status: "valid", value: g },
            value: { status: "valid", value: n.data[g] }
          });
      else if (u === "strict")
        i.length > 0 && (p(n, {
          code: c.unrecognized_keys,
          keys: i
        }), r.dirty());
      else if (u !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const u = this._def.catchall;
      for (const g of i) {
        const S = n.data[g];
        d.push({
          key: { status: "valid", value: g },
          value: u._parse(
            new ee(n, S, n.path, g)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: g in n.data
        });
      }
    }
    return n.common.async ? Promise.resolve().then(async () => {
      const u = [];
      for (const g of d) {
        const S = await g.key, O = await g.value;
        u.push({
          key: S,
          value: O,
          alwaysSet: g.alwaysSet
        });
      }
      return u;
    }).then((u) => P.mergeObjectSync(r, u)) : P.mergeObjectSync(r, d);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return h.errToObj, new I({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, r) => {
          const n = this._def.errorMap?.(t, r).message ?? r.defaultError;
          return t.code === "unrecognized_keys" ? {
            message: h.errToObj(e).message ?? n
          } : {
            message: n
          };
        }
      } : {}
    });
  }
  strip() {
    return new I({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new I({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new I({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new I({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: v.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new I({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const t = {};
    for (const r of N.objectKeys(e))
      e[r] && this.shape[r] && (t[r] = this.shape[r]);
    return new I({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    for (const r of N.objectKeys(this.shape))
      e[r] || (t[r] = this.shape[r]);
    return new I({
      ...this._def,
      shape: () => t
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return ce(this);
  }
  partial(e) {
    const t = {};
    for (const r of N.objectKeys(this.shape)) {
      const n = this.shape[r];
      e && !e[r] ? t[r] = n : t[r] = n.optional();
    }
    return new I({
      ...this._def,
      shape: () => t
    });
  }
  required(e) {
    const t = {};
    for (const r of N.objectKeys(this.shape))
      if (e && !e[r])
        t[r] = this.shape[r];
      else {
        let s = this.shape[r];
        for (; s instanceof X; )
          s = s._def.innerType;
        t[r] = s;
      }
    return new I({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return ut(N.objectKeys(this.shape));
  }
}
I.create = (a, e) => new I({
  shape: () => a,
  unknownKeys: "strip",
  catchall: te.create(),
  typeName: v.ZodObject,
  ..._(e)
});
I.strictCreate = (a, e) => new I({
  shape: () => a,
  unknownKeys: "strict",
  catchall: te.create(),
  typeName: v.ZodObject,
  ..._(e)
});
I.lazycreate = (a, e) => new I({
  shape: a,
  unknownKeys: "strip",
  catchall: te.create(),
  typeName: v.ZodObject,
  ..._(e)
});
class Ce extends C {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = this._def.options;
    function n(s) {
      for (const i of s)
        if (i.result.status === "valid")
          return i.result;
      for (const i of s)
        if (i.result.status === "dirty")
          return t.common.issues.push(...i.ctx.common.issues), i.result;
      const o = s.map((i) => new q(i.ctx.common.issues));
      return p(t, {
        code: c.invalid_union,
        unionErrors: o
      }), y;
    }
    if (t.common.async)
      return Promise.all(r.map(async (s) => {
        const o = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await s._parseAsync({
            data: t.data,
            path: t.path,
            parent: o
          }),
          ctx: o
        };
      })).then(n);
    {
      let s;
      const o = [];
      for (const d of r) {
        const u = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, g = d._parseSync({
          data: t.data,
          path: t.path,
          parent: u
        });
        if (g.status === "valid")
          return g;
        g.status === "dirty" && !s && (s = { result: g, ctx: u }), u.common.issues.length && o.push(u.common.issues);
      }
      if (s)
        return t.common.issues.push(...s.ctx.common.issues), s.result;
      const i = o.map((d) => new q(d));
      return p(t, {
        code: c.invalid_union,
        unionErrors: i
      }), y;
    }
  }
  get options() {
    return this._def.options;
  }
}
Ce.create = (a, e) => new Ce({
  options: a,
  typeName: v.ZodUnion,
  ..._(e)
});
function Oe(a, e) {
  const t = Y(a), r = Y(e);
  if (a === e)
    return { valid: !0, data: a };
  if (t === f.object && r === f.object) {
    const n = N.objectKeys(e), s = N.objectKeys(a).filter((i) => n.indexOf(i) !== -1), o = { ...a, ...e };
    for (const i of s) {
      const d = Oe(a[i], e[i]);
      if (!d.valid)
        return { valid: !1 };
      o[i] = d.data;
    }
    return { valid: !0, data: o };
  } else if (t === f.array && r === f.array) {
    if (a.length !== e.length)
      return { valid: !1 };
    const n = [];
    for (let s = 0; s < a.length; s++) {
      const o = a[s], i = e[s], d = Oe(o, i);
      if (!d.valid)
        return { valid: !1 };
      n.push(d.data);
    }
    return { valid: !0, data: n };
  } else return t === f.date && r === f.date && +a == +e ? { valid: !0, data: a } : { valid: !1 };
}
class Ne extends C {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e), n = (s, o) => {
      if (qe(s) || qe(o))
        return y;
      const i = Oe(s.value, o.value);
      return i.valid ? ((Je(s) || Je(o)) && t.dirty(), { status: t.value, value: i.data }) : (p(r, {
        code: c.invalid_intersection_types
      }), y);
    };
    return r.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      }),
      this._def.right._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      })
    ]).then(([s, o]) => n(s, o)) : n(this._def.left._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }), this._def.right._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }));
  }
}
Ne.create = (a, e, t) => new Ne({
  left: a,
  right: e,
  typeName: v.ZodIntersection,
  ..._(t)
});
class se extends C {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== f.array)
      return p(r, {
        code: c.invalid_type,
        expected: f.array,
        received: r.parsedType
      }), y;
    if (r.data.length < this._def.items.length)
      return p(r, {
        code: c.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), y;
    !this._def.rest && r.data.length > this._def.items.length && (p(r, {
      code: c.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), t.dirty());
    const s = [...r.data].map((o, i) => {
      const d = this._def.items[i] || this._def.rest;
      return d ? d._parse(new ee(r, o, r.path, i)) : null;
    }).filter((o) => !!o);
    return r.common.async ? Promise.all(s).then((o) => P.mergeArray(t, o)) : P.mergeArray(t, s);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new se({
      ...this._def,
      rest: e
    });
  }
}
se.create = (a, e) => {
  if (!Array.isArray(a))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new se({
    items: a,
    typeName: v.ZodTuple,
    rest: null,
    ..._(e)
  });
};
class at extends C {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== f.map)
      return p(r, {
        code: c.invalid_type,
        expected: f.map,
        received: r.parsedType
      }), y;
    const n = this._def.keyType, s = this._def.valueType, o = [...r.data.entries()].map(([i, d], u) => ({
      key: n._parse(new ee(r, i, r.path, [u, "key"])),
      value: s._parse(new ee(r, d, r.path, [u, "value"]))
    }));
    if (r.common.async) {
      const i = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const d of o) {
          const u = await d.key, g = await d.value;
          if (u.status === "aborted" || g.status === "aborted")
            return y;
          (u.status === "dirty" || g.status === "dirty") && t.dirty(), i.set(u.value, g.value);
        }
        return { status: t.value, value: i };
      });
    } else {
      const i = /* @__PURE__ */ new Map();
      for (const d of o) {
        const u = d.key, g = d.value;
        if (u.status === "aborted" || g.status === "aborted")
          return y;
        (u.status === "dirty" || g.status === "dirty") && t.dirty(), i.set(u.value, g.value);
      }
      return { status: t.value, value: i };
    }
  }
}
at.create = (a, e, t) => new at({
  valueType: e,
  keyType: a,
  typeName: v.ZodMap,
  ..._(t)
});
class ye extends C {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== f.set)
      return p(r, {
        code: c.invalid_type,
        expected: f.set,
        received: r.parsedType
      }), y;
    const n = this._def;
    n.minSize !== null && r.data.size < n.minSize.value && (p(r, {
      code: c.too_small,
      minimum: n.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.minSize.message
    }), t.dirty()), n.maxSize !== null && r.data.size > n.maxSize.value && (p(r, {
      code: c.too_big,
      maximum: n.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.maxSize.message
    }), t.dirty());
    const s = this._def.valueType;
    function o(d) {
      const u = /* @__PURE__ */ new Set();
      for (const g of d) {
        if (g.status === "aborted")
          return y;
        g.status === "dirty" && t.dirty(), u.add(g.value);
      }
      return { status: t.value, value: u };
    }
    const i = [...r.data.values()].map((d, u) => s._parse(new ee(r, d, r.path, u)));
    return r.common.async ? Promise.all(i).then((d) => o(d)) : o(i);
  }
  min(e, t) {
    return new ye({
      ...this._def,
      minSize: { value: e, message: h.toString(t) }
    });
  }
  max(e, t) {
    return new ye({
      ...this._def,
      maxSize: { value: e, message: h.toString(t) }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
ye.create = (a, e) => new ye({
  valueType: a,
  minSize: null,
  maxSize: null,
  typeName: v.ZodSet,
  ..._(e)
});
class rt extends C {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
rt.create = (a, e) => new rt({
  getter: a,
  typeName: v.ZodLazy,
  ..._(e)
});
class nt extends C {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return p(t, {
        received: t.data,
        code: c.invalid_literal,
        expected: this._def.value
      }), y;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
nt.create = (a, e) => new nt({
  value: a,
  typeName: v.ZodLiteral,
  ..._(e)
});
function ut(a, e) {
  return new pe({
    values: a,
    typeName: v.ZodEnum,
    ..._(e)
  });
}
class pe extends C {
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), r = this._def.values;
      return p(t, {
        expected: N.joinValues(r),
        received: t.parsedType,
        code: c.invalid_type
      }), y;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const t = this._getOrReturnCtx(e), r = this._def.values;
      return p(t, {
        received: t.data,
        code: c.invalid_enum_value,
        options: r
      }), y;
    }
    return L(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  extract(e, t = this._def) {
    return pe.create(e, {
      ...this._def,
      ...t
    });
  }
  exclude(e, t = this._def) {
    return pe.create(this.options.filter((r) => !e.includes(r)), {
      ...this._def,
      ...t
    });
  }
}
pe.create = ut;
class st extends C {
  _parse(e) {
    const t = N.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== f.string && r.parsedType !== f.number) {
      const n = N.objectValues(t);
      return p(r, {
        expected: N.joinValues(n),
        received: r.parsedType,
        code: c.invalid_type
      }), y;
    }
    if (this._cache || (this._cache = new Set(N.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const n = N.objectValues(t);
      return p(r, {
        received: r.data,
        code: c.invalid_enum_value,
        options: n
      }), y;
    }
    return L(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
st.create = (a, e) => new st({
  values: a,
  typeName: v.ZodNativeEnum,
  ..._(e)
});
class Te extends C {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== f.promise && t.common.async === !1)
      return p(t, {
        code: c.invalid_type,
        expected: f.promise,
        received: t.parsedType
      }), y;
    const r = t.parsedType === f.promise ? t.data : Promise.resolve(t.data);
    return L(r.then((n) => this._def.type.parseAsync(n, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
}
Te.create = (a, e) => new Te({
  type: a,
  typeName: v.ZodPromise,
  ..._(e)
});
class fe extends C {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === v.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e), n = this._def.effect || null, s = {
      addIssue: (o) => {
        p(r, o), o.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (s.addIssue = s.addIssue.bind(s), n.type === "preprocess") {
      const o = n.transform(r.data, s);
      if (r.common.async)
        return Promise.resolve(o).then(async (i) => {
          if (t.value === "aborted")
            return y;
          const d = await this._def.schema._parseAsync({
            data: i,
            path: r.path,
            parent: r
          });
          return d.status === "aborted" ? y : d.status === "dirty" || t.value === "dirty" ? me(d.value) : d;
        });
      {
        if (t.value === "aborted")
          return y;
        const i = this._def.schema._parseSync({
          data: o,
          path: r.path,
          parent: r
        });
        return i.status === "aborted" ? y : i.status === "dirty" || t.value === "dirty" ? me(i.value) : i;
      }
    }
    if (n.type === "refinement") {
      const o = (i) => {
        const d = n.refinement(i, s);
        if (r.common.async)
          return Promise.resolve(d);
        if (d instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return i;
      };
      if (r.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return i.status === "aborted" ? y : (i.status === "dirty" && t.dirty(), o(i.value), { status: t.value, value: i.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((i) => i.status === "aborted" ? y : (i.status === "dirty" && t.dirty(), o(i.value).then(() => ({ status: t.value, value: i.value }))));
    }
    if (n.type === "transform")
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!de(o))
          return y;
        const i = n.transform(o.value, s);
        if (i instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: i };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => de(o) ? Promise.resolve(n.transform(o.value, s)).then((i) => ({
          status: t.value,
          value: i
        })) : y);
    N.assertNever(n);
  }
}
fe.create = (a, e, t) => new fe({
  schema: a,
  typeName: v.ZodEffects,
  effect: e,
  ..._(t)
});
fe.createWithPreprocess = (a, e, t) => new fe({
  schema: e,
  effect: { type: "preprocess", transform: a },
  typeName: v.ZodEffects,
  ..._(t)
});
class X extends C {
  _parse(e) {
    return this._getType(e) === f.undefined ? L(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
X.create = (a, e) => new X({
  innerType: a,
  typeName: v.ZodOptional,
  ..._(e)
});
class he extends C {
  _parse(e) {
    return this._getType(e) === f.null ? L(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
he.create = (a, e) => new he({
  innerType: a,
  typeName: v.ZodNullable,
  ..._(e)
});
class Ze extends C {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let r = t.data;
    return t.parsedType === f.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
      data: r,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Ze.create = (a, e) => new Ze({
  innerType: a,
  typeName: v.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ..._(e)
});
class je extends C {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = {
      ...t,
      common: {
        ...t.common,
        issues: []
      }
    }, n = this._def.innerType._parse({
      data: r.data,
      path: r.path,
      parent: {
        ...r
      }
    });
    return we(n) ? n.then((s) => ({
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new q(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: n.status === "valid" ? n.value : this._def.catchValue({
        get error() {
          return new q(r.common.issues);
        },
        input: r.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
je.create = (a, e) => new je({
  innerType: a,
  typeName: v.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ..._(e)
});
class it extends C {
  _parse(e) {
    if (this._getType(e) !== f.nan) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: c.invalid_type,
        expected: f.nan,
        received: r.parsedType
      }), y;
    }
    return { status: "valid", value: e.data };
  }
}
it.create = (a) => new it({
  typeName: v.ZodNaN,
  ..._(a)
});
class qt extends C {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = t.data;
    return this._def.type._parse({
      data: r,
      path: t.path,
      parent: t
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ze extends C {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const s = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return s.status === "aborted" ? y : s.status === "dirty" ? (t.dirty(), me(s.value)) : this._def.out._parseAsync({
          data: s.value,
          path: r.path,
          parent: r
        });
      })();
    {
      const n = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      });
      return n.status === "aborted" ? y : n.status === "dirty" ? (t.dirty(), {
        status: "dirty",
        value: n.value
      }) : this._def.out._parseSync({
        data: n.value,
        path: r.path,
        parent: r
      });
    }
  }
  static create(e, t) {
    return new ze({
      in: e,
      out: t,
      typeName: v.ZodPipeline
    });
  }
}
class De extends C {
  _parse(e) {
    const t = this._def.innerType._parse(e), r = (n) => (de(n) && (n.value = Object.freeze(n.value)), n);
    return we(t) ? t.then((n) => r(n)) : r(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
De.create = (a, e) => new De({
  innerType: a,
  typeName: v.ZodReadonly,
  ..._(e)
});
var v;
(function(a) {
  a.ZodString = "ZodString", a.ZodNumber = "ZodNumber", a.ZodNaN = "ZodNaN", a.ZodBigInt = "ZodBigInt", a.ZodBoolean = "ZodBoolean", a.ZodDate = "ZodDate", a.ZodSymbol = "ZodSymbol", a.ZodUndefined = "ZodUndefined", a.ZodNull = "ZodNull", a.ZodAny = "ZodAny", a.ZodUnknown = "ZodUnknown", a.ZodNever = "ZodNever", a.ZodVoid = "ZodVoid", a.ZodArray = "ZodArray", a.ZodObject = "ZodObject", a.ZodUnion = "ZodUnion", a.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", a.ZodIntersection = "ZodIntersection", a.ZodTuple = "ZodTuple", a.ZodRecord = "ZodRecord", a.ZodMap = "ZodMap", a.ZodSet = "ZodSet", a.ZodFunction = "ZodFunction", a.ZodLazy = "ZodLazy", a.ZodLiteral = "ZodLiteral", a.ZodEnum = "ZodEnum", a.ZodEffects = "ZodEffects", a.ZodNativeEnum = "ZodNativeEnum", a.ZodOptional = "ZodOptional", a.ZodNullable = "ZodNullable", a.ZodDefault = "ZodDefault", a.ZodCatch = "ZodCatch", a.ZodPromise = "ZodPromise", a.ZodBranded = "ZodBranded", a.ZodPipeline = "ZodPipeline", a.ZodReadonly = "ZodReadonly";
})(v || (v = {}));
const G = Q.create, Jt = ue.create;
te.create;
const $e = M.create, Ht = I.create;
Ce.create;
Ne.create;
se.create;
pe.create;
Te.create;
X.create;
he.create;
const pt = "tasks", Gt = "1.0.0", Yt = "TASK_COUNT_CHANGED", ft = "sapwiki", Se = `plugin-${ft}`, Kt = Ht({
  id: G(),
  title: G().min(1, "Title is required"),
  requirement: G().optional().default(""),
  steps: G().optional().default(""),
  tCode: G().optional().default(""),
  tCodes: $e(G()).optional().default([]),
  createdAt: Jt().default(() => Date.now()),
  imageData: G().optional(),
  images: $e(G()).optional().default([])
}), Ve = $e(Kt), ot = 240, Qt = (a) => {
  try {
    const e = typeof a == "string" ? a : JSON.stringify(a);
    return e.length > ot ? `${e.slice(0, ot)}...` : e;
  } catch (e) {
    return `[unserializable ${String(e)}]`;
  }
}, lt = (a) => {
  if (typeof a != "string") return a;
  try {
    return JSON.parse(a);
  } catch {
    return a;
  }
}, Xt = (a) => {
  const e = lt(a);
  if (Array.isArray(e))
    return { candidate: e, source: "raw" };
  if (e && typeof e == "object") {
    const t = e, r = ["data", "value", "payload", "tasks", "cases"];
    for (const n of r) {
      const s = lt(t[n]);
      if (Array.isArray(s))
        return { candidate: s, source: n };
    }
  }
  return { candidate: [], source: "raw" };
}, ea = (a) => {
  if (!a || typeof a != "object") return a;
  const e = { ...a }, t = Array.isArray(e.images) ? e.images.slice() : [], r = [
    e.imageData,
    e.image,
    e.imageBase64,
    e.screenshot,
    ...Array.isArray(e.screenshots) ? e.screenshots : [],
    e.imageUri,
    e.photo
  ];
  Array.isArray(e.images) && r.push(...e.images);
  for (const n of r)
    typeof n == "string" && n && !t.includes(n) && t.push(n);
  return t.length && (e.images = t, e.imageData || (e.imageData = t[0])), !e.tCode && typeof e.tcode == "string" && (e.tCode = e.tcode), !e.tCodes && Array.isArray(e.tcodes) && (e.tCodes = e.tcodes), e;
}, ta = (a) => Array.isArray(a) ? a.map((e) => ea(e)) : a, Pe = (a) => {
  const { candidate: e, source: t } = Xt(a), r = ta(e), n = Ve.safeParse(r);
  return n.success ? { tasks: n.data, source: t, ok: !0 } : (console.error("[task-board] restore failed", n.error), { tasks: [], source: t, ok: !1 });
}, aa = async (a) => {
  console.info("[task-board] restore start");
  try {
    const e = await a.storage.get(pt), { tasks: t, source: r, ok: n } = Pe(e);
    return console.info("[task-board] restore payload", {
      preview: Qt(e),
      extractedPath: r
    }), n && console.info("[task-board] restore success", {
      count: t.length,
      source: r
    }), t;
  } catch (e) {
    return console.error("[task-board] restore failed", e), [];
  }
}, ra = async (a, e) => {
  console.info(`[task-board] save triggered (count=${e.length})`);
  const t = Ve.safeParse(e);
  if (!t.success) {
    console.error("[task-board] save failed", t.error);
    return;
  }
  try {
    await a.storage.save(pt, t.data, Gt);
  } catch (r) {
    console.error("[task-board] save failed", r);
  }
}, na = (a) => ({
  id: crypto.randomUUID ? crypto.randomUUID() : `task-${Date.now()}`,
  title: a.title.trim(),
  requirement: a.requirement ?? "",
  steps: a.steps ?? "",
  tCode: a.tCode ?? "",
  tCodes: a.tCodes ?? [],
  createdAt: Date.now(),
  images: a.images ?? [],
  imageData: a.imageData ?? (Array.isArray(a.images) && a.images.length ? a.images[0] : void 0)
}), sa = (a) => {
  const [e, t] = R([]), [r, n] = R(!1), s = V(!1);
  ne(() => {
    let S = !0;
    return (async () => {
      const O = await aa(a);
      S && (t(O), n(!0));
    })(), () => {
      S = !1;
    };
  }, [a]), ne(() => {
    if (r) {
      if (!s.current) {
        s.current = !0;
        return;
      }
      ra(a, e), a.eventBus.emit(Yt, { count: e.length });
    }
  }, [a, r, e]);
  const o = _e((S) => {
    t((O) => [...O, na(S)]);
  }, []), i = _e((S, O) => {
    t((U) => U.map((z) => z.id === S ? O(z) : z));
  }, []), d = _e((S) => {
    t((O) => O.filter((U) => U.id !== S));
  }, []), u = _e((S) => {
    const O = Ve.safeParse(S);
    O.success && t(O.data);
  }, []), g = Le(
    () => ({
      total: e.length
    }),
    [e]
  );
  return {
    tasks: e,
    hydrated: r,
    addTask: o,
    updateTask: i,
    removeTask: d,
    replaceTasks: u,
    stats: g
  };
}, ia = ({ context: a }) => {
  const { tasks: e, hydrated: t, addTask: r, removeTask: n, updateTask: s, replaceTasks: o, stats: i } = sa(a), [d, u] = R(!1), [g, S] = R([]), [O, U] = R(0), [z, B] = R(""), [ie, F] = R(null), oe = (x, E, A, D) => {
    !E || !E.length || (F(x), S(E), U(A || 0), B(D || ""), u(!0));
  };
  be.openViewerCallback = oe;
  const [J, ae] = R(""), $ = V(null);
  ne(() => {
    const x = (E) => {
      const { tasks: A, ok: D } = Pe(E);
      D && A.length && o(A);
    };
    return a.eventBus.on("SAPWIKI_IMPORT", x), () => {
      a.eventBus.off("SAPWIKI_IMPORT", x);
    };
  }, [a, o]);
  const H = (x, E) => {
    s(x, (A) => ({ ...A, ...E }));
  }, k = async (x) => {
    const E = x.target.files?.[0];
    if (x.target.value = "", !E) return;
    const A = await E.text(), { tasks: D, ok: ve } = Pe(A);
    ve && o(D);
  }, T = () => $.current?.click(), b = () => {
    const x = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), E = URL.createObjectURL(x), A = document.createElement("a");
    A.href = E, A.download = "sapwiki-tasks.json", A.click(), URL.revokeObjectURL(E);
  };
  return /* @__PURE__ */ l.createElement("div", { className: "app", "data-theme": a.theme }, /* @__PURE__ */ l.createElement("header", { className: "hero card" }, /* @__PURE__ */ l.createElement("div", { className: "hero-copy" }, /* @__PURE__ */ l.createElement("h1", null, "Local wiki"), /* @__PURE__ */ l.createElement("p", { className: "muted" }, "Persisted locally with host storage. Import legacy backups, add notes, and keep images with each entry."), /* @__PURE__ */ l.createElement("div", { className: "chips" }, /* @__PURE__ */ l.createElement("span", { className: `chip ${t ? "chip-ok" : "chip-warn"}` }, /* @__PURE__ */ l.createElement("span", { className: "dot" }), " ", t ? "Ready" : "Restoring data..."), /* @__PURE__ */ l.createElement("span", { className: "chip soft" }, i.total, " entries"))), /* @__PURE__ */ l.createElement("div", { className: "hero-actions" }, /* @__PURE__ */ l.createElement("button", { className: "ghost", onClick: T, disabled: !t }, "Import JSON"), /* @__PURE__ */ l.createElement("button", { onClick: b, disabled: !t || !e.length }, "Export"), /* @__PURE__ */ l.createElement("input", { ref: $, type: "file", accept: "application/json", hidden: !0, onChange: k }), /* @__PURE__ */ l.createElement("div", { className: "header-search" }, /* @__PURE__ */ l.createElement(
    "input",
    {
      "aria-label": "Search entries",
      className: "search-input",
      placeholder: "Search title, description, steps, or T-code",
      value: J,
      onChange: (x) => ae(x.target.value)
    }
  )))), /* @__PURE__ */ l.createElement("section", { className: "layout" }, /* @__PURE__ */ l.createElement("div", { className: "panel card" }, /* @__PURE__ */ l.createElement("div", { className: "panel-header" }, /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement("h2", null, "Add an entry"), /* @__PURE__ */ l.createElement("p", { className: "muted" }, "Quickly record SAP cases, solutions, and visuals for future reference."))), /* @__PURE__ */ l.createElement(xt, { onSubmit: r })), /* @__PURE__ */ l.createElement("div", { className: "panel card" }, /* @__PURE__ */ l.createElement("div", { className: "panel-header" }, /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement("h2", null, "Notes"), /* @__PURE__ */ l.createElement("p", { className: "muted" }, "Edit inline, keep evidence, and tidy up when complete."))), /* @__PURE__ */ l.createElement(
    be,
    {
      tasks: Le(() => {
        const x = J.trim().toLowerCase();
        return x ? e.filter((E) => [E.title, E.requirement || "", E.steps || "", E.tCode || "", (E.tCodes || []).join(" ")].join(" ").toLowerCase().includes(x)) : e;
      }, [e, J]),
      onDelete: n,
      onUpdate: H
    }
  ))), /* @__PURE__ */ l.createElement(
    _t,
    {
      isOpen: d,
      images: g,
      initialIndex: O,
      title: z,
      onClose: () => u(!1),
      onSaveAnnotated: (x, E) => {
        ie && (s(ie, (A) => {
          const D = Array.isArray(A.images) ? A.images.slice() : [];
          return D[E] = x, { ...A, images: D, imageData: D[0] };
        }), u(!1));
      }
    }
  ));
}, oa = "#plugin-sapwiki{--bg: #f4f6fb;--card: #ffffff;--card-strong: #0f172a;--border: #e2e8f0;--text: #0f172a;--muted: #5b6577;--primary: #0f52ba;--primary-strong: #0a3c87;--accent: #22c55e;--warn: #f59e0b;font-family:Segoe UI,system-ui,-apple-system,sans-serif;color:var(--text);background:radial-gradient(circle at 20% 20%,#e5edff,transparent 45%),radial-gradient(circle at 80% 0%,#e8fff4,transparent 35%),var(--bg);min-height:100vh;overflow-x:hidden}#plugin-sapwiki .app{box-sizing:border-box;padding:12px 20px 24px;width:calc(100% - 40px);max-width:none;margin:0;display:flex;flex-direction:column;gap:12px}#plugin-sapwiki *,#plugin-sapwiki *:before,#plugin-sapwiki *:after{box-sizing:inherit}#plugin-sapwiki .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px 20px;box-shadow:0 14px 38px #0f172a14}#plugin-sapwiki .hero{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;background:linear-gradient(135deg,#0f172a,#153e75);color:#e2e8f0;border:none;box-shadow:0 20px 50px #0f172a47}#plugin-sapwiki .hero .muted{color:#e2e8f0d9}#plugin-sapwiki .hero h1{margin:6px 0 10px;color:#f8fafc}#plugin-sapwiki .hero-copy{max-width:640px}#plugin-sapwiki .hero-actions{display:flex;gap:10px;align-items:flex-start}#plugin-sapwiki .header-search{width:100%;margin-top:12px}#plugin-sapwiki .search-input{width:360px;max-width:100%;padding:10px 12px;border-radius:10px;border:1px solid var(--border);background:#fff;font:inherit}@media (min-width: 1000px){#plugin-sapwiki .hero-actions{align-items:center}#plugin-sapwiki .header-search{margin-left:12px;margin-top:0}}#plugin-sapwiki .eyebrow{text-transform:uppercase;letter-spacing:.08em;font-size:11px;color:inherit;margin:0 0 4px}#plugin-sapwiki .muted{color:var(--muted);margin:0}#plugin-sapwiki .chips{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}#plugin-sapwiki .chip{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;background:#ffffff14;color:#f8fafc;border:1px solid rgba(255,255,255,.16);font-weight:600}#plugin-sapwiki .chip.soft{background:#e2e8f0;color:var(--text);border:1px solid transparent}#plugin-sapwiki .chip-ok{background:#22c55e29;color:#e8fff2;border-color:#22c55e52}#plugin-sapwiki .chip-warn{background:#f59e0b2e;color:#fef3c7;border-color:#f59e0b4d}#plugin-sapwiki .dot{width:10px;height:10px;border-radius:50%;display:inline-block;background:#f8fafc;box-shadow:0 0 0 4px #ffffff14}#plugin-sapwiki .layout{display:flex;gap:20px;align-items:flex-start}#plugin-sapwiki .layout>.panel:first-child{flex:0 0 30%}#plugin-sapwiki .layout>.panel:last-child{flex:1 1 70%}#plugin-sapwiki .panel{display:flex;flex-direction:column;gap:12px}#plugin-sapwiki .panel.card{border:none;box-shadow:0 10px 30px #0f172a0f}#plugin-sapwiki .panel-header h2{margin:4px 0 6px}#plugin-sapwiki .label{text-transform:uppercase;font-size:12px;letter-spacing:.06em;color:var(--muted);margin:0}#plugin-sapwiki .toolbar,#plugin-sapwiki .actions{display:flex;gap:10px;align-items:center}#plugin-sapwiki button{padding:11px 16px;border-radius:12px;border:1px solid var(--primary-strong);background:var(--primary);color:#fff;font-weight:650;cursor:pointer;transition:transform .12s ease,box-shadow .16s ease,background .16s ease;box-shadow:0 8px 20px #0f52ba40}#plugin-sapwiki button:disabled{opacity:.6;cursor:not-allowed;box-shadow:none}#plugin-sapwiki button:hover:not(:disabled){transform:translateY(-1px);background:var(--primary-strong)}#plugin-sapwiki button.ghost{background:transparent;color:var(--primary-strong);border-color:var(--border);box-shadow:none}#plugin-sapwiki .hero button.ghost{color:#f8fafc;border-color:#ffffff47}#plugin-sapwiki .task-form{display:grid;gap:12px}#plugin-sapwiki .layout>.panel:first-child .task-form{display:flex;flex-direction:column;gap:12px;flex:0 0 auto}#plugin-sapwiki .layout>.panel:first-child .task-form .steps-field{display:flex;flex-direction:column;min-height:220px}#plugin-sapwiki .layout>.panel:first-child .task-form .steps-field textarea.steps-input{min-height:220px;resize:vertical}#plugin-sapwiki .layout>.panel:last-child .task-grid{flex:1 1 auto;overflow:auto}#plugin-sapwiki .task-card{display:flex;flex-direction:column;gap:12px;min-height:220px}#plugin-sapwiki .task-card .notes-field{display:flex;flex-direction:column}#plugin-sapwiki .task-card .notes-field textarea.notes-input{min-height:270px;resize:vertical}#plugin-sapwiki .field{display:flex;flex-direction:column;gap:6px}#plugin-sapwiki .two-col{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}#plugin-sapwiki label{font-weight:600;color:var(--text)}#plugin-sapwiki input,#plugin-sapwiki textarea{width:100%;border-radius:12px;border:1px solid var(--border);padding:12px 14px;font:inherit;background:#f8fafc;transition:border .12s ease,box-shadow .12s ease}#plugin-sapwiki input:focus,#plugin-sapwiki textarea:focus{border-color:var(--primary);box-shadow:0 0 0 4px #0f52ba1f;outline:none}#plugin-sapwiki textarea{resize:vertical;min-height:100px}#plugin-sapwiki .task-grid{display:grid;grid-template-columns:repeat(2,minmax(260px,1fr));gap:12px}#plugin-sapwiki .task-card h3{margin:4px 0 8px}#plugin-sapwiki .task-header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:8px}#plugin-sapwiki .tags{display:flex;flex-wrap:wrap;gap:6px}#plugin-sapwiki .tags .edit-tcodes-input{min-width:180px;max-width:420px;padding:8px 10px;border-radius:8px;border:1px solid var(--border);background:#fff;font:inherit}#plugin-sapwiki .tags .edit-actions{display:inline-flex;gap:8px;align-items:center}#plugin-sapwiki .tags button.small{padding:6px 8px;border-radius:8px;font-size:13px}#plugin-sapwiki .attach-field{border:2px dashed rgba(15,23,42,.08);background:linear-gradient(180deg,#f8fafc99,#f8fafc66);padding:12px;border-radius:12px;cursor:pointer}#plugin-sapwiki .attach-field.drag-over{border-color:#0f52ba99;box-shadow:0 6px 18px #0f52ba14}#plugin-sapwiki .attach-hint{color:var(--muted);padding:18px 10px}#plugin-sapwiki .attach-previews{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}#plugin-sapwiki .attach-preview{position:relative;width:96px;height:96px;border-radius:8px;overflow:hidden;border:1px solid var(--border);background:#fff}#plugin-sapwiki .attach-preview img{width:100%;height:100%;object-fit:cover;display:block}#plugin-sapwiki .attach-preview .remove{position:absolute;right:6px;top:6px}#plugin-sapwiki .pill{background:#e2e8f0;border-radius:999px;padding:4px 10px;font-size:12px;color:var(--text);border:1px solid transparent}#plugin-sapwiki .preview{width:100%;max-height:220px;object-fit:contain;border-radius:10px;border:1px solid var(--border);background:#f8fafc}#plugin-sapwiki .preview.clickable{cursor:pointer}#plugin-sapwiki .pv-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#0009;z-index:9999;padding:clamp(12px,2.2vw,24px)}#plugin-sapwiki .pv-dialog{width:min(96vw,1400px);max-height:calc(100dvh - 32px);border-radius:16px;background:#04243a;color:#fff;border:1px solid rgba(255,255,255,.08);padding:16px;box-shadow:0 30px 60px #02102899;overflow:auto}#plugin-sapwiki .pv-header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}#plugin-sapwiki .pv-title{font-weight:700;color:#d1fae5}#plugin-sapwiki .pv-controls button{margin-left:8px}#plugin-sapwiki .pv-controls button.ghost{color:#fff;border-color:#ffffff0f}#plugin-sapwiki .pv-toolbar{display:flex;gap:8px;align-items:center;margin-bottom:12px}#plugin-sapwiki .pv-toolbar button{padding:8px 10px;border-radius:10px}#plugin-sapwiki .pv-toolbar input[type=color]{-webkit-appearance:none;-moz-appearance:none;appearance:none;width:36px;height:36px;padding:0;border-radius:8px;border:1px solid rgba(255,255,255,.12);background:transparent;cursor:pointer}#plugin-sapwiki .pv-toolbar input[type=color]::-webkit-color-swatch-wrapper{padding:0}#plugin-sapwiki .pv-toolbar input[type=color]::-webkit-color-swatch{border-radius:6px;border:none}#plugin-sapwiki .pv-toolbar input[type=color]::-moz-color-swatch{border-radius:6px;border:none}#plugin-sapwiki .pv-toolbar button.active{background:#22c55e29;color:#eafff0}#plugin-sapwiki .pv-toolbar .primary{background:#10b981;color:#fff}#plugin-sapwiki .pv-body{display:flex;justify-content:center}#plugin-sapwiki .pv-image-wrap{position:relative}#plugin-sapwiki .pv-image{display:block;max-width:min(90vw,1320px);max-height:72vh;border-radius:12px}#plugin-sapwiki .pv-canvas{position:absolute;left:0;top:0}#plugin-sapwiki .pv-canvas.disabled{pointer-events:none}#plugin-sapwiki .pv-canvas.draw{cursor:crosshair}#plugin-sapwiki .pv-canvas.erase{cursor:cell}@media (max-width: 860px){#plugin-sapwiki .pv-dialog{width:min(98vw,1400px);padding:12px;border-radius:12px}#plugin-sapwiki .pv-header{flex-direction:column;align-items:flex-start}#plugin-sapwiki .pv-controls{width:100%;display:flex;flex-wrap:wrap;gap:8px}#plugin-sapwiki .pv-controls button{margin-left:0}#plugin-sapwiki .pv-toolbar{flex-wrap:wrap}#plugin-sapwiki .pv-image{max-height:62vh}}#plugin-sapwiki .field.images .image-row{display:flex;gap:8px;flex-wrap:wrap;align-items:flex-start}#plugin-sapwiki .field.images .image-row .preview{width:140px;height:96px;max-height:none;object-fit:cover}#plugin-sapwiki .empty{text-align:left;padding:16px;border-style:dashed;border-color:var(--border);background:linear-gradient(135deg,#f8fafc,#eef2ff)}@media (max-width: 900px){#plugin-sapwiki .layout{display:grid;grid-template-columns:1fr}#plugin-sapwiki .task-grid{grid-template-columns:1fr}#plugin-sapwiki .hero{align-items:flex-start}#plugin-sapwiki .hero-actions{width:100%;flex-wrap:wrap}#plugin-sapwiki button,#plugin-sapwiki button.ghost{width:auto}}", la = "0.0.0", ca = {
  version: la
};
let re = null, ke = null, K = null;
const da = (a) => {
  const e = a.querySelector(`#${Se}`);
  if (e) return e;
  const t = document.createElement("div");
  return t.id = Se, a.appendChild(t), t;
}, ua = () => {
  K || (K = document.createElement("style"), K.id = `${Se}-style`, K.textContent = oa, document.head.appendChild(K));
}, ha = {
  id: ft,
  name: "SAPWiki",
  version: ca?.version,
  mount(a, e) {
    ua();
    const t = da(a);
    ke = t, re && re.unmount(), re = vt(t), re.render(
      /* @__PURE__ */ l.createElement(l.StrictMode, null, /* @__PURE__ */ l.createElement(ia, { context: e }))
    );
  },
  unmount(a) {
    re && (re.unmount(), re = null), ke && (ke.replaceChildren(), ke = null);
    const e = a.querySelector(`#${Se}`);
    e && e.replaceChildren(), K && (K.remove(), K = null);
  }
};
export {
  ha as default
};
//# sourceMappingURL=plugin.js.map
