# Módulo 13.2 - Banca Online Extendida

Sistema de banca online extendido desarrollado con React y TypeScript.
Esta versión incluye funcionalidades adicionales basadas en el Módulo 13.

## Instalación

```bash
npm install
cd server && npm install
```

## Ejecución

**Servidor:**
```bash
cd server
npm start
```

**Cliente:**
```bash
npm run dev:client
```

Acceder a: http://localhost:8082

**Nota**: Si el puerto 8082 está ocupado, Vite automáticamente asignará el siguiente puerto disponible (ej: 8083, 8084, etc.)

## Credenciales

- Usuario: admin@email.com
- Contraseña: test

## Funcionalidades

- Login de usuario
- Listado de cuentas bancarias
- Agregar nueva cuenta
- Listado de movimientos de cuenta
- Navegación entre secciones
- Diseño responsive

## Puertos de Desarrollo

- **Cliente React**: Puerto 8082 (auto-asignado si está ocupado)
- **Servidor JSON**: Puerto 3005
- **Nota**: Configurado para evitar conflictos con Módulo 13

## Tecnologías

- React 18
- TypeScript
- React Router
- Vite
- JSON Server
- Axios
