# Lumen × Crayola

Implementación responsive de la página **MOBILE PANTALLAS** del archivo de Figma, con adaptación de la misma composición a desktop.

## Abrir

No requiere instalación de paquetes ni compilación. Para probar la navegación y conservar los cambios entre páginas, abre la carpeta con **Live Server** en Visual Studio Code o inicia un servidor local:

```sh
python3 -m http.server 5173
```

Después visita `http://localhost:5173`.

También puedes abrir `index.html` directamente para ver el diseño. El guardado entre archivos locales depende del navegador; para probar todas las interacciones se recomienda el servidor local.

## Páginas

- `index.html`: Home, favoritos de temporada, promociones y beneficios.
- `productos.html`: colección Crayola con seis productos, favoritos y botones para añadir al carrito.
- `carrito.html`: cantidades, selección de productos y resumen desplegable.
- `ubicaciones.html`: mapa original del diseño y selector de estados.
- `perfil.html`: Resumen con tarjeta Club Lumen primero, avatar e información debajo; vistas de Club Lumen, favoritos y ayuda.
- `configuracion.html`: cuenta, movimientos, direcciones, beneficios y cierre de sesión de demostración.
- `mis-compras.html`: compras del diseño y botón para volver a añadir al carrito.

## Portada de Inicio

En escritorio (desde 1000 px), el texto y el botón quedan a la izquierda del lápiz, debajo de la franja verde. En móvil, el lápiz entra en diagonal desde el borde derecho junto al texto y los productos quedan sobre la franja.

El lápiz azul y la textura del trazo usan `assets/blue-pencil.png`. La punta sigue una curva SVG durante 3.2 segundos y el trazo crece detrás de ella. El lápiz se levanta al volver al inicio y la línea se desvanece antes de repetir el recorrido. La animación se pausa fuera de pantalla o en pestañas inactivas. Con movimiento reducido se muestra la ilustración terminada.

En escritorio, la franja verde y «lleno de color» se revelan juntos durante 3.8 segundos. Con movimiento reducido, aparecen completos desde el inicio.

## Organización

- `styles.css`: tokens, componentes y reglas responsive para móvil, tablet y desktop.
- `app.js`: componentes compartidos, búsqueda e interacciones.
- `assets/`: imágenes y SVG locales del diseño y de la carpeta proporcionada.

Se usan **Nunito** y **Nunito Sans**, desde Google Fonts. Las imágenes y los íconos se sirven localmente. **Explorar productos** del Home y **Seguir comprando** del carrito llevan a `productos.html`. La pantalla conserva los seis productos, precios y presentaciones del diseño: Lápices de Colores ($98), Crayones Jumbo ($50), Pinturitas ($174), Brocha Escolar ($65), Plumones Acrílicos ($279) y Gises Gigantes ($167).

En mobile se mantienen las dos columnas y las tarjetas alternadas del diseño; en desktop se adapta a tres columnas. El catálogo utiliza las imágenes de la carpeta proporcionada, los trazos, el cohete y el arcoíris de la referencia. Cada botón Agregar actualiza el carrito y confirma la acción. La búsqueda y el panel Favoritos incluyen también los nuevos productos. Las páginas individuales de detalle de producto no forman parte de esta entrega.

Los cambios en el carrito, favoritos, nombre y direcciones se guardan en el navegador mediante `localStorage`. No se conecta a un servidor, una cuenta real ni una pasarela de pago. El botón Pagar presenta un resumen de demostración y no realiza cargos. La ubicación usa la imagen de mapa de Figma, con su selector de estados; no consulta tiendas en tiempo real.

El diseño incluye navegación por teclado, etiquetas para lectores de pantalla, foco visible y respeto de la preferencia de movimiento reducido.

## Verificación

Se comprobó la sintaxis de JavaScript, la inicialización de las siete páginas, los recursos locales y la lógica de cantidades, totales, selección de productos, agregar desde el catálogo, favoritos, búsqueda, tarjeta giratoria y persistencia. Estas comprobaciones ejecutan la lógica con un DOM simulado; no sustituyen una prueba visual en un navegador real.

