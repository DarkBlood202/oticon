<template>
    <div>
        <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto h-screen mb-4">
            <h1 class="font-bold text-4xl">Registro de Productos</h1>
            <div v-show="!isLoaded" class="my-8">
                <button @click="subirArchivo" class="bg-yellow-500 hover:bg-yellow-400 rounded-2xl font-bold text-white text-xl p-4 py-8 w-full">Seleccionar archivo de datos</button>
                <p class="my-4 text-justify text-xs text-gray-500">Asegúrese de que su hoja de datos sigue los parámetros establecidos para la importación correcta. Para más importación, vea <strong>Cómo importar desde una hoja de datos</strong>.</p>
                <div class="grid grid-cols-2 gap-4">
                    <a href="/productos/registrar" class="mt-8 bg-red-500 hover:bg-red-400 rounded-2xl p-4 font-bold text-center text-white text-xl">Cancelar</a>
                    <button @click="cargarDatos" v-show="canImport" class="mt-8 bg-yellow-500 hover:bg-yellow-400 rounded-2xl p-4 font-bold text-white text-xl">Siguiente</button>
                </div>
            </div>
            <div v-show="isLoaded">
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
                            <tr v-for="(producto, it) in lista_productos_cargados" :key="it">
                                <th class="font-normal border-2 border-white px-4">{{ producto._id }}</th>
                                <th class="font-normal border-2 border-white px-4">{{ producto.nombre }}</th>
                                <th class="font-normal border-2 border-white px-4">{{ producto.descripcion }}</th>
                                <th class="font-normal border-2 border-white px-4">{{ producto.cantidad }}</th>
                                <th class="font-normal border-2 border-white px-4">{{ producto.fechaCaducidad }}</th>
                                <th class="font-normal border-2 border-white px-4">{{ producto.marca }}</th>
                                <th class="font-normal border-2 border-white px-4">{{ producto.proveedor }}</th>
                                <th class="font-normal border-2 border-white px-4">{{ producto.codigoSeccion }}</th>
                                <th class="font-normal border-2 border-white px-4">{{ producto.codigoCategoria }}</th>
                                <th class="font-normal border-2 border-white px-4">{{ producto.idMedidaVenta}} ({{ producto.idMedidaVenta }})</th>
                                <th class="font-normal border-2 border-white px-4">{{ producto.precioCompra }}</th>
                                <th class="font-normal border-2 border-white px-4">{{ producto.precioVenta }}</th>
                                <th class="font-normal border-2 border-white px-4">{{ producto.precioMayorista }} (x{{ producto.cantidadMayorista }})</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <form>
                    <div class="grid grid-cols-2 gap-4 mt-10 mb-2">
                        <button type="button" @click="reintentarSubida" class="bg-yellow-500 hover:bg-yellow-400 rounded-2xl p-4 font-bold text-white text-xl">Volver</button>
                        <button class="bg-yellow-500 hover:bg-yellow-400 rounded-2xl p-4 font-bold text-white text-xl">Importar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isLoaded: false,
            canImport: false,
            lista_productos_cargados: [],
        }
    },
    created(){
        this.isLoaded = false;
        this.canImport = false;
    },
    methods: {
        subirArchivo(){
            /* if carga fue exitosa */
            this.canImport = true;
        },
        cargarDatos(){
            /* cargar datos a array o algo */
            this.isLoaded = true;
        },
        reintentarSubida(){
            /* descartar el archivo y limpiar lista de carga */
            this.isLoaded = false;
            this.canImport = false;
        }
    }
}
</script>