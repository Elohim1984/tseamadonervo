/**
 * Copiloto IA — Telesecundaria "Amado Nervo"
 * Script APARTE del de la Hoja "IA Amado Nervo" (no toca los datos de la escuela).
 *
 * Instalación (una sola vez):
 * 1. Entre a https://aistudio.google.com/apikey con la cuenta de la escuela y cree una clave (gratis).
 * 2. Entre a https://script.google.com → "Nuevo proyecto". Póngale de nombre "Copiloto Amado Nervo".
 * 3. Borre lo que trae y pegue TODO este archivo. Guarde.
 * 4. Engrane (Configuración del proyecto) → "Propiedades del script" → Agregar:
 *      Propiedad: GEMINI_API_KEY   Valor: (la clave del paso 1)
 * 5. Botón azul "Implementar" → "Nueva implementación" → tipo "Aplicación web":
 *      Ejecutar como: Yo · Quién tiene acceso: Cualquier usuario → Implementar → Autorizar.
 * 6. Copie la liga que termina en /exec y péguela en la app (botón ✨ Copiloto).
 *
 * La clave NUNCA va en la página ni en GitHub: solo vive aquí, en las propiedades del script.
 */
var MODELOS = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];

function doGet() {
  return salida({ ok: true, servicio: "copiloto", listo: !!PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY") });
}

function doPost(e) {
  try {
    var datos = JSON.parse(e.postData.contents || "{}");
    var clave = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");
    if (!clave) return salida({ ok: false, error: "Falta la clave GEMINI_API_KEY en las propiedades del script." });
    var mensajes = (datos.mensajes || []).slice(-20).map(function (m) {
      return { role: m.rol === "ia" ? "model" : "user", parts: [{ text: String(m.texto || "").slice(0, 20000) }] };
    });
    if (!mensajes.length) return salida({ ok: false, error: "No llegó ninguna pregunta." });
    var cuerpo = {
      systemInstruction: { parts: [{ text: String(datos.sistema || "").slice(0, 30000) }] },
      contents: mensajes,
      generationConfig: { temperature: 0.6, maxOutputTokens: 4096 }
    };
    var ultimoError = "";
    for (var i = 0; i < MODELOS.length; i++) {
      var r = UrlFetchApp.fetch("https://generativelanguage.googleapis.com/v1beta/models/" + MODELOS[i] + ":generateContent", {
        method: "post", contentType: "application/json", muteHttpExceptions: true,
        headers: { "x-goog-api-key": clave }, payload: JSON.stringify(cuerpo)
      });
      var codigo = r.getResponseCode(), json = {};
      try { json = JSON.parse(r.getContentText()); } catch (x) {}
      if (codigo === 200) {
        var partes = (((json.candidates || [])[0] || {}).content || {}).parts || [];
        var texto = partes.map(function (p) { return p.text || ""; }).join("");
        return salida({ ok: true, texto: texto || "(La IA no dio respuesta. Intente reformular.)", modelo: MODELOS[i] });
      }
      ultimoError = (json.error && json.error.message) || ("Error " + codigo);
    }
    return salida({ ok: false, error: ultimoError });
  } catch (err) {
    return salida({ ok: false, error: String(err) });
  }
}

function salida(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
