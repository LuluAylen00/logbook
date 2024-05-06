let table = document.querySelector("table.table");
function resetTable(){
    table.innerHTML = `<thead>
    <tr>
      <th scope="col">QSO con</th>
      <th scope="col">Nombre</th>
      <th scope="col">Freq.</th>
      <th scope="col">Hora Inicio</th>
      <th scope="col">Hora Fin</th>
      <th scope="col">Fecha</th>
      <th scope="col">RST Env.</th>
      <th scope="col">RST Rec.</th>
      <th scope="col">Modo</th>
      <th scope="col">Observaciones</th>
    </tr>
  </thead>
  <tbody id="table-body">
  </tbody>`
}

async function loadRegistry() {
    let json = await fetch('/api/log');
    let data = await json.json();

    resetTable();
    let tableBody = document.querySelector('#table-body');
    console.log(data);
    data.forEach((registro) => {
        tableBody.innerHTML += `<tr>
        <th scope="row">${registro.CALL}</th>
        <td>${registro.NAME || ""}</td>
        <td>${registro.FREQ || ""}</td>
        <td>${registro.TIME_ON || ""}</td>
        <td>${registro.TIME_OFF || ""}</td>
        <td>${registro.QSO_DATE || ""}</td>
        <td>${registro.RST_SENT || ""}</td>
        <td>${registro.RST_RCVD || ""}</td>
        <td>${registro.MODE || ""}</td>
        <td>${registro.COMMENT || registro.QSLMSG || ""}</td>
      </tr>`
    })
}

loadRegistry();