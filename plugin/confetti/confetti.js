var t = {};
!(function t(e, n, a, i) {
  var o = !!(
    e.Worker &&
    e.Blob &&
    e.Promise &&
    e.OffscreenCanvas &&
    e.OffscreenCanvasRenderingContext2D &&
    e.HTMLCanvasElement &&
    e.HTMLCanvasElement.prototype.transferControlToOffscreen &&
    e.URL &&
    e.URL.createObjectURL
  );
  function r() {}
  function l(t) {
    var a = n.exports.Promise,
      i = void 0 !== a ? a : e.Promise;
    return "function" == typeof i ? new i(t) : (t(r, r), null);
  }
  var c,
    s,
    d,
    u,
    f,
    h,
    g,
    m,
    p,
    b =
      ((d = Math.floor(1e3 / 60)),
      (u = {}),
      (f = 0),
      "function" == typeof requestAnimationFrame &&
      "function" == typeof cancelAnimationFrame
        ? ((c = function (t) {
            var e = Math.random();
            return (
              (u[e] = requestAnimationFrame(function n(a) {
                f === a || f + d - 1 < a
                  ? ((f = a), delete u[e], t())
                  : (u[e] = requestAnimationFrame(n));
              })),
              e
            );
          }),
          (s = function (t) {
            u[t] && cancelAnimationFrame(u[t]);
          }))
        : ((c = function (t) {
            return setTimeout(t, d);
          }),
          (s = function (t) {
            return clearTimeout(t);
          })),
      { frame: c, cancel: s }),
    v =
      ((m = {}),
      function () {
        if (h) return h;
        if (!a && o) {
          var e = [
            "var CONFETTI, SIZE = {}, module = {};",
            "(" + t.toString() + ")(this, module, true, SIZE);",
            "onmessage = function(msg) {",
            "  if (msg.data.options) {",
            "    CONFETTI(msg.data.options).then(function () {",
            "      if (msg.data.callback) {",
            "        postMessage({ callback: msg.data.callback });",
            "      }",
            "    });",
            "  } else if (msg.data.reset) {",
            "    CONFETTI && CONFETTI.reset();",
            "  } else if (msg.data.resize) {",
            "    SIZE.width = msg.data.resize.width;",
            "    SIZE.height = msg.data.resize.height;",
            "  } else if (msg.data.canvas) {",
            "    SIZE.width = msg.data.canvas.width;",
            "    SIZE.height = msg.data.canvas.height;",
            "    CONFETTI = module.exports.create(msg.data.canvas);",
            "  }",
            "}",
          ].join("\n");
          try {
            h = new Worker(URL.createObjectURL(new Blob([e])));
          } catch (t) {
            return (
              console,
              "function" == typeof console.warn &&
                console.warn("🎊 Could not load worker", t),
              null
            );
          }
          !(function (t) {
            function e(e, n) {
              t.postMessage({ options: e || {}, callback: n });
            }
            (t.init = function (e) {
              var n = e.transferControlToOffscreen();
              t.postMessage({ canvas: n }, [n]);
            }),
              (t.fire = function (n, a, i) {
                if (g) return e(n, null), g;
                var o = Math.random().toString(36).slice(2);
                return (g = l(function (a) {
                  function r(e) {
                    e.data.callback === o &&
                      (delete m[o],
                      t.removeEventListener("message", r),
                      (g = null),
                      i(),
                      a());
                  }
                  t.addEventListener("message", r),
                    e(n, o),
                    (m[o] = r.bind(null, { data: { callback: o } }));
                }));
              }),
              (t.reset = function () {
                for (var e in (t.postMessage({ reset: !0 }), m))
                  m[e](), delete m[e];
              });
          })(h);
        }
        return h;
      }),
    y = {
      particleCount: 50,
      angle: 90,
      spread: 45,
      startVelocity: 45,
      decay: 0.9,
      gravity: 1,
      drift: 0,
      ticks: 200,
      x: 0.5,
      y: 0.5,
      shapes: ["square", "circle"],
      zIndex: 100,
      colors: [
        "#26ccff",
        "#a25afd",
        "#ff5e7e",
        "#88ff5a",
        "#fcff42",
        "#ffa62d",
        "#ff36ff",
      ],
      disableForReducedMotion: !1,
      scalar: 1,
    };
  function M(t, e, n) {
    return (function (t, e) {
      return e ? e(t) : t;
    })(t && null != t[e] ? t[e] : y[e], n);
  }
  function w(t) {
    return t < 0 ? 0 : Math.floor(t);
  }
  function C(t) {
    return parseInt(t, 16);
  }
  function x(t) {
    return t.map(I);
  }
  function I(t) {
    var e = String(t).replace(/[^0-9a-f]/gi, "");
    return (
      e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]),
      {
        r: C(e.substring(0, 2)),
        g: C(e.substring(2, 4)),
        b: C(e.substring(4, 6)),
      }
    );
  }
  function T(t) {
    (t.width = document.documentElement.clientWidth),
      (t.height = document.documentElement.clientHeight);
  }
  function S(t) {
    var e = t.getBoundingClientRect();
    (t.width = e.width), (t.height = e.height);
  }
  function E(t, e, n, o, r) {
    var c,
      s,
      d = e.slice(),
      u = t.getContext("2d"),
      f = l(function (e) {
        function l() {
          (c = s = null), u.clearRect(0, 0, o.width, o.height), r(), e();
        }
        (c = b.frame(function e() {
          !a ||
            (o.width === i.width && o.height === i.height) ||
            ((o.width = t.width = i.width), (o.height = t.height = i.height)),
            o.width ||
              o.height ||
              (n(t), (o.width = t.width), (o.height = t.height)),
            u.clearRect(0, 0, o.width, o.height),
            (d = d.filter(function (t) {
              return (function (t, e) {
                (e.x += Math.cos(e.angle2D) * e.velocity + e.drift),
                  (e.y += Math.sin(e.angle2D) * e.velocity + e.gravity),
                  (e.wobble += e.wobbleSpeed),
                  (e.velocity *= e.decay),
                  (e.tiltAngle += 0.1),
                  (e.tiltSin = Math.sin(e.tiltAngle)),
                  (e.tiltCos = Math.cos(e.tiltAngle)),
                  (e.random = Math.random() + 2),
                  (e.wobbleX = e.x + 10 * e.scalar * Math.cos(e.wobble)),
                  (e.wobbleY = e.y + 10 * e.scalar * Math.sin(e.wobble));
                var n = e.tick++ / e.totalTicks,
                  a = e.x + e.random * e.tiltCos,
                  i = e.y + e.random * e.tiltSin,
                  o = e.wobbleX + e.random * e.tiltCos,
                  r = e.wobbleY + e.random * e.tiltSin;
                if (
                  ((t.fillStyle =
                    "rgba(" +
                    e.color.r +
                    ", " +
                    e.color.g +
                    ", " +
                    e.color.b +
                    ", " +
                    (1 - n) +
                    ")"),
                  t.beginPath(),
                  "circle" === e.shape)
                )
                  t.ellipse
                    ? t.ellipse(
                        e.x,
                        e.y,
                        Math.abs(o - a) * e.ovalScalar,
                        Math.abs(r - i) * e.ovalScalar,
                        (Math.PI / 10) * e.wobble,
                        0,
                        2 * Math.PI
                      )
                    : (function (t, e, n, a, i, o, r, l, c) {
                        t.save(),
                          t.translate(e, n),
                          t.rotate(o),
                          t.scale(a, i),
                          t.arc(0, 0, 1, r, l, c),
                          t.restore();
                      })(
                        t,
                        e.x,
                        e.y,
                        Math.abs(o - a) * e.ovalScalar,
                        Math.abs(r - i) * e.ovalScalar,
                        (Math.PI / 10) * e.wobble,
                        0,
                        2 * Math.PI
                      );
                else if ("star" === e.shape)
                  for (
                    var l = (Math.PI / 2) * 3,
                      c = 4 * e.scalar,
                      s = 8 * e.scalar,
                      d = e.x,
                      u = e.y,
                      f = 5,
                      h = Math.PI / f;
                    f--;

                  )
                    (d = e.x + Math.cos(l) * s),
                      (u = e.y + Math.sin(l) * s),
                      t.lineTo(d, u),
                      (l += h),
                      (d = e.x + Math.cos(l) * c),
                      (u = e.y + Math.sin(l) * c),
                      t.lineTo(d, u),
                      (l += h);
                else
                  t.moveTo(Math.floor(e.x), Math.floor(e.y)),
                    t.lineTo(Math.floor(e.wobbleX), Math.floor(i)),
                    t.lineTo(Math.floor(o), Math.floor(r)),
                    t.lineTo(Math.floor(a), Math.floor(e.wobbleY));
                return t.closePath(), t.fill(), e.tick < e.totalTicks;
              })(u, t);
            })),
            d.length ? (c = b.frame(e)) : l();
        })),
          (s = l);
      });
    return {
      addFettis: function (t) {
        return (d = d.concat(t)), f;
      },
      canvas: t,
      promise: f,
      reset: function () {
        c && b.cancel(c), s && s();
      },
    };
  }
  function k(t, n) {
    var a,
      i = !t,
      r = !!M(n || {}, "resize"),
      c = M(n, "disableForReducedMotion", Boolean),
      s = o && !!M(n || {}, "useWorker") ? v() : null,
      d = i ? T : S,
      u = !(!t || !s) && !!t.__confetti_initialized,
      f =
        "function" == typeof matchMedia &&
        matchMedia("(prefers-reduced-motion)").matches;
    function h(e, n, i) {
      for (
        var o,
          r,
          l,
          c,
          s,
          u = M(e, "particleCount", w),
          f = M(e, "angle", Number),
          h = M(e, "spread", Number),
          g = M(e, "startVelocity", Number),
          m = M(e, "decay", Number),
          p = M(e, "gravity", Number),
          b = M(e, "drift", Number),
          v = M(e, "colors", x),
          y = M(e, "ticks", Number),
          C = M(e, "shapes"),
          I = M(e, "scalar"),
          T = (function (t) {
            var e = M(t, "origin", Object);
            return (e.x = M(e, "x", Number)), (e.y = M(e, "y", Number)), e;
          })(e),
          S = u,
          k = [],
          F = t.width * T.x,
          P = t.height * T.y;
        S--;

      )
        k.push(
          ((o = {
            x: F,
            y: P,
            angle: f,
            spread: h,
            startVelocity: g,
            color: v[S % v.length],
            shape:
              C[
                ((c = 0),
                (s = C.length),
                Math.floor(Math.random() * (s - c)) + c)
              ],
            ticks: y,
            decay: m,
            gravity: p,
            drift: b,
            scalar: I,
          }),
          (r = void 0),
          (l = void 0),
          (r = o.angle * (Math.PI / 180)),
          (l = o.spread * (Math.PI / 180)),
          {
            x: o.x,
            y: o.y,
            wobble: 10 * Math.random(),
            wobbleSpeed: Math.min(0.11, 0.1 * Math.random() + 0.05),
            velocity: 0.5 * o.startVelocity + Math.random() * o.startVelocity,
            angle2D: -r + (0.5 * l - Math.random() * l),
            tiltAngle: (0.5 * Math.random() + 0.25) * Math.PI,
            color: o.color,
            shape: o.shape,
            tick: 0,
            totalTicks: o.ticks,
            decay: o.decay,
            drift: o.drift,
            random: Math.random() + 2,
            tiltSin: 0,
            tiltCos: 0,
            wobbleX: 0,
            wobbleY: 0,
            gravity: 3 * o.gravity,
            ovalScalar: 0.6,
            scalar: o.scalar,
          })
        );
      return a ? a.addFettis(k) : (a = E(t, k, d, n, i)).promise;
    }
    function g(n) {
      var o = c || M(n, "disableForReducedMotion", Boolean),
        g = M(n, "zIndex", Number);
      if (o && f)
        return l(function (t) {
          t();
        });
      i && a
        ? (t = a.canvas)
        : i &&
          !t &&
          ((t = (function (t) {
            var e = document.createElement("canvas");
            return (
              (e.style.position = "fixed"),
              (e.style.top = "0px"),
              (e.style.left = "0px"),
              (e.style.pointerEvents = "none"),
              (e.style.zIndex = t),
              e
            );
          })(g)),
          document.body.appendChild(t)),
        r && !u && d(t);
      var m = { width: t.width, height: t.height };
      function p() {
        if (s) {
          var e = {
            getBoundingClientRect: function () {
              if (!i) return t.getBoundingClientRect();
            },
          };
          return (
            d(e),
            void s.postMessage({ resize: { width: e.width, height: e.height } })
          );
        }
        m.width = m.height = null;
      }
      function b() {
        (a = null),
          r && e.removeEventListener("resize", p),
          i && t && (document.body.removeChild(t), (t = null), (u = !1));
      }
      return (
        s && !u && s.init(t),
        (u = !0),
        s && (t.__confetti_initialized = !0),
        r && e.addEventListener("resize", p, !1),
        s ? s.fire(n, m, b) : h(n, m, b)
      );
    }
    return (
      (g.reset = function () {
        s && s.reset(), a && a.reset();
      }),
      g
    );
  }
  function F() {
    return p || (p = k(null, { useWorker: !0, resize: !0 })), p;
  }
  (n.exports = function () {
    return F().apply(this, arguments);
  }),
    (n.exports.reset = function () {
      F().reset();
    }),
    (n.exports.create = k);
})(
  (function () {
    return "undefined" != typeof window
      ? window
      : "undefined" != typeof self
      ? self
      : this || {};
  })(),
  t,
  !1
);
var e = t.exports;
t.exports.create;
function n({ currentSlide: t }) {
  if ("confetti" in t.dataset) {
    const n = { y: 0.5 };
    n.colors = t.dataset.confettiColors
      ? t.dataset.confettiColors.split(" ")
      : void 0;
    const a = t.dataset.confettiParticleCount
      ? parseInt(t.dataset.confettiParticleCount, 10)
      : 200;
    if ("confettiSmall" in t.dataset) e({ ...n, particleCount: a, spread: 70 });
    else if ("confettiLarge" in t.dataset) {
      const a = t.dataset.confettiDuration
          ? parseInt(t.dataset.confettiDuration, 10)
          : 0,
        i = Date.now() + 1e3 * a;
      (function t() {
        e({ ...n, particleCount: 2, angle: 60, spread: 55, origin: { x: 0 } }),
          e({
            ...n,
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          }),
          Date.now() < i && requestAnimationFrame(t);
      })();
    } else {
      [
        { ...n, spread: 26, startVelocity: 55, particleCount: 0.12 * a },
        { ...n, spread: 60, particleCount: 0.1 * a },
        {
          ...n,
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
          particleCount: 0.18 * a,
        },
        {
          ...n,
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
          particleCount: 0.1 * a,
        },
        { ...n, spread: 120, startVelocity: 45, particleCount: 0.1 * a },
        { ...n, angle: 45, startVelocity: 65, particleCount: 0.2 * a },
        { ...n, angle: 135, startVelocity: 65, particleCount: 0.2 * a },
      ].forEach((t) => e(t));
    }
  }
}
window.RevealConfetti = {
  id: "confetti",
  init: (t) => {
    t.on("slidetransitionend", n);
  },
  destroy: () => {},
};
//# sourceMappingURL=confetti.js.map
