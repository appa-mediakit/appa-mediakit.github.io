/* ¡appa! Media Kit — simulador de formatos con campañas reales */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Medidas oficiales (fuente: "Medidas de piezas" ¡appa!)
  // demo = pieza real que se muestra por defecto · brand = marca del ejemplo
  const FORMATS = [
    { key: 'popup', tab: 'Pop-up', name: 'Pop-up Banner', where: 'In-app · when the app opens', w: 960, h: 1398,
      demo: 'assets/creas/levis-popup.jpg', brand: "Levi's",
      desc: 'Shows at login, the moment the user opens ¡appa! Can be targeted by mall and audience type.',
      kpis: [['12%', 'CTR: 12 out of every 100 impressions end in a click'], ['1.23', 'average exposures per user']],
      warn: 'Keep the <b>bottom 240 px</b> clear: that’s where the app places its action button.' },
    { key: 'home1', tab: 'Main Home', name: 'Main Home Banner', where: 'In-app · home screen', w: 1240, h: 598,
      demo: 'assets/creas/newera.jpg', brand: 'New Era', comm: 'Shared use: sold by both ¡appa! and the shopping malls',
      desc: 'The first visual impact when the app opens, ideal for mass-reach communication. Can be targeted by mall and audience type.',
      kpis: [['68,100', 'average monthly views per banner']] },
    { key: 'home2', tab: 'Secondary Home', name: 'Secondary Home Banner', where: 'In-app · home screen (formerly Home Spot)', w: 750, h: 174,
      demo: 'assets/creas/nueva-funcion.jpg', brand: '¡appa!', fit: 'contain', comm: 'Sold exclusively by ¡appa!',
      desc: 'A strategic spot on the app’s home screen to broaden your brand’s visibility with a direct message.',
      kpis: [['68,100', 'average monthly views per banner']] },
    { key: 'mall', tab: 'Mall Profile', name: 'Main Mall Profile Banner', where: 'In-app · each mall’s profile', w: 686, h: 196,
      demo: 'assets/creas/musica.jpg', brand: 'Abasto Shopping', comm: 'Mostly used by the shopping malls',
      desc: 'A space on each mall’s profile to highlight value propositions, exclusive store promotions or on-site events. Targeted by the audience you want to reach.',
      kpis: [['17', 'malls available'], ['+1,300', 'brands on the app']] },
    { key: 'benef', tab: 'Perks Section', name: 'Perks Section Banner', where: 'In-app · Perks section', w: 1200, h: 610,
      demo: 'assets/creas/byd.jpg', brand: 'BYD', comm: 'Sold exclusively by ¡appa!',
      desc: 'Highly recommended to promote loyalty programs and targeted ads, making sure they reach the right audience.',
      kpis: [['8 of 10', 'users check promotions before they visit']] },
    { key: 'desc', tab: 'Discounts Section', name: 'Discounts Section Banner', where: 'In-app · Discounts section', w: 1200, h: 610,
      demo: 'assets/creas/xterra.jpg', brand: 'Xterra', comm: 'Sold exclusively by ¡appa!',
      desc: 'Your brand at the very top of the ¡appa! discounts list. Highly recommended for targeted ads.',
      kpis: [['+130%', 'more spend by ¡appa! users']] },
    { key: 'parking', tab: 'Touch Point', name: 'Parking Banner · Touch Point', where: 'In-app · parking exit', w: 694, h: 870,
      demo: 'assets/creas/lidherma.jpg', brand: 'Lidherma', comm: 'Sold exclusively by ¡appa!',
      desc: 'Shows on the “Thanks for your visit!” screen, right after the user pays for parking. It taps into high user traffic and drives a high conversion rate.',
      kpis: [['~322,000', 'potential impressions per month'], ['~10,700', 'impressions per day'], ['All', 'malls operated with ¡appa!']] },
    { key: 'push', tab: 'Push Notification', name: 'Push Notification', where: 'Outside the app · phone screen', w: 0, h: 0, text: true,
      desc: 'Lands straight on the phone screen, even when the app is closed. Sent to micro-targeted audiences: up to 30 characters of title and 90 of message.',
      kpis: [['80%', 'delivery rate to devices'], ['450k → 16k', 'tailored targeting']] },
    { key: 'mail', tab: 'Email', name: 'Email', where: 'Outside the app · inbox', w: 660, h: 0,
      demo: 'assets/creas/lidherma.jpg', brand: 'Lidherma',
      desc: 'Sent to ¡appa! users micro-targeted by their latest transactions. E.g. users who shopped at DOT mall in the last 3 months.',
      kpis: [['6.89%', 'CTOR: of those who open the email, click']] }
  ];
  const SOCIAL = [
    ['Instagram · Story', 1080, 1920], ['Instagram · Square post', 1080, 1080], ['Instagram · Portrait post', 1080, 1350],
    ['LinkedIn · Landscape post', 1200, 627], ['LinkedIn · Square post', 1200, 1200]
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
    b: 'Super Miércoles Santander 🥳 Corré a tu shopping y aprovechá hasta 35% de ahorro.'
  };

  const state = { pieces: {}, fmt: 'popup', guide: true, pushT: '', pushB: '' };

  // ---------- utilidades ----------
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtBy = k => FORMATS.find(f => f.key === k);
  const sizeTxt = f => f.key === 'mail' ? '660 px wide · any height' : `${f.w} × ${f.h} px`;
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
  const SB = (light = false, time = '9:41') => `<div class="sb ${light ? 'sb-light' : ''}"><span>${time}</span><span class="sb-ic">
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
  // ---------- pantallas de la app, construidas en código (estilo iPhone) ----------
  const R = (k, ratio, cls = '', st = '') => slot(k, `position:relative;left:auto;top:auto;width:100%;aspect-ratio:${ratio};${st}`, cls);
  const svg = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 17V11a6 6 0 0 1 12 0v6l1.5 2h-15z"/><path d="M10 21h4"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="#0DD6A8" stroke-width="2"><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 5l-7 7 7 7"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="#E53935"><path d="M12 21s-7.5-4.6-9.5-9.2C1 8.3 3.4 5 6.8 5c2 0 3.6 1.1 5.2 3 1.6-1.9 3.2-3 5.2-3 3.4 0 5.8 3.3 4.3 6.8C19.5 16.4 12 21 12 21z"/></svg>',
    ret: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 14l-5-5 5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-2"/></svg>',
    fwd: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 14l5-5-5-5"/><path d="M20 9H10a6 6 0 0 0 0 12h2"/></svg>'
  };
  const homeBody = (hlKey) => `
      <div class="hm-top"><img class="hm-av" src="assets/img/app-icon.png" alt=""><div class="hm-hi"><b>¡Hola!</b><img src="assets/img/logo-appa.png" alt="¡appa!"></div><span class="hm-ic">${svg.search}</span><span class="hm-ic hm-bell">${svg.bell}<i>3</i></span></div>
      <div class="hm-loc">${svg.pin}<span>Elegí tu ubicación</span>${svg.down}</div>
      <div class="hm-tiles"><div><img src="assets/ui/ic-gift.png" alt="">¡appa! GIFT</div><div><img src="assets/ui/ic-shop.png" alt="">Shoppings</div><div><img src="assets/ui/ic-park.png" alt="">Parking</div></div>
      <div class="hm-ban">${R('home1', '1240/598', 'r-ui' + (hlKey === 'home1' ? ' hl' : ''))}</div>
      <div class="hm-club"><div class="hm-cl"><img src="assets/ui/apcrew.png" alt=""><div><small>AP CREW</small><b>Nivel 1</b></div></div><div class="hm-bar"><i></i></div><div class="hm-lv"><span>Nivel 1</span><span>Nivel 2</span></div><div class="hm-pts"><span>Puntos</span><b>6</b></div></div>
      <div class="hm-mini"><div><img src="assets/ui/ic-fact.png" alt=""><span>Cargar facturas</span>${svg.chev}</div><div><img src="assets/ui/ic-food.png" alt=""><span>Pedir comida</span>${svg.chev}</div></div>
      <div class="hm-ban2">${R('home2', '750/174', 'r-ui2' + (hlKey === 'home2' ? ' hl' : ''))}</div>
      <div class="ui-sec"><b>Descuentos con ¡appa!</b><span>Ver más ›</span></div>
      ${dCards([['brioche', 'Brioche Dorée', '30 % OFF', 'Abasto Shopping', false], ['yagmour', 'Yagmour', '15 % OFF', 'Distrito Arcos', true]])}`;

  const notifCard = (t, b, when, cls = '') => `<div class="notif ${cls}"><img src="assets/img/app-icon.png" alt=""><div class="nt"><div class="nh"><b>¡appa!</b><span>${when}</span></div><b>${esc(t)}</b><p>${esc(b)}</p></div></div>`;
  const dCards = (list) => `<div class="ml-cards hm-cards">${list.map(c => `<div class="ml-card"><img src="assets/ui/${c[0]}.png" alt=""><small>${c[1]}</small><b>${c[2]}</b><em>${c[3]}</em>${c[4] ? '<i>¡appa! GIFT</i>' : ''}</div>`).join('')}<div class="ml-card ml-peek"></div></div>`;

  const SCREENS = {
    home(hl) {
      return `<div class="scr ui-scr">${SB()}<div class="ui ui-home${hl === 'home2' ? ' is-scrolled' : ''}"><div class="ui-body">${homeBody(hl)}</div></div>${tabbar('home')}${HI}</div>`;
    },
    popup() {
      const mine = !!state.pieces.popup;
      return `<div class="scr ui-scr">${SB()}<div class="ui ui-home"><div class="ui-body">${homeBody('')}</div></div>${tabbar('home')}
        <div class="dim"><div class="modal">
          ${slot('popup', 'position:relative;left:auto;top:auto;width:100%;aspect-ratio:960/1398', 'r0')}
          ${mine ? '<span class="modal-x">✕</span>' : ''}
          <div class="modal-zone${state.guide ? ' guide' : ''}">${mine ? '<span class="app-btn">Conocer</span>' : ''}</div>
        </div></div>${HI}</div>`;
    },
    mall() {

      return `<div class="scr ui-scr ui-purple">${SB(true)}<div class="ui ui-mall">
        <div class="ml-hd"><span class="ui-back">${svg.back}</span><span class="ml-logo"><img src="assets/ui/abasto.png" alt=""></span><b>Abasto Shopping</b><span class="ml-fav">${svg.heart}</span></div>
        <div class="ml-sheet">
          ${R('mall', '686/196', 'r-ui3 hl')}
          <div class="ui-sec"><b>Descuentos con ¡appa!</b><span>Ver más ›</span></div>
          ${dCards([['brioche', 'Brioche Dorée', '30 % OFF', 'Válido en toda la tienda', false], ['b2', 'Natura', '20 % OFF', 'Locales adheridos', true]])}
          <div class="ui-sec"><b>Marcas destacadas</b><span>Ver más ›</span></div>
          <div class="ml-brands">${[1, 2, 3, 4, 5].map(i => `<img src="assets/ui/b${i}.png" alt="">`).join('')}</div>
        </div></div>${tabbar('home')}${HI}</div>`;
    },
    benef() {
      const rows = [['l-abasto', 'Abasto Shopping', '2x1 en cines', 'Válido de lunes a jueves'], ['l-e', 'Alto Palermo', '1 h gratis de parking', 'De 8 a 13 h'], ['l-abasto', 'Abasto Shopping', '15% OFF en gastronomía', 'Locales adheridos']]
        .map(r => `<div class="bn-row"><img src="assets/ui/${r[0]}.png" alt=""><div><small>${r[1]}</small><b>${r[2]}</b><em>${r[3]}</em></div><span>Ver más ⌄</span></div>`).join('');
      return `<div class="scr ui-scr">${SB()}<div class="ui ui-white">
        <div class="ui-hd"><span class="ui-back">${svg.back}</span><b>Beneficios</b></div>
        <div class="bn-car">${R('benef', '1200/610', 'r-ui hl')}<span class="bn-peek"></span></div>
        <div class="bn-dots"><i class="on"></i><i></i><i></i><i></i></div>
        <div class="bn-list">${rows}</div>
        </div>${tabbar('ben')}${HI}</div>`;
    },
    desc() {
      return `<div class="scr ui-scr">${SB()}<div class="ui ui-white">
        <div class="ui-hd"><span class="ui-back">${svg.back}</span><b>Descuentos</b></div>
        <div class="ds-ban">${R('desc', '1200/610', 'r-ui hl')}</div>
        <div class="ds-chips"><span class="on">Todos</span><span>Destacados</span><span>Hombre</span><span>Mujer</span></div>
        <div class="ui-sec ui-sec-l"><b>Destacados</b></div>
        <div class="ml-cards ds-cards">
          <div class="ml-card"><img src="assets/ui/yagmour.png" alt=""><small>Yagmour</small><b>15 % OFF</b><em>Distrito Arcos</em></div>
          <div class="ml-card"><img src="assets/ui/helena.png" alt=""><small>HELENA SPIRIT OF…</small><b>15 % OFF</b><em>Alto Palermo</em><i>¡appa! GIFT</i></div>
          <div class="ml-card ml-peek"></div>
        </div>
        <div class="ui-sec ui-sec-l"><b>Hombre</b></div>
        <div class="ds-cards">${dCards([['b3', 'Dash Deportes', '20 % OFF', 'Alto Avellaneda', true], ['b4', 'Dexter', '10 % OFF', 'Abasto Shopping', false]])}</div>
        </div>${tabbar('home')}${HI}</div>`;
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
      return `<div class="scr"><div class="lock">${SB(true, '9:41')}
        <div class="lock-date">${esc(date.charAt(0).toUpperCase() + date.slice(1))}</div>
        <div class="lock-time">${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}</div>
        ${notifCard(t, b, 'ahora')}
        <div class="notif second"><img src="assets/img/app-icon.png" alt=""><div class="nt"><div class="nh"><b>¡appa!</b><span>hace 2 h</span></div><b>10% OFF en Distrito Bs As</b><p>El descuento está disponible en los locales de Alto Comahue, DOT y Abasto.</p></div></div>
        <div class="lock-btm"><i><svg viewBox="0 0 24 24" fill="#fff"><path d="M9 2h6v5l-2 3v12h-2V10L9 7z"/></svg></i><i><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7l2-3h4l2 3"/></svg></i></div>
        </div>${HI}</div>`;
    },
    mail() {
      return `<div class="scr ui-scr">${SB()}<div class="ui ui-white ui-mail">
        <div class="mx-nav"><span class="ui-back">${svg.back}</span><span>Recibidos</span></div>
        <h6 class="mx-subj">Especial San Valentín 💚</h6>
        <div class="mx-from"><img src="assets/img/app-icon.png" alt=""><div><b>¡appa!</b><small>para mí</small></div><span>12 feb</span></div>
        <div class="mx-body"><div class="mx-wrap"><img class="mx-logo" src="assets/img/logo-appa-mono-white.png" alt="¡appa!">
          ${R('mail', '620/733', 'mail-slot')}
          <p>Beneficio exclusivo para usuarios de ¡appa! · Aplican TyC</p></div></div>
        <div class="mx-bar"><span>${svg.ret}Responder</span><span>${svg.fwd}Reenviar</span></div>
        </div>${HI}</div>`;
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
      <label class="toggle"><input type="checkbox" id="guideChk" ${state.guide ? 'checked' : ''}> Show the reserved button area</label>`;
    if (f.key === 'push') extra = `<div class="notif-zoom"><small>Enlarged view</small>${notifCard(state.pushT || PUSH_DEMO.t, state.pushB || PUSH_DEMO.b, 'ahora', 'big')}</div>`;
    const mine = !!state.pieces[f.key];
    const ex = f.text ? '<span class="ex-tag">Real ¡appa! notification</span>' : `<span class="ex-tag ${mine ? 'ex-mine' : ''}">${mine ? 'Preview with your creative' : `Real campaign · ${esc(f.brand)}`}</span>`;
    $('#fmtInfo').innerHTML = `${ex}<span class="fmt-where">${f.where}</span><h3>${f.name}</h3>${f.comm ? `<span class="fmt-comm">${f.comm}</span>` : ''}<p>${f.desc}</p>
      ${f.text ? '<div class="fmt-size">30 + 90 <small>title and message characters</small></div>' : `<div class="fmt-size">${sizeTxt(f)} <small>creative size</small></div>`}
      ${kp ? `<div class="fmt-kpis">${kp}</div>` : ''}${extra}`;

    const up = $('#inPiece').closest('.field');
    up.hidden = !!f.text;
    $('#pieceHint').innerHTML = f.text ? '' : `Ideal size for ${f.name}: <b>${sizeTxt(f)}</b>`;
    $('#pieceLbl').textContent = mine ? 'Change my creative ✓' : 'Upload my creative';
    $('#pieceLbl').parentElement.classList.toggle('has', mine);
    $('#clearPiece').hidden = !mine;

    const g = $('#guideChk'); if (g) g.onchange = () => { state.guide = g.checked; renderPhone(); };
    $('#pushField').hidden = !f.text;
    $('#step2T').textContent = f.text ? 'Write your notification' : 'Try your creative';
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
      if (!file || !file.type.startsWith('image/')) return toast('Choose an image file (PNG or JPG)');
      const f = fmtBy(state.fmt), r = new FileReader();
      r.onload = () => {
        const img = new Image();
        img.onload = () => {
          state.pieces[f.key] = r.result; renderInfo(); renderPhone();
          const ok = f.key === 'mail' ? img.naturalWidth === 660 : (img.naturalWidth === f.w && img.naturalHeight === f.h);
          toast(ok ? 'Perfect size!' : `Your creative is ${img.naturalWidth} × ${img.naturalHeight} px. Ideal: ${sizeTxt(f)}`);
        };
        img.src = r.result;
      };
      r.readAsDataURL(file);
    };
    $('#clearPiece').onclick = () => { delete state.pieces[state.fmt]; renderInfo(); renderPhone(); };
    const pt = $('#pushT'), pb = $('#pushB');
    const onPush = () => {
      state.pushT = pt.value; state.pushB = pb.value;
      $('#cntT').textContent = `${pt.value.length}/30`; $('#cntB').textContent = `${pb.value.length}/90`;
      renderPhone(); const z = $('.notif-zoom'); if (z) z.innerHTML = `<small>Enlarged view</small>${notifCard(state.pushT || PUSH_DEMO.t, state.pushB || PUSH_DEMO.b, 'ahora', 'big')}`;
    };
    pt.oninput = pb.oninput = onPush;
    $('#clearPush').onclick = () => { pt.value = pb.value = ''; onPush(); };
  }

  // ---------- medidas ----------
  function shapeBox(w, h) {
    const s = Math.min(44 / w, 36 / h);
    return `<span class="spec-shape"><i style="width:${Math.max(6, w * s)}px;height:${Math.max(6, h * s)}px"></i></span>`;
  }
  function renderSpecs() {
    // Orden y nombres según la ficha oficial "Medidas de piezas"
    const ORDER = [['home1', 'Main Home Banner'], ['home2', 'Secondary Home Banner'], ['benef', 'Perks Section Banner'],
      ['desc', 'Discounts Section Banner'], ['mall', 'Main Mall Profile Banner'], ['parking', 'Parking Banner'],
      ['popup', 'Pop-up'], ['mail', 'Email']];
    const NOTES = { home2: 'Formerly Home Spot', parking: 'Touch Point · “Thanks for your visit!” screen', popup: 'Keep the bottom 240 px clear for the app button' };
    const rows = ORDER.map(([k, label]) => {
      const f = fmtBy(k), v = sizeTxt(f), note = NOTES[k] ? `<small>${NOTES[k]}</small>` : '';
      return `<div class="spec">${k === 'mail' ? shapeBox(660, 1100) : shapeBox(f.w, f.h)}<div class="spec-n">${label}${note}</div><button class="spec-v" data-copy="${v}">${v}</button></div>`;
    });
    rows.push(`<div class="spec">${shapeBox(40, 24)}<div class="spec-n">Push Notification<small>Text only</small></div><span class="spec-v na">Title 30 · Message 90 characters</span></div>`);
    $('#specAds').innerHTML = rows.join('');
    $('#specSocial').innerHTML = SOCIAL.map(([n, w, h]) => `<div class="spec">${shapeBox(w, h)}<div class="spec-n">${n}</div><button class="spec-v" data-copy="${w} x ${h} px">${w} × ${h} px</button></div>`).join('');
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-copy]'); if (!b) return;
      const txt = b.dataset.copy.replace('×', 'x');
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast(`Copied: ${txt}`), () => toast(txt));
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
    const fmt = v => pre + (el.dataset.sep ? Math.round(v).toLocaleString('en-US') : v.toFixed(dec)) + suf;
    const t0 = performance.now(), dur = 1400;
    const step = t => { const p = Math.min(1, (t - t0) / dur), e = 1 - (1 - p) ** 3; el.textContent = fmt(end * e); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }


  // ---------- vitrina de formatos (mismas pantallas que el simulador) ----------
  function renderShowcase() {
    const ITEMS = [
      ['home1', 'Main Home Banner', 'in'], ['home2', 'Secondary Home Banner', 'in'], ['mall', 'Mall Profile Banner', 'in'],
      ['benef', 'Perks Section', 'in'], ['desc', 'Discounts Section', 'in'], ['parking', 'Parking Touch Point', 'in'],
      ['popup', 'Pop-up', 'in'], ['push', 'Push Notification', 'out'], ['mail', 'Email', 'out']
    ];
    const rail = $('#showRail');
    rail.innerHTML = ITEMS.map(([k, label, g], i) => {
      const scr = screenFor[k], html = scr === 'home' ? SCREENS.home(k) : SCREENS[scr]();
      const f = fmtBy(k);
      return `<article class="show-card" data-g="${g}" style="--i:${i}">
        <div class="show-phone"><div class="phone">${html}</div></div>
        <div class="show-meta"><span class="show-tag ${g}">${g === 'in' ? 'In-app' : 'Outside the app'}</span>
          <h4>${label}</h4><p>${f.text ? 'Title + message' : sizeTxt(f)}${f.brand ? ` · ${esc(f.brand)}` : ''}</p></div>
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
    let know = 'Yes', rate = 5;
    const chip = () => {
      $('#svChip').textContent = `${know === 'No' ? 'Didn’t know the brand' : know === 'A little' ? 'Knew the brand a little' : 'Knew the brand'} · ${rate} ★`;
      const c = $('.enc-chip-a'); c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop');
    };
    opts.onclick = e => { const b = e.target.closest('button'); if (!b) return; $$('button', opts).forEach(x => x.classList.toggle('on', x === b)); know = b.textContent; chip(); };
    stars.onclick = e => { const b = e.target.closest('button'); if (!b) return; const all = $$('button', stars); rate = all.indexOf(b) + 1; all.forEach((x, i) => x.classList.toggle('on', i < rate)); chip(); };
  }

  renderTabs(); renderInfo(); renderPhone(); renderHero(); renderShowcase(); renderSurvey(); bindControls(); renderSpecs(); renderMalls(); effects();
})();
