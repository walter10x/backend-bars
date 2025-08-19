Documentación del Proyecto Backend-bars
1. Arranque y entorno de desarrollo
Levantar base de datos MongoDB con Docker Compose

En la terminal dentro de la carpeta raíz del proyecto:

bash
docker-compose -f docker-compose.dev.yml up -d

Esto iniciará el contenedor con MongoDB en segundo plano.
Iniciar servidor backend con hot reload (modo desarrollo)

En otra terminal, en la misma carpeta:

bash
yarn start:dev

Se arrancará el servidor de NestJS con recarga automática ante cambios en el código (hot reload).
Detener aplicaciones

    Para detener el servidor NestJS: Ctrl + C en la terminal donde se ejecuta.

    Para detener y eliminar contenedores Docker:

bash
docker-compose -f docker-compose.dev.yml down

2. Estructura del proyecto

text
backend-bars/
│
├── src/
│   ├── app.module.ts            # Módulo raíz
│   ├── main.ts                  # Punto de entrada
│   ├── menus/                   # Módulo capítulos para menús (futuro)
│   ├── promotions/              # Módulo promociones (futuro)
│   ├── bars/                    # Módulo bares (lógica, esquemas, controladores)
│   ├── images/                  # Gestión de imágenes (uploads, etc.)
│   ├── auth/                    # Módulo autenticación (JWT, guards)
│   ├── common/                  # Código común y utilidades
│   └── config/                  # Configuraciones del proyecto
│
├── test/                       # Tests automáticos
├── .env                        # Variables de entorno
├── Dockerfile                  # Imagen Docker para producción
├── docker-compose.yml          # Configuración general Docker
├── docker-compose.dev.yml      # Configuración Docker para desarrollo
└── README.md / DOCUMENTATION.md # Documentación principal

3. Tecnologías y dependencias principales

    Framework: NestJS con TypeScript

    Base de datos: MongoDB con Mongoose

    Contenedores: Docker y Docker Compose

    Gestor de paquetes: Yarn

    Librerías principales:

        @nestjs/mongoose, mongoose

        @nestjs/config

        @nestjs/passport, passport, passport-local, @nestjs/jwt, passport-jwt, bcrypt

        @nestjs/platform-express, multer

        class-validator, class-transformer

4. Funcionalidades principales implementadas
Usuarios

    Registro de usuarios con rol (client por defecto, owner, admin).

    Hash seguro de contraseñas (bcrypt).

    Validación rigurosa con class-validator.

    Operaciones CRUD: registro, listado, búsqueda por ID, actualización y eliminación.

    Control de seguridad básico previsto para que solo usuarios actualicen o eliminen su cuenta.

Roles de usuarios

    client: usuario normal que busca bares, guarda favoritos, etc.

    owner: propietario que gestiona sus bares.

    admin (pendiente): acceso completo al sistema.

Bares

    Creación y gestión de bares vinculados a usuarios owner.

    Validaciones estrictas de unicidad (nameBar, teléfono, redes sociales).

    Estructura de horarios, fotos, ubicación y redes sociales.

    Asociación con el propietario vía ownerId.

5. API REST - Endpoints resumen principáles
Endpoint	Método	Descripción	Notas importantes
/users/register	POST	Registrar nuevo usuario	role opcional, contraseña mínima 6
/users	GET	Obtener todos los usuarios	Requiere admin (pendiente)
/users/:id	GET	Obtener usuario por ID	
/users/:id	PUT	Actualizar usuario (solo su cuenta)	No cambia email ni rol
/users/:id	DELETE	Eliminar cuenta usuario (auto-baja)	Solo su propia cuenta
/bars	POST	Crear un bar vinculado a un owner	ownerId obligatorio
/bars	GET	Listar bares	
/bars/:id	GET	Obtener bar por ID	
/bars/:id	PUT	Actualizar bar	
/bars/:id	DELETE	Eliminar bar	
6. Validaciones importantes

    Emails únicos en usuarios.

    Roles válidos y asignación por defecto.

    Contraseñas hasheadas y seguras.

    Campos obligatorios y tipos estrictos.

    Duplicados no permitidos en bares (nombre, teléfono, redes sociales).

    Logs detallados en servicios para trazabilidad y depuración.

7. Próximos pasos recomendados

    Implementar módulo completo de autenticación con JWT.

    Añadir Guards para control de acceso según rol y usuario.

    Mejorar manejo de errores y respuestas API.

    Documentar API con Swagger / OpenAPI.

    Añadir funcionalidades de cliente: favoritos, comentarios, etc.

    Mejorar testing con pruebas unitarias e integradas.