El footer compartido y el nuevo Resumen de Mi perfil se revisaron en un navegador real a 320, 430 y 1440 px, sin desbordamiento horizontal. Se probaron el giro y la ampliación de la tarjeta, la edición del nombre, el menú móvil y la navegación a Club Lumen, favoritos, ayuda, configuración y compras. La revisión visual completa del resto del sitio queda fuera de este ajuste. Los pagos, el acceso a la cuenta y el mapa son demostraciones de frontend.

## Mi perfil

El Resumen presenta primero la tarjeta digital en una cabecera azul de Lumen. Debajo aparecen el avatar con iniciales, el saludo personalizado, la descripción y los datos de membresía. Dos paneles muestran el código de barras original del diseño y los 279.67 puntos. La tarjeta conserva sus imágenes originales; se puede girar y ampliar su código.

La navegación de cuenta contiene Resumen, Club Lumen, Mis compras, Mis favoritos, Configuración, Ayuda y Cerrar sesión. En desktop permanece como menú lateral compartido por compras y configuración; en móvil se abre con el botón Mi perfil. Club Lumen reúne tarjeta y puntos; Mis favoritos muestra los productos guardados y permite agregarlos al carrito; Ayuda incluye preguntas frecuentes y los contactos oficiales. Nombre, favoritos y sesión de demostración conservan su estado en el navegador.

Referencia: https://www.figma.com/design/RKBmIfboUZ73Tnw5Kk3Kd6/Lumen_Re-Dise%C3%B1o_?node-id=149-563


## Mis beneficios

La ruta `perfil.html#mis-beneficios` añade una pantalla independiente al menú de Mi perfil, sin cambiar el contenido de las otras vistas. Presenta «Beneficios que inspiran» y las cinco tarjetas solicitadas: acumulación del 2% antes de IVA, canje a $1 MXN por punto, promociones, consulta de movimientos y membresía sin anualidad. Mantiene los paneles, las fuentes y la paleta azul de la cuenta; usa dos columnas en desktop y una en móvil. «Consultar condiciones» abre un diálogo con restricciones y un enlace al sitio oficial de Club Lumen: https://www.clublumen.com.mx/.

Se verificaron la ruta y el estado activo del menú, las cinco tarjetas y sus iconos, el diálogo y el regreso al Resumen. La pantalla y el menú móvil se revisaron en navegador a 320, 430 y 1440 px, sin desbordamiento horizontal. Las pruebas de las siete rutas y de las interacciones existentes continúan pasando.

## Footer del rediseño

Las siete páginas comparten un footer con Nunito y Nunito Sans. Incluye TikTok, Instagram, Facebook, Pinterest, X y YouTube; correo de atención en línea y teléfono; ayuda, tiendas y Club Lumen; aviso de privacidad, términos y condiciones y métodos de pago. Contacto aparece abierto inicialmente en móvil; Ayuda y Legales se pueden desplegar. En pantallas de 768 px o más, las tres secciones aparecen abiertas inicialmente.

Se sintetizó la referencia original, conservando el contenido esencial y los enlaces oficiales, con fondo índigo de la paleta del rediseño. Los enlaces de redes y legales se abren en otra pestaña; el correo y el teléfono utilizan `mailto:` y `tel:`.

Fuentes de contacto y enlaces oficiales:
- https://lumen.com.mx/login
- https://lumen.com.mx/redes-sociales
- https://lumen.com.mx/aviso
- https://lumen.com.mx/usos
- https://lumen.com.mx/metodos-de-pago

## Escala tipográfica y botones

Mobile conserva los tamaños y diferencias de la composición de Figma: título Crayola 40/48 px, descripción 16/20 px, títulos promocionales 32/37 px, textos de producto 16/18 px y nombres del carrito 20/24 px. Los botones recuperan sus variantes del diseño: Explorar productos 16/20 px, Agregar 16/20 px y Pagar 20/24 px. En anchos compactos se conservan las adaptaciones responsive. Todos los textos de interfaz, incluidos notas, etiquetas, legales, formularios y menús, tienen un mínimo de 16 px en móvil. Las tarjetas del carrito pueden encogerse sin ensanchar la página.

