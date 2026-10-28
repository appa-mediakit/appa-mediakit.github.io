/* =====================================================================
   ¡appa! Intelligence · Textos de la página
   ---------------------------------------------------------------------
   Editá los textos acá sin tocar el HTML.
   - Usá **doble asterisco** para resaltar en verde.
   - Escribí siempre "¡appa!" con los dos signos.
   - Los íconos disponibles están en js/icons.js.
   ===================================================================== */
window.APPA_CONTENT = {
  nav: [
    { label: "Demo", href: "#demo" },
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "Seguridad", href: "#seguridad" },
    { label: "Resultados", href: "#resultados" }
  ],

  hero: {
    eyebrow: "Agente de IA privado para empresas",
    title: "Hablá con tu **negocio.**",
    subtitle:
      "Un agente de IA privado, conectado a los datos de tu empresa, que responde en segundos.",
    kicker: "Basta de esperar a que te responda otro: la IA te responde.",
    ctaPrimary: "Agendá una reunión",
    ctaSecondary: "Ver demo",
    trust: [
      { icon: "lock", text: "Tus datos no salen de tu empresa" },
      { icon: "clock", text: "Funcionando en 2 a 3 semanas" },
      { icon: "tag", text: "Costo fijo, sin tokens" }
    ],
    // Conversaciones que se repiten en el chat del hero (mismo formato que demos.js)
    chat: [
      {
        persona: "Gerencia General",
        question: "¿Cómo vienen las ventas de octubre contra el año pasado?",
        sources: ["ERP", "Facturación"],
        answer: {
          text: "Vienen **9% arriba**. La sucursal Norte es la que más empuja.",
          blocks: [
            {
              type: "kpis",
              items: [
                { label: "Ventas", value: "$ 263 M", delta: "▲ 9%", tone: "good" },
                { label: "Margen", value: "34,2%", delta: "▲ 1,1 pts", tone: "good" }
              ]
            }
          ]
        },
        followup: "¿Querés verlo por sucursal?"
      },
      {
        persona: "CFO",
        question: "¿Qué clientes tienen deuda vencida a más de 60 días?",
        sources: ["ERP", "Bancos"],
        answer: {
          text: "Son **14 clientes** y suman **$ 27,9 M**. Grupo Litoral concentra el 29%.",
          blocks: []
        },
        followup: "¿Querés el detalle por cliente?"
      },
      {
        persona: "Operaciones",
        question: "¿Qué productos se quedan sin stock en 15 días?",
        sources: ["Stock"],
        answer: {
          text: "Son **8 productos**. El más urgente se agota en **6 días**.",
          blocks: []
        },
        followup: "¿Querés que calcule cuánto reponer?"
      }
    ]
  },

  problem: {
    eyebrow: "El problema",
    title: "Los datos están. Las respuestas, no.",
    subtitle:
      "Tu empresa tiene la información. El problema es todo lo que hay que hacer para llegar a ella.",
    todayLabel: "Hoy",
    withLabel: "Con ¡appa! Intelligence",
    rows: [
      {
        today: "La información está repartida en sistemas, planillas y mails.",
        with: "Todo en una sola conversación."
      },
      {
        today: "Pedís un reporte y esperás días a que un analista lo arme.",
        with: "La respuesta llega en segundos, en plena reunión."
      },
      {
        today: "El software estándar no conoce tu criterio ni tus definiciones.",
        with: "El agente aprende cómo mide y decide tu empresa."
      },
      {
        today: "Para cruzar dos fuentes hay que exportar, pegar y rezar.",
        with: "Cruza fuentes, detecta patrones y valida hipótesis."
      }
    ]
  },

  demo: {
    eyebrow: "Demo interactiva",
    title: "Preguntá como le preguntarías a tu equipo.",
    subtitle:
      "Elegí un área y una pregunta. Así responde ¡appa! Intelligence con los datos de una empresa.",
    disclaimer: "Demo con datos ilustrativos."
  },

  how: {
    eyebrow: "Cómo funciona",
    title: "De la primera charla a las respuestas.",
    subtitle: "Sin migrar nada y sin cambiar cómo trabaja tu equipo.",
    badge: { value: "2 a 3", label: "semanas desde tu OK hasta que está funcionando" },
    steps: [
      {
        icon: "chat",
        title: "Discovery",
        text: "Una charla de 45 minutos y “las 5 preguntas que hoy más te cuesta responder”."
      },
      {
        icon: "plug",
        title: "Conectar",
        text: "Integramos tus sistemas con acceso de solo lectura. No hay que migrar nada."
      },
      {
        icon: "sliders",
        title: "Configurar",
        text: "Cargamos el criterio de tu negocio, sus definiciones y los permisos por rol."
      },
      {
        icon: "spark",
        title: "Conversar",
        text: "Tu equipo pregunta y obtiene respuestas en segundos."
      }
    ]
  },

  security: {
    eyebrow: "Seguridad",
    title: "Tu IA. Tus datos. Tus reglas.",
    subtitle:
      "¡appa! Intelligence funciona dentro de tu empresa. Tus datos no salen, no se pueden robar y no entrenan modelos de terceros.",
    points: [
      { icon: "network", title: "Red privada", text: "Todo funciona dentro de una red privada de tu empresa." },
      { icon: "server", title: "Servidor propio e IA local", text: "El modelo corre en un servidor propio, no en la nube de otro." },
      { icon: "eye", title: "Solo lectura", text: "Lee una réplica de los datos. Nunca modifica tus sistemas productivos." },
      { icon: "role", title: "Permisos por rol", text: "Cada persona ve solo lo que le corresponde." },
      { icon: "noCloud", title: "Sin terceros", text: "Tus datos no entrenan modelos de terceros ni viajan a servicios externos." }
    ],
    diagram: {
      perimeter: "Perímetro de tu empresa",
      nodes: [
        { icon: "database", title: "Tus sistemas", text: "ERP, CRM, bases, planillas" },
        { icon: "eye", title: "Réplica de solo lectura", text: "Una copia; tus sistemas no se tocan" },
        { icon: "brain", title: "Agente ¡appa! Intelligence", text: "IA local en servidor propio" },
        { icon: "role", title: "Tu equipo", text: "Cada uno ve lo que le corresponde" }
      ],
      outside: "Nubes y modelos de terceros",
      outsideNote: "Sin acceso a tus datos"
    }
  },

  integrations: {
    eyebrow: "Integraciones",
    title: "Se conecta a lo que ya usás.",
    subtitle: "No hay que migrar nada. Si tu empresa lo usa, ¡appa! Intelligence lo puede leer.",
    items: [
      { icon: "layers", label: "ERP" },
      { icon: "contacts", label: "CRM" },
      { icon: "database", label: "SQL Server" },
      { icon: "database", label: "Oracle" },
      { icon: "database", label: "PostgreSQL" },
      { icon: "database", label: "MySQL" },
      { icon: "sheet", label: "Excel" },
      { icon: "sheet", label: "Google Sheets" },
      { icon: "receipt", label: "Facturación" },
      { icon: "box", label: "Stock" },
      { icon: "parking", label: "Parking" },
      { icon: "heart", label: "Fidelización" }
    ],
    more: "Y cualquier otra fuente con acceso de lectura."
  },

  results: {
    eyebrow: "Resultados reales",
    title: "El valor se mide en **horas.**",
    subtitle: "¡appa! Intelligence ya está en producción. Esto es lo que pasó.",
    casesTitle: "Ya funcionando en"
  },

  backing: {
    eyebrow: "Respaldo",
    title: "Detrás, un equipo que ya lo hizo.",
    text:
      "¡appa! Intelligence está desarrollado por BoulderTech, parte de Shefa Ventures, el brazo de inversión en tecnología de IRSA.",
    people: [
      {
        name: "Rodrigo Benzaquen",
        role: "Fundador de BoulderTech",
        anon: "Su fundador",
        text: "Fue el primer empleado técnico de Mercado Libre."
      },
      {
        name: "Pablo Hegoburu",
        role: "CTO de BoulderTech",
        anon: "Su CTO",
        text: "Ingeniero nuclear del Instituto Balseiro."
      }
    ]
  },

  testimonials: {
    eyebrow: "Lo que dicen",
    title: "Equipos que ya hablan con su negocio."
  },

  why: {
    eyebrow: "Por qué ¡appa! Intelligence",
    title: "No es otro software. Es tu negocio, respondiendo.",
    items: [
      { icon: "puzzle", title: "Hecho a tu medida", text: "No es un template. Se configura con tus definiciones, tus reglas y tu forma de medir." },
      { icon: "search", title: "Preguntá directo", text: "Sin tableros que aprender ni reportes que pedir. Preguntás como hablás y te responde." },
      { icon: "growth", title: "Evoluciona con vos", text: "Tiene memoria y aprende con cada pregunta. Cuanto más lo usás, mejor te conoce." },
      { icon: "tag", title: "Costo fijo, sin sorpresas", text: "Setup y abono fijo. Sin tokens, sin créditos y sin costo por consulta." }
    ]
  },

  cta: {
    eyebrow: "Empecemos",
    title: "¿Qué le preguntarías hoy a tu negocio?",
    subtitle:
      "Contanos y armamos una reunión de 45 minutos para ver cómo se vería con tus datos. Sin compromiso.",
    bullets: [
      "Reunión de 45 minutos con nuestro equipo",
      "Trabajamos sobre tus 5 preguntas más difíciles",
      "Funcionando en 2 a 3 semanas desde tu OK"
    ],
    calendarButton: "Elegí un horario en la agenda",
    form: {
      name: "Nombre y apellido",
      company: "Empresa",
      role: "Cargo",
      email: "Mail de trabajo",
      question: "¿Qué pregunta de tu negocio te gustaría responder hoy?",
      questionPlaceholder: "Ej.: ¿Qué clientes están comprando menos que el año pasado?",
      submit: "Agendá una reunión",
      privacy: "Usamos estos datos solo para contactarte por esta consulta.",
      successTitle: "¡Listo! Ya recibimos tu consulta.",
      successText: "Te escribimos en las próximas 24 horas hábiles para coordinar la reunión.",
      successMailto: "Se abrió tu programa de mail con la consulta lista. Solo falta que la envíes.",
      // Se muestra mientras no haya contactEmail ni formEndpoint en data/config.js
      successPreviewTitle: "Gracias por tu interés.",
      successPreview: "Esta es una versión de prueba: el formulario todavía no envía consultas. Pronto vas a poder agendar desde acá.",
      errorRequired: "Completá este campo.",
      errorEmail: "Revisá el mail: parece que falta algo."
    }
  },

  footer: {
    tagline: "Hablá con tu negocio.",
    poweredBy: "powered by BoulderTech",
    contactLabel: "Contacto",
    contactFallback: "Escribinos desde el formulario",
    legal: "Los datos de la demo son ilustrativos."
  }
};
