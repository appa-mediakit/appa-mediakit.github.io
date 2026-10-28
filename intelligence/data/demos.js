/* =====================================================================
   ¡appa! Intelligence · Contenido de la demo por área
   ---------------------------------------------------------------------
   Este archivo se puede editar sin tocar el código.
   Todos los datos son FICTICIOS y de una empresa genérica.

   Cada área tiene:
     id        identificador sin espacios (no cambiar si no hace falta)
     label     nombre del tab
     icon      ícono (ver js/icons.js)
     persona   quién hace la pregunta en el chat
     purpose   texto de "Para qué sirve"
     connects  lista de "Se conecta a"
     cases     6 casos. El primero se muestra por defecto.

   Cada caso tiene:
     chip      texto corto del botón de pregunta sugerida
     tag       para qué sirve este caso puntual
     question  lo que escribe la persona
     sources   (opcional) fuentes consultadas; si falta, usa "connects"
     time      (opcional) tiempo de respuesta que se muestra
     persona   (opcional) reemplaza a la persona del área
     answer    { text, blocks: [...], note }
     followup  sugerencia de seguimiento del agente

   Tipos de bloque para "blocks":
     { type: "kpis",  items: [{ label, value, delta, tone }] }
     { type: "bars",  title, items: [{ label, value, display, tone }] }
     { type: "table", columns: [...], rows: [[...], ...] }
     { type: "line",  title, labels: [...], values: [...], unit, highlight }
     { type: "list",  items: ["...", "..."], ordered }
   tone puede ser "good", "bad" o "warn".
   Las celdas de tabla pueden ser texto o { v: "texto", tone: "bad" }.
   Usá **doble asterisco** para resaltar en negrita.
   ===================================================================== */

