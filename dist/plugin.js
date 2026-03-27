import c, { useState as T, useRef as J, useMemo as De, useEffect as ce, useCallback as xe } from "react";
import { createRoot as vt } from "react-dom/client";
const _t = ({ onSubmit: r }) => {
  const [e, t] = T(""), [a, n] = T(""), [s, i] = T(""), [o, u] = T(""), [f, g] = T(""), [w, S] = T([]), B = (C) => new Promise((I, P) => {
    const Z = new FileReader();
    Z.onload = () => {
      typeof Z.result == "string" ? I(Z.result) : P(new Error("invalid file result"));
    }, Z.onerror = () => P(new Error("file read error")), Z.readAsDataURL(C);
  }), M = async (C) => {
    const I = C.target.files;
    if (!(!I || !I.length))
      try {
        const P = Array.from(I), Z = await Promise.all(P.map((ee) => B(ee)));
        S(Z);
      } catch (P) {
        console.error("failed to read images", P);
      }
  }, he = (C) => {
    C.preventDefault();
    const I = e.trim();
    if (!I) return;
    const P = s.split(",").map((Z) => Z.trim()).filter(Boolean);
    r({
      title: I,
      tCode: a.trim(),
      tCodes: P,
      requirement: o,
      steps: f,
      images: w
    }), t(""), n(""), i(""), u(""), g(""), S([]);
  };
  return /* @__PURE__ */ c.createElement("form", { className: "task-form", onSubmit: he }, /* @__PURE__ */ c.createElement("div", { className: "field" }, /* @__PURE__ */ c.createElement("label", null, "Title"), /* @__PURE__ */ c.createElement("input", { value: e, onChange: (C) => t(C.target.value), placeholder: "Entry title" })), /* @__PURE__ */ c.createElement("div", { className: "field two-col" }, /* @__PURE__ */ c.createElement("div", null, /* @__PURE__ */ c.createElement("label", null, "T-Code"), /* @__PURE__ */ c.createElement("input", { value: a, onChange: (C) => n(C.target.value), placeholder: "e.g. ZSE16" })), /* @__PURE__ */ c.createElement("div", null, /* @__PURE__ */ c.createElement("label", null, "T-Codes (comma)"), /* @__PURE__ */ c.createElement(
    "input",
    {
      value: s,
      onChange: (C) => i(C.target.value),
      placeholder: "SE16, MM03"
    }
  ))), /* @__PURE__ */ c.createElement("div", { className: "field" }, /* @__PURE__ */ c.createElement("label", null, "Requirement"), /* @__PURE__ */ c.createElement("textarea", { value: o, onChange: (C) => u(C.target.value), placeholder: "What are we solving?" })), /* @__PURE__ */ c.createElement("div", { className: "field" }, /* @__PURE__ */ c.createElement("label", null, "Steps"), /* @__PURE__ */ c.createElement(
    "textarea",
    {
      value: f,
      onChange: (C) => g(C.target.value),
      placeholder: "Step-by-step or reminders",
      rows: 4
    }
  )), /* @__PURE__ */ c.createElement("div", { className: "field" }, /* @__PURE__ */ c.createElement("label", null, "Attach screenshots / diagrams (optional)"), /* @__PURE__ */ c.createElement("input", { type: "file", accept: "image/*", multiple: !0, onChange: M }), w && w.length ? /* @__PURE__ */ c.createElement("small", null, w.length, " image(s) attached (", Math.round(w.reduce((C, I) => C + I.length, 0) * 3 / 4 / 1024), " KB)") : null), /* @__PURE__ */ c.createElement("div", { className: "actions" }, /* @__PURE__ */ c.createElement("button", { type: "submit" }, "Save entry")));
}, be = ({ tasks: r, onDelete: e, onUpdate: t }) => r.length ? /* @__PURE__ */ c.createElement("div", { className: "task-grid" }, r.map((a) => /* @__PURE__ */ c.createElement("article", { className: "card task-card", key: a.id }, /* @__PURE__ */ c.createElement("header", { className: "task-header" }, /* @__PURE__ */ c.createElement("div", null, /* @__PURE__ */ c.createElement("div", { className: "eyebrow" }, new Date(a.createdAt).toLocaleString()), /* @__PURE__ */ c.createElement("h3", null, a.title), /* @__PURE__ */ c.createElement("div", { className: "tags" }, a.tCode ? /* @__PURE__ */ c.createElement("span", { className: "pill" }, a.tCode) : null, a.tCodes?.map((n) => /* @__PURE__ */ c.createElement("span", { key: `${a.id}-${n}`, className: "pill" }, n)))), /* @__PURE__ */ c.createElement("button", { className: "ghost", onClick: () => e(a.id) }, "Delete")), /* @__PURE__ */ c.createElement("div", { className: "field" }, /* @__PURE__ */ c.createElement("label", null, "Description"), /* @__PURE__ */ c.createElement(
  "textarea",
  {
    defaultValue: a.requirement,
    onBlur: (n) => t(a.id, { requirement: n.target.value }),
    rows: 3
  }
)), /* @__PURE__ */ c.createElement("div", { className: "field" }, /* @__PURE__ */ c.createElement("label", null, "Steps / Notes"), /* @__PURE__ */ c.createElement(
  "textarea",
  {
    defaultValue: a.steps,
    onBlur: (n) => t(a.id, { steps: n.target.value }),
    rows: 4
  }
)), (() => {
  const n = Array.isArray(a.images) && a.images.length ? a.images : a.imageData ? [a.imageData] : [];
  return n.length ? /* @__PURE__ */ c.createElement("div", { className: "field images" }, /* @__PURE__ */ c.createElement("label", null, "Image(s)"), /* @__PURE__ */ c.createElement("div", { className: "image-row" }, n.map((s, i) => /* @__PURE__ */ c.createElement(
    "img",
    {
      key: `${a.id}-img-${i}`,
      src: s,
      alt: `${a.title} ${i + 1}`,
      className: "preview clickable",
      onClick: () => {
        typeof be.openViewerCallback == "function" && be.openViewerCallback(a.id, n, i, a.title);
      }
    }
  )))) : null;
})()))) : /* @__PURE__ */ c.createElement("div", { className: "empty card" }, /* @__PURE__ */ c.createElement("h3", null, "No entries yet"), /* @__PURE__ */ c.createElement("p", { className: "muted" }, "Add a new entry or import from your legacy backup."));
function xt({
  isOpen: r,
  images: e,
  initialIndex: t,
  title: a = "",
  onClose: n,
  onSaveAnnotated: s
}) {
  const [i, o] = T(t), [u, f] = T(!1), [g, w] = T(!1), [S, B] = T("#ff3344"), [M, he] = T(4), [C, I] = T(0), [P, Z] = T(!1), ee = J(null), z = J(null), ne = J(!1), se = J(!1), te = J(null), $ = J([]), N = De(() => e[i], [e, i]);
  ce(() => {
    r && (o(t), f(!1), w(!1));
  }, [t, r]), ce(() => {
    if (!r) return;
    const m = (x) => {
      x.key === "Escape" && n(), x.key === "ArrowRight" && o((O) => (O + 1) % e.length), x.key === "ArrowLeft" && o((O) => (O - 1 + e.length) % e.length);
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [e.length, r, n]);
  const E = () => {
    const m = z.current;
    if (!m) return;
    const x = m.toDataURL("image/png");
    $.current[$.current.length - 1] !== x && ($.current = [...$.current, x], I($.current.length - 1));
  }, A = () => {
    const m = ee.current, x = z.current;
    if (!m || !x) return;
    x.width = m.clientWidth, x.height = m.clientHeight;
    const O = x.getContext("2d");
    O && (O.clearRect(0, 0, x.width, x.height), $.current = [x.toDataURL("image/png")], I(0));
  };
  ce(() => {
    if (!r) return;
    const m = () => A();
    return window.addEventListener("resize", m), () => window.removeEventListener("resize", m);
  }, [r, i]);
  const D = (m, x) => {
    const O = z.current;
    if (!O) return;
    const j = O.getContext("2d");
    j && (j.globalCompositeOperation = g ? "destination-out" : "source-over", j.strokeStyle = g ? "rgba(0,0,0,1)" : S, j.lineWidth = M, j.lineCap = "round", j.lineJoin = "round", j.beginPath(), j.moveTo(m.x, m.y), j.lineTo(x.x, x.y), j.stroke());
  }, ve = (m) => {
    const x = z.current;
    if (!x) return { x: 0, y: 0 };
    const O = x.getBoundingClientRect();
    return { x: m.clientX - O.left, y: m.clientY - O.top };
  }, ht = (m) => {
    if (!u) return;
    const x = ve(m);
    ne.current = !0, se.current = !0, te.current = x, D(x, x), m.currentTarget.setPointerCapture(m.pointerId);
  }, mt = (m) => {
    if (!u || !ne.current || !te.current) return;
    const x = ve(m);
    D(te.current, x), se.current = !0, te.current = x;
  }, Me = (m) => {
    ne.current && se.current && E(), ne.current = !1, se.current = !1, te.current = null, m.currentTarget.hasPointerCapture(m.pointerId) && m.currentTarget.releasePointerCapture(m.pointerId);
  }, gt = () => {
    const m = z.current;
    if (!m || $.current.length <= 1) return;
    $.current = $.current.slice(0, -1);
    const x = $.current[$.current.length - 1];
    if (!x) return;
    const O = m.getContext("2d");
    if (!O) return;
    const j = new Image();
    j.onload = () => {
      O.clearRect(0, 0, m.width, m.height), O.drawImage(j, 0, 0, m.width, m.height), I($.current.length - 1);
    }, j.src = x;
  }, Ue = () => {
    const m = z.current;
    if (!m) return;
    const x = m.getContext("2d");
    x && (x.clearRect(0, 0, m.width, m.height), E());
  }, yt = async () => {
    const m = e[i], x = z.current, O = ee.current;
    if (!(!m || !x || !O)) {
      Z(!0);
      try {
        const j = await new Promise((Be, qe) => {
          const ie = new Image();
          ie.onload = () => {
            const q = document.createElement("canvas");
            q.width = ie.naturalWidth, q.height = ie.naturalHeight;
            const Ae = q.getContext("2d");
            if (!Ae) {
              qe(new Error("Could not create drawing context."));
              return;
            }
            Ae.drawImage(ie, 0, 0, q.width, q.height);
            const _e = new Image();
            _e.onload = () => {
              Ae.drawImage(_e, 0, 0, q.width, q.height), Be(q.toDataURL("image/png"));
            }, _e.onerror = () => Be(q.toDataURL("image/png")), _e.src = x.toDataURL("image/png");
          }, ie.onerror = () => qe(new Error("Failed to load source image.")), ie.src = m;
        });
        s(j, i), Ue(), f(!1), w(!1);
      } finally {
        Z(!1);
      }
    }
  };
  return !r || e.length === 0 || !N ? null : /* @__PURE__ */ c.createElement("div", { className: "pv-overlay", role: "dialog", "aria-modal": "true" }, /* @__PURE__ */ c.createElement("div", { className: "pv-dialog" }, /* @__PURE__ */ c.createElement("div", { className: "pv-header" }, /* @__PURE__ */ c.createElement("p", { className: "pv-title" }, a, " - Image ", i + 1, " / ", e.length), /* @__PURE__ */ c.createElement("div", { className: "pv-controls" }, /* @__PURE__ */ c.createElement("button", { type: "button", onClick: () => o((m) => (m - 1 + e.length) % e.length) }, "Prev"), /* @__PURE__ */ c.createElement("button", { type: "button", onClick: () => o((m) => (m + 1) % e.length) }, "Next"), /* @__PURE__ */ c.createElement("button", { type: "button", onClick: n, className: "ghost" }, "Close"))), /* @__PURE__ */ c.createElement("div", { className: "pv-toolbar" }, /* @__PURE__ */ c.createElement("button", { type: "button", onClick: () => f((m) => !m), className: u ? "active" : "" }, u ? "Drawing On" : "Enable Draw"), /* @__PURE__ */ c.createElement("button", { type: "button", onClick: () => {
    w((m) => !m), u || f(!0);
  }, className: g ? "active" : "" }, g ? "Eraser On" : "Eraser"), /* @__PURE__ */ c.createElement("label", null, "Color"), /* @__PURE__ */ c.createElement("input", { type: "color", value: S, onChange: (m) => B(m.target.value), "aria-label": "Brush color" }), /* @__PURE__ */ c.createElement("label", { htmlFor: "brush-size" }, "Brush"), /* @__PURE__ */ c.createElement("input", { id: "brush-size", type: "range", min: 2, max: 18, value: M, onChange: (m) => he(Number(m.target.value)) }), /* @__PURE__ */ c.createElement("button", { type: "button", onClick: gt, disabled: C === 0 }, "Undo"), /* @__PURE__ */ c.createElement("button", { type: "button", onClick: Ue }, "Clear Marks"), /* @__PURE__ */ c.createElement("button", { type: "button", onClick: yt, disabled: P, className: "primary" }, P ? "Saving..." : "Save Marked Copy")), /* @__PURE__ */ c.createElement("div", { className: "pv-body" }, /* @__PURE__ */ c.createElement("div", { className: "pv-image-wrap" }, /* @__PURE__ */ c.createElement("img", { ref: ee, src: N, alt: `Viewer image ${i + 1}`, className: "pv-image", onLoad: A }), /* @__PURE__ */ c.createElement("canvas", { ref: z, className: `pv-canvas ${u ? g ? "erase" : "draw" : "disabled"}`, onPointerDown: ht, onPointerMove: mt, onPointerUp: Me, onPointerLeave: Me })))));
}
var b;
(function(r) {
  r.assertEqual = (n) => {
  };
  function e(n) {
  }
  r.assertIs = e;
  function t(n) {
    throw new Error();
  }
  r.assertNever = t, r.arrayToEnum = (n) => {
    const s = {};
    for (const i of n)
      s[i] = i;
    return s;
  }, r.getValidEnumValues = (n) => {
    const s = r.objectKeys(n).filter((o) => typeof n[n[o]] != "number"), i = {};
    for (const o of s)
      i[o] = n[o];
    return r.objectValues(i);
  }, r.objectValues = (n) => r.objectKeys(n).map(function(s) {
    return n[s];
  }), r.objectKeys = typeof Object.keys == "function" ? (n) => Object.keys(n) : (n) => {
    const s = [];
    for (const i in n)
      Object.prototype.hasOwnProperty.call(n, i) && s.push(i);
    return s;
  }, r.find = (n, s) => {
    for (const i of n)
      if (s(i))
        return i;
  }, r.isInteger = typeof Number.isInteger == "function" ? (n) => Number.isInteger(n) : (n) => typeof n == "number" && Number.isFinite(n) && Math.floor(n) === n;
  function a(n, s = " | ") {
    return n.map((i) => typeof i == "string" ? `'${i}'` : i).join(s);
  }
  r.joinValues = a, r.jsonStringifyReplacer = (n, s) => typeof s == "bigint" ? s.toString() : s;
})(b || (b = {}));
var Fe;
(function(r) {
  r.mergeShapes = (e, t) => ({
    ...e,
    ...t
    // second overwrites first
  });
})(Fe || (Fe = {}));
const p = b.arrayToEnum([
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
]), H = (r) => {
  switch (typeof r) {
    case "undefined":
      return p.undefined;
    case "string":
      return p.string;
    case "number":
      return Number.isNaN(r) ? p.nan : p.number;
    case "boolean":
      return p.boolean;
    case "function":
      return p.function;
    case "bigint":
      return p.bigint;
    case "symbol":
      return p.symbol;
    case "object":
      return Array.isArray(r) ? p.array : r === null ? p.null : r.then && typeof r.then == "function" && r.catch && typeof r.catch == "function" ? p.promise : typeof Map < "u" && r instanceof Map ? p.map : typeof Set < "u" && r instanceof Set ? p.set : typeof Date < "u" && r instanceof Date ? p.date : p.object;
    default:
      return p.unknown;
  }
}, l = b.arrayToEnum([
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
class F extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(), this.issues = [], this.addIssue = (a) => {
      this.issues = [...this.issues, a];
    }, this.addIssues = (a = []) => {
      this.issues = [...this.issues, ...a];
    };
    const t = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const t = e || function(s) {
      return s.message;
    }, a = { _errors: [] }, n = (s) => {
      for (const i of s.issues)
        if (i.code === "invalid_union")
          i.unionErrors.map(n);
        else if (i.code === "invalid_return_type")
          n(i.returnTypeError);
        else if (i.code === "invalid_arguments")
          n(i.argumentsError);
        else if (i.path.length === 0)
          a._errors.push(t(i));
        else {
          let o = a, u = 0;
          for (; u < i.path.length; ) {
            const f = i.path[u];
            u === i.path.length - 1 ? (o[f] = o[f] || { _errors: [] }, o[f]._errors.push(t(i))) : o[f] = o[f] || { _errors: [] }, o = o[f], u++;
          }
        }
    };
    return n(this), a;
  }
  static assert(e) {
    if (!(e instanceof F))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, b.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (t) => t.message) {
    const t = {}, a = [];
    for (const n of this.issues)
      if (n.path.length > 0) {
        const s = n.path[0];
        t[s] = t[s] || [], t[s].push(e(n));
      } else
        a.push(e(n));
    return { formErrors: a, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
F.create = (r) => new F(r);
const Oe = (r, e) => {
  let t;
  switch (r.code) {
    case l.invalid_type:
      r.received === p.undefined ? t = "Required" : t = `Expected ${r.expected}, received ${r.received}`;
      break;
    case l.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(r.expected, b.jsonStringifyReplacer)}`;
      break;
    case l.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${b.joinValues(r.keys, ", ")}`;
      break;
    case l.invalid_union:
      t = "Invalid input";
      break;
    case l.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${b.joinValues(r.options)}`;
      break;
    case l.invalid_enum_value:
      t = `Invalid enum value. Expected ${b.joinValues(r.options)}, received '${r.received}'`;
      break;
    case l.invalid_arguments:
      t = "Invalid function arguments";
      break;
    case l.invalid_return_type:
      t = "Invalid function return type";
      break;
    case l.invalid_date:
      t = "Invalid date";
      break;
    case l.invalid_string:
      typeof r.validation == "object" ? "includes" in r.validation ? (t = `Invalid input: must include "${r.validation.includes}"`, typeof r.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${r.validation.position}`)) : "startsWith" in r.validation ? t = `Invalid input: must start with "${r.validation.startsWith}"` : "endsWith" in r.validation ? t = `Invalid input: must end with "${r.validation.endsWith}"` : b.assertNever(r.validation) : r.validation !== "regex" ? t = `Invalid ${r.validation}` : t = "Invalid";
      break;
    case l.too_small:
      r.type === "array" ? t = `Array must contain ${r.exact ? "exactly" : r.inclusive ? "at least" : "more than"} ${r.minimum} element(s)` : r.type === "string" ? t = `String must contain ${r.exact ? "exactly" : r.inclusive ? "at least" : "over"} ${r.minimum} character(s)` : r.type === "number" ? t = `Number must be ${r.exact ? "exactly equal to " : r.inclusive ? "greater than or equal to " : "greater than "}${r.minimum}` : r.type === "bigint" ? t = `Number must be ${r.exact ? "exactly equal to " : r.inclusive ? "greater than or equal to " : "greater than "}${r.minimum}` : r.type === "date" ? t = `Date must be ${r.exact ? "exactly equal to " : r.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(r.minimum))}` : t = "Invalid input";
      break;
    case l.too_big:
      r.type === "array" ? t = `Array must contain ${r.exact ? "exactly" : r.inclusive ? "at most" : "less than"} ${r.maximum} element(s)` : r.type === "string" ? t = `String must contain ${r.exact ? "exactly" : r.inclusive ? "at most" : "under"} ${r.maximum} character(s)` : r.type === "number" ? t = `Number must be ${r.exact ? "exactly" : r.inclusive ? "less than or equal to" : "less than"} ${r.maximum}` : r.type === "bigint" ? t = `BigInt must be ${r.exact ? "exactly" : r.inclusive ? "less than or equal to" : "less than"} ${r.maximum}` : r.type === "date" ? t = `Date must be ${r.exact ? "exactly" : r.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(r.maximum))}` : t = "Invalid input";
      break;
    case l.custom:
      t = "Invalid input";
      break;
    case l.invalid_intersection_types:
      t = "Intersection results could not be merged";
      break;
    case l.not_multiple_of:
      t = `Number must be a multiple of ${r.multipleOf}`;
      break;
    case l.not_finite:
      t = "Number must be finite";
      break;
    default:
      t = e.defaultError, b.assertNever(r);
  }
  return { message: t };
};
let kt = Oe;
function bt() {
  return kt;
}
const wt = (r) => {
  const { data: e, path: t, errorMaps: a, issueData: n } = r, s = [...t, ...n.path || []], i = {
    ...n,
    path: s
  };
  if (n.message !== void 0)
    return {
      ...n,
      path: s,
      message: n.message
    };
  let o = "";
  const u = a.filter((f) => !!f).slice().reverse();
  for (const f of u)
    o = f(i, { data: e, defaultError: o }).message;
  return {
    ...n,
    path: s,
    message: o
  };
};
function d(r, e) {
  const t = bt(), a = wt({
    issueData: e,
    data: r.data,
    path: r.path,
    errorMaps: [
      r.common.contextualErrorMap,
      // contextual error map is first priority
      r.schemaErrorMap,
      // then schema-bound map if available
      t,
      // then global override map
      t === Oe ? void 0 : Oe
      // then global default map
    ].filter((n) => !!n)
  });
  r.common.issues.push(a);
}
class L {
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
    const a = [];
    for (const n of t) {
      if (n.status === "aborted")
        return y;
      n.status === "dirty" && e.dirty(), a.push(n.value);
    }
    return { status: e.value, value: a };
  }
  static async mergeObjectAsync(e, t) {
    const a = [];
    for (const n of t) {
      const s = await n.key, i = await n.value;
      a.push({
        key: s,
        value: i
      });
    }
    return L.mergeObjectSync(e, a);
  }
  static mergeObjectSync(e, t) {
    const a = {};
    for (const n of t) {
      const { key: s, value: i } = n;
      if (s.status === "aborted" || i.status === "aborted")
        return y;
      s.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), s.value !== "__proto__" && (typeof i.value < "u" || n.alwaysSet) && (a[s.value] = i.value);
    }
    return { status: e.value, value: a };
  }
}
const y = Object.freeze({
  status: "aborted"
}), me = (r) => ({ status: "dirty", value: r }), V = (r) => ({ status: "valid", value: r }), We = (r) => r.status === "aborted", Je = (r) => r.status === "dirty", le = (r) => r.status === "valid", we = (r) => typeof Promise < "u" && r instanceof Promise;
var h;
(function(r) {
  r.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, r.toString = (e) => typeof e == "string" ? e : e?.message;
})(h || (h = {}));
class Q {
  constructor(e, t, a, n) {
    this._cachedPath = [], this.parent = e, this.data = t, this._path = a, this._key = n;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const He = (r, e) => {
  if (le(e))
    return { success: !0, data: e.value };
  if (!r.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const t = new F(r.common.issues);
      return this._error = t, this._error;
    }
  };
};
function _(r) {
  if (!r)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: a, description: n } = r;
  if (e && (t || a))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: n } : { errorMap: (i, o) => {
    const { message: u } = r;
    return i.code === "invalid_enum_value" ? { message: u ?? o.defaultError } : typeof o.data > "u" ? { message: u ?? a ?? o.defaultError } : i.code !== "invalid_type" ? { message: o.defaultError } : { message: u ?? t ?? o.defaultError };
  }, description: n };
}
class k {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return H(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: H(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new L(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: H(e.data),
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
    const a = this.safeParse(e, t);
    if (a.success)
      return a.data;
    throw a.error;
  }
  safeParse(e, t) {
    const a = {
      common: {
        issues: [],
        async: t?.async ?? !1,
        contextualErrorMap: t?.errorMap
      },
      path: t?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: H(e)
    }, n = this._parseSync({ data: e, path: a.path, parent: a });
    return He(a, n);
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
      parsedType: H(e)
    };
    if (!this["~standard"].async)
      try {
        const a = this._parseSync({ data: e, path: [], parent: t });
        return le(a) ? {
          value: a.value
        } : {
          issues: t.common.issues
        };
      } catch (a) {
        a?.message?.toLowerCase()?.includes("encountered") && (this["~standard"].async = !0), t.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: t }).then((a) => le(a) ? {
      value: a.value
    } : {
      issues: t.common.issues
    });
  }
  async parseAsync(e, t) {
    const a = await this.safeParseAsync(e, t);
    if (a.success)
      return a.data;
    throw a.error;
  }
  async safeParseAsync(e, t) {
    const a = {
      common: {
        issues: [],
        contextualErrorMap: t?.errorMap,
        async: !0
      },
      path: t?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: H(e)
    }, n = this._parse({ data: e, path: a.path, parent: a }), s = await (we(n) ? n : Promise.resolve(n));
    return He(a, s);
  }
  refine(e, t) {
    const a = (n) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(n) : t;
    return this._refinement((n, s) => {
      const i = e(n), o = () => s.addIssue({
        code: l.custom,
        ...a(n)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((u) => u ? !0 : (o(), !1)) : i ? !0 : (o(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((a, n) => e(a) ? !0 : (n.addIssue(typeof t == "function" ? t(a, n) : t), !1));
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
    return K.create(this, this._def);
  }
  nullable() {
    return pe.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return U.create(this);
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
    return new Wt({
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
    return Ve.create(this, e);
  }
  readonly() {
    return $e.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Et = /^c[^\s-]{8,}$/i, Ct = /^[0-9a-z]+$/, Nt = /^[0-9A-HJKMNP-TV-Z]{26}$/i, Tt = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, St = /^[a-z0-9_-]{21}$/i, At = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Rt = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Ot = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, It = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Re;
const Zt = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, jt = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, $t = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Pt = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Lt = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Dt = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, lt = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Vt = new RegExp(`^${lt}$`);
function dt(r) {
  let e = "[0-5]\\d";
  r.precision ? e = `${e}\\.\\d{${r.precision}}` : r.precision == null && (e = `${e}(\\.\\d+)?`);
  const t = r.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${t}`;
}
function zt(r) {
  return new RegExp(`^${dt(r)}$`);
}
function Mt(r) {
  let e = `${lt}T${dt(r)}`;
  const t = [];
  return t.push(r.local ? "Z?" : "Z"), r.offset && t.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${t.join("|")})`, new RegExp(`^${e}$`);
}
function Ut(r, e) {
  return !!((e === "v4" || !e) && Zt.test(r) || (e === "v6" || !e) && $t.test(r));
}
function Bt(r, e) {
  if (!At.test(r))
    return !1;
  try {
    const [t] = r.split(".");
    if (!t)
      return !1;
    const a = t.replace(/-/g, "+").replace(/_/g, "/").padEnd(t.length + (4 - t.length % 4) % 4, "="), n = JSON.parse(atob(a));
    return !(typeof n != "object" || n === null || "typ" in n && n?.typ !== "JWT" || !n.alg || e && n.alg !== e);
  } catch {
    return !1;
  }
}
function qt(r, e) {
  return !!((e === "v4" || !e) && jt.test(r) || (e === "v6" || !e) && Pt.test(r));
}
class Y extends k {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== p.string) {
      const s = this._getOrReturnCtx(e);
      return d(s, {
        code: l.invalid_type,
        expected: p.string,
        received: s.parsedType
      }), y;
    }
    const a = new L();
    let n;
    for (const s of this._def.checks)
      if (s.kind === "min")
        e.data.length < s.value && (n = this._getOrReturnCtx(e, n), d(n, {
          code: l.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), a.dirty());
      else if (s.kind === "max")
        e.data.length > s.value && (n = this._getOrReturnCtx(e, n), d(n, {
          code: l.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), a.dirty());
      else if (s.kind === "length") {
        const i = e.data.length > s.value, o = e.data.length < s.value;
        (i || o) && (n = this._getOrReturnCtx(e, n), i ? d(n, {
          code: l.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }) : o && d(n, {
          code: l.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }), a.dirty());
      } else if (s.kind === "email")
        Ot.test(e.data) || (n = this._getOrReturnCtx(e, n), d(n, {
          validation: "email",
          code: l.invalid_string,
          message: s.message
        }), a.dirty());
      else if (s.kind === "emoji")
        Re || (Re = new RegExp(It, "u")), Re.test(e.data) || (n = this._getOrReturnCtx(e, n), d(n, {
          validation: "emoji",
          code: l.invalid_string,
          message: s.message
        }), a.dirty());
      else if (s.kind === "uuid")
        Tt.test(e.data) || (n = this._getOrReturnCtx(e, n), d(n, {
          validation: "uuid",
          code: l.invalid_string,
          message: s.message
        }), a.dirty());
      else if (s.kind === "nanoid")
        St.test(e.data) || (n = this._getOrReturnCtx(e, n), d(n, {
          validation: "nanoid",
          code: l.invalid_string,
          message: s.message
        }), a.dirty());
      else if (s.kind === "cuid")
        Et.test(e.data) || (n = this._getOrReturnCtx(e, n), d(n, {
          validation: "cuid",
          code: l.invalid_string,
          message: s.message
        }), a.dirty());
      else if (s.kind === "cuid2")
        Ct.test(e.data) || (n = this._getOrReturnCtx(e, n), d(n, {
          validation: "cuid2",
          code: l.invalid_string,
          message: s.message
        }), a.dirty());
      else if (s.kind === "ulid")
        Nt.test(e.data) || (n = this._getOrReturnCtx(e, n), d(n, {
          validation: "ulid",
          code: l.invalid_string,
          message: s.message
        }), a.dirty());
      else if (s.kind === "url")
        try {
          new URL(e.data);
        } catch {
          n = this._getOrReturnCtx(e, n), d(n, {
            validation: "url",
            code: l.invalid_string,
            message: s.message
          }), a.dirty();
        }
      else s.kind === "regex" ? (s.regex.lastIndex = 0, s.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), d(n, {
        validation: "regex",
        code: l.invalid_string,
        message: s.message
      }), a.dirty())) : s.kind === "trim" ? e.data = e.data.trim() : s.kind === "includes" ? e.data.includes(s.value, s.position) || (n = this._getOrReturnCtx(e, n), d(n, {
        code: l.invalid_string,
        validation: { includes: s.value, position: s.position },
        message: s.message
      }), a.dirty()) : s.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : s.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : s.kind === "startsWith" ? e.data.startsWith(s.value) || (n = this._getOrReturnCtx(e, n), d(n, {
        code: l.invalid_string,
        validation: { startsWith: s.value },
        message: s.message
      }), a.dirty()) : s.kind === "endsWith" ? e.data.endsWith(s.value) || (n = this._getOrReturnCtx(e, n), d(n, {
        code: l.invalid_string,
        validation: { endsWith: s.value },
        message: s.message
      }), a.dirty()) : s.kind === "datetime" ? Mt(s).test(e.data) || (n = this._getOrReturnCtx(e, n), d(n, {
        code: l.invalid_string,
        validation: "datetime",
        message: s.message
      }), a.dirty()) : s.kind === "date" ? Vt.test(e.data) || (n = this._getOrReturnCtx(e, n), d(n, {
        code: l.invalid_string,
        validation: "date",
        message: s.message
      }), a.dirty()) : s.kind === "time" ? zt(s).test(e.data) || (n = this._getOrReturnCtx(e, n), d(n, {
        code: l.invalid_string,
        validation: "time",
        message: s.message
      }), a.dirty()) : s.kind === "duration" ? Rt.test(e.data) || (n = this._getOrReturnCtx(e, n), d(n, {
        validation: "duration",
        code: l.invalid_string,
        message: s.message
      }), a.dirty()) : s.kind === "ip" ? Ut(e.data, s.version) || (n = this._getOrReturnCtx(e, n), d(n, {
        validation: "ip",
        code: l.invalid_string,
        message: s.message
      }), a.dirty()) : s.kind === "jwt" ? Bt(e.data, s.alg) || (n = this._getOrReturnCtx(e, n), d(n, {
        validation: "jwt",
        code: l.invalid_string,
        message: s.message
      }), a.dirty()) : s.kind === "cidr" ? qt(e.data, s.version) || (n = this._getOrReturnCtx(e, n), d(n, {
        validation: "cidr",
        code: l.invalid_string,
        message: s.message
      }), a.dirty()) : s.kind === "base64" ? Lt.test(e.data) || (n = this._getOrReturnCtx(e, n), d(n, {
        validation: "base64",
        code: l.invalid_string,
        message: s.message
      }), a.dirty()) : s.kind === "base64url" ? Dt.test(e.data) || (n = this._getOrReturnCtx(e, n), d(n, {
        validation: "base64url",
        code: l.invalid_string,
        message: s.message
      }), a.dirty()) : b.assertNever(s);
    return { status: a.value, value: e.data };
  }
  _regex(e, t, a) {
    return this.refinement((n) => e.test(n), {
      validation: t,
      code: l.invalid_string,
      ...h.errToObj(a)
    });
  }
  _addCheck(e) {
    return new Y({
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
    return new Y({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new Y({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new Y({
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
Y.create = (r) => new Y({
  checks: [],
  typeName: v.ZodString,
  coerce: r?.coerce ?? !1,
  ..._(r)
});
function Ft(r, e) {
  const t = (r.toString().split(".")[1] || "").length, a = (e.toString().split(".")[1] || "").length, n = t > a ? t : a, s = Number.parseInt(r.toFixed(n).replace(".", "")), i = Number.parseInt(e.toFixed(n).replace(".", ""));
  return s % i / 10 ** n;
}
class de extends k {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== p.number) {
      const s = this._getOrReturnCtx(e);
      return d(s, {
        code: l.invalid_type,
        expected: p.number,
        received: s.parsedType
      }), y;
    }
    let a;
    const n = new L();
    for (const s of this._def.checks)
      s.kind === "int" ? b.isInteger(e.data) || (a = this._getOrReturnCtx(e, a), d(a, {
        code: l.invalid_type,
        expected: "integer",
        received: "float",
        message: s.message
      }), n.dirty()) : s.kind === "min" ? (s.inclusive ? e.data < s.value : e.data <= s.value) && (a = this._getOrReturnCtx(e, a), d(a, {
        code: l.too_small,
        minimum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), n.dirty()) : s.kind === "max" ? (s.inclusive ? e.data > s.value : e.data >= s.value) && (a = this._getOrReturnCtx(e, a), d(a, {
        code: l.too_big,
        maximum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), n.dirty()) : s.kind === "multipleOf" ? Ft(e.data, s.value) !== 0 && (a = this._getOrReturnCtx(e, a), d(a, {
        code: l.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), n.dirty()) : s.kind === "finite" ? Number.isFinite(e.data) || (a = this._getOrReturnCtx(e, a), d(a, {
        code: l.not_finite,
        message: s.message
      }), n.dirty()) : b.assertNever(s);
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
  setLimit(e, t, a, n) {
    return new de({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: a,
          message: h.toString(n)
        }
      ]
    });
  }
  _addCheck(e) {
    return new de({
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
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && b.isInteger(e.value));
  }
  get isFinite() {
    let e = null, t = null;
    for (const a of this._def.checks) {
      if (a.kind === "finite" || a.kind === "int" || a.kind === "multipleOf")
        return !0;
      a.kind === "min" ? (t === null || a.value > t) && (t = a.value) : a.kind === "max" && (e === null || a.value < e) && (e = a.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
}
de.create = (r) => new de({
  checks: [],
  typeName: v.ZodNumber,
  coerce: r?.coerce || !1,
  ..._(r)
});
class ge extends k {
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
    if (this._getType(e) !== p.bigint)
      return this._getInvalidInput(e);
    let a;
    const n = new L();
    for (const s of this._def.checks)
      s.kind === "min" ? (s.inclusive ? e.data < s.value : e.data <= s.value) && (a = this._getOrReturnCtx(e, a), d(a, {
        code: l.too_small,
        type: "bigint",
        minimum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), n.dirty()) : s.kind === "max" ? (s.inclusive ? e.data > s.value : e.data >= s.value) && (a = this._getOrReturnCtx(e, a), d(a, {
        code: l.too_big,
        type: "bigint",
        maximum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), n.dirty()) : s.kind === "multipleOf" ? e.data % s.value !== BigInt(0) && (a = this._getOrReturnCtx(e, a), d(a, {
        code: l.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), n.dirty()) : b.assertNever(s);
    return { status: n.value, value: e.data };
  }
  _getInvalidInput(e) {
    const t = this._getOrReturnCtx(e);
    return d(t, {
      code: l.invalid_type,
      expected: p.bigint,
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
  setLimit(e, t, a, n) {
    return new ge({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: a,
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
ge.create = (r) => new ge({
  checks: [],
  typeName: v.ZodBigInt,
  coerce: r?.coerce ?? !1,
  ..._(r)
});
class Ge extends k {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== p.boolean) {
      const a = this._getOrReturnCtx(e);
      return d(a, {
        code: l.invalid_type,
        expected: p.boolean,
        received: a.parsedType
      }), y;
    }
    return V(e.data);
  }
}
Ge.create = (r) => new Ge({
  typeName: v.ZodBoolean,
  coerce: r?.coerce || !1,
  ..._(r)
});
class Ee extends k {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== p.date) {
      const s = this._getOrReturnCtx(e);
      return d(s, {
        code: l.invalid_type,
        expected: p.date,
        received: s.parsedType
      }), y;
    }
    if (Number.isNaN(e.data.getTime())) {
      const s = this._getOrReturnCtx(e);
      return d(s, {
        code: l.invalid_date
      }), y;
    }
    const a = new L();
    let n;
    for (const s of this._def.checks)
      s.kind === "min" ? e.data.getTime() < s.value && (n = this._getOrReturnCtx(e, n), d(n, {
        code: l.too_small,
        message: s.message,
        inclusive: !0,
        exact: !1,
        minimum: s.value,
        type: "date"
      }), a.dirty()) : s.kind === "max" ? e.data.getTime() > s.value && (n = this._getOrReturnCtx(e, n), d(n, {
        code: l.too_big,
        message: s.message,
        inclusive: !0,
        exact: !1,
        maximum: s.value,
        type: "date"
      }), a.dirty()) : b.assertNever(s);
    return {
      status: a.value,
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
Ee.create = (r) => new Ee({
  checks: [],
  coerce: r?.coerce || !1,
  typeName: v.ZodDate,
  ..._(r)
});
class Ye extends k {
  _parse(e) {
    if (this._getType(e) !== p.symbol) {
      const a = this._getOrReturnCtx(e);
      return d(a, {
        code: l.invalid_type,
        expected: p.symbol,
        received: a.parsedType
      }), y;
    }
    return V(e.data);
  }
}
Ye.create = (r) => new Ye({
  typeName: v.ZodSymbol,
  ..._(r)
});
class Ke extends k {
  _parse(e) {
    if (this._getType(e) !== p.undefined) {
      const a = this._getOrReturnCtx(e);
      return d(a, {
        code: l.invalid_type,
        expected: p.undefined,
        received: a.parsedType
      }), y;
    }
    return V(e.data);
  }
}
Ke.create = (r) => new Ke({
  typeName: v.ZodUndefined,
  ..._(r)
});
class Qe extends k {
  _parse(e) {
    if (this._getType(e) !== p.null) {
      const a = this._getOrReturnCtx(e);
      return d(a, {
        code: l.invalid_type,
        expected: p.null,
        received: a.parsedType
      }), y;
    }
    return V(e.data);
  }
}
Qe.create = (r) => new Qe({
  typeName: v.ZodNull,
  ..._(r)
});
class Xe extends k {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return V(e.data);
  }
}
Xe.create = (r) => new Xe({
  typeName: v.ZodAny,
  ..._(r)
});
class et extends k {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return V(e.data);
  }
}
et.create = (r) => new et({
  typeName: v.ZodUnknown,
  ..._(r)
});
class X extends k {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return d(t, {
      code: l.invalid_type,
      expected: p.never,
      received: t.parsedType
    }), y;
  }
}
X.create = (r) => new X({
  typeName: v.ZodNever,
  ..._(r)
});
class tt extends k {
  _parse(e) {
    if (this._getType(e) !== p.undefined) {
      const a = this._getOrReturnCtx(e);
      return d(a, {
        code: l.invalid_type,
        expected: p.void,
        received: a.parsedType
      }), y;
    }
    return V(e.data);
  }
}
tt.create = (r) => new tt({
  typeName: v.ZodVoid,
  ..._(r)
});
class U extends k {
  _parse(e) {
    const { ctx: t, status: a } = this._processInputParams(e), n = this._def;
    if (t.parsedType !== p.array)
      return d(t, {
        code: l.invalid_type,
        expected: p.array,
        received: t.parsedType
      }), y;
    if (n.exactLength !== null) {
      const i = t.data.length > n.exactLength.value, o = t.data.length < n.exactLength.value;
      (i || o) && (d(t, {
        code: i ? l.too_big : l.too_small,
        minimum: o ? n.exactLength.value : void 0,
        maximum: i ? n.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: n.exactLength.message
      }), a.dirty());
    }
    if (n.minLength !== null && t.data.length < n.minLength.value && (d(t, {
      code: l.too_small,
      minimum: n.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.minLength.message
    }), a.dirty()), n.maxLength !== null && t.data.length > n.maxLength.value && (d(t, {
      code: l.too_big,
      maximum: n.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.maxLength.message
    }), a.dirty()), t.common.async)
      return Promise.all([...t.data].map((i, o) => n.type._parseAsync(new Q(t, i, t.path, o)))).then((i) => L.mergeArray(a, i));
    const s = [...t.data].map((i, o) => n.type._parseSync(new Q(t, i, t.path, o)));
    return L.mergeArray(a, s);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new U({
      ...this._def,
      minLength: { value: e, message: h.toString(t) }
    });
  }
  max(e, t) {
    return new U({
      ...this._def,
      maxLength: { value: e, message: h.toString(t) }
    });
  }
  length(e, t) {
    return new U({
      ...this._def,
      exactLength: { value: e, message: h.toString(t) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
U.create = (r, e) => new U({
  type: r,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: v.ZodArray,
  ..._(e)
});
function oe(r) {
  if (r instanceof R) {
    const e = {};
    for (const t in r.shape) {
      const a = r.shape[t];
      e[t] = K.create(oe(a));
    }
    return new R({
      ...r._def,
      shape: () => e
    });
  } else return r instanceof U ? new U({
    ...r._def,
    type: oe(r.element)
  }) : r instanceof K ? K.create(oe(r.unwrap())) : r instanceof pe ? pe.create(oe(r.unwrap())) : r instanceof ae ? ae.create(r.items.map((e) => oe(e))) : r;
}
class R extends k {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), t = b.objectKeys(e);
    return this._cached = { shape: e, keys: t }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== p.object) {
      const f = this._getOrReturnCtx(e);
      return d(f, {
        code: l.invalid_type,
        expected: p.object,
        received: f.parsedType
      }), y;
    }
    const { status: a, ctx: n } = this._processInputParams(e), { shape: s, keys: i } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof X && this._def.unknownKeys === "strip"))
      for (const f in n.data)
        i.includes(f) || o.push(f);
    const u = [];
    for (const f of i) {
      const g = s[f], w = n.data[f];
      u.push({
        key: { status: "valid", value: f },
        value: g._parse(new Q(n, w, n.path, f)),
        alwaysSet: f in n.data
      });
    }
    if (this._def.catchall instanceof X) {
      const f = this._def.unknownKeys;
      if (f === "passthrough")
        for (const g of o)
          u.push({
            key: { status: "valid", value: g },
            value: { status: "valid", value: n.data[g] }
          });
      else if (f === "strict")
        o.length > 0 && (d(n, {
          code: l.unrecognized_keys,
          keys: o
        }), a.dirty());
      else if (f !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const f = this._def.catchall;
      for (const g of o) {
        const w = n.data[g];
        u.push({
          key: { status: "valid", value: g },
          value: f._parse(
            new Q(n, w, n.path, g)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: g in n.data
        });
      }
    }
    return n.common.async ? Promise.resolve().then(async () => {
      const f = [];
      for (const g of u) {
        const w = await g.key, S = await g.value;
        f.push({
          key: w,
          value: S,
          alwaysSet: g.alwaysSet
        });
      }
      return f;
    }).then((f) => L.mergeObjectSync(a, f)) : L.mergeObjectSync(a, u);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return h.errToObj, new R({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, a) => {
          const n = this._def.errorMap?.(t, a).message ?? a.defaultError;
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
    return new R({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new R({
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
    return new R({
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
    return new R({
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
    return new R({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const t = {};
    for (const a of b.objectKeys(e))
      e[a] && this.shape[a] && (t[a] = this.shape[a]);
    return new R({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    for (const a of b.objectKeys(this.shape))
      e[a] || (t[a] = this.shape[a]);
    return new R({
      ...this._def,
      shape: () => t
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return oe(this);
  }
  partial(e) {
    const t = {};
    for (const a of b.objectKeys(this.shape)) {
      const n = this.shape[a];
      e && !e[a] ? t[a] = n : t[a] = n.optional();
    }
    return new R({
      ...this._def,
      shape: () => t
    });
  }
  required(e) {
    const t = {};
    for (const a of b.objectKeys(this.shape))
      if (e && !e[a])
        t[a] = this.shape[a];
      else {
        let s = this.shape[a];
        for (; s instanceof K; )
          s = s._def.innerType;
        t[a] = s;
      }
    return new R({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return ut(b.objectKeys(this.shape));
  }
}
R.create = (r, e) => new R({
  shape: () => r,
  unknownKeys: "strip",
  catchall: X.create(),
  typeName: v.ZodObject,
  ..._(e)
});
R.strictCreate = (r, e) => new R({
  shape: () => r,
  unknownKeys: "strict",
  catchall: X.create(),
  typeName: v.ZodObject,
  ..._(e)
});
R.lazycreate = (r, e) => new R({
  shape: r,
  unknownKeys: "strip",
  catchall: X.create(),
  typeName: v.ZodObject,
  ..._(e)
});
class Ce extends k {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), a = this._def.options;
    function n(s) {
      for (const o of s)
        if (o.result.status === "valid")
          return o.result;
      for (const o of s)
        if (o.result.status === "dirty")
          return t.common.issues.push(...o.ctx.common.issues), o.result;
      const i = s.map((o) => new F(o.ctx.common.issues));
      return d(t, {
        code: l.invalid_union,
        unionErrors: i
      }), y;
    }
    if (t.common.async)
      return Promise.all(a.map(async (s) => {
        const i = {
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
            parent: i
          }),
          ctx: i
        };
      })).then(n);
    {
      let s;
      const i = [];
      for (const u of a) {
        const f = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, g = u._parseSync({
          data: t.data,
          path: t.path,
          parent: f
        });
        if (g.status === "valid")
          return g;
        g.status === "dirty" && !s && (s = { result: g, ctx: f }), f.common.issues.length && i.push(f.common.issues);
      }
      if (s)
        return t.common.issues.push(...s.ctx.common.issues), s.result;
      const o = i.map((u) => new F(u));
      return d(t, {
        code: l.invalid_union,
        unionErrors: o
      }), y;
    }
  }
  get options() {
    return this._def.options;
  }
}
Ce.create = (r, e) => new Ce({
  options: r,
  typeName: v.ZodUnion,
  ..._(e)
});
function Ie(r, e) {
  const t = H(r), a = H(e);
  if (r === e)
    return { valid: !0, data: r };
  if (t === p.object && a === p.object) {
    const n = b.objectKeys(e), s = b.objectKeys(r).filter((o) => n.indexOf(o) !== -1), i = { ...r, ...e };
    for (const o of s) {
      const u = Ie(r[o], e[o]);
      if (!u.valid)
        return { valid: !1 };
      i[o] = u.data;
    }
    return { valid: !0, data: i };
  } else if (t === p.array && a === p.array) {
    if (r.length !== e.length)
      return { valid: !1 };
    const n = [];
    for (let s = 0; s < r.length; s++) {
      const i = r[s], o = e[s], u = Ie(i, o);
      if (!u.valid)
        return { valid: !1 };
      n.push(u.data);
    }
    return { valid: !0, data: n };
  } else return t === p.date && a === p.date && +r == +e ? { valid: !0, data: r } : { valid: !1 };
}
class Ne extends k {
  _parse(e) {
    const { status: t, ctx: a } = this._processInputParams(e), n = (s, i) => {
      if (We(s) || We(i))
        return y;
      const o = Ie(s.value, i.value);
      return o.valid ? ((Je(s) || Je(i)) && t.dirty(), { status: t.value, value: o.data }) : (d(a, {
        code: l.invalid_intersection_types
      }), y);
    };
    return a.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: a.data,
        path: a.path,
        parent: a
      }),
      this._def.right._parseAsync({
        data: a.data,
        path: a.path,
        parent: a
      })
    ]).then(([s, i]) => n(s, i)) : n(this._def.left._parseSync({
      data: a.data,
      path: a.path,
      parent: a
    }), this._def.right._parseSync({
      data: a.data,
      path: a.path,
      parent: a
    }));
  }
}
Ne.create = (r, e, t) => new Ne({
  left: r,
  right: e,
  typeName: v.ZodIntersection,
  ..._(t)
});
class ae extends k {
  _parse(e) {
    const { status: t, ctx: a } = this._processInputParams(e);
    if (a.parsedType !== p.array)
      return d(a, {
        code: l.invalid_type,
        expected: p.array,
        received: a.parsedType
      }), y;
    if (a.data.length < this._def.items.length)
      return d(a, {
        code: l.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), y;
    !this._def.rest && a.data.length > this._def.items.length && (d(a, {
      code: l.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), t.dirty());
    const s = [...a.data].map((i, o) => {
      const u = this._def.items[o] || this._def.rest;
      return u ? u._parse(new Q(a, i, a.path, o)) : null;
    }).filter((i) => !!i);
    return a.common.async ? Promise.all(s).then((i) => L.mergeArray(t, i)) : L.mergeArray(t, s);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new ae({
      ...this._def,
      rest: e
    });
  }
}
ae.create = (r, e) => {
  if (!Array.isArray(r))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new ae({
    items: r,
    typeName: v.ZodTuple,
    rest: null,
    ..._(e)
  });
};
class rt extends k {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: a } = this._processInputParams(e);
    if (a.parsedType !== p.map)
      return d(a, {
        code: l.invalid_type,
        expected: p.map,
        received: a.parsedType
      }), y;
    const n = this._def.keyType, s = this._def.valueType, i = [...a.data.entries()].map(([o, u], f) => ({
      key: n._parse(new Q(a, o, a.path, [f, "key"])),
      value: s._parse(new Q(a, u, a.path, [f, "value"]))
    }));
    if (a.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const u of i) {
          const f = await u.key, g = await u.value;
          if (f.status === "aborted" || g.status === "aborted")
            return y;
          (f.status === "dirty" || g.status === "dirty") && t.dirty(), o.set(f.value, g.value);
        }
        return { status: t.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const u of i) {
        const f = u.key, g = u.value;
        if (f.status === "aborted" || g.status === "aborted")
          return y;
        (f.status === "dirty" || g.status === "dirty") && t.dirty(), o.set(f.value, g.value);
      }
      return { status: t.value, value: o };
    }
  }
}
rt.create = (r, e, t) => new rt({
  valueType: e,
  keyType: r,
  typeName: v.ZodMap,
  ..._(t)
});
class ye extends k {
  _parse(e) {
    const { status: t, ctx: a } = this._processInputParams(e);
    if (a.parsedType !== p.set)
      return d(a, {
        code: l.invalid_type,
        expected: p.set,
        received: a.parsedType
      }), y;
    const n = this._def;
    n.minSize !== null && a.data.size < n.minSize.value && (d(a, {
      code: l.too_small,
      minimum: n.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.minSize.message
    }), t.dirty()), n.maxSize !== null && a.data.size > n.maxSize.value && (d(a, {
      code: l.too_big,
      maximum: n.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.maxSize.message
    }), t.dirty());
    const s = this._def.valueType;
    function i(u) {
      const f = /* @__PURE__ */ new Set();
      for (const g of u) {
        if (g.status === "aborted")
          return y;
        g.status === "dirty" && t.dirty(), f.add(g.value);
      }
      return { status: t.value, value: f };
    }
    const o = [...a.data.values()].map((u, f) => s._parse(new Q(a, u, a.path, f)));
    return a.common.async ? Promise.all(o).then((u) => i(u)) : i(o);
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
ye.create = (r, e) => new ye({
  valueType: r,
  minSize: null,
  maxSize: null,
  typeName: v.ZodSet,
  ..._(e)
});
class at extends k {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
at.create = (r, e) => new at({
  getter: r,
  typeName: v.ZodLazy,
  ..._(e)
});
class nt extends k {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return d(t, {
        received: t.data,
        code: l.invalid_literal,
        expected: this._def.value
      }), y;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
nt.create = (r, e) => new nt({
  value: r,
  typeName: v.ZodLiteral,
  ..._(e)
});
function ut(r, e) {
  return new ue({
    values: r,
    typeName: v.ZodEnum,
    ..._(e)
  });
}
class ue extends k {
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), a = this._def.values;
      return d(t, {
        expected: b.joinValues(a),
        received: t.parsedType,
        code: l.invalid_type
      }), y;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const t = this._getOrReturnCtx(e), a = this._def.values;
      return d(t, {
        received: t.data,
        code: l.invalid_enum_value,
        options: a
      }), y;
    }
    return V(e.data);
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
    return ue.create(e, {
      ...this._def,
      ...t
    });
  }
  exclude(e, t = this._def) {
    return ue.create(this.options.filter((a) => !e.includes(a)), {
      ...this._def,
      ...t
    });
  }
}
ue.create = ut;
class st extends k {
  _parse(e) {
    const t = b.getValidEnumValues(this._def.values), a = this._getOrReturnCtx(e);
    if (a.parsedType !== p.string && a.parsedType !== p.number) {
      const n = b.objectValues(t);
      return d(a, {
        expected: b.joinValues(n),
        received: a.parsedType,
        code: l.invalid_type
      }), y;
    }
    if (this._cache || (this._cache = new Set(b.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const n = b.objectValues(t);
      return d(a, {
        received: a.data,
        code: l.invalid_enum_value,
        options: n
      }), y;
    }
    return V(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
st.create = (r, e) => new st({
  values: r,
  typeName: v.ZodNativeEnum,
  ..._(e)
});
class Te extends k {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== p.promise && t.common.async === !1)
      return d(t, {
        code: l.invalid_type,
        expected: p.promise,
        received: t.parsedType
      }), y;
    const a = t.parsedType === p.promise ? t.data : Promise.resolve(t.data);
    return V(a.then((n) => this._def.type.parseAsync(n, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
}
Te.create = (r, e) => new Te({
  type: r,
  typeName: v.ZodPromise,
  ..._(e)
});
class fe extends k {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === v.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: a } = this._processInputParams(e), n = this._def.effect || null, s = {
      addIssue: (i) => {
        d(a, i), i.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return a.path;
      }
    };
    if (s.addIssue = s.addIssue.bind(s), n.type === "preprocess") {
      const i = n.transform(a.data, s);
      if (a.common.async)
        return Promise.resolve(i).then(async (o) => {
          if (t.value === "aborted")
            return y;
          const u = await this._def.schema._parseAsync({
            data: o,
            path: a.path,
            parent: a
          });
          return u.status === "aborted" ? y : u.status === "dirty" || t.value === "dirty" ? me(u.value) : u;
        });
      {
        if (t.value === "aborted")
          return y;
        const o = this._def.schema._parseSync({
          data: i,
          path: a.path,
          parent: a
        });
        return o.status === "aborted" ? y : o.status === "dirty" || t.value === "dirty" ? me(o.value) : o;
      }
    }
    if (n.type === "refinement") {
      const i = (o) => {
        const u = n.refinement(o, s);
        if (a.common.async)
          return Promise.resolve(u);
        if (u instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (a.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: a.data,
          path: a.path,
          parent: a
        });
        return o.status === "aborted" ? y : (o.status === "dirty" && t.dirty(), i(o.value), { status: t.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: a.data, path: a.path, parent: a }).then((o) => o.status === "aborted" ? y : (o.status === "dirty" && t.dirty(), i(o.value).then(() => ({ status: t.value, value: o.value }))));
    }
    if (n.type === "transform")
      if (a.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: a.data,
          path: a.path,
          parent: a
        });
        if (!le(i))
          return y;
        const o = n.transform(i.value, s);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: a.data, path: a.path, parent: a }).then((i) => le(i) ? Promise.resolve(n.transform(i.value, s)).then((o) => ({
          status: t.value,
          value: o
        })) : y);
    b.assertNever(n);
  }
}
fe.create = (r, e, t) => new fe({
  schema: r,
  typeName: v.ZodEffects,
  effect: e,
  ..._(t)
});
fe.createWithPreprocess = (r, e, t) => new fe({
  schema: e,
  effect: { type: "preprocess", transform: r },
  typeName: v.ZodEffects,
  ..._(t)
});
class K extends k {
  _parse(e) {
    return this._getType(e) === p.undefined ? V(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
K.create = (r, e) => new K({
  innerType: r,
  typeName: v.ZodOptional,
  ..._(e)
});
class pe extends k {
  _parse(e) {
    return this._getType(e) === p.null ? V(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
pe.create = (r, e) => new pe({
  innerType: r,
  typeName: v.ZodNullable,
  ..._(e)
});
class Ze extends k {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let a = t.data;
    return t.parsedType === p.undefined && (a = this._def.defaultValue()), this._def.innerType._parse({
      data: a,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Ze.create = (r, e) => new Ze({
  innerType: r,
  typeName: v.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ..._(e)
});
class je extends k {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), a = {
      ...t,
      common: {
        ...t.common,
        issues: []
      }
    }, n = this._def.innerType._parse({
      data: a.data,
      path: a.path,
      parent: {
        ...a
      }
    });
    return we(n) ? n.then((s) => ({
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new F(a.common.issues);
        },
        input: a.data
      })
    })) : {
      status: "valid",
      value: n.status === "valid" ? n.value : this._def.catchValue({
        get error() {
          return new F(a.common.issues);
        },
        input: a.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
je.create = (r, e) => new je({
  innerType: r,
  typeName: v.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ..._(e)
});
class it extends k {
  _parse(e) {
    if (this._getType(e) !== p.nan) {
      const a = this._getOrReturnCtx(e);
      return d(a, {
        code: l.invalid_type,
        expected: p.nan,
        received: a.parsedType
      }), y;
    }
    return { status: "valid", value: e.data };
  }
}
it.create = (r) => new it({
  typeName: v.ZodNaN,
  ..._(r)
});
class Wt extends k {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), a = t.data;
    return this._def.type._parse({
      data: a,
      path: t.path,
      parent: t
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class Ve extends k {
  _parse(e) {
    const { status: t, ctx: a } = this._processInputParams(e);
    if (a.common.async)
      return (async () => {
        const s = await this._def.in._parseAsync({
          data: a.data,
          path: a.path,
          parent: a
        });
        return s.status === "aborted" ? y : s.status === "dirty" ? (t.dirty(), me(s.value)) : this._def.out._parseAsync({
          data: s.value,
          path: a.path,
          parent: a
        });
      })();
    {
      const n = this._def.in._parseSync({
        data: a.data,
        path: a.path,
        parent: a
      });
      return n.status === "aborted" ? y : n.status === "dirty" ? (t.dirty(), {
        status: "dirty",
        value: n.value
      }) : this._def.out._parseSync({
        data: n.value,
        path: a.path,
        parent: a
      });
    }
  }
  static create(e, t) {
    return new Ve({
      in: e,
      out: t,
      typeName: v.ZodPipeline
    });
  }
}
class $e extends k {
  _parse(e) {
    const t = this._def.innerType._parse(e), a = (n) => (le(n) && (n.value = Object.freeze(n.value)), n);
    return we(t) ? t.then((n) => a(n)) : a(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
$e.create = (r, e) => new $e({
  innerType: r,
  typeName: v.ZodReadonly,
  ..._(e)
});
var v;
(function(r) {
  r.ZodString = "ZodString", r.ZodNumber = "ZodNumber", r.ZodNaN = "ZodNaN", r.ZodBigInt = "ZodBigInt", r.ZodBoolean = "ZodBoolean", r.ZodDate = "ZodDate", r.ZodSymbol = "ZodSymbol", r.ZodUndefined = "ZodUndefined", r.ZodNull = "ZodNull", r.ZodAny = "ZodAny", r.ZodUnknown = "ZodUnknown", r.ZodNever = "ZodNever", r.ZodVoid = "ZodVoid", r.ZodArray = "ZodArray", r.ZodObject = "ZodObject", r.ZodUnion = "ZodUnion", r.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", r.ZodIntersection = "ZodIntersection", r.ZodTuple = "ZodTuple", r.ZodRecord = "ZodRecord", r.ZodMap = "ZodMap", r.ZodSet = "ZodSet", r.ZodFunction = "ZodFunction", r.ZodLazy = "ZodLazy", r.ZodLiteral = "ZodLiteral", r.ZodEnum = "ZodEnum", r.ZodEffects = "ZodEffects", r.ZodNativeEnum = "ZodNativeEnum", r.ZodOptional = "ZodOptional", r.ZodNullable = "ZodNullable", r.ZodDefault = "ZodDefault", r.ZodCatch = "ZodCatch", r.ZodPromise = "ZodPromise", r.ZodBranded = "ZodBranded", r.ZodPipeline = "ZodPipeline", r.ZodReadonly = "ZodReadonly";
})(v || (v = {}));
const W = Y.create, Jt = de.create;
X.create;
const Pe = U.create, Ht = R.create;
Ce.create;
Ne.create;
ae.create;
ue.create;
Te.create;
K.create;
pe.create;
const ft = "tasks", Gt = "1.0.0", Yt = "TASK_COUNT_CHANGED", pt = "sapwiki", Se = `plugin-${pt}`, Kt = Ht({
  id: W(),
  title: W().min(1, "Title is required"),
  requirement: W().optional().default(""),
  steps: W().optional().default(""),
  tCode: W().optional().default(""),
  tCodes: Pe(W()).optional().default([]),
  createdAt: Jt().default(() => Date.now()),
  imageData: W().optional(),
  images: Pe(W()).optional().default([])
}), ze = Pe(Kt), ot = 240, Qt = (r) => {
  try {
    const e = typeof r == "string" ? r : JSON.stringify(r);
    return e.length > ot ? `${e.slice(0, ot)}...` : e;
  } catch (e) {
    return `[unserializable ${String(e)}]`;
  }
}, ct = (r) => {
  if (typeof r != "string") return r;
  try {
    return JSON.parse(r);
  } catch {
    return r;
  }
}, Xt = (r) => {
  const e = ct(r);
  if (Array.isArray(e))
    return { candidate: e, source: "raw" };
  if (e && typeof e == "object") {
    const t = e, a = ["data", "value", "payload", "tasks", "cases"];
    for (const n of a) {
      const s = ct(t[n]);
      if (Array.isArray(s))
        return { candidate: s, source: n };
    }
  }
  return { candidate: [], source: "raw" };
}, er = (r) => {
  if (!r || typeof r != "object") return r;
  const e = { ...r }, t = Array.isArray(e.images) ? e.images.slice() : [], a = [
    e.imageData,
    e.image,
    e.imageBase64,
    e.screenshot,
    ...Array.isArray(e.screenshots) ? e.screenshots : [],
    e.imageUri,
    e.photo
  ];
  Array.isArray(e.images) && a.push(...e.images);
  for (const n of a)
    typeof n == "string" && n && !t.includes(n) && t.push(n);
  return t.length && (e.images = t, e.imageData || (e.imageData = t[0])), !e.tCode && typeof e.tcode == "string" && (e.tCode = e.tcode), !e.tCodes && Array.isArray(e.tcodes) && (e.tCodes = e.tcodes), e;
}, tr = (r) => Array.isArray(r) ? r.map((e) => er(e)) : r, Le = (r) => {
  const { candidate: e, source: t } = Xt(r), a = tr(e), n = ze.safeParse(a);
  return n.success ? { tasks: n.data, source: t, ok: !0 } : (console.error("[task-board] restore failed", n.error), { tasks: [], source: t, ok: !1 });
}, rr = async (r) => {
  console.info("[task-board] restore start");
  try {
    const e = await r.storage.get(ft), { tasks: t, source: a, ok: n } = Le(e);
    return console.info("[task-board] restore payload", {
      preview: Qt(e),
      extractedPath: a
    }), n && console.info("[task-board] restore success", {
      count: t.length,
      source: a
    }), t;
  } catch (e) {
    return console.error("[task-board] restore failed", e), [];
  }
}, ar = async (r, e) => {
  console.info(`[task-board] save triggered (count=${e.length})`);
  const t = ze.safeParse(e);
  if (!t.success) {
    console.error("[task-board] save failed", t.error);
    return;
  }
  try {
    await r.storage.save(ft, t.data, Gt);
  } catch (a) {
    console.error("[task-board] save failed", a);
  }
}, nr = (r) => ({
  id: crypto.randomUUID ? crypto.randomUUID() : `task-${Date.now()}`,
  title: r.title.trim(),
  requirement: r.requirement ?? "",
  steps: r.steps ?? "",
  tCode: r.tCode ?? "",
  tCodes: r.tCodes ?? [],
  createdAt: Date.now(),
  images: r.images ?? [],
  imageData: r.imageData ?? (Array.isArray(r.images) && r.images.length ? r.images[0] : void 0)
}), sr = (r) => {
  const [e, t] = T([]), [a, n] = T(!1), s = J(!1);
  ce(() => {
    let w = !0;
    return (async () => {
      const S = await rr(r);
      w && (t(S), n(!0));
    })(), () => {
      w = !1;
    };
  }, [r]), ce(() => {
    if (a) {
      if (!s.current) {
        s.current = !0;
        return;
      }
      ar(r, e), r.eventBus.emit(Yt, { count: e.length });
    }
  }, [r, a, e]);
  const i = xe((w) => {
    t((S) => [...S, nr(w)]);
  }, []), o = xe((w, S) => {
    t((B) => B.map((M) => M.id === w ? S(M) : M));
  }, []), u = xe((w) => {
    t((S) => S.filter((B) => B.id !== w));
  }, []), f = xe((w) => {
    const S = ze.safeParse(w);
    S.success && t(S.data);
  }, []), g = De(
    () => ({
      total: e.length
    }),
    [e]
  );
  return {
    tasks: e,
    hydrated: a,
    addTask: i,
    updateTask: o,
    removeTask: u,
    replaceTasks: f,
    stats: g
  };
}, ir = ({ context: r }) => {
  const { tasks: e, hydrated: t, addTask: a, removeTask: n, updateTask: s, replaceTasks: i, stats: o } = sr(r), [u, f] = T(!1), [g, w] = T([]), [S, B] = T(0), [M, he] = T(""), [C, I] = T(null), P = (N, E, A, D) => {
    !E || !E.length || (I(N), w(E), B(A || 0), he(D || ""), f(!0));
  };
  be.openViewerCallback = P;
  const [Z, ee] = T(""), z = J(null);
  ce(() => {
    const N = (E) => {
      const { tasks: A, ok: D } = Le(E);
      D && A.length && i(A);
    };
    return r.eventBus.on("SAPWIKI_IMPORT", N), () => {
      r.eventBus.off("SAPWIKI_IMPORT", N);
    };
  }, [r, i]);
  const ne = (N, E) => {
    s(N, (A) => ({ ...A, ...E }));
  }, se = async (N) => {
    const E = N.target.files?.[0];
    if (N.target.value = "", !E) return;
    const A = await E.text(), { tasks: D, ok: ve } = Le(A);
    ve && i(D);
  }, te = () => z.current?.click(), $ = () => {
    const N = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), E = URL.createObjectURL(N), A = document.createElement("a");
    A.href = E, A.download = "sapwiki-tasks.json", A.click(), URL.revokeObjectURL(E);
  };
  return /* @__PURE__ */ c.createElement("div", { className: "app", "data-theme": r.theme }, /* @__PURE__ */ c.createElement("header", { className: "hero card" }, /* @__PURE__ */ c.createElement("div", { className: "hero-copy" }, /* @__PURE__ */ c.createElement("h1", null, "Local wiki"), /* @__PURE__ */ c.createElement("p", { className: "muted" }, "Persisted locally with host storage. Import legacy backups, add notes, and keep images with each entry."), /* @__PURE__ */ c.createElement("div", { className: "chips" }, /* @__PURE__ */ c.createElement("span", { className: `chip ${t ? "chip-ok" : "chip-warn"}` }, /* @__PURE__ */ c.createElement("span", { className: "dot" }), " ", t ? "Ready" : "Restoring data..."), /* @__PURE__ */ c.createElement("span", { className: "chip soft" }, o.total, " entries"))), /* @__PURE__ */ c.createElement("div", { className: "hero-actions" }, /* @__PURE__ */ c.createElement("button", { className: "ghost", onClick: te, disabled: !t }, "Import JSON"), /* @__PURE__ */ c.createElement("button", { onClick: $, disabled: !t || !e.length }, "Export"), /* @__PURE__ */ c.createElement("input", { ref: z, type: "file", accept: "application/json", hidden: !0, onChange: se }), /* @__PURE__ */ c.createElement("div", { className: "header-search" }, /* @__PURE__ */ c.createElement(
    "input",
    {
      "aria-label": "Search entries",
      className: "search-input",
      placeholder: "Search title, description, steps, or T-code",
      value: Z,
      onChange: (N) => ee(N.target.value)
    }
  )))), /* @__PURE__ */ c.createElement("section", { className: "layout" }, /* @__PURE__ */ c.createElement("div", { className: "panel card" }, /* @__PURE__ */ c.createElement("div", { className: "panel-header" }, /* @__PURE__ */ c.createElement("div", null, /* @__PURE__ */ c.createElement("h2", null, "Add an entry"), /* @__PURE__ */ c.createElement("p", { className: "muted" }, "Quickly record SAP cases, solutions, and visuals for future reference."))), /* @__PURE__ */ c.createElement(_t, { onSubmit: a })), /* @__PURE__ */ c.createElement("div", { className: "panel card" }, /* @__PURE__ */ c.createElement("div", { className: "panel-header" }, /* @__PURE__ */ c.createElement("div", null, /* @__PURE__ */ c.createElement("h2", null, "Notes"), /* @__PURE__ */ c.createElement("p", { className: "muted" }, "Edit inline, keep evidence, and tidy up when complete."))), /* @__PURE__ */ c.createElement(
    be,
    {
      tasks: De(() => {
        const N = Z.trim().toLowerCase();
        return N ? e.filter((E) => [E.title, E.requirement || "", E.steps || "", E.tCode || "", (E.tCodes || []).join(" ")].join(" ").toLowerCase().includes(N)) : e;
      }, [e, Z]),
      onDelete: n,
      onUpdate: ne
    }
  ), /* @__PURE__ */ c.createElement(
    xt,
    {
      isOpen: u,
      images: g,
      initialIndex: S,
      title: M,
      onClose: () => f(!1),
      onSaveAnnotated: (N, E) => {
        C && (s(C, (A) => {
          const D = Array.isArray(A.images) ? A.images.slice() : [];
          return D[E] = N, { ...A, images: D, imageData: D[0] };
        }), f(!1));
      }
    }
  ))));
}, or = "#plugin-sapwiki{--bg: #f4f6fb;--card: #ffffff;--card-strong: #0f172a;--border: #e2e8f0;--text: #0f172a;--muted: #5b6577;--primary: #0f52ba;--primary-strong: #0a3c87;--accent: #22c55e;--warn: #f59e0b;font-family:Segoe UI,system-ui,-apple-system,sans-serif;color:var(--text);background:radial-gradient(circle at 20% 20%,#e5edff,transparent 45%),radial-gradient(circle at 80% 0%,#e8fff4,transparent 35%),var(--bg);min-height:100vh;overflow-x:hidden}#plugin-sapwiki .app{box-sizing:border-box;padding:12px 20px 24px;width:calc(100% - 40px);max-width:none;margin:0;display:flex;flex-direction:column;gap:12px}#plugin-sapwiki *,#plugin-sapwiki *:before,#plugin-sapwiki *:after{box-sizing:inherit}#plugin-sapwiki .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px 20px;box-shadow:0 14px 38px #0f172a14}#plugin-sapwiki .hero{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;background:linear-gradient(135deg,#0f172a,#153e75);color:#e2e8f0;border:none;box-shadow:0 20px 50px #0f172a47}#plugin-sapwiki .hero .muted{color:#e2e8f0d9}#plugin-sapwiki .hero h1{margin:6px 0 10px;color:#f8fafc}#plugin-sapwiki .hero-copy{max-width:640px}#plugin-sapwiki .hero-actions{display:flex;gap:10px;align-items:flex-start}#plugin-sapwiki .header-search{width:100%;margin-top:12px}#plugin-sapwiki .search-input{width:360px;max-width:100%;padding:10px 12px;border-radius:10px;border:1px solid var(--border);background:#fff;font:inherit}@media (min-width: 1000px){#plugin-sapwiki .hero-actions{align-items:center}#plugin-sapwiki .header-search{margin-left:12px;margin-top:0}}#plugin-sapwiki .eyebrow{text-transform:uppercase;letter-spacing:.08em;font-size:11px;color:inherit;margin:0 0 4px}#plugin-sapwiki .muted{color:var(--muted);margin:0}#plugin-sapwiki .chips{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}#plugin-sapwiki .chip{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;background:#ffffff14;color:#f8fafc;border:1px solid rgba(255,255,255,.16);font-weight:600}#plugin-sapwiki .chip.soft{background:#e2e8f0;color:var(--text);border:1px solid transparent}#plugin-sapwiki .chip-ok{background:#22c55e29;color:#e8fff2;border-color:#22c55e52}#plugin-sapwiki .chip-warn{background:#f59e0b2e;color:#fef3c7;border-color:#f59e0b4d}#plugin-sapwiki .dot{width:10px;height:10px;border-radius:50%;display:inline-block;background:#f8fafc;box-shadow:0 0 0 4px #ffffff14}#plugin-sapwiki .layout{display:grid;grid-template-columns:.6fr 1.4fr;gap:20px;align-items:start}#plugin-sapwiki .panel{display:flex;flex-direction:column;gap:12px}#plugin-sapwiki .panel.card{border:none;box-shadow:0 10px 30px #0f172a0f}#plugin-sapwiki .panel-header h2{margin:4px 0 6px}#plugin-sapwiki .label{text-transform:uppercase;font-size:12px;letter-spacing:.06em;color:var(--muted);margin:0}#plugin-sapwiki .toolbar,#plugin-sapwiki .actions{display:flex;gap:10px;align-items:center}#plugin-sapwiki button{padding:11px 16px;border-radius:12px;border:1px solid var(--primary-strong);background:var(--primary);color:#fff;font-weight:650;cursor:pointer;transition:transform .12s ease,box-shadow .16s ease,background .16s ease;box-shadow:0 8px 20px #0f52ba40}#plugin-sapwiki button:disabled{opacity:.6;cursor:not-allowed;box-shadow:none}#plugin-sapwiki button:hover:not(:disabled){transform:translateY(-1px);background:var(--primary-strong)}#plugin-sapwiki button.ghost{background:transparent;color:var(--primary-strong);border-color:var(--border);box-shadow:none}#plugin-sapwiki .hero button.ghost{color:#f8fafc;border-color:#ffffff47}#plugin-sapwiki .task-form{display:grid;gap:12px}#plugin-sapwiki .field{display:flex;flex-direction:column;gap:6px}#plugin-sapwiki .two-col{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}#plugin-sapwiki label{font-weight:600;color:var(--text)}#plugin-sapwiki input,#plugin-sapwiki textarea{width:100%;border-radius:12px;border:1px solid var(--border);padding:12px 14px;font:inherit;background:#f8fafc;transition:border .12s ease,box-shadow .12s ease}#plugin-sapwiki input:focus,#plugin-sapwiki textarea:focus{border-color:var(--primary);box-shadow:0 0 0 4px #0f52ba1f;outline:none}#plugin-sapwiki textarea{resize:vertical;min-height:100px}#plugin-sapwiki .task-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}#plugin-sapwiki .task-card h3{margin:4px 0 8px}#plugin-sapwiki .task-header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:8px}#plugin-sapwiki .tags{display:flex;flex-wrap:wrap;gap:6px}#plugin-sapwiki .pill{background:#e2e8f0;border-radius:999px;padding:4px 10px;font-size:12px;color:var(--text);border:1px solid transparent}#plugin-sapwiki .preview{width:100%;max-height:220px;object-fit:contain;border-radius:10px;border:1px solid var(--border);background:#f8fafc}#plugin-sapwiki .preview.clickable{cursor:pointer}#plugin-sapwiki .pv-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#021f3fbf;z-index:1000;padding:16px}#plugin-sapwiki .pv-dialog{width:100%;max-width:980px;border-radius:16px;background:#04243a;color:#fff;border:1px solid rgba(255,255,255,.06);padding:16px;box-shadow:0 30px 60px #02102899}#plugin-sapwiki .pv-header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}#plugin-sapwiki .pv-title{font-weight:700;color:#d1fae5}#plugin-sapwiki .pv-controls button{margin-left:8px}#plugin-sapwiki .pv-controls button.ghost{color:#fff;border-color:#ffffff0f}#plugin-sapwiki .pv-toolbar{display:flex;gap:8px;align-items:center;margin-bottom:12px}#plugin-sapwiki .pv-toolbar button{padding:8px 10px;border-radius:10px}#plugin-sapwiki .pv-toolbar button.active{background:#22c55e29;color:#eafff0}#plugin-sapwiki .pv-toolbar .primary{background:#10b981;color:#fff}#plugin-sapwiki .pv-body{display:flex;justify-content:center}#plugin-sapwiki .pv-image-wrap{position:relative}#plugin-sapwiki .pv-image{max-height:66vh;border-radius:12px;display:block}#plugin-sapwiki .pv-canvas{position:absolute;left:0;top:0}#plugin-sapwiki .pv-canvas.disabled{pointer-events:none}#plugin-sapwiki .pv-canvas.draw{cursor:crosshair}#plugin-sapwiki .pv-canvas.erase{cursor:cell}#plugin-sapwiki .field.images .image-row{display:flex;gap:8px;flex-wrap:wrap;align-items:flex-start}#plugin-sapwiki .field.images .image-row .preview{width:140px;height:96px;max-height:none;object-fit:cover}#plugin-sapwiki .empty{text-align:left;padding:16px;border-style:dashed;border-color:var(--border);background:linear-gradient(135deg,#f8fafc,#eef2ff)}@media (max-width: 900px){#plugin-sapwiki .layout{grid-template-columns:1fr}#plugin-sapwiki .hero{align-items:flex-start}#plugin-sapwiki .hero-actions{width:100%;flex-wrap:wrap}#plugin-sapwiki button,#plugin-sapwiki button.ghost{width:auto}}";
let re = null, ke = null, G = null;
const cr = (r) => {
  const e = r.querySelector(`#${Se}`);
  if (e) return e;
  const t = document.createElement("div");
  return t.id = Se, r.appendChild(t), t;
}, lr = () => {
  G || (G = document.createElement("style"), G.id = `${Se}-style`, G.textContent = or, document.head.appendChild(G));
}, fr = {
  id: pt,
  name: "SAPWiki",
  version: "1.0.0",
  mount(r, e) {
    lr();
    const t = cr(r);
    ke = t, re && re.unmount(), re = vt(t), re.render(
      /* @__PURE__ */ c.createElement(c.StrictMode, null, /* @__PURE__ */ c.createElement(ir, { context: e }))
    );
  },
  unmount(r) {
    re && (re.unmount(), re = null), ke && (ke.replaceChildren(), ke = null);
    const e = r.querySelector(`#${Se}`);
    e && e.replaceChildren(), G && (G.remove(), G = null);
  }
};
export {
  fr as default
};
//# sourceMappingURL=plugin.js.map
