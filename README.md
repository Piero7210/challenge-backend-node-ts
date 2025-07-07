# Challenge Backend Node.js + TypeScript + GraphQL

API GraphQL para gestión de cuentas y productos con MongoDB, construida con Node.js, TypeScript y Apollo Server.

## 🚀 Características

- **GraphQL API** con Apollo Server
- **Base de datos MongoDB** con Mongoose
- **TypeScript** para tipado fuerte
- **Paginación** en consultas
- **Validaciones** robustas
- **Documentación** completa en schema
- **Manejo de errores** centralizado

## 🛠️ Stack Tecnológico

- **Node.js** 18+
- **TypeScript** 5.x
- **Express** 4.x
- **Apollo Server Express** 3.x
- **MongoDB** con Mongoose
- **GraphQL** 16.x

## 📋 Prerrequisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [MongoDB](https://www.mongodb.com/) (local o Atlas)
- [Git](https://git-scm.com/)

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Piero7210/challenge-backend-node-ts.git
   cd challenge-backend-node-ts
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crea un archivo `.env` en la raíz del proyecto:
   ```bash
   cp .env.test .env
   ```
   
   Edita el archivo `.env` con tus configuraciones:
   ```env
   # Application
   PORT=

   # Database MongoDB
   MONGODB_URL_ACCOUNTS=
   MONGODB_URL_PRODUCTS=
   
   # Odoo (Opcional)
   ODOO_URL=
   ODOO_DB=
   ODOO_UID=
   ODOO_PASSWORD=
   ```

4. **Compilar TypeScript** (opcional)
   ```bash
   npm run build
   ```

## 🎯 Uso

### Desarrollo
```bash
npm run dev
```
El servidor estará disponible en `http://localhost:4000` o en el puerto que hayas configurado en `.env`.

### Producción
```bash
npm run build
npm start
```

### GraphQL Playground
Accede a `http://localhost:4000/graphql` para explorar la API interactivamente.

## 📊 Estructura del Proyecto

```
server/
├── config/
│   └── app.ts              # Configuración de variables de entorno
├── db/
│   └── mongodb.ts          # Conexión a MongoDB
├── graphql/
│   ├── accounts/           # Módulo de cuentas
│   │   ├── index.ts
│   │   ├── queries.ts      # Consultas GraphQL
│   │   ├── mutations.ts    # Mutaciones GraphQL
│   │   └── schema.ts       # Schema GraphQL
│   ├── products/           # Módulo de productos
│   │   ├── index.ts
│   │   ├── queries.ts
│   │   ├── mutations.ts
│   │   └── schema.ts
│   └── root/
│       └── index.ts        # Configuración central
├── interfaces/
│   ├── account.ts          # Interfaces de cuentas
│   └── product.ts          # Interfaces de productos
├── models/
│   ├── accounts.ts         # Modelo Mongoose para cuentas
│   └── products.ts         # Modelo Mongoose para productos
├── services/
│   └── odoo.ts            # Servicio de integración con Odoo
└── app.ts                 # Punto de entrada principal
```

## 🔧 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor en modo desarrollo |
| `npm run build` | Compila TypeScript a JavaScript |
| `npm start` | Inicia el servidor en producción |

## 📖 API GraphQL

### Cuentas (Accounts)

#### Consultas
```graphql
# Obtener cuenta por ID
query {
  getAccountById(id: "123") {
    _id
    name
    lastname
    email
  }
}

# Buscar cuentas por nombre con paginación
query {
  getAccountsByName(name: "Piero", limit: 10, offset: 0) {
    accounts {
      _id
      name
      lastname
      email
    }
    total
    hasMore
    currentPage
    totalPages
  }
}
```

#### Mutaciones
```graphql
# Crear nueva cuenta
mutation {
  createAccount(input: {
    name: "Piero"
    lastname: "Apellido"
    email: "piero@example.com"
  }) {
    _id
    name
    lastname
    email
  }
}
```

### Productos (Products)

#### Consultas
```graphql
# Obtener producto por ID
query {
  getProductById(id: "456") {
    _id
    name
    sku
    stock
  }
}

# Obtener productos por cuenta
query {
  getProductsByAccountId(accId: "123", limit: 10, offset: 0) {
    products {
      _id
      name
      sku
      stock
    }
    total
    hasMore
    currentPage
    totalPages
  }
}
```

#### Mutaciones
```graphql
# Crear nuevo producto
mutation {
  createProduct(input: {
    name: "Cemento Portland"
    sku: "CEM001"
    stock: 100
    accountId: "123"
  }) {
    _id
    name
    sku
    stock
  }
}

# Realizar compra
mutation {
  purchaseProduct(input: {
    productId: "456"
    quantity: 5
    accountId: "123"
  }) {
    success
    message
    remainingStock
  }
}
```

## 🗃️ Base de Datos

El proyecto utiliza MongoDB con las siguientes colecciones:

- **accounts**: Almacena información de cuentas de usuario
- **products**: Almacena información de productos asociados a cuentas

### Esquema de Datos

**Account:**
```typescript
{
  _id: ObjectId,
  name: string,
  lastname: string,
  email: string,
  createdAt: Date,
  updatedAt: Date
}
```

**Product:**
```typescript
{
  _id: ObjectId,
  name: string,
  sku: string,
  stock: number,
  accountId: string,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔍 Validaciones

- **Email**: Formato válido y único
- **SKU**: Único por producto
- **Stock**: Número entero no negativo
- **Compras**: Valida existencia de cuenta y producto, stock suficiente

## 🚦 Manejo de Errores

La API maneja errores de forma consistente:
- Validaciones de entrada
- Recursos no encontrados
- Errores de base de datos
- Stock insuficiente

## 🔧 Desarrollo

### Agregar nueva funcionalidad

1. Definir interfaces en `interfaces/`
2. Crear/actualizar modelos en `models/`
3. Implementar schema GraphQL en `graphql/tumodulo/schema.ts`
4. Crear resolvers en `graphql/tumodulo/queries.ts` y `mutations.ts`
5. Exportar en `graphql/tumodulo/index.ts`


## 👥 Autor

**Piero Galindo** - [GitHub](https://github.com/Piero7210)