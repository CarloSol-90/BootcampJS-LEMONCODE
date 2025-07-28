







import { validarIban, extraerImagenes, filtrarImagenesValidas } from "./motor";
import { 
  inicializarNavegacion, 
  renderResultadoIban, 
  limpiarResultadoIban, 
  obtenerIbanInput,
  renderResultadoImagenes,
  limpiarResultadoImagenes,
  obtenerHtmlInput,
  establecerHtmlEjemplo
} from "./ui";

// ============ INICIALIZACIÓN ============

document.addEventListener('DOMContentLoaded', () => {
  inicializarApp();
});

const inicializarApp = (): void => {
  console.log('🚀 Iniciando Laboratorio de Expresiones Regulares');
  
  // Inicializar navegación
  inicializarNavegacion();
  
  // Inicializar apartado A (IBAN)
  inicializarValidadorIban();
  
  // Inicializar apartado B (Imágenes)
  inicializarExtractorImagenes();
  
  // Configurar estados iniciales
  limpiarResultadoIban();
  limpiarResultadoImagenes();
  
  console.log('✅ Aplicación inicializada correctamente');
};

// ============ APARTADO A: VALIDADOR DE IBAN ============

const inicializarValidadorIban = (): void => {
  const botonValidar = document.getElementById('validar-iban-btn');
  const inputIban = document.getElementById('iban-input');
  
  if (!botonValidar || !inputIban) {
    console.error('Elementos del validador IBAN no encontrados');
    return;
  }

  // Evento click en botón validar
  botonValidar.addEventListener('click', manejarValidacionIban);
  
  // Evento Enter en input
  inputIban.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      manejarValidacionIban();
    }
  });

  // Evento input para validación en tiempo real (opcional)
  inputIban.addEventListener('input', (event) => {
    const target = event.target as HTMLInputElement;
    if (target.value.trim() === '') {
      limpiarResultadoIban();
    }
  });
  
  console.log('✅ Validador IBAN inicializado');
};

const manejarValidacionIban = (): void => {
  const iban = obtenerIbanInput();
  
  if (!iban) {
    limpiarResultadoIban();
    return;
  }

  console.log(`🔍 Validando IBAN: ${iban}`);
  
  try {
    const resultado = validarIban(iban);
    renderResultadoIban(resultado);
    
    console.log(`📊 Resultado validación:`, resultado);
  } catch (error) {
    console.error('❌ Error al validar IBAN:', error);
    renderResultadoIban({
      esValido: false,
      esFormato: false,
      mensaje: 'Error interno al validar el IBAN'
    });
  }
};

// ============ APARTADO B: EXTRACTOR DE IMÁGENES ============

const inicializarExtractorImagenes = (): void => {
  const botonExtraer = document.getElementById('extraer-imagenes-btn');
  const textareaHtml = document.getElementById('html-textarea');
  
  if (!botonExtraer || !textareaHtml) {
    console.error('Elementos del extractor de imágenes no encontrados');
    return;
  }

  // Evento click en botón extraer
  botonExtraer.addEventListener('click', manejarExtraccionImagenes);
  
  // Establecer ejemplo por defecto al hacer doble click en textarea
  textareaHtml.addEventListener('dblclick', () => {
    if ((textareaHtml as HTMLTextAreaElement).value.trim() === '') {
      establecerHtmlEjemplo();
    }
  });

  // Evento input para limpiar resultado cuando se borra contenido
  textareaHtml.addEventListener('input', (event) => {
    const target = event.target as HTMLTextAreaElement;
    if (target.value.trim() === '') {
      limpiarResultadoImagenes();
    }
  });
  
  console.log('✅ Extractor de imágenes inicializado');
};

const manejarExtraccionImagenes = (): void => {
  const html = obtenerHtmlInput();
  
  if (!html) {
    limpiarResultadoImagenes();
    return;
  }

  console.log(`� Extrayendo imágenes del HTML (${html.length} caracteres)`);
  
  try {
    const imagenesEncontradas = extraerImagenes(html);
    const imagenesValidas = filtrarImagenesValidas(imagenesEncontradas);
    
    console.log(`📊 Imágenes encontradas: ${imagenesEncontradas.length}, válidas: ${imagenesValidas.length}`);
    console.log('🖼️ Imágenes extraídas:', imagenesValidas);
    
    renderResultadoImagenes(imagenesValidas);
  } catch (error) {
    console.error('❌ Error al extraer imágenes:', error);
    renderResultadoImagenes([]);
  }
};

// ============ UTILIDADES DE DESARROLLO ============

// Exponer funciones en el contexto global para testing en consola del navegador
if (typeof window !== 'undefined') {
  (window as any).laboratorioExpresionesRegulares = {
    validarIban,
    extraerImagenes,
    filtrarImagenesValidas,
    manejarValidacionIban,
    manejarExtraccionImagenes,
    establecerHtmlEjemplo
  };
  
  console.log('🔧 Funciones expuestas en window.laboratorioExpresionesRegulares para debugging');
}