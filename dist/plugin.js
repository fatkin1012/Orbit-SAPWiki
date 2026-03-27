import c, { useState as Z, useRef as je, useEffect as oe, useCallback as Q, useMemo as Ue } from "react";
import { createRoot as Be } from "react-dom/client";
const qe = ({ onSubmit: a }) => {
  const [e, t] = Z(""), [r, s] = Z(""), [n, i] = Z(""), [o, u] = Z(""), [h, y] = Z(""), [b, E] = Z(), C = (k) => {
    const O = k.target.files?.[0];
    if (!O) return;
    const I = new FileReader();
    I.onload = () => {
      E(typeof I.result == "string" ? I.result : void 0);
    }, I.readAsDataURL(O);
  }, N = (k) => {
    k.preventDefault();
    const O = e.trim();
    if (!O) return;
    const I = n.split(",").map((ze) => ze.trim()).filter(Boolean);
    a({
      title: O,
      tCode: r.trim(),
      tCodes: I,
      requirement: o,
      steps: h,
      imageData: b
    }), t(""), s(""), i(""), u(""), y(""), E(void 0);
  };
  return /* @__PURE__ */ c.createElement("form", { className: "task-form", onSubmit: N }, /* @__PURE__ */ c.createElement("div", { className: "field" }, /* @__PURE__ */ c.createElement("label", null, "Title"), /* @__PURE__ */ c.createElement("input", { value: e, onChange: (k) => t(k.target.value), placeholder: "Case title" })), /* @__PURE__ */ c.createElement("div", { className: "field two-col" }, /* @__PURE__ */ c.createElement("div", null, /* @__PURE__ */ c.createElement("label", null, "T-Code"), /* @__PURE__ */ c.createElement("input", { value: r, onChange: (k) => s(k.target.value), placeholder: "e.g. ZSE16" })), /* @__PURE__ */ c.createElement("div", null, /* @__PURE__ */ c.createElement("label", null, "T-Codes (comma)"), /* @__PURE__ */ c.createElement(
    "input",
    {
      value: n,
      onChange: (k) => i(k.target.value),
      placeholder: "SE16, MM03"
    }
  ))), /* @__PURE__ */ c.createElement("div", { className: "field" }, /* @__PURE__ */ c.createElement("label", null, "Requirement"), /* @__PURE__ */ c.createElement("textarea", { value: o, onChange: (k) => u(k.target.value), placeholder: "What are we solving?" })), /* @__PURE__ */ c.createElement("div", { className: "field" }, /* @__PURE__ */ c.createElement("label", null, "Steps"), /* @__PURE__ */ c.createElement(
    "textarea",
    {
      value: h,
      onChange: (k) => y(k.target.value),
      placeholder: "Step-by-step or reminders",
      rows: 4
    }
  )), /* @__PURE__ */ c.createElement("div", { className: "field" }, /* @__PURE__ */ c.createElement("label", null, "Attach screenshot / diagram"), /* @__PURE__ */ c.createElement("input", { type: "file", accept: "image/*", onChange: C }), b ? /* @__PURE__ */ c.createElement("small", null, "Image attached (", Math.round(b.length * 3 / 4 / 1024), " KB)") : null), /* @__PURE__ */ c.createElement("div", { className: "actions" }, /* @__PURE__ */ c.createElement("button", { type: "submit" }, "Save task")));
}, Fe = ({ tasks: a, onDelete: e, onUpdate: t }) => a.length ? /* @__PURE__ */ c.createElement("div", { className: "task-grid" }, a.map((r) => /* @__PURE__ */ c.createElement("article", { className: "card task-card", key: r.id }, /* @__PURE__ */ c.createElement("header", { className: "task-header" }, /* @__PURE__ */ c.createElement("div", null, /* @__PURE__ */ c.createElement("div", { className: "eyebrow" }, new Date(r.createdAt).toLocaleString()), /* @__PURE__ */ c.createElement("h3", null, r.title), /* @__PURE__ */ c.createElement("div", { className: "tags" }, r.tCode ? /* @__PURE__ */ c.createElement("span", { className: "pill" }, r.tCode) : null, r.tCodes?.map((s) => /* @__PURE__ */ c.createElement("span", { key: `${r.id}-${s}`, className: "pill" }, s)))), /* @__PURE__ */ c.createElement("button", { className: "ghost", onClick: () => e(r.id) }, "Delete")), /* @__PURE__ */ c.createElement("div", { className: "field" }, /* @__PURE__ */ c.createElement("label", null, "Requirement"), /* @__PURE__ */ c.createElement(
  "textarea",
  {
    defaultValue: r.requirement,
    onBlur: (s) => t(r.id, { requirement: s.target.value }),
    rows: 3
  }
)), /* @__PURE__ */ c.createElement("div", { className: "field" }, /* @__PURE__ */ c.createElement("label", null, "Steps"), /* @__PURE__ */ c.createElement(
  "textarea",
  {
    defaultValue: r.steps,
    onBlur: (s) => t(r.id, { steps: s.target.value }),
    rows: 4
  }
)), r.imageData ? /* @__PURE__ */ c.createElement("div", { className: "field" }, /* @__PURE__ */ c.createElement("label", null, "Image"), /* @__PURE__ */ c.createElement("img", { src: r.imageData, alt: r.title, className: "preview" })) : null))) : /* @__PURE__ */ c.createElement("div", { className: "empty card" }, /* @__PURE__ */ c.createElement("h3", null, "No tasks yet"), /* @__PURE__ */ c.createElement("p", { className: "muted" }, "Add a new entry or import from your legacy backup."));
var x;
(function(a) {
  a.assertEqual = (s) => {
  };
  function e(s) {
  }
  a.assertIs = e;
  function t(s) {
    throw new Error();
  }
  a.assertNever = t, a.arrayToEnum = (s) => {
    const n = {};
    for (const i of s)
      n[i] = i;
    return n;
  }, a.getValidEnumValues = (s) => {
    const n = a.objectKeys(s).filter((o) => typeof s[s[o]] != "number"), i = {};
    for (const o of n)
      i[o] = s[o];
    return a.objectValues(i);
  }, a.objectValues = (s) => a.objectKeys(s).map(function(n) {
    return s[n];
  }), a.objectKeys = typeof Object.keys == "function" ? (s) => Object.keys(s) : (s) => {
    const n = [];
    for (const i in s)
      Object.prototype.hasOwnProperty.call(s, i) && n.push(i);
    return n;
  }, a.find = (s, n) => {
    for (const i of s)
      if (n(i))
        return i;
  }, a.isInteger = typeof Number.isInteger == "function" ? (s) => Number.isInteger(s) : (s) => typeof s == "number" && Number.isFinite(s) && Math.floor(s) === s;
  function r(s, n = " | ") {
    return s.map((i) => typeof i == "string" ? `'${i}'` : i).join(n);
  }
  a.joinValues = r, a.jsonStringifyReplacer = (s, n) => typeof n == "bigint" ? n.toString() : n;
})(x || (x = {}));
var ge;
(function(a) {
  a.mergeShapes = (e, t) => ({
    ...e,
    ...t
    // second overwrites first
  });
})(ge || (ge = {}));
const f = x.arrayToEnum([
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
]), j = (a) => {
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
}, d = x.arrayToEnum([
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
class R extends Error {
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
    const t = e || function(n) {
      return n.message;
    }, r = { _errors: [] }, s = (n) => {
      for (const i of n.issues)
        if (i.code === "invalid_union")
          i.unionErrors.map(s);
        else if (i.code === "invalid_return_type")
          s(i.returnTypeError);
        else if (i.code === "invalid_arguments")
          s(i.argumentsError);
        else if (i.path.length === 0)
          r._errors.push(t(i));
        else {
          let o = r, u = 0;
          for (; u < i.path.length; ) {
            const h = i.path[u];
            u === i.path.length - 1 ? (o[h] = o[h] || { _errors: [] }, o[h]._errors.push(t(i))) : o[h] = o[h] || { _errors: [] }, o = o[h], u++;
          }
        }
    };
    return s(this), r;
  }
  static assert(e) {
    if (!(e instanceof R))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, x.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (t) => t.message) {
    const t = {}, r = [];
    for (const s of this.issues)
      if (s.path.length > 0) {
        const n = s.path[0];
        t[n] = t[n] || [], t[n].push(e(s));
      } else
        r.push(e(s));
    return { formErrors: r, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
R.create = (a) => new R(a);
const de = (a, e) => {
  let t;
  switch (a.code) {
    case d.invalid_type:
      a.received === f.undefined ? t = "Required" : t = `Expected ${a.expected}, received ${a.received}`;
      break;
    case d.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(a.expected, x.jsonStringifyReplacer)}`;
      break;
    case d.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${x.joinValues(a.keys, ", ")}`;
      break;
    case d.invalid_union:
      t = "Invalid input";
      break;
    case d.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${x.joinValues(a.options)}`;
      break;
    case d.invalid_enum_value:
      t = `Invalid enum value. Expected ${x.joinValues(a.options)}, received '${a.received}'`;
      break;
    case d.invalid_arguments:
      t = "Invalid function arguments";
      break;
    case d.invalid_return_type:
      t = "Invalid function return type";
      break;
    case d.invalid_date:
      t = "Invalid date";
      break;
    case d.invalid_string:
      typeof a.validation == "object" ? "includes" in a.validation ? (t = `Invalid input: must include "${a.validation.includes}"`, typeof a.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${a.validation.position}`)) : "startsWith" in a.validation ? t = `Invalid input: must start with "${a.validation.startsWith}"` : "endsWith" in a.validation ? t = `Invalid input: must end with "${a.validation.endsWith}"` : x.assertNever(a.validation) : a.validation !== "regex" ? t = `Invalid ${a.validation}` : t = "Invalid";
      break;
    case d.too_small:
      a.type === "array" ? t = `Array must contain ${a.exact ? "exactly" : a.inclusive ? "at least" : "more than"} ${a.minimum} element(s)` : a.type === "string" ? t = `String must contain ${a.exact ? "exactly" : a.inclusive ? "at least" : "over"} ${a.minimum} character(s)` : a.type === "number" ? t = `Number must be ${a.exact ? "exactly equal to " : a.inclusive ? "greater than or equal to " : "greater than "}${a.minimum}` : a.type === "bigint" ? t = `Number must be ${a.exact ? "exactly equal to " : a.inclusive ? "greater than or equal to " : "greater than "}${a.minimum}` : a.type === "date" ? t = `Date must be ${a.exact ? "exactly equal to " : a.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(a.minimum))}` : t = "Invalid input";
      break;
    case d.too_big:
      a.type === "array" ? t = `Array must contain ${a.exact ? "exactly" : a.inclusive ? "at most" : "less than"} ${a.maximum} element(s)` : a.type === "string" ? t = `String must contain ${a.exact ? "exactly" : a.inclusive ? "at most" : "under"} ${a.maximum} character(s)` : a.type === "number" ? t = `Number must be ${a.exact ? "exactly" : a.inclusive ? "less than or equal to" : "less than"} ${a.maximum}` : a.type === "bigint" ? t = `BigInt must be ${a.exact ? "exactly" : a.inclusive ? "less than or equal to" : "less than"} ${a.maximum}` : a.type === "date" ? t = `Date must be ${a.exact ? "exactly" : a.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(a.maximum))}` : t = "Invalid input";
      break;
    case d.custom:
      t = "Invalid input";
      break;
    case d.invalid_intersection_types:
      t = "Intersection results could not be merged";
      break;
    case d.not_multiple_of:
      t = `Number must be a multiple of ${a.multipleOf}`;
      break;
    case d.not_finite:
      t = "Number must be finite";
      break;
    default:
      t = e.defaultError, x.assertNever(a);
  }
  return { message: t };
};
let We = de;
function Je() {
  return We;
}
const Ge = (a) => {
  const { data: e, path: t, errorMaps: r, issueData: s } = a, n = [...t, ...s.path || []], i = {
    ...s,
    path: n
  };
  if (s.message !== void 0)
    return {
      ...s,
      path: n,
      message: s.message
    };
  let o = "";
  const u = r.filter((h) => !!h).slice().reverse();
  for (const h of u)
    o = h(i, { data: e, defaultError: o }).message;
  return {
    ...s,
    path: n,
    message: o
  };
};
function l(a, e) {
  const t = Je(), r = Ge({
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
      t === de ? void 0 : de
      // then global default map
    ].filter((s) => !!s)
  });
  a.common.issues.push(r);
}
class T {
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
    for (const s of t) {
      if (s.status === "aborted")
        return m;
      s.status === "dirty" && e.dirty(), r.push(s.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, t) {
    const r = [];
    for (const s of t) {
      const n = await s.key, i = await s.value;
      r.push({
        key: n,
        value: i
      });
    }
    return T.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, t) {
    const r = {};
    for (const s of t) {
      const { key: n, value: i } = s;
      if (n.status === "aborted" || i.status === "aborted")
        return m;
      n.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), n.value !== "__proto__" && (typeof i.value < "u" || s.alwaysSet) && (r[n.value] = i.value);
    }
    return { status: e.value, value: r };
  }
}
const m = Object.freeze({
  status: "aborted"
}), H = (a) => ({ status: "dirty", value: a }), S = (a) => ({ status: "valid", value: a }), ye = (a) => a.status === "aborted", ve = (a) => a.status === "dirty", q = (a) => a.status === "valid", ee = (a) => typeof Promise < "u" && a instanceof Promise;
var p;
(function(a) {
  a.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, a.toString = (e) => typeof e == "string" ? e : e?.message;
})(p || (p = {}));
class L {
  constructor(e, t, r, s) {
    this._cachedPath = [], this.parent = e, this.data = t, this._path = r, this._key = s;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const _e = (a, e) => {
  if (q(e))
    return { success: !0, data: e.value };
  if (!a.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const t = new R(a.common.issues);
      return this._error = t, this._error;
    }
  };
};
function v(a) {
  if (!a)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: r, description: s } = a;
  if (e && (t || r))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: s } : { errorMap: (i, o) => {
    const { message: u } = a;
    return i.code === "invalid_enum_value" ? { message: u ?? o.defaultError } : typeof o.data > "u" ? { message: u ?? r ?? o.defaultError } : i.code !== "invalid_type" ? { message: o.defaultError } : { message: u ?? t ?? o.defaultError };
  }, description: s };
}
class _ {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return j(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: j(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new T(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: j(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (ee(t))
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
      parsedType: j(e)
    }, s = this._parseSync({ data: e, path: r.path, parent: r });
    return _e(r, s);
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
      parsedType: j(e)
    };
    if (!this["~standard"].async)
      try {
        const r = this._parseSync({ data: e, path: [], parent: t });
        return q(r) ? {
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
    return this._parseAsync({ data: e, path: [], parent: t }).then((r) => q(r) ? {
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
      parsedType: j(e)
    }, s = this._parse({ data: e, path: r.path, parent: r }), n = await (ee(s) ? s : Promise.resolve(s));
    return _e(r, n);
  }
  refine(e, t) {
    const r = (s) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(s) : t;
    return this._refinement((s, n) => {
      const i = e(s), o = () => n.addIssue({
        code: d.custom,
        ...r(s)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((u) => u ? !0 : (o(), !1)) : i ? !0 : (o(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((r, s) => e(r) ? !0 : (s.addIssue(typeof t == "function" ? t(r, s) : t), !1));
  }
  _refinement(e) {
    return new J({
      schema: this,
      typeName: g.ZodEffects,
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
    return D.create(this, this._def);
  }
  nullable() {
    return G.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return A.create(this);
  }
  promise() {
    return se.create(this, this._def);
  }
  or(e) {
    return ae.create([this, e], this._def);
  }
  and(e) {
    return re.create(this, e, this._def);
  }
  transform(e) {
    return new J({
      ...v(this._def),
      schema: this,
      typeName: g.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new le({
      ...v(this._def),
      innerType: this,
      defaultValue: t,
      typeName: g.ZodDefault
    });
  }
  brand() {
    return new yt({
      typeName: g.ZodBranded,
      type: this,
      ...v(this._def)
    });
  }
  catch(e) {
    const t = typeof e == "function" ? e : () => e;
    return new ue({
      ...v(this._def),
      innerType: this,
      catchValue: t,
      typeName: g.ZodCatch
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
    return pe.create(this, e);
  }
  readonly() {
    return fe.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const He = /^c[^\s-]{8,}$/i, Ye = /^[0-9a-z]+$/, Ke = /^[0-9A-HJKMNP-TV-Z]{26}$/i, Qe = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, Xe = /^[a-z0-9_-]{21}$/i, et = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, tt = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, at = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, rt = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let ie;
const st = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, nt = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, it = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, ot = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, dt = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, ct = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, $e = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", lt = new RegExp(`^${$e}$`);
function Pe(a) {
  let e = "[0-5]\\d";
  a.precision ? e = `${e}\\.\\d{${a.precision}}` : a.precision == null && (e = `${e}(\\.\\d+)?`);
  const t = a.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${t}`;
}
function ut(a) {
  return new RegExp(`^${Pe(a)}$`);
}
function ft(a) {
  let e = `${$e}T${Pe(a)}`;
  const t = [];
  return t.push(a.local ? "Z?" : "Z"), a.offset && t.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${t.join("|")})`, new RegExp(`^${e}$`);
}
function ht(a, e) {
  return !!((e === "v4" || !e) && st.test(a) || (e === "v6" || !e) && it.test(a));
}
function pt(a, e) {
  if (!et.test(a))
    return !1;
  try {
    const [t] = a.split(".");
    if (!t)
      return !1;
    const r = t.replace(/-/g, "+").replace(/_/g, "/").padEnd(t.length + (4 - t.length % 4) % 4, "="), s = JSON.parse(atob(r));
    return !(typeof s != "object" || s === null || "typ" in s && s?.typ !== "JWT" || !s.alg || e && s.alg !== e);
  } catch {
    return !1;
  }
}
function mt(a, e) {
  return !!((e === "v4" || !e) && nt.test(a) || (e === "v6" || !e) && ot.test(a));
}
class P extends _ {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== f.string) {
      const n = this._getOrReturnCtx(e);
      return l(n, {
        code: d.invalid_type,
        expected: f.string,
        received: n.parsedType
      }), m;
    }
    const r = new T();
    let s;
    for (const n of this._def.checks)
      if (n.kind === "min")
        e.data.length < n.value && (s = this._getOrReturnCtx(e, s), l(s, {
          code: d.too_small,
          minimum: n.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: n.message
        }), r.dirty());
      else if (n.kind === "max")
        e.data.length > n.value && (s = this._getOrReturnCtx(e, s), l(s, {
          code: d.too_big,
          maximum: n.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: n.message
        }), r.dirty());
      else if (n.kind === "length") {
        const i = e.data.length > n.value, o = e.data.length < n.value;
        (i || o) && (s = this._getOrReturnCtx(e, s), i ? l(s, {
          code: d.too_big,
          maximum: n.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: n.message
        }) : o && l(s, {
          code: d.too_small,
          minimum: n.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: n.message
        }), r.dirty());
      } else if (n.kind === "email")
        at.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          validation: "email",
          code: d.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "emoji")
        ie || (ie = new RegExp(rt, "u")), ie.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          validation: "emoji",
          code: d.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "uuid")
        Qe.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          validation: "uuid",
          code: d.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "nanoid")
        Xe.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          validation: "nanoid",
          code: d.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "cuid")
        He.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          validation: "cuid",
          code: d.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "cuid2")
        Ye.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          validation: "cuid2",
          code: d.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "ulid")
        Ke.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          validation: "ulid",
          code: d.invalid_string,
          message: n.message
        }), r.dirty());
      else if (n.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), l(s, {
            validation: "url",
            code: d.invalid_string,
            message: n.message
          }), r.dirty();
        }
      else n.kind === "regex" ? (n.regex.lastIndex = 0, n.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
        validation: "regex",
        code: d.invalid_string,
        message: n.message
      }), r.dirty())) : n.kind === "trim" ? e.data = e.data.trim() : n.kind === "includes" ? e.data.includes(n.value, n.position) || (s = this._getOrReturnCtx(e, s), l(s, {
        code: d.invalid_string,
        validation: { includes: n.value, position: n.position },
        message: n.message
      }), r.dirty()) : n.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : n.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : n.kind === "startsWith" ? e.data.startsWith(n.value) || (s = this._getOrReturnCtx(e, s), l(s, {
        code: d.invalid_string,
        validation: { startsWith: n.value },
        message: n.message
      }), r.dirty()) : n.kind === "endsWith" ? e.data.endsWith(n.value) || (s = this._getOrReturnCtx(e, s), l(s, {
        code: d.invalid_string,
        validation: { endsWith: n.value },
        message: n.message
      }), r.dirty()) : n.kind === "datetime" ? ft(n).test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
        code: d.invalid_string,
        validation: "datetime",
        message: n.message
      }), r.dirty()) : n.kind === "date" ? lt.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
        code: d.invalid_string,
        validation: "date",
        message: n.message
      }), r.dirty()) : n.kind === "time" ? ut(n).test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
        code: d.invalid_string,
        validation: "time",
        message: n.message
      }), r.dirty()) : n.kind === "duration" ? tt.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
        validation: "duration",
        code: d.invalid_string,
        message: n.message
      }), r.dirty()) : n.kind === "ip" ? ht(e.data, n.version) || (s = this._getOrReturnCtx(e, s), l(s, {
        validation: "ip",
        code: d.invalid_string,
        message: n.message
      }), r.dirty()) : n.kind === "jwt" ? pt(e.data, n.alg) || (s = this._getOrReturnCtx(e, s), l(s, {
        validation: "jwt",
        code: d.invalid_string,
        message: n.message
      }), r.dirty()) : n.kind === "cidr" ? mt(e.data, n.version) || (s = this._getOrReturnCtx(e, s), l(s, {
        validation: "cidr",
        code: d.invalid_string,
        message: n.message
      }), r.dirty()) : n.kind === "base64" ? dt.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
        validation: "base64",
        code: d.invalid_string,
        message: n.message
      }), r.dirty()) : n.kind === "base64url" ? ct.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
        validation: "base64url",
        code: d.invalid_string,
        message: n.message
      }), r.dirty()) : x.assertNever(n);
    return { status: r.value, value: e.data };
  }
  _regex(e, t, r) {
    return this.refinement((s) => e.test(s), {
      validation: t,
      code: d.invalid_string,
      ...p.errToObj(r)
    });
  }
  _addCheck(e) {
    return new P({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...p.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...p.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...p.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...p.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...p.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...p.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...p.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...p.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...p.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...p.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...p.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...p.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...p.errToObj(e) });
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
      ...p.errToObj(e?.message)
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
      ...p.errToObj(e?.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...p.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...p.errToObj(t)
    });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t?.position,
      ...p.errToObj(t?.message)
    });
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...p.errToObj(t)
    });
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...p.errToObj(t)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...p.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...p.errToObj(t)
    });
  }
  length(e, t) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...p.errToObj(t)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, p.errToObj(e));
  }
  trim() {
    return new P({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new P({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new P({
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
P.create = (a) => new P({
  checks: [],
  typeName: g.ZodString,
  coerce: a?.coerce ?? !1,
  ...v(a)
});
function gt(a, e) {
  const t = (a.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, s = t > r ? t : r, n = Number.parseInt(a.toFixed(s).replace(".", "")), i = Number.parseInt(e.toFixed(s).replace(".", ""));
  return n % i / 10 ** s;
}
class F extends _ {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== f.number) {
      const n = this._getOrReturnCtx(e);
      return l(n, {
        code: d.invalid_type,
        expected: f.number,
        received: n.parsedType
      }), m;
    }
    let r;
    const s = new T();
    for (const n of this._def.checks)
      n.kind === "int" ? x.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), l(r, {
        code: d.invalid_type,
        expected: "integer",
        received: "float",
        message: n.message
      }), s.dirty()) : n.kind === "min" ? (n.inclusive ? e.data < n.value : e.data <= n.value) && (r = this._getOrReturnCtx(e, r), l(r, {
        code: d.too_small,
        minimum: n.value,
        type: "number",
        inclusive: n.inclusive,
        exact: !1,
        message: n.message
      }), s.dirty()) : n.kind === "max" ? (n.inclusive ? e.data > n.value : e.data >= n.value) && (r = this._getOrReturnCtx(e, r), l(r, {
        code: d.too_big,
        maximum: n.value,
        type: "number",
        inclusive: n.inclusive,
        exact: !1,
        message: n.message
      }), s.dirty()) : n.kind === "multipleOf" ? gt(e.data, n.value) !== 0 && (r = this._getOrReturnCtx(e, r), l(r, {
        code: d.not_multiple_of,
        multipleOf: n.value,
        message: n.message
      }), s.dirty()) : n.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), l(r, {
        code: d.not_finite,
        message: n.message
      }), s.dirty()) : x.assertNever(n);
    return { status: s.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, p.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, p.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, p.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, p.toString(t));
  }
  setLimit(e, t, r, s) {
    return new F({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: r,
          message: p.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new F({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: p.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: p.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: p.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: p.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: p.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: p.toString(t)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: p.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: p.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: p.toString(e)
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
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && x.isInteger(e.value));
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
F.create = (a) => new F({
  checks: [],
  typeName: g.ZodNumber,
  coerce: a?.coerce || !1,
  ...v(a)
});
class Y extends _ {
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
    const s = new T();
    for (const n of this._def.checks)
      n.kind === "min" ? (n.inclusive ? e.data < n.value : e.data <= n.value) && (r = this._getOrReturnCtx(e, r), l(r, {
        code: d.too_small,
        type: "bigint",
        minimum: n.value,
        inclusive: n.inclusive,
        message: n.message
      }), s.dirty()) : n.kind === "max" ? (n.inclusive ? e.data > n.value : e.data >= n.value) && (r = this._getOrReturnCtx(e, r), l(r, {
        code: d.too_big,
        type: "bigint",
        maximum: n.value,
        inclusive: n.inclusive,
        message: n.message
      }), s.dirty()) : n.kind === "multipleOf" ? e.data % n.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), l(r, {
        code: d.not_multiple_of,
        multipleOf: n.value,
        message: n.message
      }), s.dirty()) : x.assertNever(n);
    return { status: s.value, value: e.data };
  }
  _getInvalidInput(e) {
    const t = this._getOrReturnCtx(e);
    return l(t, {
      code: d.invalid_type,
      expected: f.bigint,
      received: t.parsedType
    }), m;
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, p.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, p.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, p.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, p.toString(t));
  }
  setLimit(e, t, r, s) {
    return new Y({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: r,
          message: p.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Y({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: p.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: p.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: p.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: p.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: p.toString(t)
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
Y.create = (a) => new Y({
  checks: [],
  typeName: g.ZodBigInt,
  coerce: a?.coerce ?? !1,
  ...v(a)
});
class xe extends _ {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== f.boolean) {
      const r = this._getOrReturnCtx(e);
      return l(r, {
        code: d.invalid_type,
        expected: f.boolean,
        received: r.parsedType
      }), m;
    }
    return S(e.data);
  }
}
xe.create = (a) => new xe({
  typeName: g.ZodBoolean,
  coerce: a?.coerce || !1,
  ...v(a)
});
class te extends _ {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== f.date) {
      const n = this._getOrReturnCtx(e);
      return l(n, {
        code: d.invalid_type,
        expected: f.date,
        received: n.parsedType
      }), m;
    }
    if (Number.isNaN(e.data.getTime())) {
      const n = this._getOrReturnCtx(e);
      return l(n, {
        code: d.invalid_date
      }), m;
    }
    const r = new T();
    let s;
    for (const n of this._def.checks)
      n.kind === "min" ? e.data.getTime() < n.value && (s = this._getOrReturnCtx(e, s), l(s, {
        code: d.too_small,
        message: n.message,
        inclusive: !0,
        exact: !1,
        minimum: n.value,
        type: "date"
      }), r.dirty()) : n.kind === "max" ? e.data.getTime() > n.value && (s = this._getOrReturnCtx(e, s), l(s, {
        code: d.too_big,
        message: n.message,
        inclusive: !0,
        exact: !1,
        maximum: n.value,
        type: "date"
      }), r.dirty()) : x.assertNever(n);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new te({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: p.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: p.toString(t)
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
te.create = (a) => new te({
  checks: [],
  coerce: a?.coerce || !1,
  typeName: g.ZodDate,
  ...v(a)
});
class ke extends _ {
  _parse(e) {
    if (this._getType(e) !== f.symbol) {
      const r = this._getOrReturnCtx(e);
      return l(r, {
        code: d.invalid_type,
        expected: f.symbol,
        received: r.parsedType
      }), m;
    }
    return S(e.data);
  }
}
ke.create = (a) => new ke({
  typeName: g.ZodSymbol,
  ...v(a)
});
class be extends _ {
  _parse(e) {
    if (this._getType(e) !== f.undefined) {
      const r = this._getOrReturnCtx(e);
      return l(r, {
        code: d.invalid_type,
        expected: f.undefined,
        received: r.parsedType
      }), m;
    }
    return S(e.data);
  }
}
be.create = (a) => new be({
  typeName: g.ZodUndefined,
  ...v(a)
});
class we extends _ {
  _parse(e) {
    if (this._getType(e) !== f.null) {
      const r = this._getOrReturnCtx(e);
      return l(r, {
        code: d.invalid_type,
        expected: f.null,
        received: r.parsedType
      }), m;
    }
    return S(e.data);
  }
}
we.create = (a) => new we({
  typeName: g.ZodNull,
  ...v(a)
});
class Ee extends _ {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return S(e.data);
  }
}
Ee.create = (a) => new Ee({
  typeName: g.ZodAny,
  ...v(a)
});
class Ce extends _ {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return S(e.data);
  }
}
Ce.create = (a) => new Ce({
  typeName: g.ZodUnknown,
  ...v(a)
});
class V extends _ {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return l(t, {
      code: d.invalid_type,
      expected: f.never,
      received: t.parsedType
    }), m;
  }
}
V.create = (a) => new V({
  typeName: g.ZodNever,
  ...v(a)
});
class Ne extends _ {
  _parse(e) {
    if (this._getType(e) !== f.undefined) {
      const r = this._getOrReturnCtx(e);
      return l(r, {
        code: d.invalid_type,
        expected: f.void,
        received: r.parsedType
      }), m;
    }
    return S(e.data);
  }
}
Ne.create = (a) => new Ne({
  typeName: g.ZodVoid,
  ...v(a)
});
class A extends _ {
  _parse(e) {
    const { ctx: t, status: r } = this._processInputParams(e), s = this._def;
    if (t.parsedType !== f.array)
      return l(t, {
        code: d.invalid_type,
        expected: f.array,
        received: t.parsedType
      }), m;
    if (s.exactLength !== null) {
      const i = t.data.length > s.exactLength.value, o = t.data.length < s.exactLength.value;
      (i || o) && (l(t, {
        code: i ? d.too_big : d.too_small,
        minimum: o ? s.exactLength.value : void 0,
        maximum: i ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), r.dirty());
    }
    if (s.minLength !== null && t.data.length < s.minLength.value && (l(t, {
      code: d.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), r.dirty()), s.maxLength !== null && t.data.length > s.maxLength.value && (l(t, {
      code: d.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), r.dirty()), t.common.async)
      return Promise.all([...t.data].map((i, o) => s.type._parseAsync(new L(t, i, t.path, o)))).then((i) => T.mergeArray(r, i));
    const n = [...t.data].map((i, o) => s.type._parseSync(new L(t, i, t.path, o)));
    return T.mergeArray(r, n);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new A({
      ...this._def,
      minLength: { value: e, message: p.toString(t) }
    });
  }
  max(e, t) {
    return new A({
      ...this._def,
      maxLength: { value: e, message: p.toString(t) }
    });
  }
  length(e, t) {
    return new A({
      ...this._def,
      exactLength: { value: e, message: p.toString(t) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
A.create = (a, e) => new A({
  type: a,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: g.ZodArray,
  ...v(e)
});
function B(a) {
  if (a instanceof w) {
    const e = {};
    for (const t in a.shape) {
      const r = a.shape[t];
      e[t] = D.create(B(r));
    }
    return new w({
      ...a._def,
      shape: () => e
    });
  } else return a instanceof A ? new A({
    ...a._def,
    type: B(a.element)
  }) : a instanceof D ? D.create(B(a.unwrap())) : a instanceof G ? G.create(B(a.unwrap())) : a instanceof U ? U.create(a.items.map((e) => B(e))) : a;
}
class w extends _ {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), t = x.objectKeys(e);
    return this._cached = { shape: e, keys: t }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== f.object) {
      const h = this._getOrReturnCtx(e);
      return l(h, {
        code: d.invalid_type,
        expected: f.object,
        received: h.parsedType
      }), m;
    }
    const { status: r, ctx: s } = this._processInputParams(e), { shape: n, keys: i } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof V && this._def.unknownKeys === "strip"))
      for (const h in s.data)
        i.includes(h) || o.push(h);
    const u = [];
    for (const h of i) {
      const y = n[h], b = s.data[h];
      u.push({
        key: { status: "valid", value: h },
        value: y._parse(new L(s, b, s.path, h)),
        alwaysSet: h in s.data
      });
    }
    if (this._def.catchall instanceof V) {
      const h = this._def.unknownKeys;
      if (h === "passthrough")
        for (const y of o)
          u.push({
            key: { status: "valid", value: y },
            value: { status: "valid", value: s.data[y] }
          });
      else if (h === "strict")
        o.length > 0 && (l(s, {
          code: d.unrecognized_keys,
          keys: o
        }), r.dirty());
      else if (h !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const h = this._def.catchall;
      for (const y of o) {
        const b = s.data[y];
        u.push({
          key: { status: "valid", value: y },
          value: h._parse(
            new L(s, b, s.path, y)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: y in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const h = [];
      for (const y of u) {
        const b = await y.key, E = await y.value;
        h.push({
          key: b,
          value: E,
          alwaysSet: y.alwaysSet
        });
      }
      return h;
    }).then((h) => T.mergeObjectSync(r, h)) : T.mergeObjectSync(r, u);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return p.errToObj, new w({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, r) => {
          const s = this._def.errorMap?.(t, r).message ?? r.defaultError;
          return t.code === "unrecognized_keys" ? {
            message: p.errToObj(e).message ?? s
          } : {
            message: s
          };
        }
      } : {}
    });
  }
  strip() {
    return new w({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new w({
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
    return new w({
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
    return new w({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: g.ZodObject
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
    return new w({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const t = {};
    for (const r of x.objectKeys(e))
      e[r] && this.shape[r] && (t[r] = this.shape[r]);
    return new w({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    for (const r of x.objectKeys(this.shape))
      e[r] || (t[r] = this.shape[r]);
    return new w({
      ...this._def,
      shape: () => t
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return B(this);
  }
  partial(e) {
    const t = {};
    for (const r of x.objectKeys(this.shape)) {
      const s = this.shape[r];
      e && !e[r] ? t[r] = s : t[r] = s.optional();
    }
    return new w({
      ...this._def,
      shape: () => t
    });
  }
  required(e) {
    const t = {};
    for (const r of x.objectKeys(this.shape))
      if (e && !e[r])
        t[r] = this.shape[r];
      else {
        let n = this.shape[r];
        for (; n instanceof D; )
          n = n._def.innerType;
        t[r] = n;
      }
    return new w({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return De(x.objectKeys(this.shape));
  }
}
w.create = (a, e) => new w({
  shape: () => a,
  unknownKeys: "strip",
  catchall: V.create(),
  typeName: g.ZodObject,
  ...v(e)
});
w.strictCreate = (a, e) => new w({
  shape: () => a,
  unknownKeys: "strict",
  catchall: V.create(),
  typeName: g.ZodObject,
  ...v(e)
});
w.lazycreate = (a, e) => new w({
  shape: a,
  unknownKeys: "strip",
  catchall: V.create(),
  typeName: g.ZodObject,
  ...v(e)
});
class ae extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = this._def.options;
    function s(n) {
      for (const o of n)
        if (o.result.status === "valid")
          return o.result;
      for (const o of n)
        if (o.result.status === "dirty")
          return t.common.issues.push(...o.ctx.common.issues), o.result;
      const i = n.map((o) => new R(o.ctx.common.issues));
      return l(t, {
        code: d.invalid_union,
        unionErrors: i
      }), m;
    }
    if (t.common.async)
      return Promise.all(r.map(async (n) => {
        const i = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await n._parseAsync({
            data: t.data,
            path: t.path,
            parent: i
          }),
          ctx: i
        };
      })).then(s);
    {
      let n;
      const i = [];
      for (const u of r) {
        const h = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, y = u._parseSync({
          data: t.data,
          path: t.path,
          parent: h
        });
        if (y.status === "valid")
          return y;
        y.status === "dirty" && !n && (n = { result: y, ctx: h }), h.common.issues.length && i.push(h.common.issues);
      }
      if (n)
        return t.common.issues.push(...n.ctx.common.issues), n.result;
      const o = i.map((u) => new R(u));
      return l(t, {
        code: d.invalid_union,
        unionErrors: o
      }), m;
    }
  }
  get options() {
    return this._def.options;
  }
}
ae.create = (a, e) => new ae({
  options: a,
  typeName: g.ZodUnion,
  ...v(e)
});
function ce(a, e) {
  const t = j(a), r = j(e);
  if (a === e)
    return { valid: !0, data: a };
  if (t === f.object && r === f.object) {
    const s = x.objectKeys(e), n = x.objectKeys(a).filter((o) => s.indexOf(o) !== -1), i = { ...a, ...e };
    for (const o of n) {
      const u = ce(a[o], e[o]);
      if (!u.valid)
        return { valid: !1 };
      i[o] = u.data;
    }
    return { valid: !0, data: i };
  } else if (t === f.array && r === f.array) {
    if (a.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let n = 0; n < a.length; n++) {
      const i = a[n], o = e[n], u = ce(i, o);
      if (!u.valid)
        return { valid: !1 };
      s.push(u.data);
    }
    return { valid: !0, data: s };
  } else return t === f.date && r === f.date && +a == +e ? { valid: !0, data: a } : { valid: !1 };
}
class re extends _ {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e), s = (n, i) => {
      if (ye(n) || ye(i))
        return m;
      const o = ce(n.value, i.value);
      return o.valid ? ((ve(n) || ve(i)) && t.dirty(), { status: t.value, value: o.data }) : (l(r, {
        code: d.invalid_intersection_types
      }), m);
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
    ]).then(([n, i]) => s(n, i)) : s(this._def.left._parseSync({
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
re.create = (a, e, t) => new re({
  left: a,
  right: e,
  typeName: g.ZodIntersection,
  ...v(t)
});
class U extends _ {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== f.array)
      return l(r, {
        code: d.invalid_type,
        expected: f.array,
        received: r.parsedType
      }), m;
    if (r.data.length < this._def.items.length)
      return l(r, {
        code: d.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), m;
    !this._def.rest && r.data.length > this._def.items.length && (l(r, {
      code: d.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), t.dirty());
    const n = [...r.data].map((i, o) => {
      const u = this._def.items[o] || this._def.rest;
      return u ? u._parse(new L(r, i, r.path, o)) : null;
    }).filter((i) => !!i);
    return r.common.async ? Promise.all(n).then((i) => T.mergeArray(t, i)) : T.mergeArray(t, n);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new U({
      ...this._def,
      rest: e
    });
  }
}
U.create = (a, e) => {
  if (!Array.isArray(a))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new U({
    items: a,
    typeName: g.ZodTuple,
    rest: null,
    ...v(e)
  });
};
class Te extends _ {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== f.map)
      return l(r, {
        code: d.invalid_type,
        expected: f.map,
        received: r.parsedType
      }), m;
    const s = this._def.keyType, n = this._def.valueType, i = [...r.data.entries()].map(([o, u], h) => ({
      key: s._parse(new L(r, o, r.path, [h, "key"])),
      value: n._parse(new L(r, u, r.path, [h, "value"]))
    }));
    if (r.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const u of i) {
          const h = await u.key, y = await u.value;
          if (h.status === "aborted" || y.status === "aborted")
            return m;
          (h.status === "dirty" || y.status === "dirty") && t.dirty(), o.set(h.value, y.value);
        }
        return { status: t.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const u of i) {
        const h = u.key, y = u.value;
        if (h.status === "aborted" || y.status === "aborted")
          return m;
        (h.status === "dirty" || y.status === "dirty") && t.dirty(), o.set(h.value, y.value);
      }
      return { status: t.value, value: o };
    }
  }
}
Te.create = (a, e, t) => new Te({
  valueType: e,
  keyType: a,
  typeName: g.ZodMap,
  ...v(t)
});
class K extends _ {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== f.set)
      return l(r, {
        code: d.invalid_type,
        expected: f.set,
        received: r.parsedType
      }), m;
    const s = this._def;
    s.minSize !== null && r.data.size < s.minSize.value && (l(r, {
      code: d.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), t.dirty()), s.maxSize !== null && r.data.size > s.maxSize.value && (l(r, {
      code: d.too_big,
      maximum: s.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.maxSize.message
    }), t.dirty());
    const n = this._def.valueType;
    function i(u) {
      const h = /* @__PURE__ */ new Set();
      for (const y of u) {
        if (y.status === "aborted")
          return m;
        y.status === "dirty" && t.dirty(), h.add(y.value);
      }
      return { status: t.value, value: h };
    }
    const o = [...r.data.values()].map((u, h) => n._parse(new L(r, u, r.path, h)));
    return r.common.async ? Promise.all(o).then((u) => i(u)) : i(o);
  }
  min(e, t) {
    return new K({
      ...this._def,
      minSize: { value: e, message: p.toString(t) }
    });
  }
  max(e, t) {
    return new K({
      ...this._def,
      maxSize: { value: e, message: p.toString(t) }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
K.create = (a, e) => new K({
  valueType: a,
  minSize: null,
  maxSize: null,
  typeName: g.ZodSet,
  ...v(e)
});
class Se extends _ {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
Se.create = (a, e) => new Se({
  getter: a,
  typeName: g.ZodLazy,
  ...v(e)
});
class Ae extends _ {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return l(t, {
        received: t.data,
        code: d.invalid_literal,
        expected: this._def.value
      }), m;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
Ae.create = (a, e) => new Ae({
  value: a,
  typeName: g.ZodLiteral,
  ...v(e)
});
function De(a, e) {
  return new W({
    values: a,
    typeName: g.ZodEnum,
    ...v(e)
  });
}
class W extends _ {
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), r = this._def.values;
      return l(t, {
        expected: x.joinValues(r),
        received: t.parsedType,
        code: d.invalid_type
      }), m;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const t = this._getOrReturnCtx(e), r = this._def.values;
      return l(t, {
        received: t.data,
        code: d.invalid_enum_value,
        options: r
      }), m;
    }
    return S(e.data);
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
    return W.create(e, {
      ...this._def,
      ...t
    });
  }
  exclude(e, t = this._def) {
    return W.create(this.options.filter((r) => !e.includes(r)), {
      ...this._def,
      ...t
    });
  }
}
W.create = De;
class Oe extends _ {
  _parse(e) {
    const t = x.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== f.string && r.parsedType !== f.number) {
      const s = x.objectValues(t);
      return l(r, {
        expected: x.joinValues(s),
        received: r.parsedType,
        code: d.invalid_type
      }), m;
    }
    if (this._cache || (this._cache = new Set(x.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const s = x.objectValues(t);
      return l(r, {
        received: r.data,
        code: d.invalid_enum_value,
        options: s
      }), m;
    }
    return S(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Oe.create = (a, e) => new Oe({
  values: a,
  typeName: g.ZodNativeEnum,
  ...v(e)
});
class se extends _ {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== f.promise && t.common.async === !1)
      return l(t, {
        code: d.invalid_type,
        expected: f.promise,
        received: t.parsedType
      }), m;
    const r = t.parsedType === f.promise ? t.data : Promise.resolve(t.data);
    return S(r.then((s) => this._def.type.parseAsync(s, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
}
se.create = (a, e) => new se({
  type: a,
  typeName: g.ZodPromise,
  ...v(e)
});
class J extends _ {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === g.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e), s = this._def.effect || null, n = {
      addIssue: (i) => {
        l(r, i), i.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (n.addIssue = n.addIssue.bind(n), s.type === "preprocess") {
      const i = s.transform(r.data, n);
      if (r.common.async)
        return Promise.resolve(i).then(async (o) => {
          if (t.value === "aborted")
            return m;
          const u = await this._def.schema._parseAsync({
            data: o,
            path: r.path,
            parent: r
          });
          return u.status === "aborted" ? m : u.status === "dirty" || t.value === "dirty" ? H(u.value) : u;
        });
      {
        if (t.value === "aborted")
          return m;
        const o = this._def.schema._parseSync({
          data: i,
          path: r.path,
          parent: r
        });
        return o.status === "aborted" ? m : o.status === "dirty" || t.value === "dirty" ? H(o.value) : o;
      }
    }
    if (s.type === "refinement") {
      const i = (o) => {
        const u = s.refinement(o, n);
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
        return o.status === "aborted" ? m : (o.status === "dirty" && t.dirty(), i(o.value), { status: t.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => o.status === "aborted" ? m : (o.status === "dirty" && t.dirty(), i(o.value).then(() => ({ status: t.value, value: o.value }))));
    }
    if (s.type === "transform")
      if (r.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!q(i))
          return m;
        const o = s.transform(i.value, n);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((i) => q(i) ? Promise.resolve(s.transform(i.value, n)).then((o) => ({
          status: t.value,
          value: o
        })) : m);
    x.assertNever(s);
  }
}
J.create = (a, e, t) => new J({
  schema: a,
  typeName: g.ZodEffects,
  effect: e,
  ...v(t)
});
J.createWithPreprocess = (a, e, t) => new J({
  schema: e,
  effect: { type: "preprocess", transform: a },
  typeName: g.ZodEffects,
  ...v(t)
});
class D extends _ {
  _parse(e) {
    return this._getType(e) === f.undefined ? S(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
D.create = (a, e) => new D({
  innerType: a,
  typeName: g.ZodOptional,
  ...v(e)
});
class G extends _ {
  _parse(e) {
    return this._getType(e) === f.null ? S(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
G.create = (a, e) => new G({
  innerType: a,
  typeName: g.ZodNullable,
  ...v(e)
});
class le extends _ {
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
le.create = (a, e) => new le({
  innerType: a,
  typeName: g.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...v(e)
});
class ue extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = {
      ...t,
      common: {
        ...t.common,
        issues: []
      }
    }, s = this._def.innerType._parse({
      data: r.data,
      path: r.path,
      parent: {
        ...r
      }
    });
    return ee(s) ? s.then((n) => ({
      status: "valid",
      value: n.status === "valid" ? n.value : this._def.catchValue({
        get error() {
          return new R(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new R(r.common.issues);
        },
        input: r.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ue.create = (a, e) => new ue({
  innerType: a,
  typeName: g.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...v(e)
});
class Re extends _ {
  _parse(e) {
    if (this._getType(e) !== f.nan) {
      const r = this._getOrReturnCtx(e);
      return l(r, {
        code: d.invalid_type,
        expected: f.nan,
        received: r.parsedType
      }), m;
    }
    return { status: "valid", value: e.data };
  }
}
Re.create = (a) => new Re({
  typeName: g.ZodNaN,
  ...v(a)
});
class yt extends _ {
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
class pe extends _ {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const n = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return n.status === "aborted" ? m : n.status === "dirty" ? (t.dirty(), H(n.value)) : this._def.out._parseAsync({
          data: n.value,
          path: r.path,
          parent: r
        });
      })();
    {
      const s = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      });
      return s.status === "aborted" ? m : s.status === "dirty" ? (t.dirty(), {
        status: "dirty",
        value: s.value
      }) : this._def.out._parseSync({
        data: s.value,
        path: r.path,
        parent: r
      });
    }
  }
  static create(e, t) {
    return new pe({
      in: e,
      out: t,
      typeName: g.ZodPipeline
    });
  }
}
class fe extends _ {
  _parse(e) {
    const t = this._def.innerType._parse(e), r = (s) => (q(s) && (s.value = Object.freeze(s.value)), s);
    return ee(t) ? t.then((s) => r(s)) : r(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
fe.create = (a, e) => new fe({
  innerType: a,
  typeName: g.ZodReadonly,
  ...v(e)
});
var g;
(function(a) {
  a.ZodString = "ZodString", a.ZodNumber = "ZodNumber", a.ZodNaN = "ZodNaN", a.ZodBigInt = "ZodBigInt", a.ZodBoolean = "ZodBoolean", a.ZodDate = "ZodDate", a.ZodSymbol = "ZodSymbol", a.ZodUndefined = "ZodUndefined", a.ZodNull = "ZodNull", a.ZodAny = "ZodAny", a.ZodUnknown = "ZodUnknown", a.ZodNever = "ZodNever", a.ZodVoid = "ZodVoid", a.ZodArray = "ZodArray", a.ZodObject = "ZodObject", a.ZodUnion = "ZodUnion", a.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", a.ZodIntersection = "ZodIntersection", a.ZodTuple = "ZodTuple", a.ZodRecord = "ZodRecord", a.ZodMap = "ZodMap", a.ZodSet = "ZodSet", a.ZodFunction = "ZodFunction", a.ZodLazy = "ZodLazy", a.ZodLiteral = "ZodLiteral", a.ZodEnum = "ZodEnum", a.ZodEffects = "ZodEffects", a.ZodNativeEnum = "ZodNativeEnum", a.ZodOptional = "ZodOptional", a.ZodNullable = "ZodNullable", a.ZodDefault = "ZodDefault", a.ZodCatch = "ZodCatch", a.ZodPromise = "ZodPromise", a.ZodBranded = "ZodBranded", a.ZodPipeline = "ZodPipeline", a.ZodReadonly = "ZodReadonly";
})(g || (g = {}));
const M = P.create, vt = F.create;
V.create;
const Le = A.create, _t = w.create;
ae.create;
re.create;
U.create;
W.create;
se.create;
D.create;
G.create;
const Ve = "tasks", xt = "1.0.0", kt = "TASK_COUNT_CHANGED", Me = "sapwiki", ne = `plugin-${Me}`, bt = _t({
  id: M(),
  title: M().min(1, "Title is required"),
  requirement: M().optional().default(""),
  steps: M().optional().default(""),
  tCode: M().optional().default(""),
  tCodes: Le(M()).optional().default([]),
  createdAt: vt().default(() => Date.now()),
  imageData: M().optional()
}), me = Le(bt), Ie = 240, wt = (a) => {
  try {
    const e = typeof a == "string" ? a : JSON.stringify(a);
    return e.length > Ie ? `${e.slice(0, Ie)}...` : e;
  } catch (e) {
    return `[unserializable ${String(e)}]`;
  }
}, Ze = (a) => {
  if (typeof a != "string") return a;
  try {
    return JSON.parse(a);
  } catch {
    return a;
  }
}, Et = (a) => {
  const e = Ze(a);
  if (Array.isArray(e))
    return { candidate: e, source: "raw" };
  if (e && typeof e == "object") {
    const t = e, r = ["data", "value", "payload", "tasks", "cases"];
    for (const s of r) {
      const n = Ze(t[s]);
      if (Array.isArray(n))
        return { candidate: n, source: s };
    }
  }
  return { candidate: [], source: "raw" };
}, he = (a) => {
  const { candidate: e, source: t } = Et(a), r = me.safeParse(e);
  return r.success ? { tasks: r.data, source: t, ok: !0 } : (console.error("[task-board] restore failed", r.error), { tasks: [], source: t, ok: !1 });
}, Ct = async (a) => {
  console.info("[task-board] restore start");
  try {
    const e = await a.storage.get(Ve), { tasks: t, source: r, ok: s } = he(e);
    return console.info("[task-board] restore payload", {
      preview: wt(e),
      extractedPath: r
    }), s && console.info("[task-board] restore success", {
      count: t.length,
      source: r
    }), t;
  } catch (e) {
    return console.error("[task-board] restore failed", e), [];
  }
}, Nt = async (a, e) => {
  console.info(`[task-board] save triggered (count=${e.length})`);
  const t = me.safeParse(e);
  if (!t.success) {
    console.error("[task-board] save failed", t.error);
    return;
  }
  try {
    await a.storage.save(Ve, t.data, xt);
  } catch (r) {
    console.error("[task-board] save failed", r);
  }
}, Tt = (a) => ({
  id: crypto.randomUUID ? crypto.randomUUID() : `task-${Date.now()}`,
  title: a.title.trim(),
  requirement: a.requirement ?? "",
  steps: a.steps ?? "",
  tCode: a.tCode ?? "",
  tCodes: a.tCodes ?? [],
  createdAt: Date.now(),
  imageData: a.imageData
}), St = (a) => {
  const [e, t] = Z([]), [r, s] = Z(!1), n = je(!1);
  oe(() => {
    let b = !0;
    return (async () => {
      const E = await Ct(a);
      b && (t(E), s(!0));
    })(), () => {
      b = !1;
    };
  }, [a]), oe(() => {
    if (r) {
      if (!n.current) {
        n.current = !0;
        return;
      }
      Nt(a, e), a.eventBus.emit(kt, { count: e.length });
    }
  }, [a, r, e]);
  const i = Q((b) => {
    t((E) => [...E, Tt(b)]);
  }, []), o = Q((b, E) => {
    t((C) => C.map((N) => N.id === b ? E(N) : N));
  }, []), u = Q((b) => {
    t((E) => E.filter((C) => C.id !== b));
  }, []), h = Q((b) => {
    const E = me.safeParse(b);
    E.success && t(E.data);
  }, []), y = Ue(
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
    replaceTasks: h,
    stats: y
  };
}, At = ({ context: a }) => {
  const { tasks: e, hydrated: t, addTask: r, removeTask: s, updateTask: n, replaceTasks: i, stats: o } = St(a), u = je(null);
  oe(() => {
    const C = (N) => {
      const { tasks: k, ok: O } = he(N);
      O && k.length && i(k);
    };
    return a.eventBus.on("SAPWIKI_IMPORT", C), () => {
      a.eventBus.off("SAPWIKI_IMPORT", C);
    };
  }, [a, i]);
  const h = (C, N) => {
    n(C, (k) => ({ ...k, ...N }));
  }, y = async (C) => {
    const N = C.target.files?.[0];
    if (C.target.value = "", !N) return;
    const k = await N.text(), { tasks: O, ok: I } = he(k);
    I && i(O);
  }, b = () => u.current?.click(), E = () => {
    const C = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), N = URL.createObjectURL(C), k = document.createElement("a");
    k.href = N, k.download = "sapwiki-tasks.json", k.click(), URL.revokeObjectURL(N);
  };
  return /* @__PURE__ */ c.createElement("div", { className: "app", "data-theme": a.theme }, /* @__PURE__ */ c.createElement("header", { className: "hero card" }, /* @__PURE__ */ c.createElement("div", { className: "hero-copy" }, /* @__PURE__ */ c.createElement("p", { className: "eyebrow" }, "SAPWiki"), /* @__PURE__ */ c.createElement("h1", null, "Local task board"), /* @__PURE__ */ c.createElement("p", { className: "muted" }, "Persisted locally with host storage. Import legacy backups, add notes, and keep images with each entry."), /* @__PURE__ */ c.createElement("div", { className: "chips" }, /* @__PURE__ */ c.createElement("span", { className: `chip ${t ? "chip-ok" : "chip-warn"}` }, /* @__PURE__ */ c.createElement("span", { className: "dot" }), " ", t ? "Ready" : "Restoring data..."), /* @__PURE__ */ c.createElement("span", { className: "chip soft" }, o.total, " tasks"))), /* @__PURE__ */ c.createElement("div", { className: "hero-actions" }, /* @__PURE__ */ c.createElement("button", { className: "ghost", onClick: b, disabled: !t }, "Import JSON"), /* @__PURE__ */ c.createElement("button", { onClick: E, disabled: !t || !e.length }, "Export"), /* @__PURE__ */ c.createElement("input", { ref: u, type: "file", accept: "application/json", hidden: !0, onChange: y }))), /* @__PURE__ */ c.createElement("section", { className: "layout" }, /* @__PURE__ */ c.createElement("div", { className: "panel card" }, /* @__PURE__ */ c.createElement("div", { className: "panel-header" }, /* @__PURE__ */ c.createElement("div", null, /* @__PURE__ */ c.createElement("p", { className: "label" }, "Capture"), /* @__PURE__ */ c.createElement("h2", null, "Create a task"), /* @__PURE__ */ c.createElement("p", { className: "muted" }, "Quickly log SAP cases with codes, steps, and visuals."))), /* @__PURE__ */ c.createElement(qe, { onSubmit: r })), /* @__PURE__ */ c.createElement("div", { className: "panel card" }, /* @__PURE__ */ c.createElement("div", { className: "panel-header" }, /* @__PURE__ */ c.createElement("div", null, /* @__PURE__ */ c.createElement("p", { className: "label" }, "Board"), /* @__PURE__ */ c.createElement("h2", null, "Recent entries"), /* @__PURE__ */ c.createElement("p", { className: "muted" }, "Edit inline, keep evidence, and clean up when done."))), /* @__PURE__ */ c.createElement(Fe, { tasks: e, onDelete: s, onUpdate: h }))));
}, Ot = "#plugin-sapwiki{--bg: #f4f6fb;--card: #ffffff;--card-strong: #0f172a;--border: #e2e8f0;--text: #0f172a;--muted: #5b6577;--primary: #0f52ba;--primary-strong: #0a3c87;--accent: #22c55e;--warn: #f59e0b;font-family:Segoe UI,system-ui,-apple-system,sans-serif;color:var(--text);background:radial-gradient(circle at 20% 20%,#e5edff,transparent 45%),radial-gradient(circle at 80% 0%,#e8fff4,transparent 35%),var(--bg);min-height:100vh}#plugin-sapwiki .app{padding:32px 28px 48px;max-width:1200px;margin:0 auto;display:flex;flex-direction:column;gap:20px}#plugin-sapwiki .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px 20px;box-shadow:0 14px 38px #0f172a14}#plugin-sapwiki .hero{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;background:linear-gradient(135deg,#0f172a,#153e75);color:#e2e8f0;border:none;box-shadow:0 20px 50px #0f172a47}#plugin-sapwiki .hero .muted{color:#e2e8f0d9}#plugin-sapwiki .hero h1{margin:6px 0 10px;color:#f8fafc}#plugin-sapwiki .hero-copy{max-width:640px}#plugin-sapwiki .hero-actions{display:flex;gap:10px;align-items:flex-start}#plugin-sapwiki .eyebrow{text-transform:uppercase;letter-spacing:.08em;font-size:11px;color:inherit;margin:0 0 4px}#plugin-sapwiki .muted{color:var(--muted);margin:0}#plugin-sapwiki .chips{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}#plugin-sapwiki .chip{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;background:#ffffff14;color:#f8fafc;border:1px solid rgba(255,255,255,.16);font-weight:600}#plugin-sapwiki .chip.soft{background:#e2e8f0;color:var(--text);border:1px solid transparent}#plugin-sapwiki .chip-ok{background:#22c55e29;color:#e8fff2;border-color:#22c55e52}#plugin-sapwiki .chip-warn{background:#f59e0b2e;color:#fef3c7;border-color:#f59e0b4d}#plugin-sapwiki .dot{width:10px;height:10px;border-radius:50%;display:inline-block;background:#f8fafc;box-shadow:0 0 0 4px #ffffff14}#plugin-sapwiki .layout{display:grid;grid-template-columns:minmax(320px,.9fr) 1.1fr;gap:16px}#plugin-sapwiki .panel{display:flex;flex-direction:column;gap:12px}#plugin-sapwiki .panel-header h2{margin:4px 0 6px}#plugin-sapwiki .label{text-transform:uppercase;font-size:12px;letter-spacing:.06em;color:var(--muted);margin:0}#plugin-sapwiki .toolbar,#plugin-sapwiki .actions{display:flex;gap:10px;align-items:center}#plugin-sapwiki button{padding:11px 16px;border-radius:12px;border:1px solid var(--primary-strong);background:var(--primary);color:#fff;font-weight:650;cursor:pointer;transition:transform .12s ease,box-shadow .16s ease,background .16s ease;box-shadow:0 8px 20px #0f52ba40}#plugin-sapwiki button:disabled{opacity:.6;cursor:not-allowed;box-shadow:none}#plugin-sapwiki button:hover:not(:disabled){transform:translateY(-1px);background:var(--primary-strong)}#plugin-sapwiki button.ghost{background:transparent;color:var(--primary-strong);border-color:var(--border);box-shadow:none}#plugin-sapwiki .hero button.ghost{color:#f8fafc;border-color:#ffffff47}#plugin-sapwiki .task-form{display:grid;gap:12px}#plugin-sapwiki .field{display:flex;flex-direction:column;gap:6px}#plugin-sapwiki .two-col{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}#plugin-sapwiki label{font-weight:600;color:var(--text)}#plugin-sapwiki input,#plugin-sapwiki textarea{width:100%;border-radius:12px;border:1px solid var(--border);padding:12px 14px;font:inherit;background:#f8fafc;transition:border .12s ease,box-shadow .12s ease}#plugin-sapwiki input:focus,#plugin-sapwiki textarea:focus{border-color:var(--primary);box-shadow:0 0 0 4px #0f52ba1f;outline:none}#plugin-sapwiki textarea{resize:vertical;min-height:100px}#plugin-sapwiki .task-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}#plugin-sapwiki .task-card h3{margin:4px 0 8px}#plugin-sapwiki .task-header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:8px}#plugin-sapwiki .tags{display:flex;flex-wrap:wrap;gap:6px}#plugin-sapwiki .pill{background:#e2e8f0;border-radius:999px;padding:4px 10px;font-size:12px;color:var(--text);border:1px solid transparent}#plugin-sapwiki .preview{width:100%;max-height:220px;object-fit:contain;border-radius:10px;border:1px solid var(--border);background:#f8fafc}#plugin-sapwiki .empty{text-align:left;padding:16px;border-style:dashed;border-color:var(--border);background:linear-gradient(135deg,#f8fafc,#eef2ff)}@media (max-width: 900px){#plugin-sapwiki .layout{grid-template-columns:1fr}#plugin-sapwiki .hero{align-items:flex-start}#plugin-sapwiki .hero-actions{width:100%;flex-wrap:wrap}#plugin-sapwiki button,#plugin-sapwiki button.ghost{width:auto}}";
let z = null, X = null, $ = null;
const Rt = (a) => {
  const e = a.querySelector(`#${ne}`);
  if (e) return e;
  const t = document.createElement("div");
  return t.id = ne, a.appendChild(t), t;
}, It = () => {
  $ || ($ = document.createElement("style"), $.id = `${ne}-style`, $.textContent = Ot, document.head.appendChild($));
}, $t = {
  id: Me,
  name: "SAPWiki",
  version: "1.0.0",
  mount(a, e) {
    It();
    const t = Rt(a);
    X = t, z && z.unmount(), z = Be(t), z.render(
      /* @__PURE__ */ c.createElement(c.StrictMode, null, /* @__PURE__ */ c.createElement(At, { context: e }))
    );
  },
  unmount(a) {
    z && (z.unmount(), z = null), X && (X.replaceChildren(), X = null);
    const e = a.querySelector(`#${ne}`);
    e && e.replaceChildren(), $ && ($.remove(), $ = null);
  }
};
export {
  $t as default
};
//# sourceMappingURL=plugin.js.map
