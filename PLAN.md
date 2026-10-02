# Plan de plataforma EFP N°30

Fecha: 1 de octubre de 2026. Estado: propuesta para definir alcance; todavía sin implementación.

## Objetivo

Publicar una web institucional basada en `EFP30-Página Web.html`, alimentada por un backend/BFF en Linux. Incorporar después un sitio privado para administrar contenidos y una sección de aula virtual para docentes y alumnos.

Por ahora, «notas» se interpreta como artículos institucionales. Las calificaciones, si se requieren, pertenecen exclusivamente al área privada.

## Referencia disponible

El HTML contiene navegación adaptable, portada, seis ejemplos de propuestas formativas, filtros por familias profesionales, accesos para alumnos y docentes, materiales, cartelera, agenda y contacto. La identidad usa azul oscuro, naranja e Inter.

Los formularios, campus y varios accesos muestran alertas de demostración. El detalle de cursos es genérico y compartido. La imagen local de portada referenciada no está en la carpeta. Los contenidos y datos de contacto deben validarse con la escuela antes de publicar. Tailwind se carga mediante CDN: en la aplicación se compilarán los estilos.

## Arquitectura

- Web pública: inicio, institución, noticias, oferta formativa, agenda, recursos públicos y contacto.
- Sitio privado: administración de contenidos; más adelante, aula virtual con navegación según rol.
- Backend/BFF compartido: API pública de lectura y API privada autenticada. Organizado por módulos, con reglas de negocio y persistencia. Al concentrar estas funciones, también actúa como backend de la plataforma.
- PostgreSQL: contenidos, usuarios y relaciones académicas.
- Archivos: almacenamiento persistente separado de la base. Inicialmente volumen del servidor, con interfaz preparada para almacenamiento compatible con S3 si resulta necesario.
- Proxy inverso: HTTPS y enrutamiento hacia cada aplicación. Las aplicaciones acceden al BFF mediante su propio dominio y una ruta `/api`, evitando depender de acceso directo a la base o de CORS abierto.

Una sola aplicación de backend modular al comienzo. Separar los frontends permite desplegar y evolucionar administración y web pública de manera independiente. No hace falta separar cada módulo en microservicios.

Tecnologías por confirmar según preferencia: React/Next.js para el sitio público, React para administración y Java/Spring Boot o TypeScript para el backend. Elegir un solo stack de backend antes de comenzar. No fijar versiones hasta iniciar la implementación.

## Etapa 1: web institucional y API pública

1. Convertir la referencia en componentes reutilizables, manteniendo identidad y adaptación móvil.
2. Crear páginas de listado y detalle de noticias y cursos con URL propia.
3. Mostrar novedades destacadas, cursos y eventos desde el BFF.
4. Modelar publicaciones con título, slug, resumen, contenido, portada, categoría, autor, fechas y estado borrador/publicado/archivado.
5. Modelar cursos con familia profesional, descripción, requisitos, duración, modalidad, imagen y estado de inscripción. La propuesta del catálogo se distingue de cada comisión o edición académica.
6. Modelar eventos con fecha, horario, lugar y descripción; datos institucionales y archivos públicos.
7. Cargar contenido inicial mediante un procedimiento de importación reproducible, sin necesitar el panel todavía.
8. Incorporar metadatos, sitemap, accesibilidad, imágenes optimizadas, paginación y estados de carga/error/vacío.
9. El botón Campus se habilita al existir el servicio. Evitar publicar accesos o formularios que simulan una operación exitosa.

Aceptación: navegación móvil y de escritorio funcional; contenido publicado visible y borradores inaccesibles; detalles de cursos y noticias reales; despliegue reproducible en Linux; datos iniciales revisados.

## Etapa 2: administración editorial

1. Login, cierre de sesión y recuperación de acceso.
2. Roles de administrador y editor, permisos comprobados en el backend.
3. Editor de noticias con borradores, vista previa autenticada, publicación y archivo.
4. Gestión de cursos, familias profesionales, agenda, recursos y datos institucionales.
5. Biblioteca de imágenes y documentos con restricciones de formato y tamaño.
6. Registro de quién creó, modificó y publicó cada contenido.
7. Actualización del contenido público al publicar: definir invalidación de caché para que no quede información anterior.

