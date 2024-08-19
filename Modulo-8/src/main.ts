type Especialidad = "Medico de familia" | "Pediatra" | "Cardiólogo";

interface Pacientes {
  id: number;
  nombre: string;
  apellidos: string;
  sexo: string;
  temperatura: number;
  frecuenciaCardiaca: number;
  especialidad: Especialidad;
  edad: number;
}

const pacientes: Pacientes[] = [
  {
    id: 1,
    nombre: "John",
    apellidos: "Doe",
    sexo: "Male",
    temperatura: 36.8,
    frecuenciaCardiaca: 80,
    especialidad: "Medico de familia",
    edad: 44,
  },
  {
    id: 2,
    nombre: "Jane",
    apellidos: "Doe",
    sexo: "Female",
    temperatura: 36.8,
    frecuenciaCardiaca: 70,
    especialidad: "Medico de familia",
    edad: 43,
  },
  {
    id: 3,
    nombre: "Junior",
    apellidos: "Doe",
    sexo: "Male",
    temperatura: 36.8,
    frecuenciaCardiaca: 90,
    especialidad: "Pediatra",
    edad: 8,
  },
  {
    id: 4,
    nombre: "Mary",
    apellidos: "Wien",
    sexo: "Female",
    temperatura: 36.8,
    frecuenciaCardiaca: 120,
    especialidad: "Medico de familia",
    edad: 20,
  },
  {
    id: 5,
    nombre: "Scarlett",
    apellidos: "Somez",
    sexo: "Female",
    temperatura: 36.8,
    frecuenciaCardiaca: 110,
    especialidad: "Cardiólogo",
    edad: 30,
  },
  {
    id: 6,
    nombre: "Brian",
    apellidos: "Kid",
    sexo: "Male",
    temperatura: 39.8,
    frecuenciaCardiaca: 80,
    especialidad: "Pediatra",
    edad: 11,
  },
];

//!✔️ APARTADO A - Queremos extraer la lista de paciente que están asignados a la especialidad de Pediatría

const obtenPacientesAsignadosAPediatria = (
  pacientes: Pacientes[]
): Pacientes[] => {
  //Tu implementación aquí;
  const pacientesPediatria: Pacientes[] = []; // Array para almacenar los pacientes solicitados de pediatría

  for (let i = 0; i < pacientes.length; i++) {
    if (pacientes[i].especialidad === "Pediatra") {
      pacientesPediatria.push(pacientes[i]); // Añadir el paciente al array si cumple la condición
    }
  }

  return pacientesPediatria; //Devolvemos el array con los pacientes solicitados
};

//Llamamos a la función y visualizamos el resultado
const pacientesPediatria = obtenPacientesAsignadosAPediatria(pacientes);
console.log(pacientesPediatria);

//!✔️ APARTADO B - Queremos extraer la lista de pacientes asignados a Pediatría y que tengan una edad menor de 10 años.

const obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios = (
  pacientes: Pacientes[]
): Pacientes[] => {
  // Tu implementación aquí :)
  const pacientesPediatriaMenor: Pacientes[] = [];

  for (let i = 0; i < pacientes.length; i++) {
    if (pacientes[i].especialidad === "Pediatra" && pacientes[i].edad < 10) {
      pacientesPediatriaMenor.push(pacientes[i]);
    }
  }

  return pacientesPediatriaMenor;
};

const filtrarMenorPediatria =
  obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios(pacientes);
console.log(filtrarMenorPediatria);

//!✔️APARTADO 2 - Queremos activar el protocolo de urgencia si cualquier de los pacientes tiene un ritmo cardíaco superior a 100 pulsaciones por minuto y una temperatura corporal superior a 39 grados.

const activarProtocoloUrgencia = (pacientes: Pacientes[]): boolean => {
  let activarProctolo = false;

  for (let i = 0; i < pacientes.length; i++) {
    if (
      pacientes[i].frecuenciaCardiaca > 100 &&
      pacientes[i].temperatura > 39
    ) {
      activarProctolo = true;
      break; // Salimos del bucle una vez que revisa todos los pacientes
    } else {
      console.log("Pacientes con protocolo de urgencia: ", activarProctolo);
    }
  }

  return activarProctolo;
};

//Llamada a la funcion
const protocoloActivado = activarProtocoloUrgencia(pacientes);

//!✔️ APARTADO 3 - El pediatra no puede atender hoy a los pacientes, queremos reasignar los pacientes asignados a la especialidad de pediatría a la de medico de familia.

const reasignaPacientesAMedicoFamilia = (pacientes: Pacientes[]): void => {
  // Tu implementación aquí :)
  for (let i = 0; i < pacientes.length; i++) {
    if (pacientes[i].especialidad === "Pediatra") {
      pacientes[i].especialidad = "Medico de familia"; //Reasignar la especialidad
    }
  }
};

//llamamos a la funcion para reasignar a los pacientes
reasignaPacientesAMedicoFamilia(pacientes);

//Mostramos por consola para verificar la reasignación
console.log(pacientes);

//!✔️ APARTADO 4 - Queremos saber si podemos mandar al Pediatra a casa (si no tiene pacientes asignados), comprobar si en la lista hay algún paciente asignado a pediatría

const HayPacientesDePediatria = (pacientes: Pacientes[]): boolean => {
  // Tu implementación aquí :)
  for (let i = 0; i < pacientes.length; i++) {
    if (pacientes[i].especialidad === "Pediatra") {
      return false; // Si hay un paciente asignado a Pediatría, no puede irse
    }
  }
  return true; // Si no se encuentra ningún paciente asignado a Pediatría, puede irse
};

//Llamamos a la funcion y mostramos el resultado por consola para su comprobación.
const puedeIrseACasa = HayPacientesDePediatria(pacientes);
console.log(puedeIrseACasa);
