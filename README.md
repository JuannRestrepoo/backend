# Gestión de Proyectos (Universidad • Clientes • Tipos • Proyectos)

API REST en **Node.js + Express** para gestionar **proyectos** y sus relaciones con **clientes**, **universidades** y **tipos de proyectos**.  
El proyecto está organizado con una estructura tipo **MVC** (routes → controllers → models) y un módulo de **configuración de base de datos**.

---

## 🚀 Características
✅ CRUD de **Clientes**  
✅ CRUD de **Universidad**  
🟡 En progreso / por agregar:
- CRUD de **Tipos de Proyecto**
- CRUD de **Proyectos**
- Relación: **Proyecto ↔ Cliente**
- Relación: **Proyecto ↔ Universidad**
- Relación: **Proyecto ↔ Tipo de Proyecto**
- Filtros/búsquedas (por cliente, universidad, tipo, fechas, estado, etc.)

---

## 🧱 Estructura del proyecto

```bash
.
├─ controllers/
│  ├─ clientes.js
│  └─ universidad.js
├─ database/
│  └─ configuration.js
├─ models/
│  ├─ clientes.js
│  └─ universidad.js
├─ routes/
│  ├─ clientes.js
│  └─ universidad.js
├─ app.js
├─ server.js
├─ package.json
├─ README.md
└─ .gitignore
```

### ¿Qué hace cada carpeta?
- `routes/`: define endpoints y mapea rutas a controladores.
- `controllers/`: lógica de negocio y validaciones básicas.
- `models/`: definición de modelos (entidades/tablas) y acceso a datos.
- `database/configuration.js`: configuración/conexión a la base de datos.

---

## ⚙️ Requisitos
- Node.js (recomendado LTS)
- npm (o yarn)
- Un motor de base de datos "mongoDB"

---

## 🔧 Instalación y ejecución

1) Instala dependencias:
```bash
npm install
```

2) Configura variables de entorno 
Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=4001
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=1234
# DB_NAME=gestion_proyectos
# DB_PORT=3306
# DB_URI=mongodb://localhost:27017/gestion_proyectos
```

> Nota: Los nombres exactos dependen de tu `database/configuration.js`.  
> Si no usas `.env`, puedes omitir este paso.

3) Ejecuta el proyecto:
```bash
npm server.js
```

---

## 🌐 URL base
Por defecto:
```txt
http://localhost:4001
```

---

## 🧩 Endpoints (módulos actuales)

### Clientes
- `GET    /api/clientes` → listar clientes
- `GET    /api/clientes/:id` → obtener cliente por id
- `POST   /api/clientes` → crear cliente
- `PUT    /api/clientes/:id` → actualizar cliente
- `DELETE /api/clientes/:id` → eliminar cliente

**Ejemplos (cURL):**

Listar:
```bash
curl -X GET http://localhost:3000/api/clientes
```

Crear:
```bash
curl -X POST http://localhost:3000/api/clientes   -H "Content-Type: application/json"   -d '{
    "nombre": "Empresa ABC",
    "nit": "900123456",
    "correo": "contacto@abc.com",
    "telefono": "3000000000"
  }'
```

Obtener por id:
```bash
curl -X GET http://localhost:3000/api/clientes/1
```

Actualizar:
```bash
curl -X PUT http://localhost:3000/api/clientes/1   -H "Content-Type: application/json"   -d '{
    "nombre": "Empresa ABC S.A.S",
    "correo": "nuevo@abc.com"
  }'
```

Eliminar:
```bash
curl -X DELETE http://localhost:3000/api/clientes/1
```

---

### Universidad
- `GET    /api/universidad` → listar universidades
- `GET    /api/universidad/:id` → obtener universidad por id
- `POST   /api/universidad` → crear universidad
- `PUT    /api/universidad/:id` → actualizar universidad
- `DELETE /api/universidad/:id` → eliminar universidad

**Ejemplos (cURL):**

Listar:
```bash
curl -X GET http://localhost:3000/api/universidad
```

Crear:
```bash
curl -X POST http://localhost:3000/api/universidad   -H "Content-Type: application/json"   -d '{
    "nombre": "IU Digital de Antioquia",
    "ciudad": "Medellín",
    "correo": "contacto@universidad.edu"
  }'
```

---

## 🔄 Próximos módulos sugeridos

### Tipos de Proyecto
Rutas sugeridas:
- `GET    /api/tipos-proyecto`
- `GET    /api/tipos-proyecto/:id`
- `POST   /api/tipos-proyecto`
- `PUT    /api/tipos-proyecto/:id`
- `DELETE /api/tipos-proyecto/:id`

Ejemplo de body:
```json
{
  "nombre": "Investigación",
  "descripcion": "Proyectos de investigación académica"
}
```

---

### Proyectos
Campos comunes sugeridos (ajústalos a tu modelo):
- `numero`
- `titulo`
- `descripcion`
- `estado` (ej: `pendiente | en_progreso | finalizado`)
- `fechaInicio`,
- `fechaFin`
- `clienteId`
- `universidadId`
- `tipoProyectoId`
-  `etapaId`
-  `fechaCreacion`
-  `fechaActualizacion`

Rutas sugeridas:
- `GET    /api/proyectos`
- `GET    /api/proyectos/:id`
- `POST   /api/proyectos`
- `PUT    /api/proyectos/:id`
- `DELETE /api/proyectos/:id`

Filtros sugeridos:
- `GET /api/proyectos?clienteId=1`
- `GET /api/proyectos?universidadId=2`
- `GET /api/proyectos?tipoProyectoId=3`
- `GET /api/proyectos?estado=en_progreso`

Ejemplo de body para crear proyecto:
```json
{
  "nombre": "Sistema de Gestión Académica",
  "descripcion": "Proyecto para gestionar procesos académicos",
  "estado": "en_progreso",
  "fechaInicio": "2026-02-01",
  "fechaFin": "2026-06-30",
  "clienteId": 1,
  "universidadId": 2,
  "tipoProyectoId": 3
}
```






