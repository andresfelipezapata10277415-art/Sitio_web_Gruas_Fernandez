Sitio web de Grúas Fernández. Sube index.html, styles.css, script.js y assets/ a la raíz de GitHub Pages.

## Google Sheets
El formulario envía automáticamente cada registro a:
https://script.google.com/macros/s/AKfycbyAUCWMOH-6nwQwYDrSONyzjGT1HDU1Ujix8YVskBGsXEb8shhptL10N71may0yj1OD/exec

Después mantiene las opciones existentes de Gmail y los dos WhatsApp.


## Ajuste de compatibilidad con Apps Script
El POST ahora envia JSON usando exactamente los nombres de campo del formulario:
name, phone, service, city, address, neighborhood, reference, vehicleType,
vehiclePlate, vehicleBrandModel, weight, cargoType, cargoDimensions,
cargoWeight, date, details y advisorySituation, segun el servicio seleccionado.
