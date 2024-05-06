let dateInput = document.querySelector("#date-input");
let thisDate = new Date(Date.now());
dateInput.value = `${thisDate.getFullYear()}-${String(thisDate.getMonth()+1).length == 1 ? 0+String(thisDate.getMonth()+1) : thisDate.getMonth()+1}-${String(thisDate.getDate()).length > 1 ? String(thisDate.getDate()) : 0+ String(thisDate.getDate())}`;

// Crear dos elementos HTML para mostrar los timers
let startInput = document.getElementById("start-input");
let endInput = document.getElementById("end-input");

// Crear una función para obtener la hora actual en UTC-3
function getHoraUTC3() {
  // Obtener la fecha y hora actual del sistema
  let fecha = new Date();
  // Convertir la hora local a UTC
  let utc = fecha.getTime() + fecha.getTimezoneOffset() * 60000;
  // Restar 3 horas para obtener la hora en UTC-3
  let utc3 = utc - 3 * 3600000;
  // Crear una nueva fecha con la hora en UTC-3
  let fechaUTC3 = new Date(utc3);
  // Formatear la hora con el formato HH:MM:SS
  let hora = fechaUTC3.toTimeString().slice(0, 8);

    if (hora.length == 2) {
        hora += ":00:00";
    } else if (hora.length == 5){
        hora += ":00";
    }
  // Devolver la hora formateada
  return hora;
}

// Crear una variable para guardar el id del intervalo
let intervalo;
let intervaloInicio;
let intervaloFin;

let writting = false;

let fixed = false;

// Crear una función para actualizar los timers cada segundo
function actualizarTimers() {
  // Obtener la hora actual en UTC-3
  let hora = getHoraUTC3();
  // Asignar la hora a los elementos HTML
  
  startInput.value = hora;
  endInput.value = hora;
//   Crear un intervalo que se ejecute cada segundo
  intervalo = setInterval(function () {
    // Obtener la hora actual en UTC-3
    let hora = getHoraUTC3();
    // Asignar la hora a los elementos HTML
    if (!fixed) {
        if (!writting) {
            startInput.value = hora;
        }
        endInput.value = hora;
    }
  }, 1000);
}

// Crear una función para detener el intervalo
function detenerIntervalo() {
  clearInterval(intervalo);
}

// Crear una función para reanudar el intervalo
function reanudarIntervalo() {
  // Actualizar los timers
  actualizarTimers();
}

// Obtener el elemento HTML del input
let qsoInput = document.getElementById("qso-input");
// Agregar un evento para detectar cuando el usuario empiece a escribir en el input
qsoInput.addEventListener("keyup", async function (e) {
  if (e.target.value != "") {
    writting = true;
    let country = dxcc.filter((c) => {
        let prefixes = c.prefix.split(",");
        for (let i = 0; i < prefixes.length; i++) {
            const prefix = prefixes[i];
            // console.log(e.target.value, e.target.value.toLowerCase().indexOf(prefix.trim().toLowerCase()), prefix);
            if (e.target.value.toLowerCase().indexOf(prefix.trim().toLowerCase()) == 0) {
                return true;
            }
        }
        return false;
    })[0];

    let imgCountry = document.getElementById("country-image")
    if (country && country.name) {
        let countryFetch = await fetch('https://restcountries.com/v3.1/name/'+country.name.replace(" ", "%20")+'?fullText=true');
        let dataCountry = await countryFetch.json();
        // console.log(dataCountry[0]);
        imgCountry.setAttribute('src', dataCountry[0].flags.svg);
    } else {
        imgCountry.setAttribute('src', "/img/default-flag.png");
    }
  } else {
    writting = false;
  }
});


let resetTimerButton = document.querySelector("#reset-time-button");
resetTimerButton.addEventListener("click", () => {
    actualizarTimers();
})

let manualTimerButton = document.querySelector("#manual-time-button");
// console.log(manualTimerButton);
manualTimerButton.addEventListener("click", () => {
    console.log("asd");
    manualTimerButton.classList.toggle("enabled");
    fixed = !fixed;
    actualizarTimers();
})

// Agregar un evento para detectar cuando el usuario deje de escribir en el input
// input.addEventListener("keyup", function () {
//   // Reanudar el intervalo del primer timer
//   reanudarIntervalo();
// });

// Llamar a la función para actualizar los timers al cargar la página
actualizarTimers();
