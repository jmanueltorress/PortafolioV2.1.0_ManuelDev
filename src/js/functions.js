document.addEventListener("DOMContentLoaded", function(){
// Las palabras que cambiarán en el heading
const words = ["Web Developer", "Jr Frontend", "UX/UI Designer", "TI Engineer", "Mentor"];
let index = 0;
let currentWord = '';
let charIndex = 0;
const heading = document.getElementById('text');

// Función para escribir una palabra
function typeWord() {
  if (charIndex < words[index].length) {
    currentWord += words[index][charIndex];
    heading.textContent = currentWord+' '; // Actualiza el texto del heading
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
const showPdfLink = document.getElementById('show-pdf');
const pdfOverlay = document.getElementById('pdf-overlay');
const closePdfButton = document.getElementById('close-pdf');

// Al hacer clic en el enlace, mostramos el PDF
showPdfLink.addEventListener('click', function(event) {
  event.preventDefault();  // Evitar que el enlace realice una acción por defecto
  pdfOverlay.style.display = 'flex';  // Mostrar el overlay con el PDF
});

// Al hacer clic en el botón "Cerrar", ocultamos el overlay
closePdfButton.addEventListener('click', function() {
  pdfOverlay.style.display = 'none';  // Ocultar el overlay
});

// funcion para mostrar mensaje en pantalla una vez enviado el form de contacto
const form = document.getElementById('formContact');
const thankYouMessage = document.getElementById('thankYouMessage');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío inmediato
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
  })
  .then(response => {
    if (response.ok) {
      form.style.display = 'none'; // Oculta el formulario
      thankYouMessage.style.display = 'block'; // Muestra el mensaje de agradecimiento
    } else {
      alert('Hubo un error. Intenta nuevamente.');
    }
  })
  .catch(error => {
    alert('Hubo un error. Intenta nuevamente.');
  });
});