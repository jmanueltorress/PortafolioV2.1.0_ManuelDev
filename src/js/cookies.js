// Función para establecer una cookie
function setCookie(name, value, options = {}) {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    
    // Configurar los atributos de la cookie
    if (options.expires) {
      cookieString += `; expires=${options.expires.toUTCString()}`;
    }
  
    if (options.path) {
      cookieString += `; path=${options.path}`;
    }
  
    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }
  
    // Si el entorno es HTTPS, asegurarse de que sea Secure
    if (window.location.protocol === 'https:') {
      cookieString += `; Secure`;
    }
  
    // Asegurarse de que SameSite sea None para cookies cross-site
    cookieString += `; SameSite=None`;
  
    // Establecer la cookie
    document.cookie = cookieString;
  
    console.log(`Cookie establecida: ${cookieString}`);
}
  
// Función para obtener el valor de una cookie
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const [cookieName, cookieValue] = cookies[i].split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
}
  
// Función para mostrar el banner de cookies
function showCookieBanner() {
    console.log("Mostrando el banner de cookies.");
  
    const banner = document.createElement('div');
    banner.classList.add('cookie-banner');
    banner.innerHTML = `
      <p>Este sitio usa cookies para mejorar tu experiencia. ¿Aceptas las cookies?</p>
      <button id="acceptCookiesBtn">Aceptar</button>
      <button id="declineCookiesBtn">Rechazar</button>
    `;
    document.body.appendChild(banner);
  
    // Acción para aceptar las cookies
    document.getElementById('acceptCookiesBtn').addEventListener('click', () => {
      console.log("Usuario aceptó las cookies.");
      setCookie('userConsented', 'true', { expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), path: '/' });
      activateService(); // Activar los servicios después de aceptar las cookies
      hideBanner(banner); // Ocultar el banner con animación
    });
  
    // Acción para rechazar las cookies
    document.getElementById('declineCookiesBtn').addEventListener('click', () => {
      console.log("Usuario rechazó las cookies.");
      setCookie('userConsented', 'false', { expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), path: '/' });
      hideBanner(banner); // Ocultar el banner con animación
    });
}
  
// Función para activar los servicios después de aceptar las cookies
function activateService() {
    console.log("Activando los servicios...");
  
    // Cargar el script de Calendly
    loadCalendlyScript();
  
    // Cargar el script de Google reCAPTCHA
    loadRecaptchaScript();
}
  
// Función para cargar el script de Calendly
function loadCalendlyScript() {
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    
    // Una vez que se carga el script, inicializamos el widget de Calendly
    script.onload = function () {
      console.log("Script de Calendly cargado correctamente.");
      Calendly.initBadgeWidget({
        url: "https://calendly.com/tjmanuel354/30min", // URL de tu Calendly
        text: "Schedule a meeting with me", // Texto del botón
        color: "#03c987aa", // Color de fondo del botón
        textColor: "#ffffff", // Color del texto
      });
    };

    document.body.appendChild(script);
}
  
// Función para cargar el script de Google reCAPTCHA
function loadRecaptchaScript() {
    const script = document.createElement('script');
    script.src = "https://www.google.com/recaptcha/api.js?render=6LcKN8kqAAAAAJDr0LQ0Vl25RyBOlppD3cNQkZJA";
    script.async = true;
    document.body.appendChild(script);
    console.log("Script de Google reCAPTCHA cargado.");
}
  
// Función para ocultar el banner con animación
function hideBanner(banner) {
    banner.classList.add('hide'); // Añadimos la clase para la animación
    setTimeout(() => banner.remove(), 500); // Esperamos a que termine la animación antes de eliminar el banner
}
  
// Función para manejar el consentimiento de cookies
function handleCookieConsent() {
    const userConsented = getCookie('userConsented');
    console.log(`Estado de consentimiento: ${userConsented}`);
    
    // Si no se ha dado el consentimiento, mostrar el banner de cookies
    if (!userConsented || userConsented === 'false') {
      showCookieBanner();
    } else {
      // Si ya se ha dado el consentimiento, activar los servicios
      activateService();
    }
}
  
// Ejecutar la verificación y manejo del consentimiento de cookies al cargar el sitio
window.addEventListener('load', () => {
    handleCookieConsent(); // Manejar el consentimiento de cookies
});
