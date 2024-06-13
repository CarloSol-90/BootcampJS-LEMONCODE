let turno = 0;

const incrementar = () => {
  turno++;
  const numeroTurno = document.getElementById("numero-turno");

  if (
    numeroTurno !== null &&
    numeroTurno !== undefined &&
    numeroTurno instanceof HTMLHeadingElement
  )
    numeroTurno.textContent = `${turno}`.padStart(2, "0");
};

const botonAvanzar = document.getElementById("incremento");

if (
  botonAvanzar !== undefined &&
  botonAvanzar !== null &&
  botonAvanzar instanceof HTMLButtonElement
) {
  botonAvanzar?.addEventListener("click", incrementar);
} else {
  console.error("Error");
}

const decrementar = () => {
  turno--;
  const numeroTurno = document.getElementById("numero-turno");

  if (
    numeroTurno !== null &&
    numeroTurno !== undefined &&
    numeroTurno instanceof HTMLHeadingElement
  )
    numeroTurno.textContent = `${turno}`.padStart(2, "0");
};

const botonRetroceso = document.getElementById("decremento");

if (
  botonRetroceso !== undefined &&
  botonRetroceso !== null &&
  botonRetroceso instanceof HTMLButtonElement
) {
  botonRetroceso?.addEventListener("click", decrementar);
} else {
  console.error("Error");
}

////

const resetear = () => {
  turno = 0;
  const numeroTurno = document.getElementById("numero-turno");

  if (
    numeroTurno !== null &&
    numeroTurno !== undefined &&
    numeroTurno instanceof HTMLHeadingElement
  ) {
    numeroTurno.textContent = `${turno}`.padStart(2, "0");
  }
};

const botonResetear = document.getElementById("resetear");

if (
  botonResetear !== undefined &&
  botonResetear !== null &&
  botonResetear instanceof HTMLButtonElement
)
  botonResetear.addEventListener("click", resetear);
else {
  console.error("Error");
}
