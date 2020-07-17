module.exports = (function (e) {
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var o = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
  }
  return (
    (r.m = e),
    (r.c = t),
    (r.d = function (e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (r.r = function (e) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.t = function (e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && "object" === typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          r.d(
            n,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return n;
    }),
    (r.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return r.d(t, "a", t), t;
    }),
    (r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = "/"),
    r((r.s = 7))
  );
})([
  function (e, t, r) {
    e.exports = r(5)();
  },
  function (e, t) {
    e.exports = require("react");
  },
  function (e, t, r) {
    "use strict";
    e.exports = function (e, t, r, n, o, a, i, c) {
      if (!e) {
        var s;
        if (void 0 === t)
          s = new Error(
            "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
          );
        else {
          var u = [r, n, o, a, i, c],
            l = 0;
          (s = new Error(
            t.replace(/%s/g, function () {
              return u[l++];
            })
          )).name = "Invariant Violation";
        }
        throw ((s.framesToPop = 1), s);
      }
    };
  },
  function (e, t, r) {
    "use strict";
    var n = Array.isArray,
      o = Object.keys,
      a = Object.prototype.hasOwnProperty,
      i = "undefined" !== typeof Element;
    e.exports = function (e, t) {
      try {
        return (function e(t, r) {
          if (t === r) return !0;
          if (t && r && "object" == typeof t && "object" == typeof r) {
            var c,
              s,
              u,
              l = n(t),
              p = n(r);
            if (l && p) {
              if ((s = t.length) != r.length) return !1;
              for (c = s; 0 !== c--; ) if (!e(t[c], r[c])) return !1;
              return !0;
            }
            if (l != p) return !1;
            var f = t instanceof Date,
              d = r instanceof Date;
            if (f != d) return !1;
            if (f && d) return t.getTime() == r.getTime();
            var y = t instanceof RegExp,
              h = r instanceof RegExp;
            if (y != h) return !1;
            if (y && h) return t.toString() == r.toString();
            var m = o(t);
            if ((s = m.length) !== o(r).length) return !1;
            for (c = s; 0 !== c--; ) if (!a.call(r, m[c])) return !1;
            if (i && t instanceof Element && r instanceof Element)
              return t === r;
            for (c = s; 0 !== c--; )
              if (("_owner" !== (u = m[c]) || !t.$$typeof) && !e(t[u], r[u]))
                return !1;
            return !0;
          }
          return t !== t && r !== r;
        })(e, t);
      } catch (r) {
        if (
          (r.message && r.message.match(/stack|recursion/i)) ||
          -2146828260 === r.number
        )
          return (
            console.warn(
              "Warning: react-fast-compare does not handle circular references.",
              r.name,
              r.message
            ),
            !1
          );
        throw r;
      }
    };
  },
  function (e, t) {
    e.exports = function (e, t, r, n) {
      var o = r ? r.call(n, e, t) : void 0;
      if (void 0 !== o) return !!o;
      if (e === t) return !0;
      if ("object" !== typeof e || !e || "object" !== typeof t || !t) return !1;
      var a = Object.keys(e),
        i = Object.keys(t);
      if (a.length !== i.length) return !1;
      for (
        var c = Object.prototype.hasOwnProperty.bind(t), s = 0;
        s < a.length;
        s++
      ) {
        var u = a[s];
        if (!c(u)) return !1;
        var l = e[u],
          p = t[u];
        if (
          !1 === (o = r ? r.call(n, l, p, u) : void 0) ||
          (void 0 === o && l !== p)
        )
          return !1;
      }
      return !0;
    };
  },
  function (e, t, r) {
    "use strict";
    var n = r(6);
    function o() {}
    function a() {}
    (a.resetWarningCache = o),
      (e.exports = function () {
        function e(e, t, r, o, a, i) {
          if (i !== n) {
            var c = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw ((c.name = "Invariant Violation"), c);
          }
        }
        function t() {
          return e;
        }
        e.isRequired = e;
        var r = {
          array: e,
          bool: e,
          func: e,
          number: e,
          object: e,
          string: e,
          symbol: e,
          any: e,
          arrayOf: t,
          element: e,
          elementType: e,
          instanceOf: t,
          node: e,
          objectOf: t,
          oneOf: t,
          oneOfType: t,
          shape: t,
          exact: t,
          checkPropTypes: a,
          resetWarningCache: o,
        };
        return (r.PropTypes = r), r;
      });
  },
  function (e, t, r) {
    "use strict";
    e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  },
  function (e, t, r) {
    "use strict";
    r.r(t);
    var n = r(1),
      o = r.n(n),
      a = r(3),
      i = r.n(a),
      c = r(2),
      s = r.n(c),
      u = r(0),
      l = r.n(u),
      p = r(4),
      f = r.n(p),
      d = {
        BASE: "base",
        BODY: "body",
        HEAD: "head",
        HTML: "html",
        LINK: "link",
        META: "meta",
        NOSCRIPT: "noscript",
        SCRIPT: "script",
        STYLE: "style",
        TITLE: "title",
        FRAGMENT: "Symbol(react.fragment)",
      },
      y = Object.keys(d).map(function (e) {
        return d[e];
      }),
      h = {
        accesskey: "accessKey",
        charset: "charSet",
        class: "className",
        contenteditable: "contentEditable",
        contextmenu: "contextMenu",
        "http-equiv": "httpEquiv",
        itemprop: "itemProp",
        tabindex: "tabIndex",
      },
      m = Object.keys(h).reduce(function (e, t) {
        return (e[h[t]] = t), e;
      }, {}),
      b = function (e, t) {
        for (var r = e.length - 1; r >= 0; r -= 1) {
          var n = e[r];
          if (Object.prototype.hasOwnProperty.call(n, t)) return n[t];
        }
        return null;
      },
      g = function (e) {
        var t = b(e, d.TITLE),
          r = b(e, "titleTemplate");
        if ((Array.isArray(t) && (t = t.join("")), r && t))
          return r.replace(/%s/g, function () {
            return t;
          });
        var n = b(e, "defaultTitle");
        return t || n || void 0;
      },
      T = function (e) {
        return b(e, "onChangeClientState") || function () {};
      },
      v = function (e, t) {
        return t
          .filter(function (t) {
            return void 0 !== t[e];
          })
          .map(function (t) {
            return t[e];
          })
          .reduce(function (e, t) {
            return Object.assign({}, e, t);
          }, {});
      },
      O = function (e, t) {
        return t
          .filter(function (e) {
            return void 0 !== e[d.BASE];
          })
          .map(function (e) {
            return e[d.BASE];
          })
          .reverse()
          .reduce(function (t, r) {
            if (!t.length)
              for (var n = Object.keys(r), o = 0; o < n.length; o += 1) {
                var a = n[o].toLowerCase();
                if (-1 !== e.indexOf(a) && r[a]) return t.concat(r);
              }
            return t;
          }, []);
      },
      j = function (e, t, r) {
        var n = {};
        return r
          .filter(function (t) {
            return (
              !!Array.isArray(t[e]) ||
              (void 0 !== t[e] &&
                console &&
                "function" == typeof console.warn &&
                console.warn(
                  "Helmet: " +
                    e +
                    ' should be of type "Array". Instead found type "' +
                    typeof t[e] +
                    '"'
                ),
              !1)
            );
          })
          .map(function (t) {
            return t[e];
          })
          .reverse()
          .reduce(function (e, r) {
            var o = {};
            r.filter(function (e) {
              for (var r, a = Object.keys(e), i = 0; i < a.length; i += 1) {
                var c = a[i],
                  s = c.toLowerCase();
                -1 === t.indexOf(s) ||
                  ("rel" === r && "canonical" === e[r].toLowerCase()) ||
                  ("rel" === s && "stylesheet" === e[s].toLowerCase()) ||
                  (r = s),
                  -1 === t.indexOf(c) ||
                    ("innerHTML" !== c &&
                      "cssText" !== c &&
                      "itemprop" !== c) ||
                    (r = c);
              }
              if (!r || !e[r]) return !1;
              var u = e[r].toLowerCase();
              return (
                n[r] || (n[r] = {}),
                o[r] || (o[r] = {}),
                !n[r][u] && ((o[r][u] = !0), !0)
              );
            })
              .reverse()
              .forEach(function (t) {
                return e.push(t);
              });
            for (var a = Object.keys(o), i = 0; i < a.length; i += 1) {
              var c = a[i],
                s = Object.assign({}, n[c], o[c]);
              n[c] = s;
            }
            return e;
          }, [])
          .reverse();
      },
      C = function (e) {
        return Array.isArray(e) ? e.join("") : e;
      },
      E = [d.NOSCRIPT, d.SCRIPT, d.STYLE],
      A = function (e, t) {
        return (
          void 0 === t && (t = !0),
          !1 === t
            ? String(e)
            : String(e)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#x27;")
        );
      },
      w = function (e) {
        return Object.keys(e).reduce(function (t, r) {
          var n = void 0 !== e[r] ? r + '="' + e[r] + '"' : "" + r;
          return t ? t + " " + n : n;
        }, "");
      },
      P = function (e, t) {
        return (
          void 0 === t && (t = {}),
          Object.keys(e).reduce(function (t, r) {
            return (t[h[r] || r] = e[r]), t;
          }, t)
        );
      },
      S = function (e, t, r) {
        switch (e) {
          case d.TITLE:
            return {
              toComponent: function () {
                return (
                  (r = P(t.titleAttributes, {
                    key: (e = t.title),
                    "data-rh": !0,
                  })),
                  [o.a.createElement(d.TITLE, r, e)]
                );
                var e, r;
              },
              toString: function () {
                return (function (e, r, n, o) {
                  var a = w(t.titleAttributes),
                    i = C(r);
                  return a
                    ? "<" +
                        e +
                        ' data-rh="true" ' +
                        a +
                        ">" +
                        A(i, o) +
                        "</" +
                        e +
                        ">"
                    : "<" + e + ' data-rh="true">' + A(i, o) + "</" + e + ">";
                })(e, t.title, 0, r);
              },
            };
          case "bodyAttributes":
          case "htmlAttributes":
            return {
              toComponent: function () {
                return P(t);
              },
              toString: function () {
                return w(t);
              },
            };
          default:
            return {
              toComponent: function () {
                return (function (e, t) {
                  return t.map(function (t, r) {
                    var n = { key: r, "data-rh": !0 };
                    return (
                      Object.keys(t).forEach(function (e) {
                        var r = h[e] || e;
                        "innerHTML" === r || "cssText" === r
                          ? (n.dangerouslySetInnerHTML = {
                              __html: t.innerHTML || t.cssText,
                            })
                          : (n[r] = t[e]);
                      }),
                      o.a.createElement(e, n)
                    );
                  });
                })(e, t);
              },
              toString: function () {
                return (function (e, t, r) {
                  return t.reduce(function (t, n) {
                    var o = Object.keys(n)
                        .filter(function (e) {
                          return !("innerHTML" === e || "cssText" === e);
                        })
                        .reduce(function (e, t) {
                          var o =
                            void 0 === n[t] ? t : t + '="' + A(n[t], r) + '"';
                          return e ? e + " " + o : o;
                        }, ""),
                      a = n.innerHTML || n.cssText || "",
                      i = -1 === E.indexOf(e);
                    return (
                      t +
                      "<" +
                      e +
                      ' data-rh="true" ' +
                      o +
                      (i ? "/>" : ">" + a + "</" + e + ">")
                    );
                  }, "");
                })(e, t, r);
              },
            };
        }
      },
      x = function (e) {
        var t = e.bodyAttributes,
          r = e.encode,
          n = e.htmlAttributes,
          o = e.linkTags,
          a = e.metaTags,
          i = e.noscriptTags,
          c = e.scriptTags,
          s = e.styleTags,
          u = e.title;
        void 0 === u && (u = "");
        var l = e.titleAttributes;
        return {
          base: S(d.BASE, e.baseTag, r),
          bodyAttributes: S("bodyAttributes", t, r),
          htmlAttributes: S("htmlAttributes", n, r),
          link: S(d.LINK, o, r),
          meta: S(d.META, a, r),
          noscript: S(d.NOSCRIPT, i, r),
          script: S(d.SCRIPT, c, r),
          style: S(d.STYLE, s, r),
          title: S(d.TITLE, { title: u, titleAttributes: l }, r),
        };
      },
      k = o.a.createContext({}),
      I = l.a.shape({
        setHelmet: l.a.func,
        helmetInstances: l.a.shape({
          get: l.a.func,
          add: l.a.func,
          remove: l.a.func,
        }),
      }),
      L = "undefined" != typeof document,
      M = (function (e) {
        function t(r) {
          var n = this;
          e.call(this, r),
            (this.instances = []),
            (this.value = {
              setHelmet: function (e) {
                n.props.context.helmet = e;
              },
              helmetInstances: {
                get: function () {
                  return n.instances;
                },
                add: function (e) {
                  n.instances.push(e);
                },
                remove: function (e) {
                  var t = n.instances.indexOf(e);
                  n.instances.splice(t, 1);
                },
              },
            }),
            t.canUseDOM ||
              (r.context.helmet = x({
                baseTag: [],
                bodyAttributes: {},
                encodeSpecialCharacters: !0,
                htmlAttributes: {},
                linkTags: [],
                metaTags: [],
                noscriptTags: [],
                scriptTags: [],
                styleTags: [],
                title: "",
                titleAttributes: {},
              }));
        }
        return (
          e && (t.__proto__ = e),
          ((t.prototype = Object.create(e && e.prototype)).constructor = t),
          (t.prototype.render = function () {
            return o.a.createElement(
              k.Provider,
              { value: this.value },
              this.props.children
            );
          }),
          t
        );
      })(n.Component);
    (M.canUseDOM = L),
      (M.propTypes = {
        context: l.a.shape({ helmet: l.a.shape() }),
        children: l.a.node.isRequired,
      }),
      (M.defaultProps = { context: {} }),
      (M.displayName = "HelmetProvider");
    var R = function (e, t) {
        var r,
          n = document.head || document.querySelector(d.HEAD),
          o = n.querySelectorAll(e + "[data-rh]"),
          a = [].slice.call(o),
          i = [];
        return (
          t &&
            t.length &&
            t.forEach(function (t) {
              var n = document.createElement(e);
              for (var o in t)
                Object.prototype.hasOwnProperty.call(t, o) &&
                  ("innerHTML" === o
                    ? (n.innerHTML = t.innerHTML)
                    : "cssText" === o
                    ? n.styleSheet
                      ? (n.styleSheet.cssText = t.cssText)
                      : n.appendChild(document.createTextNode(t.cssText))
                    : n.setAttribute(o, void 0 === t[o] ? "" : t[o]));
              n.setAttribute("data-rh", "true"),
                a.some(function (e, t) {
                  return (r = t), n.isEqualNode(e);
                })
                  ? a.splice(r, 1)
                  : i.push(n);
            }),
          a.forEach(function (e) {
            return e.parentNode.removeChild(e);
          }),
          i.forEach(function (e) {
            return n.appendChild(e);
          }),
          { oldTags: a, newTags: i }
        );
      },
      _ = function (e, t) {
        var r = document.getElementsByTagName(e)[0];
        if (r) {
          for (
            var n = r.getAttribute("data-rh"),
              o = n ? n.split(",") : [],
              a = [].concat(o),
              i = Object.keys(t),
              c = 0;
            c < i.length;
            c += 1
          ) {
            var s = i[c],
              u = t[s] || "";
            r.getAttribute(s) !== u && r.setAttribute(s, u),
              -1 === o.indexOf(s) && o.push(s);
            var l = a.indexOf(s);
            -1 !== l && a.splice(l, 1);
          }
          for (var p = a.length - 1; p >= 0; p -= 1) r.removeAttribute(a[p]);
          o.length === a.length
            ? r.removeAttribute("data-rh")
            : r.getAttribute("data-rh") !== i.join(",") &&
              r.setAttribute("data-rh", i.join(","));
        }
      },
      D = function (e, t) {
        var r = e.baseTag,
          n = e.htmlAttributes,
          o = e.linkTags,
          a = e.metaTags,
          i = e.noscriptTags,
          c = e.onChangeClientState,
          s = e.scriptTags,
          u = e.styleTags,
          l = e.title,
          p = e.titleAttributes;
        _(d.BODY, e.bodyAttributes),
          _(d.HTML, n),
          (function (e, t) {
            void 0 !== e && document.title !== e && (document.title = C(e)),
              _(d.TITLE, t);
          })(l, p);
        var f = {
            baseTag: R(d.BASE, r),
            linkTags: R(d.LINK, o),
            metaTags: R(d.META, a),
            noscriptTags: R(d.NOSCRIPT, i),
            scriptTags: R(d.SCRIPT, s),
            styleTags: R(d.STYLE, u),
          },
          y = {},
          h = {};
        Object.keys(f).forEach(function (e) {
          var t = f[e],
            r = t.newTags,
            n = t.oldTags;
          r.length && (y[e] = r), n.length && (h[e] = f[e].oldTags);
        }),
          t && t(),
          c(e, y, h);
      },
      H = null,
      N = (function (e) {
        function t() {
          for (var t = [], r = arguments.length; r--; ) t[r] = arguments[r];
          e.apply(this, t), (this.rendered = !1);
        }
        return (
          e && (t.__proto__ = e),
          ((t.prototype = Object.create(e && e.prototype)).constructor = t),
          (t.prototype.shouldComponentUpdate = function (e) {
            return !f()(e, this.props);
          }),
          (t.prototype.componentDidUpdate = function () {
            this.emitChange();
          }),
          (t.prototype.componentWillUnmount = function () {
            this.props.context.helmetInstances.remove(this), this.emitChange();
          }),
          (t.prototype.emitChange = function () {
            var e,
              t,
              r = this.props.context,
              n = r.setHelmet,
              o = null,
              a =
                ((e = r.helmetInstances.get().map(function (e) {
                  var t = Object.assign({}, e.props);
                  return delete t.context, t;
                })),
                {
                  baseTag: O(["href"], e),
                  bodyAttributes: v("bodyAttributes", e),
                  defer: b(e, "defer"),
                  encode: b(e, "encodeSpecialCharacters"),
                  htmlAttributes: v("htmlAttributes", e),
                  linkTags: j(d.LINK, ["rel", "href"], e),
                  metaTags: j(
                    d.META,
                    ["name", "charset", "http-equiv", "property", "itemprop"],
                    e
                  ),
                  noscriptTags: j(d.NOSCRIPT, ["innerHTML"], e),
                  onChangeClientState: T(e),
                  scriptTags: j(d.SCRIPT, ["src", "innerHTML"], e),
                  styleTags: j(d.STYLE, ["cssText"], e),
                  title: g(e),
                  titleAttributes: v("titleAttributes", e),
                });
            M.canUseDOM
              ? ((t = a),
                H && cancelAnimationFrame(H),
                t.defer
                  ? (H = requestAnimationFrame(function () {
                      D(t, function () {
                        H = null;
                      });
                    }))
                  : (D(t), (H = null)))
              : x && (o = x(a)),
              n(o);
          }),
          (t.prototype.init = function () {
            this.rendered ||
              ((this.rendered = !0),
              this.props.context.helmetInstances.add(this),
              this.emitChange());
          }),
          (t.prototype.render = function () {
            return this.init(), null;
          }),
          t
        );
      })(n.Component);
    function Y(e, t) {
      var r = {};
      for (var n in e)
        Object.prototype.hasOwnProperty.call(e, n) &&
          -1 === t.indexOf(n) &&
          (r[n] = e[n]);
      return r;
    }
    (N.propTypes = { context: I.isRequired }),
      (N.displayName = "HelmetDispatcher");
    var q = (function (e) {
      function t() {
        e.apply(this, arguments);
      }
      return (
        e && (t.__proto__ = e),
        ((t.prototype = Object.create(e && e.prototype)).constructor = t),
        (t.prototype.shouldComponentUpdate = function (e) {
          return !i()(this.props, e);
        }),
        (t.prototype.mapNestedChildrenToProps = function (e, t) {
          if (!t) return null;
          switch (e.type) {
            case d.SCRIPT:
            case d.NOSCRIPT:
              return { innerHTML: t };
            case d.STYLE:
              return { cssText: t };
            default:
              throw new Error(
                "<" +
                  e.type +
                  " /> elements are self-closing and can not contain children. Refer to our API for more information."
              );
          }
        }),
        (t.prototype.flattenArrayTypeChildren = function (e) {
          var t,
            r = e.child,
            n = e.arrayTypeChildren;
          return Object.assign(
            {},
            n,
            (((t = {})[r.type] = (n[r.type] || []).concat([
              Object.assign(
                {},
                e.newChildProps,
                this.mapNestedChildrenToProps(r, e.nestedChildren)
              ),
            ])),
            t)
          );
        }),
        (t.prototype.mapObjectTypeChildren = function (e) {
          var t,
            r,
            n = e.child,
            o = e.newProps,
            a = e.newChildProps,
            i = e.nestedChildren;
          switch (n.type) {
            case d.TITLE:
              return Object.assign({}, o, (((t = {})[n.type] = i), t), {
                titleAttributes: Object.assign({}, a),
              });
            case d.BODY:
              return Object.assign({}, o, {
                bodyAttributes: Object.assign({}, a),
              });
            case d.HTML:
              return Object.assign({}, o, {
                htmlAttributes: Object.assign({}, a),
              });
            default:
              return Object.assign(
                {},
                o,
                (((r = {})[n.type] = Object.assign({}, a)), r)
              );
          }
        }),
        (t.prototype.mapArrayTypeChildrenToProps = function (e, t) {
          var r = Object.assign({}, t);
          return (
            Object.keys(e).forEach(function (t) {
              var n;
              r = Object.assign({}, r, (((n = {})[t] = e[t]), n));
            }),
            r
          );
        }),
        (t.prototype.warnOnInvalidChildren = function (e, t) {
          return (
            s()(
              y.some(function (t) {
                return e.type === t;
              }),
              "function" == typeof e.type
                ? "You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information."
                : "Only elements types " +
                    y.join(", ") +
                    " are allowed. Helmet does not support rendering <" +
                    e.type +
                    "> elements. Refer to our API for more information."
            ),
            s()(
              !t ||
                "string" == typeof t ||
                (Array.isArray(t) &&
                  !t.some(function (e) {
                    return "string" != typeof e;
                  })),
              "Helmet expects a string as a child of <" +
                e.type +
                ">. Did you forget to wrap your children in braces? ( <" +
                e.type +
                ">{``}</" +
                e.type +
                "> ) Refer to our API for more information."
            ),
            !0
          );
        }),
        (t.prototype.mapChildrenToProps = function (e, t) {
          var r = this,
            n = {};
          return (
            o.a.Children.forEach(e, function (e) {
              if (e && e.props) {
                var o = e.props,
                  a = o.children,
                  i = Y(o, ["children"]),
                  c = Object.keys(i).reduce(function (e, t) {
                    return (e[m[t] || t] = i[t]), e;
                  }, {}),
                  s = e.type;
                switch (
                  ("symbol" == typeof s
                    ? (s = s.toString())
                    : r.warnOnInvalidChildren(e, a),
                  s)
                ) {
                  case d.FRAGMENT:
                    t = r.mapChildrenToProps(a, t);
                    break;
                  case d.LINK:
                  case d.META:
                  case d.NOSCRIPT:
                  case d.SCRIPT:
                  case d.STYLE:
                    n = r.flattenArrayTypeChildren({
                      child: e,
                      arrayTypeChildren: n,
                      newChildProps: c,
                      nestedChildren: a,
                    });
                    break;
                  default:
                    t = r.mapObjectTypeChildren({
                      child: e,
                      newProps: t,
                      newChildProps: c,
                      nestedChildren: a,
                    });
                }
              }
            }),
            this.mapArrayTypeChildrenToProps(n, t)
          );
        }),
        (t.prototype.render = function () {
          var e = this.props,
            t = e.children,
            r = Y(e, ["children"]),
            n = Object.assign({}, r);
          return (
            t && (n = this.mapChildrenToProps(t, n)),
            o.a.createElement(k.Consumer, null, function (e) {
              return o.a.createElement(N, Object.assign({}, n, { context: e }));
            })
          );
        }),
        t
      );
    })(n.Component);
    (q.propTypes = {
      base: l.a.object,
      bodyAttributes: l.a.object,
      children: l.a.oneOfType([l.a.arrayOf(l.a.node), l.a.node]),
      defaultTitle: l.a.string,
      defer: l.a.bool,
      encodeSpecialCharacters: l.a.bool,
      htmlAttributes: l.a.object,
      link: l.a.arrayOf(l.a.object),
      meta: l.a.arrayOf(l.a.object),
      noscript: l.a.arrayOf(l.a.object),
      onChangeClientState: l.a.func,
      script: l.a.arrayOf(l.a.object),
      style: l.a.arrayOf(l.a.object),
      title: l.a.string,
      titleAttributes: l.a.object,
      titleTemplate: l.a.string,
    }),
      (q.defaultProps = { defer: !0, encodeSpecialCharacters: !0 }),
      (q.displayName = "Helmet");
    var B = function (e) {
        var t = e.title,
          r = e.origin,
          n = void 0 === r ? "https://backgammon.siteless.co" : r,
          a = e.pathname,
          i = void 0 === a ? "/" : a,
          c = e.description,
          s = e.primaryData,
          u = e.secondaryData;
        t = void 0 === t ? "Backgammon" : "".concat(t, " | Backgammon");
        var l = n + i;
        return o.a.createElement(
          q,
          null,
          !!t && [
            o.a.createElement("title", { key: "title" }, t),
            o.a.createElement("meta", {
              key: "og:title",
              property: "og:title",
              content: t,
            }),
            o.a.createElement("meta", {
              key: "twitter:title",
              name: "twitter:title",
              value: t,
            }),
          ],
          !!l && [
            o.a.createElement("meta", {
              key: "og:url",
              property: "og:url",
              content: l,
            }),
            o.a.createElement("meta", {
              key: "twitter:url",
              name: "twitter:url",
              value: l,
            }),
          ],
          !!c && [
            o.a.createElement("meta", {
              key: "description",
              name: "description",
              content: c,
            }),
            o.a.createElement("meta", {
              key: "og:description",
              property: "og:description",
              content: c,
            }),
            o.a.createElement("meta", {
              key: "twitter:description",
              name: "twitter:description",
              value: c,
            }),
          ],
          s && [
            o.a.createElement("meta", {
              key: "twitter:label1",
              name: "twitter:label1",
              value: s.title,
            }),
            o.a.createElement("meta", {
              key: "twitter:data1",
              name: "twitter:data1",
              value: s.data,
            }),
          ],
          u && [
            o.a.createElement("meta", {
              key: "twitter:label2",
              name: "twitter:label2",
              value: u.title,
            }),
            o.a.createElement("meta", {
              key: "twitter:data2",
              name: "twitter:data2",
              value: u.data,
            }),
          ]
        );
      },
      U = {
        description:
          "Simple, effective software for facilitating engaging team retrospectives. Gain insights into your team's needs.",
        primaryData: null,
        secondaryData: null,
      };
    function K(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n);
      }
      return r;
    }
    function F(e, t, r) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    var W = {
        RETRO_INVITATION: function (e) {
          e.retroId, e.retroCreatedAt;
          var t = e.createdByUserName;
          return {
            title: "Join",
            description: "You've been invited to join a new retro.",
            primaryData: { title: "Retro", data: e.retroTitle },
            secondaryData: { title: "Created by", data: t },
          };
        },
      },
      G = function (e) {
        var t = e.type,
          r = e.data,
          n = void 0 === r ? {} : r;
        return (function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? K(r, !0).forEach(function (t) {
                  F(e, t, r[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : K(r).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(r, t)
                  );
                });
          }
          return e;
        })({}, U, {}, "function" === typeof W[t] ? W[t](n) : n);
      };
    function V(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n);
      }
      return r;
    }
    function $(e, t, r) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    t.default = function (e) {
      var t = e.linkData,
        r = e.helmetContext,
        n = e.pathname,
        a = o.a.useMemo(
          function () {
            return (function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2
                  ? V(r, !0).forEach(function (t) {
                      $(e, t, r[t]);
                    })
                  : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                      e,
                      Object.getOwnPropertyDescriptors(r)
                    )
                  : V(r).forEach(function (t) {
                      Object.defineProperty(
                        e,
                        t,
                        Object.getOwnPropertyDescriptor(r, t)
                      );
                    });
              }
              return e;
            })({}, G(t), { pathname: n });
          },
          [t, n]
        );
      return o.a.createElement(M, { context: r }, o.a.createElement(B, a));
    };
  },
]);
//# sourceMappingURL=bundle.js.map
