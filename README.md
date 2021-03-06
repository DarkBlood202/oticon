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
## Versión 0.18
+ Agregadas rutas del módulo de reportes.
+ Agregada vista para reporte de productos.
+ Separada lógica de base de datos del archivo de servidor principal.

## Versión 0.17
+ Agregado campo de "Código antiguo" a producto.
+ Se cambió texto en vista de lista de productos cuando no hay fecha de caducidad establecida a "No aplica".
+ Agregado modal de confirmación de eliminación de producto en la vista de productos.

## Versión 0.16
+ Corregido error en el cual la notificación de estado de registro de producto dejaba de mostrarse al registrar inmediatamente un nuevo producto.
+ Campo "ID de producto" es ahora autoincremental (formato de 5 dígitos).
+ Agregado indicador de carga de datos en módulo de importación de productos.
+ Agregada ruta "Cómo importar desde una hoja de datos".
+ Agregadas validaciones de hoja de datos en el módulo de importación.

## Versión 0.15
+ Modificada relación de campos obligatorios en los módulos de registro y modificación:
    + Nombre
    + Descripción
    + Cantidad
    + Sección
    + Categoría
    + Medida de venta
    + Precio de compra
    + Precio de venta
+ Corregido error donde se podían agregar Marcas, Secciones, Proveedores y Categorías duplicadas.
+ Corregido error donde se podían agregar Marcas, Secciones, Proveedores y Categorías con nombres en blanco.
+ Validaciones en los módulos de registro y modificación de productos y campos ahora muestra qué campos son inválidos.
+ Tamaño máximo del archivo de datos establecido en 5MB

## Versión 0.14
+ Agregadas validaciones al módulo de registro y modificación de producto.

## Versión 0.13
+ Agregada notificación de estado al registrar un producto.

## Versión 0.12
+ Agregadas vistas de creación, modificación y eliminación para "Categoría", "Sección", "Marca", "Proveedor" y "Medida de Venta".
+ Corregido tamaño de área activa del enlace a *home* desde barra de navegación.
+ Agregada ruta de modificación de campos a barra de navegación.

## Versión 0.11
+ Campo "ID de producto" se actualiza correctamente al modificarse "Categoría" y "Sección".
+ Agregada leyenda de colores para stock en vista de lista de productos.
+ Ajustado formato de fecha en vista de lista de productos.
+ Ajustado modulo de importación múltiple al nuevo Schema de Producto.

## Versión 0.10
+ Removida entrada manual para códigos de "Categoría", "Sección", "Marca" y "Proveedor".
+ Vista de lista de productos ahora muestra campos "ID", "Nombre de producto", "Precio de Costo", "Precio de Venta" y "Fecha de caducidad".
+ Removidos botones de agregar "Categoría" y "Sección" en el layout del módulo registro. En su lugar, pueden agregarse directamente mientras se registra un nuevo producto ("Categoría", "Sección", "Marca", "Proveedor" y "Medida de venta").

## Versión 0.09
+ Agregado layout de escritorio (pantallas de ancho mayor a 1024px).

## Versión 0.08
+ Agregado campo "id de producto" (Se genera y actualiza automáticamente basado en sección y categoría).
+ Reorganización del layout en el módulo de registro.
+ Agregadas rutas para la creación de secciones y categorías en el módulo de registro.

## Versión 0.07
+ Agregada importación de productos desde una hoja de datos.
+ Agregado campo "código de barras" en registro y modificación de productos.
+ El campo "unidad equivalente" **(ya no es un objeto)**, ahora se ha dividido en 2 propiedades ("cantidad equivalente" y "medida asociada").
+ La búsqueda ahora puede realizarse también a través del código de barras.
+ Cuando el stock de algún producto es menor a **100**, se muestra una alerta de stock bajo.