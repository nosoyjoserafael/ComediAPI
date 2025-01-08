# ComediAPI

ComediAPI es una API REST para gestionar chistes. Utiliza Node.js, Express, MongoDB y Swagger para la documentación de la API. Esta API ha sido realizada para dar solvencia al proyecto de la asignatura Tópicos Especiales de Programación.

## Requisitos

- Node.js (v14 o superior)
- MongoDB (v4 o superior)
- Docker Compose (v1.29 o superior)

## Instalación

1. Clona el repositorio:
   git clone https://github.com/nosoyjoserafael/comediAPI
   cd comediAPI

2. Construir las imágenes de Docker:
    docker-compose build

3. Inicializar los contenedores:
    docker-compose up -d

## Ejecución

1. Inicie el servidor:

 Abra una terminal, ubiquese en el archivo o carpeta donde tiene el repositorio de este proyecto y ejecute el comando npm start. Esto iniciará el servidor en el puerto 3000.

2. Accede a la documentación de la API:

Abra su navegador y navegue a http://localhost:3000/api-docs para ver la documentación generada por Swagger.

## Rutas de la API

1. Obtener un chiste
### GET /joke?type={type}
    Obtiene un chiste basado en el tipo especificado en el parámetro de consulta {type}.

    Parámetros:
        type: Tipo de chiste a obtener. 
        Valores permitidos: Chuck, Dad Joke, Propio.

    Ejemplo: curl -X GET "http://localhost:3000/joke?type=Chuck"

2. Crear un chiste
### POST /joke
    Crea un nuevo chiste con el contenido proporcionado en el cuerpo de la solicitud.

    Ejemplo:
    curl -X POST "http://localhost:3000/jokes" -H "Content-Type: application/json" -d '{
    "text": "Mi novia, hablando de astronomía, me preguntó cómo mueren las estrellas. "Normalmente por sobredosis", le dije.",
    "author": "Pepito Grillo",
    "rating": 5,
    "category": "Humor negro"
    }'

3. Eliminar un chiste
    ### DELETE /joke/:id
    Elimina un chiste por su ID.

    Ejemplo: curl -X DELETE "http://localhost:3000/jokes/{id}"

## Pruebas
    Para ejecutar las pruebas unitarias se debe utilizar el comando npm test en la terminal.