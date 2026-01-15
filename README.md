# 🚀 Task / Habit Tracker

> Un sistema de gestión de tareas Full Stack "Production-Ready" construido con **FastAPI** y **React**.

![Status](https://img.shields.io/badge/Status-Completed-success)
![Python](https://img.shields.io/badge/Python-3.10+-blue)
![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.0-cyan)

## 📋 Descripción

Este proyecto demuestra una arquitectura moderna y escalable para aplicaciones web. Combina el rendimiento de **FastAPI** en el backend con la interactividad de **React (Vite)** en el frontend, estilizado con **TailwindCSS**.

El objetivo no es solo hacer una "To-Do List", sino implementar flujos reales de autenticación, manejo de estados, seguridad y buenas prácticas de desarrollo.

### 🌟 Features Principales

- **🔐 Autenticación Robusta**: Implementación de **JWT (JSON Web Tokens)** con hashing de contraseñas de última generación usando **Argon2**.
- **⚡ Backend Asíncrono**: API RESTful construida sobre FastAPI para máximo rendimiento.
- **🎨 UI Moderna**: Interfaz "Glassmorphism" responsiva usando **TailwindCSS**.
- **🛡️ Type Safety**: Frontend desarrollado con **TypeScript** para reducir errores en tiempo de ejecución.
- **💾 Persistencia**: Base de datos SQLite (fácilmente migrable a PostgreSQL) gestionada con **SQLAlchemy ORM**.
- **📱 Estado Global**: Gestión de sesión de usuario mediante **React Context API**.

---

## 🛠️ Tech Stack

### Backend

- **Framework**: FastAPI
- **ORM**: SQLAlchemy
- **Validación**: Pydantic v2
- **Seguridad**: Python-Jose (JWT), Argon2-cffi (Hashing)

### Frontend

- **Framework**: React (Vite)
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS
- **HTTP Client**: Axios (con interceptores)
- **Forms**: React Hook Form

---

## 🚀 Instalación y Despliegue

Sigue estos pasos para correr el proyecto localmente.

### 1. Clonar el repositorio

```bash
git clone <tu-repo-url>
cd task-habit-tracker
```

### 2. Configurar el Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno (Windows)
.\venv\Scripts\Activate

# Activar entorno (Mac/Linux)
# source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Iniciar servidor
uvicorn app.main:app --reload
```

_El backend correrá en: `http://localhost:8000`_
_Documentación interactiva (Swagger): `http://localhost:8000/docs`_

### 3. Configurar el Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

_El frontend correrá en: `http://localhost:5173` (o `5174` si el puerto está ocupado)_

---

## 📂 Estructura del Proyecto

```
task-habit-tracker/
├── backend/            # API Python
│   ├── app/
│   │   ├── routers/    # Endpoints modulares
│   │   ├── models.py   # Modelos BD
│   │   └── schemas.py  # Validaciones
│   └── requirements.txt
│
└── frontend/           # App React
    ├── src/
    │   ├── context/    # AuthContext (Estado Global)
    │   ├── pages/      # Vistas (Dashboard, Login)
    │   └── services/   # Configuración Axios
    └── tailwind.config.js
```

---

## 🔒 Variables de Entorno y Seguridad

Para un entorno de producción, asegúrate de:

1. Cambiar la `SECRET_KEY` en `backend/app/auth.py`.
2. Configurar `CORS` en `backend/app/main.py` para aceptar solo tu dominio de frontend.
3. Usar una base de datos más robusta como **PostgreSQL**.

---

Hecho con ❤️ por [Tu Nombre] para demostrar habilidades Full Stack.
