// Make the DIV element draggable:
let finder = document.getElementById("finder");
dragElement(finder);

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "-header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    elmnt.style.cursor = "move";
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
        let width = elmnt.offsetWidth;

    if (
        elmnt.offsetTop - pos2 >= 0 /*Arriba mayor a 0*/&& elmnt.offsetLeft - pos1 >= 0 /*Izquierda mayor a 0*/
        // elmnt.offsetTop+elmnt.offsetHeight < window.innerHeight && (elmnt.offsetLeft+elmnt.offsetWidth < window.innerWidth || (elmnt.offsetLeft+elmnt.offsetWidth < window.innerWidth && pos1 != -1))
    ) {
        // let top = 
        elmnt.style.top = ((elmnt.offsetTop + elmnt.offsetHeight) < window.innerHeight -3 ? (elmnt.offsetTop - pos2) : (window.innerHeight-elmnt.offsetHeight-5)) + "px";
        elmnt.style.left = ((elmnt.offsetLeft + elmnt.offsetWidth) < window.innerWidth -3?(elmnt.offsetLeft - pos1):(window.innerWidth-elmnt.offsetWidth-5)) + "px";
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    elmnt.style.cursor = "default";
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

let qso = document.querySelector("#qso-input");
let qrzcqButton = document.querySelector("#qrzcq-button");

let active = false;
qrzcqButton.addEventListener("click", (e) => {
    if (!active && qso.value.length > 2) {
        finder.classList.add("show");
        let iframe = document.createElement("iframe");
        iframe.id = "finder-iframe";
        iframe.src = `https://www.qrzcq.com/call/${qso.value}`;
        finder.appendChild(iframe);
    } else {
        finder.classList.remove("show");
        finder.innerHTML = `<div id="finder-header">QRZCQ</div>`
        dragElement(finder);
    }
    active = !active;
})
