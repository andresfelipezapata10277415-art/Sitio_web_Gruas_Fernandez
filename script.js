const COMPANY_EMAIL = "gruas.fernandez2026@gmail.com";
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbyAUCWMOH-6nwQwYDrSONyzjGT1HDU1Ujix8YVskBGsXEb8shhptL10N71may0yj1OD/exec";

const menu = document.querySelector(".menu");
const links = document.querySelector(".links");
menu?.addEventListener("click",()=>{const open=links.classList.toggle("open");menu.setAttribute("aria-expanded",open?"true":"false")});
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener("click",e=>{const target=document.querySelector(link.getAttribute("href"));if(!target)return;e.preventDefault();target.scrollIntoView({behavior:"smooth"});links?.classList.remove("open")}));
document.getElementById("year").textContent=new Date().getFullYear();

const serviceSelect=document.getElementById("serviceSelect");
const vehicleFields=document.getElementById("vehicleFields");
const vehicleType=document.getElementById("vehicleType");
const vehiclePlate=document.getElementById("vehiclePlate");
const vehicleBrandModel=document.getElementById("vehicleBrandModel");
const cargoFields=document.getElementById("cargoFields");
const cargoType=document.getElementById("cargoType");
const cargoDimensions=document.getElementById("cargoDimensions");
const cargoWeight=document.getElementById("cargoWeight");
const generalWeightField=document.getElementById("generalWeightField");
const generalWeight=document.getElementById("generalWeight");
const locationFields=document.getElementById("locationFields");
const city=document.querySelector('[name="city"]');
const address=document.querySelector('[name="address"]');
const neighborhood=document.querySelector('[name="neighborhood"]');
const reference=document.querySelector('[name="reference"]');
const dateField=document.getElementById("dateField");
const serviceDate=document.getElementById("serviceDate");
const detailsField=document.getElementById("detailsField");
const details=document.getElementById("details");
const advisoryFields=document.getElementById("advisoryFields");
const advisorySituation=document.getElementById("advisorySituation");

function updateLoadFields(){
  const selectedService=serviceSelect?.value || "";
  const craneService=selectedService==="Servicio de grúa";
  const cargoService=selectedService==="Carga y transporte";
  const advisoryService=selectedService==="Asesoría";

  // Asesoria usa un formulario simplificado.
  if(locationFields) locationFields.hidden=advisoryService;
  [city,address,neighborhood].forEach(field=>{
    if(field){
      field.required=!advisoryService;
      if(advisoryService) field.value="";
    }
  });
  if(reference && advisoryService) reference.value="";

  if(dateField) dateField.hidden=advisoryService;
  if(serviceDate){
    serviceDate.required=!advisoryService;
    if(advisoryService) serviceDate.value="";
  }

  if(detailsField) detailsField.hidden=advisoryService;
  if(details && advisoryService) details.value="";

  if(advisoryFields) advisoryFields.hidden=!advisoryService;
  if(advisorySituation){
    advisorySituation.required=advisoryService;
    if(!advisoryService) advisorySituation.value="";
  }

  // Servicio de grua muestra directamente los datos del vehiculo.
  if(vehicleFields) vehicleFields.hidden=!craneService;

  [vehicleType,vehiclePlate,vehicleBrandModel].forEach(field=>{
    if(field){
      field.required=craneService;
      if(!craneService) field.value="";
    }
  });

  // Carga y transporte muestra directamente "Especifícanos tu carga".
  if(cargoFields) cargoFields.hidden=!cargoService;

  [cargoType,cargoWeight].forEach(field=>{
    if(field){
      field.required=cargoService;
      if(!cargoService) field.value="";
    }
  });

  if(cargoDimensions){
    cargoDimensions.required=false;
    if(!cargoService) cargoDimensions.value="";
  }

  // El peso general no aparece en Carga y transporte.
  if(generalWeightField) generalWeightField.hidden=cargoService || advisoryService;
  if(generalWeight){
    generalWeight.required=!cargoService && !advisoryService;
    generalWeight.disabled=cargoService || advisoryService;
    if(cargoService || advisoryService) generalWeight.value="";
  }
}

serviceSelect?.addEventListener("change",updateLoadFields);
updateLoadFields();

const form=document.getElementById("serviceForm");
const status=document.getElementById("status");
const modal=document.getElementById("emailModal");


