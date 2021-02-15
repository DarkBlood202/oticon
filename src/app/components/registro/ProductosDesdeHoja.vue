<template>
    <div>
        <div class="container bg-white rounded-xl shadow-md p-4 px-6">
            <h1 class="font-bold text-4xl">Registro de Productos</h1>
            <h3 class="text-gray-500 text-xl my-4 mb-8">¿Son correctos estos datos?</h3>
            <div class="flex flex-nowrap overflow-x-auto">
                <table class="bg-gray-100 rounded-3xl text-sm w-full">
                    <thead>
                        <tr>
                            <th class="border-2 border-white px-4">ID</th>
                            <th class="border-2 border-white px-4">Nombre</th>
                            <th class="border-2 border-white px-4">Descripcion</th>
                            <th class="border-2 border-white px-4">Cantidad</th>
                            <th class="border-2 border-white px-4">Fecha caducidad</th>
                            <th class="border-2 border-white px-4">Marca</th>
                            <th class="border-2 border-white px-4">Proveedor</th>
                            <th class="border-2 border-white px-4">Sección</th>
                            <th class="border-2 border-white px-4">Categoría</th>
                            <th class="border-2 border-white px-4">Medida de venta</th>
                            <th class="border-2 border-white px-4">Precio compra</th>
                            <th class="border-2 border-white px-4">Precio venta</th>
                            <th class="border-2 border-white px-4">Precio mayorista</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(producto, it) in lista_productos" :key="it">
                            <th class="font-normal border-2 border-white px-4">{{ producto.id }}</th>
                            <th class="font-normal border-2 border-white px-4">{{ producto.nombre }}</th>
                            <th class="font-normal border-2 border-white px-4">{{ producto.descripcion }}</th>
                            <th class="font-normal border-2 border-white px-4">{{ producto.cantidad }}</th>
                            <th class="font-normal border-2 border-white px-4">{{ producto.fechaCaducidad }}</th>
                            <th class="font-normal border-2 border-white px-4">{{ producto.marca }}</th>
                            <th class="font-normal border-2 border-white px-4">{{ producto.proveedor }}</th>
                            <th class="font-normal border-2 border-white px-4">{{ producto.seccion.nombre }}</th>
                            <th class="font-normal border-2 border-white px-4">{{ producto.categoria.nombre }}</th>
                            <th class="font-normal border-2 border-white px-4">{{ producto.medidaVenta.nombre }} ({{ producto.medidaVenta.abreviacion }})</th>
                            <th class="font-normal border-2 border-white px-4">{{ producto.precioCompra }}</th>
                            <th class="font-normal border-2 border-white px-4">{{ producto.precioVenta }}</th>
                            <th class="font-normal border-2 border-white px-4">{{ producto.precioMayorista }} (x{{ producto.cantidadMayorista }})</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <form>
                <div class="grid grid-cols-2 gap-4 mt-10 mb-2">
                    <button class="bg-red-500 hover:bg-red-400 rounded-2xl p-4 font-bold text-white text-xl">Cancelar</button>
                    <button class="bg-yellow-500 hover:bg-yellow-400 rounded-2xl p-4 font-bold text-white text-xl">Importar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>