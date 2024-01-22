# PruebaTecnica
Prueba Técnica para AGILIA

# Backend

## Tecnologías permitidas: 

Lenguaje y Framework:

  - Laravel o Symfony (PHP)

  - Node/Express (javascript)

Base de datos: 

  -Sql o NoSql, a elegir por el candidato para(MySql, PostgreSQL, MongoDB etc …)


## Práctico:

Desarrolla una API donde un usuario pueda registrarse, identificarse y gestionar sus películas (Desarrollar el CRUD de películas). En este panel el usuario sólo verá y gestionará las películas registradas por él.

Al realizar la instalación del proyecto desde 0 se deberá registrar las siguientes categorías:

Terror, Suspense, Romántico, Acción, Fantasía, Comedia, Aventura, Drama.


Las películas tendrán los siguientes campos:

- id

- nombre

- año estreno

- portada (archivo subido por el usuario)

- fecha de creación

- fecha de actualización


Las películas deberán tener mínimo 1 o varias categorías.


## Requisitos adicionales:


* Mecanismo de autenticación por token JWT

* El listado películas deberá implementar filtros por categoría y por nombre

* El borrado de peliculas deberá ser un borrado lógico


## Instalación backend

1. Clona el repositorio: `git clone https://github.com/Jotabr0/PruebaTecnica.git`
2. Instala las dependencias: `cd movie-api` `composer install`
3. Copia el archivo de configuración: `cp .env.example .env`
4. Configura tu entorno en el archivo `.env` (base de datos, etc.).
5. Genera la clave de la aplicación: `php artisan key:generate`
6. Ejecuta las migraciones: `php artisan migrate`
7. Inicia el servidor: `php artisan serve`

## Endpoints

- `/api/auth/login` (POST): Inicia sesión y obtiene un token JWT.
- `/api/auth/register` (POST): Registra un nuevo usuario.
- `/api/auth/me` (GET): Obtiene los detalles del usuario autenticado.

### Endpoints Protegidos por Autenticación

- `/api/peliculas/usuario` (GET): Obtiene las películas asociadas al usuario autenticado.
- `/api/peliculas` (GET): Obtiene la lista de todas las películas.
- `/api/pelicula` (POST): Crea una nueva película.
- `/api/pelicula/{id}` (GET): Obtiene los detalles de una película específica.
- `/api/pelicula/{id}` (POST): Actualiza una película existente.
- `/api/pelicula/{id}` (DELETE): Elimina una película.
- `/api/pelicula/{id}/categorias` (POST): Asocia categorías a una película.
- `/api/ultima/pelicula` (GET): Obtiene el último ID de película.
- `/api/pelicula/{id}/categorias` (GET): Obtiene las categorías asociadas a una película.
- `/api/categorias` (GET): Obtiene la lista de todas las categorías.






# Frontend

## Tecnologías permitidas: 

Lenguaje y Framework:

  - Vue.js (javascript)

  - React (javascript)


## Práctico:

Utilizando la api que hemos desarrollado en la sección de backend, implementa como mínimo un CRUD (Create, Read, Update y Delete) que esté paginado y la sección de Login/Register. 



## Instalación

1. Clona el repositorio:  `git clone https://github.com/Jotabr0/PruebaTecnica.git`.
2. Navega al directorio del frontend: `cd movie-front`.
3. Instala las dependencias: `npm install`.
4. Inicia el front: `npm start`.


## Rutas de las vistas 

VISTA LOGIN

- `/login` Permite a los usuarios autenticarse en la aplicación.

VISTA REGISTRO/LOGIN

- `/register ` Formulario para registrar nuevo usuario
- `/` Si el usuario no está logueado, se verá la vista de inicio de sesión.

VISTA CRUD PELICULAS

- `/` Vista principal: Muestra la lista paginada de todas las películas añadidas por el usuario autenticado. 
- `/create/:id:` Permite al usuario crear una nueva película. El id se genera automaticamente para enviárselo a la api.Será el siguiente id disponible en la tabla peliculas.
- `/edit/:id:` Permite al usuario editar una película existente.


