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

//✅ APARTADO 1 - Queremos extraer la lista de paciente que están asignados a la especialidad de Pediatría

const obtenPacientesAsignadosAPediatria = (
  pacientes: Pacientes[] //Tipo de dato que espera un array de tipo Pacientes
): Pacientes[] => {
  //Usamos el metodo filter para crear un nuevo array con los pacientes que cumplen la condición
  return pacientes.filter(
    (pacientes: Pacientes) => pacientes.especialidad === "Pediatra"
    //La condición es que la propiedad "especialidad" del paciente sea igual a "pediatra"
  );
};
console.log(obtenPacientesAsignadosAPediatria(pacientes));

//✅ APARTADO 1 - Queremos extraer la lista de pacientes asignados a Pediatría y que tengan una edad menor de 10 años.

const obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios = (
  pacientes: Pacientes[]
): Pacientes[] => {
  return pacientes.filter(
    (pacientes: Pacientes) =>
      pacientes.especialidad === "Pediatra" && pacientes.edad < 10
    // La condición es que la propiedad 'especialidad' sea "Pediatra" y además la propiedad 'edad' sea menor que 10 años
  );
};
console.log(obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios(pacientes));

//✅ APARTADO 2 - Queremos activar el protocolo de urgencia si cualquier de los pacientes tiene un ritmo cardíaco superior a 100 pulsaciones por minuto y una temperatura corporal superior a 39 grados.

const activarProtocoloUrgencia = (pacientes: Pacientes[]): boolean => {
  //Usamos el metodo some para compribar si al menos un paciente cumple la condición
  let activarProctolo = pacientes.some(
    (pacientes: Pacientes) =>
      pacientes.frecuenciaCardiaca > 100 && pacientes.temperatura > 39
    // La condición es que la propiedad 'frecuenciaCardiaca' sea mayor que 100 y 'temperatura' sea mayor que 39
  );
  return activarProctolo;
  //Devolvemos el resultado true o false dependiendo de si cumple la función
};
console.log(activarProtocoloUrgencia(pacientes));

//✅ APARTADO 3 - El pediatra no puede atender hoy a los pacientes, queremos reasignar los pacientes asignados a la especialidad de pediatría a la de medico de familia.

const reasignaPacientesAMedicoFamilia = (
  pacientes: Pacientes[]
): Pacientes[] => {
  // Usamos el método map para crear un nuevo array transformando cada elemento
  const pacientesTransformados: Pacientes[] = pacientes.map(
    (pacientes: Pacientes) => {
      if (pacientes.especialidad === "Pediatra") {
        // Si la especialidad del paciente es "Pediatra", la cambiamos a "Medico de familia"
        return { ...pacientes, especialidad: "Medico de familia" };
      }
      return pacientes; // Si no es "Pediatra", devolvemos el paciente sin cambios
    }
  );
  return pacientesTransformados; // Devolvemos el array transformado
};
//Imprimimos por consola el resultado de la funcón, pasandole como argumento el array de paciente
console.log(reasignaPacientesAMedicoFamilia(pacientes));

//✅ APARTADO 4 - Queremos saber si podemos mandar al Pediatra a casa (si no tiene pacientes asignados), comprobar si en la lista hay algún paciente asignado a pediatría

const HayPacientesDePediatria = (pacientes: Pacientes[]): boolean => {
  return pacientes.some((paciente) => paciente.especialidad === "Pediatra");
  // Usamos el método some para verificar si existe al menos un paciente cuya especialidad sea "Pediatra"
};
console.log(HayPacientesDePediatria(pacientes));
