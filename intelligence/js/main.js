/* =====================================================================
   ¡appa! Intelligence · Página
   Arma las secciones con los textos de data/*.js y suma la interacción:
   navbar, animaciones al hacer scroll, contadores, línea de tiempo,
   chat del hero y formulario.
   ===================================================================== */
(function () {
  "use strict";

  var C = window.APPA_CONTENT || {};
  var M = window.APPA_METRICS || { counters: [], cases: [] };
  var T = window.APPA_TESTIMONIALS || [];
  var CFG = window.APPA_CONFIG || {};
  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  function reducedMotion() {
    return motionQuery.matches;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  // **texto** -> resaltado en verde
  function fmt(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, '<span class="hl">$1</span>');
  }
  function icon(name, cls) {
    return window.APPA_ICON(name, cls);
  }
  function get(path) {
    return path.split(".").reduce(function (o, k) {
      return o == null ? o : o[k];
    }, C);
  }

  /* ---------- Renderizadores de secciones ---------- */

  var R = {
    nav: function () {
      return (C.nav || [])
        .map(function (l) {
          return '<li><a href="' + esc(l.href) + '">' + esc(l.label) + "</a></li>";
        })
        .join("");
    },

    "hero.trust": function () {
      return C.hero.trust
        .map(function (t) {
          return "<li>" + icon(t.icon) + "<span>" + esc(t.text) + "</span></li>";
        })
        .join("");
    },

    "problem.rows": function () {
      var p = C.problem;
      return (
        '<div class="compare-col compare-today reveal">' +
        '<p class="compare-label">' + icon("x") + esc(p.todayLabel) + "</p><ul>" +
        p.rows.map(function (r) { return "<li>" + esc(r.today) + "</li>"; }).join("") +
        "</ul></div>" +
        '<div class="compare-arrow" aria-hidden="true">' + icon("arrow") + "</div>" +
        '<div class="compare-col compare-with reveal">' +
        '<p class="compare-label">' + icon("check") + esc(p.withLabel) + "</p><ul>" +
        p.rows.map(function (r) { return "<li>" + esc(r["with"]) + "</li>"; }).join("") +
        "</ul></div>"
      );
    },

    "how.steps": function () {
      return C.how.steps
        .map(function (s, i) {
          return (
            '<li class="step reveal" style="--d:' + i * 120 + 'ms">' +
            '<span class="step-dot">' + icon(s.icon) + "</span>" +
            '<span class="step-num">Paso ' + (i + 1) + "</span>" +
            "<h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></li>"
          );
        })
        .join("");
    },

    "how.badge": function () {
      var b = C.how.badge;
      return (
        '<span class="speed-icon">' + icon("clock") + "</span>" +
        '<p><strong>' + esc(b.value) + "</strong> " + esc(b.label) + "</p>"
      );
    },

    "security.points": function () {
      return C.security.points
        .map(function (p, i) {
          return (
            '<li class="reveal" style="--d:' + i * 80 + 'ms"><span class="sec-icon">' + icon(p.icon) + "</span>" +
            "<div><h3>" + esc(p.title) + "</h3><p>" + esc(p.text) + "</p></div></li>"
          );
        })
        .join("");
    },

    "security.diagram": function () {
      var d = C.security.diagram;
      return (
        '<div class="perimeter-box">' +
        '<p class="perimeter-label">' + icon("lock") + esc(d.perimeter) + "</p>" +
        '<ol class="flow">' +
        d.nodes
          .map(function (n, i) {
            return (
              (i ? '<li class="flow-link" aria-hidden="true"><span></span></li>' : "") +
              '<li class="flow-node' + (i === 2 ? " is-agent" : "") + '"><span class="flow-icon">' + icon(n.icon) + "</span>" +
              "<span><strong>" + esc(n.title) + "</strong><small>" + esc(n.text) + "</small></span></li>"
            );
          })
          .join("") +
        "</ol></div>" +
        '<div class="outside"><span class="outside-icon">' + icon("noCloud") + "</span>" +
        "<span><strong>" + esc(d.outside) + "</strong><small>" + esc(d.outsideNote) + "</small></span></div>" +
        '<figcaption class="sr-only">' +
        esc(d.nodes.map(function (n) { return n.title; }).join(", luego ")) + ". Todo dentro del " + esc(d.perimeter.toLowerCase()) + ". " + esc(d.outside) + ": " + esc(d.outsideNote) + "." +
        "</figcaption>"
      );
    },

    "integrations.items": function () {
      return C.integrations.items
        .map(function (it, i) {
          return '<li class="reveal" style="--d:' + (i % 6) * 60 + 'ms">' + icon(it.icon) + "<span>" + esc(it.label) + "</span></li>";
        })
        .join("");
    },

    "metrics.counters": function () {
      return M.counters
        .map(function (c, i) {
          return (
            '<li class="counter reveal" style="--d:' + i * 100 + 'ms">' +
            '<p class="counter-value"><span class="counter-num" data-count="' + Number(c.value) + '">' +
            esc(c.prefix || "") + new Intl.NumberFormat("es-AR").format(Number(c.value)) + esc(c.suffix || "") + "</span>" +
            (c.unit ? '<span class="counter-unit">' + esc(c.unit) + "</span>" : "") + "</p>" +
            '<p class="counter-label">' + esc(c.label) + "</p>" +
            (c.client && CFG.showClientNames !== false ? '<p class="counter-client">' + esc(c.client) + "</p>" : "") +
            "</li>"
          );
        })
        .join("");
    },

    "metrics.cases": function () {
      return M.cases
        .map(function (c, i) {
          var name = CFG.showClientNames === false ? c.clientAnon : c.client;
          return (
            '<li class="case reveal" style="--d:' + i * 100 + 'ms">' +
            '<p class="case-sector">' + esc(c.sector) + "</p>" +
            "<h4>" + esc(name) + "</h4>" +
            '<p class="case-highlight">' + esc(c.highlight) + "</p>" +
            "<ul>" + c.items.map(function (t) { return "<li>" + icon("check") + "<span>" + esc(t) + "</span></li>"; }).join("") + "</ul>" +
            "</li>"
          );
        })
        .join("");
    },

    backing: function () {
      var b = C.backing;
      return (
        '<div class="backing-copy"><p class="eyebrow">' + esc(b.eyebrow) + "</p>" +
        "<h3>" + esc(b.title) + "</h3><p>" + esc(b.text) + "</p></div>" +
        '<ul class="backing-people">' +
        b.people
          .map(function (p) {
            var named = CFG.showFounderNames !== false;
            return (
              "<li><strong>" + esc(named ? p.name : p.anon) + "</strong>" +
              (named ? "<span>" + esc(p.role) + "</span>" : "") +
              "<p>" + esc(p.text) + "</p></li>"
            );
          })
          .join("") +
        "</ul>"
      );
    },

    "why.items": function () {
      return C.why.items
        .map(function (w, i) {
          return (
            '<li class="reveal" style="--d:' + i * 90 + 'ms"><span class="why-icon">' + icon(w.icon) + "</span>" +
            "<h3>" + esc(w.title) + "</h3><p>" + esc(w.text) + "</p></li>"
          );
        })
        .join("");
    },

    "cta.bullets": function () {
      return C.cta.bullets
        .map(function (b) {
          return "<li>" + icon("check") + "<span>" + esc(b) + "</span></li>";
        })
        .join("");
    }
  };

  function renderSlots() {
    document.querySelectorAll("[data-slot]").forEach(function (el) {
      var key = el.getAttribute("data-slot");
      if (key === "testimonials") return;
      if (R[key]) {
        el.innerHTML = R[key]();
      } else {
        var v = get(key);
        if (typeof v === "string") el.innerHTML = fmt(v);
      }
    });
  }

  function renderTestimonials() {
    var el = document.querySelector('[data-slot="testimonials"]');
    var list = T.filter(function (t) { return t && t.approved && t.quote; });
    if (!el || !list.length) return;
    el.innerHTML =
      '<header class="section-head"><p class="eyebrow">' + esc(C.testimonials.eyebrow) + "</p><h3>" + esc(C.testimonials.title) + "</h3></header>" +
      '<ul class="testimonial-list">' +
      list
        .map(function (t) {
          var who = [t.name, t.role, t.company].filter(Boolean).map(esc).join(" · ");
          return '<li class="reveal"><blockquote><p>“' + esc(t.quote) + "”</p>" + (who ? "<footer>" + who + "</footer>" : "") + "</blockquote></li>";
        })
        .join("") +
      "</ul>";
    el.hidden = false;
  }

  /* ---------- Contacto y agenda ---------- */

  function setupContact() {
    var foot = document.querySelector("[data-footer-contact]");
    if (foot) {
      foot.innerHTML = CFG.contactEmail
        ? '<a href="mailto:' + esc(CFG.contactEmail) + '">' + icon("mail") + esc(CFG.contactEmail) + "</a>"
        : '<a href="#contacto">' + icon("mail") + esc(C.footer.contactFallback) + "</a>";
    }
    var cal = document.querySelector("[data-calendar-link]");
    if (CFG.calendarUrl) {
      document.querySelectorAll('[data-cta="meeting"]').forEach(function (a) {
        a.href = CFG.calendarUrl;
        a.target = "_blank";
        a.rel = "noopener";
      });
      if (cal) {
        cal.href = CFG.calendarUrl;
        cal.innerHTML = icon("calendar") + esc(C.cta.calendarButton);
        cal.hidden = false;
      }
    }
    var y = document.querySelector("[data-year]");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- Navbar ---------- */

  function setupNav() {
    var nav = document.querySelector("[data-nav]");
    var toggle = document.querySelector("[data-nav-toggle]");
    var menu = document.getElementById("nav-menu");
    toggle.innerHTML = icon("menu");

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      toggle.innerHTML = icon(open ? "x" : "menu");
    }
    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    function onScroll() {
      nav.classList.toggle("is-scrolled", window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Link activo según la sección visible
    var links = Array.prototype.slice.call(menu.querySelectorAll('a[href^="#"]'));
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            links.forEach(function (l) {
              var on = l.getAttribute("href") === "#" + en.target.id;
              if (on) l.setAttribute("aria-current", "true");
              else l.removeAttribute("aria-current");
            });
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      links.forEach(function (l) {
        var s = document.querySelector(l.getAttribute("href"));
        if (s) io.observe(s);
      });
    }
  }

  /* ---------- Animaciones al hacer scroll ---------- */

  function setupReveal() {
    var els = document.querySelectorAll(".reveal");
    if (reducedMotion() || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    document.documentElement.classList.add("js-reveal");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(function (el) { io.observe(el); });
  }

  function setupCounters() {
    var nums = document.querySelectorAll("[data-count]");
    var fmtNum = new Intl.NumberFormat("es-AR");
    function finalText(el, v) {
      var c = M.counters[Array.prototype.indexOf.call(nums, el)] || {};
      return (c.prefix || "") + fmtNum.format(v) + (c.suffix || "");
    }
    function animate(el) {
      var target = Number(el.getAttribute("data-count"));
      if (reducedMotion()) {
        el.textContent = finalText(el, target);
        return;
      }
      var t0 = null, dur = 1600;
      function frame(t) {
        if (t0 === null) t0 = t;
        var k = Math.min(1, (t - t0) / dur);
        var e = 1 - Math.pow(1 - k, 3);
        el.textContent = finalText(el, Math.round(target * e));
        if (k < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    if (!("IntersectionObserver" in window)) {
      nums.forEach(animate);
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            animate(en.target);
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    nums.forEach(function (n) { io.observe(n); });
  }

  function setupTimeline() {
    var tl = document.querySelector("[data-timeline]");
    if (!tl) return;
    if (reducedMotion() || !("IntersectionObserver" in window)) {
      tl.classList.add("is-active");
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          tl.classList.add("is-active");
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(tl);
  }

  /* ---------- Chat del hero ---------- */

  function setupHeroChat() {
    var el = document.querySelector("[data-hero-chat]");
    var items = (C.hero && C.hero.chat) || [];
    if (!el || !items.length || !window.APPA_CHAT) return;
    var chat = window.APPA_CHAT.create(el, { compact: true });
    var i = 0;
    var visible = true;
    var running = false;

    async function loop() {
      if (running) return;
      running = true;
      while (visible) {
        var ok = await chat.play(items[i]);
        if (!ok) break;
        if (reducedMotion()) break; // con movimiento reducido queda fija la primera
        ok = await chat.wait(4200);
        if (!ok) break;
        i = (i + 1) % items.length;
      }
      running = false;
    }

    loop();
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) loop();
        else chat.stop();
      }).observe(el);
    }
  }

  /* ---------- Formulario ---------- */

  /**
   * submitLead(data): ACÁ SE CONECTA EL BACKEND.
   * - Si data/config.js tiene formEndpoint, hace un POST con JSON.
   *   (Formspree, Make, Zapier, una función de Netlify/Vercel o un CRM).
   * - Si no, y hay contactEmail, abre el mail de la persona con todo cargado.
   * - Si no hay nada configurado, solo muestra el mensaje de éxito.
   * Devuelve una promesa con el modo usado: "endpoint" | "mailto" | "none".
   */
  function submitLead(data) {
    if (CFG.formEndpoint) {
      return fetch(CFG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      }).then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return "endpoint";
      });
    }
    if (CFG.contactEmail) {
      var subject = "Reunión ¡appa! Intelligence · " + data.company;
      var body =
        "Nombre: " + data.name + "\n" +
        "Empresa: " + data.company + "\n" +
        "Cargo: " + data.role + "\n" +
        "Mail: " + data.email + "\n\n" +
        "¿Qué pregunta de mi negocio me gustaría responder hoy?\n" + (data.question || "-");
      window.location.href =
        "mailto:" + CFG.contactEmail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      return Promise.resolve("mailto");
    }
    return Promise.resolve("none");
  }

  function setupForm() {
    var form = document.querySelector("[data-lead-form]");
    if (!form) return;
    var success = document.querySelector("[data-form-success]");
    var successText = document.querySelector("[data-success-text]");
    var F = C.cta.form;
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function setError(input, msg) {
      var err = document.getElementById(input.id + "-err");
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (err) {
        err.textContent = msg || "";
        if (msg) input.setAttribute("aria-describedby", err.id);
        else input.removeAttribute("aria-describedby");
      }
    }
    function validate(input) {
      var v = input.value.trim();
      if (input.required && !v) return setError(input, F.errorRequired), false;
      if (input.type === "email" && v && !emailRe.test(v)) return setError(input, F.errorEmail), false;
      setError(input, "");
      return true;
    }

    form.querySelectorAll("input[required]").forEach(function (inp) {
      inp.addEventListener("blur", function () {
        if (inp.value) validate(inp);
      });
      inp.addEventListener("input", function () {
        if (inp.getAttribute("aria-invalid") === "true") validate(inp);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = null;
      form.querySelectorAll("input[required]").forEach(function (inp) {
        if (!validate(inp) && !firstBad) firstBad = inp;
      });
      if (firstBad) {
        firstBad.focus();
        return;
      }
      function val(n) {
        return form.elements.namedItem(n).value.trim();
      }
      var data = {
        name: val("name"),
        company: val("company"),
        role: val("role"),
        email: val("email"),
        question: val("question"),
        source: "landing-appa-intelligence",
        sentAt: new Date().toISOString()
      };
      var btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      submitLead(data)
        .then(function (mode) {
          successText.textContent = mode === "mailto" ? F.successMailto : mode === "none" ? F.successPreview : F.successText;
          if (mode === "none") success.querySelector("h3").textContent = F.successPreviewTitle;
          form.hidden = true;
          success.hidden = false;
          success.focus();
        })
        .catch(function () {
          btn.disabled = false;
          alert("No pudimos enviar la consulta. Probá de nuevo en un rato.");
        });
    });
  }

  /* ---------- Inicio ---------- */

  function init() {
    renderSlots();
    renderTestimonials();
    setupContact();
    setupNav();
    setupReveal();
    setupCounters();
    setupTimeline();
    setupHeroChat();
    setupForm();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
