// `==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`.

//`&&`(y), `||` (o), `!`(no).

const generateNumRandom = () => Math.floor(Math.random() * 101);

const numeroParaAcertar = generateNumRandom();

console.log(numeroParaAcertar);

const NO_ES_UN_NUMERO = 0;
const EL_NUMERO_ES_MENOR = 1;
const EL_NUMERO_ES_MAYOR = 2;
const ES_EL_NUMERO_SECRETO = 3;
const GAME_OVER = 4;

const MAX_INTENTOS = 5;
let numeroDeIntentos = 0;

const hasSuperadoElNumeroMaximoDeIntentos = () => {
  numeroDeIntentos > MAX_INTENTOS;
};

const muestraNumeroIntentos = () => {
  document.getElementById(
    "intentos"
  ).innerHTML = `${numeroDeIntentos} de ${MAX_INTENTOS}`;
};

//Carga el HTML antes de interactuar con el para evitar errores.
document.addEventListener("DOMContentLoaded", muestraNumeroIntentos);

const gestionarGameOver = (estado) => {
  if (estado === MAX_INTENTOS) {
    document.getElementById("comprobar").disabled = true;
  }
};

//funcion para mostrar texto y resultado
const muestraMensajeDeComprobacion = (texto, estado) => {
  let mensaje = "";

  switch (estado) {
    case NO_ES_UN_NUMERO:
      mensaje = `${texto} no es un número 🤨​, prueba otra vez`;
      break;
    case EL_NUMERO_ES_MENOR:
      mensaje = `UUUYY! ${texto} es MENOR al número secreto 😏​​, prueba otra vez`;
      break;
    case EL_NUMERO_ES_MAYOR:
      mensaje = `UUUYY! ${texto} es MAYOR al número secreto 🙄​​​, prueba otra vez`;
      break;
    case ES_EL_NUMERO_SECRETO:
      mensaje = `¡¡¡Enhorabuena, has acertado el número!!! 🎉🎉🎉​`;
      break;
    case GAME_OVER:
      mensaje = `¡¡¡GAME OVER 😵​, has superado el máximo de intentos`;
      break;
    default:
      mensaje = "Nose que ha pasado, pero no deberías estas aquí 😰​";
      break;
  }

  document.getElementById("resultado").innerHTML = mensaje;
};

//funcion para comprobar si el numero es secreto o no
const comprobarNumero = (texto) => {
  const numero = parseInt(texto);
  const esUnNumero = !isNaN(numero);

  if (!esUnNumero) {
    return NO_ES_UN_NUMERO;
  }

  if (numero === numeroParaAcertar) {
    return ES_EL_NUMERO_SECRETO;
  }

  if (hasSuperadoElNumeroMaximoDeIntentos()) {
    return GAME_OVER;
  }

  //Uso de ternarios para sustituir este condicional
  return numero > numeroParaAcertar ? EL_NUMERO_ES_MAYOR : EL_NUMERO_ES_MENOR;
};

const handleCompruebaClick = () => {
  const texto = document.getElementById("numero").value;
  const estado = comprobarNumero(texto);
  muestraMensajeDeComprobacion(texto, estado);
  numeroDeIntentos++;
  muestraNumeroIntentos();
  gestionarGameOver(estado);
};

const botonComprobar = document.getElementById("comprobar");
botonComprobar.addEventListener("click", handleCompruebaClick);
