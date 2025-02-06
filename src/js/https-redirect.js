// Redirigir a https si el usuario accede a travez de http
 if (window.location.protocol !== "https:") {
     // Redirige a la misma URL pero con HTTPS
     window.location.href = "https://" + window.location.hostname + window.location.pathname + window.location.search;
  }
  
// Para entorno de pruebas (localhost) desactivar este script