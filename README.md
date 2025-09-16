# 🚀 Proyecto 6 - API Backend con Autenticación JWT

✨ API RESTful construida con **Node.js, Express y MongoDB**.  
Incluye autenticación con **JWT**, gestión de usuarios y CRUD de productos.  
Toda la API está documentada con **Swagger** para facilitar las pruebas.  

---

## 📑 Tabla de Contenidos
1. 📌 [Características principales](#-características-principales)  
2. 🛠️ [Tecnologías usadas](#️-tecnologías-usadas)  
3. ⚙️ [Instalación y uso](#️-instalación-y-uso)  
4. 🔑 [Endpoints principales](#-endpoints-principales)  
5. 📖 [Documentación Swagger](#-documentación-swagger)  
6. 🙌 [Créditos](#-créditos)  

---

## 📌 Características principales
✔️ Registro y login de usuarios con **hash de contraseñas (bcryptjs)**  
✔️ Generación y validación de **tokens JWT**  
✔️ Rutas protegidas con middleware de autenticación  
✔️ CRUD completo de productos vinculados a usuarios  
✔️ Persistencia en base de datos **MongoDB**  
✔️ Documentación interactiva con **Swagger**  

---

## 🛠️ Tecnologías usadas
- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/)  
- [MongoDB + Mongoose](https://mongoosejs.com/)  
- [JWT (jsonwebtoken)](https://jwt.io/)  
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)  
- [dotenv](https://www.npmjs.com/package/dotenv)  
- [CORS](https://expressjs.com/en/resources/middleware/cors.html)  
- [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express)  

---

## ⚙️ Instalación y uso

### 🔹 1. Clonar el repositorio
```bash
git clone https://github.com/NicoleMorenoG/Proyecto6.git
cd Proyecto6
```

---

### 🔹 Punto 2 - Instalar dependencias
```
npm install
```

---

### 🔹 Punto 3 - Variables de entorno
Crea un archivo **.env** en la raíz con:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.xxxxxx.mongodb.net/Proyecto6
JWT_SECRET=tu_clave_secreta (pone clave)
```

---

### 🔹 Punto 4 - Ejecutar en modo desarrollo
```
npm run dev
```
El servidor quedará corriendo en 👉 http://localhost:5000

---

## 🚀 Endpoints principales

### 👤 User

- **POST** `/api/user/register` → Registrar usuario  
- **POST** `/api/user/login` → Iniciar sesión y obtener token  
- **GET** `/api/user/verifytoken` → Verificar token JWT  
- **PUT** `/api/user/update` → Actualizar perfil del usuario autenticado  

### 📦 Product

- **POST** `/api/product/create` → Crear un nuevo producto (requiere login)  
- **GET** `/api/product/readall` → Listar todos los productos  
- **GET** `/api/product/readone/{id}` → Obtener producto por ID  
- **PUT** `/api/product/update/{id}` → Actualizar producto (solo dueño)  
- **DELETE** `/api/product/delete/{id}` → Eliminar producto (solo dueño)  

---

## 📖 Documentación con Swagger

Una vez corriendo el servidor, entra a:  

👉 [http://localhost:5000/api/docs](http://localhost:5000/api/docs)  

Ahí podrás probar todos los endpoints de forma interactiva.  

---

## 📌 Notas importantes

✅ Este proyecto incluye **persistencia en MongoDB**, por lo que los datos no se pierden al reiniciar el servidor.  
✅ Para probar endpoints protegidos, primero haz login y usa el token en el botón **Authorize** de Swagger.  
✅ Incluye `timestamps` en los modelos para ver fecha de creación y actualización.  

---

## ✨ Autor

Nicole Moreno. @NicoleMorenoG

---
