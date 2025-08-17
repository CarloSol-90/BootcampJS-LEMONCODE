#!/bin/bash
echo "Iniciando servidor JSON Server..."
cd server
npm start &
SERVER_PID=$!

echo "Esperando a que el servidor esté listo..."
sleep 3

echo "Iniciando cliente React..."
cd ..
npm run dev:client &
CLIENT_PID=$!

echo "Servidor ejecutándose en http://localhost:3000"
echo "Cliente ejecutándose en http://localhost:8080"
echo "Presiona Ctrl+C para detener ambos servicios"

# Función para limpiar procesos al salir
cleanup() {
    echo "Deteniendo servicios..."
    kill $SERVER_PID 2>/dev/null
    kill $CLIENT_PID 2>/dev/null
    exit
}

trap cleanup INT

# Mantener el script corriendo
wait
