# 🍺 Ace of Beer - E-commerce de Cerveza Artesanal

> Cerveza artesanal con alma de rock. Cada estilo es una composición líquida, una mezcla precisa de carácter, sabor y actitud.

## 📦 Demo en Vivo
https://ace-of-beer.vercel.app

## 🚀 Tecnologías

- **React 18** + Vite
- **Firebase** (Authentication + Firestore)
- **React Router DOM**
- **Context API** (Carrito y Autenticación)
- **CSS puro** con diseño responsive

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- Cuenta de Firebase (gratuita)

## 🔧 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/arielg376/Proyecto_Final_Ace_of_Beer.git
cd Proyecto_Final_Ace_of_Beer

# Instalar dependencias
npm install

# Configurar Firebase
# 1. Crear proyecto en Firebase Console
# 2. Habilitar Authentication (Email/Password)
# 3. Crear Firestore en modo prueba
# 4. Copiar credenciales a src/firebase/config.js

# Iniciar servidor de desarrollo
npm run dev

🔐 Usuario de Prueba (Admin)
Email: admin@aceofbeer.com

Contraseña: admin123

📋 Funcionalidades
✅ Autenticación (Login/Registro) con Firebase

✅ CRUD de productos (Agregar/Editar/Eliminar)

✅ Carrito de compras con Context API

✅ Cupones de descuento: ROCK10, BEER20, ACE50

✅ Panel de administración protegido

✅ Diseño responsive con estilo rockero

✅ Modal de confirmación para eliminar

✅ Spinners y manejo de 

🗂️ Estructura del Proyecto

src/
├── components/
│   ├── admin/          # Panel de administración
│   ├── auth/           # Login/Register
│   ├── layout/         # Header/NavBar/Footer
│   ├── cart/           # Carrito de compras
│   └── itemListContainer/ # Catálogo
├── context/
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── firebase/
│   └── config.js
├── pages/
│   └── AdminPage.jsx
└── App.jsx

🎨 Estilo Visual
Colores: Negro, dorado (#ffcc00), rojo (#dd0404)

Tipografías: BLACEB__, NewRocker-Regular (estilo rockero)

Fondo: Textura con imagen /img/fondo4.png

👤 Autor
Ariel González - GitHub

📄 Licencia
Proyecto de uso educativo para Talento Tech - React 
