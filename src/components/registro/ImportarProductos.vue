<template>
    <div>
        <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto">
            <h1 class="font-bold text-4xl">Importar productos</h1>
            <div v-show="!isLoaded" class="my-8">
                <form @submit.prevent="cargarDatos" enctype="multipart/form-data">
                    <label class="cursor-pointer block bg-yellow-500 hover:bg-yellow-400 rounded-2xl font-bold text-center text-white text-xl p-4 py-8 w-full">
                        <input @change="subirArchivo" class="hidden" type="file" ref="file" id="hoja-datos">
                        Seleccionar archivo de datos
                    </label>
                    <p class="my-4 text-justify text-xs text-gray-500">Asegúrese de que su hoja de datos sigue los parámetros establecidos para la importación correcta. Para más importación, vea <strong>Cómo importar desde una hoja de datos</strong>.</p>
                    <div class="grid grid-cols-2 gap-4">
                        <a href="/productos/registrar" class="col-span-1 mt-8 bg-red-500 hover:bg-red-400 rounded-2xl p-4 font-bold text-center text-white text-xl">Cancelar</a>
                        <button type="submit" v-show="canImport" class="col-span-1 col-end-3 mt-8 bg-yellow-500 hover:bg-yellow-400 rounded-2xl p-4 font-bold text-white text-xl">Siguiente</button>
                    </div>
                </form>
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
                                <th class="border-2 border-white px-4">Unidad equivalente</th>
                                <th class="border-2 border-white px-4">Código de barras</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(producto, it) in lista_productos_cargados" :key="it">
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.idProducto ? producto.idProducto : "-- No definido --" }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.nombre }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.descripcion }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.cantidad }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.fechaCaducidad.substring(0,10) }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.marca }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.proveedor }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.codigoSeccion }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.codigoCategoria }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.idMedidaVenta}}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.precioCompra }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.precioVenta }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.precioMayorista }} (x{{ producto.cantidadMayorista }})</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.cantidadEquivalente }} ({{ producto.idMedidaAsociada }})</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.codigoBarras == "" ? "No tiene" : producto.codigoBarras }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="grid grid-cols-2 gap-4 mt-10 mb-2">
                    <button @click="reintentarSubida" class="bg-yellow-500 hover:bg-yellow-400 rounded-2xl p-4 font-bold text-white text-xl">Volver</button>
                    <button @click="confirmarImportacion" class="bg-yellow-500 hover:bg-yellow-400 rounded-2xl p-4 font-bold text-white text-xl">Importar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios');
const moment = require('moment');

export default {
    data(){
        return {
            isLoaded: false,
            canImport: false,
            archivoDatos: "",
            lista_productos_cargados: [],

            lista_secciones: [],
            lista_categorias: [],
        }
    },
    created(){
        this.obtenerSecciones();
        this.obtenerCategorias();
        this.isLoaded = false;
        this.canImport = false;
    },
    methods: {
        obtenerSecciones(){
            axios.get('/api/secciones')
                .then(res => {
                    this.lista_secciones = res.data;
                });
        },
        obtenerCategorias(){
            axios.get('/api/categorias')
                .then(res => {
                    this.lista_categorias = res.data;
                });
        },
        
        subirArchivo(event){
            this.archivoDatos = event.target.files[0];
            if(this.archivoDatos){
                this.canImport = true;
            }
        },
        cargarDatos(){
            const formData = new FormData();
            formData.append('file', this.archivoDatos);
            try{
                axios.post('/uploads/excel-data', formData);
            }
            catch(err){
                console.log(err);
            }

            axios.get('/uploads/excel-data')
                .then(res => {
                    this.lista_productos_cargados = res.data;
                })
                .then(res => this.isLoaded = true);
        },
        confirmarImportacion(){
            axios.get('/uploads/excel-data').then(res => {
                this.lista_productos_cargados = res.data;
                this.lista_productos_cargados.forEach((p)=>{
                    if(p.idProducto == "" | p.idProducto == undefined | p.idProducto == null){
                        console.log("Producto", p.nombre, "no cuenta con un id. Se generará automáticamente.")
                        p.idProducto = p.codigoSeccion + p.codigoCategoria + moment(new Date()).format('x');
                        console.log("id generado es:", p.idProducto);
                    }
                    else{
                        console.log("Producto", p.nombre, "tiene id.");
                    }
                    axios.post('/api/productos', p);
                    console.log("Producto", p.nombre, "cargado.");
                })
            });
            this.lista_productos_cargados = [];
        },
        reintentarSubida(){
            /* descartar el archivo */
            this.lista_productos_cargados = [];
            this.isLoaded = false;
            this.canImport = false;
        }
    }
}
</script>