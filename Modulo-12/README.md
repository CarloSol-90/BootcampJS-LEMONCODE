# Laboratorio Módulo 12 - Clases

## Descripción

Este proyecto implementa un sistema de reservas de hotel utilizando clases en TypeScript. El sistema calcula subtotales y totales tanto para clientes particulares como para tour operadores, con diferentes tarifas y condiciones.

## Características Implementadas

### Caso 1: Cliente Particular
- **Habitación Standard**: 100 € por noche
- **Habitación Suite**: 150 € por noche
- **Cargo por persona adicional**: 40 € por noche
- **IVA**: 21% sobre el subtotal

### Caso 2: Tour Operador
- **Precio único**: 100 € por noche (tanto standard como suite)
- **Descuento**: 15% sobre servicios contratados
- **IVA**: 21% sobre el subtotal con descuento

### Ejercicio Adicional: Desayuno
- **Cargo adicional**: 15 € por persona y noche (cuando está incluido)
- Aplicable tanto para clientes particulares como tour operadores

## Arquitectura del Código

### Clase Base: `CalculadoraReservasBase`
- Contiene la funcionalidad común para ambos tipos de cliente
- Define métodos abstractos que deben implementar las clases hijas
- Maneja constantes como IVA, cargos adicionales y precios de desayuno

### Clases Derivadas:
1. **`CalculadoraClienteParticular`**: Implementa la lógica para clientes particulares
2. **`CalculadoraTourOperador`**: Implementa la lógica para tour operadores con descuentos especiales

## Estructura del Proyecto

```
Modulo-12/
├── src/
│   ├── main.ts          # Código principal con las clases y lógica
│   ├── style.css        # Estilos de la aplicación
│   ├── dummy.spec.ts    # Test dummy
│   └── vite-env.d.ts    # Definiciones de tipos de Vite
├── index.html           # Página principal
├── package.json         # Dependencias y scripts
├── tsconfig.json        # Configuración de TypeScript
├── vite.config.ts       # Configuración de Vite
└── LICENSE              # Licencia MIT
```

## Instalación y Uso

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar en modo desarrollo:
```bash
npm run dev
```

3. Construir para producción:
```bash
npm run build
```

4. Ejecutar tests:
```bash
npm run test
```

## Datos de Ejemplo

El proyecto incluye dos conjuntos de datos de prueba:

### Reservas básicas:
```typescript
const reservas = [
  { tipoHabitacion: "standard", pax: 1, noches: 3 },
  { tipoHabitacion: "standard", pax: 1, noches: 4 },
  { tipoHabitacion: "suite", pax: 2, noches: 1 },
];
```

### Reservas con desayuno:
```typescript
const reservasConDesayuno = [
  { tipoHabitacion: "standard", desayuno: false, pax: 1, noches: 3 },
  { tipoHabitacion: "standard", desayuno: false, pax: 1, noches: 4 },
  { tipoHabitacion: "suite", desayuno: true, pax: 2, noches: 1 },
];
```

## Resultados Calculados

La aplicación muestra en pantalla y en consola los cálculos para:
- Cliente particular (sin desayuno)
- Tour operador (sin desayuno)  
- Cliente particular (con desayuno)
- Tour operador (con desayuno)

Cada cálculo incluye subtotal (sin IVA) y total (con IVA del 21%).
