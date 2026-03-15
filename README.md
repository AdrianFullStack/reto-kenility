# 🚀 E-Commerce API - NestJS & MongoDB

## Description

Este proyecto es una API profesional para la gestión de productos y órdenes, construida con NestJS, MongoDB y una arquitectura basada en el Patrón Repositorio.

## 🛠️ Tecnologías y Arquitectura
- Framework: NestJS (Node.js) con TypeScript.

- Base de Datos: MongoDB con Mongoose (Consultas de agregación avanzadas).

- Patrón de Diseño: Repositorio (Repository Pattern) para desacoplamiento de datos.

- Seguridad: Autenticación JWT y Hashing de contraseñas con Bcrypt.

- Validación: Class-validator (DTOs) y Pipes de validación de archivos.

- Infraestructura: Docker y Docker Compose.

## 📂 Estructura del Proyecto
- src/auth: Registro, Login, JWT Strategy y Repository.

- src/products: Gestión de productos, filtros y carga de imágenes.

- src/orders: Pedidos, cálculos automáticos y agregaciones.

- src/common: Validadores personalizados para archivos y utilidades.

- src/database: Conexión global y configuración de Mongoose.

- src/main.ts: Punto de entrada y configuración de Pipes globales.

## 🚀 Instalación y Ejecución

### 1. Requisitos previos
- Docker y Docker Compose instalados.

### 2. Configuración
- Crea un archivo <code>.env</code> en la raíz del proyecto con los siguientes valores:
```bash
APP_PORT=3000

MONGO_PORT=27017
MONGO_URI=mongodb://localhost:27017/challenge_db

JWT_SECRET=Clave_Super_Secreta_2026
```

### 3. Despliegue con Docker
Ejecuta el siguiente comando para levantar la infraestructura completa:

```bash
$ docker-compose up -d --build
```
La API estará disponible en http://localhost:3000.

<hr/>

## 📡 Documentación de Endpoints
### 🔐 Autenticación (/auth)
- POST /auth/signup: Registro de nuevo usuario.

- POST /auth/signin: Login de usuario.

### 📦 Productos (/products)
- POST /products: Crear un producto. Requiere Auth JWT y envío de imagen vía multipart/form-data.

- GET /products: Lista de productos con soporte para paginación y filtros por name o sku.

- GET /products/:id: Detalle técnico de un producto específico.

### 🛒 Órdenes (/orders)
- POST /orders: Crear una orden. Valida el total automáticamente consultando los precios actuales de los productos. Requiere Auth JWT.

- PUT /orders/:id: Actualiza una orden. Valida el total automáticamente consultando los precios actuales de los productos. Requiere Auth JWT.

- GET /orders/stats/total-last-month: Reporte de sumatoria total de ventas de los últimos 30 días.

- GET /orders/stats/highest: Obtiene la orden con el monto de venta más elevado.

<hr/>

## 🛡️ Reglas de Negocio e Integridad
### Validación de Archivos
Se ha implementado un validador personalizado (CustomFileTypeValidator) que asegura:

- Obligatoriedad: No se puede crear un producto sin imagen.

- Formatos permitidos: Únicamente jpg, jpeg y png.

- Tamaño máximo: 5MB por archivo.

### Patrón Repositorio
Toda la interacción con la base de datos está centralizada en clases Repository. Esto permite:

1. Facilidad para realizar Testing Unitario mediante Mocks.

2. Independencia de la lógica de negocio respecto a la librería Mongoose.

3. Consultas de agregación optimizadas para reportes de ventas.

