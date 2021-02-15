<template>
    <div>
        <div class="container bg-white rounded-xl shadow-md p-4 px-6">
            <h1 class="font-bold text-4xl">Productos</h1>
            <div class="flex my-4 mb-8 gap-4">
                <div class="bg-gray-300 px-4 py-1 rounded-full w-3/5">Buscar...</div>
                <div class="bg-gray-300 px-4 py-1 rounded-full w-2/5">Filtros...</div>
            </div>
            <div class="flex flex-nowrap overflow-x-auto">
                <table class="bg-gray-100 rounded-3xl text-sm w-full">
                    <thead>
                        <tr>
                            <th class="border-2 border-white px-4">Nombre</th>
                            <th class="border-2 border-white px-4">Cantidad</th>
                            <th class="border-2 border-white px-4">Precio venta</th>
                            <th class="border-2 border-white px-4">Precio mayorista</th>
                            <th class="border-2 border-white px-4"></th>
                            <th class="border-2 border-white px-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(producto, it) in lista_productos" :key="it">
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.nombre }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.cantidad }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.precioVenta }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.precioMayorista }} (x{{ producto.cantidadMayorista }})</td>
                            <td class="font-normal border-2 border-white px-6 text-center"><button class="font-bold hover:text-gray-300">M</button></td>
                            <td class="font-normal border-2 border-white px-6 text-center"><button class="font-bold text-red-400 hover:text-red-300">X</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            lista_productos: [],
        }
    },
    created(){
        this.obtenerProductos();
    },
    methods: {
        obtenerProductos(){
            fetch('/api/productos')
                .then(res => res.json())
                .then(data => {
                    this.lista_productos = data;
                });
        }
    }
}
</script>