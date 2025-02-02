document.addEventListener("DOMContentLoaded", function () {
  // Las palabras que cambiarán en el heading
  const words = [
    "Web Developer",
    "Jr Frontend",
    "UX/UI Designer",
    "TI Engineer",
    "Mentor",
  ];
  let index = 0;
  let currentWord = "";
  let charIndex = 0;
  const heading = document.getElementById("text");

  // Función para escribir una palabra
  function typeWord() {
    if (charIndex < words[index].length) {
      currentWord += words[index][charIndex];
      heading.textContent = currentWord + " "; // Actualiza el texto del heading
      charIndex++;
      setTimeout(typeWord, 150); // Espera antes de escribir el siguiente caracter
    } else {
      setTimeout(deleteWord, 1000); // Espera 1 segundo antes de borrar la palabra
    }
  }

  // Función para borrar una palabra
  function deleteWord() {
    if (charIndex > 0) {
      currentWord = currentWord.slice(0, -1); // Elimina el último carácter
      heading.textContent = currentWord; // Actualiza el texto
      charIndex--;
      setTimeout(deleteWord, 100); // Espera antes de borrar otro carácter
    } else {
      // Cambia a la siguiente palabra
      index = (index + 1) % words.length; // Ciclo de palabras
      setTimeout(typeWord, 500); // Espera antes de escribir la siguiente palabra
    }
  }

  // Inicia el efecto de escritura
  setTimeout(typeWord, 500);
});

//function to see pdf
// Seleccionar los elementos
const showPdfLink = document.getElementById("show-pdf");
const pdfOverlay = document.getElementById("pdf-overlay");
const closePdfButton = document.getElementById("close-pdf");

// Al hacer clic en el enlace, mostramos el PDF
showPdfLink.addEventListener("click", function (event) {
  event.preventDefault(); // Evitar que el enlace realice una acción por defecto
  pdfOverlay.style.display = "flex"; // Mostrar el overlay con el PDF
});

// Al hacer clic en el botón "Cerrar", ocultamos el overlay
closePdfButton.addEventListener("click", function () {
  pdfOverlay.style.display = "none"; // Ocultar el overlay
});

// Manejo de formulario recaptcha v3 y popup de confirmacion de envio
const $form = document.querySelector("#form");

// Función que maneja el envío del formulario
async function handleSubmit(event) {
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  // Obtener el token de reCAPTCHA v3
  try {
    const token = await grecaptcha.execute(
      "6LcKN8kqAAAAAJDr0LQ0Vl25RyBOlppD3cNQkZJA",
      { action: "submit" }
    );

    // Crear un nuevo objeto FormData a partir del formulario
    const form = new FormData($form);

    // Agregar el token de reCAPTCHA al formulario
    form.append("recaptcha_token", token);

    // Enviar los datos del formulario
    const response = await fetch($form.action, {
      method: $form.method, // Usar el método del formulario (POST)
      body: form, // El cuerpo será el objeto FormData
      headers: {
        Accept: "application/json", // Aceptar respuesta en formato JSON
      },
    });

    if (response.ok) {
      // Si la respuesta es exitosa, limpiamos el formulario y mostramos el mensaje
      $form.reset();
      alert("Gracias por tu mensaje. En breve me pondré en contacto contigo.");
    } else {
      // Si hay un error en la respuesta
      alert(
        "Hubo un error al enviar el formulario. Por favor intenta nuevamente."
      );
    }
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    alert(
      "Hubo un error al enviar el formulario. Por favor intenta nuevamente."
    );
  }
}

// Añadir el event listener para el envío del formulario
$form.addEventListener("submit", handleSubmit);


// efecto giz con cursor
document.addEventListener('mousemove', function(e) {
  // Crear un nuevo trazo al mover el mouse
  const trazo = document.createElement('div');
  trazo.classList.add('trazo');
  document.body.appendChild(trazo);

  // Posicionar el trazo en la posición del mouse
  trazo.style.left = e.pageX - 10 + 'px'; // Centrado en el mouse
  trazo.style.top = e.pageY - 10 + 'px';

  // Eliminar el trazo después de la animación
  setTimeout(() => {
      trazo.remove();
  }, 500); // El tiempo de la animación es de 0.5s
});
