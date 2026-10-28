/* =====================================================================
   ¡appa! Intelligence · Motor del chat animado y de la demo por área
   - APPA_CHAT.create(root, opts): crea un chat animado reutilizable
     (lo usan el hero y la demo por área).
   - La demo por área se monta sola si existe #demo-app.
   El contenido vive en data/demos.js: acá no hay textos de negocio.
   ===================================================================== */
(function () {
  "use strict";

  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  function reducedMotion() {
    return motionQuery.matches;
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  // **negrita** -> <strong>
  function fmt(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }
  function plain(s) {
    return String(s).replace(/\*\*/g, "");
  }
  function icon(name, cls) {
    return window.APPA_ICON ? window.APPA_ICON(name, cls) : "";
  }

  /* ---------- Bloques de respuesta ---------- */

  function cell(c) {
    if (c && typeof c === "object") {
      return '<span class="tone-' + esc(c.tone || "") + '">' + esc(c.v) + "</span>";
    }
    return esc(c);
  }

  var renderers = {
    kpis: function (b) {
      return (
        '<div class="b-kpis">' +
        b.items
          .map(function (k) {
            return (
              '<div class="kpi"><span class="kpi-label">' + esc(k.label) + "</span>" +
              '<strong class="kpi-value">' + esc(k.value) + "</strong>" +
              (k.delta ? '<span class="kpi-delta tone-' + esc(k.tone || "") + '">' + esc(k.delta) + "</span>" : "") +
              "</div>"
            );
          })
          .join("") +
        "</div>"
      );
    },

    bars: function (b) {
      var max = Math.max.apply(null, b.items.map(function (i) { return i.value; }));
      return (
        '<figure class="b-bars">' +
        (b.title ? '<figcaption class="b-title">' + esc(b.title) + "</figcaption>" : "") +
        "<ul>" +
        b.items
          .map(function (i) {
            var w = max ? Math.max(3, (i.value / max) * 100) : 0;
            return (
              '<li><span class="bar-label">' + esc(i.label) + "</span>" +
              '<span class="bar-track"><span class="bar-fill tone-' + esc(i.tone || "") + '" style="--w:' + w.toFixed(1) + '%"></span></span>' +
              '<span class="bar-val">' + esc(i.display != null ? i.display : i.value) + "</span></li>"
            );
          })
          .join("") +
        "</ul></figure>"
      );
    },

    table: function (b) {
      return (
        '<div class="b-table" tabindex="0" role="region" aria-label="Tabla de la respuesta"><table><thead><tr>' +
        b.columns.map(function (c) { return '<th scope="col">' + esc(c) + "</th>"; }).join("") +
        "</tr></thead><tbody>" +
        b.rows
          .map(function (r) {
            return "<tr>" + r.map(function (c) { return "<td>" + cell(c) + "</td>"; }).join("") + "</tr>";
          })
          .join("") +
        "</tbody></table></div>"
      );
    },

    line: function (b) {
      var W = 320, H = 120, px = 10, top = 16, bottom = 10;
      var vals = b.values;
      var maxV = Math.max.apply(null, vals);
      var minV = Math.min.apply(null, vals);
      var span = maxV - minV || 1;
      var lo = Math.max(0, minV - span * 0.35);
      var hi = maxV + span * 0.1;
      var n = vals.length;
      var pts = vals.map(function (v, i) {
        var x = px + (i * (W - 2 * px)) / (n - 1);
        var y = top + (1 - (v - lo) / (hi - lo)) * (H - top - bottom);
        return [x, y];
      });
      var d = pts.map(function (p, i) { return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1); }).join(" ");
      var area = d + " L" + pts[n - 1][0].toFixed(1) + " " + H + " L" + pts[0][0].toFixed(1) + " " + H + " Z";
      var hl = typeof b.highlight === "number" ? b.highlight : n - 1;
      var tone = b.tone || (typeof b.highlight === "number" ? "bad" : "");
      var gid = "lg" + Math.random().toString(36).slice(2, 8);
      var unit = b.unit === "%" ? "%" : b.unit ? " " + b.unit : "";
      var label = String(vals[hl]).replace(".", ",") + unit;
      var lx = Math.min(Math.max(pts[hl][0], 30), W - 30);
      return (
        '<figure class="b-line tone-' + esc(tone) + '">' +
        (b.title ? '<figcaption class="b-title">' + esc(b.title) + "</figcaption>" : "") +
        '<div class="line-plot">' +
        '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none" role="img" aria-label="' + esc(b.title || "Gráfico") + '">' +
        '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".28"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>' +
        '<path class="line-area" d="' + area + '" fill="url(#' + gid + ')"/>' +
        '<path class="line-path" d="' + d + '" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>' +
        "</svg>" +
        pts
          .map(function (p, i) {
            return '<span class="line-dot' + (i === hl ? " is-hl" : "") + '" style="left:' + ((p[0] / W) * 100).toFixed(1) + "%;top:" + ((p[1] / H) * 100).toFixed(1) + '%" title="' + esc(b.labels[i] + ": " + String(vals[i]).replace(".", ",") + unit) + '"></span>';
          })
          .join("") +
        '<span class="line-callout" style="left:' + ((lx / W) * 100).toFixed(1) + "%;top:" + ((pts[hl][1] / H) * 100).toFixed(1) + '%">' + esc(label) + "</span>" +
        "</div>" +
        '<div class="line-labels">' + b.labels.map(function (l) { return "<span>" + esc(l) + "</span>"; }).join("") + "</div>" +
        "</figure>"
      );
    },

    list: function (b) {
      var tag = b.ordered ? "ol" : "ul";
      return '<' + tag + ' class="b-list">' + b.items.map(function (i) { return "<li>" + fmt(i) + "</li>"; }).join("") + "</" + tag + ">";
    }
  };

  function renderBlock(b) {
    var r = renderers[b.type];
    var wrap = document.createElement("div");
    wrap.className = "block";
    wrap.innerHTML = r ? r(b) : "";
    return wrap;
  }

  /* ---------- Chat animado reutilizable ---------- */

  function createChat(root, opts) {
    opts = opts || {};
    root.classList.add("chat");
    if (opts.compact) root.classList.add("chat--compact");
    root.innerHTML =
      '<div class="chat-head">' +
      '<span class="chat-avatar" aria-hidden="true"><img src="assets/logo-appa-white.svg" alt=""></span>' +
      '<span class="chat-title"><strong>¡appa! Intelligence</strong><span class="chat-status"><span class="dot"></span>' + esc(opts.status || "Conectado · red privada") + "</span></span>" +
      '<span class="chat-lock" title="Datos protegidos">' + icon("lock") + "</span>" +
      "</div>" +
      '<div class="chat-log"></div>' +
      '<div class="chat-composer" aria-hidden="true"><span class="composer-text"></span><span class="composer-placeholder">' +
      esc(opts.placeholder || "Preguntale algo a tu negocio…") +
      '</span><span class="composer-send">' + icon("send") + "</span></div>";

    var log = root.querySelector(".chat-log");
    var composer = root.querySelector(".chat-composer");
    var compText = root.querySelector(".composer-text");
    var runId = 0;

    function sleep(tok, ms) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          if (tok === runId) resolve();
          else reject("cancel");
        }, reducedMotion() ? 0 : ms);
      });
    }

    function scrollDown() {
      log.scrollTo({ top: log.scrollHeight, behavior: reducedMotion() ? "auto" : "smooth" });
    }

    async function type(tok, el, text, speed) {
      if (reducedMotion()) {
        el.textContent = text;
        return;
      }
      var step = text.length > 160 ? 3 : 2;
      for (var i = 0; i < text.length; ) {
        i = Math.min(text.length, i + step);
        el.textContent = text.slice(0, i);
        if (i % 24 < step) scrollDown();
        await sleep(tok, speed);
      }
    }

    async function run(tok, item, persona) {
      var a = item.answer || {};
      var sources = item.sources || opts.sources || [];
      var who = item.persona || persona || "";

      log.innerHTML = "";
      compText.textContent = "";
      composer.classList.remove("is-typing", "is-sent");

      // 1. La persona escribe la pregunta
      await sleep(tok, 250);
      composer.classList.add("is-typing");
      await type(tok, compText, item.question, 22);
      await sleep(tok, 280);
      composer.classList.add("is-sent");
      await sleep(tok, 180);
      compText.textContent = "";
      composer.classList.remove("is-typing", "is-sent");

      var u = document.createElement("div");
      u.className = "msg msg-user";
      u.innerHTML = (who ? '<span class="msg-who">' + esc(who) + "</span>" : "") + '<div class="bubble">' + esc(item.question) + "</div>";
      log.appendChild(u);
      scrollDown();
      await sleep(tok, 380);

      // 2. El agente consulta las fuentes
      var m = document.createElement("div");
      m.className = "msg msg-agent";
      m.innerHTML =
        '<span class="msg-avatar" aria-hidden="true">' + icon("spark") + "</span>" +
        '<div class="bubble"><div class="thinking"><span class="dots"><i></i><i></i><i></i></span><span class="thinking-text">Pensando…</span></div></div>';
      log.appendChild(m);
      scrollDown();
      var bubble = m.querySelector(".bubble");
      var tt = m.querySelector(".thinking-text");
      var steps = sources.slice(0, 3);
      for (var s = 0; s < steps.length; s++) {
        tt.textContent = (s === 0 ? "Consultando " : "Cruzando con ") + steps[s] + "…";
        await sleep(tok, 520);
      }
      if (!steps.length) await sleep(tok, 700);

      // 3. Respuesta con efecto de tipeo
      bubble.innerHTML = '<p class="answer-text"></p>';
      var p = bubble.querySelector(".answer-text");
      await type(tok, p, plain(a.text || ""), opts.compact ? 16 : 13);
      p.innerHTML = fmt(a.text || "");

      // 4. Datos: tablas, gráficos, listas
      var blocks = a.blocks || [];
      for (var b = 0; b < blocks.length; b++) {
        await sleep(tok, 220);
        var el = renderBlock(blocks[b]);
        bubble.appendChild(el);
        void el.offsetWidth; // fuerza el reflow para animar la entrada
        el.classList.add("is-in");
        scrollDown();
      }

      if (a.note) {
        await sleep(tok, 160);
        var note = document.createElement("p");
        note.className = "answer-note";
        note.innerHTML = icon("info") + "<span>" + fmt(a.note) + "</span>";
        bubble.appendChild(note);
      }

      if (item.time || sources.length) {
        var meta = document.createElement("p");
        meta.className = "answer-meta";
        meta.innerHTML =
          (item.time ? "<span>" + icon("clock") + "Respondido en " + esc(item.time) + "</span>" : "") +
          (sources.length ? "<span>" + icon("database") + esc(sources.join(" · ")) + "</span>" : "");
        bubble.appendChild(meta);
      }

      // 5. Sugerencia de seguimiento
      if (item.followup) {
        await sleep(tok, 420);
        var f = document.createElement("div");
        f.className = "followup";
        f.innerHTML = icon("spark") + "<span>" + esc(item.followup) + "</span>";
        bubble.appendChild(f);
        void f.offsetWidth;
        f.classList.add("is-in");
      }
      scrollDown();

      if (opts.onDone) opts.onDone(item, who);
    }

    return {
      play: function (item, persona) {
        var tok = ++runId;
        root.setAttribute("aria-busy", "true");
        return run(tok, item, persona).then(
          function () {
            if (tok === runId) root.setAttribute("aria-busy", "false");
            return true;
          },
          function () {
            return false; // se canceló porque arrancó otra conversación
          }
        );
      },
      stop: function () {
        runId++;
        root.setAttribute("aria-busy", "false");
      },
      wait: function (ms) {
        var tok = runId;
        return sleep(tok, ms).then(function () { return true; }, function () { return false; });
      }
    };
  }

  window.APPA_CHAT = { create: createChat, plain: plain };

  /* ---------- Demo por área ---------- */

  function initAreaDemo() {
    var app = document.getElementById("demo-app");
    var areas = window.APPA_DEMOS;
    if (!app || !areas || !areas.length) return;

    var tablist = app.querySelector("[data-demo-tabs]");
    var panel = app.querySelector("[data-demo-panel]");
    var chipsEl = app.querySelector("[data-demo-chips]");
    var cardEl = app.querySelector("[data-demo-card]");
    var chatEl = app.querySelector("[data-demo-chat]");
    var announcer = app.querySelector("[data-demo-announcer]");

    var state = { area: 0, item: 0, started: false };

    var chat = createChat(chatEl, {
      status: "Conectado · solo lectura",
      onDone: function (item, who) {
        announcer.textContent =
          who + " pregunta: " + item.question + ". Respuesta: " + plain(item.answer.text) + " " + (item.followup || "");
      }
    });

    // Tabs
    tablist.innerHTML = areas
      .map(function (a, i) {
        return (
          '<button type="button" role="tab" class="demo-tab" id="tab-' + esc(a.id) + '" aria-controls="demo-panel" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' +
          icon(a.icon) + "<span>" + esc(a.label) + "</span></button>"
        );
      })
      .join("");
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));

    function renderCard(a, item) {
      cardEl.innerHTML =
        '<div class="area-card-head"><span class="area-icon">' + icon(a.icon) + "</span><h3>" + esc(a.label) + "</h3></div>" +
        '<p class="mini-label">Para qué sirve</p><p class="area-purpose">' + esc(a.purpose) + "</p>" +
        '<div class="case-focus"><span class="mini-label">En esta pregunta</span><strong>' + esc(item.tag) + "</strong></div>" +
        '<p class="mini-label">Se conecta a</p><ul class="pills">' +
        a.connects.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") +
        "</ul>" +
        '<a class="btn btn-outline btn-sm" href="#contacto">Quiero verlo con mis datos ' + icon("arrow") + "</a>";
    }

    function renderChips(a) {
      chipsEl.innerHTML = a.cases
        .map(function (c, i) {
          return '<button type="button" class="chip" aria-pressed="' + (i === state.item) + '" data-i="' + i + '">' + esc(c.chip) + "</button>";
        })
        .join("");
    }

    function selectItem(i) {
      var a = areas[state.area];
      state.item = i;
      state.started = true;
      Array.prototype.forEach.call(chipsEl.children, function (c, j) {
        c.setAttribute("aria-pressed", String(j === i));
      });
      renderCard(a, a.cases[i]);
      announcer.textContent = "";
      chat.play(a.cases[i], a.persona);
    }

    function selectArea(i, focus) {
      state.area = i;
      tabs.forEach(function (t, j) {
        var on = j === i;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
      });
      var t = tabs[i];
      panel.setAttribute("aria-labelledby", t.id);
      if (focus) t.focus();
      // en mobile, que el tab elegido quede a la vista dentro del carrusel
      tablist.scrollTo({
        left: t.offsetLeft - tablist.clientWidth / 2 + t.clientWidth / 2,
        behavior: reducedMotion() ? "auto" : "smooth"
      });
      state.item = 0;
      renderChips(areas[i]);
      selectItem(0);
    }

    tablist.addEventListener("click", function (e) {
      var t = e.target.closest('[role="tab"]');
      if (t) selectArea(tabs.indexOf(t), false);
    });

    tablist.addEventListener("keydown", function (e) {
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      var next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % tabs.length;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = tabs.length - 1;
      if (next !== null) {
        e.preventDefault();
        selectArea(next, true);
      }
    });

    chipsEl.addEventListener("click", function (e) {
      var c = e.target.closest(".chip");
      if (c) selectItem(Number(c.getAttribute("data-i")));
    });

    // Estado inicial: se ve el área y la tarjeta; el chat arranca al entrar en pantalla
    renderChips(areas[0]);
    renderCard(areas[0], areas[0].cases[0]);
    panel.setAttribute("aria-labelledby", tabs[0].id);

    function start() {
      if (!state.started) selectItem(state.item);
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          if (entries[0].isIntersecting) {
            start();
            io.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      io.observe(chatEl);
      setTimeout(start, 2500);
    } else {
      start();
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initAreaDemo);
  else initAreaDemo();
})();
