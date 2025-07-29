// Interfaces
interface Reserva {
  tipoHabitacion: "standard" | "suite";
  pax: number;
  noches: number;
}

interface ReservaConDesayuno {
  tipoHabitacion: "standard" | "suite";
  desayuno: boolean;
  pax: number;
  noches: number;
}

interface PreciosHabitacion {
  standard: number;
  suite: number;
}

interface ResultadoCalculo {
  subtotal: number;
  total: number;
}

// Datos de ejemplo
const reservas: Reserva[] = [
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    pax: 2,
    noches: 1,
  },
];

const reservasConDesayuno: ReservaConDesayuno[] = [
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    desayuno: true,
    pax: 2,
    noches: 1,
  },
];

// Clase base con funcionalidad común
abstract class CalculadoraReservasBase {
  protected readonly IVA = 0.21;
  protected readonly CARGO_PERSONA_ADICIONAL = 40;
  protected readonly PRECIO_DESAYUNO = 15;
  protected precios: PreciosHabitacion;

  constructor(precios: PreciosHabitacion) {
    this.precios = precios;
  }

  protected calcularSubtotalHabitacion(reserva: Reserva): number {
    const precioBase = this.precios[reserva.tipoHabitacion];
    const precioConPersonasAdicionales = precioBase + (reserva.pax - 1) * this.CARGO_PERSONA_ADICIONAL;
    return precioConPersonasAdicionales * reserva.noches;
  }

  protected calcularSubtotalHabitacionConDesayuno(reserva: ReservaConDesayuno): number {
    const precioBase = this.precios[reserva.tipoHabitacion];
    const precioConPersonasAdicionales = precioBase + (reserva.pax - 1) * this.CARGO_PERSONA_ADICIONAL;
    const precioDesayuno = reserva.desayuno ? this.PRECIO_DESAYUNO * reserva.pax : 0;
    return (precioConPersonasAdicionales + precioDesayuno) * reserva.noches;
  }

  protected calcularTotal(subtotal: number): number {
    return subtotal * (1 + this.IVA);
  }

  abstract calcularReservas(reservas: Reserva[]): ResultadoCalculo;
  abstract calcularReservasConDesayuno(reservas: ReservaConDesayuno[]): ResultadoCalculo;
}

// Clase para cliente particular
class CalculadoraClienteParticular extends CalculadoraReservasBase {
  constructor() {
    const preciosParticular: PreciosHabitacion = {
      standard: 100,
      suite: 150
    };
    super(preciosParticular);
  }

  calcularReservas(reservas: Reserva[]): ResultadoCalculo {
    const subtotal = reservas.reduce((total, reserva) => {
      return total + this.calcularSubtotalHabitacion(reserva);
    }, 0);

    const total = this.calcularTotal(subtotal);

    return { subtotal, total };
  }

  calcularReservasConDesayuno(reservas: ReservaConDesayuno[]): ResultadoCalculo {
    const subtotal = reservas.reduce((total, reserva) => {
      return total + this.calcularSubtotalHabitacionConDesayuno(reserva);
    }, 0);

    const total = this.calcularTotal(subtotal);

    return { subtotal, total };
  }
}

// Clase para tour operador
class CalculadoraTourOperador extends CalculadoraReservasBase {
  private readonly DESCUENTO_TOUR_OPERADOR = 0.15;

  constructor() {
    const preciosTourOperador: PreciosHabitacion = {
      standard: 100,
      suite: 100 // Mismo precio para ambos tipos
    };
    super(preciosTourOperador);
  }

  calcularReservas(reservas: Reserva[]): ResultadoCalculo {
    const subtotalSinDescuento = reservas.reduce((total, reserva) => {
      return total + this.calcularSubtotalHabitacion(reserva);
    }, 0);

    const subtotal = subtotalSinDescuento * (1 - this.DESCUENTO_TOUR_OPERADOR);
    const total = this.calcularTotal(subtotal);

    return { subtotal, total };
  }

