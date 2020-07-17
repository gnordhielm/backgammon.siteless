(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    242: function (e, t, r) {
      "use strict";
      (function (e) {
        function n(t) {
          var r;
          r =
            "undefined" !== typeof window
              ? window
              : "undefined" !== typeof self
              ? self
              : e;
          var n = "undefined" !== typeof document && document.attachEvent;
          if (!n) {
            var a = (function () {
                var e =
                  r.requestAnimationFrame ||
                  r.mozRequestAnimationFrame ||
                  r.webkitRequestAnimationFrame ||
                  function (e) {
                    return r.setTimeout(e, 20);
                  };
                return function (t) {
                  return e(t);
                };
              })(),
              o = (function () {
                var e =
                  r.cancelAnimationFrame ||
                  r.mozCancelAnimationFrame ||
                  r.webkitCancelAnimationFrame ||
                  r.clearTimeout;
                return function (t) {
                  return e(t);
                };
              })(),
              c = function (e) {
                var t = e.__resizeTriggers__,
                  r = t.firstElementChild,
                  n = t.lastElementChild,
                  a = r.firstElementChild;
                (n.scrollLeft = n.scrollWidth),
                  (n.scrollTop = n.scrollHeight),
                  (a.style.width = r.offsetWidth + 1 + "px"),
                  (a.style.height = r.offsetHeight + 1 + "px"),
                  (r.scrollLeft = r.scrollWidth),
                  (r.scrollTop = r.scrollHeight);
              },
              i = function (e) {
                if (
                  !(
                    e.target.className.indexOf("contract-trigger") < 0 &&
                    e.target.className.indexOf("expand-trigger") < 0
                  )
                ) {
                  var t = this;
                  c(this),
                    this.__resizeRAF__ && o(this.__resizeRAF__),
                    (this.__resizeRAF__ = a(function () {
                      (function (e) {
                        return (
                          e.offsetWidth != e.__resizeLast__.width ||
                          e.offsetHeight != e.__resizeLast__.height
                        );
                      })(t) &&
                        ((t.__resizeLast__.width = t.offsetWidth),
                        (t.__resizeLast__.height = t.offsetHeight),
                        t.__resizeListeners__.forEach(function (r) {
                          r.call(t, e);
                        }));
                    }));
                }
              },
              l = !1,
              s = "",
              u = "animationstart",
              m = "Webkit Moz O ms".split(" "),
              d = "webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(
                " "
              ),
              f = document.createElement("fakeelement");
            if ((void 0 !== f.style.animationName && (l = !0), !1 === l))
              for (var p = 0; p < m.length; p++)
                if (void 0 !== f.style[m[p] + "AnimationName"]) {
                  (s = "-" + m[p].toLowerCase() + "-"), (u = d[p]), (l = !0);
                  break;
                }
            var v = "resizeanim",
              y =
                "@" +
                s +
                "keyframes " +
                v +
                " { from { opacity: 0; } to { opacity: 0; } } ",
              h = s + "animation: 1ms " + v + "; ";
          }
          return {
            addResizeListener: function (e, a) {
              if (n) e.attachEvent("onresize", a);
              else {
                if (!e.__resizeTriggers__) {
                  var o = e.ownerDocument,
                    l = r.getComputedStyle(e);
                  l &&
                    "static" == l.position &&
                    (e.style.position = "relative"),
                    (function (e) {
                      if (!e.getElementById("detectElementResize")) {
                        var r =
                            (y || "") +
                            ".resize-triggers { " +
                            (h || "") +
                            'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
                          n = e.head || e.getElementsByTagName("head")[0],
                          a = e.createElement("style");
                        (a.id = "detectElementResize"),
                          (a.type = "text/css"),
                          null != t && a.setAttribute("nonce", t),
                          a.styleSheet
                            ? (a.styleSheet.cssText = r)
                            : a.appendChild(e.createTextNode(r)),
                          n.appendChild(a);
                      }
                    })(o),
                    (e.__resizeLast__ = {}),
                    (e.__resizeListeners__ = []),
                    ((e.__resizeTriggers__ = o.createElement("div")).className =
                      "resize-triggers"),
                    (e.__resizeTriggers__.innerHTML =
                      '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>'),
                    e.appendChild(e.__resizeTriggers__),
                    c(e),
                    e.addEventListener("scroll", i, !0),
                    u &&
                      ((e.__resizeTriggers__.__animationListener__ = function (
                        t
                      ) {
                        t.animationName == v && c(e);
                      }),
                      e.__resizeTriggers__.addEventListener(
                        u,
                        e.__resizeTriggers__.__animationListener__
                      ));
                }
                e.__resizeListeners__.push(a);
              }
            },
            removeResizeListener: function (e, t) {
              if (n) e.detachEvent("onresize", t);
              else if (
                (e.__resizeListeners__.splice(
                  e.__resizeListeners__.indexOf(t),
                  1
                ),
                !e.__resizeListeners__.length)
              ) {
                e.removeEventListener("scroll", i, !0),
                  e.__resizeTriggers__.__animationListener__ &&
                    (e.__resizeTriggers__.removeEventListener(
                      u,
                      e.__resizeTriggers__.__animationListener__
                    ),
                    (e.__resizeTriggers__.__animationListener__ = null));
                try {
                  e.__resizeTriggers__ = !e.removeChild(e.__resizeTriggers__);
                } catch (r) {}
              }
            },
          };
        }
        r.d(t, "a", function () {
          return n;
        });
      }.call(this, r(32)));
    },
    243: function (e, t, r) {
      e.exports = r.p + "static/media/privacy-policy.63ece846.md";
    },
    244: function (e, t, r) {
      e.exports = r.p + "static/media/terms-of-use.f03aa9ca.md";
    },
    248: function (e, t, r) {
      e.exports = r(730);
    },
    477: function (e, t, r) {},
    483: function (e, t, r) {},
    484: function (e, t, r) {},
    530: function (e, t, r) {},
    531: function (e, t, r) {},
    532: function (e, t, r) {},
    539: function (e, t, r) {},
    540: function (e, t, r) {},
    548: function (e, t, r) {},
    549: function (e, t, r) {},
    550: function (e, t, r) {},
    551: function (e, t, r) {},
    552: function (e, t, r) {},
    553: function (e, t, r) {},
    556: function (e, t, r) {},
    558: function (e, t, r) {},
    634: function (e, t, r) {},
    635: function (e, t, r) {},
    636: function (e, t, r) {},
    637: function (e, t, r) {},
    638: function (e, t, r) {},
    639: function (e, t, r) {},
    640: function (e, t, r) {},
    641: function (e, t, r) {},
    642: function (e, t, r) {},
    643: function (e, t, r) {},
    644: function (e, t, r) {},
    724: function (e, t, r) {},
    725: function (e, t, r) {},
    726: function (e, t, r) {},
    727: function (e, t, r) {},
    728: function (e, t, r) {},
    729: function (e, t, r) {},
    730: function (e, t, r) {
      "use strict";
      r.r(t);
      r(249), r(468);
      var n = r(0),
        a = r.n(n),
        o = r(72),
        c = r.n(o),
        i = r(29),
        l = r(120),
        s = function (e) {
          var t = e.title,
            r = e.origin,
            n =
              void 0 === r
                ? window
                  ? window.location.origin
                  : "https://backgammon.siteless.co"
                : r,
            o = e.pathname,
            c = void 0 === o ? "/" : o,
            i = e.description,
            s = e.primaryData,
            u = e.secondaryData;
          t = void 0 === t ? "Backgammon" : "".concat(t, " | Backgammon");
          var m = n + c;
          return a.a.createElement(
            l.a,
            null,
            !!t && [
              a.a.createElement("title", { key: "title" }, t),
              a.a.createElement("meta", {
                key: "og:title",
                property: "og:title",
                content: t,
              }),
              a.a.createElement("meta", {
                key: "twitter:title",
                name: "twitter:title",
                value: t,
              }),
            ],
            !!m && [
              a.a.createElement("meta", {
                key: "og:url",
                property: "og:url",
                content: m,
              }),
              a.a.createElement("meta", {
                key: "twitter:url",
                name: "twitter:url",
                value: m,
              }),
            ],
            !!i && [
              a.a.createElement("meta", {
                key: "description",
                name: "description",
                content: i,
              }),
              a.a.createElement("meta", {
                key: "og:description",
                property: "og:description",
                content: i,
              }),
              a.a.createElement("meta", {
                key: "twitter:description",
                name: "twitter:description",
                value: i,
              }),
            ],
            s && [
              a.a.createElement("meta", {
                key: "twitter:label1",
                name: "twitter:label1",
                value: s.title,
              }),
              a.a.createElement("meta", {
                key: "twitter:data1",
                name: "twitter:data1",
                value: s.data,
              }),
            ],
            u && [
              a.a.createElement("meta", {
                key: "twitter:label2",
                name: "twitter:label2",
                value: u.title,
              }),
              a.a.createElement("meta", {
                key: "twitter:data2",
                name: "twitter:data2",
                value: u.data,
              }),
            ]
          );
        },
        u = r(733),
        m = r(732);
      r(9);
      r(477);
      var d = r(60),
        f = a.a.createContext(null),
        p = function () {
          return Object(n.useContext)(f).user;
        },
        v = r(46),
        y = r.n(v);
      function h(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      var b = [
          { hour: 17, name: "evening" },
          { hour: 12, name: "afternoon" },
          { hour: 4, name: "morning" },
          { hour: 0, name: "evening" },
        ],
        g = function (e) {
          var t,
            r = parseInt(e.format("H"));
          for (var n in b) {
            if (b[(t = n)].hour <= r) break;
          }
          return t;
        },
        E = function () {
          var e = h(
              a.a.useState(function () {
                return g(y()());
              }),
              2
            ),
            t = e[0],
            r = e[1];
          return (
            a.a.useEffect(
              function () {
                var e = (function (e) {
                    return e - 1 < 0 ? b.length - 1 : e - 1;
                  })(t),
                  n = (function (e, t) {
                    var r = y()(String(t), "H"),
                      n = r.diff(e);
                    return n < 0 && (r.add(1, "day"), (n = r.diff(e))), n;
                  })(y()(), b[e].hour),
                  a = setTimeout(function () {
                    r(e);
                  }, n);
                return function () {
                  clearTimeout(a);
                };
              },
              [t, r]
            ),
            a.a.useEffect(function () {
              var e = function () {
                r(g(y()()));
              };
              return (
                window.addEventListener("focus", e),
                function () {
                  window.removeEventListener("focus", e);
                }
              );
            }, []),
            b[t].name
          );
        },
        O = (r(478), r(481), r(61)),
        w = r.n(O);
      w.a.initializeApp({
        apiKey: "AIzaSyDogGAlzpxxKvOos0IIyFS3LIJQd6Msuwc",
        authDomain: "backgammon.siteless.co",
        databaseURL: "https://backgammon-siteless.firebaseio.com",
        projectId: "backgammon-siteless",
        storageBucket: "backgammon-siteless.appspot.com",
        messagingSenderId: "837131481016",
      }),
        w.a.auth().useDeviceLanguage();
      var _ = w.a.firestore(),
        k = { timestamp: w.a.firestore.Timestamp },
        N = new w.a.auth.GoogleAuthProvider();
      function j(e, t) {
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
      function I(e, t, r) {
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
      function C(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) {
              for (var t = 0, r = new Array(e.length); t < e.length; t++)
                r[t] = e[t];
              return r;
            }
          })(e) ||
          (function (e) {
            if (
              Symbol.iterator in Object(e) ||
              "[object Arguments]" === Object.prototype.toString.call(e)
            )
              return Array.from(e);
          })(e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance"
            );
          })()
        );
      }
      function x(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      var P = function (e) {
          var t = e.collection,
            r = e.query,
            a = x(Object(n.useState)(null), 2),
            o = a[0],
            c = a[1];
          return (
            Object(n.useEffect)(
              function () {
                var e;
                if (null !== r)
                  return (e = _.collection(t)).where
                    .apply(e, C(r))
                    .onSnapshot(function (e) {
                      var t = [];
                      e.forEach(function (e) {
                        t.push(
                          (function (e) {
                            for (var t = 1; t < arguments.length; t++) {
                              var r = null != arguments[t] ? arguments[t] : {};
                              t % 2
                                ? j(r, !0).forEach(function (t) {
                                    I(e, t, r[t]);
                                  })
                                : Object.getOwnPropertyDescriptors
                                ? Object.defineProperties(
                                    e,
                                    Object.getOwnPropertyDescriptors(r)
                                  )
                                : j(r).forEach(function (t) {
                                    Object.defineProperty(
                                      e,
                                      t,
                                      Object.getOwnPropertyDescriptor(r, t)
                                    );
                                  });
                            }
                            return e;
                          })({ id: e.id }, e.data())
                        );
                      }),
                        c(t);
                    });
                c(null);
              },
              [r, t, c]
            ),
            o
          );
        },
        S = "light",
        A = "dark",
        T = "#F4B24E",
        R = "var(--positiveColor)",
        D = "#E1476C",
        L = "var(--actionColor)";
      r(483);
      var M = "RETRO_INVITATION",
        U = !Object({
          NODE_ENV: "production",
          PUBLIC_URL: "",
          REACT_APP_GIT_COMMIT_HASH: "1bca772",
          REACT_APP_apiKey: "AIzaSyDogGAlzpxxKvOos0IIyFS3LIJQd6Msuwc",
          REACT_APP_authDomain: "backgammon.siteless.co",
          REACT_APP_databaseURL: "https://backgammon-siteless.firebaseio.com",
          REACT_APP_projectId: "backgammon-siteless",
          REACT_APP_storageBucket: "backgammon-siteless.appspot.com",
          REACT_APP_messagingSenderId: "837131481016",
          REACT_APP_appId: "1:837131481016:web:f533b7bd4d9c9d5d",
        }).REACT_APP_PRODUCTION_TRIP,
        z = {
          stage: {
            key: "stage",
            displayName: "Staging",
            description: "Retro is in a pending state so new members can join.",
            isVisibleToTracker: !1,
          },
          collect: {
            key: "collect",
            displayName: "Collect",
            advanceToMessage: "Begin Retro",
            isVisibleToTracker: !0,
            description: "Members add cards to the retro.",
          },
          review: {
            key: "review",
            displayName: "Review",
            isVisibleToTracker: !0,
            description: "Members review and cull cards.",
          },
          vote: {
            key: "vote",
            displayName: "Vote",
            isVisibleToTracker: !0,
            description: "Members vote on cards they'd like to discuss.",
          },
          resolve: {
            key: "resolve",
            displayName: "Resolve",
            isVisibleToTracker: !0,
            description:
              "Members discuss marked cards and create action items.",
          },
          complete: {
            key: "complete",
            displayName: "Complete",
            advanceToMessage: "Complete Retro",
            isVisibleToTracker: !1,
            description: "Retro has been completed.",
          },
        },
        B = {
          0: a.a.createElement(
            a.a.Fragment,
            null,
            a.a.createElement("div", null, "No positive cards."),
            a.a.createElement("div", null, "Yet \ud83e\udd29")
          ),
          1: a.a.createElement(
            a.a.Fragment,
            null,
            a.a.createElement("div", null, "No neutral cards."),
            a.a.createElement("div", null, "Huh.")
          ),
          2: a.a.createElement(
            a.a.Fragment,
            null,
            a.a.createElement("div", null, "No negative cards."),
            a.a.createElement("div", null, "That's a problem...")
          ),
        };
      r(484);
      var F,
        V = r(59),
        H = { style: {} };
      document &&
        (((H = document.createElement("div")).className = "l1lkddnw"),
        (H.innerHTML = '<div class="__line-spinner"></div>'),
        (H.style.zIndex = -1),
        (H.style.visibility = "hidden"),
        document.body.appendChild(H));
      var q = {},
        W = function () {
          return (
            a.a.useEffect(function () {
              var e = Object(V.uniqueId)();
              return (
                (q[e] = "HOLD"),
                function () {
                  delete q[e];
                }
              );
            }),
            a.a.useEffect(function () {
              return (
                Object.values(q).some(function (e) {
                  return "HOLD" === e;
                }) &&
                  (clearTimeout(F),
                  (H.style.zIndex = 10),
                  (H.style.visibility = "visible")),
                function () {
                  Object.values(q).every(function (e) {
                    return "HOLD" !== e;
                  }) &&
                    (clearTimeout(F),
                    (F = setTimeout(function () {
                      (H.style.zIndex = -1), (H.style.visibility = "hidden");
                    }, 200)));
                }
              );
            }),
            null
          );
        };
      function G(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      var Y = function (e) {
          for (
            var t = e.votes,
              r = void 0 === t ? {} : t,
              n = 0,
              a = 0,
              o = Object.values(r);
            a < o.length;
            a++
          ) {
            n += o[a];
          }
          return n;
        },
        J = [
          function (e, t) {
            return Y(t) - Y(e);
          },
          function (e, t) {
            var r = function (e) {
              var t = e.votes,
                r = void 0 === t ? {} : t;
              return Object.keys(r).length;
            };
            return r(t) - r(e);
          },
          function (e, t) {
            return e.createdAt.seconds - t.createdAt.seconds;
          },
        ],
        K = function (e) {
          var t = Object.entries(e)
            .slice()
            .sort(function (e, t) {
              for (var r = 0, n = J; r < n.length; r++) {
                var a = (0, n[r])(e[1], t[1]);
                if (0 !== a) return a;
              }
              return 0;
            });
          return (t = (t = (t = t.filter(function (e) {
            var t = G(e, 2),
              r = (t[0], t[1]);
            return !!Y(r);
          })).slice(0, 7)).map(function (e) {
            return G(e, 1)[0];
          }));
        },
        Q = r(235),
        X = r.n(Q);
      function Z(e, t) {
        if (null == e) return {};
        var r,
          n,
          a = (function (e, t) {
            if (null == e) return {};
            var r,
              n,
              a = {},
              o = Object.keys(e);
            for (n = 0; n < o.length; n++)
              (r = o[n]), t.indexOf(r) >= 0 || (a[r] = e[r]);
            return a;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (n = 0; n < o.length; n++)
            (r = o[n]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (a[r] = e[r]));
        }
        return a;
      }
      function $(e, t) {
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
      function ee(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? $(r, !0).forEach(function (t) {
                te(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : $(r).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      function te(e, t, r) {
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
      function re(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) {
              for (var t = 0, r = new Array(e.length); t < e.length; t++)
                r[t] = e[t];
              return r;
            }
          })(e) ||
          (function (e) {
            if (
              Symbol.iterator in Object(e) ||
              "[object Arguments]" === Object.prototype.toString.call(e)
            )
              return Array.from(e);
          })(e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance"
            );
          })()
        );
      }
      function ne(e, t, r, n, a, o, c) {
        try {
          var i = e[o](c),
            l = i.value;
        } catch (s) {
          return void r(s);
        }
        i.done ? t(l) : Promise.resolve(l).then(n, a);
      }
      function ae(e) {
        return function () {
          var t = this,
            r = arguments;
          return new Promise(function (n, a) {
            var o = e.apply(t, r);
            function c(e) {
              ne(o, n, a, c, i, "next", e);
            }
            function i(e) {
              ne(o, n, a, c, i, "throw", e);
            }
            c(void 0);
          });
        };
      }
      var oe = (function () {
          var e = ae(
            regeneratorRuntime.mark(function e(t) {
              var r, n, a, o, c, i;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.user),
                        (n = t.title),
                        (a = {
                          title: void 0 === n ? "Untitled retro" : n,
                          memberUserIds: [],
                          createdByUserId: r.id,
                          createdAt: k.timestamp.fromDate(new Date()),
                          phase: z.stage.key,
                        }),
                        (e.next = 4),
                        _.collection("retros").add(a)
                      );
                    case 4:
                      return (
                        (o = e.sent),
                        (c = {
                          createdByUserName: r.handle,
                          retroCreatedAt: a.createdAt,
                          retroId: o.id,
                          retroTitle: a.title,
                          type: M,
                        }),
                        (e.next = 8),
                        _.collection("links").add(c)
                      );
                    case 8:
                      return (
                        (i = e.sent),
                        (e.next = 11),
                        o.set({ joinLinkId: i.id }, { merge: !0 })
                      );
                    case 11:
                      return e.abrupt("return", o);
                    case 12:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        ce = (function () {
          var e = ae(
            regeneratorRuntime.mark(function e(t) {
              var r, n, a;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.memberUserIds),
                        (n = t.retroId),
                        (e.next = 3),
                        _.collection("retros")
                          .doc(n)
                          .set({ memberUserIds: r }, { merge: !0 })
                      );
                    case 3:
                      return (a = e.sent), e.abrupt("return", a);
                    case 5:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        ie = (function () {
          var e = ae(
            regeneratorRuntime.mark(function e(t) {
              var r, n, a, o, c;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.retroId),
                        (n = t.userId),
                        (e.next = 3),
                        _.collection("retros").doc(r)
                      );
                    case 3:
                      return (a = e.sent), (e.next = 6), a.get();
                    case 6:
                      return (
                        (o = e.sent.data().memberUserIds),
                        (c = X()([].concat(re(o), [n]))),
                        (e.next = 10),
                        a.set({ memberUserIds: c }, { merge: !0 })
                      );
                    case 10:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        le = (function () {
          var e = ae(
            regeneratorRuntime.mark(function e(t) {
              var r, n, a, o, c;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.title),
                        (n = t.retroId),
                        (e.next = 3),
                        _.collection("retros").doc(n)
                      );
                    case 3:
                      return (
                        (a = e.sent),
                        (e.next = 6),
                        a.set({ title: r }, { merge: !0 })
                      );
                    case 6:
                      return (e.next = 8), a.get();
                    case 8:
                      return (
                        (o = e.sent.data().joinLinkId),
                        (e.next = 11),
                        _.collection("links").doc(o)
                      );
                    case 11:
                      return (
                        (c = e.sent),
                        (e.next = 14),
                        c.set({ retroTitle: r }, { merge: !0 })
                      );
                    case 14:
                      return e.abrupt("return", a);
                    case 15:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        se = (function () {
          var e = ae(
            regeneratorRuntime.mark(function e(t) {
              var r, n, a, o, c, i;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.phase),
                        (n = t.retroId),
                        (a = { phase: r }),
                        (e.next = 4),
                        _.collection("retros").doc(n)
                      );
                    case 4:
                      (o = e.sent),
                        (e.t0 = r),
                        (e.next =
                          e.t0 === z.resolve.key
                            ? 8
                            : e.t0 === z.complete.key
                            ? 18
                            : 20);
                      break;
                    case 8:
                      return (e.next = 10), o.get();
                    case 10:
                      if (((c = e.sent), c.data().phase !== z.vote.key)) {
                        e.next = 17;
                        break;
                      }
                      return (
                        (e.next = 15),
                        o
                          .collection("cards")
                          .get()
                          .then(function (e) {
                            var t = {};
                            return (
                              e.forEach(function (e) {
                                t[e.id] = e.data();
                              }),
                              t
                            );
                          })
                      );
                    case 15:
                      (i = e.sent), (a.cardsInScope = K(i));
                    case 17:
                      return e.abrupt("break", 21);
                    case 18:
                      return (
                        (a.completedAt = k.timestamp.fromDate(new Date())),
                        e.abrupt("break", 21)
                      );
                    case 20:
                      return e.abrupt("break", 21);
                    case 21:
                      return o.set(a, { merge: !0 }), e.abrupt("return", o);
                    case 23:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        ue = (function () {
          var e = ae(
            regeneratorRuntime.mark(function e(t) {
              var r, n, a, o, c, i;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.userId),
                        (n = t.retroId),
                        (a = t.body),
                        (o = t.columnId),
                        (c = {
                          columnId: o,
                          body: a,
                          createdByUserId: r,
                          createdAt: k.timestamp.fromDate(new Date()),
                        }),
                        (e.next = 4),
                        _.collection("retros").doc(n).collection("cards").add(c)
                      );
                    case 4:
                      return (i = e.sent), e.abrupt("return", i);
                    case 6:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        me = (function () {
          var e = ae(
            regeneratorRuntime.mark(function e(t) {
              var r, n;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.retroId),
                        (n = t.cardId),
                        (e.next = 3),
                        _.collection("retros")
                          .doc(r)
                          .collection("cards")
                          .doc(n)
                          .delete()
                      );
                    case 3:
                      return e.abrupt("return", e.sent);
                    case 4:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        de = (function () {
          var e = ae(
            regeneratorRuntime.mark(function e(t) {
              var r, n, a, o;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.retroId),
                        (n = t.cardId),
                        (a = t.moveToColumnId),
                        (e.next = 3),
                        _.collection("retros")
                          .doc(r)
                          .collection("cards")
                          .doc(n)
                          .set(
                            {
                              columnId: a,
                              createdAt: k.timestamp.fromDate(new Date()),
                            },
                            { merge: !0 }
                          )
                      );
                    case 3:
                      return (o = e.sent), e.abrupt("return", o);
                    case 5:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        fe = (function () {
          var e = ae(
            regeneratorRuntime.mark(function e(t) {
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (e.next = 2), _.collection("retros").doc(t).delete()
                      );
                    case 2:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        pe = (function () {
          var e = ae(
            regeneratorRuntime.mark(function e(t) {
              var r, n, a, o, c, i, l, s;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.retroId),
                        (n = t.userId),
                        (a = t.voteCount),
                        (o = t.cardId),
                        (e.next = 3),
                        _.collection("retros").doc(r).collection("cards").doc(o)
                      );
                    case 3:
                      return (c = e.sent), (e.next = 6), c.get();
                    case 6:
                      return (
                        (i = e.sent),
                        (l = i.data()),
                        (s = l.votes || {}),
                        (e.next = 11),
                        c.set({ votes: ee({}, s, te({}, n, a)) }, { merge: !0 })
                      );
                    case 11:
                      return e.abrupt("return", c);
                    case 12:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        ve = (function () {
          var e = ae(
            regeneratorRuntime.mark(function e(t) {
              var r, n, a, o, c, i, l, s, u, m, d, f;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.mergeDestination),
                        (n = t.mergeOrigin),
                        (a = t.retroId),
                        (e.next = 3),
                        _.collection("retros").doc(a).collection("cards").doc(n)
                      );
                    case 3:
                      return (o = e.sent), (e.next = 6), o.get();
                    case 6:
                      return (
                        (c = e.sent),
                        (i = ee({ id: n }, c.data())),
                        (l = i.mergedCards),
                        (s = void 0 === l ? [] : l),
                        (u = Z(i, ["mergedCards"])),
                        (e.next = 10),
                        _.collection("retros").doc(a).collection("cards").doc(r)
                      );
                    case 10:
                      return (m = e.sent), (e.next = 13), m.get();
                    case 13:
                      return (
                        (d = e.sent),
                        (f = d.data()),
                        (e.next = 17),
                        m.set(
                          {
                            mergedCards: [].concat(
                              re(f.mergedCards || []),
                              [u],
                              re(s)
                            ),
                          },
                          { merge: !0 }
                        )
                      );
                    case 17:
                      return (e.next = 19), o.delete();
                    case 19:
                      return e.abrupt("return", m);
                    case 20:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        ye = (function () {
          var e = ae(
            regeneratorRuntime.mark(function e(t) {
              var r, n, a, o, c, i, l;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.retroId),
                        (n = t.cardId),
                        (e.next = 3),
                        _.collection("retros").doc(r)
                      );
                    case 3:
                      return (a = e.sent), (e.next = 6), a.get();
                    case 6:
                      return (
                        (o = e.sent),
                        (c = o.data()),
                        (i = c.cardsInScope),
                        (l = void 0 === i ? [] : i),
                        (e.next = 10),
                        a.set(
                          { cardsInScope: [].concat(re(l), [n]) },
                          { merge: !0 }
                        )
                      );
                    case 10:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        he = (function () {
          var e = ae(
            regeneratorRuntime.mark(function e(t) {
              var r, n, a, o, c, i, l;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.retroId),
                        (n = t.cardId),
                        (e.next = 3),
                        _.collection("retros").doc(r)
                      );
                    case 3:
                      return (a = e.sent), (e.next = 6), a.get();
                    case 6:
                      return (
                        (o = e.sent),
                        (c = o.data()),
                        (i = c.cardsInScope),
                        (l = void 0 === i ? [] : i),
                        (e.next = 10),
                        a.set(
                          {
                            cardsInScope: l.filter(function (e) {
                              return e !== n;
                            }),
                          },
                          { merge: !0 }
                        )
                      );
                    case 10:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        be = (function () {
          var e = ae(
            regeneratorRuntime.mark(function e(t) {
              var r, n, a, o;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.retroId),
                        (n = t.body),
                        (a = {
                          body: n,
                          createdAt: k.timestamp.fromDate(new Date()),
                        }),
                        (e.next = 4),
                        _.collection("retros")
                          .doc(r)
                          .collection("actionItems")
                          .add(a)
                      );
                    case 4:
                      return (o = e.sent), e.abrupt("return", o);
                    case 6:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        ge = (function () {
          var e = ae(
            regeneratorRuntime.mark(function e(t) {
              var r, n;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.retroId),
                        (n = t.itemId),
                        (e.next = 3),
                        _.collection("retros")
                          .doc(r)
                          .collection("actionItems")
                          .doc(n)
                          .delete()
                      );
                    case 3:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        Ee = (function () {
          var e = ae(
            regeneratorRuntime.mark(function e(t) {
              var r, n, a, o;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.userId),
                        (n = t.retroId),
                        (a = t.changes),
                        (e.next = 3),
                        _.collection("retros")
                          .doc(n)
                          .collection("userInteractionState")
                          .doc(r)
                      );
                    case 3:
                      return (
                        (o = e.sent), (e.next = 6), o.set(a, { merge: !0 })
                      );
                    case 6:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        Oe = function (e) {
          window.alert(e);
        },
        we = "rrl2ljc",
        _e = "btm46mo",
        ke = "fvn5cvs";
      r(530);
      var Ne = r(4);
      function je() {
        return (je =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          }).apply(this, arguments);
      }
      function Ie(e, t) {
        if (null == e) return {};
        var r,
          n,
          a = (function (e, t) {
            if (null == e) return {};
            var r,
              n,
              a = {},
              o = Object.keys(e);
            for (n = 0; n < o.length; n++)
              (r = o[n]), t.indexOf(r) >= 0 || (a[r] = e[r]);
            return a;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (n = 0; n < o.length; n++)
            (r = o[n]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (a[r] = e[r]));
        }
        return a;
      }
      var Ce = function (e) {
        var t = e.children,
          r = e.className,
          n = Ie(e, ["children", "className"]);
        return a.a.createElement(
          "div",
          je({ className: Object(Ne.makeClassName)(we, r) }, n),
          t
        );
      };
      (Ce.displayName = "Page"),
        (Ce.Bar = function (e) {
          var t = e.children,
            r = e.className,
            n = e.nudge,
            o = void 0 !== n && n,
            c = Ie(e, ["children", "className", "nudge"]);
          return a.a.createElement(
            "div",
            je(
              { className: Object(Ne.makeClassName)(_e, o && "--nudge", r) },
              c
            ),
            t
          );
        }),
        (Ce.Fill = function (e) {
          var t = e.children,
            r = e.className,
            n = e.nudge,
            o = void 0 !== n && n,
            c = e.centerVertical,
            i = void 0 !== c && c,
            l = e.centerHorizontal,
            s = void 0 !== l && l,
            u = Ie(e, [
              "children",
              "className",
              "nudge",
              "centerVertical",
              "centerHorizontal",
            ]);
          return a.a.createElement(
            "div",
            je(
              {
                className: Object(Ne.makeClassName)(
                  ke,
                  o && "--nudge",
                  i && "--center-vertical",
                  s && "--center-horizontal",
                  r
                ),
              },
              u
            ),
            t
          );
        });
      var xe = Ce;
      function Pe(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      r(531);
      var Se = function (e) {
        var t = Pe(Object(n.useState)(null), 2),
          r = t[0],
          a = t[1];
        return (
          Object(n.useEffect)(
            function () {
              if (null !== e)
                return _.collection(e).onSnapshot(function (e) {
                  var t = {};
                  e.forEach(function (e) {
                    t[e.id] = e.data();
                  }),
                    a(t);
                });
              a(null);
            },
            [e, a]
          ),
          r
        );
      };
      function Ae() {
        return (Ae =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          }).apply(this, arguments);
      }
      function Te(e, t) {
        if (null == e) return {};
        var r,
          n,
          a = (function (e, t) {
            if (null == e) return {};
            var r,
              n,
              a = {},
              o = Object.keys(e);
            for (n = 0; n < o.length; n++)
              (r = o[n]), t.indexOf(r) >= 0 || (a[r] = e[r]);
            return a;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (n = 0; n < o.length; n++)
            (r = o[n]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (a[r] = e[r]));
        }
        return a;
      }
      r(532);
      var Re = function (e) {
        var t = e.text,
          r = e.onClick,
          n = e.isLoading,
          o = e.isDisabled,
          c = e.className,
          i = e.standalone,
          l = e.children,
          s = e.confirmMessage,
          u = e.faded,
          m = void 0 !== u && u,
          d = Te(e, [
            "text",
            "onClick",
            "isLoading",
            "isDisabled",
            "className",
            "standalone",
            "children",
            "confirmMessage",
            "faded",
          ]),
          f = !(n || o);
        return a.a.createElement(
          "span",
          Ae(
            {
              className: Object(Ne.makeClassName)(
                "auqi3da",
                c,
                i && "--standalone",
                m && "--faded"
              ),
              onClick: function (e) {
                r && f && (!s || window.confirm(s)) && r(e);
              },
            },
            d
          ),
          l || t
        );
      };
      Re.displayName = "Action";
      var De = Re;
      function Le(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      var Me = function (e) {
          var t = e.value,
            r = e.fallback,
            n = void 0 === r ? "" : r,
            o = Le(
              a.a.useState(function () {
                return Date.now();
              }),
              2
            ),
            c = o[0],
            i = o[1];
          return (
            a.a.useLayoutEffect(
              function () {
                var e = setTimeout(function () {
                  i(function () {
                    return Date.now();
                  });
                }, 6e4);
                return function () {
                  clearInterval(e);
                };
              },
              [c, t]
            ),
            a.a.useMemo(
              function () {
                return t ? y.a.duration(t - c).humanize(!0) : n;
              },
              [t, c, n]
            )
          );
        },
        Ue = function (e) {
          var t = e.className,
            r = e.title,
            n = e.id,
            o = e.memberUserIds,
            c = e.createdByUserId,
            i = e.history,
            l = e.isActive,
            s = void 0 !== l && l,
            u = e.completedAt,
            m = e.isOwner,
            d = (e.createdAt, e.phase, p()),
            f = a.a.useCallback(
              function () {
                window.confirm(
                  "Are you sure you want to delete this retro? This action cannot be undone."
                ) && fe(n);
              },
              [n]
            ),
            v = a.a.useCallback(
              function () {
                window.confirm(
                  "Are you sure you want to leave this retro? This action cannot be undone."
                ) &&
                  ce({
                    retroId: n,
                    memberUserIds: o.filter(function (e) {
                      return e !== d.id;
                    }),
                  });
              },
              [n, o, d]
            ),
            y = Se("users"),
            h = a.a.useCallback(
              function () {
                i.push("".concat("/retro", "/").concat(n));
              },
              [n, i]
            );
          return y
            ? a.a.createElement(
                "div",
                { className: Object(Ne.makeClassName)("rwyhgg8", t) },
                a.a.createElement(
                  "div",
                  { className: "__body", onClick: h },
                  a.a.createElement("div", { className: "__title" }, r),
                  a.a.createElement(
                    "div",
                    { className: "__details" },
                    a.a.createElement(
                      "div",
                      { className: "__item" },
                      Object(Ne.pluralize)({
                        count: o.length + 1,
                        noun: "member",
                      }),
                      ", created by",
                      " ",
                      m ? "you" : (y[c] || {}).handle,
                      "."
                    ),
                    a.a.createElement(
                      "div",
                      { className: "__item" },
                      s
                        ? a.a.createElement(
                            "span",
                            { className: "-action-color" },
                            "In progress."
                          )
                        : a.a.createElement(
                            a.a.Fragment,
                            null,
                            "Completed ",
                            a.a.createElement(Me, { value: 1e3 * u.seconds }),
                            "."
                          )
                    )
                  )
                ),
                a.a.createElement(
                  "div",
                  { className: "__footer" },
                  m
                    ? a.a.createElement(
                        De,
                        { faded: !0, className: "__action", onClick: f },
                        "Delete"
                      )
                    : a.a.createElement(
                        De,
                        { faded: !0, className: "__action", onClick: v },
                        "Leave"
                      )
                )
              )
            : a.a.createElement(W, null);
        };
      Ue.displayName = "RetroItem";
      var ze = Object(d.e)(Ue);
      r(539);
      var Be = function () {
          return Object(n.useContext)(f).logOut;
        },
        Fe = "c13b0u3u",
        Ve = "o1580tn";
      r(540);
      var He = r(237),
        qe = r.n(He),
        We = function (e) {
          var t = e.onClose,
            r = e.isOpen,
            n = void 0 !== r && r,
            o = e.children,
            c = e.className;
          return a.a.createElement(
            qe.a,
            {
              overlayClassName: Ve,
              className: Fe,
              isOpen: n,
              onRequestClose: t,
              ariaHideApp: !1,
              shouldCloseOnOverlayClick: !1,
              closeTimeoutMS: 400,
            },
            a.a.createElement(
              xe,
              { className: "__page" },
              a.a.createElement(
                xe.Bar,
                { className: "__bar" },
                a.a.createElement(De, { onClick: t }, "Close")
              ),
              a.a.createElement(
                xe.Fill,
                { className: Object(Ne.makeClassName)("__fill", c) },
                o()
              )
            )
          );
        };
      We.displayName = "Curtain";
      var Ge = We,
        Ye = "bfkgsdd",
        Je = "c1dxy0d5";
      r(548);
      var Ke = a.a.createContext(!1),
        Qe = function () {
          return a.a.useContext(Ke);
        };
      function Xe(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      var Ze = [
          a.a.createElement(
            i.b,
            {
              to: "/privacy-policy",
              target: "_blank",
              rel: "noopener noreferrer",
            },
            "Privacy Policy"
          ),
          a.a.createElement(
            "span",
            null,
            "Built by",
            " ",
            a.a.createElement(
              "a",
              {
                href: "https://gus.siteless.co",
                target: "_blank",
                rel: "noopener noreferrer",
              },
              "Gus"
            )
          ),
          a.a.createElement("span", null, "Build ", "1bca772"),
        ],
        $e = function (e) {
          var t = e.history,
            r = e.match,
            n = e.title,
            o = e.offerBack,
            c = void 0 !== o && o,
            i = e.contextActions,
            l = void 0 === i ? null : i,
            s = Be(),
            u = Xe(a.a.useState(!1), 2),
            m = u[0],
            d = u[1];
          a.a.useEffect(
            function () {
              if (m) {
                var e = function (e) {
                  "Escape" === e.key && d(!1);
                };
                return (
                  document &&
                    document.addEventListener &&
                    document.addEventListener("keydown", e),
                  function () {
                    document &&
                      document.removeEventListener &&
                      document.removeEventListener("keydown", e);
                  }
                );
              }
            },
            [m]
          );
          var f = a.a.useCallback(
              function (e) {
                return function () {
                  d(!1), t.push(e);
                };
              },
              [t]
            ),
            p = Qe();
          return a.a.createElement(
            a.a.Fragment,
            null,
            a.a.createElement(
              Ge,
              {
                isOpen: m,
                onClose: function () {
                  d(!1);
                },
              },
              function () {
                return a.a.createElement(
                  "div",
                  { className: Object(Ne.makeClassName)(Je, m && "--open") },
                  a.a.createElement(
                    "div",
                    { className: "__main" },
                    a.a.createElement(De, {
                      className: "__action",
                      standalone: !0,
                      onClick: s,
                      text: "Sign Out",
                    }),
                    "/account-settings" !== (r || {}).path &&
                      a.a.createElement(De, {
                        className: "__action",
                        standalone: !0,
                        onClick: f("/account-settings"),
                        text: "Settings",
                      })
                  ),
                  a.a.createElement(
                    "div",
                    { className: "__footer" },
                    Ze.map(function (e, t) {
                      return a.a.createElement(
                        a.a.Fragment,
                        { key: t },
                        t > 0 &&
                          a.a.createElement(
                            "span",
                            { className: "__divider" },
                            "\u2022"
                          ),
                        a.a.createElement("span", null, e)
                      );
                    })
                  )
                );
              }
            ),
            a.a.createElement(
              "div",
              { className: Ye },
              c &&
                a.a.createElement(
                  "div",
                  { className: "__left" },
                  a.a.createElement(De, {
                    onClick: function () {
                      p();
                    },
                    text: "Back",
                  })
                ),
              a.a.createElement(
                "span",
                {
                  className: Object(Ne.makeClassName)(
                    "__title",
                    c && "--centered"
                  ),
                },
                n
              ),
              a.a.createElement(
                "div",
                { className: "__right" },
                l,
                a.a.createElement(
                  De,
                  {
                    onClick: function () {
                      d(function (e) {
                        return !e;
                      });
                    },
                  },
                  "Menu"
                )
              )
            )
          );
        };
      $e.propTypes = {};
      var et = Object(d.e)($e);
      r(549);
      var tt = r(73),
        rt = r.n(tt);
      function nt(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      var at = function (e) {
        var t = e.value,
          r = void 0 === t ? "" : t,
          n = e.onChange,
          o = e.className,
          c = e.autoFocus,
          i = a.a.useRef(null),
          l = nt(a.a.useState(0), 2),
          s = l[0],
          u = l[1];
        return (
          a.a.useLayoutEffect(
            function () {
              i.current && u(i.current.getBoundingClientRect().width + 3);
            },
            [r]
          ),
          a.a.createElement(
            "div",
            {
              className: Object(Ne.makeClassName)("efqn8rk", o),
              style: { width: Math.max(50, s) },
            },
            a.a.createElement(rt.a.String, {
              autoFocus: c,
              value: r,
              onChange: n,
            }),
            a.a.createElement(
              "span",
              {
                tabIndex: -1,
                readOnly: !0,
                ref: i,
                style: {
                  position: "absolute",
                  visibility: "hidden",
                  height: "auto",
                  width: "auto",
                  minWidth: 0,
                  whiteSpace: "nowrap",
                  fontSize: "inherit",
                  fontFamily: "inherit",
                },
              },
              r.split(" ").join(".")
            )
          )
        );
      };
      at.displayName = "EditableText";
      var ot = at;
      function ct() {
        return (ct =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          }).apply(this, arguments);
      }
      function it(e, t) {
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
      function lt(e, t, r) {
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
      function st(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) {
              for (var t = 0, r = new Array(e.length); t < e.length; t++)
                r[t] = e[t];
              return r;
            }
          })(e) ||
          (function (e) {
            if (
              Symbol.iterator in Object(e) ||
              "[object Arguments]" === Object.prototype.toString.call(e)
            )
              return Array.from(e);
          })(e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance"
            );
          })()
        );
      }
      function ut(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      var mt = function (e) {
          return Object.keys(z).findIndex(function (t) {
            return e === t;
          });
        },
        dt = Object(d.e)(function (e) {
          var t = e.history,
            r = p(),
            o = a.a.useMemo(
              function () {
                return ["createdByUserId", "==", r.id];
              },
              [r.id]
            ),
            c = P({ collection: "retros", query: o }),
            i = a.a.useMemo(
              function () {
                return ["memberUserIds", "array-contains", r.id];
              },
              [r.id]
            ),
            l = P({ collection: "retros", query: i }),
            s = ut(
              a.a.useMemo(
                function () {
                  if (c && l) {
                    var e = [].concat(st(c), st(l)).reduce(
                        function (e, t) {
                          var r =
                            t.phase === z.complete.key ? "completed" : "active";
                          return (function (e) {
                            for (var t = 1; t < arguments.length; t++) {
                              var r = null != arguments[t] ? arguments[t] : {};
                              t % 2
                                ? it(r, !0).forEach(function (t) {
                                    lt(e, t, r[t]);
                                  })
                                : Object.getOwnPropertyDescriptors
                                ? Object.defineProperties(
                                    e,
                                    Object.getOwnPropertyDescriptors(r)
                                  )
                                : it(r).forEach(function (t) {
                                    Object.defineProperty(
                                      e,
                                      t,
                                      Object.getOwnPropertyDescriptor(r, t)
                                    );
                                  });
                            }
                            return e;
                          })({}, e, lt({}, r, [].concat(st(e[r]), [t])));
                        },
                        { active: [], completed: [] }
                      ),
                      t = e.active,
                      r = e.completed;
                    return [
                      t.sort(function (e, t) {
                        var r = t.createdAt.seconds - e.createdAt.seconds;
                        return mt(e.phase) - mt(t.phase) || r;
                      }),
                      r.sort(function (e, t) {
                        return t.completedAt.seconds - e.completedAt.seconds;
                      }),
                    ];
                  }
                },
                [c, l]
              ) || [],
              2
            ),
            u = s[0],
            m = void 0 === u ? [] : u,
            d = s[1],
            f = void 0 === d ? [] : d,
            v = E(),
            y = ut(Object(n.useState)(!1), 2),
            h = y[0],
            b = y[1],
            g = ut(Object(n.useState)(!1), 2),
            O = g[0],
            w = g[1],
            _ = ut(a.a.useState(""), 2),
            k = _[0],
            N = _[1];
          a.a.useEffect(
            function () {
              if (!h) {
                var e = setTimeout(function () {
                  N("");
                }, 400);
                return function () {
                  clearTimeout(e);
                };
              }
            },
            [h]
          );
          var j = a.a.useCallback(
            function () {
              w(!0),
                oe({ user: r, title: k })
                  .then(function (e) {
                    var r = e.id;
                    t.push("/retro/" + r);
                  })
                  .catch(function (e) {
                    Oe(e), w(!1);
                  });
            },
            [r, k, t]
          );
          if (!(r && c && l) || O) return a.a.createElement(W, null);
          var I = 0 === m.length,
            C = 0 === f.length,
            x = I && C;
          return a.a.createElement(
            a.a.Fragment,
            null,
            a.a.createElement(
              Ge,
              {
                isOpen: h,
                onClose: function () {
                  b(!1);
                },
                className: "c4lyylh",
              },
              function () {
                return a.a.createElement(
                  a.a.Fragment,
                  null,
                  a.a.createElement(
                    "div",
                    { className: "__instructions" },
                    "Enter a title for your retro"
                  ),
                  a.a.createElement(
                    "div",
                    { className: "__input" },
                    a.a.createElement(ot, {
                      autoFocus: !0,
                      value: k,
                      onChange: N,
                    })
                  ),
                  a.a.createElement(
                    "div",
                    {
                      className: Object(Ne.makeClassName)(
                        "__action",
                        k && "--visible"
                      ),
                    },
                    a.a.createElement(De, { onClick: j }, "Create")
                  )
                );
              }
            ),
            a.a.createElement(
              xe,
              { className: "h1jslf5l" },
              a.a.createElement(
                xe.Bar,
                null,
                a.a.createElement(et, {
                  title: "Good ".concat(v, ", ").concat(r.handle, "."),
                })
              ),
              x
                ? a.a.createElement(
                    xe.Fill,
                    { centerVertical: !0, nudge: !0 },
                    a.a.createElement(
                      "p",
                      null,
                      "You don't have any retros yet."
                    ),
                    a.a.createElement(
                      "p",
                      null,
                      "You can",
                      " ",
                      a.a.createElement(
                        De,
                        {
                          onClick: function () {
                            b(!0);
                          },
                        },
                        "create a retro"
                      ),
                      " ",
                      "or join one by invitation."
                    )
                  )
                : a.a.createElement(
                    xe.Fill,
                    { className: "__body" },
                    a.a.createElement(
                      "div",
                      {
                        className: "__item --create",
                        onClick: function () {
                          b(!0);
                        },
                      },
                      "Create a new retro"
                    ),
                    m.map(function (e) {
                      return a.a.createElement(
                        ze,
                        ct({}, e, {
                          key: e.id,
                          isActive: !0,
                          isOwner: r.id === e.createdByUserId,
                          className: "__item",
                        })
                      );
                    }),
                    f.map(function (e) {
                      return a.a.createElement(
                        "div",
                        { className: "__item", key: e.id },
                        a.a.createElement(
                          ze,
                          ct({}, e, { isOwner: r.id === e.createdByUserId })
                        )
                      );
                    })
                  )
            )
          );
        });
      function ft(e, t) {
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
      function pt(e, t, r) {
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
      function vt(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      var yt = function (e) {
          var t = vt(Object(n.useState)(null), 2),
            r = t[0],
            a = t[1];
          return (
            Object(n.useEffect)(
              function () {
                if (null !== e)
                  return _.doc(e).onSnapshot(function (e) {
                    a(
                      (function (e) {
                        for (var t = 1; t < arguments.length; t++) {
                          var r = null != arguments[t] ? arguments[t] : {};
                          t % 2
                            ? ft(r, !0).forEach(function (t) {
                                pt(e, t, r[t]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(
                                e,
                                Object.getOwnPropertyDescriptors(r)
                              )
                            : ft(r).forEach(function (t) {
                                Object.defineProperty(
                                  e,
                                  t,
                                  Object.getOwnPropertyDescriptor(r, t)
                                );
                              });
                        }
                        return e;
                      })({ id: e.id }, e.data())
                    );
                  });
                a(null);
              },
              [e, a]
            ),
            r
          );
        },
        ht = "b1ogn5i7",
        bt = "frltzcp";
      r(550);
      r(551);
      var gt = function (e) {
        var t = e.text,
          r = e.children,
          n = e.onClick,
          o = e.isLoading,
          c = e.isDisabled,
          i = e.confirmMessage,
          l = e.faded,
          s = void 0 !== l && l,
          u = !(o || c);
        return a.a.createElement(
          "div",
          {
            className: Object(Ne.makeClassName)(
              "b10uj89o",
              o && "--loading",
              c && "--disabled",
              s && "--faded"
            ),
            tabIndex: "0",
            onClick: function (e) {
              n && u && (!i || window.confirm(i)) && n(e);
            },
          },
          t || r
        );
      };
      gt.displayName = "Button";
      var Et = gt,
        Ot = "b191dwmg",
        wt = "t14rgcp2";
      r(552);
      r(553);
      var _t = function () {
          return a.a.createElement(
            "svg",
            {
              version: "1.1",
              xmlns: "http://www.w3.org/2000/svg",
              xmlnsXlink: "http://www.w3.org/1999/xlink",
              viewBox: "0 0 24 24",
              height: "100%",
              width: "100%",
            },
            a.a.createElement("path", {
              d:
                "M12,2c-1.81,0-3.51,0.48-4.98,1.33l2.71,2.71C10.28,5.4,11.09,5,12,5c1.66,0,3,1.34,3,3c0,0.91-0.4,1.72-1.04,2.27 l6.71,6.71C21.52,15.51,22,13.81,22,12C22,6.48,17.52,2,12,2z",
            }),
            a.a.createElement("path", {
              d:
                "M19.6,18.5l-1.99-1.99l-3.27-3.27L9.01,7.91L5.5,4.4L4.1,3L2.83,4.27l1.42,1.42C2.84,7.41,2,9.61,2,12c0,5.52,4.48,10,10,10 c2.39,0,4.59-0.84,6.31-2.25L19.56,21l1.27-1.27L19.6,18.5z M12,19.2c-2.5,0-4.71-1.28-6-3.22c0.03-1.83,3.38-2.9,5.48-3.06 l4.83,4.83C15.11,18.67,13.61,19.2,12,19.2z",
            })
          );
        },
        kt = a.a.forwardRef(function (e, t) {
          var r = e.src,
            n = e.size,
            o = void 0 === n ? 40 : n,
            c = e.className;
          return a.a.createElement(
            "div",
            {
              ref: t,
              className: Object(Ne.makeClassName)(
                "u1mgjp4",
                c,
                !r && "--empty"
              ),
              style: { width: o, height: o },
              title: r ? void 0 : "This user no longer exists.",
            },
            r
              ? a.a.createElement(
                  "div",
                  {
                    style: {
                      width: o,
                      height: o,
                      background: "".concat(L),
                      filter: "brightness(1.3)",
                    },
                  },
                  a.a.createElement("div", {
                    style: {
                      background: "url(".concat(r, ")"),
                      backgroundSize: "cover",
                      filter: "grayscale(80%)",
                      mixBlendMode: "soft-light",
                      width: o,
                      height: o,
                    },
                  })
                )
              : a.a.createElement(_t, null)
          );
        });
      kt.displayName = "UserImage";
      var Nt = kt,
        jt = r(238),
        It = r.n(jt);
      r(556);
      var Ct = function (e) {
        var t = e.className,
          r = e.children,
          n = e.content,
          o = e.direction,
          c = void 0 === o ? "down" : o;
        return a.a.createElement(
          It.a,
          {
            content: a.a.createElement("div", { className: "t8zmwdo" }, n),
            direction: c,
            tagName: "div",
            hoverDelay: 50,
            className: t,
            arrowSize: 2,
            padding: "0px",
          },
          r
        );
      };
      Ct.displayName = "Tooltip";
      var xt = Ct;
      function Pt(e, t) {
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
      function St(e, t, r) {
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
      function At(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) {
              for (var t = 0, r = new Array(e.length); t < e.length; t++)
                r[t] = e[t];
              return r;
            }
          })(e) ||
          (function (e) {
            if (
              Symbol.iterator in Object(e) ||
              "[object Arguments]" === Object.prototype.toString.call(e)
            )
              return Array.from(e);
          })(e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance"
            );
          })()
        );
      }
      var Tt = function (e) {
          var t = e.className,
            r = e.memberUserIds,
            n = e.createdByUserId,
            o = p(),
            c = Se("users"),
            i = a.a.useMemo(
              function () {
                return o && c
                  ? []
                      .concat(At(r), [n])
                      .map(function (e) {
                        return (function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var r = null != arguments[t] ? arguments[t] : {};
                            t % 2
                              ? Pt(r, !0).forEach(function (t) {
                                  St(e, t, r[t]);
                                })
                              : Object.getOwnPropertyDescriptors
                              ? Object.defineProperties(
                                  e,
                                  Object.getOwnPropertyDescriptors(r)
                                )
                              : Pt(r).forEach(function (t) {
                                  Object.defineProperty(
                                    e,
                                    t,
                                    Object.getOwnPropertyDescriptor(r, t)
                                  );
                                });
                          }
                          return e;
                        })(
                          {
                            isOwner: e === n,
                            isCurrentUser: e === o.id,
                            id: e,
                          },
                          c[e]
                        );
                      })
                      .sort(function (e, t) {
                        return (e.handle || "").toLowerCase() >
                          (t.handle || "").toLowerCase()
                          ? 1
                          : (e.handle || "").toLowerCase() <
                            (t.handle || "").toLowerCase()
                          ? -1
                          : 0;
                      })
                  : null;
              },
              [o, c, r, n]
            );
          return i
            ? a.a.createElement(
                "div",
                { className: Object(Ne.makeClassName)(Ot, t) },
                i.map(function (e) {
                  var t = e.id,
                    r = e.handle,
                    n = e.isOwner,
                    o = e.photoUrl;
                  return a.a.createElement(
                    xt,
                    {
                      className: "__tooltip",
                      key: t,
                      content: a.a.createElement(
                        "div",
                        { className: wt },
                        a.a.createElement("div", null, r),
                        n &&
                          a.a.createElement(
                            "div",
                            { className: "_faded" },
                            "Retro owner"
                          )
                      ),
                    },
                    a.a.createElement(Nt, { size: 24, src: o })
                  );
                })
              )
            : a.a.createElement(W, null);
        },
        Rt = r(240),
        Dt = r.n(Rt),
        Lt = r(239),
        Mt = r.n(Lt),
        Ut = "b1w3bsyd",
        zt = "txrhls5";
      r(558);
      var Bt = function (e) {
        var t,
          r = e.className,
          n = e.retro,
          o = (t = n.joinLinkId)
            ? "".concat(window.location.origin, "/link/").concat(t)
            : (console.error("makeLink called without an id"), "");
        return a.a.createElement(
          xt,
          {
            className: Object(Ne.makeClassName)(Ut, r),
            content: a.a.createElement(
              "div",
              { className: zt },
              a.a.createElement(
                "div",
                { className: "__instructions" },
                "New members can join by visiting this link."
              ),
              a.a.createElement(
                "div",
                { className: "__link" },
                o,
                " ",
                a.a.createElement(
                  De,
                  {
                    onClick: function () {
                      Mt()(o);
                    },
                  },
                  "Copy"
                )
              )
            ),
          },
          a.a.createElement(
            Et,
            null,
            a.a.createElement(Dt.a, { className: "_icon" }),
            n.memberUserIds.length <= 0 &&
              a.a.createElement(a.a.Fragment, null, "\u2002Invite members")
          )
        );
      };
      Bt.displayName = "RetroInvite";
      var Ft = Bt,
        Vt = function (e) {
          var t = e.retro,
            r = e.isOwner,
            n = a.a.useMemo(
              function () {
                return t ? "users/" + t.createdByUserId : null;
              },
              [t]
            ),
            o = a.a.useCallback(
              function () {
                se({ retroId: t.id, phase: z.collect.key });
              },
              [t.id]
            ),
            c = yt(n),
            i = a.a.useMemo(
              function () {
                return c && t
                  ? r
                    ? a.a.createElement(
                        a.a.Fragment,
                        null,
                        a.a.createElement(Et, { onClick: o }, "Open retro"),
                        a.a.createElement("br", null),
                        a.a.createElement(
                          "p",
                          { className: "_instructions" },
                          "Opening the retro will allow members to start adding cards."
                        )
                      )
                    : a.a.createElement(
                        "div",
                        null,
                        "Waiting for ",
                        c.handle,
                        " to begin the retro."
                      )
                  : a.a.createElement(W, null);
              },
              [r, c, t, o]
            );
          return a.a.createElement(
            a.a.Fragment,
            null,
            a.a.createElement(
              xe.Bar,
              { className: ht },
              a.a.createElement(Tt, {
                isOwner: r,
                memberUserIds: t.memberUserIds,
                createdByUserId: t.createdByUserId,
              }),
              r && a.a.createElement(Ft, { retro: t, className: "__invite" })
            ),
            a.a.createElement(xe.Fill, { className: bt }, i)
          );
        },
        Ht = function () {
          return yt("config/v1");
        },
        qt =
          ("calc("
            .concat(840, "px + ((100vw - (")
            .concat(840, "px)) / 3) * 2)"),
          { 0: "color_class_0", 1: "color_class_1", 2: "color_class_2" }),
        Wt = { 0: R, 1: T, 2: D },
        Gt = { 0: "positive", 1: "neutral", 2: "negative" };
      r(634);
      var Yt = "f1yygsgz",
        Jt = "b1vkqcej";
      r(635);
      Object.keys(qt)
        .map(function (e) {
          return "&."
            .concat(qt[e], " { \n        border-color: ")
            .concat(Wt[e], ";\n    }");
        })
        .join("\n"),
        Object.keys(qt)
          .map(function (e) {
            return "&.--"
              .concat(qt[e], "-hover { \n        border-color: ")
              .concat(Wt[e], "; \n        border-left-style: dotted;\n    }");
          })
          .join("\n");
      function Kt(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      r(636);
      var Qt = function (e, t) {
          for (var r = [], n = t; n > 0; )
            r.push(a.a.createElement(e, { key: n })), n--;
          return r;
        },
        Xt = function (e) {
          var t = e.className,
            r = e.columnId,
            n = e.body,
            o = e.isOwner,
            c = e.retroId,
            i = e.id,
            l = e.phase,
            s = e.votes,
            u = e.votingUserId,
            m = e.canAddVote,
            d = e.onSetMergeCardId,
            f = e.onSetMoveCardId,
            p = e.onStartEditText,
            v = e.isMoving,
            y = e.mergeCardId,
            h = e.mergedCards,
            b = e.isInScope,
            g = Kt(a.a.useState(), 2),
            E = g[0],
            O = g[1],
            w = a.a.useCallback(
              function (e) {
                O(e);
              },
              [O]
            ),
            _ = a.a.useCallback(
              function () {
                O();
              },
              [O]
            ),
            k = a.a.useMemo(
              function () {
                for (
                  var e = { votingUserVotes: 0, otherUserVotes: 0 },
                    t = 0,
                    r = Object.entries(s || {});
                  t < r.length;
                  t++
                ) {
                  var n = Kt(r[t], 2),
                    a = n[0],
                    o = n[1];
                  a === u ? (e.votingUserVotes = o) : (e.otherUserVotes += o);
                }
                return e;
              },
              [s, u]
            ),
            N = k.votingUserVotes,
            j = k.otherUserVotes,
            I = a.a.useCallback(
              function () {
                pe({ cardId: i, userId: u, retroId: c, voteCount: N + 1 });
              },
              [u, N, i, c]
            ),
            C = a.a.useCallback(
              function () {
                pe({ cardId: i, userId: u, retroId: c, voteCount: N - 1 });
              },
              [u, N, i, c]
            ),
            x = Boolean(y),
            P = y === i,
            S = a.a.useCallback(
              function () {
                b
                  ? he({ retroId: c, cardId: i })
                  : ye({ retroId: c, cardId: i });
              },
              [b, c, i]
            ),
            A = l === z.vote.key,
            T = [z.collect.key, z.review.key].includes(l) && o,
            R = z.collect.key === l && o,
            D = z.collect.key === l && o,
            L = z.review.key === l && o,
            M = o && l === z.resolve.key,
            U = a.a.useMemo(
              function () {
                return v
                  ? a.a.createElement(
                      "span",
                      {
                        className: "__action",
                        onClick: function () {
                          f();
                        },
                      },
                      "Cancel move"
                    )
                  : P
                  ? a.a.createElement(
                      "span",
                      {
                        className: "__action",
                        onClick: function () {
                          d();
                        },
                      },
                      "Cancel merge"
                    )
                  : x
                  ? null
                  : a.a.createElement(
                      a.a.Fragment,
                      null,
                      M &&
                        a.a.createElement(
                          "span",
                          { className: "__action", onClick: S },
                          b ? "Remove from scope" : "Add to scope"
                        ),
                      D &&
                        a.a.createElement(
                          "span",
                          {
                            className: "__action",
                            onClick: function () {
                              p(i);
                            },
                            onMouseEnter: function () {
                              w("EDIT");
                            },
                            onMouseLeave: function () {
                              _("EDIT");
                            },
                          },
                          "Edit"
                        ),
                      R &&
                        a.a.createElement(
                          "span",
                          {
                            className: "__action",
                            onClick: function () {
                              f(i);
                            },
                            onMouseEnter: function () {
                              w("MOVE");
                            },
                            onMouseLeave: function () {
                              _("MOVE");
                            },
                          },
                          "Move"
                        ),
                      L &&
                        a.a.createElement(
                          "span",
                          {
                            className: "__action",
                            onClick: function () {
                              d(i);
                            },
                            onMouseEnter: function () {
                              w("MERGE");
                            },
                            onMouseLeave: function () {
                              _("MERGE");
                            },
                          },
                          "Merge"
                        ),
                      T &&
                        a.a.createElement(
                          "span",
                          {
                            className: "__action",
                            onClick: function () {
                              window.confirm(
                                "Are you sure you want to remove this card? This action cannot be undone."
                              ) && me({ cardId: i, retroId: c });
                            },
                            onMouseEnter: function () {
                              w(null);
                            },
                            onMouseLeave: function () {
                              _(null);
                            },
                          },
                          "Remove"
                        ),
                      A &&
                        a.a.createElement(
                          a.a.Fragment,
                          null,
                          a.a.createElement(
                            "span",
                            {
                              className: Object(Ne.makeClassName)(
                                "__action",
                                !m && "--disabled"
                              ),
                              onClick: I,
                            },
                            "Add vote"
                          ),
                          Boolean(N) &&
                            a.a.createElement(
                              "span",
                              { className: "__action", onClick: C },
                              "Remove vote"
                            )
                        )
                    );
              },
              [P, d, v, x, f, M, L, R, T, w, _, b, i, c, S, D, p, A, m, N, I, C]
            );
          return a.a.createElement(
            "div",
            {
              className: Object(Ne.makeClassName)(
                "r1q60mjy",
                t,
                qt[r],
                o && "--owner",
                x && (P ? "--merging" : "--merge-target"),
                null === E
                  ? "--remove-hover"
                  : "MOVE" === E
                  ? "--move-hover"
                  : "MERGE" === E
                  ? "--merge-hover"
                  : "EDIT" === E
                  ? "--edit-hover"
                  : void 0,
                l === z.resolve.key && (b ? "--in-scope" : "--out-of-scope")
              ),
              onClick: function () {
                x &&
                  !P &&
                  (d(),
                  ve({ mergeDestination: i, mergeOrigin: y, retroId: c }));
              },
            },
            a.a.createElement("p", { className: "__body" }, n),
            h.map(function (e) {
              var t = e.body,
                r = e.id;
              return a.a.createElement(
                "div",
                { key: r, className: "__child-card" },
                t
              );
            }),
            U && a.a.createElement("p", { className: "__actions" }, U),
            [z.vote.key, z.resolve.key].includes(l) &&
              Boolean(s) &&
              a.a.createElement(
                "div",
                { className: "__votes" },
                Qt(function () {
                  return a.a.createElement("div", {
                    className: "__vote --voting-user",
                  });
                }, N),
                Qt(function () {
                  return a.a.createElement("div", { className: "__vote" });
                }, j)
              )
          );
        };
      (Xt.displayName = "RetroCard"),
        (Xt.defaultProps = {
          onSetMergeCardId: V.noop,
          onSetMoveCardId: V.noop,
          mergedCards: [],
        });
      var Zt = Xt,
        $t = r(242),
        er = a.a.memo(
          a.a.forwardRef(function (e, t) {
            var r = e.className,
              n = e.children,
              o = e.items,
              c = e.padding,
              i = e.maxBlur,
              l = void 0 === i ? 3 : i,
              s = e.indicatorThreshold,
              u = void 0 === s ? 25 : s,
              m = e.indicator,
              d = void 0 === m ? null : m,
              f = e.disableScrollLock,
              p = void 0 !== f && f,
              v = a.a.useRef(null),
              y = a.a.useRef(null),
              h = a.a.useCallback(
                function () {
                  v.current &&
                    y.current &&
                    (v.current.scrollTop > u
                      ? (y.current.style.opacity = 1)
                      : (y.current.style.opacity = 0));
                },
                [u]
              ),
              b = a.a.useRef({}),
              g = a.a.useCallback(function (e) {
                return function (t) {
                  b.current[e] = t;
                };
              }, []),
              E = a.a.useRef(!1),
              O = a.a.useCallback(function (e) {
                E.current &&
                  e &&
                  e.scroll({ top: e.scrollHeight, behavior: "smooth" });
              }, []);
            a.a.useEffect(
              function () {
                if (E.current) {
                  var e = v.current;
                  e && O(e);
                }
              },
              [o, O]
            );
            var w = a.a.useCallback(
              function () {
                if (!p) {
                  E.current = !0;
                  var e = v.current;
                  e && O(e);
                }
              },
              [O, p]
            );
            a.a.useImperativeHandle(
              t,
              function () {
                return { requestLockScrollToBottom: w };
              },
              [w]
            );
            var _ = a.a.useCallback(
              function () {
                E.current && O(v.current);
              },
              [O]
            );
            a.a.useLayoutEffect(
              function () {
                var e = Object($t.a)(Math.random());
                return (
                  e.addResizeListener(v.current.parentElement, _),
                  function () {
                    e.removeResizeListener(v.current.parentElement, _);
                  }
                );
              },
              [_]
            );
            var k = a.a.useCallback(
              function (e) {
                var t = e.target,
                  r = t.scrollTop,
                  n = t.scrollHeight,
                  a = t.offsetHeight;
                h(), p || (E.current = r + 300 >= n - a);
                var o = function (e) {
                  var t = b.current[e];
                  if (!t) return "continue";
                  var n = t.offsetTop - r,
                    a = (c - n) / c;
                  a <= 0
                    ? ((t.style.opacity = 1),
                      (t.style.filter = ""),
                      (t.style.pointerEvents = ""))
                    : a >= 1
                    ? ((t.style.pointerEvents = "none"),
                      (t.style.opacity = 0),
                      (t.style.filter = ""))
                    : ((t.style.pointerEvents = "none"),
                      window.requestAnimationFrame(function () {
                        (t.style.opacity = 1 - a),
                          (t.style.filter = "blur(".concat(a * l, "px)"));
                      }));
                };
                for (var i in b.current) o(i);
              },
              [l, c, h, p]
            );
            return a.a.createElement(
              "div",
              {
                className: r,
                style: {
                  overflow: "auto",
                  padding: "".concat(c, "px ").concat(2 * l, "px 0"),
                },
                onScroll: k,
                ref: function (e) {
                  (v.current = e), h();
                },
              },
              a.a.createElement(
                "div",
                {
                  ref: function (e) {
                    (y.current = e), h();
                  },
                  style: {
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                  },
                },
                d
              ),
              o.map(function (e) {
                return a.a.createElement(
                  "div",
                  { key: e.key, ref: g(e.key) },
                  n({ item: e })
                );
              })
            );
          })
        );
      er.displayName = "FadingScrollList";
      var tr = er,
        rr = r(121),
        nr = r.n(rr);
      function ar(e) {
        return (ar =
          "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" === typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function or() {
        return (or =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          }).apply(this, arguments);
      }
      function cr(e, t) {
        if (null == e) return {};
        var r,
          n,
          a = (function (e, t) {
            if (null == e) return {};
            var r,
              n,
              a = {},
              o = Object.keys(e);
            for (n = 0; n < o.length; n++)
              (r = o[n]), t.indexOf(r) >= 0 || (a[r] = e[r]);
            return a;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (n = 0; n < o.length; n++)
            (r = o[n]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (a[r] = e[r]));
        }
        return a;
      }
      function ir(e) {
        var t = (function (e, t) {
          if ("object" !== ar(e) || null === e) return e;
          var r = e[Symbol.toPrimitive];
          if (void 0 !== r) {
            var n = r.call(e, t || "default");
            if ("object" !== ar(n)) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === t ? String : Number)(e);
        })(e, "string");
        return "symbol" === ar(t) ? t : String(t);
      }
      function lr(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      function sr(e, t) {
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
      function ur(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? sr(r, !0).forEach(function (t) {
                mr(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : sr(r).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      function mr(e, t, r) {
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
      var dr = function (e) {
          var t = e.retro,
            r = e.isOwner,
            n = Ht(),
            o = p(),
            c = a.a.useRef({}),
            i = Se("retros/".concat(t.id, "/cards")),
            l = a.a.useMemo(
              function () {
                var e = {};
                for (var t in i) {
                  var r = i[t];
                  e[r.columnId] || (e[r.columnId] = []),
                    e[r.columnId].push(ur({ key: t }, r));
                }
                for (var n in e)
                  e[n].sort(function (e, t) {
                    return e.createdAt.seconds - t.createdAt.seconds;
                  });
                return e;
              },
              [i]
            ),
            s = a.a.useMemo(
              function () {
                var e = Object.keys(z).findIndex(function (e) {
                  return e === t.phase;
                });
                if (!~e) return null;
                var r = Object.values(z)[e + 1];
                return r || null;
              },
              [t.phase]
            ),
            u = a.a.useCallback(
              function () {
                s && se({ retroId: t.id, phase: s.key });
              },
              [s, t.id]
            ),
            m = a.a.useCallback(
              function (e) {
                Ee({
                  retroId: t.id,
                  userId: o.id,
                  changes: { didFinishShare: e },
                });
              },
              [t.id, o.id]
            ),
            d = Se("retros/".concat(t.id, "/userInteractionState")),
            f = a.a.useMemo(
              function () {
                return Boolean(((d || {})[o.id] || {}).didFinishShare);
              },
              [d, o.id]
            ),
            v = a.a.useMemo(
              function () {
                if (d)
                  return Object.values(d).reduce(function (e) {
                    return (arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {}
                    ).didFinishShare
                      ? e + 1
                      : e;
                  }, 0);
              },
              [d]
            ),
            y = a.a.useMemo(
              function () {
                if (i) {
                  for (var e = 0, t = Object.values(i); e < t.length; e++)
                    if (t[e].createdByUserId === o.id) return !1;
                  return !0;
                }
              },
              [i, o.id]
            ),
            h = t.memberUserIds.length,
            b = void 0 !== v && v === h && h > 0,
            g = a.a.useRef({}),
            E = a.a.useCallback(function (e) {
              var t = g.current[e];
              t && t.requestLockScrollToBottom();
            }, []),
            O = lr(a.a.useState(), 2),
            w = O[0],
            _ = O[1];
          a.a.useEffect(
            function () {
              n && !w && _(n.columns[0].id);
            },
            [n, w]
          );
          var k = lr(a.a.useState({}), 2),
            N = k[0],
            j = k[1],
            I = a.a.useCallback(
              function () {
                N[w] &&
                  (ue({ retroId: t.id, userId: o.id, columnId: w, body: N[w] }),
                  E(w),
                  j(function (e) {
                    return e[w], cr(e, [w].map(ir));
                  }));
              },
              [N, w, j, E, t.id, o.id]
            ),
            C = a.a.useCallback(
              function (e) {
                if (i) {
                  var r = i[e];
                  r &&
                    (j(function (e) {
                      return ur({}, e, mr({}, r.columnId, r.body));
                    }),
                    _(r.columnId),
                    (c.current[r.columnId] || {}).focus &&
                      (c.current[r.columnId] || {}).focus(),
                    me({ cardId: e, retroId: t.id }));
                }
              },
              [i, t.id]
            ),
            x = lr(a.a.useState(), 2),
            P = x[0],
            S = x[1],
            A = Boolean(P),
            T = a.a.useMemo(
              function () {
                if (P && i) return i[P].columnId;
              },
              [P, i]
            ),
            R = !n || !o || !i;
          return (
            a.a.useEffect(
              function () {
                R ||
                  n.columns.forEach(function (e) {
                    var t = e.id;
                    E(t);
                  });
              },
              [R, E, n]
            ),
            R
              ? a.a.createElement(W, null)
              : a.a.createElement(
                  a.a.Fragment,
                  null,
                  a.a.createElement(
                    xe.Bar,
                    { className: Jt },
                    a.a.createElement(
                      "div",
                      { className: "__stage" },
                      r
                        ? a.a.createElement(
                            a.a.Fragment,
                            null,
                            a.a.createElement(
                              "span",
                              { className: "_bright" },
                              "Share"
                            ),
                            "\u2003",
                            a.a.createElement(
                              "span",
                              { className: "_faded" },
                              b
                                ? a.a.createElement(
                                    "span",
                                    { className: "_action" },
                                    "All members are finished."
                                  )
                                : a.a.createElement(
                                    "span",
                                    null,
                                    v,
                                    " of ",
                                    h,
                                    " members",
                                    " ",
                                    1 === v ? "is" : "are",
                                    " finished."
                                  ),
                              "\u2003",
                              a.a.createElement(
                                Et,
                                { faded: !b, onClick: u },
                                "Next"
                              )
                            )
                          )
                        : a.a.createElement(
                            "div",
                            null,
                            a.a.createElement(
                              "span",
                              { className: "_bright" },
                              "Share"
                            ),
                            " ",
                            a.a.createElement(
                              "span",
                              null,
                              "your observations."
                            )
                          )
                    ),
                    "\u2003",
                    a.a.createElement(
                      "div",
                      { className: "__action" },
                      !r &&
                        (f
                          ? a.a.createElement(
                              "span",
                              {
                                className: "__finished-toggle",
                                onClick: function () {
                                  m(!1);
                                },
                              },
                              a.a.createElement(nr.a, { className: "__icon" }),
                              a.a.createElement("span", null, "Finished"),
                              "\u2002",
                              a.a.createElement(
                                De,
                                {
                                  onClick: function () {
                                    m(!0);
                                  },
                                },
                                "undo"
                              )
                            )
                          : a.a.createElement(
                              Et,
                              {
                                onClick: function () {
                                  m(!0);
                                },
                                faded: y,
                              },
                              "Finish"
                            ))
                    ),
                    a.a.createElement("div", { className: "__spacer" }),
                    a.a.createElement(Tt, {
                      isOwner: r,
                      memberUserIds: t.memberUserIds,
                      createdByUserId: t.createdByUserId,
                    }),
                    r &&
                      a.a.createElement(Ft, { retro: t, className: "__invite" })
                  ),
                  a.a.createElement(
                    xe.Fill,
                    { className: Yt },
                    n.columns.map(function (e) {
                      var r = e.id,
                        n = e.title;
                      return a.a.createElement(
                        "div",
                        {
                          key: r,
                          className: Object(Ne.makeClassName)(
                            "__column",
                            qt[r]
                          ),
                          onClick: function () {
                            _(r);
                          },
                        },
                        a.a.createElement(
                          "div",
                          { className: "__cards" },
                          A && T !== r
                            ? a.a.createElement(
                                "div",
                                {
                                  className: "_move-message",
                                  onClick: function () {
                                    de({
                                      retroId: t.id,
                                      cardId: P,
                                      moveToColumnId: r,
                                    }),
                                      S();
                                  },
                                },
                                "Move to ",
                                n.toLowerCase()
                              )
                            : l[r]
                            ? a.a.createElement(
                                tr,
                                {
                                  ref: function (e) {
                                    (g.current[r] = e),
                                      e && e.requestLockScrollToBottom();
                                  },
                                  className: "__list-container",
                                  padding: 25,
                                  items: l[r],
                                  indicator: a.a.createElement("div", {
                                    className: "_indicator",
                                    style: { background: Wt[r] },
                                  }),
                                },
                                function (e) {
                                  var r = e.item;
                                  return a.a.createElement(
                                    Zt,
                                    or(
                                      {
                                        className: "_card",
                                        isOwner: o.id === r.createdByUserId,
                                        retroId: t.id,
                                        id: r.key,
                                        phase: z.collect.key,
                                        onSetMoveCardId: S,
                                        isMoving: r.key === P,
                                        onStartEditText: C,
                                      },
                                      r
                                    )
                                  );
                                }
                              )
                            : a.a.createElement(
                                "div",
                                { className: "_empty-message" },
                                B[r] || "No ".concat(Gt[r], " cards.")
                              )
                        ),
                        a.a.createElement(
                          "div",
                          { className: "__input" },
                          a.a.createElement(rt.a.Text, {
                            ref: function (e) {
                              c.current[r] = e;
                            },
                            onFocus: function () {
                              E(r);
                            },
                            placeholder: "Write a ".concat(
                              n.toLowerCase(),
                              " card..."
                            ),
                            className: Object(Ne.makeClassName)(
                              "_text-input",
                              qt[r]
                            ),
                            value: N[r] || "",
                            onChange: function (e) {
                              j(function (t) {
                                return ur({}, t, mr({}, r, e));
                              });
                            },
                            onEnter: function (e) {
                              e.shiftKey || I();
                            },
                          })
                        )
                      );
                    })
                  )
                )
          );
        },
        fr = "f5xwuj7",
        pr = "b1iuup6f";
      function vr() {
        return (vr =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          }).apply(this, arguments);
      }
      function yr(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      function hr(e, t) {
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
      function br(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? hr(r, !0).forEach(function (t) {
                gr(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : hr(r).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      function gr(e, t, r) {
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
      r(637);
      var Er = function (e) {
          var t = e.retro,
            r = e.isOwner,
            n = Ht(),
            o = p(),
            c = Se("retros/".concat(t.id, "/cards")),
            i = a.a.useMemo(
              function () {
                var e = {};
                for (var t in c) {
                  var r = c[t];
                  e[r.columnId] || (e[r.columnId] = []),
                    e[r.columnId].push(br({ key: t }, r));
                }
                for (var n in e)
                  e[n].sort(function (e, t) {
                    return e.createdAt.seconds - t.createdAt.seconds;
                  });
                return e;
              },
              [c]
            ),
            l = yr(a.a.useState(), 2),
            s = l[0],
            u = l[1],
            m = yr(a.a.useState(), 2),
            d = m[0],
            f = m[1];
          a.a.useEffect(
            function () {
              n && !d && f(n.columns[0].id);
            },
            [n, d]
          );
          var v = a.a.useMemo(
              function () {
                var e = Object.keys(z).findIndex(function (e) {
                  return e === t.phase;
                });
                if (!~e) return null;
                var r = Object.values(z)[e + 1];
                return r || null;
              },
              [t.phase]
            ),
            y = a.a.useCallback(
              function () {
                v && se({ retroId: t.id, phase: v.key });
              },
              [v, t.id]
            );
          return n && o && c
            ? a.a.createElement(
                a.a.Fragment,
                null,
                a.a.createElement(
                  xe.Bar,
                  { className: pr },
                  a.a.createElement(
                    "div",
                    { className: "__stage" },
                    a.a.createElement(
                      "div",
                      null,
                      a.a.createElement(
                        "span",
                        { className: "_bright" },
                        "Review"
                      ),
                      " ",
                      a.a.createElement("span", null, "and organize cards."),
                      r &&
                        a.a.createElement(
                          a.a.Fragment,
                          null,
                          "\u2003",
                          a.a.createElement(Et, { onClick: y }, "Next")
                        )
                    )
                  ),
                  a.a.createElement("div", { className: "__spacer" }),
                  a.a.createElement(Tt, {
                    isOwner: r,
                    memberUserIds: t.memberUserIds,
                    createdByUserId: t.createdByUserId,
                  }),
                  r &&
                    a.a.createElement(Ft, { retro: t, className: "__invite" })
                ),
                a.a.createElement(
                  xe.Fill,
                  { className: fr },
                  n.columns.map(function (e) {
                    var n = e.id;
                    return a.a.createElement(
                      "div",
                      {
                        key: n,
                        className: Object(Ne.makeClassName)("__column", qt[n]),
                        onClick: function () {
                          f(n);
                        },
                      },
                      a.a.createElement(
                        "div",
                        { className: "__cards" },
                        i[n]
                          ? a.a.createElement(
                              tr,
                              {
                                className: "__list-container",
                                padding: 25,
                                items: i[n],
                                indicator: a.a.createElement("div", {
                                  className: "_indicator",
                                  style: { background: Wt[n] },
                                }),
                              },
                              function (e) {
                                var n = e.item;
                                return a.a.createElement(
                                  Zt,
                                  vr(
                                    {
                                      className: "_card",
                                      retroId: t.id,
                                      id: n.key,
                                      phase: z.review.key,
                                      isOwner: r,
                                      onSetMergeCardId: u,
                                      mergeCardId: s,
                                    },
                                    n
                                  )
                                );
                              }
                            )
                          : "No ".concat(Gt[n], " cards.")
                      )
                    );
                  })
                )
              )
            : a.a.createElement(W, null);
        },
        Or = "f1oerphx",
        wr = "b1lfzghc";
      function _r() {
        return (_r =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          }).apply(this, arguments);
      }
      function kr(e, t) {
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
      function Nr(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? kr(r, !0).forEach(function (t) {
                jr(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : kr(r).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      function jr(e, t, r) {
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
      function Ir(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      r(638);
      var Cr = function (e) {
          var t = e.retro,
            r = e.isOwner,
            n = Ht(),
            o = Ir(a.a.useState(), 2),
            c = o[0],
            i = o[1];
          a.a.useEffect(
            function () {
              n && !c && i(n.columns[0].id);
            },
            [n, c]
          );
          var l = p(),
            s = Se("retros/".concat(t.id, "/cards")),
            u = a.a.useMemo(
              function () {
                var e = {};
                if (!l) return e;
                for (var t in s) {
                  var r = Nr({ key: t }, s[t]);
                  e[r.columnId] || (e[r.columnId] = []), e[r.columnId].push(r);
                }
                for (var n in e)
                  e[n].sort(function (e, t) {
                    return e.createdAt.seconds - t.createdAt.seconds;
                  });
                return e;
              },
              [s, l]
            ),
            m = a.a.useMemo(
              function () {
                if (!(l && n && s)) return {};
                for (var e = 0, t = 0, r = Object.values(s); t < r.length; t++)
                  for (
                    var a = r[t], o = 0, c = Object.entries(a.votes || {});
                    o < c.length;
                    o++
                  ) {
                    var i = Ir(c[o], 2),
                      u = i[0],
                      m = i[1];
                    u === l.id && (e += m);
                  }
                return {
                  canAddVote: n.defaultVotesPer - e > 0,
                  votesLeftCount: n.defaultVotesPer - e,
                };
              },
              [s, l, n]
            ),
            d = m.canAddVote,
            f = void 0 !== d && d,
            v = m.votesLeftCount,
            y = void 0 === v ? 0 : v,
            h = a.a.useMemo(
              function () {
                if (!(t && n && s)) return 0;
                for (var e = {}, r = 0, a = Object.values(s); r < a.length; r++)
                  for (
                    var o = a[r], c = 0, i = Object.entries(o.votes || {});
                    c < i.length;
                    c++
                  ) {
                    var l = Ir(i[c], 2),
                      u = l[0],
                      m = l[1];
                    e[u] = (e[u] || 0) + m;
                  }
                var d = 0,
                  f = !0,
                  p = !1,
                  v = void 0;
                try {
                  for (
                    var y, h = t.memberUserIds[Symbol.iterator]();
                    !(f = (y = h.next()).done);
                    f = !0
                  )
                    e[y.value] === n.defaultVotesPer && d++;
                } catch (b) {
                  (p = !0), (v = b);
                } finally {
                  try {
                    f || null == h.return || h.return();
                  } finally {
                    if (p) throw v;
                  }
                }
                return d;
              },
              [s, t, n]
            ),
            b = t.memberUserIds.length,
            g = void 0 !== h && h === b && b > 0,
            E = a.a.useMemo(
              function () {
                var e = Object.keys(z).findIndex(function (e) {
                  return e === t.phase;
                });
                if (!~e) return null;
                var r = Object.values(z)[e + 1];
                return r || null;
              },
              [t.phase]
            ),
            O = a.a.useCallback(
              function () {
                E && se({ retroId: t.id, phase: E.key });
              },
              [E, t.id]
            );
          return n && l && s
            ? a.a.createElement(
                a.a.Fragment,
                null,
                " ",
                a.a.createElement(
                  xe.Bar,
                  { className: wr },
                  a.a.createElement(
                    "div",
                    { className: "__stage" },
                    r
                      ? a.a.createElement(
                          a.a.Fragment,
                          null,
                          a.a.createElement(
                            "span",
                            { className: "_bright-text" },
                            "Vote"
                          ),
                          "\u2003",
                          a.a.createElement(
                            "span",
                            { className: "_faded-text" },
                            g
                              ? a.a.createElement(
                                  "span",
                                  { className: "_action-text" },
                                  "All members are finished."
                                )
                              : a.a.createElement(
                                  "span",
                                  null,
                                  h,
                                  " of ",
                                  b,
                                  " members",
                                  " ",
                                  1 === h ? "is" : "are",
                                  " finished."
                                ),
                            "\u2003",
                            r &&
                              (f
                                ? a.a.createElement(
                                    a.a.Fragment,
                                    null,
                                    Object(Ne.pluralize)({
                                      count: y,
                                      noun: "vote",
                                    }),
                                    " ",
                                    "left."
                                  )
                                : a.a.createElement(
                                    "span",
                                    { className: "_action" },
                                    a.a.createElement(
                                      "span",
                                      null,
                                      "All votes cast."
                                    )
                                  )),
                            "\u2003",
                            a.a.createElement(
                              Et,
                              { faded: !g || f, onClick: O },
                              "Next"
                            )
                          )
                        )
                      : a.a.createElement(
                          "div",
                          null,
                          a.a.createElement(
                            "span",
                            { className: "_bright-text" },
                            "Vote"
                          ),
                          " ",
                          a.a.createElement(
                            "span",
                            null,
                            "for discussion topics."
                          )
                        )
                  ),
                  "\u2003",
                  a.a.createElement(
                    "div",
                    { className: "_action" },
                    !r &&
                      (f
                        ? a.a.createElement(
                            a.a.Fragment,
                            null,
                            Object(Ne.pluralize)({ count: y, noun: "vote" }),
                            " ",
                            "left."
                          )
                        : a.a.createElement(
                            a.a.Fragment,
                            null,
                            a.a.createElement(nr.a, { className: "__icon" }),
                            a.a.createElement("span", null, "All votes cast.")
                          ))
                  ),
                  a.a.createElement("div", { className: "__spacer" }),
                  a.a.createElement(Tt, {
                    isOwner: r,
                    memberUserIds: t.memberUserIds,
                    createdByUserId: t.createdByUserId,
                  }),
                  r &&
                    a.a.createElement(Ft, { retro: t, className: "__invite" })
                ),
                a.a.createElement(
                  xe.Fill,
                  { className: Or },
                  n.columns.map(function (e) {
                    var r = e.id;
                    return a.a.createElement(
                      "div",
                      {
                        key: r,
                        className: Object(Ne.makeClassName)("__column", qt[r]),
                        onClick: function () {
                          i(r);
                        },
                      },
                      a.a.createElement(
                        "div",
                        { className: "__cards" },
                        u[r]
                          ? a.a.createElement(
                              tr,
                              {
                                disableScrollLock: !0,
                                className: "__list-container",
                                padding: 25,
                                items: u[r],
                                indicator: a.a.createElement("div", {
                                  className: "_indicator",
                                  style: { background: Wt[r] },
                                }),
                              },
                              function (e) {
                                var r = e.item;
                                return a.a.createElement(
                                  "div",
                                  { className: "_card-wrapper" },
                                  a.a.createElement(
                                    Zt,
                                    _r(
                                      {
                                        className: "_card",
                                        retroId: t.id,
                                        id: r.key,
                                        phase: z.vote.key,
                                        votingUserId: l.id,
                                        canAddVote: f,
                                      },
                                      r
                                    )
                                  )
                                );
                              }
                            )
                          : a.a.createElement(
                              "div",
                              { className: "_empty-message" },
                              B[r] || "No ".concat(B[r], " cards.")
                            )
                      )
                    );
                  })
                )
              )
            : a.a.createElement(W, null);
        },
        xr = "fvctdgt",
        Pr = "b1xaccwt";
      r(639);
      function Sr(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      r(640);
      var Ar = function (e) {
        var t = e.className,
          r = e.body,
          n = e.isOwner,
          o = e.retroId,
          c = e.id,
          i = e.phase,
          l = e.onStartEditText,
          s = Sr(a.a.useState(), 2),
          u = s[0],
          m = s[1],
          d = a.a.useCallback(
            function (e) {
              m(e);
            },
            [m]
          ),
          f = a.a.useCallback(
            function () {
              m();
            },
            [m]
          );
        return a.a.createElement(
          "div",
          {
            className: Object(Ne.makeClassName)(
              "rd47zay",
              t,
              null === u
                ? "--remove-hover"
                : "EDIT" === u
                ? "--edit-hover"
                : void 0
            ),
          },
          a.a.createElement("p", { className: "__body" }, r),
          n &&
            i === z.resolve.key &&
            a.a.createElement(
              "p",
              { className: "__actions" },
              a.a.createElement(
                "span",
                {
                  className: "__action",
                  onClick: function () {
                    l(c);
                  },
                  onMouseEnter: function () {
                    d("EDIT");
                  },
                  onMouseLeave: function () {
                    f("EDIT");
                  },
                },
                "Edit"
              ),
              a.a.createElement(
                "span",
                {
                  className: "__action",
                  onClick: function () {
                    window.confirm(
                      "Are you sure you want to remove this action item?"
                    ) || ge({ itemId: c, retroId: o });
                  },
                  onMouseEnter: function () {
                    d(null);
                  },
                  onMouseLeave: function () {
                    f(null);
                  },
                },
                "Remove"
              )
            )
        );
      };
      Ar.displayName = "RetroActionItem";
      var Tr = Ar;
      function Rr() {
        return (Rr =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          }).apply(this, arguments);
      }
      function Dr(e, t) {
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
      function Lr(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Dr(r, !0).forEach(function (t) {
                Mr(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : Dr(r).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      function Mr(e, t, r) {
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
      function Ur(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      var zr = function (e) {
          var t = e.retro,
            r = e.isOwner,
            n = Ht(),
            o = p(),
            c = a.a.useMemo(
              function () {
                var e = Object.keys(z).findIndex(function (e) {
                  return e === t.phase;
                });
                if (!~e) return null;
                var r = Object.values(z)[e + 1];
                return r || null;
              },
              [t.phase]
            ),
            i = a.a.useCallback(
              function () {
                c && se({ retroId: t.id, phase: c.key });
              },
              [c, t.id]
            ),
            l = Se("retros/".concat(t.id, "/cards")),
            s = a.a.useMemo(
              function () {
                if (!o || !l) return null;
                for (
                  var e = t.cardsInScope || [],
                    r = [],
                    n = [],
                    a = 0,
                    c = Object.entries(l);
                  a < c.length;
                  a++
                ) {
                  var i = Ur(c[a], 2),
                    s = i[0],
                    u = Lr({ key: s }, i[1]);
                  e.includes(s)
                    ? r.push(Lr({}, u, { isInScope: !0 }))
                    : n.push(u);
                }
                return (
                  r.sort(function (t, r) {
                    return (
                      e.findIndex(function (e) {
                        return e === t.key;
                      }) -
                      e.findIndex(function (e) {
                        return e === r.key;
                      })
                    );
                  }),
                  n.sort(function (e, t) {
                    return (
                      e.columnId - t.columnId ||
                      e.createdAt.seconds - t.createdAt.seconds
                    );
                  }),
                  [].concat(r, [{ key: "DIVIDER" }], n)
                );
              },
              [l, o, t]
            ),
            u = Ur(a.a.useState(""), 2),
            m = u[0],
            d = u[1],
            f = a.a.useCallback(
              function () {
                m && (d(""), be({ retroId: t.id, body: m }));
              },
              [m, d, t.id]
            ),
            v = Se("retros/".concat(t.id, "/actionItems")),
            y = a.a.useMemo(
              function () {
                if (!v) return null;
                for (
                  var e = [], t = 0, r = Object.entries(v);
                  t < r.length;
                  t++
                ) {
                  var n = Ur(r[t], 2),
                    a = Lr({ key: n[0] }, n[1]);
                  e.push(a);
                }
                return (
                  e.sort(function (e, t) {
                    return e.createdAt.seconds - t.createdAt.seconds;
                  }),
                  e
                );
              },
              [v]
            ),
            h = Boolean((y || []).length),
            b = a.a.useRef(null),
            g = a.a.useCallback(
              function (e) {
                if (v) {
                  var r = v[e];
                  r &&
                    (d(r.body),
                    (b.current || {}).focus && (b.current || {}).focus(),
                    ge({ retroId: t.id, itemId: e }));
                }
              },
              [v, d, t.id]
            ),
            E = a.a.useRef(null),
            O = a.a.useCallback(function () {
              var e = E.current;
              e && e.requestLockScrollToBottom();
            }, []);
          return n && o && l && y
            ? a.a.createElement(
                a.a.Fragment,
                null,
                a.a.createElement(
                  xe.Bar,
                  { className: Pr },
                  a.a.createElement(
                    "div",
                    { className: "__stage" },
                    a.a.createElement(
                      "span",
                      { className: "_bright" },
                      "Resolve"
                    ),
                    " ",
                    a.a.createElement("span", null, "cards to action items."),
                    r &&
                      a.a.createElement(
                        a.a.Fragment,
                        null,
                        "\u2003",
                        a.a.createElement(
                          Et,
                          { faded: !h, onClick: i },
                          "Finish"
                        )
                      )
                  ),
                  a.a.createElement("div", { className: "__spacer" }),
                  a.a.createElement(Tt, {
                    isOwner: r,
                    memberUserIds: t.memberUserIds,
                    createdByUserId: t.createdByUserId,
                  }),
                  r &&
                    a.a.createElement(Ft, { retro: t, className: "__invite" })
                ),
                a.a.createElement(
                  xe.Fill,
                  { className: xr },
                  a.a.createElement(
                    "div",
                    { className: "__column" },
                    a.a.createElement(
                      "div",
                      { className: "__cards" },
                      a.a.createElement(
                        tr,
                        {
                          className: "__list-container",
                          padding: 25,
                          items: s,
                          indicator: a.a.createElement("div", {
                            className: "_card-scroll-indicator",
                          }),
                        },
                        function (e) {
                          var n = e.item;
                          return "DIVIDER" === n.key
                            ? a.a.createElement(
                                "div",
                                { className: "_item-divider" },
                                "Cards out of scope"
                              )
                            : a.a.createElement(
                                Zt,
                                Rr(
                                  {
                                    className: "_card",
                                    retroId: t.id,
                                    id: n.key,
                                    phase: z.resolve.key,
                                    isOwner: r,
                                    votingUserId: o.id,
                                  },
                                  n
                                )
                              );
                        }
                      )
                    )
                  ),
                  a.a.createElement(
                    "div",
                    { className: "__column" },
                    a.a.createElement(
                      "div",
                      { className: "__cards --action-items" },
                      y.length
                        ? a.a.createElement(
                            tr,
                            {
                              className: "__list-container",
                              padding: 25,
                              items: y,
                              indicator: a.a.createElement("div", {
                                className:
                                  "_card-scroll-indicator --action-items",
                              }),
                              ref: E,
                            },
                            function (e) {
                              var n = e.item;
                              return a.a.createElement(
                                Tr,
                                Rr(
                                  {
                                    className: "_card",
                                    retroId: t.id,
                                    id: n.key,
                                    isOwner: r,
                                    phase: t.phase,
                                    onStartEditText: g,
                                  },
                                  n
                                )
                              );
                            }
                          )
                        : a.a.createElement(
                            "div",
                            { className: "_empty-message" },
                            " No action items."
                          )
                    ),
                    a.a.createElement(
                      "div",
                      { className: "__input" },
                      a.a.createElement(rt.a.Text, {
                        ref: b,
                        onFocus: O,
                        placeholder: "Add an action item...",
                        className: "_text-input --action-input",
                        value: m,
                        onChange: d,
                        onEnter: f,
                      })
                    )
                  )
                )
              )
            : a.a.createElement(W, null);
        },
        Br = "f11zfxcf",
        Fr = "b2qqx6w";
      function Vr() {
        return (Vr =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          }).apply(this, arguments);
      }
      function Hr(e, t) {
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
      function qr(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Hr(r, !0).forEach(function (t) {
                Wr(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : Hr(r).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      function Wr(e, t, r) {
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
      function Gr(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      r(641);
      var Yr = function (e) {
        var t = e.retro,
          r = e.isOwner,
          n = Ht(),
          o = p(),
          c = Se("retros/".concat(t.id, "/cards")),
          i = a.a.useMemo(
            function () {
              if (!o || !c) return {};
              for (
                var e = t.cardsInScope || [],
                  r = [],
                  n = [],
                  a = 0,
                  i = Object.entries(c);
                a < i.length;
                a++
              ) {
                var l = Gr(i[a], 2),
                  s = l[0],
                  u = qr({ key: s }, l[1]);
                e.includes(s)
                  ? r.push(qr({}, u, { isInScope: !0 }))
                  : n.push(u);
              }
              return (
                r.sort(function (t, r) {
                  return (
                    e.findIndex(function (e) {
                      return e === t.key;
                    }) -
                    e.findIndex(function (e) {
                      return e === r.key;
                    })
                  );
                }),
                { resolvedCards: r, totalOutOfScope: n.length }
              );
            },
            [c, o, t]
          ),
          l = i.resolvedCards,
          s = i.totalOutOfScope,
          u = Se("retros/".concat(t.id, "/actionItems")),
          m = a.a.useMemo(
            function () {
              if (!u) return null;
              for (
                var e = [], t = 0, r = Object.entries(u);
                t < r.length;
                t++
              ) {
                var n = Gr(r[t], 2),
                  a = qr({ key: n[0] }, n[1]);
                e.push(a);
              }
              return (
                e.sort(function (e, t) {
                  return e.createdAt.seconds - t.createdAt.seconds;
                }),
                e
              );
            },
            [u]
          );
        return n && o && c && m
          ? a.a.createElement(
              a.a.Fragment,
              null,
              a.a.createElement(
                xe.Bar,
                { className: Fr },
                a.a.createElement(
                  "div",
                  { className: "__stage" },
                  a.a.createElement(
                    "div",
                    null,
                    a.a.createElement(
                      "span",
                      { className: "_bright" },
                      "Completed"
                    ),
                    " ",
                    a.a.createElement(
                      "span",
                      null,
                      "on",
                      " ",
                      y()(1e3 * t.completedAt.seconds).format(
                        "M.D.YYYY [at] hh:mm A"
                      ),
                      "."
                    )
                  )
                ),
                a.a.createElement("div", { className: "__spacer" }),
                a.a.createElement(Tt, {
                  isOwner: r,
                  memberUserIds: t.memberUserIds,
                  createdByUserId: t.createdByUserId,
                })
              ),
              a.a.createElement(
                xe.Fill,
                { className: Br },
                a.a.createElement(
                  "div",
                  { className: "__column" },
                  a.a.createElement(
                    "div",
                    { className: "__cards" },
                    a.a.createElement(
                      tr,
                      {
                        className: "__list-container",
                        padding: 25,
                        items: l,
                        indicator: a.a.createElement("div", {
                          className: "_card-scroll-indicator",
                        }),
                      },
                      function (e) {
                        var n = e.item;
                        return a.a.createElement(
                          Zt,
                          Vr(
                            {
                              className: "_card",
                              retroId: t.id,
                              id: n.key,
                              phase: z.complete.key,
                              isOwner: r,
                              votingUserId: o.id,
                            },
                            n
                          )
                        );
                      }
                    )
                  ),
                  a.a.createElement(
                    "div",
                    { className: "_bottom-message" },
                    Object(Ne.pluralize)({ count: s, noun: "card" }),
                    " out of scope."
                  )
                ),
                a.a.createElement(
                  "div",
                  { className: "__column" },
                  a.a.createElement(
                    "div",
                    { className: "__cards --action-items" },
                    a.a.createElement(
                      tr,
                      {
                        className: "__list-container",
                        padding: 25,
                        items: m,
                        indicator: a.a.createElement("div", {
                          className: "_card-scroll-indicator --action-items",
                        }),
                      },
                      function (e) {
                        var n = e.item;
                        return a.a.createElement(
                          Tr,
                          Vr(
                            {
                              className: "_card",
                              retroId: t.id,
                              id: n.key,
                              isOwner: r,
                            },
                            n
                          )
                        );
                      }
                    )
                  ),
                  a.a.createElement("div", { className: "_bottom-message" })
                )
              )
            )
          : a.a.createElement(W, null);
      };
      r(642);
      var Jr = Object(d.e)(function (e) {
        var t = e.match.params.retroId,
          r = p(),
          o = yt("retros/" + t),
          c = Object(n.useMemo)(
            function () {
              return o ? "users/" + o.createdByUserId : null;
            },
            [o]
          ),
          i = yt(c),
          l = a.a.useCallback(
            function (e) {
              le({ retroId: t, title: e });
            },
            [t]
          );
        if (void 0 === o) return "Not found.";
        if (null === o || null === i) return a.a.createElement(W, null);
        var u = r.id === o.createdByUserId,
          m = (function () {
            switch (o.phase) {
              case z.stage.key:
                return a.a.createElement(Vt, { retro: o, isOwner: u });
              case z.collect.key:
                return a.a.createElement(dr, { retro: o, isOwner: u });
              case z.review.key:
                return a.a.createElement(Er, { retro: o, isOwner: u });
              case z.vote.key:
                return a.a.createElement(Cr, { retro: o, isOwner: u });
              case z.resolve.key:
                return a.a.createElement(zr, { retro: o, isOwner: u });
              case z.complete.key:
                return a.a.createElement(Yr, { retro: o, isOwner: u });
              default:
                return null;
            }
          })();
        return u || o.memberUserIds.includes(r.id)
          ? a.a.createElement(
              a.a.Fragment,
              null,
              a.a.createElement(s, { title: o.title }),
              a.a.createElement(
                xe,
                { className: "r1e7reek" },
                a.a.createElement(
                  xe.Bar,
                  null,
                  a.a.createElement(et, {
                    offerBack: !0,
                    title: u
                      ? a.a.createElement(ot, { value: o.title, onChange: l })
                      : o.title,
                  })
                ),
                m
              )
            )
          : a.a.createElement(
              a.a.Fragment,
              null,
              a.a.createElement(
                xe,
                { className: "r1e7reek" },
                a.a.createElement(
                  xe.Bar,
                  null,
                  a.a.createElement(et, {
                    offerBack: !0,
                    title: "Unknown retro",
                  })
                ),
                a.a.createElement(
                  xe.Fill,
                  { className: "_message" },
                  a.a.createElement(
                    "p",
                    null,
                    "You aren't a member of this retro."
                  ),
                  a.a.createElement(
                    "p",
                    null,
                    "Ask the retro owner for a join link to become one."
                  )
                )
              )
            );
      });
      r(643);
      var Kr = {
        description:
          "Simple, effective software for facilitating engaging team retrospectives. Gain insights into your team's needs.",
        primaryData: null,
        secondaryData: null,
      };
      function Qr(e, t) {
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
      function Xr(e, t, r) {
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
      var Zr = {
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
        $r = function (e) {
          var t = e.type,
            r = e.data,
            n = void 0 === r ? {} : r;
          return (function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = null != arguments[t] ? arguments[t] : {};
              t % 2
                ? Qr(r, !0).forEach(function (t) {
                    Xr(e, t, r[t]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    e,
                    Object.getOwnPropertyDescriptors(r)
                  )
                : Qr(r).forEach(function (t) {
                    Object.defineProperty(
                      e,
                      t,
                      Object.getOwnPropertyDescriptor(r, t)
                    );
                  });
            }
            return e;
          })({}, Kr, {}, "function" === typeof Zr[t] ? Zr[t](n) : n);
        };
      function en(e, t) {
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
      function tn(e, t, r) {
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
      function rn(e, t, r, n, a, o, c) {
        try {
          var i = e[o](c),
            l = i.value;
        } catch (s) {
          return void r(s);
        }
        i.done ? t(l) : Promise.resolve(l).then(n, a);
      }
      function nn(e) {
        return function () {
          var t = this,
            r = arguments;
          return new Promise(function (n, a) {
            var o = e.apply(t, r);
            function c(e) {
              rn(o, n, a, c, i, "next", e);
            }
            function i(e) {
              rn(o, n, a, c, i, "throw", e);
            }
            c(void 0);
          });
        };
      }
      function an(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      var on = {
          RETRO_INVITATION: function () {
            return "Join a new retro";
          },
          fallback: function () {
            return "Invalid link";
          },
        },
        cn = {
          RETRO_INVITATION: function (e) {
            var t = e.link,
              r = e.user,
              n = e.history,
              o = an(a.a.useState(!1), 2),
              c = o[0],
              i = o[1],
              l = a.a.useCallback(
                nn(
                  regeneratorRuntime.mark(function e() {
                    return regeneratorRuntime.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              i(!0),
                              (e.next = 3),
                              ie({ retroId: t.retroId, userId: r.id })
                            );
                          case 3:
                            n.push("/retro/" + t.retroId);
                          case 4:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                ),
                [r.id, t.retroId, n]
              ),
              s = yt("retros/" + t.retroId);
            return (
              a.a.useLayoutEffect(
                function () {
                  ((s || {}).memberUserIds || []).includes(r.id) &&
                    n.push("/retro/" + t.retroId);
                },
                [s, r.id, t.retroId, n]
              ),
              c || !s
                ? a.a.createElement(W, null)
                : a.a.createElement(
                    a.a.Fragment,
                    null,
                    a.a.createElement(
                      "p",
                      null,
                      a.a.createElement(
                        "span",
                        { className: "_bright" },
                        t.createdByUserName
                      ),
                      " has invited you to join ",
                      a.a.createElement(
                        "span",
                        { className: "_bright" },
                        '"',
                        t.retroTitle,
                        '"'
                      ),
                      "."
                    ),
                    a.a.createElement(Et, { onClick: l }, "Join")
                  )
            );
          },
          fallback: function () {
            return "Hm, that link doesn't appear to be valid. Check with whoever sent it to you to make sure it's correct and recent.";
          },
        },
        ln = Object(d.e)(function (e) {
          var t = e.match,
            r = e.history,
            n = t.params.linkId,
            o = p(),
            c = yt("links/" + n),
            i = a.a.useMemo(
              function () {
                return (function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2
                      ? en(r, !0).forEach(function (t) {
                          tn(e, t, r[t]);
                        })
                      : Object.getOwnPropertyDescriptors
                      ? Object.defineProperties(
                          e,
                          Object.getOwnPropertyDescriptors(r)
                        )
                      : en(r).forEach(function (t) {
                          Object.defineProperty(
                            e,
                            t,
                            Object.getOwnPropertyDescriptor(r, t)
                          );
                        });
                  }
                  return e;
                })({}, c ? $r(c) : {}, { pathname: t.url });
              },
              [c, t.url]
            ),
            l = a.a.useMemo(
              function () {
                return c
                  ? {
                      BodyComponent: cn[c.type] || cn.fallback,
                      title: (on[c.type] || on.fallback)(c),
                    }
                  : {};
              },
              [c]
            ),
            u = l.BodyComponent,
            m = void 0 === u ? W : u,
            d = l.title;
          return a.a.createElement(
            a.a.Fragment,
            null,
            a.a.createElement(s, i),
            a.a.createElement(
              xe,
              { className: "lyy30ts" },
              a.a.createElement(
                xe.Bar,
                null,
                a.a.createElement(et, { title: d })
              ),
              a.a.createElement(
                xe.Fill,
                { className: "__fill" },
                a.a.createElement(m, { link: c, user: o, history: r })
              )
            )
          );
        });
      function sn(e, t) {
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
      function un(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? sn(r, !0).forEach(function (t) {
                mn(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : sn(r).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      function mn(e, t, r) {
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
      function dn(e, t) {
        if (null == e) return {};
        var r,
          n,
          a = (function (e, t) {
            if (null == e) return {};
            var r,
              n,
              a = {},
              o = Object.keys(e);
            for (n = 0; n < o.length; n++)
              (r = o[n]), t.indexOf(r) >= 0 || (a[r] = e[r]);
            return a;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (n = 0; n < o.length; n++)
            (r = o[n]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (a[r] = e[r]));
        }
        return a;
      }
      function fn(e, t, r, n, a, o, c) {
        try {
          var i = e[o](c),
            l = i.value;
        } catch (s) {
          return void r(s);
        }
        i.done ? t(l) : Promise.resolve(l).then(n, a);
      }
      function pn(e) {
        return function () {
          var t = this,
            r = arguments;
          return new Promise(function (n, a) {
            var o = e.apply(t, r);
            function c(e) {
              fn(o, n, a, c, i, "next", e);
            }
            function i(e) {
              fn(o, n, a, c, i, "throw", e);
            }
            c(void 0);
          });
        };
      }
      r(644);
      var vn = (function () {
          var e = pn(
            regeneratorRuntime.mark(function e(t) {
              var r, n, a, o;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (e.next = 2), _.collection("users").doc(t.uid).get()
                      );
                    case 2:
                      return (
                        (r = e.sent),
                        (n = r.exists ? r.data() : {}),
                        (a = n.handle
                          ? n.handle
                          : t.displayName.split(" ").shift()),
                        (o = {
                          email: t.email,
                          fullName: t.displayName,
                          id: t.uid,
                          photoUrl: t.photoURL,
                          handle: a,
                          hasUpdatedProfileOnce: !0 === n.hasUpdatedProfileOnce,
                          prefersLightMode: !0 === n.prefersLightMode,
                        }),
                        e.abrupt("return", o)
                      );
                    case 7:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        yn = (function () {
          var e = pn(
            regeneratorRuntime.mark(function e(t) {
              var r, n, a, o;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.id),
                        (n = t.handle),
                        (a = dn(t, ["id", "handle"])),
                        (o = un({}, a, {
                          hasUpdatedProfileOnce: !0,
                          handle: n,
                        })),
                        (e.next = 4),
                        _.collection("users").doc(r).set(o, { merge: !0 })
                      );
                    case 4:
                      return e.abrupt("return", o);
                    case 5:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        hn = (function () {
          var e = pn(
            regeneratorRuntime.mark(function e(t) {
              var r, n, a, o;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.id),
                        (n = t.handle),
                        (a = { handle: n }),
                        (e.next = 4),
                        _.collection("users").doc(r).set(a, { merge: !0 })
                      );
                    case 4:
                      return (o = e.sent), e.abrupt("return", o);
                    case 6:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        bn = (function () {
          var e = pn(
            regeneratorRuntime.mark(function e() {
              var t, r;
              return regeneratorRuntime.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if (((t = w.a.auth().currentUser || {}), (r = t.uid))) {
                        e.next = 3;
                        break;
                      }
                      return e.abrupt("return");
                    case 3:
                      return (
                        (e.next = 5), _.collection("users").doc(r).delete()
                      );
                    case 5:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function () {
            return e.apply(this, arguments);
          };
        })(),
        gn = function () {
          return Object(n.useContext)(f).updateUser;
        };
      function En(e, t, r, n, a, o, c) {
        try {
          var i = e[o](c),
            l = i.value;
        } catch (s) {
          return void r(s);
        }
        i.done ? t(l) : Promise.resolve(l).then(n, a);
      }
      function On(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      var wn = Object(d.e)(function (e) {
          var t = e.history,
            r = p(),
            n = gn(),
            o = a.a.useCallback(
              function () {
                return n({ prefersLightMode: !r.prefersLightMode });
              },
              [n, r.prefersLightMode]
            ),
            c = On(a.a.useState(!1), 2),
            i = c[0],
            l = c[1],
            s = On(
              a.a.useState(function () {
                return r.handle;
              }),
              2
            ),
            u = s[0],
            m = s[1],
            d = a.a.useCallback(
              function (e) {
                e && (m(e), hn({ id: r.id, handle: e }));
              },
              [r.id]
            );
          return null === r || i
            ? a.a.createElement(W, null)
            : a.a.createElement(
                xe,
                { className: "a19suk4a" },
                a.a.createElement(
                  xe.Bar,
                  null,
                  a.a.createElement(et, { title: "Settings", offerBack: !0 })
                ),
                a.a.createElement(
                  xe.Fill,
                  { className: "__fill" },
                  a.a.createElement(
                    "div",
                    { className: "__items" },
                    a.a.createElement(
                      "div",
                      { className: "__item-wrapper" },
                      a.a.createElement(
                        "div",
                        { className: "__content" },
                        a.a.createElement(
                          "div",
                          { className: "__title" },
                          "Preferences"
                        ),
                        a.a.createElement(
                          "div",
                          { className: "__bar" },
                          a.a.createElement(
                            "div",
                            { className: "__description" },
                            "Light theme interface"
                          ),
                          a.a.createElement(
                            "div",
                            { className: "__actions" },
                            a.a.createElement(
                              De,
                              { onClick: o },
                              r.prefersLightMode ? "Disable" : "Enable"
                            )
                          )
                        )
                      )
                    ),
                    a.a.createElement(
                      "div",
                      { className: "__item-wrapper" },
                      a.a.createElement(
                        "div",
                        { className: "__content" },
                        a.a.createElement(
                          "div",
                          { className: "__title" },
                          "Change handle"
                        ),
                        a.a.createElement(
                          "div",
                          { className: "__description" },
                          "Your handle does not need to be unique. Be sure to use a handle your teammates will be able to recognize you by."
                        ),
                        a.a.createElement(
                          "div",
                          { className: "__actions" },
                          a.a.createElement(ot, { value: u, onChange: d })
                        )
                      )
                    ),
                    a.a.createElement(
                      "div",
                      { className: "__item-wrapper" },
                      a.a.createElement(
                        "div",
                        { className: "__content" },
                        a.a.createElement(
                          "div",
                          { className: "__title" },
                          "Delete account"
                        ),
                        a.a.createElement(
                          "div",
                          { className: "__description" },
                          "Deleting your account will remove information we have associated with you. It will not remove content from retros you've contributed to in the past."
                        ),
                        a.a.createElement(
                          "div",
                          { className: "__actions" },
                          a.a.createElement(De, {
                            text: "Delete",
                            confirmMessage:
                              "Are you sure you want to delete your account?",
                            onClick:
                              ((f = regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function (e) {
                                  for (;;)
                                    switch ((e.prev = e.next)) {
                                      case 0:
                                        return l(!0), (e.next = 3), bn();
                                      case 3:
                                        w.a.auth().signOut(), t.push("/");
                                      case 5:
                                      case "end":
                                        return e.stop();
                                    }
                                }, e);
                              })),
                              function () {
                                var e = this,
                                  t = arguments;
                                return new Promise(function (r, n) {
                                  var a = f.apply(e, t);
                                  function o(e) {
                                    En(a, r, n, o, c, "next", e);
                                  }
                                  function c(e) {
                                    En(a, r, n, o, c, "throw", e);
                                  }
                                  o(void 0);
                                });
                              }),
                          })
                        )
                      )
                    )
                  )
                )
              );
          var f;
        }),
        _n = r(243),
        kn = r.n(_n),
        Nn = r(244),
        jn = r.n(Nn),
        In = r(245),
        Cn = r.n(In);
      r(724);
      var xn = function (e) {
        var t = e.className,
          r = e.withoutText,
          n = void 0 !== r && r;
        return a.a.createElement(
          "div",
          { className: Object(Ne.makeClassName)("l1h3eyix", t) },
          a.a.createElement(
            "svg",
            {
              className: "__image",
              version: "1.1",
              xmlns: "http://www.w3.org/2000/svg",
              xmlnsXlink: "http://www.w3.org/1999/xlink",
              viewBox: "0 0 48 48",
            },
            a.a.createElement("path", {
              className: "__artwork",
              d:
                "M23.06,39.5c-0.16,0-0.32-0.03-0.48-0.08l-5.94-2c-0.47-0.16-0.83-0.54-0.96-1.01s-0.03-0.99,0.29-1.37 c3.41-4.08,9.16-12.76,9.4-25.07c0.02-0.82,0.68-1.47,1.5-1.47c0.01,0,0.02,0,0.03,0c0.83,0.02,1.49,0.7,1.47,1.53 c-0.23,11.71-5.1,20.36-8.75,25.23l3.92,1.32c0.79,0.26,1.21,1.12,0.94,1.9C24.28,39.1,23.69,39.5,23.06,39.5z",
            }),
            a.a.createElement("circle", {
              className: "__artwork",
              cx: "35",
              cy: "17",
              r: "3",
            }),
            a.a.createElement("circle", {
              className: "__artwork",
              cx: "13",
              cy: "17",
              r: "3",
            })
          ),
          !n && a.a.createElement("span", null, "Backgammon")
        );
      };
      xn.displayName = "Logo";
      var Pn = xn;
      function Sn(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      r(725);
      var An = function (e) {
        var t = e.copy,
          r = Sn(a.a.useState(), 2),
          n = r[0],
          o = r[1];
        return (
          a.a.useEffect(
            function () {
              var e = !1;
              return (
                fetch(t)
                  .then(function (e) {
                    return e.text();
                  })
                  .then(function (t) {
                    e || o(t);
                  }),
                function () {
                  e = !0;
                }
              );
            },
            [t]
          ),
          n
            ? a.a.createElement(
                xe,
                { className: "c1rskfog" },
                a.a.createElement(Pn, { className: "__logo" }),
                a.a.createElement(Cn.a, { className: "__copy", source: n })
              )
            : a.a.createElement(W, null)
        );
      };
      An.displayName = "CopyPage";
      var Tn = An,
        Rn = [
          { isPrivate: !0, path: "/", exact: !0, Component: dt },
          {
            isPrivate: !0,
            path: "/account-settings",
            exact: !0,
            Component: wn,
          },
          {
            path: "/privacy-policy",
            exact: !0,
            Component: function () {
              return a.a.createElement(Tn, { copy: kn.a });
            },
          },
          {
            path: "/terms-of-use",
            exact: !0,
            Component: function () {
              return a.a.createElement(Tn, { copy: jn.a });
            },
          },
          { isPrivate: !0, path: "/retro/:retroId", exact: !0, Component: Jr },
          { isPrivate: !0, path: "/link/:linkId", exact: !0, Component: ln },
        ];
      r(726);
      var Dn = Object(d.e)(function (e) {
        var t = e.history,
          r = a.a.useCallback(
            function () {
              t.push("/");
            },
            [t]
          );
        return a.a.createElement(
          a.a.Fragment,
          null,
          a.a.createElement(s, { title: "Page not found" }),
          a.a.createElement(
            xe,
            { className: "n1j00dz8" },
            a.a.createElement(Pn, { className: "__logo" }),
            a.a.createElement("br", null),
            a.a.createElement(
              "p",
              null,
              "Dang. There isn't a page here.",
              a.a.createElement("br", null),
              a.a.createElement("br", null),
              "Double-check the url or head back to the",
              " ",
              a.a.createElement(De, { onClick: r }, "home page"),
              "."
            )
          )
        );
      });
      r(727);
      var Ln = function (e) {
        var t = e.onStartLogIn;
        return a.a.createElement(
          xe,
          { className: "l1kos3qo" },
          a.a.createElement(Pn, null),
          a.a.createElement("br", null),
          a.a.createElement(Et, { onClick: t, text: "Sign in with Google" })
        );
      };
      Ln.displayName = "LogInPage";
      var Mn = Ln;
      function Un(e, t) {
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
      function zn(e, t, r) {
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
      function Bn(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      r(728);
      var Fn = function () {
          var e = p(),
            t = gn(),
            r = Bn(Object(n.useState)(void 0), 2),
            o = r[0],
            c = r[1],
            i = Bn(Object(n.useState)(!1), 2),
            l = i[0],
            s = i[1],
            u = void 0 === o ? e.handle : o;
          return l || !e
            ? a.a.createElement(W, null)
            : a.a.createElement(
                xe,
                {
                  className: Object(Ne.makeClassName)(
                    "CompleteProfilePage",
                    "c1877moy"
                  ),
                },
                a.a.createElement(Pn, null),
                a.a.createElement("br", null),
                a.a.createElement(Nt, { src: e.photoUrl }),
                a.a.createElement("br", null),
                a.a.createElement(
                  "div",
                  null,
                  "Handle\u2002",
                  a.a.createElement(ot, { minWidth: 25, value: u, onChange: c })
                ),
                a.a.createElement("br", null),
                a.a.createElement(
                  "div",
                  null,
                  a.a.createElement(Et, {
                    isDisabled: !u,
                    onClick: function () {
                      s(!0),
                        t(
                          (function (e) {
                            for (var t = 1; t < arguments.length; t++) {
                              var r = null != arguments[t] ? arguments[t] : {};
                              t % 2
                                ? Un(r, !0).forEach(function (t) {
                                    zn(e, t, r[t]);
                                  })
                                : Object.getOwnPropertyDescriptors
                                ? Object.defineProperties(
                                    e,
                                    Object.getOwnPropertyDescriptors(r)
                                  )
                                : Un(r).forEach(function (t) {
                                    Object.defineProperty(
                                      e,
                                      t,
                                      Object.getOwnPropertyDescriptor(r, t)
                                    );
                                  });
                            }
                            return e;
                          })({}, e, { handle: u })
                        ).catch(function (e) {
                          Oe(e), s(!1);
                        });
                    },
                    text: "Continue",
                  })
                )
              );
        },
        Vn = function (e) {
          var t = e.children,
            r = a.a.useContext(f),
            n = r.user,
            o = r.onStartLogIn,
            c = a.a.useMemo(
              function () {
                return n ? t() : null;
              },
              [t, n]
            );
          return null === n
            ? a.a.createElement(Mn, { onStartLogIn: o })
            : n.hasUpdatedProfileOnce
            ? c
            : a.a.createElement(Fn, null);
        };
      function Hn() {
        return (Hn =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          }).apply(this, arguments);
      }
      function qn(e, t) {
        if (null == e) return {};
        var r,
          n,
          a = (function (e, t) {
            if (null == e) return {};
            var r,
              n,
              a = {},
              o = Object.keys(e);
            for (n = 0; n < o.length; n++)
              (r = o[n]), t.indexOf(r) >= 0 || (a[r] = e[r]);
            return a;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (n = 0; n < o.length; n++)
            (r = o[n]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (a[r] = e[r]));
        }
        return a;
      }
      var Wn = function (e) {
          var t = e.component,
            r = qn(e, ["component"]);
          return a.a.createElement(
            d.a,
            Hn({}, r, {
              render: function (e) {
                return a.a.createElement(Vn, null, function () {
                  return a.a.createElement(t, e);
                });
              },
            })
          );
        },
        Gn = Object(d.e)(function (e) {
          var t = e.location,
            r = a.a.useMemo(function () {
              return Rn.map(function (e, t) {
                var r = e.isPrivate,
                  n = e.path,
                  o = e.exact,
                  c = e.Component,
                  i = r ? Wn : d.a;
                return a.a.createElement(i, {
                  key: t,
                  path: n,
                  exact: o,
                  component: c,
                });
              });
            }, []);
          return a.a.createElement(
            "div",
            { className: "sasx5s3" },
            a.a.createElement(
              u.a,
              { className: "__transition-group" },
              a.a.createElement(
                m.a,
                {
                  key: t.key,
                  timeout: { enter: 200, exit: 200 },
                  classNames: "--fade",
                },
                a.a.createElement(
                  "div",
                  { className: "__route-switch" },
                  a.a.createElement(
                    d.c,
                    { location: t },
                    r,
                    a.a.createElement(d.a, { component: Dn })
                  )
                )
              )
            )
          );
        }),
        Yn = Object(d.e)(function (e) {
          var t = e.children,
            r = e.history,
            n = a.a.useRef(r.length).current !== r.length,
            o = a.a.useCallback(
              function () {
                n ? r.goBack() : r.push("/");
              },
              [n, r]
            );
          return a.a.createElement(Ke.Provider, { value: o }, t);
        });
      r(729);
      var Jn = r(246),
        Kn = r.n(Jn),
        Qn = function (e) {
          var t = e.message,
            r = e.error,
            n = void 0 === r ? {} : r;
          return a.a.createElement(
            xe,
            { className: "e1ycmav6" },
            a.a.createElement(Kn.a, null),
            a.a.createElement("div", { className: "__message" }, t),
            a.a.createElement(
              "p",
              { className: "__error" },
              n.code || "ERROR",
              ": ",
              n.message || "unknown."
            )
          );
        };
      Qn.displayName = "ErrorPage";
      var Xn = Qn;
      function Zn(e, t) {
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
      function $n(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Zn(r, !0).forEach(function (t) {
                ea(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : Zn(r).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      function ea(e, t, r) {
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
      function ta(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r = [],
              n = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var c, i = e[Symbol.iterator]();
                !(n = (c = i.next()).done) &&
                (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (l) {
              (a = !0), (o = l);
            } finally {
              try {
                n || null == i.return || i.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          })()
        );
      }
      var ra = function (e) {
          var t = e.children,
            r = ta(a.a.useState(null), 2),
            n = r[0],
            o = r[1],
            c = ta(a.a.useState(!1), 2),
            i = c[0],
            l = c[1],
            s = ta(a.a.useState(null), 2),
            u = s[0],
            m = s[1],
            d = a.a.useCallback(
              function () {
                w.a
                  .auth()
                  .signInWithRedirect(N)
                  .catch(function (e) {
                    console.error(e), o(e);
                  });
              },
              [o]
            ),
            p = a.a.useCallback(function () {
              w.a.auth().signOut();
            }, []),
            v = a.a.useCallback(
              function (e) {
                return (
                  m(function (t) {
                    return $n({}, t, {}, e);
                  }),
                  yn($n({}, u, {}, e)).then(function (t) {
                    m(function (r) {
                      return $n({}, r, {}, e, {}, t);
                    });
                  })
                );
              },
              [u]
            ),
            y = a.a.useMemo(
              function () {
                return { user: u, onStartLogIn: d, logOut: p, updateUser: v };
              },
              [u, d, p, v]
            );
          return (
            a.a.useEffect(
              function () {
                w.a.auth().onAuthStateChanged(function (e) {
                  null === e
                    ? (m(null), i || l(!0))
                    : vn(e).then(function (e) {
                        m(e), i || l(!0);
                      });
                });
              },
              [m, l, i]
            ),
            i
              ? n
                ? a.a.createElement(Xn, {
                    message: a.a.createElement(
                      a.a.Fragment,
                      null,
                      a.a.createElement(
                        "p",
                        null,
                        "Hm... we're having some trouble logging you in. Please try again in a moment."
                      ),
                      a.a.createElement(
                        "p",
                        null,
                        "If the problem persists, please",
                        " ",
                        a.a.createElement(
                          "a",
                          {
                            href: "mailto:siteless@googlegroups.com",
                            target: "_blank",
                            rel: "noopener noreferrer",
                          },
                          "contact us"
                        ),
                        "."
                      ),
                      a.a.createElement(
                        "div",
                        null,
                        a.a.createElement(Et, {
                          text: "Back",
                          onClick: function () {
                            o(null);
                          },
                        })
                      )
                    ),
                    error: n,
                  })
                : a.a.createElement(f.Provider, { value: y }, t)
              : a.a.createElement(W, null)
          );
        },
        na = function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            t = e ? S : A;
          document.documentElement.setAttribute("data-theme", t),
            localStorage.setItem("backgammon.user.prefersLightMode", e);
        },
        aa = function () {
          var e = p() || {},
            t = a.a.useRef(!0);
          return (
            a.a.useLayoutEffect(
              function () {
                var r = t.current
                    ? V.noop
                    : (function (e) {
                        var t = document.createElement("style");
                        return (
                          (t.innerHTML = e),
                          document.body.appendChild(t),
                          function () {
                            try {
                              document.body.removeChild(t);
                            } catch (e) {}
                          }
                        );
                      })(
                        "\n      html,\n      html *,\n      html *:before,\n      html *:after {\n        transition: all 500ms !important;\n        transition-delay: 0ms !important;\n      }\n    "
                      ),
                  n = !1,
                  a = setTimeout(function () {
                    r(), (n = !0);
                  }, 500);
                return (
                  na(e.prefersLightMode),
                  (t.current = !1),
                  function () {
                    clearTimeout(a), n || r();
                  }
                );
              },
              [e.prefersLightMode]
            ),
            null
          );
        },
        oa = function () {
          return a.a.createElement(
            a.a.Fragment,
            null,
            a.a.createElement(
              l.b,
              null,
              a.a.createElement(
                i.a,
                null,
                a.a.createElement(s, Kr),
                a.a.createElement(
                  Yn,
                  null,
                  a.a.createElement(
                    ra,
                    null,
                    a.a.createElement(aa, null),
                    a.a.createElement(Gn, null)
                  )
                )
              )
            )
          );
        },
        ca = function () {
          CSS.supports("color", "var(--fake-var)") ||
            window.alert(
              "Your browser does not support a key styling feature this app relies on. For the best experience, please use the most current version of your browser. We do not support Internet Explorer."
            );
        },
        ia = function () {
          var e =
            "true" === localStorage.getItem("backgammon.user.prefersLightMode");
          na(e);
        };
      (function () {
        U &&
          "backgammon.siteless.co" !== window.location.host &&
          window.location.replace(
            "https://"
              .concat("backgammon.siteless.co")
              .concat(window.location.pathname)
          );
      })(),
        ca(),
        ia();
      var la = document.getElementById("root");
      c.a.render(a.a.createElement(oa, null), la);
    },
  },
  [[248, 1, 2]],
]);
//# sourceMappingURL=main.f53314ed.chunk.js.map
