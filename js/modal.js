const modal = document.getElementById("formModal");
const closeBtn = document.querySelector(".modal .close");
const agendarBtn = document.getElementById("agendar-button");
const agendarBtn2 = document.getElementById("agendar-button2");
const agendarBtn3 = document.getElementById("agendar-button3");
let brochureRequested = false;
let formData = {};
let contactoAnswer = "";
let invertirAnswer = "";
let precioAnswer = "";
let motivotoAnswer = "";
let interes = "H Living";
// Mostrar modal
agendarBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  showStep(1);
});
agendarBtn2.addEventListener("click", () => {
  modal.classList.remove("hidden");
  showStep(1);
});
agendarBtn3.addEventListener("click", () => {
  modal.classList.remove("hidden");
  showStep(1);
});
// Cerrar modal
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));

// Control de pasos
function showStep(num) {
  document
    .querySelectorAll(".step")
    .forEach((step) => step.classList.add("hidden"));
  document.querySelector(`.step-${num}`).classList.remove("hidden");
}

// Paso 1: Envío a HubSpot
// Paso 1: Envío a HubSpot
document.getElementById("Registro-Aldea-Umm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  formData = {
    firstname: form.firstname.value,
    lastname: form.lastname.value,
    phone: (form.countryCode?.value || "") + form.phone.value,
    email: form.email.value,
  };

  const data = {
    fields: [
      { name: "firstname", value: formData.firstname },
      { name: "lastname", value: formData.lastname },
      { name: "phone", value: formData.phone },
      { name: "email", value: formData.email },
      { name: "interes", value: interes },
    ],
  };

  fetch(
    "https://api.hsforms.com/submissions/v3/integration/submit/39595277/0ce54b14-a5a4-4b50-8ac5-ddb66e271a93",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  )
  .then((res) => {
    console.log("Respuesta de HubSpot:", res.status);
    if (res.ok) {
      
      document.getElementById(
        "surveyIntro"
      ).textContent = `${formData.firstname} ¡Nos gustaría conocerte mejor! Te agradeceríamos si pudieras responder esta breve encuesta.`;
      showStep(2);
    } else {
      console.error("Error al enviar a HubSpot:", res.statusText);
    }
  })
  .catch((error) => {
    console.error("Error en la solicitud:", error);
  });
});
    // fbq("track", "Lead", {
    //   content_name: "Registro H Living",
    //   form_location: "Landing Promocional",
    // });


// Paso 2 a 3 — ahora solo muestra la pregunta
document.getElementById("toStep3").addEventListener("click", () => {
  document.getElementById(
    "motivoQuestion"
  ).textContent = `${formData.firstname} ¿Qué te motiva más a invertir en un departamento a solo minutos del mar en Puerto Morelos?`;
  showStep(3);
});

// Paso 3 a 4 — guarda motivo
document.getElementById("toStep4").addEventListener("click", () => {
  const answer = document.querySelector('input[name="motivo"]:checked');
  if (!answer) return alert("Selecciona una opción.");
  motivotoAnswer = answer.value;
  showStep(4);
});

// Paso 4 a 5 — guarda invertir
document.getElementById("toStep5").addEventListener("click", () => {
  const answer = document.querySelector('input[name="invertir"]:checked');
  if (!answer) return alert("Selecciona una opción.");
  invertirAnswer = answer.value;
  document.getElementById(
    "contactoQuestion"
  ).innerHTML = `${formData.firstname} ¿Cómo prefieres agendar tu cita virtual?`;
  showStep(5);
});

// Paso 5 a 6 — guarda precio
document.getElementById("toStep6").addEventListener("click", () => {
  const answer = document.querySelector('input[name="precio"]:checked');
  if (!answer) return alert("Selecciona una opción.");
  precioAnswer = answer.value;
  showStep(6);
});

// Paso 6 a 7 — guarda contacto y muestra calendario
document.getElementById("toStep7").addEventListener("click", () => {
  const answer = document.querySelector('input[name="contacto"]:checked');
  if (!answer) return alert("Selecciona una opción.");
  contactoAnswer = answer.value;

  // Enviar correo
  sendConfirmationEmail();

  // Si viene del botón de brochure, descarga el PDF
  if (brochureRequested) {
    const link = document.createElement("a");
    link.href = "../assets/brochure-en.pdf";
    link.download = "Aldea-Umm-Brochure.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Mostrar calendario
  showStep(7);
  insertCalendar();

  // Reset flag para futuros agendamientos
  brochureRequested = false;
});
document.querySelectorAll(".back-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const backStep = e.target.getAttribute("data-back-step");
    showStep(backStep);
  });
});
// Paso 4: Insertar calendario de HubSpot con valores precargados
function insertCalendar() {
  const container = document.getElementById("calendarContainer");
  container.innerHTML = "";

  // Preparamos los datos del formulario para la URL
  const queryParams = new URLSearchParams({
    firstname: formData.firstname,
    lastname: formData.lastname,
    email: formData.email,
    phone: formData.phone,
  }).toString();

  // Insertamos el iframe con los parámetros
  const calendarDiv = document.createElement("div");
  calendarDiv.className = "meetings-iframe-container";
  calendarDiv.setAttribute(
    "data-src",
    `https://meetings.hubspot.com/octavio23/calendario-h-living?embed=true&${queryParams}`
  );
  container.appendChild(calendarDiv);

  // Script de HubSpot Meetings
  const script = document.createElement("script");
  script.src =
    "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
  script.type = "text/javascript";
  container.appendChild(script);
  // Cierra el modal automáticamente después de 2 minutos (opcional)
  // setTimeout(() => {
  //   modal.classList.add('hidden');
  // }, 120000);
}

// Paso final: enviar email
function sendConfirmationEmail() {
  fetch("https://formsubmit.co/ajax/operez@itmgroup.mx", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      "Desarrollo de interes": interes,
      Nombre: formData.firstname,
      Apellidos: formData.lastname,
      Teléfono: formData.phone,
      Email: formData.email,
      "¿Qué te motiva más a invertir en un departamento a solo minutos del mar en Puerto Morelos?":
        motivotoAnswer,
      "¿Qué tan pronto te gustaría invertir en tu nuevo departamento?":
        invertirAnswer,
      "¿Estás consciente de que nuestros lotes residenciales comienzan en $1,100,000 MXN?":
        precioAnswer,
      "¿Cómo prefieres agendar tu cita virtual?": contactoAnswer,
      _template: "table",
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log("Correo enviado:", data))
    .catch((error) => console.error("Error al enviar el correo:", error));
}
// Escuchar evento de finalización de cita en HubSpot Meetings
window.addEventListener("message", function (event) {
  const data = event.data;

  // Validar que sea de HubSpot Meetings y que sea un submit
  if (
    typeof data === "object" &&
    data.type === "hsFormCallback" &&
    data.eventName === "onFormSubmitted"
  ) {
    // Disparar evento de Meta Pixel
    fbq('track', 'Schedule', {
      content_name: 'Calendario H Living',
      form_location: 'Landing Promocional'
    });

    console.log("Evento Schedule enviado a Meta Pixel");
  }
});