Desde 1000 px se aplica la escala desktop solicitada, con base de 16 px y ratio 1.25, respetando exactamente estos valores redondeados:

| Estilo | Tamaño | Line-height |
| --- | --- | --- |
| H1 | 60 px | 72 px |
| H2 | 48 px | 60 px |
| H3 | 40 px | 48 px |
| H4 | 32 px | 40 px |
| H5 | 24 px | 28 px |
| H6 | 20 px | 24 px |
| Párrafo grande | 20 px | 24 px |
| Párrafo mediano | 16 px | 20 px |
| Párrafo chico | 12 px | 16 px |
| Caption | 12 px | 16 px |

Los títulos de página usan H1; las secciones principales y el saludo de perfil, H2; los destacados promocionales, H3; las ventanas, H4; los paneles, H5; los nombres de producto, H6. Los textos introductorios usan párrafo grande; el contenido y los botones, párrafo mediano; las notas y metadatos, párrafo chico o caption. Los botones desktop mantienen una altura mínima de 48 px. Las utilidades `.type-h1` a `.type-h6`, `.type-p-large`, `.type-p-medium`, `.type-p-small` y `.type-caption` comparten los mismos tokens.

Se revisaron las siete páginas y las vistas de Club Lumen, Mis beneficios, Mis favoritos y Ayuda, a 320, 430, 768, 1024 y 1440 px. La comprobación de estilos en navegador no encontró textos de interfaz por debajo de 16 px en mobile ni tamaños o line-heights fuera de la escala en desktop. Se revisaron también las condiciones, el menú móvil y la edición del perfil. En el carrito móvil se mantiene la elipsis de nombres prevista por el diseño.

## Nuevo combo y botón de Inicio

Inicio utiliza `assets/hero-combo.png`, una copia sin alterar de la nueva imagen «combo crayola.png» (1290 × 1219 px). El encuadre compensa sus márgenes transparentes y conserva la proporción original y la ubicación visual del conjunto en mobile y desktop.

En desktop, Explorar productos tiene el mismo ancho, alto, tamaño de texto y line-height que Agregar en el catálogo: 295.33 × 48 px a 1440 px, y 238 × 48 px a 1024 px, con texto de 16/20 px. En mobile comparte texto de 16/20 px y altura de 33 px; el ancho se adapta a la etiqueta completa para respetar el mínimo de 16 px. Se verificó la carga de la nueva imagen, su proporción, el botón y su navegación al catálogo a 320, 430, 1024 y 1440 px.


## Mis compras y Configuración completas

Mis compras presenta los dos productos del diseño en pedidos de demostración con número, fecha, estado, presentación y precio. Ver detalle abre una ventana accesible; Volver a comprar añade una unidad al carrito, conserva el precio y confirma la acción. El enlace al carrito permite revisar las cantidades.

Configuración muestra cuatro paneles: datos de cuenta, direcciones, puntos y Club Lumen. Editar mis datos actualiza el nombre y correo y refresca el panel; Administrar direcciones permite añadir una dirección o editar una existente sin duplicarla. Los cambios se guardan en el navegador. Los accesos a Movimientos y Mis beneficios conservan la navegación compartida de Mi perfil.

Se probaron los accesos desde favoritos, las rutas directas y su recarga, ambos detalles de pedido, volver a comprar, el guardado de datos, la edición y persistencia de direcciones y el menú móvil. Verificación visual en desktop y mobile de 390 y 320 px, sin desbordamiento; los textos nuevos de mobile tienen al menos 16 px. El historial es de demostración y no consulta compras reales de Lumen.


## Apertura local y actualización de HTML

Los siete HTML incluyen una versión de los recursos CSS y JavaScript para cargar los últimos cambios. Al abrirlos directamente con file:, la navegación entre archivos de Mi perfil usa enlaces completos; History API se reserva para el mismo archivo. Se recomienda servir la carpeta por HTTP para compartir el estado entre páginas. La versión actualizada se abrió y recargó en Chrome mediante http://127.0.0.1:5173; Mis compras y Configuración se comprobaron desde Mis favoritos.
