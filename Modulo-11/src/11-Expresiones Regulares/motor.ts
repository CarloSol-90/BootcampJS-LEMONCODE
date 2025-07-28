import { IbanInfo, IbanValidationResult, ImageInfo, BANCOS_ESPANOLES } from "./modelo";

// ============ APARTADO A: VALIDACIÓN DE IBAN ============

/**
 * Expresión regular para validar el formato de IBAN español
 * Acepta espacios, guiones o sin separadores
 */
const IBAN_REGEX = /^ES\s?(\d{2})\s?(\d{4})\s?(\d{4})\s?(\d{2})\s?(\d{10})$/i;

/**
 * Normaliza un IBAN eliminando espacios y guiones
 */
export const normalizarIban = (iban: string): string => {
  return iban.replace(/[\s-]/g, '').toUpperCase();
};

/**
 * Valida el formato de un IBAN español usando expresiones regulares
 */
export const validarFormatoIban = (iban: string): boolean => {
  const ibanNormalizado = normalizarIban(iban);
  return IBAN_REGEX.test(ibanNormalizado);
};

/**
 * Extrae la información de un IBAN español
 */
export const extraerInfoIban = (iban: string): IbanInfo | null => {
  const ibanNormalizado = normalizarIban(iban);
  const match = ibanNormalizado.match(IBAN_REGEX);
  
  if (!match) {
    return null;
  }

  const [, digitoControl, codigoBanco, codigoSucursal, digitoControlCuenta, numeroCuenta] = match;
  
  return {
    paisCodigo: "ES",
    digitoControl,
    codigoBanco,
    codigoSucursal,
    digitoControlCuenta,
    numeroCuenta,
    nombreBanco: BANCOS_ESPANOLES[codigoBanco] || "Banco no identificado"
  };
};

/**
 * Algoritmo mod 97 para validar IBAN
 * Implementación simplificada para demostración
 */
const validarDigitoControlIban = (iban: string): boolean => {
  // Implementación simplificada del algoritmo mod 97
  // En un caso real, usarías una librería como ibantools
  const ibanNormalizado = normalizarIban(iban);
  
  // Mover los primeros 4 caracteres al final
  const rearranged = ibanNormalizado.slice(4) + ibanNormalizado.slice(0, 4);
  
  // Reemplazar letras por números (A=10, B=11, ..., Z=35)
  let numericString = '';
  for (let char of rearranged) {
    if (/[A-Z]/.test(char)) {
      numericString += (char.charCodeAt(0) - 55).toString();
    } else {
      numericString += char;
    }
  }
  
  // Calcular mod 97 de manera segura para números grandes
  let remainder = 0;
  for (let i = 0; i < numericString.length; i++) {
    remainder = (remainder * 10 + parseInt(numericString[i])) % 97;
  }
  
  return remainder === 1;
};

/**
 * Función principal para validar un IBAN español
 */
export const validarIban = (iban: string): IbanValidationResult => {
  if (!iban || iban.trim() === '') {
    return {
      esValido: false,
      esFormato: false,
      mensaje: 'Por favor, introduce un IBAN'
    };
  }

  const esFormato = validarFormatoIban(iban);
  
  if (!esFormato) {
    return {
      esValido: false,
      esFormato: false,
      mensaje: 'El formato del IBAN no es válido. Debe ser: ES## #### #### ## ##########'
    };
  }

  const info = extraerInfoIban(iban);
  if (!info) {
    return {
      esValido: false,
      esFormato: true,
      mensaje: 'Error al extraer información del IBAN'
    };
  }

  const esValido = validarDigitoControlIban(iban);
  
  return {
    esValido,
    esFormato: true,
    mensaje: esValido ? '✅ IBAN válido' : '❌ IBAN con formato correcto pero dígito de control inválido',
    info
  };
};

// ============ APARTADO B: EXTRACCIÓN DE IMÁGENES ============

/**
 * Expresión regular para encontrar tags img y extraer el atributo src
 * Captura diferentes formatos de comillas y espacios
 */
const IMG_TAG_REGEX = /<img[^>]+src\s*=\s*["']([^"']+)["'][^>]*>/gi;

/**
 * Extrae el valor de un atributo específico de un tag HTML
 */
const extraerAtributo = (tagContent: string, attributeName: string): string | undefined => {
  const regex = new RegExp(`${attributeName}\\s*=\\s*["']([^"']+)["']`, 'i');
  const match = tagContent.match(regex);
  return match ? match[1] : undefined;
};

/**
 * Extrae todas las imágenes de un contenido HTML
 */
export const extraerImagenes = (html: string): ImageInfo[] => {
  const imagenes: ImageInfo[] = [];
  const matches = html.matchAll(IMG_TAG_REGEX);

  for (const match of matches) {
    const src = match[1];
    const fullTag = match[0];
    
    // Extraer atributos adicionales
    const alt = extraerAtributo(fullTag, 'alt');
    const title = extraerAtributo(fullTag, 'title');

    imagenes.push({
      src,
      alt,
      title
    });
  }

  return imagenes;
};

/**
 * Valida si una URL de imagen es válida (formato básico)
 */
export const esUrlImagenValida = (url: string): boolean => {
  try {
    // Verificar si es una URL válida o una ruta relativa
    if (url.startsWith('http') || url.startsWith('https')) {
      new URL(url);
    }
    
    // Verificar extensiones de imagen comunes
    const extensionesValidas = /\.(jpg|jpeg|png|gif|bmp|svg|webp)(\?.*)?$/i;
    return extensionesValidas.test(url) || url.includes('localhost') || url.startsWith('/');
  } catch {
    // Si no es una URL válida, podría ser una ruta relativa
    return url.length > 0 && !url.includes('<') && !url.includes('>');
  }
};

/**
 * Filtra y valida las imágenes extraídas
 */
export const filtrarImagenesValidas = (imagenes: ImageInfo[]): ImageInfo[] => {
  return imagenes.filter(imagen => esUrlImagenValida(imagen.src));
};