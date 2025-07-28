// Ejercicio A - Validador IBAN
// Base de datos de bancos españoles
const BANCOS_ESPANOLES = {
  "2080": "Abanca Corporación Bancaria",
  "0061": "Banca March",
  "0188": "Banco Alcalá",
  "0182": "Banco Bilbao Vizcaya Argentaria",
  "0130": "Banco Caixa Geral",
  "0234": "Banco Caminos",
  "2105": "Banco Castilla-La Mancha",
  "0240": "Banco de Crédito Social Cooperativo",
  "0081": "Banco de Sabadell",
  "0487": "Banco Mare Nostrum",
  "0186": "Banco Mediolanum",
  "0238": "Banco Pastor",
  "0075": "Banco Popular Español",
  "0049": "Banco Santander",
  "3873": "Banco Santander Totta",
  "2038": "Bankia",
  "0128": "Bankinter",
  "0138": "Bankoa",
  "0152": "Barclays Bank PLC",
  "3842": "BNP Paribas Paris",
  "3025": "Caixa de Credit del Enginyers",
  "2100": "Caixabank",
  "2045": "Caja de Ahorros y Monte de Piedad de Ontinyent",
  "3035": "Caja Laboral Popular CC",
  "3081": "Caja Rural Castilla-La Mancha",
  "3058": "Cajamar Caja Rural",
  "2000": "Cecabank",
  "1474": "Citibank Europe PLC",
  "3821": "Commerzbank AG",
  "3877": "Danske Bank A/S",
  "0019": "Deutsche Bank SAE",
  "0239": "EVO Banco",
  "2085": "Ibercaja Banco",
  "1465": "ING Bank NV",
  "2095": "Kutxabank",
  "2048": "Liberbank",
  "0131": "Novo Banco",
  "0073": "Open Bank",
  "0108": "Société Générale",
  "2103": "Unicaja Banco"
};

// EXPRESIÓN REGULAR PRINCIPAL para IBAN español
const IBAN_REGEX = /^ES\s?(\d{2})\s?(\d{4})\s?(\d{4})\s?(\d{2})\s?(\d{10})$/i;

// Función para limpiar IBAN (quitar espacios y guiones)
function limpiarIban(iban) {
  return iban.replace(/[\s-]/g, '').toUpperCase();
}

// Función para validar formato con expresión regular
function validarFormato(iban) {
  const ibanLimpio = limpiarIban(iban);
  return IBAN_REGEX.test(ibanLimpio);
}

// Función para extraer información del IBAN
function extraerInformacion(iban) {
  const ibanLimpio = limpiarIban(iban);
  const resultado = ibanLimpio.match(IBAN_REGEX);
  
  if (!resultado) {
    return null;
  }

  const [, digitoControl, codigoBanco, codigoSucursal, digitoControlCuenta, numeroCuenta] = resultado;
  
  return {
    paisCodigo: "ES",
    digitoControl: digitoControl,
    codigoBanco: codigoBanco,
    codigoSucursal: codigoSucursal,
    digitoControlCuenta: digitoControlCuenta,
    numeroCuenta: numeroCuenta,
    nombreBanco: BANCOS_ESPANOLES[codigoBanco] || "Banco no identificado"
  };
}

// Función principal para validar IBAN
function validarIban() {
  const input = document.getElementById('iban-input');
  const resultado = document.getElementById('iban-resultado');
  const iban = input.value.trim();

  if (!iban) {
    resultado.className = 'resultado empty';
    resultado.innerHTML = 'Introduce un IBAN para empezar...';
    return;
  }

  console.log('Validando IBAN:', iban);

  // Validar formato
  if (!validarFormato(iban)) {
    resultado.className = 'resultado';
    resultado.innerHTML = `
      <div class="iban-error">
        <h3>❌ Formato inválido</h3>
        <p>El IBAN no tiene el formato correcto.</p>
        <p><strong>Formato esperado:</strong> ES## #### #### ## ########## (con o sin espacios/guiones)</p>
      </div>
    `;
    return;
  }

  // Extraer información
  const info = extraerInformacion(iban);
  if (!info) {
    resultado.className = 'resultado';
    resultado.innerHTML = `
      <div class="iban-error">
        <h3>❌ Error al procesar</h3>
        <p>No se pudo extraer la información del IBAN.</p>
      </div>
    `;
    return;
  }

  // Mostrar resultado exitoso
  resultado.className = 'resultado';
  resultado.innerHTML = `
    <div class="iban-info">
      <h3>✅ IBAN válido (formato correcto)</h3>
      <div class="iban-details">
        <div class="iban-detail">
          <h4>País:</h4>
          <p>${info.paisCodigo} (España)</p>
        </div>
        <div class="iban-detail">
          <h4>Dígito de Control:</h4>
          <p>${info.digitoControl}</p>
        </div>
        <div class="iban-detail">
          <h4>Código de Banco:</h4>
          <p>${info.codigoBanco}</p>
        </div>
        <div class="iban-detail">
          <h4>Nombre del Banco:</h4>
          <p>${info.nombreBanco}</p>
        </div>
        <div class="iban-detail">
          <h4>Código de Sucursal:</h4>
          <p>${info.codigoSucursal}</p>
        </div>
        <div class="iban-detail">
          <h4>Dígito Control Cuenta:</h4>
          <p>${info.digitoControlCuenta}</p>
        </div>
        <div class="iban-detail">
          <h4>Número de Cuenta:</h4>
          <p>${info.numeroCuenta}</p>
        </div>
      </div>
    </div>
  `;

  console.log('Información extraída:', info);
}

// Eventos
document.addEventListener('DOMContentLoaded', function() {
  const botonValidar = document.getElementById('validar-iban-btn');
  const inputIban = document.getElementById('iban-input');
  
  // Evento click del botón
  botonValidar.addEventListener('click', validarIban);
  
  // Evento Enter en el input
  inputIban.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      validarIban();
    }
  });

  console.log('✅ Ejercicio A - Validador IBAN inicializado');
});
