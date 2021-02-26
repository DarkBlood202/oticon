# Sistema de administración: OTICON
## Descripción
Oticon es un sistema de punto de venta (POS) basado en la web.
## Funcionalidad
+ Registro de productos (registro manual e importación desde un hoja de datos en Excel).
+ Listado de productos.
+ Modificación de productos registrados.
+ Eliminación de productos registrados.
---
# Notas de versión
## Versión 0.07
+ Agregada importación de productos desde una hoja de datos.
+ Agregado campo "código de barras" en registro y modificación de productos.
+ El campo "unidad equivalente" **ya no es un objeto**, ahora se ha dividido en 2 propiedades ("cantidad equivalente" y "medida asociada").
+ La búsqueda ahora puede realizarse también a través del código de barras.
+ Cuando el stock de algún producto es menor a **100**, se muestra una alerta de stock bajo.