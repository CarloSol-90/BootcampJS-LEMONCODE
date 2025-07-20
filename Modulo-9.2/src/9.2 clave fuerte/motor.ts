
import { ValidacionClave } from "./modelo";

export const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
  const tieneMayusculas = /[A-Z]/.test(clave);
  const tieneMinusculas = /[a-z]/.test(clave);
  
  return {
    esValida: tieneMayusculas && tieneMinusculas,
    error: tieneMayusculas && tieneMinusculas ? undefined : "La clave debe contener mayúsculas y minúsculas"
  };
};

export const tieneNumeros = (clave: string): ValidacionClave => {
  const tieneNumero = /[0-9]/.test(clave);
  
  return {
    esValida: tieneNumero,
    error: tieneNumero ? undefined : "La clave debe contener al menos un número"
  };
};

export const tieneCaracteresEspeciales = (clave: string): ValidacionClave => {
  const tieneEspeciales = /[!@#$%^&*(),.?":{}|<>]/.test(clave);
  
  return {
    esValida: tieneEspeciales,
    error: tieneEspeciales ? undefined : "La clave debe contener al menos un carácter especial"
  };
};

export const tieneLongitudMinima = (clave: string): ValidacionClave => {
  const longitudMinima = clave.length >= 8;
  
  return {
    esValida: longitudMinima,
    error: longitudMinima ? undefined : "La clave debe tener al menos 8 caracteres"
  };
};

export const tieneNombreUsuario = (
  nombreUsuario: string,
  clave: string
): ValidacionClave => {
  const contieneName = clave.toLowerCase().includes(nombreUsuario.toLowerCase());
  
  return {
    esValida: !contieneName,
    error: contieneName ? "La clave no debe contener el nombre de usuario" : undefined
  };
};

export const tienePalabrasComunes = (
  clave: string,
  commonPasswords: string[]
): ValidacionClave => {
  const esPasswordComun = commonPasswords.some(password => 
    clave.toLowerCase().includes(password.toLowerCase())
  );
  
  return {
    esValida: !esPasswordComun,
    error: esPasswordComun ? "La clave contiene palabras comunes" : undefined
  };
};

export const validarClave = (
  nombreUsuario: string,
  clave: string,
  commonPasswords: string[]
): ValidacionClave => {
  // Validar todas las reglas
  const validaciones = [
    tieneMayusculasYMinusculas(clave),
    tieneNumeros(clave),
    tieneCaracteresEspeciales(clave),
    tieneLongitudMinima(clave),
    tieneNombreUsuario(nombreUsuario, clave),
    tienePalabrasComunes(clave, commonPasswords)
  ];

  // Buscar el primer error
  const primeraValidacionFallida = validaciones.find(validacion => !validacion.esValida);
  
  if (primeraValidacionFallida) {
    return {
      esValida: false,
      error: primeraValidacionFallida.error
    };
  }

  return {
    esValida: true
  };
};