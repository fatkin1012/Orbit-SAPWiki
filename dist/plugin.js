import l, { useState as D, useRef as W, useMemo as Le, useEffect as ee, useCallback as _e } from "react";
import { createRoot as yt } from "react-dom/client";
const xt = ({ onSubmit: a }) => {
  const [e, t] = D(""), [r, n] = D(""), [s, i] = D(""), [o, u] = D(""), [d, v] = D([]), O = (E) => new Promise((R, C) => {
    const _ = new FileReader();
    _.onload = () => {
      typeof _.result == "string" ? R(_.result) : C(new Error("invalid file result"));
    }, _.onerror = () => C(new Error("file read error")), _.readAsDataURL(E);
  }), f = async (E) => {
    const R = E.target.files;
    if (!(!R || !R.length))
      try {
        const C = Array.from(R), _ = await Promise.all(C.map((N) => O(N)));
        v(_);
      } catch (C) {
        console.error("failed to read images", C);
      }
  }, k = async (E) => {
    try {
      const R = E.clipboardData?.items;
      if (!R) return;
      const C = [];
      for (let N = 0; N < R.length; N++) {
        const I = R[N];
        if (I.kind === "file" && I.type.startsWith("image/")) {
          const z = I.getAsFile();
          z && C.push(z);
        }
      }
      if (!C.length) return;
      E.preventDefault();
      const _ = await Promise.all(C.map((N) => O(N)));
      v((N) => [...N, ..._]);
    } catch (R) {
      console.error("failed to paste image", R);
    }
  }, w = W(null), Z = W(0), [j, M] = D(!1), L = (E) => {
    E.preventDefault(), Z.current++, M(!0);
  }, G = (E) => {
    E.preventDefault(), Z.current--, Z.current <= 0 && (Z.current = 0, M(!1));
  }, se = async (E) => {
    E.preventDefault(), M(!1), Z.current = 0;
    const R = Array.from(E.dataTransfer.files).filter((C) => C.type.startsWith("image/"));
    if (R.length)
      try {
        const C = await Promise.all(R.map((_) => O(_)));
        v((_) => [..._, ...C]);
      } catch (C) {
        console.error("failed to drop images", C);
      }
  }, U = (E) => v((R) => R.filter((C, _) => _ !== E)), Y = (E) => {
    E.preventDefault();
    const R = e.trim();
    if (!R) return;
    const C = r.split(",").map((_) => _.trim()).filter(Boolean);
    a({
      title: R,
      tCodes: C,
      requirement: s,
      steps: o,
      images: d
    }), t(""), n(""), i(""), u(""), v([]);
  };
  return /* @__PURE__ */ l.createElement("form", { className: "task-form", onSubmit: Y }, /* @__PURE__ */ l.createElement("div", { className: "field" }, /* @__PURE__ */ l.createElement("label", null, "Title"), /* @__PURE__ */ l.createElement("input", { value: e, onChange: (E) => t(E.target.value), placeholder: "Entry title" })), /* @__PURE__ */ l.createElement("div", { className: "field" }, /* @__PURE__ */ l.createElement("label", null, "T-Codes / Tag"), /* @__PURE__ */ l.createElement(
    "input",
    {
      value: r,
      onChange: (E) => n(E.target.value),
      placeholder: "SE16, MM03"
    }
  )), /* @__PURE__ */ l.createElement("div", { className: "field" }, /* @__PURE__ */ l.createElement("label", null, "Description"), /* @__PURE__ */ l.createElement("textarea", { value: s, onChange: (E) => i(E.target.value), placeholder: "What are we solving?" })), /* @__PURE__ */ l.createElement("div", { className: "field steps-field" }, /* @__PURE__ */ l.createElement("label", null, "Steps"), /* @__PURE__ */ l.createElement(
    "textarea",
    {
      className: "steps-input",
      value: o,
      onChange: (E) => u(E.target.value),
      placeholder: "Step-by-step or reminders"
    }
  )), /* @__PURE__ */ l.createElement(
    "div",
    {
      className: `field attach-field ${j ? "drag-over" : ""}`,
      onPaste: k,
      onDragOver: (E) => E.preventDefault(),
      onDragEnter: L,
      onDragLeave: G,
      onDrop: se,
      tabIndex: 0,
      onClick: () => w.current?.click()
    },
    /* @__PURE__ */ l.createElement("label", null, "Attach screenshots (optional)"),
    /* @__PURE__ */ l.createElement("input", { ref: w, type: "file", accept: "image/*", multiple: !0, onChange: f, style: { display: "none" } }),
    d && d.length ? /* @__PURE__ */ l.createElement("div", { className: "attach-previews" }, d.map((E, R) => /* @__PURE__ */ l.createElement("div", { className: "attach-preview", key: R }, /* @__PURE__ */ l.createElement("img", { src: E, alt: `attachment-${R}` }), /* @__PURE__ */ l.createElement(
      "button",
      {
        type: "button",
        className: "remove",
        "aria-label": "Remove image",
        onClick: (C) => {
          C.stopPropagation(), U(R);
        }
      },
      "−"
    )))) : /* @__PURE__ */ l.createElement("div", { className: "attach-hint" }, "Drop or paste images here, or click to select")
  ), /* @__PURE__ */ l.createElement("div", { className: "actions" }, /* @__PURE__ */ l.createElement("button", { type: "submit" }, "Save entry")));
}, be = ({ tasks: a, onDelete: e, onUpdate: t, onOpenViewer: r }) => {
  const [n, s] = D(null), [i, o] = D(""), u = (f) => new Promise((k, w) => {
    const Z = new FileReader();
    Z.onload = () => {
      typeof Z.result == "string" ? k(Z.result) : w(new Error("invalid file result"));
    }, Z.onerror = () => w(new Error("file read error")), Z.readAsDataURL(f);
  }), d = async (f, k) => {
    if (!(!k || !k.length))
      try {
        const w = Array.from(k).filter((L) => L.type.startsWith("image/"));
        if (!w.length) return;
        const Z = await Promise.all(w.map((L) => u(L))), j = a.find((L) => L.id === f), M = Array.isArray(j?.images) && j.images.length ? j.images : j?.imageData ? [j.imageData] : [];
        t(f, { images: [...M, ...Z] });
      } catch (w) {
        console.error("failed to add images", w);
      }
  }, v = (f, k) => {
    const w = a.find((M) => M.id === f);
    if (!w) return;
    const j = (Array.isArray(w.images) && w.images.length ? w.images : w.imageData ? [w.imageData] : []).filter((M, L) => L !== k);
    j.length ? t(f, { images: j }) : t(f, { images: [], imageData: void 0 });
  }, O = (f, k, w, Z) => {
    if (typeof r == "function") {
      r(f, k, w, Z);
      return;
    }
    typeof be.openViewerCallback == "function" && be.openViewerCallback(f, k, w, Z);
    try {
      const j = new CustomEvent("sapwiki:openViewer", { detail: { taskId: f, images: k, index: w, title: Z } });
      window.dispatchEvent(j);
    } catch {
    }
  };
  return a.length ? /* @__PURE__ */ l.createElement("div", { className: "task-grid" }, a.map((f) => /* @__PURE__ */ l.createElement("article", { className: "card task-card", key: f.id }, /* @__PURE__ */ l.createElement("header", { className: "task-header" }, /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement("div", { className: "eyebrow" }, new Date(f.createdAt).toLocaleString()), /* @__PURE__ */ l.createElement("h3", null, f.title), /* @__PURE__ */ l.createElement("div", { className: "tags" }, n === f.id ? /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement(
    "input",
    {
      className: "edit-tcodes-input",
      value: i,
      onChange: (k) => o(k.target.value),
      placeholder: "SE16, MM03"
    }
  ), /* @__PURE__ */ l.createElement("div", { className: "edit-actions" }, /* @__PURE__ */ l.createElement(
    "button",
    {
      type: "button",
      className: "ghost small",
      onClick: () => {
        const k = i.split(",").map((w) => w.trim()).filter(Boolean);
        t(f.id, { tCodes: k, tCode: "" }), s(null);
      }
    },
    "Save"
  ), /* @__PURE__ */ l.createElement("button", { type: "button", className: "ghost small", onClick: () => s(null) }, "Cancel"))) : /* @__PURE__ */ l.createElement(l.Fragment, null, f.tCode ? /* @__PURE__ */ l.createElement("span", { className: "pill" }, f.tCode) : null, f.tCodes?.map((k) => /* @__PURE__ */ l.createElement("span", { key: `${f.id}-${k}`, className: "pill" }, k)), /* @__PURE__ */ l.createElement(
    "button",
    {
      type: "button",
      className: "ghost small",
      onClick: () => {
        const k = [
          ...Array.isArray(f.tCodes) ? f.tCodes : []
        ];
        f.tCode && !k.includes(f.tCode) && k.unshift(f.tCode), o(k.join(", ")), s(f.id);
      }
    },
    "Edit"
  )))), /* @__PURE__ */ l.createElement("button", { className: "ghost", onClick: () => e(f.id) }, "Delete")), /* @__PURE__ */ l.createElement("div", { className: "field" }, /* @__PURE__ */ l.createElement("label", null, "Description"), /* @__PURE__ */ l.createElement(
    "textarea",
    {
      defaultValue: f.requirement,
      onBlur: (k) => t(f.id, { requirement: k.target.value }),
      rows: 3
    }
  )), /* @__PURE__ */ l.createElement("div", { className: "field notes-field" }, /* @__PURE__ */ l.createElement("label", null, "Steps / Notes"), /* @__PURE__ */ l.createElement(
    "textarea",
    {
      className: "notes-input",
      defaultValue: f.steps,
      onBlur: (k) => t(f.id, { steps: k.target.value })
    }
  )), (() => {
    const k = Array.isArray(f.images) && f.images.length ? f.images : f.imageData ? [f.imageData] : [];
    return k.length ? /* @__PURE__ */ l.createElement("div", { className: "field images" }, /* @__PURE__ */ l.createElement("label", null, "Image(s)", /* @__PURE__ */ l.createElement(
      "button",
      {
        type: "button",
        className: "ghost small",
        onClick: () => {
          document.getElementById(`add-img-${f.id}`)?.click();
        },
        style: { marginLeft: 8 }
      },
      "Add Image"
    )), /* @__PURE__ */ l.createElement(
      "input",
      {
        id: `add-img-${f.id}`,
        type: "file",
        accept: "image/*",
        multiple: !0,
        style: { display: "none" },
        onChange: (w) => d(f.id, w.target.files)
      }
    ), /* @__PURE__ */ l.createElement("div", { className: "image-row" }, k.map((w, Z) => /* @__PURE__ */ l.createElement(
      "div",
      {
        className: "attach-preview",
        key: `${f.id}-img-${Z}`,
        onClick: () => O(f.id, k, Z, f.title),
        role: "button",
        tabIndex: 0,
        onKeyDown: (j) => {
          (j.key === "Enter" || j.key === " ") && O(f.id, k, Z, f.title);
        }
      },
      /* @__PURE__ */ l.createElement(
        "img",
        {
          src: w,
          alt: `${f.title} ${Z + 1}`,
          className: "preview clickable"
        }
      ),
      /* @__PURE__ */ l.createElement(
        "button",
        {
          type: "button",
          className: "remove",
          "aria-label": "Delete image",
          onClick: (j) => {
            j.stopPropagation(), v(f.id, Z);
          }
        },
        "−"
      )
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
  const [i, o] = D(t), [u, d] = D(!1), [v, O] = D(!1), [f, k] = D("#ff3344"), [w, Z] = D(4), [j, M] = D(0), [L, G] = D(!1), se = W(null), U = W(null), Y = W(!1), E = W(!1), R = W(null), C = W([]), _ = Le(() => e[i], [e, i]);
  ee(() => {
    a && (o(t), d(!1), O(!1));
  }, [t, a]), ee(() => {
    if (!a) return;
    const g = (T) => {
      T.key === "Escape" && n(), T.key === "ArrowRight" && o((P) => (P + 1) % e.length), T.key === "ArrowLeft" && o((P) => (P - 1 + e.length) % e.length);
    };
    return window.addEventListener("keydown", g), () => window.removeEventListener("keydown", g);
  }, [e.length, a, n]);
  const N = () => {
    const g = U.current;
    if (!g) return;
    const T = g.toDataURL("image/png");
    C.current[C.current.length - 1] !== T && (C.current = [...C.current, T], M(C.current.length - 1));
  }, I = () => {
    const g = se.current, T = U.current;
    if (!g || !T) return;
    T.width = g.clientWidth, T.height = g.clientHeight;
    const P = T.getContext("2d");
    P && (P.clearRect(0, 0, T.width, T.height), C.current = [T.toDataURL("image/png")], M(0));
  };
  ee(() => {
    if (!a) return;
    const g = () => I();
    return window.addEventListener("resize", g), () => window.removeEventListener("resize", g);
  }, [a, i]), ee(() => {
    if (!a) return;
    const g = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = g;
    };
  }, [a]);
  const z = (g, T) => {
    const P = U.current;
    if (!P) return;
    const V = P.getContext("2d");
    V && (V.globalCompositeOperation = v ? "destination-out" : "source-over", V.strokeStyle = v ? "rgba(0,0,0,1)" : f, V.lineWidth = w, V.lineCap = "round", V.lineJoin = "round", V.beginPath(), V.moveTo(g.x, g.y), V.lineTo(T.x, T.y), V.stroke());
  }, ye = (g) => {
    const T = U.current;
    if (!T) return { x: 0, y: 0 };
    const P = T.getBoundingClientRect();
    return { x: g.clientX - P.left, y: g.clientY - P.top };
  }, ht = (g) => {
    if (!u) return;
    const T = ye(g);
    Y.current = !0, E.current = !0, R.current = T, z(T, T), g.currentTarget.setPointerCapture(g.pointerId);
  }, mt = (g) => {
    if (!u || !Y.current || !R.current) return;
    const T = ye(g);
    z(R.current, T), E.current = !0, R.current = T;
  }, Me = (g) => {
    Y.current && E.current && N(), Y.current = !1, E.current = !1, R.current = null, g.currentTarget.hasPointerCapture(g.pointerId) && g.currentTarget.releasePointerCapture(g.pointerId);
  }, gt = () => {
    const g = U.current;
    if (!g || C.current.length <= 1) return;
    C.current = C.current.slice(0, -1);
    const T = C.current[C.current.length - 1];
    if (!T) return;
    const P = g.getContext("2d");
    if (!P) return;
    const V = new Image();
    V.onload = () => {
      P.clearRect(0, 0, g.width, g.height), P.drawImage(V, 0, 0, g.width, g.height), M(C.current.length - 1);
    }, V.src = T;
  }, Ue = () => {
    const g = U.current;
    if (!g) return;
    const T = g.getContext("2d");
    T && (T.clearRect(0, 0, g.width, g.height), N());
  }, vt = async () => {
    const g = e[i], T = U.current, P = se.current;
    if (!(!g || !T || !P)) {
      G(!0);
      try {
        const V = await new Promise((Be, Fe) => {
          const le = new Image();
          le.onload = () => {
            const J = document.createElement("canvas");
            J.width = le.naturalWidth, J.height = le.naturalHeight;
            const Se = J.getContext("2d");
            if (!Se) {
              Fe(new Error("Could not create drawing context."));
              return;
            }
            Se.drawImage(le, 0, 0, J.width, J.height);
            const xe = new Image();
            xe.onload = () => {
              Se.drawImage(xe, 0, 0, J.width, J.height), Be(J.toDataURL("image/png"));
            }, xe.onerror = () => Be(J.toDataURL("image/png")), xe.src = T.toDataURL("image/png");
          }, le.onerror = () => Fe(new Error("Failed to load source image.")), le.src = g;
        });
        s(V, i), Ue(), d(!1), O(!1);
      } finally {
        G(!1);
      }
    }
  };
  return !a || e.length === 0 || !_ ? null : /* @__PURE__ */ l.createElement("div", { className: "pv-overlay", role: "dialog", "aria-modal": "true" }, /* @__PURE__ */ l.createElement("div", { className: "pv-dialog" }, /* @__PURE__ */ l.createElement("div", { className: "pv-header" }, /* @__PURE__ */ l.createElement("p", { className: "pv-title" }, r, " - Image ", i + 1, " / ", e.length), /* @__PURE__ */ l.createElement("div", { className: "pv-controls" }, /* @__PURE__ */ l.createElement("button", { type: "button", onClick: () => o((g) => (g - 1 + e.length) % e.length) }, "Prev"), /* @__PURE__ */ l.createElement("button", { type: "button", onClick: () => o((g) => (g + 1) % e.length) }, "Next"), /* @__PURE__ */ l.createElement("button", { type: "button", onClick: n, className: "ghost" }, "Close"))), /* @__PURE__ */ l.createElement("div", { className: "pv-toolbar" }, /* @__PURE__ */ l.createElement("button", { type: "button", onClick: () => d((g) => !g), className: u ? "active" : "" }, u ? "Drawing On" : "Draw"), /* @__PURE__ */ l.createElement("button", { type: "button", onClick: () => {
    O((g) => !g), u || d(!0);
  }, className: v ? "active" : "" }, v ? "Eraser On" : "Eraser"), /* @__PURE__ */ l.createElement("div", { className: "pv-brush-group" }, /* @__PURE__ */ l.createElement("label", null, "Color"), /* @__PURE__ */ l.createElement("input", { type: "color", value: f, onChange: (g) => k(g.target.value), "aria-label": "Brush color" }), /* @__PURE__ */ l.createElement("label", { htmlFor: "brush-size" }, "Brush"), /* @__PURE__ */ l.createElement("input", { id: "brush-size", type: "range", min: 2, max: 18, value: w, onChange: (g) => Z(Number(g.target.value)) })), /* @__PURE__ */ l.createElement("button", { type: "button", onClick: gt, disabled: j === 0 }, "Undo"), /* @__PURE__ */ l.createElement("button", { type: "button", onClick: Ue }, "Clear"), /* @__PURE__ */ l.createElement("button", { type: "button", onClick: vt, disabled: L, className: "primary" }, L ? "Saving..." : "Save")), /* @__PURE__ */ l.createElement("div", { className: "pv-body" }, /* @__PURE__ */ l.createElement("div", { className: "pv-image-wrap" }, /* @__PURE__ */ l.createElement("img", { ref: se, src: _, alt: `Viewer image ${i + 1}`, className: "pv-image", onLoad: I }), /* @__PURE__ */ l.createElement("canvas", { ref: U, className: `pv-canvas ${u ? v ? "erase" : "draw" : "disabled"}`, onPointerDown: ht, onPointerMove: mt, onPointerUp: Me, onPointerLeave: Me })))));
}
var S;
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
    for (const i of n)
      s[i] = i;
    return s;
  }, a.getValidEnumValues = (n) => {
    const s = a.objectKeys(n).filter((o) => typeof n[n[o]] != "number"), i = {};
    for (const o of s)
      i[o] = n[o];
    return a.objectValues(i);
  }, a.objectValues = (n) => a.objectKeys(n).map(function(s) {
    return n[s];
  }), a.objectKeys = typeof Object.keys == "function" ? (n) => Object.keys(n) : (n) => {
    const s = [];
    for (const i in n)
      Object.prototype.hasOwnProperty.call(n, i) && s.push(i);
    return s;
  }, a.find = (n, s) => {
    for (const i of n)
      if (s(i))
        return i;
  }, a.isInteger = typeof Number.isInteger == "function" ? (n) => Number.isInteger(n) : (n) => typeof n == "number" && Number.isFinite(n) && Math.floor(n) === n;
  function r(n, s = " | ") {
    return n.map((i) => typeof i == "string" ? `'${i}'` : i).join(s);
  }
  a.joinValues = r, a.jsonStringifyReplacer = (n, s) => typeof s == "bigint" ? s.toString() : s;
})(S || (S = {}));
var We;
(function(a) {
  a.mergeShapes = (e, t) => ({
    ...e,
    ...t
    // second overwrites first
  });
})(We || (We = {}));
const h = S.arrayToEnum([
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
]), Q = (a) => {
  switch (typeof a) {
    case "undefined":
      return h.undefined;
    case "string":
      return h.string;
    case "number":
      return Number.isNaN(a) ? h.nan : h.number;
    case "boolean":
      return h.boolean;
    case "function":
      return h.function;
    case "bigint":
      return h.bigint;
    case "symbol":
      return h.symbol;
    case "object":
      return Array.isArray(a) ? h.array : a === null ? h.null : a.then && typeof a.then == "function" && a.catch && typeof a.catch == "function" ? h.promise : typeof Map < "u" && a instanceof Map ? h.map : typeof Set < "u" && a instanceof Set ? h.set : typeof Date < "u" && a instanceof Date ? h.date : h.object;
    default:
      return h.unknown;
  }
}, c = S.arrayToEnum([
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
class H extends Error {
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
      for (const i of s.issues)
        if (i.code === "invalid_union")
          i.unionErrors.map(n);
        else if (i.code === "invalid_return_type")
          n(i.returnTypeError);
        else if (i.code === "invalid_arguments")
          n(i.argumentsError);
        else if (i.path.length === 0)
          r._errors.push(t(i));
        else {
          let o = r, u = 0;
          for (; u < i.path.length; ) {
            const d = i.path[u];
            u === i.path.length - 1 ? (o[d] = o[d] || { _errors: [] }, o[d]._errors.push(t(i))) : o[d] = o[d] || { _errors: [] }, o = o[d], u++;
          }
        }
    };
    return n(this), r;
  }
  static assert(e) {
    if (!(e instanceof H))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, S.jsonStringifyReplacer, 2);
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
H.create = (a) => new H(a);
const Ie = (a, e) => {
  let t;
  switch (a.code) {
    case c.invalid_type:
      a.received === h.undefined ? t = "Required" : t = `Expected ${a.expected}, received ${a.received}`;
      break;
    case c.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(a.expected, S.jsonStringifyReplacer)}`;
      break;
    case c.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${S.joinValues(a.keys, ", ")}`;
      break;
    case c.invalid_union:
      t = "Invalid input";
      break;
    case c.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${S.joinValues(a.options)}`;
      break;
    case c.invalid_enum_value:
      t = `Invalid enum value. Expected ${S.joinValues(a.options)}, received '${a.received}'`;
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
      typeof a.validation == "object" ? "includes" in a.validation ? (t = `Invalid input: must include "${a.validation.includes}"`, typeof a.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${a.validation.position}`)) : "startsWith" in a.validation ? t = `Invalid input: must start with "${a.validation.startsWith}"` : "endsWith" in a.validation ? t = `Invalid input: must end with "${a.validation.endsWith}"` : S.assertNever(a.validation) : a.validation !== "regex" ? t = `Invalid ${a.validation}` : t = "Invalid";
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
      t = e.defaultError, S.assertNever(a);
  }
  return { message: t };
};
let kt = Ie;
function bt() {
  return kt;
}
const wt = (a) => {
  const { data: e, path: t, errorMaps: r, issueData: n } = a, s = [...t, ...n.path || []], i = {
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
  const u = r.filter((d) => !!d).slice().reverse();
  for (const d of u)
    o = d(i, { data: e, defaultError: o }).message;
  return {
    ...n,
    path: s,
    message: o
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
class B {
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
      const s = await n.key, i = await n.value;
      r.push({
        key: s,
        value: i
      });
    }
    return B.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, t) {
    const r = {};
    for (const n of t) {
      const { key: s, value: i } = n;
      if (s.status === "aborted" || i.status === "aborted")
        return y;
      s.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), s.value !== "__proto__" && (typeof i.value < "u" || n.alwaysSet) && (r[s.value] = i.value);
    }
    return { status: e.value, value: r };
  }
}
const y = Object.freeze({
  status: "aborted"
}), me = (a) => ({ status: "dirty", value: a }), F = (a) => ({ status: "valid", value: a }), qe = (a) => a.status === "aborted", Je = (a) => a.status === "dirty", de = (a) => a.status === "valid", we = (a) => typeof Promise < "u" && a instanceof Promise;
var m;
(function(a) {
  a.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, a.toString = (e) => typeof e == "string" ? e : e?.message;
})(m || (m = {}));
class re {
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
      const t = new H(a.common.issues);
      return this._error = t, this._error;
    }
  };
};
function b(a) {
  if (!a)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: r, description: n } = a;
  if (e && (t || r))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: n } : { errorMap: (i, o) => {
    const { message: u } = a;
    return i.code === "invalid_enum_value" ? { message: u ?? o.defaultError } : typeof o.data > "u" ? { message: u ?? r ?? o.defaultError } : i.code !== "invalid_type" ? { message: o.defaultError } : { message: u ?? t ?? o.defaultError };
  }, description: n };
}
class A {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return Q(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: Q(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new B(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: Q(e.data),
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
      parsedType: Q(e)
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
      parsedType: Q(e)
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
      parsedType: Q(e)
    }, n = this._parse({ data: e, path: r.path, parent: r }), s = await (we(n) ? n : Promise.resolve(n));
    return He(r, s);
  }
  refine(e, t) {
    const r = (n) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(n) : t;
    return this._refinement((n, s) => {
      const i = e(n), o = () => s.addIssue({
        code: c.custom,
        ...r(n)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((u) => u ? !0 : (o(), !1)) : i ? !0 : (o(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((r, n) => e(r) ? !0 : (n.addIssue(typeof t == "function" ? t(r, n) : t), !1));
  }
  _refinement(e) {
    return new fe({
      schema: this,
      typeName: x.ZodEffects,
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
    return ae.create(this, this._def);
  }
  nullable() {
    return he.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return q.create(this);
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
      ...b(this._def),
      schema: this,
      typeName: x.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new Ze({
      ...b(this._def),
      innerType: this,
      defaultValue: t,
      typeName: x.ZodDefault
    });
  }
  brand() {
    return new qt({
      typeName: x.ZodBranded,
      type: this,
      ...b(this._def)
    });
  }
  catch(e) {
    const t = typeof e == "function" ? e : () => e;
    return new je({
      ...b(this._def),
      innerType: this,
      catchValue: t,
      typeName: x.ZodCatch
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
    return De.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Et = /^c[^\s-]{8,}$/i, Ct = /^[0-9a-z]+$/, Nt = /^[0-9A-HJKMNP-TV-Z]{26}$/i, Tt = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, At = /^[a-z0-9_-]{21}$/i, St = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Rt = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, It = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Ot = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Re;
const Zt = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, jt = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Dt = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, $t = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Pt = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Lt = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, ct = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Vt = new RegExp(`^${ct}$`);
function dt(a) {
  let e = "[0-5]\\d";
  a.precision ? e = `${e}\\.\\d{${a.precision}}` : a.precision == null && (e = `${e}(\\.\\d+)?`);
  const t = a.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${t}`;
}
function zt(a) {
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
  if (!St.test(a))
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
class te extends A {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== h.string) {
      const s = this._getOrReturnCtx(e);
      return p(s, {
        code: c.invalid_type,
        expected: h.string,
        received: s.parsedType
      }), y;
    }
    const r = new B();
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
        const i = e.data.length > s.value, o = e.data.length < s.value;
        (i || o) && (n = this._getOrReturnCtx(e, n), i ? p(n, {
          code: c.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }) : o && p(n, {
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
        At.test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
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
      }), r.dirty()) : s.kind === "date" ? Vt.test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
        code: c.invalid_string,
        validation: "date",
        message: s.message
      }), r.dirty()) : s.kind === "time" ? zt(s).test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
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
      }), r.dirty()) : S.assertNever(s);
    return { status: r.value, value: e.data };
  }
  _regex(e, t, r) {
    return this.refinement((n) => e.test(n), {
      validation: t,
      code: c.invalid_string,
      ...m.errToObj(r)
    });
  }
  _addCheck(e) {
    return new te({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...m.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...m.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...m.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...m.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...m.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...m.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...m.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...m.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...m.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...m.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...m.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...m.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...m.errToObj(e) });
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
      ...m.errToObj(e?.message)
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
      ...m.errToObj(e?.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...m.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...m.errToObj(t)
    });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t?.position,
      ...m.errToObj(t?.message)
    });
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...m.errToObj(t)
    });
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...m.errToObj(t)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...m.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...m.errToObj(t)
    });
  }
  length(e, t) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...m.errToObj(t)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, m.errToObj(e));
  }
  trim() {
    return new te({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new te({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new te({
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
te.create = (a) => new te({
  checks: [],
  typeName: x.ZodString,
  coerce: a?.coerce ?? !1,
  ...b(a)
});
function Wt(a, e) {
  const t = (a.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, n = t > r ? t : r, s = Number.parseInt(a.toFixed(n).replace(".", "")), i = Number.parseInt(e.toFixed(n).replace(".", ""));
  return s % i / 10 ** n;
}
class ue extends A {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== h.number) {
      const s = this._getOrReturnCtx(e);
      return p(s, {
        code: c.invalid_type,
        expected: h.number,
        received: s.parsedType
      }), y;
    }
    let r;
    const n = new B();
    for (const s of this._def.checks)
      s.kind === "int" ? S.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), p(r, {
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
      }), n.dirty()) : S.assertNever(s);
    return { status: n.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, m.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, m.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, m.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, m.toString(t));
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
          message: m.toString(n)
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
      message: m.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: m.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: m.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: m.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: m.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: m.toString(t)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: m.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: m.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: m.toString(e)
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
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && S.isInteger(e.value));
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
  typeName: x.ZodNumber,
  coerce: a?.coerce || !1,
  ...b(a)
});
class ge extends A {
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
    if (this._getType(e) !== h.bigint)
      return this._getInvalidInput(e);
    let r;
    const n = new B();
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
      }), n.dirty()) : S.assertNever(s);
    return { status: n.value, value: e.data };
  }
  _getInvalidInput(e) {
    const t = this._getOrReturnCtx(e);
    return p(t, {
      code: c.invalid_type,
      expected: h.bigint,
      received: t.parsedType
    }), y;
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, m.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, m.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, m.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, m.toString(t));
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
          message: m.toString(n)
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
      message: m.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: m.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: m.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: m.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: m.toString(t)
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
  typeName: x.ZodBigInt,
  coerce: a?.coerce ?? !1,
  ...b(a)
});
class Ge extends A {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== h.boolean) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: c.invalid_type,
        expected: h.boolean,
        received: r.parsedType
      }), y;
    }
    return F(e.data);
  }
}
Ge.create = (a) => new Ge({
  typeName: x.ZodBoolean,
  coerce: a?.coerce || !1,
  ...b(a)
});
class Ee extends A {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== h.date) {
      const s = this._getOrReturnCtx(e);
      return p(s, {
        code: c.invalid_type,
        expected: h.date,
        received: s.parsedType
      }), y;
    }
    if (Number.isNaN(e.data.getTime())) {
      const s = this._getOrReturnCtx(e);
      return p(s, {
        code: c.invalid_date
      }), y;
    }
    const r = new B();
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
      }), r.dirty()) : S.assertNever(s);
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
      message: m.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: m.toString(t)
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
  typeName: x.ZodDate,
  ...b(a)
});
class Ye extends A {
  _parse(e) {
    if (this._getType(e) !== h.symbol) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: c.invalid_type,
        expected: h.symbol,
        received: r.parsedType
      }), y;
    }
    return F(e.data);
  }
}
Ye.create = (a) => new Ye({
  typeName: x.ZodSymbol,
  ...b(a)
});
class Ke extends A {
  _parse(e) {
    if (this._getType(e) !== h.undefined) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: c.invalid_type,
        expected: h.undefined,
        received: r.parsedType
      }), y;
    }
    return F(e.data);
  }
}
Ke.create = (a) => new Ke({
  typeName: x.ZodUndefined,
  ...b(a)
});
class Qe extends A {
  _parse(e) {
    if (this._getType(e) !== h.null) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: c.invalid_type,
        expected: h.null,
        received: r.parsedType
      }), y;
    }
    return F(e.data);
  }
}
Qe.create = (a) => new Qe({
  typeName: x.ZodNull,
  ...b(a)
});
class Xe extends A {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return F(e.data);
  }
}
Xe.create = (a) => new Xe({
  typeName: x.ZodAny,
  ...b(a)
});
class et extends A {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return F(e.data);
  }
}
et.create = (a) => new et({
  typeName: x.ZodUnknown,
  ...b(a)
});
class ne extends A {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return p(t, {
      code: c.invalid_type,
      expected: h.never,
      received: t.parsedType
    }), y;
  }
}
ne.create = (a) => new ne({
  typeName: x.ZodNever,
  ...b(a)
});
class tt extends A {
  _parse(e) {
    if (this._getType(e) !== h.undefined) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: c.invalid_type,
        expected: h.void,
        received: r.parsedType
      }), y;
    }
    return F(e.data);
  }
}
tt.create = (a) => new tt({
  typeName: x.ZodVoid,
  ...b(a)
});
class q extends A {
  _parse(e) {
    const { ctx: t, status: r } = this._processInputParams(e), n = this._def;
    if (t.parsedType !== h.array)
      return p(t, {
        code: c.invalid_type,
        expected: h.array,
        received: t.parsedType
      }), y;
    if (n.exactLength !== null) {
      const i = t.data.length > n.exactLength.value, o = t.data.length < n.exactLength.value;
      (i || o) && (p(t, {
        code: i ? c.too_big : c.too_small,
        minimum: o ? n.exactLength.value : void 0,
        maximum: i ? n.exactLength.value : void 0,
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
      return Promise.all([...t.data].map((i, o) => n.type._parseAsync(new re(t, i, t.path, o)))).then((i) => B.mergeArray(r, i));
    const s = [...t.data].map((i, o) => n.type._parseSync(new re(t, i, t.path, o)));
    return B.mergeArray(r, s);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new q({
      ...this._def,
      minLength: { value: e, message: m.toString(t) }
    });
  }
  max(e, t) {
    return new q({
      ...this._def,
      maxLength: { value: e, message: m.toString(t) }
    });
  }
  length(e, t) {
    return new q({
      ...this._def,
      exactLength: { value: e, message: m.toString(t) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
q.create = (a, e) => new q({
  type: a,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: x.ZodArray,
  ...b(e)
});
function ce(a) {
  if (a instanceof $) {
    const e = {};
    for (const t in a.shape) {
      const r = a.shape[t];
      e[t] = ae.create(ce(r));
    }
    return new $({
      ...a._def,
      shape: () => e
    });
  } else return a instanceof q ? new q({
    ...a._def,
    type: ce(a.element)
  }) : a instanceof ae ? ae.create(ce(a.unwrap())) : a instanceof he ? he.create(ce(a.unwrap())) : a instanceof oe ? oe.create(a.items.map((e) => ce(e))) : a;
}
class $ extends A {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), t = S.objectKeys(e);
    return this._cached = { shape: e, keys: t }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== h.object) {
      const d = this._getOrReturnCtx(e);
      return p(d, {
        code: c.invalid_type,
        expected: h.object,
        received: d.parsedType
      }), y;
    }
    const { status: r, ctx: n } = this._processInputParams(e), { shape: s, keys: i } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof ne && this._def.unknownKeys === "strip"))
      for (const d in n.data)
        i.includes(d) || o.push(d);
    const u = [];
    for (const d of i) {
      const v = s[d], O = n.data[d];
      u.push({
        key: { status: "valid", value: d },
        value: v._parse(new re(n, O, n.path, d)),
        alwaysSet: d in n.data
      });
    }
    if (this._def.catchall instanceof ne) {
      const d = this._def.unknownKeys;
      if (d === "passthrough")
        for (const v of o)
          u.push({
            key: { status: "valid", value: v },
            value: { status: "valid", value: n.data[v] }
          });
      else if (d === "strict")
        o.length > 0 && (p(n, {
          code: c.unrecognized_keys,
          keys: o
        }), r.dirty());
      else if (d !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const d = this._def.catchall;
      for (const v of o) {
        const O = n.data[v];
        u.push({
          key: { status: "valid", value: v },
          value: d._parse(
            new re(n, O, n.path, v)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: v in n.data
        });
      }
    }
    return n.common.async ? Promise.resolve().then(async () => {
      const d = [];
      for (const v of u) {
        const O = await v.key, f = await v.value;
        d.push({
          key: O,
          value: f,
          alwaysSet: v.alwaysSet
        });
      }
      return d;
    }).then((d) => B.mergeObjectSync(r, d)) : B.mergeObjectSync(r, u);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return m.errToObj, new $({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, r) => {
          const n = this._def.errorMap?.(t, r).message ?? r.defaultError;
          return t.code === "unrecognized_keys" ? {
            message: m.errToObj(e).message ?? n
          } : {
            message: n
          };
        }
      } : {}
    });
  }
  strip() {
    return new $({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new $({
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
    return new $({
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
    return new $({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: x.ZodObject
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
    return new $({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const t = {};
    for (const r of S.objectKeys(e))
      e[r] && this.shape[r] && (t[r] = this.shape[r]);
    return new $({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    for (const r of S.objectKeys(this.shape))
      e[r] || (t[r] = this.shape[r]);
    return new $({
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
    for (const r of S.objectKeys(this.shape)) {
      const n = this.shape[r];
      e && !e[r] ? t[r] = n : t[r] = n.optional();
    }
    return new $({
      ...this._def,
      shape: () => t
    });
  }
  required(e) {
    const t = {};
    for (const r of S.objectKeys(this.shape))
      if (e && !e[r])
        t[r] = this.shape[r];
      else {
        let s = this.shape[r];
        for (; s instanceof ae; )
          s = s._def.innerType;
        t[r] = s;
      }
    return new $({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return ut(S.objectKeys(this.shape));
  }
}
$.create = (a, e) => new $({
  shape: () => a,
  unknownKeys: "strip",
  catchall: ne.create(),
  typeName: x.ZodObject,
  ...b(e)
});
$.strictCreate = (a, e) => new $({
  shape: () => a,
  unknownKeys: "strict",
  catchall: ne.create(),
  typeName: x.ZodObject,
  ...b(e)
});
$.lazycreate = (a, e) => new $({
  shape: a,
  unknownKeys: "strip",
  catchall: ne.create(),
  typeName: x.ZodObject,
  ...b(e)
});
class Ce extends A {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = this._def.options;
    function n(s) {
      for (const o of s)
        if (o.result.status === "valid")
          return o.result;
      for (const o of s)
        if (o.result.status === "dirty")
          return t.common.issues.push(...o.ctx.common.issues), o.result;
      const i = s.map((o) => new H(o.ctx.common.issues));
      return p(t, {
        code: c.invalid_union,
        unionErrors: i
      }), y;
    }
    if (t.common.async)
      return Promise.all(r.map(async (s) => {
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
      for (const u of r) {
        const d = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, v = u._parseSync({
          data: t.data,
          path: t.path,
          parent: d
        });
        if (v.status === "valid")
          return v;
        v.status === "dirty" && !s && (s = { result: v, ctx: d }), d.common.issues.length && i.push(d.common.issues);
      }
      if (s)
        return t.common.issues.push(...s.ctx.common.issues), s.result;
      const o = i.map((u) => new H(u));
      return p(t, {
        code: c.invalid_union,
        unionErrors: o
      }), y;
    }
  }
  get options() {
    return this._def.options;
  }
}
Ce.create = (a, e) => new Ce({
  options: a,
  typeName: x.ZodUnion,
  ...b(e)
});
function Oe(a, e) {
  const t = Q(a), r = Q(e);
  if (a === e)
    return { valid: !0, data: a };
  if (t === h.object && r === h.object) {
    const n = S.objectKeys(e), s = S.objectKeys(a).filter((o) => n.indexOf(o) !== -1), i = { ...a, ...e };
    for (const o of s) {
      const u = Oe(a[o], e[o]);
      if (!u.valid)
        return { valid: !1 };
      i[o] = u.data;
    }
    return { valid: !0, data: i };
  } else if (t === h.array && r === h.array) {
    if (a.length !== e.length)
      return { valid: !1 };
    const n = [];
    for (let s = 0; s < a.length; s++) {
      const i = a[s], o = e[s], u = Oe(i, o);
      if (!u.valid)
        return { valid: !1 };
      n.push(u.data);
    }
    return { valid: !0, data: n };
  } else return t === h.date && r === h.date && +a == +e ? { valid: !0, data: a } : { valid: !1 };
}
class Ne extends A {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e), n = (s, i) => {
      if (qe(s) || qe(i))
        return y;
      const o = Oe(s.value, i.value);
      return o.valid ? ((Je(s) || Je(i)) && t.dirty(), { status: t.value, value: o.data }) : (p(r, {
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
    ]).then(([s, i]) => n(s, i)) : n(this._def.left._parseSync({
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
  typeName: x.ZodIntersection,
  ...b(t)
});
class oe extends A {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== h.array)
      return p(r, {
        code: c.invalid_type,
        expected: h.array,
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
    const s = [...r.data].map((i, o) => {
      const u = this._def.items[o] || this._def.rest;
      return u ? u._parse(new re(r, i, r.path, o)) : null;
    }).filter((i) => !!i);
    return r.common.async ? Promise.all(s).then((i) => B.mergeArray(t, i)) : B.mergeArray(t, s);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new oe({
      ...this._def,
      rest: e
    });
  }
}
oe.create = (a, e) => {
  if (!Array.isArray(a))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new oe({
    items: a,
    typeName: x.ZodTuple,
    rest: null,
    ...b(e)
  });
};
class at extends A {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== h.map)
      return p(r, {
        code: c.invalid_type,
        expected: h.map,
        received: r.parsedType
      }), y;
    const n = this._def.keyType, s = this._def.valueType, i = [...r.data.entries()].map(([o, u], d) => ({
      key: n._parse(new re(r, o, r.path, [d, "key"])),
      value: s._parse(new re(r, u, r.path, [d, "value"]))
    }));
    if (r.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const u of i) {
          const d = await u.key, v = await u.value;
          if (d.status === "aborted" || v.status === "aborted")
            return y;
          (d.status === "dirty" || v.status === "dirty") && t.dirty(), o.set(d.value, v.value);
        }
        return { status: t.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const u of i) {
        const d = u.key, v = u.value;
        if (d.status === "aborted" || v.status === "aborted")
          return y;
        (d.status === "dirty" || v.status === "dirty") && t.dirty(), o.set(d.value, v.value);
      }
      return { status: t.value, value: o };
    }
  }
}
at.create = (a, e, t) => new at({
  valueType: e,
  keyType: a,
  typeName: x.ZodMap,
  ...b(t)
});
class ve extends A {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== h.set)
      return p(r, {
        code: c.invalid_type,
        expected: h.set,
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
    function i(u) {
      const d = /* @__PURE__ */ new Set();
      for (const v of u) {
        if (v.status === "aborted")
          return y;
        v.status === "dirty" && t.dirty(), d.add(v.value);
      }
      return { status: t.value, value: d };
    }
    const o = [...r.data.values()].map((u, d) => s._parse(new re(r, u, r.path, d)));
    return r.common.async ? Promise.all(o).then((u) => i(u)) : i(o);
  }
  min(e, t) {
    return new ve({
      ...this._def,
      minSize: { value: e, message: m.toString(t) }
    });
  }
  max(e, t) {
    return new ve({
      ...this._def,
      maxSize: { value: e, message: m.toString(t) }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
ve.create = (a, e) => new ve({
  valueType: a,
  minSize: null,
  maxSize: null,
  typeName: x.ZodSet,
  ...b(e)
});
class rt extends A {
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
  typeName: x.ZodLazy,
  ...b(e)
});
class nt extends A {
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
  typeName: x.ZodLiteral,
  ...b(e)
});
function ut(a, e) {
  return new pe({
    values: a,
    typeName: x.ZodEnum,
    ...b(e)
  });
}
class pe extends A {
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), r = this._def.values;
      return p(t, {
        expected: S.joinValues(r),
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
    return F(e.data);
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
class st extends A {
  _parse(e) {
    const t = S.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== h.string && r.parsedType !== h.number) {
      const n = S.objectValues(t);
      return p(r, {
        expected: S.joinValues(n),
        received: r.parsedType,
        code: c.invalid_type
      }), y;
    }
    if (this._cache || (this._cache = new Set(S.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const n = S.objectValues(t);
      return p(r, {
        received: r.data,
        code: c.invalid_enum_value,
        options: n
      }), y;
    }
    return F(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
st.create = (a, e) => new st({
  values: a,
  typeName: x.ZodNativeEnum,
  ...b(e)
});
class Te extends A {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== h.promise && t.common.async === !1)
      return p(t, {
        code: c.invalid_type,
        expected: h.promise,
        received: t.parsedType
      }), y;
    const r = t.parsedType === h.promise ? t.data : Promise.resolve(t.data);
    return F(r.then((n) => this._def.type.parseAsync(n, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
}
Te.create = (a, e) => new Te({
  type: a,
  typeName: x.ZodPromise,
  ...b(e)
});
class fe extends A {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === x.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e), n = this._def.effect || null, s = {
      addIssue: (i) => {
        p(r, i), i.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (s.addIssue = s.addIssue.bind(s), n.type === "preprocess") {
      const i = n.transform(r.data, s);
      if (r.common.async)
        return Promise.resolve(i).then(async (o) => {
          if (t.value === "aborted")
            return y;
          const u = await this._def.schema._parseAsync({
            data: o,
            path: r.path,
            parent: r
          });
          return u.status === "aborted" ? y : u.status === "dirty" || t.value === "dirty" ? me(u.value) : u;
        });
      {
        if (t.value === "aborted")
          return y;
        const o = this._def.schema._parseSync({
          data: i,
          path: r.path,
          parent: r
        });
        return o.status === "aborted" ? y : o.status === "dirty" || t.value === "dirty" ? me(o.value) : o;
      }
    }
    if (n.type === "refinement") {
      const i = (o) => {
        const u = n.refinement(o, s);
        if (r.common.async)
          return Promise.resolve(u);
        if (u instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return o.status === "aborted" ? y : (o.status === "dirty" && t.dirty(), i(o.value), { status: t.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => o.status === "aborted" ? y : (o.status === "dirty" && t.dirty(), i(o.value).then(() => ({ status: t.value, value: o.value }))));
    }
    if (n.type === "transform")
      if (r.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!de(i))
          return y;
        const o = n.transform(i.value, s);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((i) => de(i) ? Promise.resolve(n.transform(i.value, s)).then((o) => ({
          status: t.value,
          value: o
        })) : y);
    S.assertNever(n);
  }
}
fe.create = (a, e, t) => new fe({
  schema: a,
  typeName: x.ZodEffects,
  effect: e,
  ...b(t)
});
fe.createWithPreprocess = (a, e, t) => new fe({
  schema: e,
  effect: { type: "preprocess", transform: a },
  typeName: x.ZodEffects,
  ...b(t)
});
class ae extends A {
  _parse(e) {
    return this._getType(e) === h.undefined ? F(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ae.create = (a, e) => new ae({
  innerType: a,
  typeName: x.ZodOptional,
  ...b(e)
});
class he extends A {
  _parse(e) {
    return this._getType(e) === h.null ? F(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
he.create = (a, e) => new he({
  innerType: a,
  typeName: x.ZodNullable,
  ...b(e)
});
class Ze extends A {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let r = t.data;
    return t.parsedType === h.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
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
  typeName: x.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...b(e)
});
class je extends A {
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
          return new H(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: n.status === "valid" ? n.value : this._def.catchValue({
        get error() {
          return new H(r.common.issues);
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
  typeName: x.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...b(e)
});
class it extends A {
  _parse(e) {
    if (this._getType(e) !== h.nan) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        code: c.invalid_type,
        expected: h.nan,
        received: r.parsedType
      }), y;
    }
    return { status: "valid", value: e.data };
  }
}
it.create = (a) => new it({
  typeName: x.ZodNaN,
  ...b(a)
});
class qt extends A {
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
class Ve extends A {
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
    return new Ve({
      in: e,
      out: t,
      typeName: x.ZodPipeline
    });
  }
}
class De extends A {
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
  typeName: x.ZodReadonly,
  ...b(e)
});
var x;
(function(a) {
  a.ZodString = "ZodString", a.ZodNumber = "ZodNumber", a.ZodNaN = "ZodNaN", a.ZodBigInt = "ZodBigInt", a.ZodBoolean = "ZodBoolean", a.ZodDate = "ZodDate", a.ZodSymbol = "ZodSymbol", a.ZodUndefined = "ZodUndefined", a.ZodNull = "ZodNull", a.ZodAny = "ZodAny", a.ZodUnknown = "ZodUnknown", a.ZodNever = "ZodNever", a.ZodVoid = "ZodVoid", a.ZodArray = "ZodArray", a.ZodObject = "ZodObject", a.ZodUnion = "ZodUnion", a.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", a.ZodIntersection = "ZodIntersection", a.ZodTuple = "ZodTuple", a.ZodRecord = "ZodRecord", a.ZodMap = "ZodMap", a.ZodSet = "ZodSet", a.ZodFunction = "ZodFunction", a.ZodLazy = "ZodLazy", a.ZodLiteral = "ZodLiteral", a.ZodEnum = "ZodEnum", a.ZodEffects = "ZodEffects", a.ZodNativeEnum = "ZodNativeEnum", a.ZodOptional = "ZodOptional", a.ZodNullable = "ZodNullable", a.ZodDefault = "ZodDefault", a.ZodCatch = "ZodCatch", a.ZodPromise = "ZodPromise", a.ZodBranded = "ZodBranded", a.ZodPipeline = "ZodPipeline", a.ZodReadonly = "ZodReadonly";
})(x || (x = {}));
const K = te.create, Jt = ue.create;
ne.create;
const $e = q.create, Ht = $.create;
Ce.create;
Ne.create;
oe.create;
pe.create;
Te.create;
ae.create;
he.create;
const pt = "tasks", Gt = "1.0.0", Yt = "TASK_COUNT_CHANGED", ft = "sapwiki", Ae = `plugin-${ft}`, Kt = Ht({
  id: K(),
  title: K().min(1, "Title is required"),
  requirement: K().optional().default(""),
  steps: K().optional().default(""),
  tCode: K().optional().default(""),
  tCodes: $e(K()).optional().default([]),
  createdAt: Jt().default(() => Date.now()),
  imageData: K().optional(),
  images: $e(K()).optional().default([])
}), ze = $e(Kt), ot = 240, Qt = (a) => {
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
  const { candidate: e, source: t } = Xt(a), r = ta(e), n = ze.safeParse(r);
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
  const t = ze.safeParse(e);
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
  const [e, t] = D([]), [r, n] = D(!1), s = W(!1);
  ee(() => {
    let O = !0;
    return (async () => {
      const f = await aa(a);
      O && (t(f), n(!0));
    })(), () => {
      O = !1;
    };
  }, [a]), ee(() => {
    if (r) {
      if (!s.current) {
        s.current = !0;
        return;
      }
      ra(a, e), a.eventBus.emit(Yt, { count: e.length });
    }
  }, [a, r, e]);
  const i = _e((O) => {
    t((f) => [...f, na(O)]);
  }, []), o = _e((O, f) => {
    t((k) => k.map((w) => w.id === O ? f(w) : w));
  }, []), u = _e((O) => {
    t((f) => f.filter((k) => k.id !== O));
  }, []), d = _e((O) => {
    const f = ze.safeParse(O);
    f.success && t(f.data);
  }, []), v = Le(
    () => ({
      total: e.length
    }),
    [e]
  );
  return {
    tasks: e,
    hydrated: r,
    addTask: i,
    updateTask: o,
    removeTask: u,
    replaceTasks: d,
    stats: v
  };
}, ia = ({ context: a }) => {
  const { tasks: e, hydrated: t, addTask: r, removeTask: n, updateTask: s, replaceTasks: i, stats: o } = sa(a), [u, d] = D(!1), [v, O] = D([]), [f, k] = D(0), [w, Z] = D(""), [j, M] = D(null), L = (_, N, I, z) => {
    !N || !N.length || (M(_), O(N), k(I || 0), Z(z || ""), d(!0));
  };
  be.openViewerCallback = L, ee(() => {
    const _ = (N) => {
      const I = N?.detail;
      !I || !I.images || L(I.taskId || "", I.images, I.index || 0, I.title || "");
    };
    return window.addEventListener("sapwiki:openViewer", _), () => window.removeEventListener("sapwiki:openViewer", _);
  }, [L]);
  const [G, se] = D(""), U = W(null);
  ee(() => {
    const _ = (N) => {
      const { tasks: I, ok: z } = Pe(N);
      z && I.length && i(I);
    };
    return a.eventBus.on("SAPWIKI_IMPORT", _), () => {
      a.eventBus.off("SAPWIKI_IMPORT", _);
    };
  }, [a, i]);
  const Y = (_, N) => {
    s(_, (I) => ({ ...I, ...N }));
  }, E = async (_) => {
    const N = _.target.files?.[0];
    if (_.target.value = "", !N) return;
    const I = await N.text(), { tasks: z, ok: ye } = Pe(I);
    ye && i(z);
  }, R = () => U.current?.click(), C = () => {
    const _ = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), N = URL.createObjectURL(_), I = document.createElement("a");
    I.href = N, I.download = "sapwiki-tasks.json", I.click(), URL.revokeObjectURL(N);
  };
  return /* @__PURE__ */ l.createElement("div", { className: "app", "data-theme": a.theme }, /* @__PURE__ */ l.createElement("header", { className: "hero card" }, /* @__PURE__ */ l.createElement("div", { className: "hero-copy" }, /* @__PURE__ */ l.createElement("h1", null, "Local wiki"), /* @__PURE__ */ l.createElement("p", { className: "muted" }, "Persisted locally with host storage. Import legacy backups, add notes, and keep images with each entry."), /* @__PURE__ */ l.createElement("div", { className: "chips" }, /* @__PURE__ */ l.createElement("span", { className: `chip ${t ? "chip-ok" : "chip-warn"}` }, /* @__PURE__ */ l.createElement("span", { className: "dot" }), " ", t ? "Ready" : "Restoring data..."), /* @__PURE__ */ l.createElement("span", { className: "chip soft" }, o.total, " entries"))), /* @__PURE__ */ l.createElement("div", { className: "hero-actions" }, /* @__PURE__ */ l.createElement("button", { className: "ghost", onClick: R, disabled: !t }, "Import"), /* @__PURE__ */ l.createElement("button", { onClick: C, disabled: !t || !e.length }, "Export"), /* @__PURE__ */ l.createElement("input", { ref: U, type: "file", accept: "application/json", hidden: !0, onChange: E }), /* @__PURE__ */ l.createElement("div", { className: "header-search" }, /* @__PURE__ */ l.createElement(
    "input",
    {
      "aria-label": "Search entries",
      className: "search-input",
      placeholder: "Search title, description, steps, or T-code",
      value: G,
      onChange: (_) => se(_.target.value)
    }
  )))), /* @__PURE__ */ l.createElement("section", { className: "layout" }, /* @__PURE__ */ l.createElement("div", { className: "panel card" }, /* @__PURE__ */ l.createElement("div", { className: "panel-header" }, /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement("h2", null, "Add an entry"), /* @__PURE__ */ l.createElement("p", { className: "muted" }, "Quickly record SAP cases, solutions, and visuals for future reference."))), /* @__PURE__ */ l.createElement(xt, { onSubmit: r })), /* @__PURE__ */ l.createElement("div", { className: "panel card" }, /* @__PURE__ */ l.createElement("div", { className: "panel-header" }, /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement("h2", null, "Notes"), /* @__PURE__ */ l.createElement("p", { className: "muted" }, "Edit inline, keep evidence, and tidy up when complete."))), /* @__PURE__ */ l.createElement(
    be,
    {
      tasks: Le(() => {
        const _ = G.trim().toLowerCase();
        return _ ? e.filter((N) => [N.title, N.requirement || "", N.steps || "", N.tCode || "", (N.tCodes || []).join(" ")].join(" ").toLowerCase().includes(_)) : e;
      }, [e, G]),
      onDelete: n,
      onUpdate: Y
    }
  ))), /* @__PURE__ */ l.createElement(
    _t,
    {
      isOpen: u,
      images: v,
      initialIndex: f,
      title: w,
      onClose: () => d(!1),
      onSaveAnnotated: (_, N) => {
        j && (s(j, (I) => {
          const z = Array.isArray(I.images) ? I.images.slice() : [];
          return z[N] = _, { ...I, images: z, imageData: z[0] };
        }), d(!1));
      }
    }
  ));
}, oa = "#plugin-sapwiki{--bg: #f4f6fb;--card: #ffffff;--card-strong: #0f172a;--border: #e2e8f0;--text: #0f172a;--muted: #5b6577;--primary: #0f52ba;--primary-strong: #0a3c87;--accent: #22c55e;--warn: #f59e0b;font-family:Segoe UI,system-ui,-apple-system,sans-serif;color:var(--text);background:radial-gradient(circle at 20% 20%,#e5edff,transparent 45%),radial-gradient(circle at 80% 0%,#e8fff4,transparent 35%),var(--bg);min-height:100vh;overflow-x:hidden}#plugin-sapwiki .app{box-sizing:border-box;padding:12px 20px 24px;width:calc(100% - 40px);max-width:none;margin:0;display:flex;flex-direction:column;gap:12px}#plugin-sapwiki *,#plugin-sapwiki *:before,#plugin-sapwiki *:after{box-sizing:inherit}#plugin-sapwiki .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px 20px;box-shadow:0 14px 38px #0f172a14}#plugin-sapwiki .hero{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;background:linear-gradient(135deg,#0f172a,#153e75);color:#e2e8f0;border:none;box-shadow:0 20px 50px #0f172a47}#plugin-sapwiki .hero .muted{color:#e2e8f0d9}#plugin-sapwiki .hero h1{margin:6px 0 10px;color:#f8fafc}#plugin-sapwiki .hero-copy{max-width:640px}#plugin-sapwiki .hero-actions{display:flex;gap:10px;align-items:flex-start}#plugin-sapwiki .header-search{width:100%;margin-top:12px}#plugin-sapwiki .search-input{width:360px;max-width:100%;padding:10px 12px;border-radius:10px;border:1px solid var(--border);background:#fff;font:inherit}@media (min-width: 1000px){#plugin-sapwiki .hero-actions{align-items:center}#plugin-sapwiki .header-search{margin-left:12px;margin-top:0}}#plugin-sapwiki .eyebrow{text-transform:uppercase;letter-spacing:.08em;font-size:11px;color:inherit;margin:0 0 4px}#plugin-sapwiki .muted{color:var(--muted);margin:0}#plugin-sapwiki .chips{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}#plugin-sapwiki .chip{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;background:#ffffff14;color:#f8fafc;border:1px solid rgba(255,255,255,.16);font-weight:600}#plugin-sapwiki .chip.soft{background:#e2e8f0;color:var(--text);border:1px solid transparent}#plugin-sapwiki .chip-ok{background:#22c55e29;color:#e8fff2;border-color:#22c55e52}#plugin-sapwiki .chip-warn{background:#f59e0b2e;color:#fef3c7;border-color:#f59e0b4d}#plugin-sapwiki .dot{width:10px;height:10px;border-radius:50%;display:inline-block;background:#f8fafc;box-shadow:0 0 0 4px #ffffff14}#plugin-sapwiki .layout{display:flex;gap:20px;align-items:flex-start}#plugin-sapwiki .layout>.panel:first-child{flex:0 0 30%}#plugin-sapwiki .layout>.panel:last-child{flex:1 1 70%}#plugin-sapwiki .panel{display:flex;flex-direction:column;gap:12px}#plugin-sapwiki .panel.card{border:none;box-shadow:0 10px 30px #0f172a0f}#plugin-sapwiki .panel-header h2{margin:4px 0 6px}#plugin-sapwiki .label{text-transform:uppercase;font-size:12px;letter-spacing:.06em;color:var(--muted);margin:0}#plugin-sapwiki .toolbar,#plugin-sapwiki .actions{display:flex;gap:10px;align-items:center}#plugin-sapwiki button{padding:11px 16px;border-radius:12px;border:1px solid var(--primary-strong);background:var(--primary);color:#fff;font-weight:650;cursor:pointer;transition:transform .12s ease,box-shadow .16s ease,background .16s ease;box-shadow:0 8px 20px #0f52ba40}#plugin-sapwiki button:disabled{opacity:.6;cursor:not-allowed;box-shadow:none}#plugin-sapwiki button:hover:not(:disabled){transform:translateY(-1px);background:var(--primary-strong)}#plugin-sapwiki button.ghost{background:transparent;color:var(--primary-strong);border-color:var(--border);box-shadow:none}#plugin-sapwiki .hero button.ghost{color:#f8fafc;border-color:#ffffff47}#plugin-sapwiki .task-form{display:grid;gap:12px}#plugin-sapwiki .layout>.panel:first-child .task-form{display:flex;flex-direction:column;gap:12px;flex:0 0 auto}#plugin-sapwiki .layout>.panel:first-child .task-form .steps-field{display:flex;flex-direction:column;min-height:220px}#plugin-sapwiki .layout>.panel:first-child .task-form .steps-field textarea.steps-input{min-height:220px;resize:vertical}#plugin-sapwiki .layout>.panel:last-child .task-grid{flex:1 1 auto;overflow:auto}#plugin-sapwiki .task-card{display:flex;flex-direction:column;gap:12px;min-height:220px}#plugin-sapwiki .task-card .notes-field{display:flex;flex-direction:column}#plugin-sapwiki .task-card .notes-field textarea.notes-input{min-height:270px;resize:vertical}#plugin-sapwiki .field{display:flex;flex-direction:column;gap:6px}#plugin-sapwiki .two-col{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}#plugin-sapwiki label{font-weight:600;color:var(--text)}#plugin-sapwiki input,#plugin-sapwiki textarea{width:100%;border-radius:12px;border:1px solid var(--border);padding:12px 14px;font:inherit;background:#f8fafc;transition:border .12s ease,box-shadow .12s ease}#plugin-sapwiki input:focus,#plugin-sapwiki textarea:focus{border-color:var(--primary);box-shadow:0 0 0 4px #0f52ba1f;outline:none}#plugin-sapwiki textarea{resize:vertical;min-height:100px}#plugin-sapwiki .task-grid{display:grid;grid-template-columns:repeat(2,minmax(260px,1fr));gap:12px}#plugin-sapwiki .task-card h3{margin:4px 0 8px}#plugin-sapwiki .task-header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:8px}#plugin-sapwiki .tags{display:flex;flex-wrap:wrap;gap:6px}#plugin-sapwiki .tags .edit-tcodes-input{min-width:180px;max-width:420px;padding:8px 10px;border-radius:8px;border:1px solid var(--border);background:#fff;font:inherit}#plugin-sapwiki .tags .edit-actions{display:inline-flex;gap:8px;align-items:center}#plugin-sapwiki .tags button.small{padding:6px 8px;border-radius:8px;font-size:13px}#plugin-sapwiki .attach-field{border:2px dashed rgba(15,23,42,.08);background:linear-gradient(180deg,#f8fafc99,#f8fafc66);padding:12px;border-radius:12px;cursor:pointer}#plugin-sapwiki .attach-field.drag-over{border-color:#0f52ba99;box-shadow:0 6px 18px #0f52ba14}#plugin-sapwiki .attach-hint{color:var(--muted);padding:18px 10px}#plugin-sapwiki .attach-previews{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}#plugin-sapwiki .attach-preview{position:relative;width:96px;height:96px;border-radius:8px;overflow:hidden;border:1px solid var(--border);background:#fff}#plugin-sapwiki .attach-preview img{width:100%;height:100%;object-fit:cover;display:block}#plugin-sapwiki .attach-preview .remove{position:absolute;right:8px;top:8px;width:22px;height:22px;border-radius:50%;background:#ef4444;color:#fff;border:none;display:inline-flex;align-items:center;justify-content:center;font-size:14px;line-height:1;padding:0;cursor:pointer;box-shadow:0 2px 6px #0000001f}#plugin-sapwiki .attach-preview .remove:hover{background:#dc2626;transform:translateY(-1px)}#plugin-sapwiki .pill{background:#e2e8f0;border-radius:999px;padding:4px 10px;font-size:12px;color:var(--text);border:1px solid transparent}#plugin-sapwiki .preview{width:100%;max-height:220px;object-fit:contain;border-radius:10px;border:1px solid var(--border);background:#f8fafc}#plugin-sapwiki .preview.clickable{cursor:pointer}#plugin-sapwiki .pv-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#0009;z-index:9999;padding:clamp(12px,2.2vw,24px)}#plugin-sapwiki .pv-dialog{width:min(96vw,1400px);max-height:calc(100dvh - 32px);border-radius:16px;background:#04243a;color:#fff;border:1px solid rgba(255,255,255,.08);padding:16px;#plugin-sapwiki .pv-toolbar .pv-brush-group{margin:0 auto;display:flex;gap:8px;align-items:center}box-shadow:0 30px 60px #02102899;overflow:auto}#plugin-sapwiki .pv-header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}#plugin-sapwiki .pv-title{font-weight:700;color:#d1fae5}#plugin-sapwiki .pv-controls button{margin-left:8px}#plugin-sapwiki .pv-controls button.ghost{color:#fff;border-color:#ffffff0f}#plugin-sapwiki .pv-toolbar{position:relative;display:flex;gap:8px;align-items:center;margin-bottom:12px;--pv-toolbar-btn-h: 36px;justify-content:center}#plugin-sapwiki .pv-toolbar button,#plugin-sapwiki .pv-toolbar .primary,#plugin-sapwiki .pv-toolbar input[type=color]{height:var(--pv-toolbar-btn-h);min-height:var(--pv-toolbar-btn-h);display:inline-flex;align-items:center;justify-content:center;padding:0 12px;border-radius:10px}#plugin-sapwiki .pv-toolbar button{padding:0 12px}#plugin-sapwiki .pv-toolbar input[type=color]{width:var(--pv-toolbar-btn-h);padding:0;border-radius:8px}#plugin-sapwiki .pv-toolbar input[type=range]{height:28px;margin:0 8px;align-self:center;width:340px;max-width:40vw}#plugin-sapwiki .pv-toolbar .pv-brush-group{position:static;margin:0 12px;display:flex;gap:8px;align-items:center}#plugin-sapwiki .pv-toolbar input[type=color]{-webkit-appearance:none;-moz-appearance:none;appearance:none;width:36px;height:36px;padding:0;border-radius:8px;border:1px solid rgba(255,255,255,.12);background:transparent;cursor:pointer}#plugin-sapwiki .pv-toolbar input[type=color]::-webkit-color-swatch-wrapper{padding:0}#plugin-sapwiki .pv-toolbar input[type=color]::-webkit-color-swatch{border-radius:6px;border:none}#plugin-sapwiki .pv-toolbar input[type=color]::-moz-color-swatch{border-radius:6px;border:none}#plugin-sapwiki .pv-toolbar button.active{background:#22c55e29;color:#eafff0}#plugin-sapwiki .pv-toolbar .primary{background:#10b981;color:#fff}#plugin-sapwiki .pv-body{display:flex;justify-content:center}#plugin-sapwiki .pv-image-wrap{position:relative}#plugin-sapwiki .pv-image{display:block;max-width:min(90vw,1320px);max-height:72vh;border-radius:12px}#plugin-sapwiki .pv-canvas{position:absolute;left:0;top:0}#plugin-sapwiki .pv-canvas.disabled{pointer-events:none}#plugin-sapwiki .pv-canvas.draw{cursor:crosshair}#plugin-sapwiki .pv-canvas.erase{cursor:cell}@media (max-width: 860px){#plugin-sapwiki .pv-dialog{width:min(98vw,1400px);padding:12px;border-radius:12px}#plugin-sapwiki .pv-header{flex-direction:column;align-items:flex-start}#plugin-sapwiki .pv-controls{width:100%;display:flex;flex-wrap:wrap;gap:8px}#plugin-sapwiki .pv-controls button{margin-left:0}#plugin-sapwiki .pv-toolbar{flex-wrap:wrap}#plugin-sapwiki .pv-image{max-height:62vh}}#plugin-sapwiki .field.images .image-row{display:flex;gap:8px;flex-wrap:wrap;align-items:flex-start}#plugin-sapwiki .field.images .image-row .preview{width:140px;height:96px;max-height:none;object-fit:cover}#plugin-sapwiki .empty{text-align:left;padding:16px;border-style:dashed;border-color:var(--border);background:linear-gradient(135deg,#f8fafc,#eef2ff)}@media (max-width: 900px){#plugin-sapwiki .layout{display:grid;grid-template-columns:1fr}#plugin-sapwiki .task-grid{grid-template-columns:1fr}#plugin-sapwiki .hero{align-items:flex-start}#plugin-sapwiki .hero-actions{width:100%;flex-wrap:wrap}#plugin-sapwiki button,#plugin-sapwiki button.ghost{width:auto}}", la = "1.0.2", ca = {
  version: la
};
let ie = null, ke = null, X = null;
const da = (a) => {
  const e = a.querySelector(`#${Ae}`);
  if (e) return e;
  const t = document.createElement("div");
  return t.id = Ae, a.appendChild(t), t;
}, ua = () => {
  X || (X = document.createElement("style"), X.id = `${Ae}-style`, X.textContent = oa, document.head.appendChild(X));
}, ha = {
  id: ft,
  name: "SAPWiki",
  version: ca?.version,
  mount(a, e) {
    ua();
    const t = da(a);
    ke = t, ie && ie.unmount(), ie = yt(t), ie.render(
      /* @__PURE__ */ l.createElement(l.StrictMode, null, /* @__PURE__ */ l.createElement(ia, { context: e }))
    );
  },
  unmount(a) {
    ie && (ie.unmount(), ie = null), ke && (ke.replaceChildren(), ke = null);
    const e = a.querySelector(`#${Ae}`);
    e && e.replaceChildren(), X && (X.remove(), X = null);
  }
};
export {
  ha as default
};
//# sourceMappingURL=plugin.js.map
