// ============================================================
// GRÚAS FERNÁNDEZ — CONFIGURACIÓN
// Cambia este correo por el correo real de la empresa.
// ============================================================
const COMPANY_EMAIL = "gruas.fernandez2026@gmail.com";

// Menú móvil
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Año automático
document.getElementById("year").textContent = new Date().getFullYear();

// Formulario de cotización: genera un correo listo para enviar.
const form = document.getElementById("quoteForm");
const status = document.getElementById("formStatus");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = data.get("name").trim();
  const phone = data.get("phone").trim();
  const service = data.get("service");
  const message = data.get("message").trim();

  if (!name || !phone || !service || !message) {
    status.textContent = "Completa todos los campos para preparar la solicitud.";
    return;
  }

  const subject = encodeURIComponent(`Solicitud de cotización — ${service}`);
  const body = encodeURIComponent(
`Hola, Grúas Fernández.

Quiero solicitar una cotización.

Nombre: ${name}
Teléfono: ${phone}
Servicio: ${service}

Detalles del trabajo:
${message}

Enviado desde el sitio web de Grúas Fernández.`
  );

  window.location.href = `mailto:${COMPANY_EMAIL}?subject=${subject}&body=${body}`;
  status.textContent = "Abriendo tu aplicación de correo…";
});
