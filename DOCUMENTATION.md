Abre la terminal en la carpeta del proyecto:


backend-bars/

Levanta la base de datos MongoDB vía Docker Compose:

bash
docker-compose -f docker-compose.dev.yml up -d

    Esto iniciará el contenedor con MongoDB en segundo plano.

En otra terminal, en la misma carpeta, arranca el backend en modo desarrollo con hot reload:

bash
yarn start:dev

    Esto iniciará el servidor NestJS con recarga automática ante cambios en el código.

Durante el desarrollo, trabaja de forma activa y observa los cambios aplicados en caliente.

Cuando termines de trabajar, para las aplicaciones con:

    En la terminal del backend: Ctrl + C para detener el servidor.

    En la terminal Docker:

        bash
        docker-compose -f docker-compose.dev.yml down

        para detener y eliminar los contenedores.

2. Estructura del proyecto


backend-bars/
│
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── menus/
│   ├── promotions/
│   ├── bars/
│   ├── images/
│   ├── auth/
│   ├── common/
│   └── config/
│
├── test/
├── .env
├── Dockerfile
├── docker-compose.yml
├── docker-compose.dev.yml
└── README.md (o DOCUMENTATION.md)

3. Tecnologías y dependencias principales

    NestJS con TypeScript

    MongoDB (con Mongoose)

    Docker y Docker Compose

    Yarn como gestor de paquetes

    Librerías:

        @nestjs/mongoose, mongoose

        @nestjs/config

        @nestjs/passport, passport, passport-local, @nestjs/jwt, passport-jwt, bcrypt

        @nestjs/platform-express, multer

        class-validator, class-transformer

