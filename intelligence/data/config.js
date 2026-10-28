/* =====================================================================
   ¡appa! Intelligence · Configuración general
   Completá estos datos antes de publicar.
   ===================================================================== */
window.APPA_CONFIG = {
  // Mail que recibe las consultas del formulario y aparece en el footer.
  // Si queda vacío, el formulario solo muestra el mensaje de éxito
  // (no se envía nada) y el footer invita a usar el formulario.
  contactEmail: "",

  // Link de agenda (Calendly, Google Calendar, HubSpot, etc.).
  // Si queda vacío, los botones "Agendá una reunión" bajan al formulario.
  calendarUrl: "",

  // BACKEND DEL FORMULARIO (opcional, para más adelante).
  // Si cargás una URL acá, el formulario hace un POST con JSON a esa URL
  // en vez de abrir el mail. Sirve para Formspree, Make, Zapier,
  // una función serverless o un CRM. Ver submitLead() en js/main.js.
  formEndpoint: "",

  // Mostrar u ocultar nombres en la sección de respaldo y resultados.
  showFounderNames: true,
  showClientNames: true
};