window.APPA_DEMOS = [
  /* ------------------------------------------------------------------ */
  {
    id: "comercial",
    label: "Comercial / Ventas",
    icon: "trend",
    persona: "Gerencia Comercial",
    purpose:
      "Seguí el objetivo del mes, prepará reuniones y detectá clientes en riesgo sin pedirle un reporte a nadie.",
    connects: ["CRM", "Facturación", "Listas de precios", "Pipeline"],
    cases: [
      {
        chip: "Ventas vs. objetivo",
        tag: "Estado del pipeline",
        question:
          "¿Cuánto llevamos vendido este mes contra el objetivo y qué oportunidades están por cerrar?",
        sources: ["CRM", "Facturación"],
        time: "4,1 s",
        answer: {
          text:
            "Al día 22 llevan vendido **$ 184,6 M**, el **78%** del objetivo de $ 236 M. Al ritmo actual cerrarían el mes en 102%. Estas son las oportunidades con más chances de cierre:",
          blocks: [
            {
              type: "kpis",
              items: [
                { label: "Vendido", value: "$ 184,6 M" },
                { label: "Objetivo", value: "$ 236 M" },
                { label: "Avance", value: "78%", delta: "▲ 6 pts vs. mes anterior", tone: "good" }
              ]
            },
            {
              type: "table",
              columns: ["Oportunidad", "Monto", "Etapa", "Prob."],
              rows: [
                ["Grupo Andino · renovación", "$ 18,4 M", "Negociación", { v: "80%", tone: "good" }],
                ["Distribuidora Del Sur", "$ 12,1 M", "Propuesta", "65%"],
                ["Ferretería Los Álamos", "$ 7,9 M", "Negociación", { v: "75%", tone: "good" }],
                ["Supermercados Ruta 3", "$ 6,3 M", "Propuesta", "50%"]
              ]
            }
          ]
        },
        followup: "¿Querés que lo desglose por vendedor?"
      },
      {
        chip: "Resumen de un cliente",
        tag: "Preparar una reunión",
        question:
          "Armame un resumen de Ferretería Los Álamos: qué compró en 12 meses, ticket promedio y últimos reclamos",
        sources: ["CRM", "Facturación", "Tickets"],
        time: "5,3 s",
        answer: {
          text:
            "Ferretería Los Álamos compró **$ 64,8 M** en los últimos 12 meses (+14% interanual), en 38 pedidos. Ticket promedio: **$ 1,7 M**.",
          blocks: [
            {
              type: "bars",
              title: "Qué compra (% de la facturación)",
              items: [
                { label: "Herramientas eléctricas", value: 42, display: "42%" },
                { label: "Fijaciones", value: 23, display: "23%" },
                { label: "Pinturas", value: 18, display: "18%" },
                { label: "Otros", value: 17, display: "17%" }
              ]
            },
            {
              type: "list",
              items: [
                "**14/08** · Entrega parcial · resuelto en 48 hs",
                "**03/05** · Diferencia de precio en factura · nota de crédito emitida"
              ]
            }
          ]
        },
        followup: "¿Querés que te arme 3 temas para llevar a la reunión?"
      },
      {
        chip: "Clientes en riesgo",
        tag: "Clientes en riesgo",
        question:
          "¿Qué clientes bajaron más de 30% su compra contra el trimestre anterior?",
        sources: ["Facturación", "CRM"],
        time: "3,8 s",
        answer: {
          text:
            "Encontré **7 clientes** que bajaron más de 30% su compra. En conjunto son **$ 21,3 M** menos de facturación. Los 4 más relevantes:",
          blocks: [
            {
              type: "table",
              columns: ["Cliente", "Trim. anterior", "Trim. actual", "Variación"],
              rows: [
                ["Supermercados Ruta 3", "$ 9,8 M", "$ 5,1 M", { v: "−48%", tone: "bad" }],
                ["Autoservicio La Esquina", "$ 6,2 M", "$ 3,9 M", { v: "−37%", tone: "bad" }],
                ["Maxikiosco Central", "$ 2,9 M", "$ 1,9 M", { v: "−34%", tone: "bad" }],
                ["Grupo Litoral", "$ 11,4 M", "$ 7,6 M", { v: "−33%", tone: "bad" }]
              ]
            }
          ]
        },
        followup: "¿Querés ver qué productos dejaron de comprar?"
      },
      {
        chip: "Venta cruzada",
        tag: "Venta cruzada",
        question: "¿Qué clientes compran el producto A pero nunca compraron el B?",
        sources: ["Facturación", "CRM"],
        time: "4,6 s",
        answer: {
          text:
            "**126 clientes** compran el producto A pero nunca compraron el B. Los clientes que compran los dos gastan **2,3 veces más** por pedido. Los de mayor potencial:",
          blocks: [
            {
              type: "table",
              columns: ["Cliente", "Compra anual de A", "Zona"],
              rows: [
                ["Grupo Andino", "$ 22,4 M", "Norte"],
                ["Distribuidora Del Sur", "$ 15,7 M", "Sur"],
                ["Mayorista El Puente", "$ 9,1 M", "Oeste"],
                ["Comercial San Martín", "$ 6,8 M", "Centro"]
              ]
            }
          ]
        },
        followup: "¿Querés que arme la lista completa para el equipo de ventas?"
      },
      {
        chip: "Ranking de vendedores",
        tag: "Rendimiento del equipo",
        question: "Comparame a los vendedores por cierre, ticket y tiempo de cierre",
        sources: ["CRM", "Facturación"],
        time: "3,9 s",
        answer: {
          text:
            "Comparé a los 5 vendedores en los últimos 6 meses. **L. Fernández** lidera en tasa de cierre y **M. Gómez** es quien cierra más rápido.",
          blocks: [
            {
              type: "table",
              columns: ["Vendedor", "Cierre", "Ticket prom.", "Días a cierre"],
              rows: [
                ["L. Fernández", { v: "38%", tone: "good" }, "$ 2,4 M", "21"],
                ["M. Gómez", "31%", "$ 1,9 M", { v: "14", tone: "good" }],
                ["P. Álvarez", "27%", "$ 2,8 M", "33"],
                ["S. Romero", "24%", "$ 1,6 M", "19"],
                ["J. Castro", "19%", "$ 1,4 M", "26"]
              ]
            }
          ]
        },
        followup: "¿Querés verlo por tipo de cliente?"
      },
      {
        chip: "Descuentos fuera de política",
        tag: "Control de margen",
        question: "¿Qué descuentos se dieron por encima de la política y a quién?",
        sources: ["Facturación", "Listas de precios"],
        time: "4,4 s",
        answer: {
          text:
            "Este mes hubo **23 operaciones** con más del 12% de descuento que permite la política. Impacto estimado en el margen: **$ 3,4 M**.",
          blocks: [
            {
              type: "bars",
              title: "Operaciones fuera de política, por vendedor",
              items: [
                { label: "P. Álvarez", value: 9, display: "9", tone: "bad" },
                { label: "J. Castro", value: 6, display: "6" },
                { label: "S. Romero", value: 5, display: "5" },
                { label: "Otros", value: 3, display: "3" }
              ]
            },
            {
              type: "table",
              columns: ["Cliente", "Descuento", "Aprobó"],
              rows: [
                ["Grupo Litoral", { v: "22%", tone: "bad" }, "P. Álvarez"],
                ["Mayorista El Puente", { v: "19%", tone: "bad" }, "J. Castro"],
                ["Comercial San Martín", { v: "18%", tone: "bad" }, "P. Álvarez"]
              ]
            }
          ]
        },
        followup: "¿Querés que te avise cada vez que pase esto?"
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "marketing",
    label: "Marketing",
    icon: "megaphone",
    persona: "Marketing",
    purpose:
      "Medí qué acciones venden de verdad, encontrá a quién hablarle y recuperá a los clientes que se fueron.",
    connects: ["Ventas", "CRM", "Pauta digital", "Mailing", "Redes", "Fidelización"],
    cases: [
      {
        chip: "Mejor campaña",
        tag: "Retorno de campañas",
        question:
          "¿Qué campaña del último trimestre generó más ventas y a qué costo por cliente?",
        sources: ["Ventas", "Pauta digital", "CRM"],
        time: "4,7 s",
        answer: {
          text:
            "La que más vendió fue **“Vuelta al cole”**: $ 42,7 M atribuidos a 3.180 clientes, con un costo por cliente de **$ 1.850**.",
          blocks: [
            {
              type: "table",
              columns: ["Campaña", "Ventas", "Clientes", "Costo/cliente"],
              rows: [
                ["Vuelta al cole", "$ 42,7 M", "3.180", { v: "$ 1.850", tone: "good" }],
                ["Día del Padre", "$ 31,2 M", "2.410", "$ 2.630"],
                ["Hot Sale", "$ 28,9 M", "2.950", "$ 3.120"],
                ["Invierno", "$ 14,5 M", "1.120", "$ 2.980"]
              ]
            }
          ]
        },
        followup: "¿Querés compararlo con el mismo trimestre del año pasado?"
      },
      {
        chip: "Perfil del cliente 80/20",
        tag: "Segmentación",
        question: "¿Qué perfil de cliente concentra el 80% de la facturación?",
        sources: ["Ventas", "CRM"],
        time: "5,0 s",
        answer: {
          text:
            "El **19% de los clientes** genera el 80% de la facturación. Su perfil típico: empresa de 10 a 50 empleados, zona Norte o Centro, compra cada 3 semanas y tiene un ticket de **$ 1,9 M**.",
          blocks: [
            {
              type: "bars",
              title: "Participación en la facturación por segmento",
              items: [
                { label: "Empresas de 10 a 50 empl.", value: 46, display: "46%", tone: "good" },
                { label: "Empresas de +50 empl.", value: 22, display: "22%" },
                { label: "Comercios minoristas", value: 21, display: "21%" },
                { label: "Consumidor final", value: 11, display: "11%" }
              ]
            }
          ]
        },
        followup: "¿Querés que arme un público con este perfil para la próxima campaña?"
      },
      {
        chip: "Clientes que se fueron",
        tag: "Reactivación",
        question:
          "Listame los clientes que no compran hace 90 días y antes compraban todos los meses",
        sources: ["Ventas", "CRM"],
        time: "3,6 s",
        answer: {
          text:
            "Encontré **312 clientes** que compraban todos los meses y no compran hace más de 90 días. Antes sumaban **$ 18,6 M** por mes.",
          blocks: [
            {
              type: "table",
              columns: ["Cliente", "Última compra", "Compra mensual prom."],
              rows: [
                ["Comercial Tres Ríos", "03/06", "$ 920 mil"],
                ["Autoservicio La Esquina", "12/06", "$ 410 mil"],
                ["Almacén Don Pepe", "19/05", "$ 260 mil"],
                ["Kiosco Plaza", "28/05", "$ 180 mil"]
              ]
            }
          ]
        },
        followup: "¿Querés que exporte la lista para una campaña de reactivación?"
      },
      {
        chip: "Mails y push",
        tag: "Efectividad de comunicaciones",
        question:
          "¿Qué porcentaje de los mails y push del mes se abrió y cuántos terminaron en compra?",
        sources: ["Mailing", "Fidelización", "Ventas"],
        time: "4,2 s",
        answer: {
          text:
            "Este mes se enviaron 186 mil mails y 412 mil push. **1.046 envíos** terminaron en compra dentro de las 72 horas, por **$ 9,8 M**.",
          blocks: [
            {
              type: "kpis",
              items: [
                { label: "Mails abiertos", value: "27,4%", delta: "▲ 3,1 pts", tone: "good" },
                { label: "Push abiertos", value: "11,8%", delta: "▼ 0,9 pts", tone: "bad" },
                { label: "Compras", value: "1.046", delta: "▲ 12%", tone: "good" }
              ]
            },
            {
              type: "bars",
              title: "Del envío a la compra",
              items: [
                { label: "Enviados", value: 100, display: "598.000" },
                { label: "Abiertos", value: 56, display: "99.600" },
                { label: "Clics", value: 24, display: "14.200" },
                { label: "Compras", value: 8, display: "1.046", tone: "good" }
              ]
            }
          ]
        },
        followup: "¿Querés ver qué asunto de mail funcionó mejor?"
      },
      {
        chip: "Mejores semanas del año",
        tag: "Planificación comercial",
        question: "¿En qué semanas del año pasado vendimos más y qué acciones hicimos ahí?",
        sources: ["Ventas", "Pauta digital", "Mailing"],
        time: "5,4 s",
        answer: {
          text:
            "Las 3 mejores semanas del año pasado coincidieron con acciones concretas:",
          blocks: [
            {
              type: "line",
              title: "Ventas mensuales del año pasado ($ M)",
              labels: ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
              values: [148, 132, 171, 160, 189, 204, 176, 168, 182, 195, 241, 258],
              unit: "M"
            },
            {
              type: "table",
              columns: ["Semana", "Ventas", "Qué hicimos"],
              rows: [
                ["18 al 24/12", "$ 61,2 M", "Navidad + mailing segmentado"],
                ["13 al 19/11", "$ 58,4 M", "Hot Sale + envío gratis"],
                ["12 al 18/06", "$ 49,7 M", "Día del Padre + push a clientes frecuentes"]
              ]
            }
          ]
        },
        followup: "¿Querés que proyecte el calendario de este año con estas fechas?"
      },
      {
        chip: "Lluvia y ventas",
        tag: "Validar hipótesis",
        question:
          "¿Los fines de semana de lluvia vendemos más o menos? Cruzá ventas y clima de 2 años",
        sources: ["Ventas", "Clima (datos públicos)"],
        time: "6,8 s",
        answer: {
          text:
            "Crucé 2 años de ventas con el clima de cada día. Los fines de semana de lluvia las sucursales venden **18% menos**, pero el canal online vende **34% más**.",
          blocks: [
            {
              type: "kpis",
              items: [
                { label: "Sucursales", value: "−18%", delta: "con lluvia", tone: "bad" },
                { label: "Online", value: "+34%", delta: "con lluvia", tone: "good" },
                { label: "Total", value: "−4%", delta: "con lluvia", tone: "warn" }
              ]
            }
          ],
          note: "Comparé 41 fines de semana con lluvia contra 63 sin lluvia."
        },
        followup: "¿Querés que te avise cuando se pronostique lluvia un fin de semana?"
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "finanzas",
    label: "Finanzas",
    icon: "coins",
    persona: "CFO",
    purpose:
      "Anticipá la caja, controlá el presupuesto y detectá desvíos y operaciones raras a tiempo.",
    connects: ["ERP", "Contabilidad", "Bancos", "Facturación", "Presupuesto"],
    cases: [
      {
        chip: "Flujo de caja 8 semanas",
        tag: "Proyección de caja",
        question: "¿Cómo viene el flujo de caja de las próximas 8 semanas?",
        sources: ["ERP", "Bancos", "Facturación"],
        time: "5,2 s",
        answer: {
          text:
            "Proyecté cobranzas esperadas y pagos comprometidos. La **semana 5** queda ajustada: saldo mínimo de **$ 12,4 M** por vencimientos impositivos.",
          blocks: [
            {
              type: "line",
              title: "Saldo proyectado ($ M)",
              labels: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"],
              values: [86, 74, 69, 58, 12.4, 33, 47, 61],
              unit: "M",
              highlight: 4
            }
          ]
        },
        followup: "¿Querés ver qué cobranzas podríamos adelantar?"
      },
      {
        chip: "Gastos sobre presupuesto",
        tag: "Control presupuestario",
        question: "¿Qué líneas de gasto están más de 10% arriba del presupuesto?",
        sources: ["Contabilidad", "Presupuesto"],
        time: "3,7 s",
        answer: {
          text: "**4 líneas** están más de 10% arriba del presupuesto acumulado del año:",
          blocks: [
            {
              type: "table",
              columns: ["Línea", "Presupuesto", "Real", "Desvío"],
              rows: [
                ["Fletes y logística", "$ 38,0 M", "$ 47,1 M", { v: "+24%", tone: "bad" }],
                ["Mantenimiento", "$ 12,5 M", "$ 15,2 M", { v: "+22%", tone: "bad" }],
                ["Publicidad digital", "$ 21,0 M", "$ 23,9 M", { v: "+14%", tone: "warn" }],
                ["Servicios IT", "$ 16,4 M", "$ 18,2 M", { v: "+11%", tone: "warn" }]
              ]
            }
          ]
        },
        followup: "¿Querés ver el detalle de facturas de fletes?"
      },
      {
        chip: "Deuda vencida +60 días",
        tag: "Cobranzas",
        question: "¿Qué clientes tienen deuda vencida a más de 60 días y cuánto suma?",
        sources: ["ERP", "Facturación"],
        time: "3,4 s",
        answer: {
          text:
            "**14 clientes** tienen deuda vencida a más de 60 días. Suman **$ 27,9 M**, el 9% de la cartera.",
          blocks: [
            {
              type: "table",
              columns: ["Cliente", "Deuda", "Días"],
              rows: [
                ["Grupo Litoral", "$ 8,2 M", { v: "94", tone: "bad" }],
                ["Mayorista El Puente", "$ 5,6 M", { v: "71", tone: "warn" }],
                ["Comercial Tres Ríos", "$ 4,1 M", { v: "63", tone: "warn" }],
                ["Otros 11 clientes", "$ 10,0 M", "—"]
              ]
            }
          ]
        },
        followup: "¿Querés que prepare un borrador de mail de reclamo para cada uno?"
      },
      {
        chip: "Margen por producto y sucursal",
        tag: "Rentabilidad",
        question: "¿Cuál es el margen por producto, cliente y sucursal del semestre?",
        sources: ["ERP", "Contabilidad"],
        time: "6,1 s",
        answer: {
          text:
            "Margen bruto del semestre: **34,2%**. La sucursal Norte es la más rentable y la línea Pinturas es la que más margen deja (41%).",
          blocks: [
            {
              type: "bars",
              title: "Margen bruto por sucursal",
              items: [
                { label: "Norte", value: 38.6, display: "38,6%", tone: "good" },
                { label: "Centro", value: 35.1, display: "35,1%" },
                { label: "Oeste", value: 32.4, display: "32,4%" },
                { label: "Sur", value: 29.8, display: "29,8%", tone: "warn" }
              ]
            }
          ]
        },
        followup: "¿Querés el mismo análisis por cliente?"
      },
      {
        chip: "Resumen de los lunes",
        tag: "Reporte automático",
        question: "Mandame todos los lunes un resumen de ventas, cobranzas y gastos",
        sources: ["ERP", "Bancos", "Facturación"],
        time: "2,9 s",
        answer: {
          text:
            "Listo. Todos los lunes a las 8:00 te va a llegar este resumen por mail. Así se vería hoy:",
          blocks: [
            {
              type: "kpis",
              items: [
                { label: "Ventas de la semana", value: "$ 52,3 M", delta: "▲ 7%", tone: "good" },
                { label: "Cobranzas", value: "$ 47,8 M", delta: "▲ 3%", tone: "good" },
                { label: "Gastos", value: "$ 31,6 M", delta: "▼ 2%", tone: "good" }
              ]
            },
            {
              type: "list",
              items: ["**Para mirar:** la cobranza de Grupo Litoral sigue pendiente (94 días)."]
            }
          ]
        },
        followup: "¿Querés sumarle el saldo de caja proyectado?"
      },
      {
        chip: "Pagos duplicados o raros",
        tag: "Control y auditoría",
        question: "¿Hay pagos duplicados o transacciones fuera de lo normal este mes?",
        sources: ["Bancos", "ERP"],
        time: "5,9 s",
        answer: {
          text: "Revisé 4.812 pagos y transacciones del mes. Encontré **3 casos** para revisar:",
          blocks: [
            {
              type: "table",
              columns: ["Tipo", "Detalle", "Monto"],
              rows: [
                [{ v: "Posible duplicado", tone: "bad" }, "Factura 0003-00045821 pagada 2 veces", "$ 1,84 M"],
                [{ v: "Fuera de lo normal", tone: "warn" }, "Transferencia a un proveedor nuevo, 6 veces su promedio", "$ 4,20 M"],
                [{ v: "Fuera de horario", tone: "warn" }, "Pago cargado un domingo a las 03:12", "$ 620 mil"]
              ]
            }
          ]
        },
        followup: "¿Querés ver el detalle de cada caso?"
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "administracion",
    label: "Administración",
    icon: "file",
    persona: "Administración",
    purpose:
      "Cerrá el mes sin perseguir planillas: facturación, pagos y conciliaciones siempre al día.",
    connects: ["ERP", "Facturación", "Cuentas a pagar", "Planillas"],
    cases: [
      {
        chip: "Ventas sin facturar",
        tag: "Cierre de mes",
        question: "¿Qué ventas del mes todavía no se facturaron?",
        sources: ["ERP", "Facturación"],
        time: "3,2 s",
        answer: {
          text:
            "Hay **17 remitos** entregados este mes que todavía no se facturaron, por **$ 9,6 M**. El más antiguo es del día 4.",
          blocks: [
            {
              type: "table",
              columns: ["Remito", "Cliente", "Monto", "Entregado"],
              rows: [
                ["R-10482", "Comercial San Martín", "$ 2,1 M", { v: "04/10", tone: "bad" }],
                ["R-10517", "Distribuidora Del Sur", "$ 1,8 M", "09/10"],
                ["R-10533", "Kiosco Plaza", "$ 340 mil", "11/10"],
                ["+14 remitos", "Varios", "$ 5,4 M", "—"]
              ]
            }
          ]
        },
        followup: "¿Querés la lista completa para facturar hoy?"
      },
      {
        chip: "Pagos de la semana",
        tag: "Cuentas a pagar",
        question: "¿Qué pagos a proveedores vencen esta semana?",
        sources: ["Cuentas a pagar"],
        time: "2,8 s",
        answer: {
          text:
            "Esta semana vencen **11 pagos** a proveedores por **$ 22,7 M**. El jueves concentra el 60%.",
          blocks: [
            {
              type: "bars",
              title: "Vencimientos por día",
              items: [
                { label: "Lunes", value: 2.3, display: "$ 2,3 M" },
                { label: "Martes", value: 3.1, display: "$ 3,1 M" },
                { label: "Miércoles", value: 1.9, display: "$ 1,9 M" },
                { label: "Jueves", value: 13.6, display: "$ 13,6 M", tone: "warn" },
                { label: "Viernes", value: 1.8, display: "$ 1,8 M" }
              ]
            }
          ]
        },
        followup: "¿Querés compararlo con el saldo proyectado en bancos?"
      },
      {
        chip: "Movimientos sin comprobante",
        tag: "Conciliación bancaria",
        question: "¿Qué movimientos del banco de octubre no tienen comprobante cargado?",
        sources: ["Bancos", "ERP"],
        time: "4,0 s",
        answer: {
          text:
            "En octubre hay **26 movimientos** del banco sin comprobante cargado, por **$ 4,3 M**. La mayoría son débitos automáticos.",
          blocks: [
            {
              type: "bars",
              title: "Movimientos sin comprobante, por tipo",
              items: [
                { label: "Débitos automáticos", value: 14, display: "14" },
                { label: "Transferencias", value: 7, display: "7" },
                { label: "Comisiones bancarias", value: 5, display: "5" }
              ]
            }
          ]
        },
        followup: "¿Querés la lista por responsable para pedir los comprobantes?"
      },
      {
        chip: "Facturado vs. cobrado",
        tag: "Explicar diferencias",
        question: "¿Por qué no coincide el total facturado con el cobrado en septiembre?",
        sources: ["Facturación", "Bancos", "ERP"],
        time: "5,6 s",
        answer: {
          text:
            "En septiembre se facturaron **$ 212,4 M** y se cobraron **$ 198,9 M**. La diferencia de **$ 13,5 M** se explica así:",
          blocks: [
            {
              type: "table",
              columns: ["Concepto", "Monto"],
              rows: [
                ["Facturas que vencen en octubre", "$ 8,7 M"],
                ["Retenciones impositivas", "$ 3,2 M"],
                ["Notas de crédito sin aplicar", "$ 1,1 M"],
                [{ v: "Sin explicar", tone: "warn" }, { v: "$ 0,5 M", tone: "warn" }]
              ]
            }
          ]
        },
        followup: "¿Querés ver las facturas que forman los $ 0,5 M sin explicar?"
      },
      {
        chip: "Condición con un proveedor",
        tag: "Consultar acuerdos",
        question: "¿Cuál es la condición de pago acordada con Logística Patagonia?",
        sources: ["Cuentas a pagar", "Contratos"],
        time: "2,6 s",
        answer: {
          text:
            "Con **Logística Patagonia** se acordó pago a **45 días de la fecha de factura**, con 3% de descuento si se paga a 15 días. Está en el contrato firmado el 12/03 (cláusula 6).",
          blocks: [
            {
              type: "list",
              items: [
                "**Último pago:** 30/09, a los 44 días.",
                "**Forma de pago:** transferencia bancaria, en pesos."
              ]
            }
          ]
        },
        followup: "¿Querés ver si conviene tomar el descuento este mes?"
      },
      {
        chip: "Viáticos y rendiciones",
        tag: "Control de gastos",
        question: "¿Cuánto gastó cada área en viáticos y quién tiene rendiciones pendientes?",
        sources: ["ERP", "Planillas"],
        time: "3,9 s",
        answer: {
          text:
            "En el trimestre se gastaron **$ 6,8 M** en viáticos. Hay **9 rendiciones pendientes** de 5 personas.",
          blocks: [
            {
              type: "bars",
              title: "Viáticos del trimestre por área",
              items: [
                { label: "Comercial", value: 3.4, display: "$ 3,4 M" },
                { label: "Operaciones", value: 1.9, display: "$ 1,9 M" },
                { label: "Dirección", value: 0.9, display: "$ 0,9 M" },
                { label: "Marketing", value: 0.6, display: "$ 0,6 M" }
              ]
            },
            {
              type: "list",
              items: [
                "**Comercial:** 4 rendiciones pendientes ($ 820 mil)",
                "**Operaciones:** 3 rendiciones pendientes ($ 410 mil)",
                "**Marketing:** 2 rendiciones pendientes ($ 150 mil)"
              ]
            }
          ]
        },
        followup: "¿Querés el detalle por persona para pedir las rendiciones?"
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "operaciones",
    label: "Operaciones y Logística",
    icon: "truck",
    persona: "Operaciones",
    purpose:
      "Anticipá quiebres de stock, ordená la logística y compará sucursales con datos, no con intuición.",
    connects: ["ERP", "Stock", "Logística", "Sucursales"],
    cases: [
      {
        chip: "Quiebres de stock",
        tag: "Reposición",
        question: "¿Qué productos se quedan sin stock en 15 días al ritmo actual?",
        sources: ["Stock", "ERP"],
        time: "3,5 s",
        answer: {
          text:
            "**8 productos** se quedan sin stock en los próximos 15 días al ritmo de venta actual. Los más urgentes:",
          blocks: [
            {
              type: "table",
              columns: ["Producto", "Stock", "Días restantes"],
              rows: [
                ["Taladro percutor 650 W", "42 u.", { v: "6", tone: "bad" }],
                ["Pintura látex 20 L", "118 u.", { v: "9", tone: "bad" }],
                ["Tornillos autoperforantes x100", "380 u.", { v: "11", tone: "warn" }],
                ["Cinta métrica 5 m", "64 u.", { v: "14", tone: "warn" }]
              ]
            }
          ]
        },
        followup: "¿Querés que calcule cuánto reponer de cada uno?"
      },
      {
        chip: "Stock sin rotación",
        tag: "Capital inmovilizado",
        question: "¿Qué productos no rotaron en 90 días y cuánto valen?",
        sources: ["Stock", "ERP"],
        time: "4,1 s",
        answer: {
          text:
            "**143 productos** no rotaron en 90 días. Inmovilizan **$ 31,2 M** de stock valuado a costo.",
          blocks: [
            {
              type: "bars",
              title: "Stock sin rotación por categoría",
              items: [
                { label: "Iluminación", value: 11.4, display: "$ 11,4 M", tone: "warn" },
                { label: "Jardín", value: 8.9, display: "$ 8,9 M" },
                { label: "Sanitarios", value: 6.2, display: "$ 6,2 M" },
                { label: "Otros", value: 4.7, display: "$ 4,7 M" }
              ]
            }
          ]
        },
        followup: "¿Querés una propuesta de liquidación por categoría?"
      },
      {
        chip: "Entregas tarde",
        tag: "Nivel de servicio",
        question: "¿Qué porcentaje de pedidos se entregó tarde y en qué zonas?",
        sources: ["Logística", "ERP"],
        time: "3,8 s",
        answer: {
          text:
            "Este mes se entregaron tarde el **8,7%** de los 6.420 pedidos. La zona Sur concentra el problema:",
          blocks: [
            {
              type: "bars",
              title: "Pedidos entregados tarde, por zona",
              items: [
                { label: "Zona Sur", value: 14.2, display: "14,2%", tone: "bad" },
                { label: "GBA Oeste", value: 11.8, display: "11,8%", tone: "warn" },
                { label: "Zona Norte", value: 6.1, display: "6,1%" },
                { label: "Centro", value: 3.4, display: "3,4%" }
              ]
            }
          ]
        },
        followup: "¿Querés ver si tiene que ver con un transportista en particular?"
      },
      {
        chip: "Comparar sucursales",
        tag: "Productividad",
        question: "Comparame las sucursales por ventas, costos y productividad",
        sources: ["Sucursales", "ERP"],
        time: "4,5 s",
        answer: {
          text:
            "Último trimestre. **Norte** lidera en ventas y productividad. **Sur** tiene el costo más alto por cada peso vendido.",
          blocks: [
            {
              type: "table",
              columns: ["Sucursal", "Ventas", "Costos", "Ventas/empleado"],
              rows: [
                ["Norte", "$ 84,2 M", "$ 51,3 M", { v: "$ 4,7 M", tone: "good" }],
                ["Centro", "$ 76,9 M", "$ 49,8 M", "$ 4,1 M"],
                ["Oeste", "$ 58,4 M", "$ 40,1 M", "$ 3,5 M"],
                ["Sur", "$ 43,7 M", { v: "$ 33,9 M", tone: "bad" }, "$ 2,9 M"]
              ]
            }
          ]
        },
        followup: "¿Querés verlo contra el mismo trimestre del año pasado?"
      },
      {
        chip: "Días y horarios pico",
        tag: "Planificar turnos",
        question: "¿Qué días y franjas horarias concentran más pedidos?",
        sources: ["ERP", "Logística"],
        time: "3,3 s",
        answer: {
          text:
            "Los pedidos se concentran **martes y miércoles de 10 a 13 hs** (31% del total). Los sábados casi no hay actividad después de las 16 hs.",
          blocks: [
            {
              type: "bars",
              title: "Pedidos por franja",
              items: [
                { label: "Mar y Mié · 10 a 13 hs", value: 31, display: "31%", tone: "good" },
                { label: "Lun a Vie · 14 a 17 hs", value: 26, display: "26%" },
                { label: "Lun a Vie · 8 a 10 hs", value: 18, display: "18%" },
                { label: "Jue y Vie · 10 a 13 hs", value: 15, display: "15%" },
                { label: "Sábados", value: 10, display: "10%" }
              ]
            }
          ]
        },
        followup: "¿Querés que proponga turnos de personal según esta demanda?"
      },
      {
        chip: "Incidencias del mes",
        tag: "Mejora continua",
        question: "¿Cuáles fueron las incidencias más frecuentes del mes?",
        sources: ["Logística", "Sucursales"],
        time: "3,7 s",
        answer: {
          text: "Se registraron **214 incidencias** en el mes. Las 4 más frecuentes explican el 72%:",
          blocks: [
            {
              type: "bars",
              title: "Incidencias por tipo",
              items: [
                { label: "Producto dañado en tránsito", value: 58, display: "58", tone: "warn" },
                { label: "Dirección incorrecta", value: 41, display: "41" },
                { label: "Faltante en el pedido", value: 33, display: "33" },
                { label: "Demora del transportista", value: 22, display: "22" }
              ]
            }
          ]
        },
        followup: "¿Querés ver en qué depósito se originan los faltantes?"
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "rrhh",
    label: "Recursos Humanos",
    icon: "users",
    persona: "Recursos Humanos",
    purpose:
      "Entendé ausencias, rotación y clima. Y que cada persona resuelva sus consultas sola, al instante.",
    connects: ["Liquidación de sueldos", "Presentismo", "Legajos", "Encuestas"],
    cases: [
      {
        chip: "Ausencias por área",
        tag: "Ausentismo",
        question: "¿Qué áreas tuvieron más ausencias este trimestre?",
        sources: ["Presentismo", "Legajos"],
        time: "3,1 s",
        answer: {
          text:
            "El ausentismo del trimestre fue de **4,8%**. Logística y Atención al Cliente están arriba del promedio:",
          blocks: [
            {
              type: "bars",
              title: "Tasa de ausentismo por área",
              items: [
                { label: "Logística", value: 7.9, display: "7,9%", tone: "bad" },
                { label: "Atención al Cliente", value: 6.4, display: "6,4%", tone: "warn" },
                { label: "Ventas", value: 4.1, display: "4,1%" },
                { label: "Administración", value: 2.6, display: "2,6%" },
                { label: "Sistemas", value: 1.9, display: "1,9%" }
              ]
            }
          ]
        },
        followup: "¿Querés ver los motivos de ausencia por área?"
      },
      {
        chip: "Rotación",
        tag: "Retención",
        question: "¿Cuál es la rotación por área y qué antigüedad tenían los que se fueron?",
        sources: ["Legajos", "Liquidación de sueldos"],
        time: "4,3 s",
        answer: {
          text:
            "La rotación anual es de **14,6%**. El 58% de quienes se fueron tenía **menos de 1 año** de antigüedad.",
          blocks: [
            {
              type: "table",
              columns: ["Área", "Rotación", "Antigüedad prom. al irse"],
              rows: [
                ["Logística", { v: "24%", tone: "bad" }, "8 meses"],
                ["Atención al Cliente", { v: "19%", tone: "warn" }, "11 meses"],
                ["Ventas", "12%", "1,8 años"],
                ["Administración", "6%", "3,2 años"]
              ]
            }
          ]
        },
        followup: "¿Querés cruzarlo con los resultados de la encuesta de clima?"
      },
      {
        chip: "Dotación",
        tag: "Estructura",
        question: "¿Cuántas personas hay por área, modalidad y antigüedad?",
        sources: ["Legajos"],
        time: "2,7 s",
        answer: {
          text: "Hoy hay **486 personas**. Así se distribuyen:",
          blocks: [
            {
              type: "table",
              columns: ["Área", "Personas", "Híbrido", "Antigüedad prom."],
              rows: [
                ["Logística", "142", "8%", "3,1 años"],
                ["Ventas", "96", "45%", "4,2 años"],
                ["Atención al Cliente", "74", "60%", "2,4 años"],
                ["Administración", "52", "70%", "6,8 años"],
                ["Otras áreas", "122", "52%", "4,9 años"]
              ]
            }
          ]
        },
        followup: "¿Querés verlo como organigrama?"
      },
      {
        chip: "Encuesta de clima",
        tag: "Escuchar al equipo",
        question: "Resumime los temas que más se repiten en la encuesta de clima",
        sources: ["Encuestas"],
        time: "6,4 s",
        answer: {
          text:
            "Analicé **1.284 comentarios** abiertos de la última encuesta. Los temas que más se repiten:",
          blocks: [
            {
              type: "bars",
              title: "Menciones por tema",
              items: [
                { label: "Crecimiento y capacitación", value: 312, display: "312" },
                { label: "Comunicación entre áreas", value: 268, display: "268" },
                { label: "Herramientas de trabajo", value: 194, display: "194" },
                { label: "Flexibilidad horaria", value: 171, display: "171" },
                { label: "Reconocimiento", value: 139, display: "139" }
              ]
            },
            {
              type: "list",
              items: ["**Lo más valorado:** el buen clima con el equipo directo (74% de menciones positivas)."]
            }
          ]
        },
        followup: "¿Querés ver los comentarios por área?"
      },
      {
        chip: "Mis vacaciones",
        tag: "Autogestión del equipo",
        question: "¿Cuántos días de vacaciones me corresponden y cómo los pido?",
        persona: "Colaborador/a",
        sources: ["Legajos", "Políticas internas"],
        time: "2,2 s",
        answer: {
          text:
            "Te corresponden **21 días** de vacaciones este año (tenés 7 años de antigüedad). Ya usaste 9, así que te quedan **12 días**.",
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                "Cargá la solicitud en el portal de RRHH con 15 días de anticipación.",
                "Tu líder la aprueba y te llega la confirmación por mail.",
                "Podés tomarlas en hasta 3 partes."
              ]
            }
          ],
          note: "Cada persona ve solo su propia información: permisos por rol."
        },
        followup: "¿Querés ver qué semanas tiene libres tu equipo?"
      },
      {
        chip: "Horas extra",
        tag: "Costo laboral",
        question: "¿Qué áreas acumularon más horas extra en 3 meses?",
        sources: ["Liquidación de sueldos", "Presentismo"],
        time: "3,4 s",
        answer: {
          text:
            "En los últimos 3 meses se pagaron **6.940 horas extra**. Logística concentra más de la mitad.",
          blocks: [
            {
              type: "bars",
              title: "Horas extra por área (3 meses)",
              items: [
                { label: "Logística", value: 3720, display: "3.720 hs", tone: "warn" },
                { label: "Atención al Cliente", value: 1410, display: "1.410 hs" },
                { label: "Mantenimiento", value: 980, display: "980 hs" },
                { label: "Ventas", value: 830, display: "830 hs" }
              ]
            }
          ]
        },
        followup: "¿Querés ver cómo evolucionaron mes a mes?"
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "compras",
    label: "Compras y Proveedores",
    icon: "cart",
    persona: "Compras",
    purpose:
      "Negociá con datos: aumentos, cumplimiento, concentración y qué comprar el mes que viene.",
    connects: ["Órdenes de compra", "Cuentas a pagar", "Listas de precios"],
    cases: [
      {
        chip: "Aumentos de proveedores",
        tag: "Negociación",
        question: "¿Cuánto aumentaron los precios de los 10 principales proveedores?",
        sources: ["Listas de precios", "Órdenes de compra"],
        time: "4,8 s",
        answer: {
          text:
            "En los últimos 12 meses los 10 principales proveedores aumentaron **38% en promedio**. Los que más subieron:",
          blocks: [
            {
              type: "table",
              columns: ["Proveedor", "Aumento", "Compras 12 meses"],
              rows: [
                ["Insumos Delta", { v: "+52%", tone: "bad" }, "$ 48,1 M"],
                ["Envases Río Grande", { v: "+46%", tone: "bad" }, "$ 31,4 M"],
                ["Química Austral", { v: "+41%", tone: "warn" }, "$ 27,9 M"],
                ["Metalúrgica Norte", "+29%", "$ 22,6 M"]
              ]
            }
          ]
        },
        followup: "¿Querés compararlo con la inflación del período?"
      },
      {
        chip: "Comparar proveedores",
        tag: "Elegir proveedor",
        question:
          "Comparame los proveedores de cartón corrugado por precio, plazo y cumplimiento",
        sources: ["Órdenes de compra", "Listas de precios"],
        time: "3,6 s",
        answer: {
          text:
            "Tenés 3 proveedores de cartón corrugado. **Cartonera Sur** es la más barata, pero es la que peor cumple.",
          blocks: [
            {
              type: "table",
              columns: ["Proveedor", "Precio/u.", "Plazo", "Cumplimiento"],
              rows: [
                ["Envases Río Grande", "$ 1.240", "7 días", "96%"],
                ["Cartonera Sur", { v: "$ 1.180", tone: "good" }, "12 días", { v: "84%", tone: "bad" }],
                ["Embalajes Centro", "$ 1.310", { v: "5 días", tone: "good" }, { v: "98%", tone: "good" }]
              ]
            }
          ]
        },
        followup: "¿Querés que simule cuánto cambia concentrando las compras en uno?"
      },
      {
        chip: "Concentración de compras",
        tag: "Riesgo de proveedor",
        question: "¿Qué porcentaje de las compras se concentra en cada proveedor?",
        sources: ["Órdenes de compra"],
        time: "3,0 s",
        answer: {
          text: "El **47%** de las compras se concentra en 3 proveedores.",
          blocks: [
            {
              type: "bars",
              title: "Participación en las compras del año",
              items: [
                { label: "Insumos Delta", value: 21, display: "21%", tone: "warn" },
                { label: "Envases Río Grande", value: 14, display: "14%" },
                { label: "Química Austral", value: 12, display: "12%" },
                { label: "Metalúrgica Norte", value: 9, display: "9%" },
                { label: "Otros 42 proveedores", value: 44, display: "44%" }
              ]
            }
          ]
        },
        followup: "¿Querés ver cuáles no tienen un proveedor alternativo?"
      },
      {
        chip: "Entregas tarde",
        tag: "Evaluación de proveedores",
        question: "¿Qué proveedores entregaron tarde más de 3 veces este semestre?",
        sources: ["Órdenes de compra"],
        time: "3,3 s",
        answer: {
          text: "**5 proveedores** entregaron tarde más de 3 veces este semestre:",
          blocks: [
            {
              type: "table",
              columns: ["Proveedor", "Entregas tarde", "Demora prom."],
              rows: [
                ["Cartonera Sur", { v: "9", tone: "bad" }, "4,2 días"],
                ["Química Austral", "6", "3,1 días"],
                ["Plásticos del Oeste", "5", "2,8 días"],
                ["Herrajes Unidos", "4", { v: "6,0 días", tone: "bad" }],
                ["Tintas Express", "4", "1,9 días"]
              ]
            }
          ]
        },
        followup: "¿Querés sumarlo a la evaluación anual de proveedores?"
      },
      {
        chip: "Documentación vencida",
        tag: "Cumplimiento",
        question: "¿Qué proveedores tienen la documentación vencida?",
        sources: ["Cuentas a pagar", "Legajos de proveedores"],
        time: "2,9 s",
        answer: {
          text:
            "**7 proveedores** tienen documentación vencida o por vencer en los próximos 30 días:",
          blocks: [
            {
              type: "table",
              columns: ["Proveedor", "Documento", "Vence"],
              rows: [
                ["Plásticos del Oeste", "Seguro de responsabilidad civil", { v: "Vencido", tone: "bad" }],
                ["Herrajes Unidos", "Constancia de inscripción", { v: "Vencido", tone: "bad" }],
                ["Transporte Litoral", "Cobertura de ART", { v: "08/11", tone: "warn" }],
                ["Tintas Express", "Certificado de calidad", "21/11"]
              ]
            }
          ]
        },
        followup: "¿Querés que prepare el texto para pedirles la actualización?"
      },
      {
        chip: "Qué comprar el mes que viene",
        tag: "Planificación de compras",
        question:
          "Según el consumo de 6 meses, ¿qué deberíamos comprar el mes que viene?",
        sources: ["Órdenes de compra", "Stock"],
        time: "5,7 s",
        answer: {
          text:
            "Según el consumo de los últimos 6 meses y el stock actual, te sugiero comprar estos ítems:",
          blocks: [
            {
              type: "table",
              columns: ["Ítem", "Consumo mensual", "Stock", "Sugerido"],
              rows: [
                ["Cartón corrugado", "4.800 u.", "2.100 u.", { v: "5.500 u.", tone: "good" }],
                ["Film stretch", "620 rollos", "180 rollos", { v: "700 rollos", tone: "good" }],
                ["Etiquetas térmicas", "92 mil", "40 mil", { v: "100 mil", tone: "good" }],
                ["Cinta de embalar", "1.150 u.", "600 u.", { v: "1.300 u.", tone: "good" }]
              ]
            }
          ],
          note: "Incluye un 10% de stock de seguridad."
        },
        followup: "¿Querés que lo exporte a Excel para aprobarlo?"
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "atencion",
    label: "Atención al Cliente",
    icon: "headset",
    persona: "Atención al Cliente",
    purpose:
      "Resolvé más rápido con la historia completa de cada cliente y entendé por qué reclaman.",
    connects: ["Tickets", "CRM", "Pedidos", "Encuestas", "NPS"],
    cases: [
      {
        chip: "Motivos de reclamo",
        tag: "Causas de reclamo",
        question: "¿Cuáles son los 5 motivos de reclamo más frecuentes del mes?",
        sources: ["Tickets"],
        time: "3,2 s",
        answer: {
          text:
            "Este mes ingresaron **1.548 reclamos** (−6% contra el mes anterior). Los 5 motivos principales:",
          blocks: [
            {
              type: "bars",
              title: "Reclamos por motivo",
              items: [
                { label: "Demora en la entrega", value: 412, display: "412", tone: "warn" },
                { label: "Producto dañado", value: 236, display: "236" },
                { label: "Error en la factura", value: 187, display: "187" },
                { label: "Cambio o devolución", value: 164, display: "164" },
                { label: "Falta de stock", value: 98, display: "98" }
              ]
            }
          ]
        },
        followup: "¿Querés ver cuáles crecieron más contra el mes pasado?"
      },
      {
        chip: "Historia de un cliente",
        tag: "Atender con contexto",
        question:
          "¿Qué compró Autoservicio La Esquina, qué reclamos hizo y cómo se resolvieron?",
        sources: ["CRM", "Pedidos", "Tickets"],
        time: "3,9 s",
        answer: {
          text:
            "Autoservicio La Esquina hizo **22 pedidos** este año por **$ 8,4 M**. Tuvo **3 reclamos** y los 3 se resolvieron:",
          blocks: [
            {
              type: "table",
              columns: ["Fecha", "Motivo", "Resolución"],
              rows: [
                ["02/09", "Producto dañado", "Reposición en 24 hs"],
                ["18/06", "Demora en la entrega", "Bonificación del flete"],
                ["11/03", "Error en la factura", "Nota de crédito"]
              ]
            }
          ]
        },
        followup: "¿Querés ver su NPS y sus comentarios?"
      },
      {
        chip: "Tiempo de resolución",
        tag: "Nivel de servicio",
        question: "¿Cuál es el tiempo promedio de resolución por tipo de reclamo?",
        sources: ["Tickets"],
        time: "3,0 s",
        answer: {
          text:
            "El tiempo promedio general es de **26,4 horas**. **2 tipos** de reclamo están fuera del objetivo:",
          blocks: [
            {
              type: "table",
              columns: ["Tipo", "Tiempo prom.", "Objetivo"],
              rows: [
                ["Error en la factura", { v: "9,6 hs", tone: "good" }, "24 hs"],
                ["Demora en la entrega", { v: "18,2 hs", tone: "good" }, "24 hs"],
                ["Producto dañado", { v: "31,5 hs", tone: "bad" }, "24 hs"],
                ["Cambio o devolución", { v: "52,0 hs", tone: "bad" }, "48 hs"]
              ]
            }
          ]
        },
        followup: "¿Querés ver en qué paso se demoran?"
      },
      {
        chip: "Qué dicen los detractores",
        tag: "Entender el NPS",
        question: "Resumime qué dicen los clientes que nos pusieron menos de 6",
        sources: ["Encuestas", "NPS"],
        time: "5,8 s",
        answer: {
          text:
            "**184 clientes** pusieron menos de 6 en el último trimestre. Resumí sus comentarios en 4 temas:",
          blocks: [
            {
              type: "list",
              items: [
                "**Entregas (41%):** demoras sin aviso y franjas horarias que no se cumplen.",
                "**Atención (27%):** tardan en responder por WhatsApp.",
                "**Producto (19%):** el embalaje llega dañado.",
                "**Precio (13%):** aumentos sin aviso previo."
              ]
            }
          ]
        },
        followup: "¿Querés ver comentarios textuales de cada tema?"
      },
      {
        chip: "Pedido pagado sin despachar",
        tag: "Resolver un caso",
        question: "¿Por qué el pedido #48213 figura pagado pero no despachado?",
        sources: ["Pedidos", "Stock", "Logística"],
        time: "2,7 s",
        answer: {
          text:
            "El pedido **#48213** se pagó el 21/10 a las 18:42. No se despachó porque uno de sus 3 productos (**Pintura látex 20 L**) se quedó sin stock en el depósito Sur, y el pedido está retenido hasta completarse.",
          blocks: [
            {
              type: "list",
              items: [
                "**Reposición en depósito Sur:** prevista para el 29/10.",
                "**Alternativa:** el depósito Norte tiene 46 unidades."
              ]
            }
          ]
        },
        followup: "¿Querés un texto para responderle al cliente?"
      },
      {
        chip: "Política de cambios",
        tag: "Respuestas al instante",
        question: "¿Cuál es la política de cambios y devoluciones online?",
        sources: ["Políticas internas"],
        time: "1,9 s",
        answer: {
          text: "La política de cambios y devoluciones online es esta:",
          blocks: [
            {
              type: "list",
              items: [
                "Hay **30 días** desde que llega el pedido para cambiarlo o devolverlo.",
                "El producto tiene que estar sin uso y en su embalaje original.",
                "El botón de arrepentimiento está disponible durante **10 días**.",
                "Si la falla es nuestra, el envío corre por nuestra cuenta."
              ]
            }
          ],
          note: "Fuente: Política comercial v3, actualizada en agosto."
        },
        followup: "¿Querés que te la resuma para mandar por WhatsApp?"
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "legales",
    label: "Legales",
    icon: "scale",
    persona: "Legales",
    purpose:
      "Controlá vencimientos, cláusulas y riesgos sin leer contrato por contrato.",
    connects: ["Contratos", "Documentación societaria", "Transacciones"],
    cases: [
      {
        chip: "Contratos por vencer",
        tag: "Vencimientos",
        question: "¿Qué contratos vencen en los próximos 90 días?",
        sources: ["Contratos"],
        time: "3,1 s",
        answer: {
          text:
            "**9 contratos** vencen en los próximos 90 días y **3** se renuevan solos. Los más próximos:",
          blocks: [
            {
              type: "table",
              columns: ["Contrato", "Vence", "Renovación"],
              rows: [
                ["Alquiler depósito Sur", { v: "30/11", tone: "warn" }, "Manual"],
                ["Servicio de limpieza", "15/12", { v: "Automática", tone: "warn" }],
                ["Licencias de software", "31/12", { v: "Automática", tone: "warn" }],
                ["Transporte zona Oeste", "18/01", "Manual"]
              ]
            }
          ]
        },
        followup: "¿Querés que te avise 30 días antes de cada vencimiento?"
      },
      {
        chip: "Exclusividad y penalidades",
        tag: "Riesgo contractual",
        question:
          "¿Qué contratos tienen cláusula de exclusividad o penalidad por rescisión?",
        sources: ["Contratos"],
        time: "6,2 s",
        answer: {
          text:
            "Revisé **148 contratos** vigentes. **12** tienen exclusividad y **21** tienen penalidad por rescisión anticipada. Algunos ejemplos:",
          blocks: [
            {
              type: "table",
              columns: ["Contrato", "Cláusula", "Detalle"],
              rows: [
                ["Distribución zona Norte", "Exclusividad", "Territorial hasta 2027"],
                ["Alquiler local Centro", "Penalidad", "3 meses de alquiler"],
                ["Logística integral", { v: "Ambas", tone: "warn" }, "Exclusividad + 20% del saldo"]
              ]
            }
          ]
        },
        followup: "¿Querés la lista completa con la página de cada cláusula?"
      },
      {
        chip: "Distintos al modelo",
        tag: "Estandarización",
        question: "¿Qué contratos tienen condiciones distintas al modelo estándar?",
        sources: ["Contratos"],
        time: "6,9 s",
        answer: {
          text:
            "Comparé los contratos de proveedores con el modelo estándar. **8 contratos** tienen diferencias relevantes:",
          blocks: [
            {
              type: "table",
              columns: ["Contrato", "Diferencia"],
              rows: [
                ["Insumos Delta", "Pago a 90 días (el estándar es 60)"],
                ["Química Austral", { v: "Sin cláusula de confidencialidad", tone: "bad" }],
                ["Envases Río Grande", "Otra jurisdicción (Rosario)"],
                ["Metalúrgica Norte", "Ajuste de precio mensual"]
              ]
            }
          ]
        },
        followup: "¿Querés que marque cuáles conviene renegociar?"
      },
      {
        chip: "Patrones de fraude",
        tag: "Prevención de fraude",
        question: "¿Qué usuarios o transacciones muestran patrones de fraude este mes?",
        sources: ["Transacciones"],
        time: "7,4 s",
        answer: {
          text:
            "Analicé **2,1 millones** de transacciones del mes. Hay **37 casos** con patrones de fraude para revisar:",
          blocks: [
            {
              type: "bars",
              title: "Casos por patrón",
              items: [
                { label: "Varias cuentas con la misma tarjeta", value: 14, display: "14", tone: "bad" },
                { label: "Cupones en cuentas recién creadas", value: 11, display: "11", tone: "bad" },
                { label: "Compras de madrugada con montos atípicos", value: 8, display: "8", tone: "warn" },
                { label: "Cambio de dirección después del pago", value: 4, display: "4", tone: "warn" }
              ]
            }
          ],
          note: "Los patrones se definieron junto con el equipo de prevención de fraude."
        },
        followup: "¿Querés ver el detalle de cada caso?"
      },
      {
        chip: "Reclamos legales abiertos",
        tag: "Seguimiento de litigios",
        question: "¿En qué estado están los reclamos legales abiertos?",
        sources: ["Documentación legal"],
        time: "3,5 s",
        answer: {
          text:
            "Hay **19 reclamos** legales abiertos, por un total de **$ 79,3 M**:",
          blocks: [
            {
              type: "table",
              columns: ["Tipo", "Abiertos", "Monto", "Etapa"],
              rows: [
                ["Laborales", "6", "$ 48,2 M", "2 en mediación · 4 en juicio"],
                ["Consumidores", "11", "$ 9,7 M", "8 en Defensa del Consumidor"],
                ["Comerciales", "2", "$ 21,4 M", "Etapa de prueba"]
              ]
            }
          ]
        },
        followup: "¿Querés ver cuáles tienen audiencia este mes?"
      },
      {
        chip: "Habilitaciones y seguros",
        tag: "Cumplimiento regulatorio",
        question: "¿Qué habilitaciones, seguros o certificados vencen este año?",
        sources: ["Documentación societaria"],
        time: "2,8 s",
        answer: {
          text:
            "Este año vencen **11 habilitaciones, seguros o certificados**. Los próximos 4:",
          blocks: [
            {
              type: "table",
              columns: ["Documento", "Dónde", "Vence"],
              rows: [
                ["Certificado de bomberos", "Sucursal Oeste", { v: "14/11", tone: "warn" }],
                ["Seguro integral de comercio", "Todas", "01/12"],
                ["Habilitación municipal", "Sucursal Sur", "19/12"],
                ["Certificado de fumigación", "Depósito Norte", "22/12"]
              ]
            }
          ]
        },
        followup: "¿Querés el calendario completo para compartir con cada sucursal?"
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "direccion",
    label: "Dirección / Gerencia General",
    icon: "compass",
    persona: "Gerencia General",
    purpose:
      "La foto completa de la empresa en una conversación: ventas, margen, caja y equipo.",
    connects: ["Todas las fuentes, según tu rol"],
    cases: [
      {
        chip: "Cómo viene el mes",
        tag: "Tablero de dirección",
        question:
          "¿Cómo viene la empresa este mes en ventas, margen, caja y dotación contra el año pasado?",
        sources: ["ERP", "Bancos", "Legajos"],
        time: "5,5 s",
        answer: {
          text: "Así viene octubre contra el mismo mes del año pasado:",
          blocks: [
            {
              type: "kpis",
              items: [
                { label: "Ventas", value: "$ 263,2 M", delta: "▲ 9%", tone: "good" },
                { label: "Margen bruto", value: "34,2%", delta: "▲ 1,1 pts", tone: "good" },
                { label: "Caja", value: "$ 86,4 M", delta: "▲ 12%", tone: "good" },
                { label: "Dotación", value: "486", delta: "▼ 2%", tone: "warn" }
              ]
            },
            {
              type: "list",
              items: [
                "**Lo que más empuja:** la sucursal Norte y la línea Pinturas.",
                "**Para mirar:** la deuda vencida a más de 60 días subió 3 puntos."
              ]
            }
          ]
        },
        followup: "¿Querés el mismo análisis por unidad de negocio?"
      },
      {
        chip: "Peso de un cliente",
        tag: "Dependencia de clientes",
        question: "¿Cuánto representa Grupo Andino en la facturación y cómo viene su margen?",
        sources: ["Facturación", "ERP"],
        time: "3,9 s",
        answer: {
          text:
            "Grupo Andino es el cliente número 1: representa el **8,4%** de la facturación del año (**$ 182,6 M**). Su margen bajó de 31% a 26% por descuentos especiales.",
          blocks: [
            {
              type: "line",
              title: "Margen de Grupo Andino por trimestre (%)",
              labels: ["T1", "T2", "T3", "T4*"],
              values: [31, 29, 27, 26],
              unit: "%",
              tone: "warn"
            }
          ],
          note: "*T4 proyectado con los pedidos confirmados."
        },
        followup: "¿Querés ver qué descuentos explican la baja?"
      },
      {
        chip: "Unidades de negocio",
        tag: "Estrategia",
        question: "Comparame las unidades de negocio por crecimiento y rentabilidad en 2 años",
        sources: ["ERP", "Contabilidad"],
        time: "6,3 s",
        answer: {
          text: "**Online** es la que más crece y **Servicios** es la más rentable.",
          blocks: [
            {
              type: "table",
              columns: ["Unidad", "Crecimiento 2 años", "Margen"],
              rows: [
                ["Mayorista", "+38%", "28%"],
                ["Minorista", "+21%", "36%"],
                ["Online", { v: "+142%", tone: "good" }, "31%"],
                ["Servicios", "+12%", { v: "47%", tone: "good" }]
              ]
            }
          ]
        },
        followup: "¿Querés verlo ajustado por inflación?"
      },
      {
        chip: "Alertas de la semana",
        tag: "Detectar desvíos",
        question: "¿Qué indicadores se desviaron más de lo normal esta semana?",
        sources: ["Todas las fuentes"],
        time: "4,6 s",
        answer: {
          text: "Esta semana **3 indicadores** salieron de su rango normal:",
          blocks: [
            {
              type: "table",
              columns: ["Indicador", "Esta semana", "Rango normal"],
              rows: [
                ["Devoluciones online", { v: "6,8%", tone: "bad" }, "2% a 4%"],
                ["Ticket promedio sucursal Sur", { v: "$ 38 mil", tone: "bad" }, "$ 46 a 52 mil"],
                ["Horas extra en Logística", { v: "610 hs", tone: "warn" }, "350 a 420 hs"]
              ]
            }
          ]
        },
        followup: "¿Querés que investigue la causa de cada uno?"
      },
      {
        chip: "Resumen del trimestre",
        tag: "Reporte para el directorio",
        question: "Armame un resumen del trimestre con los 5 datos más importantes",
        sources: ["Todas las fuentes"],
        time: "7,1 s",
        answer: {
          text: "Estos son los 5 datos más importantes del trimestre:",
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                "**Ventas:** $ 742 M, +11% contra el trimestre anterior.",
                "**Margen bruto:** 34,2%, el mejor del año.",
                "**Online** ya es el 18% de las ventas.",
                "**Deuda vencida a +60 días:** subió a $ 27,9 M.",
                "**410 horas** de armado de reportes ahorradas con ¡appa! Intelligence."
              ]
            }
          ]
        },
        followup: "¿Querés que lo arme como presentación para el directorio?"
      },
      {
        chip: "Qué crece solo",
        tag: "Oportunidades",
        question: "¿Qué productos o zonas crecen sin inversión y podrían escalar?",
        sources: ["Ventas", "Pauta digital", "Legajos"],
        time: "6,6 s",
        answer: {
          text:
            "Encontré **3 oportunidades** que crecen sin inversión en publicidad ni personal extra:",
          blocks: [
            {
              type: "table",
              columns: ["Qué", "Crecimiento", "Inversión actual"],
              rows: [
                ["Línea Jardín en zona Norte", { v: "+64%", tone: "good" }, "Sin pauta"],
                ["Ventas por WhatsApp en Oeste", { v: "+48%", tone: "good" }, "Sin personal extra"],
                ["Clientes de construcción online", { v: "+37%", tone: "good" }, "Sin pauta"]
              ]
            }
          ]
        },
        followup: "¿Querés que estime cuánto podrían crecer con inversión?"
      }
    ]
  }
];
