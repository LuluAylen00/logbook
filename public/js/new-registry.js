let card = document.querySelector("#card");

let date = document.querySelector("#date-input");
let start = document.querySelector("#start-input");
let end = document.querySelector("#end-input");
let freq = document.querySelector("#freq-input");
let mode = document.querySelector("#mode-input");
// let qso = document.querySelector("#qso-input");
let rstSend = document.querySelector("#rst-send-input");
let rstReceived = document.querySelector("#rst-received-input");
let name = document.querySelector("#name-input");
let obs = document.querySelector("#obs-input");

card.addEventListener("keydown", (e) =>{
    // console.log(e.key);
    if (e.key == "Enter" && qso.value.length > 3) {
        let data = {
            QSO_DATE: date.value,//.replace("-", ""),
            TIME_ON: start.value,//.replace(":", ""),
            TIME_OFF: end.value,//.replace(":", ""),
            FREQ: freq.value,
            MODE: mode.value,
            CALL: qso.value,
            RST_SENT: rstSend.value,
            RST_RCVD: rstReceived.value,
            NAME: name.value,
            COMMENT: obs.value
        }
        fetch("/api/log", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).then(response => {
            if (response.status == 204) {
                alert("Nuevo registro creado");
                let thisDate = new Date(Date.now());
                date.value = `${thisDate.getFullYear()}-${String(thisDate.getMonth()+1).length == 1 ? 0+String(thisDate.getMonth()+1) : thisDate.getMonth()+1}-${String(thisDate.getDate()).length > 1 ? String(thisDate.getDate()) : 0+ String(thisDate.getDate())}`;
                qso.value = ""
                rstSend.value = "59"
                rstReceived.value = "59"
                name.value = ""
                obs.value = ""
                actualizarTimers();
                loadRegistry();
            }
        })
    }
})