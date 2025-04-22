# 📝 Note App

Este proyecto es una aplicación web de lista de notas desarrollada con el stack MERN (MongoDB, Express.js, React y Node.js). La aplicación permite crear, visualizar, y gestionar notas, con funcionalidades orientadas a la prioridad e importancia de cada una.

## 🚀 Tecnologías y Herramientas Utilizadas

- **React**: Para el desarrollo del frontend. Se empleó `create-react-app` y posteriormente se generó la versión de producción utilizando el comando `npm run build`.
- **Express.js**: Framework de Node.js utilizado para construir la API RESTful que conecta el frontend con la base de datos.
- **MongoDB**: Base de datos NoSQL empleada para almacenar las notas.
- **Tailwind CSS**: Utilizado para los estilos del frontend, permitiendo una maquetación moderna, limpia y adaptable.
- **Node.js**: Entorno de ejecución para JavaScript en el backend.

## 🎯 Funcionalidades

- ✅ **Agregar nuevas notas**: El usuario puede registrar nuevas notas a través de un formulario.
- ⭐ **Gestión de importancia**: Al crear una nota, se asigna aleatoriamente si es "importante" o "no importante".
- 🔁 **Cambio de prioridad**: Es posible alternar entre los estados de importancia ("Important" / "Not Important") de cada nota.
- 👁️ **Filtro de visualización**: El usuario puede alternar entre ver **todas las notas** o **solo las importantes**.
- 🔄 **Persistencia de datos**: Todas las operaciones (crear, actualizar, listar) interactúan con una base de datos MongoDB mediante una API construida con Express.

## ⚙️ Deployment

1. Se desarrolló el frontend en React y se generó la versión de producción mediante:

   ```bash
   npm run build



