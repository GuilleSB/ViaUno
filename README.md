# ViaUno

**ViaUno** es una aplicación web full stack para gestionar tareas y hábitos de forma organizada y minimalista. Fue desarrollada como parte de mi portafolio profesional para practicar y demostrar conocimientos en desarrollo moderno, backend, frontend, DevOps y despliegue en la nube.

## 🚀 Funcionalidades principales

- Registro e inicio de sesión con autenticación JWT
- CRUD de tareas y hábitos personales
- Visualización de progreso con gráficas
- Diseño responsivo y limpio
- Backend y base de datos Dockerizados
- CI/CD automatizado con GitHub Actions

## 🛠️ Tecnologías utilizadas

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- Chart.js

### Backend
- Node.js
- Express
- PostgreSQL
- JWT para autenticación
- Prisma o Sequelize (ORM)

### DevOps / Infraestructura
- Docker
- GitHub Actions (CI/CD)
- Vercel (Frontend)
- Render o Railway (Backend)
- ElephantSQL o MongoDB Atlas (Base de datos)

## 📦 Instalación local

Cloná el repositorio:

```bash
git clone https://github.com/tu_usuario/viauno.git
cd viauno
```

Instalá dependencias (frontend y backend):

```bash
cd frontend
npm install

cd ../backend
npm install
```

Iniciá con Docker (requiere tenerlo instalado):

```bash
docker-compose up --build
```

Accedé a la app en `http://localhost:3000`

## 📄 Licencia

Este proyecto está licenciado bajo la licencia MIT.
