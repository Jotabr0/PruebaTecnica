# PREGUNTAS BACKEND 

## En un entorno de producción en el que tuviéramos muchas peticiones concurrentes al endpoint de mostrar una película, ¿Qué medidas llevarías a cabo para mejorar el rendimiento?

Hay varias estrategias que podemos implementar para mejorar el rendimiento en un entorno de producción con muchas peticiones concurrentes:

- Caching: Podemos almacenar en caché las respuestas a las solicitudes de mostrar una película. De esta manera, si varios usuarios solicitan los detalles de la misma película al mismo tiempo, podemos servir la respuesta desde la caché en lugar de consultar la base de datos cada vez.

- Optimización de consultas a la base de datos: Nos aseguramos de que las consultas a la base de datos estén optimizadas. Esto puede incluir la creación de índices para las columnas que se utilizan con frecuencia en las consultas, la normalización de la base de datos y la eliminación de consultas innecesarias.

- Balanceo de carga: Si tienemos un gran número de usuarios, podemos considerar la implementación de un balanceador de carga para distribuir las solicitudes entre varios servidores.
- 

## ¿Tiene sentido un endpoint de logout en este tipo de API?

En una autenticación basada en JWT, no mantenemos un seguimiento de los tokens una vez emitidos. Son independientes y contienen toda la información necesaria para identificar al usuario. Técnicamente, un endpoint de logout no invalidaría el token.

No obstante, un endpoint de logout puede tener sentido en ciertos contextos. Por ejemplo, si almacenamos el token JWT en el almacenamiento del lado del cliente, un endpoint de logout podría ser útil para eliminar el token. Además, si implementamos una lista negra de tokens, podríamos usar un endpoint de logout para agregar el token JWT a esta lista, evitando su uso en futuras solicitudes hasta que expire.

En resumen, aunque un endpoint de logout no puede invalidar un JWT, puede ser útil dependiendo de cómo manejemos la autenticación y la seguridad en nuestra aplicación.


## ¿En qué formato es más conveniente guardar las fechas en base de datos?

El formato más conveniente para guardar las fechas en la base de datos depende de nuestras necesidades, pero en general, es una buena práctica almacenar las fechas en formato UTC para evitar problemas con las zonas horarias. Muchas bases de datos tienen un tipo de dato específico para las fechas (como DATETIME en MySQL o timestamp en PostgreSQL) que podemos utilizar. Estos tipos de datos suelen permitirnos realizar consultas basadas en fechas de manera eficiente.





# PREGUNTAS FRONTEND

## ¿Qué mecanismos para mantener la sesión de un usuario conoces? ¿Siempre hace falta llamar a un endpoint “/logout” para cerrar la sesión del usuario?

 Existen varios mecanismos para mantener la sesión de un usuario en una aplicación web. Algunos de los más comunes incluyen:

- Cookies: Las cookies son pequeños archivos de texto que se almacenan en el navegador del usuario y que pueden contener información sobre la sesión del usuario.

- Tokens: Los tokens son cadenas de caracteres que se generan en el servidor y se envían al cliente. El cliente debe enviar el token en cada solicitud para autenticarse.

- Almacenamiento local: El almacenamiento local es una característica de los navegadores web que permite almacenar datos en el dispositivo del usuario.

En cuanto a la necesidad de llamar a un endpoint “/logout” para cerrar la sesión del usuario, depende del mecanismo de sesión que estemos utilizando. En algunos casos, como con las cookies o el almacenamiento local, se puede eliminar la información de la sesión en el lado del cliente. Sin embargo, si estamos utilizando tokens que se almacenan y validan en el servidor, es posible que necesitemos llamar a un endpoint “/logout” para invalidar el token.


## Investiga qué es una PWA y explica con tus palabras para qué sirve

   Una PWA es un tipo de aplicación web que utiliza tecnologías web modernas para proporcionar una experiencia similar a la de una aplicación nativa. Las PWA pueden funcionar sin conexión, enviar notificaciones push y ser instaladas en la pantalla de inicio de un dispositivo, entre otras cosas. Son útiles porque combinan las ventajas de las aplicaciones web (como la accesibilidad y la facilidad de actualización) con muchas de las características de las aplicaciones nativas.


## ¿Qué utilidad tiene el patrón redux?

Redux es un patrón de arquitectura de datos que permite manejar el estado
de una aplicación de manera predecible. Está diseñado para reducir el número de relaciones entre los
componentes de la aplicación y mantener un flujo de datos sencillo. Redux es especialmente útil en
aplicaciones de JavaScript grandes y complejas, donde manejar el estado de la aplicación puede volverse
difícil. Con Redux, todo el estado de la aplicación se almacena en un único lugar, lo que facilita su
gestión.


## ¿Qué hay que tener en cuenta para hacer SEO en el framework?


- Rutas amigables para SEO: Las URL de las páginas deben ser legibles y descriptivas.

- Etiquetas meta: Todas las páginas deben tener etiquetas meta descriptivas y títulos únicos.

- Contenido de calidad: El contenido de las páginas debe ser relevante y de alta calidad.

- Rendimiento: Las páginas que cargan rápidamente suelen tener un mejor rendimiento en SEO.

- Diseño responsive: Nuestro sitio web debe ser fácil de usar en todos los dispositivos, incluyendo
móviles y tablets.