function buildSheetsPayload(formData){
  const service=formData.get("service") || "";

  // Los nombres de estas propiedades coinciden con los atributos name=""
  // del formulario web, para que Apps Script reciba exactamente los campos
  // con los que fue programado.
  const payload={
    name:formData.get("name") || "",
    phone:formData.get("phone") || "",
    service:service
  };

  if(service==="Servicio de grúa"){
    payload.city=formData.get("city") || "";
    payload.address=formData.get("address") || "";
    payload.neighborhood=formData.get("neighborhood") || "";
    payload.reference=formData.get("reference") || "";
    payload.vehicleType=formData.get("vehicleType") || "";
    payload.vehiclePlate=formData.get("vehiclePlate") || "";
    payload.vehicleBrandModel=formData.get("vehicleBrandModel") || "";
    payload.weight=formData.get("weight") || "";
    payload.date=formData.get("date") || "";
    payload.details=formData.get("details") || "";
  }

  if(service==="Carga y transporte"){
    payload.city=formData.get("city") || "";
    payload.address=formData.get("address") || "";
    payload.neighborhood=formData.get("neighborhood") || "";
    payload.reference=formData.get("reference") || "";
    payload.cargoType=formData.get("cargoType") || "";
    payload.cargoDimensions=formData.get("cargoDimensions") || "";
    payload.cargoWeight=formData.get("cargoWeight") || "";
    payload.date=formData.get("date") || "";
    payload.details=formData.get("details") || "";
  }

  if(service==="Asesoría"){
    payload.advisorySituation=formData.get("advisorySituation") || "";
  }

  return payload;
}

function sendToGoogleSheets(payload){
  return fetch(GOOGLE_SHEETS_URL,{
    method:"POST",
    mode:"no-cors",
    keepalive:true,
    headers:{
      "Content-Type":"text/plain;charset=utf-8"
    },
    body:JSON.stringify(payload)
  });
}

form?.addEventListener("submit",event=>{
  event.preventDefault();
  if(!form.checkValidity()){form.reportValidity();return}
  const d=new FormData(form);

  const sheetsPayload=buildSheetsPayload(d);
  sendToGoogleSheets(sheetsPayload).catch(error=>{
    console.error("No se pudo registrar en Google Sheets:",error);
  });
  const details=(d.get("details")||"").trim()||"Sin detalles adicionales.";
  const subject=`Registro de servicio — ${d.get("service")}`;
  const body=`Hola, Grúas Fernández.

Quiero registrar y agendar un servicio.

Nombre: ${d.get("name")}
Teléfono: ${d.get("phone")}
Servicio: ${d.get("service")}
${d.get("service")==="Asesoría" ? `Resuelve tus dudas:
${d.get("advisorySituation")}
` : `Ubicación del servicio:
Ciudad/Municipio: ${d.get("city")}
Dirección: ${d.get("address")}
Barrio/Sector: ${d.get("neighborhood")}
Puntos de referencia: ${(d.get("reference") || "").trim() || "No especificado"}

${d.get("service")==="Servicio de grúa" ? `Datos del vehículo:
Tipo de vehículo: ${d.get("vehicleType")}
Placas del vehículo: ${d.get("vehiclePlate")}
Marca y modelo: ${d.get("vehicleBrandModel")}
Peso aproximado: ${d.get("weight")}
` : d.get("service")==="Carga y transporte" ? `Especifícanos tu carga:
Tipo de carga: ${d.get("cargoType")}
Medidas: ${(d.get("cargoDimensions") || "").trim() || "No especificadas"}
Peso: ${d.get("cargoWeight")}
` : `Peso aproximado: ${d.get("weight")}
`}Fecha requerida: ${d.get("date")}

Detalles adicionales:
${details}`}

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
    const email=window.serviceEmail;
    if(!email) return;

    const target=button.dataset.target;
    const to=encodeURIComponent(COMPANY_EMAIL);
    const subject=email.subject;
    const body=email.body;

    if(target==="gmail-web"){
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else if(target==="whatsapp" || target==="whatsapp-2"){
      const whatsappNumber=target==="whatsapp-2" ? "573185369744" : "573216403060";
      const whatsappMessage=encodeURIComponent(email.plainBody);
      window.open(
        `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
        "_blank",
        "noopener,noreferrer"
      );
    }

    closeModal();
  });
});
