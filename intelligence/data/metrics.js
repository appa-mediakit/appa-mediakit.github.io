/* =====================================================================
   ¡appa! Intelligence · Resultados reales
   El valor se comunica en HORAS ahorradas, nunca en plata ahorrada.
   ---------------------------------------------------------------------
   counters: contadores animados.
     value   número final (sin puntos ni comas)
     prefix  texto antes del número (opcional)
     suffix  texto pegado al número (ej.: "M")
     unit    texto chico al lado (ej.: "hs/mes")
     label   descripción
     client  de qué cliente es el dato (se oculta si showClientNames = false)
   cases: tarjetas de casos en producción.
     clientAnon se usa si showClientNames = false.
   ===================================================================== */
window.APPA_METRICS = {
  counters: [
    { value: 180, unit: "hs/mes", label: "de trabajo ahorradas", client: "IRSA + ¡appa!" },
    { value: 120, unit: "hs/mes", label: "ahorradas en reporting", client: "Chocorisimo" },
    { value: 23, suffix: "M", unit: "", label: "de transacciones analizadas", client: "IRSA + ¡appa!" },
    { value: 15, unit: "shoppings", label: "consultables desde una sola conversación", client: "IRSA + ¡appa!" }
  ],

  cases: [
    {
      client: "IRSA + ¡appa!",
      clientAnon: "Red de shoppings",
      sector: "Shoppings",
      highlight: "180 hs/mes ahorradas",
      items: [
        "15 shoppings consultables desde una sola conversación",
        "23M de transacciones analizadas",
        "~100 casos de fraude detectados en 4 meses",
        "+200 transacciones con errores corregidas"
      ]
    },
    {
      client: "Chocorisimo",
      clientAnon: "Cadena de retail",
      sector: "Retail",
      highlight: "120 hs/mes ahorradas",
      items: ["Reporting que antes se armaba a mano, ahora en una pregunta"]
    },
    {
      client: "Shefa",
      clientAnon: "Holding",
      sector: "Holding",
      highlight: "100% automatizado",
      items: ["Reportes diarios que antes no existían"]
    }
  ]
};