Aceptación: una persona autorizada puede publicar sin editar código; usuarios sin permisos no pueden modificar contenidos ni ver borradores; los cambios aparecen en la web pública.

## Etapa 3: aula virtual básica

Integrada en el sitio privado, con áreas diferenciadas para administración, docentes y alumnos.

1. Usuarios y asignación de roles.
2. Comisiones/ediciones de cursos, docentes, alumnos y matrículas.
3. Aula con anuncios, unidades y materiales.
4. Actividades con consigna, adjuntos y fecha de entrega.
5. Entregas de alumnos, devolución docente y estado de corrección.
6. Calificaciones privadas si la escuela las solicita.

Cada docente accede a sus comisiones y cada alumno a sus aulas y entregas. Los archivos privados requieren autorización incluso si se conoce su URL. La baja de una matrícula revoca el acceso correspondiente.

Aceptación: un docente publica una actividad, un alumno matriculado entrega y recibe devolución; otros alumnos y usuarios ajenos no pueden acceder a esa entrega.

Fuera del primer alcance del aula: videollamadas, chat en tiempo real, asistencia, certificados automáticos, pagos e integraciones externas. Evaluar necesidades antes de incorporarlos.

## API inicial orientativa

- `GET /api/public/noticias` y `GET /api/public/noticias/{slug}`.
- `GET /api/public/cursos` y `GET /api/public/cursos/{slug}`.
- `GET /api/public/eventos`, `/recursos` e `/institucion`.
- `/api/admin/...`: escritura autenticada y autorizada.
- `/api/aula/...`: matrículas, materiales, actividades y entregas autorizadas por aula.

Definir contratos con OpenAPI, validación, paginación, filtros y respuestas de error consistentes. Las rutas públicas devuelven exclusivamente contenido publicado y archivos públicos.

## Organización del proyecto propuesta

```text
web/          Aplicación institucional
admin/        Administración y futura aula
bff/          Backend modular y API
infra/        Contenedores, proxy y configuración de despliegue
docs/         Contratos, decisiones y manuales
```

## Operación en Linux

Docker Compose con web, BFF, base de datos y proxy; incorporar admin cuando corresponda. Persistir base y archivos en volúmenes, fuera de las imágenes. Exponer únicamente HTTP/HTTPS; mantener base y servicios internos en red privada. Configurar secretos fuera del repositorio, reinicio automático, comprobaciones de salud y logs.

Respaldar base y archivos, mantener copia fuera del servidor y probar restauración. Desplegar imágenes versionadas para permitir volver a una versión anterior; revisar compatibilidad de migraciones al hacerlo. Separar configuración local y de producción.

En formularios reales: validación, límite de solicitudes, destino efectivo y confirmación sólo después de guardar o enviar correctamente. Sanitizar contenido editorial. Para sesiones privadas, usar cookies seguras y protección CSRF donde corresponda.

## Verificación

Pruebas de API para publicación, filtrado, validación y permisos; comprobación integral del flujo editorial y del flujo entrega/devolución al incorporar cada etapa; revisión visual en móvil y escritorio; prueba de restauración antes de producción. La seguridad de archivos privados debe verificarse explícitamente.

## Decisiones pendientes

- Stack preferido para frontend y backend.
- Significado de «notas»: artículos o también calificaciones.
- Dominio, recursos del servidor y disponibilidad de Docker.
- Quién publica y si se necesita revisión previa por otra persona.
- Inscripción informativa, solicitud de preinscripción o matrícula gestionada.
- Datos, logo y fotografías oficiales para reemplazar ejemplos.
- Cantidad aproximada de alumnos/docentes y funciones prioritarias del aula.

## Orden de trabajo

Definir stack y modelo de contenidos → base del proyecto y despliegue → web y API pública → administración editorial → aula virtual. La administración editorial es necesaria para que la escuela publique de forma autónoma; la primera etapa admite una carga inicial asistida.

## Referencias técnicas consultadas

- Next.js, alojamiento propio: https://nextjs.org/docs/app/guides/self-hosting
- Spring Boot en Docker: https://spring.io/guides/gs/spring-boot-docker/
- Docker Compose: https://docs.docker.com/reference/compose-file/