  calcularReservasConDesayuno(reservas: ReservaConDesayuno[]): ResultadoCalculo {
    const subtotalSinDescuento = reservas.reduce((total, reserva) => {
      return total + this.calcularSubtotalHabitacionConDesayuno(reserva);
    }, 0);

    const subtotal = subtotalSinDescuento * (1 - this.DESCUENTO_TOUR_OPERADOR);
    const total = this.calcularTotal(subtotal);

    return { subtotal, total };
  }
}

// Funciones para mostrar resultados en el DOM
const mostrarReservas = (reservas: Reserva[], elementId: string): void => {
  const elemento = document.getElementById(elementId);
  if (elemento) {
    elemento.innerHTML = '';
    reservas.forEach((reserva, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>Reserva ${index + 1}:</strong> 
        ${reserva.tipoHabitacion} - ${reserva.pax} persona(s) - ${reserva.noches} noche(s)
      `;
      elemento.appendChild(li);
    });
  }
};

const mostrarReservasConDesayuno = (reservas: ReservaConDesayuno[], elementId: string): void => {
  const elemento = document.getElementById(elementId);
  if (elemento) {
    elemento.innerHTML = '';
    reservas.forEach((reserva, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>Reserva ${index + 1}:</strong> 
        ${reserva.tipoHabitacion} - ${reserva.pax} persona(s) - ${reserva.noches} noche(s) - 
        Desayuno: ${reserva.desayuno ? 'Sí' : 'No'}
      `;
      elemento.appendChild(li);
    });
  }
};

const mostrarResultado = (resultado: ResultadoCalculo, subtotalId: string, totalId: string): void => {
  const subtotalElement = document.getElementById(subtotalId);
  const totalElement = document.getElementById(totalId);
  
  if (subtotalElement) {
    subtotalElement.textContent = `Subtotal (sin IVA): ${resultado.subtotal.toFixed(2)} €`;
    subtotalElement.className = 'resultado subtotal';
  }
  
  if (totalElement) {
    totalElement.textContent = `Total (con IVA 21%): ${resultado.total.toFixed(2)} €`;
    totalElement.className = 'resultado total';
  }
};

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Mostrar las reservas básicas
  mostrarReservas(reservas, 'reservas-lista');
  
  // Mostrar las reservas con desayuno
  mostrarReservasConDesayuno(reservasConDesayuno, 'reservas-desayuno-lista');

  // Calcular y mostrar resultados para cliente particular
  const calculadoraParticular = new CalculadoraClienteParticular();
  const resultadoParticular = calculadoraParticular.calcularReservas(reservas);
  mostrarResultado(resultadoParticular, 'particular-subtotal', 'particular-total');

  // Calcular y mostrar resultados para tour operador
  const calculadoraTourOperador = new CalculadoraTourOperador();
  const resultadoTourOperador = calculadoraTourOperador.calcularReservas(reservas);
  mostrarResultado(resultadoTourOperador, 'touroperador-subtotal', 'touroperador-total');

  // Calcular y mostrar resultados con desayuno para cliente particular
  const resultadoParticularDesayuno = calculadoraParticular.calcularReservasConDesayuno(reservasConDesayuno);
  mostrarResultado(resultadoParticularDesayuno, 'particular-desayuno-subtotal', 'particular-desayuno-total');

  // Calcular y mostrar resultados con desayuno para tour operador
  const resultadoTourOperadorDesayuno = calculadoraTourOperador.calcularReservasConDesayuno(reservasConDesayuno);
  mostrarResultado(resultadoTourOperadorDesayuno, 'touroperador-desayuno-subtotal', 'touroperador-desayuno-total');

  // Mostrar en consola para verificar los cálculos
  console.log('=== RESULTADOS DE CÁLCULOS ===');
  console.log('Cliente Particular (sin desayuno):', resultadoParticular);
  console.log('Tour Operador (sin desayuno):', resultadoTourOperador);
  console.log('Cliente Particular (con desayuno):', resultadoParticularDesayuno);
  console.log('Tour Operador (con desayuno):', resultadoTourOperadorDesayuno);
});
