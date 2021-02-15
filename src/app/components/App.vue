<template>
    <div>
        <nav class="bg-yellow-400 p-4 rounded-b-2xl w-full mb-5">
            <ul class="font-bold text-white">
                <li><a class="text-2xl" href="/">Oticon</a></li>
            </ul>
        </nav>
        <div class="container mx-auto">
            <!-- Card -->
            <div class="container my-4 bg-white p-8 shadow-md rounded-xl">
                <h1 class="font-bold text-4xl">Registro de productos</h1>
                <p class="mt-5 text-gray-300">Paso 1/?</p>
                <form class="mt-5" @submit.prevent="loadProducto">
                    <label class="uppercase">Nombre</label><br>
                    <input type="text" v-model="producto.nombre" class="mt-2 mb-4 py-1 px-2 rounded-2xl border-2 border-yellow-300 w-full">
                    <label class="uppercase">Descripcion</label><br>
                    <input type="text" v-model="producto.descripcion" class="mt-2 mb-4 py-1 px-2 rounded-2xl border-2 border-yellow-300 w-full">
                    <template v-if="modificando === false">
                        <button type="submit" class="mt-10 bg-green-300 hover:bg-green-400 p-4 rounded-2xl font-bold text-white uppercase w-full">Agregar producto</button>
                    </template>
                    <template v-else>
                        <button type="submit" class="mt-10 bg-green-300 hover:bg-green-400 p-4 rounded-2xl font-bold text-white uppercase w-full">Modificar producto</button>
                    </template>
                </form>
            </div>
            <div class="container my-4 bg-white p-8 shadow-md rounded-xl">
                <h1 class="font-bold text-4xl">Productos</h1>
                <div class="mt-4 mb-8 grid grid-cols-5 gap-2">
                    <div class="col-span-3 bg-gray-200 text-white rounded-full py-2 px-4">Buscar...</div>
                    <div class="col-span-2 bg-gray-200 text-white rounded-full py-2 px-4">Filtros...</div>
                </div>
                <table class="container bg-gray-100 rounded-3xl w-full">
                    <thead>
                        <tr>
                            <th class="border-2 border-white p-2">Nombre</th>
                            <th class="border-2 border-white p-2">Descripcion</th>
                            <th class="border-2 border-white p-2"></th>
                            <th class="border-2 border-white p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="p of lista_productos">
                            <td class="border-2 border-white px-4 py-1">{{ p.nombre }}</td>
                            <td class="border-2 border-white px-4 py-1">{{ p.descripcion }}</td>
                            <td class="border-2 border-white px-4 py-1"><button @click="eliminarProducto(p._id)" class="font-bold text-red-400 hover:text-red-300">X</button></td>
                            <td class="border-2 border-white px-4 py-1"><button @click="modificarProducto(p._id)" class="font-bold hover:text-gray-300">M</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
class Producto{
    constructor(nombre = "", descripcion = ""){
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}

export default {
    data(){
        return {
            producto: new Producto(),
            lista_productos : [],
            modificando: false,
            reqProducto: ''
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
        },
        loadProducto(){
            if(this.modificando === false){
                fetch('/api/productos/nuevo', {
                    method: 'POST',
                    body: JSON.stringify(this.producto),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.producto = new Producto();
                    this.obtenerProductos();
                });
            }
            else{
                fetch('/api/producto/' + this.reqProducto, {
                    method: 'PUT',
                    body: JSON.stringify(this.producto),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.obtenerProductos();
                    this.modificando = false;
                });
            }
            
        },
        eliminarProducto(id){
            fetch('/api/producto/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'apllication/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.obtenerProductos();
            });
        },
        modificarProducto(id){
            fetch('/api/producto/' + id)
                .then(res => res.json())
                .then(data => {
                    this.producto = new Producto(data.nombre, data.descripcion);
                    this.reqProducto = data._id;
                    this.modificando = true;
                });
        }
    }
}
</script>