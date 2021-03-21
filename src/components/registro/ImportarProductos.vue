<template>
    <div>

        <div v-if="uploading" class="slide-out-right p-4 absolute bottom-4 right-4 rounded-xl bg-blue-100 text-blue-700 text-center">
            <i class="w-full far fa-info-circle text-4xl font-bold"></i>
            <h1 class="font-bold">Cargando datos</h1>
            <p>Un momento...</p>
        </div>

        <div v-if="registerOK && !registerError" class="slide-out-right p-4 absolute bottom-4 right-4 rounded-xl bg-green-100 text-green-700 text-center">
            <i class="w-full far fa-check-circle text-4xl font-bold"></i>
            <h1 class="font-bold">¡Importación exitosa!</h1>
            <p>Los productos se han importado correctamente.</p>
        </div>

        <div v-if="registerError && !registerOK" class="slide-out-right p-4 absolute bottom-4 right-4 rounded-xl bg-red-100 text-red-700 text-center">
            <i class="w-full far fa-times-circle text-4xl font-bold"></i>
            <h1 class="font-bold">Ha ocurrido un error</h1>
            <p>Verifica los datos introducidos y que el archivo sea del formato correcto.</p>
        </div>

        <div v-if="badData" class="slide-out-right p-4 absolute bottom-4 right-4 rounded-xl bg-red-100 text-red-700 text-center">
            <i class="w-full far fa-minus-circle text-4xl font-bold"></i>
            <h1 class="font-bold">Datos insuficientes</h1>
            <p>No existen los campos suficientes en tu archivo de datos.</p>
        </div>

        <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto">
            <h1 class="font-bold text-4xl">Importar productos</h1>
            <div v-show="!isLoaded" class="my-8">
                <form @submit.prevent="cargarDatos" enctype="multipart/form-data">
                    <label class="cursor-pointer block bg-yellow-500 hover:bg-yellow-400 rounded-2xl font-bold text-center text-white text-xl p-4 py-8 w-full">
                        <input @change="subirArchivo" class="hidden" type="file" ref="file" id="hoja-datos">
                        Seleccionar archivo de datos
                    </label>
                    <p class="my-4 text-justify text-xs text-gray-500">
                        Asegúrese de que su hoja de datos sigue los parámetros establecidos para la importación correcta.
                        Para más información, vea <a href="/faq/importar" class="font-bold cursor-pointer">Cómo importar desde una hoja de datos</a>.
                        </p>
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
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.idProducto ? producto.idProducto : "-NO DEFINIDO-" }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.nombre }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.descripcion }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.cantidad }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.fechaCaducidad ? producto.fechaCaducidad.substring(0,10) : "-NO DEFINIDO-" }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.codigoMarca }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.codigoProveedor }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.codigoSeccion }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.codigoCategoria }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.idMedidaVenta}}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.precioCompra ? producto.precioCompra.toFixed(2) : "-NO DEFINIDO-" }}</td>
                                <td class="font-normal border-2 border-white px-4 text-center">{{ producto.precioVenta ? producto.precioVenta.toFixed(2) : "-NO DEFINIDO-" }}</td>
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
            uploading: false,
            isLoaded: false,
            canImport: false,

            registerOK: false,
            registerError: false,
            badData: false,

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
            this.uploading = false;
            this.canImport = false;
            this.archivoDatos = event.target.files[0];
            if(this.archivoDatos){
                this.uploading = true;
                setTimeout(()=>{
                    this.canImport = true;
                    this.uploading = false;
                }, 6000);
                // this.canImport = true;
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
                .then(res => {
                    this.isLoaded = true;
                });
        },
        confirmarImportacion(){
            axios.get('/uploads/excel-data').then(res => {
                this.lista_productos_cargados = res.data;
                // console.log("Evaluation begins!");
                this.badData = this.lista_productos_cargados.some((p)=>{
                    return(
                        !p.nombre ||
                        !p.descripcion ||
                        !p.cantidad ||
                        !p.precioCompra ||
                        !p.precioVenta
                    );
                });
                if(this.badData){
                    this.canImport = false;
                    this.isLoaded = false;
                    this.uploading = false; 
                    setTimeout(()=>{
                        this.badData = false;
                    }, 6000);
                    return;
                }

                this.lista_productos_cargados.forEach((p)=>{
                    // if(
                    //     !p.nombre ||
                    //     !p.descripcion ||
                    //     !p.cantidad ||
                    //     !p.precioCompra ||
                    //     !p.precioVenta
                    // ){
                    //     this.badData = true;
                    //     return;
                    // }
                    // if(p.idProducto == "" | p.idProducto == undefined | p.idProducto == null){
                        // console.log("Producto", p.nombre, "no cuenta con un id. Se generará automáticamente.")
                        // let codigoSeccionF = ("00" + p.codigoSeccion).slice(-3);
                        // let codigoCategoriaF = ("00" + p.codigoCategoria).slice(-3);
                        // p.idProducto = codigoSeccionF + codigoCategoriaF + moment(new Date()).format('x');
                        // console.log("id generadoes:", p.idProducto);
                    // }
                    // else{
                        // console.log("Producto", p.nombre, "tiene id.");
                    // }
                    axios.post('/api/productos', p)
                        .then(res => {
                            if(res.statusText == 'OK'){
                                this.registerError = false;
                                this.registerOK = true;
                                this.canImport = false;
                                this.isLoaded = false;
                            }
                            else{
                                this.registerOK = false;
                                this.registerError = true;
                            }
                            setTimeout(()=>{
                                this.registerError = false;
                                this.registerOK = false;
                            }, 6000);
                        });
                    // console.log("Producto", p.nombre, "cargado.");
                });
            });
        },
        reintentarSubida(){
            /* descartar el archivo */
            this.lista_productos_cargados = [];
            this.uploaded = false;
            this.isLoaded = false;
            this.canImport = false;
        }
    }
}
</script>