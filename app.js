/* ¡appa! Media Kit — simulador de formatos con campañas reales */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Medidas oficiales (fuente: "Medidas de piezas" ¡appa!)
  // demo = pieza real que se muestra por defecto · brand = marca del ejemplo
  const FORMATS = [
    { key: 'popup', tab: 'Pop-up', name: 'Banner Pop-up', where: 'In-app · al abrir la app', w: 960, h: 1398,
      demo: 'assets/creas/levis-popup.jpg', brand: "Levi's",
      desc: 'Aparece al iniciar sesión y se ve apenas el usuario entra a ¡appa! Se puede segmentar por shopping y por tipo de público.',
      kpis: [['13.000', 'usuarios por día en promedio'], ['0,81%', 'CTR promedio'], ['1,5%', 'CTR viernes y sábados']],
      warn: 'Dejá libres los <b>últimos 240 px</b> de alto: ahí la app ubica su botón de acción.' },
    { key: 'home1', tab: 'Home Principal', name: 'Banner Home Principal', where: 'In-app · inicio', w: 1240, h: 598,
      demo: '', brand: 'Under Armour', comm: 'Uso compartido: lo comercializan ¡appa! y los centros comerciales',
      desc: 'Es el primer impacto visual al abrir la aplicación, ideal para comunicaciones de alcance masivo. Segmentable por shopping y tipo de público.',
      kpis: [['13.000', 'usuarios por día en promedio'], ['0,81%', 'CTR promedio'], ['1,5%', 'CTR viernes y sábados']] },
    { key: 'home2', tab: 'Home Secundario', name: 'Banner Home Secundario', where: 'In-app · inicio (ex Home Spot)', w: 750, h: 174,
      demo: '', brand: '¡appa!', comm: 'Comercializado de forma exclusiva por ¡appa!',
      desc: 'Un espacio estratégico dentro del inicio de la app para diversificar la visibilidad de tu marca con un mensaje directo.',
      kpis: [['13.000', 'usuarios ingresan a la app por día en promedio']] },
    { key: 'mall', tab: 'Perfil Shopping', name: 'Banner Perfil Shopping Principal', where: 'In-app · perfil de cada shopping', w: 686, h: 196,
      demo: '', brand: 'Abasto Shopping', comm: 'Uso mayoritario de los centros comerciales',
      desc: 'Espacio en el perfil de cada shopping para destacar propuestas de valor, promociones exclusivas de sus locales o eventos en el lugar. Se segmenta según el público a impactar.',
      kpis: [['17', 'shoppings disponibles'], ['+1.300', 'marcas presentes']] },
    { key: 'benef', tab: 'Sección Beneficios', name: 'Banner Sección Beneficios', where: 'In-app · sección Beneficios', w: 1200, h: 610,
      demo: '', brand: 'BYD', comm: 'Comercializado de forma exclusiva por ¡appa!',
      desc: 'Altamente recomendado para promocionar de forma segmentada programas de fidelidad y pauta segmentada, asegurando que llegue al público objetivo.',
      kpis: [['8 de 10', 'usuarios eligen ver promociones con anticipación']] },
    { key: 'desc', tab: 'Sección Descuentos', name: 'Banner Sección Descuentos', where: 'In-app · sección Descuentos', w: 1200, h: 610,
      demo: '', brand: 'Xterra', comm: 'Comercializado de forma exclusiva por ¡appa!',
      desc: 'Tu marca arriba de todo en el listado de descuentos con ¡appa! Altamente recomendado para pauta segmentada.',
      kpis: [['+130%', 'gastan los usuarios con ¡appa!']] },
    { key: 'parking', tab: 'Touch Point', name: 'Banner Parking · Touch Point', where: 'In-app · salida del estacionamiento', w: 694, h: 870,
      demo: 'assets/creas/lidherma.jpg', brand: 'Lidherma', comm: 'Comercializado de forma exclusiva por ¡appa!',
      desc: 'Aparece en la pantalla “¡Gracias por tu visita!”, cuando el usuario termina de pagar su ticket de estacionamiento. Aprovecha un alto tráfico de usuarios y genera una alta tasa de conversión.',
      kpis: [] },
    { key: 'push', tab: 'Notificación Push', name: 'Notificación Push', where: 'Fuera de la app · pantalla del celular', w: 0, h: 0, text: true,
      desc: 'Envíos a bases micro-segmentadas para que cada usuario reciba solo lo que le interesa. Tienen mejor performance las que desafían al usuario.',
      kpis: [['2,2%', 'tasa de click'], ['450k → 16k', 'segmentación a medida']] },
    { key: 'mail', tab: 'Mailing', name: 'Mailing', where: 'Fuera de la app · casilla de correo', w: 660, h: 0,
      demo: '', brand: 'Lidherma',
      desc: 'Envíos a usuarios de ¡appa! micro-segmentados por sus últimas transacciones. Ej.: usuarios que compraron en el shopping DOT en los últimos 3 meses.',
      kpis: [['30%', 'open rate promedio (últimos 6 meses)']] }
  ];
  const SOCIAL = [
    ['Instagram · Historia', 1080, 1920], ['Instagram · Posteo cuadrado', 1080, 1080], ['Instagram · Posteo vertical', 1080, 1350],
    ['LinkedIn · Posteo horizontal', 1200, 627], ['LinkedIn · Posteo cuadrado', 1200, 1200]
  ];
  const MALLS = [
    ['alto-palermo', 'Alto Palermo'], ['abasto', 'Abasto Shopping'], ['patio-bullrich', 'Patio Bullrich'], ['alcorta', 'Alcorta Shopping'],
    ['dot', 'DOT Baires'], ['alto-avellaneda', 'Alto Avellaneda'], ['palermo-off', 'Palermo OFF'], ['distrito-arcos', 'Distrito Arcos'],
    ['soleil', 'Soleil Premium Outlet'], ['ribera', 'Ribera Shopping'], ['alto-rosario', 'Alto Rosario'], ['cordoba', 'Córdoba Shopping'],
    ['mendoza', 'Mendoza Shopping'], ['alto-noa', 'Alto NOA'], ['alto-comahue', 'Alto Comahue'], ['terrazas-de-mayo', 'Terrazas de Mayo']
  ];
  // Textos reales de notificaciones enviadas por ¡appa!
  const PUSH_DEMO = {
    t: '¿Te tiro un tip?',
    b: 'Hoy es miércoles de Super Miércoles Santander 🥳 ¡Corré a tu shopping favorito y aprovechá hasta 35% de ahorro y cuotas sin interés!'
  };

  const state = { pieces: {}, fmt: 'popup', guide: true, pushT: '', pushB: '' };

  // ---------- utilidades ----------
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtBy = k => FORMATS.find(f => f.key === k);
  const sizeTxt = f => f.key === 'mail' ? '660 px ancho · largo libre' : `${f.w} × ${f.h} px`;
  const toast = msg => { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('on'), 2200); };

  // contenido de un espacio publicitario: la pieza subida o la campaña real
  function slot(key, style, cls = '') {
    const f = fmtBy(key), mine = state.pieces[key], src = mine || f.demo;
    if (!src) return `<div class="slot slot-empty ${cls}" style="${style}"></div>`;
    const contain = !mine && f.fit === 'contain';
    const inner = contain
      ? `<span class="slot-blur" style="background-image:url('${src}')"></span><img src="${src}" alt="" class="contain">`
      : `<img src="${src}" alt=""${!mine && f.pos ? ` style="object-position:${f.pos}"` : ''}>`;
    return `<div class="slot ${mine ? 'is-mine' : ''} ${cls}" data-fmt="${key}" style="${style}">${inner}</div>`;
  }

  // ---------- piezas de UI ----------
  const SB = (light = false, time = '17:38') => `<div class="sb ${light ? 'sb-light' : ''}"><span>${time}</span><span class="sb-ic">
      <svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
      <svg viewBox="0 0 16 12"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.3-1.4A10.6 10.6 0 0 0 8 .3 10.6 10.6 0 0 0 .7 3.2L2 4.6a8.6 8.6 0 0 1 6-2.4zm0 3.9c1.3 0 2.5.5 3.4 1.3l1.3-1.4A6.8 6.8 0 0 0 8 4.2 6.8 6.8 0 0 0 3.3 6l1.3 1.4c.9-.8 2.1-1.3 3.4-1.3zM8 10l2-2.1a2.8 2.8 0 0 0-4 0z"/></svg>
      <span class="batt"><i></i></span></span></div>`;
  const ic = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 11l8-7 8 7v9H4z"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="5" width="16" height="15" rx="1"/><path d="M4 10h16M8 3v4M16 3v4"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
    qr: '<svg viewBox="0 0 24 24" fill="#fff"><path d="M3 3h8v8H3zm2 2v4h4V5zM13 3h8v8h-8zm2 2v4h4V5zM3 13h8v8H3zm2 2v4h4v-4zM13 13h3v3h-3zM18 13h3v3h-3zM13 18h3v3h-3zM18 18h3v3h-3z"/></svg>'
  };
  const tabbar = (on = 'home') => `<div class="tabbar">
      <span class="${on === 'home' ? 'on' : ''}">${ic.home}Inicio</span>
      <span class="${on === 'ben' ? 'on' : ''}">${ic.star}Beneficios</span>
      <span class="qr"><i>${ic.qr}</i></span>
      <span>${ic.cal}Eventos</span>
      <span>${ic.user}Mi perfil</span>
    </div>`;
  const HI = '<div class="home-ind"></div>';

  // Captura real de la app con la pieza ubicada en su lugar exacto (posiciones en % de la captura)
  const shot = (img, slots) => `<div class="shot"><img src="assets/shots/${img}" alt="" class="shot-img">${slots}</div>`;
  const HOME_MAIN = 'left:5.25%;top:15.5%;width:88.75%;height:19.7%';

  const SCREENS = {
    home(hl) {
      return `<div class="scr scr-white">${shot('home.jpg',
        slot('home1', HOME_MAIN, 'r8' + (hl === 'home1' ? ' hl' : '')) +
        slot('home2', 'left:5.25%;top:74.9%;width:88.75%;height:9.3%', 'r8' + (hl === 'home2' ? ' hl' : '')))}${HI}</div>`;
    },
    popup() {
      const mine = !!state.pieces.popup;
      return `<div class="scr scr-white">${shot('home.jpg', slot('home1', HOME_MAIN, 'r8'))}
        <div class="dim"><div class="modal">
          ${slot('popup', 'position:relative;left:auto;top:auto;width:100%;aspect-ratio:960/1398', 'r0')}
          ${mine ? '<span class="modal-x">✕</span>' : ''}
          <div class="modal-zone${state.guide ? ' guide' : ''}">${mine ? '<span class="app-btn">Conocer</span>' : ''}</div>
        </div></div>${HI}</div>`;
    },
    mall() {
      return `<div class="scr scr-white">${shot('perfil.jpg', slot('mall', 'left:5.6%;top:14.4%;width:88.8%;height:12.5%', 'r6 hl'))}${HI}</div>`;
    },
    benef() {
      return `<div class="scr scr-white">${shot('beneficios.jpg', slot('benef', 'left:3.5%;top:10.7%;width:87.2%;height:20.4%', 'r10 hl'))}${tabbar('ben')}${HI}</div>`;
    },
    desc() {
      return `<div class="scr scr-white">${shot('descuentos.jpg', slot('desc', 'left:5.1%;top:12.75%;width:89.6%;height:24.5%', 'r10 hl'))}${HI}</div>`;
    },
    parking() {
      return `<div class="scr"><div class="tp">${SB(false, '9:41')}
        <h5>¡Gracias por tu visita!</h5>
        <p>Escaneá el ticket en la barrera para salir. Tenés tiempo hasta las:</p>
        <span class="time">⏱ 15:40</span>
        ${slot('parking', '', 'bn-tp hl')}
        <span class="acept">Aceptar</span></div>${HI}</div>`;
    },
    push() {
      const d = new Date();
      const date = d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
      const t = state.pushT || PUSH_DEMO.t, b = state.pushB || PUSH_DEMO.b;
      return `<div class="scr"><div class="lock">${SB(true, '')}
        <div class="lock-date">${esc(date.charAt(0).toUpperCase() + date.slice(1))}</div>
        <div class="lock-time">${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}</div>
        <div class="notif"><img src="assets/img/app-icon.png" alt=""><div class="nt"><div class="nh"><b>¡appa!</b><span>ahora</span></div><b>${esc(t)}</b><p>${esc(b)}</p></div></div>
        <div class="notif second"><img src="assets/img/app-icon.png" alt=""><div class="nt"><div class="nh"><b>¡appa!</b><span>hace 2 h</span></div><b>Disfrutá de un 10% OFF en Distrito Bs As</b><p>El descuento está disponible en los locales de Alto Comahue, DOT y Abasto.</p></div></div>
        <div class="lock-btm"><i><svg viewBox="0 0 24 24" fill="#fff"><path d="M9 2h6v5l-2 3v12h-2V10L9 7z"/></svg></i><i><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7l2-3h4l2 3"/></svg></i></div>
        </div>${HI}</div>`;
    },
    mail() {
      return `<div class="scr">${shot('mail.jpg', slot('mail', 'left:6.7%;top:37.2%;width:86.7%;height:48.5%', 'mail-slot'))}${SB(false, '3:00')}${HI}</div>`;
    }
  };
  const screenFor = { popup: 'popup', home1: 'home', home2: 'home', mall: 'mall', benef: 'benef', desc: 'desc', parking: 'parking', push: 'push', mail: 'mail' };

  // ---------- render ----------
  function renderPhone() {
    const scr = screenFor[state.fmt];
    $('#simPhone').innerHTML = scr === 'home' ? SCREENS.home(state.fmt) : SCREENS[scr]();
  }

  function renderInfo() {
    const f = fmtBy(state.fmt);
    const kp = f.kpis.map(k => `<div><b>${k[0]}</b><span>${k[1]}</span></div>`).join('');
    let extra = '';
    if (f.key === 'popup') extra = `<div class="fmt-warn">${f.warn}</div>
      <label class="toggle"><input type="checkbox" id="guideChk" ${state.guide ? 'checked' : ''}> Mostrar zona reservada del botón</label>`;
    if (f.key === 'push') extra = `<div class="push-edit"><label>Escribí tu notificación</label><input id="pushT" maxlength="50" placeholder="Título: ${esc(PUSH_DEMO.t)}" value="${esc(state.pushT)}">
      <input id="pushB" maxlength="140" placeholder="Mensaje" value="${esc(state.pushB)}"></div>`;
    const mine = !!state.pieces[f.key];
    const ex = f.text ? '<span class="ex-tag">Notificación real de ¡appa!</span>' : `<span class="ex-tag ${mine ? 'ex-mine' : ''}">${mine ? 'Vista previa con tu pieza' : `Campaña real · ${esc(f.brand)}`}</span>`;
    $('#fmtInfo').innerHTML = `${ex}<span class="fmt-where">${f.where}</span><h3>${f.name}</h3>${f.comm ? `<span class="fmt-comm">${f.comm}</span>` : ''}<p>${f.desc}</p>
      ${f.text ? '<div class="fmt-size">Texto <small>título + mensaje</small></div>' : `<div class="fmt-size">${sizeTxt(f)} <small>medida de la pieza</small></div>`}
      ${kp ? `<div class="fmt-kpis">${kp}</div>` : ''}${extra}`;

    const up = $('#inPiece').closest('.field');
    up.hidden = !!f.text;
    $('#pieceHint').innerHTML = f.text ? '' : `Medida ideal para ${f.name}: <b>${sizeTxt(f)}</b>`;
    $('#pieceLbl').textContent = mine ? 'Cambiar mi pieza ✓' : 'Subir mi pieza';
    $('#pieceLbl').parentElement.classList.toggle('has', mine);
    $('#clearPiece').hidden = !mine;

    const g = $('#guideChk'); if (g) g.onchange = () => { state.guide = g.checked; renderPhone(); };
    const pt = $('#pushT'), pb = $('#pushB');
    if (pt) { pt.oninput = () => { state.pushT = pt.value; renderPhone(); }; pb.oninput = () => { state.pushB = pb.value; renderPhone(); }; }
  }

  function renderTabs() {
    const box = $('#fmtTabs');
    box.innerHTML = FORMATS.map(f => `<button role="tab" data-k="${f.key}" aria-selected="${f.key === state.fmt}">${f.tab}</button>`).join('');
    box.onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      state.fmt = b.dataset.k;
      $$('button', box).forEach(x => x.setAttribute('aria-selected', x === b));
      renderInfo(); renderPhone();
      if (innerWidth < 1060) $('#simPhone').scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
  }

  const renderHero = () => { $('#heroPhone').innerHTML = SCREENS.home('').replace(/ hl/g, ''); };

  // ---------- carga de pieza ----------
  function bindControls() {
    $('#inPiece').onchange = e => {
      const file = e.target.files[0]; e.target.value = '';
      if (!file || !file.type.startsWith('image/')) return toast('Elegí un archivo de imagen (PNG o JPG)');
      const f = fmtBy(state.fmt), r = new FileReader();
      r.onload = () => {
        const img = new Image();
        img.onload = () => {
          state.pieces[f.key] = r.result; renderInfo(); renderPhone();
          const ok = f.key === 'mail' ? img.naturalWidth === 660 : (img.naturalWidth === f.w && img.naturalHeight === f.h);
          toast(ok ? '¡Medida perfecta!' : `Tu pieza mide ${img.naturalWidth} × ${img.naturalHeight} px. Ideal: ${sizeTxt(f)}`);
        };
        img.src = r.result;
      };
      r.readAsDataURL(file);
    };
    $('#clearPiece').onclick = () => { delete state.pieces[state.fmt]; renderInfo(); renderPhone(); };
  }

  // ---------- medidas ----------
  function shapeBox(w, h) {
    const s = Math.min(44 / w, 36 / h);
    return `<span class="spec-shape"><i style="width:${Math.max(6, w * s)}px;height:${Math.max(6, h * s)}px"></i></span>`;
  }
  function renderSpecs() {
    // Orden y nombres según la ficha oficial "Medidas de piezas"
    const ORDER = [['home1', 'Banner Home Principal'], ['home2', 'Banner Home Secundario'], ['benef', 'Banner Sección Beneficios'],
      ['desc', 'Banner Sección Descuentos'], ['mall', 'Banner Perfil Shopping Principal'], ['parking', 'Banner Parking'],
      ['popup', 'Pop-up'], ['mail', 'Mailing']];
    const NOTES = { home2: 'Ex Home Spot', parking: 'Touch Point · pantalla “¡Gracias por tu visita!”', popup: 'Dejar 240 px libres abajo para el botón de la app' };
    const rows = ORDER.map(([k, label]) => {
      const f = fmtBy(k), v = sizeTxt(f), note = NOTES[k] ? `<small>${NOTES[k]}</small>` : '';
      return `<div class="spec">${k === 'mail' ? shapeBox(660, 1100) : shapeBox(f.w, f.h)}<div class="spec-n">${label}${note}</div><button class="spec-v" data-copy="${v}">${v}</button></div>`;
    });
    $('#specAds').innerHTML = rows.join('');
    $('#specSocial').innerHTML = SOCIAL.map(([n, w, h]) => `<div class="spec">${shapeBox(w, h)}<div class="spec-n">${n}</div><button class="spec-v" data-copy="${w} x ${h} px">${w} × ${h} px</button></div>`).join('');
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-copy]'); if (!b) return;
      const txt = b.dataset.copy.replace('×', 'x');
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast(`Copiado: ${txt}`), () => toast(txt));
    });
  }

  // ---------- shoppings ----------
  function renderMalls() {
    const sq = ['alto-rosario', 'alcorta', 'alto-noa', 'mendoza', 'dot', 'alto-palermo', 'distrito-arcos', 'alto-comahue', 'palermo-off'];
    const one = MALLS.map(([k, n]) => `<img src="assets/logos/${k}.png" alt="${n}" class="${sq.includes(k) ? 'sq' : ''}" loading="lazy">`).join('');
    $('#mallTrack').innerHTML = one + one.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"');
  }

  // ---------- efectos ----------
  function effects() {
    const nav = $('#nav');
    const onScroll = () => nav.classList.toggle('scrolled', scrollY > 30);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();

    $$('.sec-head, .stat, .why-card, .real-fig, .kpi, .spec-group, .eco-i, .steps li, .camp-i, .gift-card, .gift-side, .insights, .funnel-card, .seg-copy, .ef, .dash, .enc-flow > div').forEach(el => el.classList.add('rv'));
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); io.unobserve(e.target);
      if (e.target.dataset.count) countUp(e.target);
    }), { threshold: .15 });
    $$('.rv, #funnel, [data-count]').forEach(el => io.observe(el));
  }
  function countUp(el) {
    const end = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0, pre = el.dataset.pre || '', suf = el.dataset.suf || '';
    const fmt = v => pre + (el.dataset.sep ? Math.round(v).toLocaleString('es-AR') : v.toFixed(dec)) + suf;
    const t0 = performance.now(), dur = 1400;
    const step = t => { const p = Math.min(1, (t - t0) / dur), e = 1 - (1 - p) ** 3; el.textContent = fmt(end * e); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }


  // ---------- vitrina de formatos (mismas pantallas que el simulador) ----------
  function renderShowcase() {
    const ITEMS = [
      ['home1', 'Banner Home Principal', 'in'], ['home2', 'Banner Home Secundario', 'in'], ['mall', 'Banner Perfil Shopping', 'in'],
      ['benef', 'Sección Beneficios', 'in'], ['desc', 'Sección Descuentos', 'in'], ['parking', 'Touch Point Parking', 'in'],
      ['popup', 'Pop-up', 'in'], ['push', 'Notificación Push', 'out'], ['mail', 'Mailing', 'out']
    ];
    const rail = $('#showRail');
    rail.innerHTML = ITEMS.map(([k, label, g], i) => {
      const scr = screenFor[k], html = scr === 'home' ? SCREENS.home(k) : SCREENS[scr]();
      const f = fmtBy(k);
      return `<article class="show-card" data-g="${g}" style="--i:${i}">
        <div class="show-phone"><div class="phone">${html}</div></div>
        <div class="show-meta"><span class="show-tag ${g}">${g === 'in' ? 'In-app' : 'Fuera de la app'}</span>
          <h4>${label}</h4><p>${f.text ? 'Título + mensaje' : sizeTxt(f)}${f.brand ? ` · ${esc(f.brand)}` : ''}</p></div>
      </article>`;
    }).join('');
    const step = () => (rail.querySelector('.show-card:not([hidden])')?.offsetWidth || 300) + 24;
    $('#showPrev').onclick = () => rail.scrollBy({ left: -step(), behavior: 'smooth' });
    $('#showNext').onclick = () => rail.scrollBy({ left: step(), behavior: 'smooth' });
    $('#showFilter').onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      $$('#showFilter button').forEach(x => x.setAttribute('aria-selected', x === b));
      $$('.show-card', rail).forEach(c => { c.hidden = b.dataset.g !== 'all' && c.dataset.g !== b.dataset.g; });
      rail.scrollTo({ left: 0, behavior: 'smooth' });
    };
  }

  // ---------- encuesta interactiva ----------
  function renderSurvey() {
    const opts = $('#svOpts'), stars = $('#svStars'); if (!opts) return;
    let know = 'Sí', rate = 5;
    const chip = () => {
      $('#svChip').textContent = `${know === 'No' ? 'No conocía la marca' : know === 'Poco' ? 'Conocía poco la marca' : 'Conocía la marca'} · ${rate} ★`;
      const c = $('.enc-chip-a'); c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop');
    };
    opts.onclick = e => { const b = e.target.closest('button'); if (!b) return; $$('button', opts).forEach(x => x.classList.toggle('on', x === b)); know = b.textContent; chip(); };
    stars.onclick = e => { const b = e.target.closest('button'); if (!b) return; const all = $$('button', stars); rate = all.indexOf(b) + 1; all.forEach((x, i) => x.classList.toggle('on', i < rate)); chip(); };
  }

  renderTabs(); renderInfo(); renderPhone(); renderHero(); renderShowcase(); renderSurvey(); bindControls(); renderSpecs(); renderMalls(); effects();
})();
