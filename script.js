const COMPANY_EMAIL = "gruas.fernandez2026@gmail.com";

const menu = document.querySelector(".menu");
const links = document.querySelector(".links");
menu?.addEventListener("click",()=>{const open=links.classList.toggle("open");menu.setAttribute("aria-expanded",open?"true":"false")});
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener("click",e=>{const target=document.querySelector(link.getAttribute("href"));if(!target)return;e.preventDefault();target.scrollIntoView({behavior:"smooth"});links?.classList.remove("open")}));
document.getElementById("year").textContent=new Date().getFullYear();

const loadCategory=document.getElementById("loadCategory");
const vehicleFields=document.getElementById("vehicleFields");
const vehicleType=document.getElementById("vehicleType");
const vehiclePlate=document.getElementById("vehiclePlate");
const vehicleBrandModel=document.getElementById("vehicleBrandModel");

function updateLoadFields(){
  const isVehicle=loadCategory?.value==="Vehículo";
  if(vehicleFields) vehicleFields.hidden=!isVehicle;

  [vehicleType,vehiclePlate,vehicleBrandModel].forEach(field=>{
    if(field){
      field.required=isVehicle;
      if(!isVehicle) field.value="";
    }
  });
}

loadCategory?.addEventListener("change",updateLoadFields);
updateLoadFields();

const form=document.getElementById("serviceForm");
const status=document.getElementById("status");
const modal=document.getElementById("emailModal");

form?.addEventListener("submit",event=>{
  event.preventDefault();
  if(!form.checkValidity()){form.reportValidity();return}
  const d=new FormData(form);
  const details=(d.get("details")||"").trim()||"Sin detalles adicionales.";
  const subject=`Registro de servicio — ${d.get("service")}`;
  const body=`Hola, Grúas Fernández.

Quiero registrar y agendar un servicio.

Nombre: ${d.get("name")}
Teléfono: ${d.get("phone")}
Servicio: ${d.get("service")}
Ubicación del servicio:
Ciudad/Municipio: ${d.get("city")}
Dirección: ${d.get("address")}
Barrio/Sector: ${d.get("neighborhood")}
Puntos de referencia: ${(d.get("reference") || "").trim() || "No especificado"}
Tipo de carga: ${d.get("loadCategory")}
${d.get("loadCategory")==="Vehículo" ? `Tipo de vehículo: ${d.get("vehicleType")}
Placas del vehículo: ${d.get("vehiclePlate")}
Marca y modelo: ${d.get("vehicleBrandModel")}
` : ""}Peso aproximado: ${d.get("weight")}
Fecha requerida: ${d.get("date")}

Detalles adicionales:
${details}

Enviado desde el sitio web de Grúas Fernández.`;

  window.serviceEmail={subject:encodeURIComponent(subject),body:encodeURIComponent(body),plainBody:body};
  status.textContent="Elige Gmail u Outlook para continuar.";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
});

function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open")}
document.querySelectorAll("[data-close]").forEach(el=>el.addEventListener("click",closeModal));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

document.querySelectorAll("[data-target]").forEach(button=>{
  button.addEventListener("click",()=>{
    const email=window.serviceEmail;if(!email)return;
    const to=encodeURIComponent(COMPANY_EMAIL);
    const subject=email.subject, body=email.body;
    const target=button.dataset.target;

    if(target==="gmail-web"){
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,"_blank","noopener,noreferrer");
    } else if(target==="outlook-web"){
      window.open(`https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${subject}&body=${body}`,"_blank","noopener,noreferrer");
    } else if(target==="gmail-app"){
      window.location.href=`googlegmail://co?to=${to}&subject=${subject}&body=${body}`;
    } else if(target==="outlook-app"){
      window.location.href=`ms-outlook://compose?to=${to}&subject=${subject}&body=${body}`;
    } else if(target==="whatsapp"){
      const whatsappNumber="573216403060";
      const whatsappMessage=encodeURIComponent(email.plainBody);
      window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,"_blank","noopener,noreferrer");
    }
    closeModal();
  });
});
