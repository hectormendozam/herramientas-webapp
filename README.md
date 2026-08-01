# Herramientas Web — App

Aplicación web del proyecto de Ingeniería de Software II. Es el cliente de la API
[herramientasweb_api](https://github.com/hectormendozam/herramientasweb_api) y reúne, en
una sola interfaz, el registro de usuarios, la carga de materias, dos directorios de
contactos (empresariales y personales) y una agenda de citas.

Generada con [Angular CLI](https://github.com/angular/angular-cli) 16.2.

## Tecnologías

* Angular 16.2
* Angular Material y Angular CDK 16.2
* Bootstrap 5.2 y Bootstrap Icons
* ngx-cookie-service para la sesión, ngx-mask para el formato de campos
* TypeScript 5.1

- - -

## Requisitos

* Node.js 18 o superior
* Angular CLI 16 (`npm install -g @angular/cli@16`)
* La API corriendo en `http://127.0.0.1:8000`

- - -

## Instalación

1. Clonar el repositorio y entrar a la carpeta del proyecto.

2. Instalar las dependencias:

   ```
   npm install
   ```

3. Verificar que `src/environments/environment.ts` apunte a la API:

   ```typescript
   export const environment = {
     production: false,
     url_api: "http://127.0.0.1:8000"
   };
   ```

4. Levantar el servidor de desarrollo:

   ```
   ng serve
   ```

   La aplicación queda en `http://localhost:4200/` y se recarga sola al guardar cambios.

> El backend acepta peticiones desde `http://localhost:4200`, que es el puerto por
> omisión de `ng serve`. Si se cambia el puerto hay que agregarlo a `CORS_ORIGIN_WHITELIST`
> en el `settings.py` de la API.

- - -

## Pantallas

| Ruta | Pantalla |
| --- | --- |
| `/` | Inicio de sesión |
| `/nuevo-login` | Inicio de sesión alterno |
| `/registro`, `/registro/:id` | Alta y edición de usuarios |
| `/registro-inge` | Alta de usuario con perfil de ingeniería |
| `/home`, `/home-inge` | Inicio según el rol del usuario |
| `/menu` | Menú principal |
| `/registro-materia`, `/registro-materia/:id` | Alta y edición de materias |
| `/tabla-materia` | Listado de materias |
| `/directorio-e` | Directorio de contactos empresariales |
| `/registro-contacto-e`, `/registro-contacto-e/:id` | Alta y edición de contactos empresariales |
| `/directorio-p` | Directorio de contactos personales |
| `/registro-contacto-p`, `/registro-contacto-p/:id` | Alta y edición de contactos personales |
| `/agenda` | Agenda de citas |
| `/registro-cita`, `/registro-cita/:id` | Alta y edición de citas |
| `/registro-producto` | Alta de productos |

- - -

## Servicios

Los servicios viven en `src/app/services/` y concentran la comunicación con la API:

| Servicio | Responsabilidad |
| --- | --- |
| `facade.service.ts` | Sesión: login, logout, token y datos del usuario en cookies |
| `usuarios.service.ts` | Usuarios y perfiles |
| `materias.service.ts` | Materias |
| `contactosemp.service.ts` | Directorio empresarial |
| `contactop.service.ts` | Directorio personal |
| `citas.service.ts` | Agenda de citas |
| `productos.service.ts` | Productos |

- - -

## Estructura

```
src/
├── index.html
├── main.ts
├── styles.scss
├── environments/           URL de la API por ambiente
└── app/
    ├── app.module.ts
    ├── app-routing.module.ts
    ├── screens/            Una carpeta por pantalla
    └── services/           Comunicación con la API
```

- - -

## Comandos

| Comando | Descripción |
| --- | --- |
| `ng serve` | Servidor de desarrollo en `http://localhost:4200/` |
| `ng build` | Compila el proyecto en `dist/` |
| `npm run watch` | Compila en modo desarrollo y observa los cambios |
| `ng test` | Ejecuta las pruebas unitarias con [Karma](https://karma-runner.github.io) |
| `ng generate component <nombre>` | Genera un componente nuevo |
