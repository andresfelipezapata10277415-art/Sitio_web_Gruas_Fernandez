const COMPANY_EMAIL = "gruas.fernandez2026@gmail.com";

const menu = document.querySelector(".menu");
const links = document.querySelector(".links");

menu?.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menu.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll(".links a").forEach(a => {
  a.addEventListener("click", () => links.classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("serviceForm");
const status = document.getElementById("status");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);

  const details = (data.get("details") || "").trim() || "Sin detalles adicionales.";

  const subject = encodeURIComponent(`Registro de servicio — ${data.get("service")}`);
  const body = encodeURIComponent(
`Hola, Grúas Fernández.

Quiero registrar y agendar un servicio.

Nombre: ${data.get("name")}
Teléfono: ${data.get("phone")}
Servicio: ${data.get("service")}
Ubicación: ${data.get("location")}
Tipo de carga: ${data.get("load")}
Peso aproximado: ${data.get("weight")}
Fecha requerida: ${data.get("date")}
Detalles adicionales: ${details}

Enviado desde el sitio web de Grúas Fernández.`
  );

  status.textContent = "Abriendo Gmail con el registro preparado…";

  const gmailUrl =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${encodeURIComponent(COMPANY_EMAIL)}` +
    `&su=${subject}` +
    `&body=${body}`;

  window.location.href = gmailUrl;
});


// Navegación de los botones principales y enlaces internos.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    // Cierra el menú móvil si está abierto.
    links?.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
  });
});
