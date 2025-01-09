# ComediAPI

ComediAPI es una API REST para gestionar chistes. Utiliza Node.js, Express, MongoDB y Swagger para la documentación de la API. Esta API ha sido realizada para dar solvencia al proyecto de la asignatura Tópicos Especiales de Programación.

## Autores

- Matias Silveira 31020586
- Jorge Ramírez 29529111
- Luis Martín 

## Requisitos

- Node.js (v14 o superior)
- MongoDB (v4 o superior)

## Instalación

1. Clona el repositorio:

   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd comediAPI

2. Instala las dependencias:
    npm install

## Ejecución

1. Inicie el servidor:

 Abra una terminal, ubiquese en el archivo o carpeta donde tiene el repositorio de este proyecto y ejecute el comando npm start. Esto iniciará el servidor en el puerto 3000.

2. Accede a la documentación de la API:

Abra su navegador y navegue a http://localhost:3000/api-docs para ver la documentación generada por Swagger.

## Rutas API

### Obtener un chiste

```yaml
GET /joke?type={type}
```

Obtiene un chiste basado en el tipo especificado.

- **Parámetros de consulta**:
  - `type` (string, requerido): Tipo de chiste a obtener. Valores posibles: `Chuck`, `Dad Joke`, `Propio`.
- **Respuestas**:
  - `200`: Chiste obtenido exitosamente.
  - `400`: Parámetro no válido.

### Crear un nuevo chiste

```yaml
POST /joke
```

Crea un nuevo chiste.

- **Cuerpo de la solicitud**:
  - `text` (string): Texto del chiste.
  - `author` (string): Autor del chiste.
  - `rating` (number): Puntaje del chiste.
  - `category` (string): Categoría del chiste.
- **Respuestas**:
  - `201`: Chiste creado exitosamente.
  - `400`: Error al crear el chiste.

### Eliminar un chiste por su ID

```yaml
DELETE /joke/{id}
```

Elimina un chiste basado en su ID.

- **Parámetros de ruta**:
  - `id` (string, requerido): ID del chiste a eliminar.
- **Respuestas**:
  - `200`: Chiste eliminado exitosamente.
  - `404`: Chiste no encontrado.

### Actualizar un chiste por su ID

```yaml
PUT /joke/{id}
```

Actualiza un chiste basado en su ID.

- **Parámetros de ruta**:
  - `id` (string, requerido): ID del chiste a actualizar.
- **Cuerpo de la solicitud**:
  - `text` (string): Texto del chiste.
  - `author` (string): Autor del chiste.
  - `rating` (number): Puntaje del chiste.
  - `category` (string): Categoría del chiste.
- **Respuestas**:
  - `200`: Chiste actualizado exitosamente.
  - `404`: Chiste no encontrado.

### Obtener un chiste por su ID

```yaml
GET /joke/{id}
```

Obtiene un chiste basado en su ID.

- **Parámetros de ruta**:
  - `id` (string, requerido): ID del chiste a obtener.
- **Respuestas**:
  - `200`: Chiste obtenido exitosamente.
  - `404`: Chiste no encontrado.