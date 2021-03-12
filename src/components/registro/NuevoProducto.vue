<template>
    <div>
        <div v-show="!onNew" class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto mb-4">
            <h1 class="font-bold text-4xl">Registro de Productos</h1>
            <h3 class="text-gray-500 text-xl my-4 mb-8">Paso {{ stepCounter }} de {{ maxStep }}</h3>
            <form @submit.prevent="agregarProducto">
                <div v-show="stepCounter == 1">
                    <div class="my-4">
                        <label class="uppercase">Nombre</label><br>
                        <input type="text" required v-model="producto.nombre" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                    </div>
                    <div class="my-4">
                        <label class="uppercase">Descripcion</label><br>
                        <input type="text" required v-model="producto.descripcion" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                    </div>
                    <div class="grid grid-cols-2 gap-4 my-4">
                        <div class="col-span-1">
                            <label class="uppercase">Cantidad</label><br>
                            <input type="number" required v-model="producto.cantidad" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        </div>
                        <div class="col-span-1">
                            <label class="uppercase">Fecha caducidad</label><br>
                            <input type="date" required v-model="producto.fechaCaducidad" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        </div>
                    </div>
                </div>

                <div v-show="stepCounter == 2">
                    <div class="grid grid-cols-2 gap-8 my-4">
                        <div class="col-span-1">
                            <label class="uppercase">Marca</label><i @click="newMarca = onNew = true" class="ml-4 fas fa-plus-circle hover:text-gray-400 cursor-pointer"></i><br>
                            <select required v-model="producto.codigoMarca" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                                <option disabled value="">Seleccionar marca</option>
                                <option v-for="(marca, it) in lista_marcas" :key="it" v-bind:value="marca.codigo">
                                    {{ marca.codigo }}: {{ marca.nombre }}
                                </option>
                            </select>
                        </div>
                        <div class="col-span-1">
                            <label class="uppercase">Proveedor</label><i @click="newProveedor = onNew = true" class="ml-4 fas fa-plus-circle hover:text-gray-400 cursor-pointer"></i><br>
                            <select required v-model="producto.codigoProveedor" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                                <option disabled value="">Seleccionar proveedor</option>
                                <option v-for="(proveedor, it) in lista_proveedores" :key="it" v-bind:value="proveedor.codigo">
                                    {{ proveedor.codigo }}: {{ proveedor.nombre }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="my-4">
                        <label class="uppercase">Seccion</label><i @click="newSeccion = onNew = true" class="ml-4 fas fa-plus-circle hover:text-gray-400 cursor-pointer"></i><br>
                        <select required v-model="producto.codigoSeccion" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                            <option disabled value="">Seleccionar sección</option>
                            <option v-for="(seccion, it) in lista_secciones" :key="it" v-bind:value="seccion.codigo">
                                {{ seccion.codigo }}: {{ seccion.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="my-4">
                        <label class="uppercase">Categoria</label><i @click="newCategoria = onNew = true" class="ml-4 fas fa-plus-circle hover:text-gray-400 cursor-pointer"></i><br>
                        <select required v-model="producto.codigoCategoria" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                            <option disabled value="">Seleccionar categoría</option>
                            <option v-for="(categoria, it) in lista_categorias" :key="it" v-bind:value="categoria.codigo">
                                {{ categoria.codigo }}: {{ categoria.nombre }}
                            </option>
                        </select>
                    </div>
                </div>

                <div v-show="stepCounter == 3">
                    <div class="my-4">
                        <label class="uppercase">Medida de venta</label><i @click="newMedida = onNew = true" class="ml-4 fas fa-plus-circle hover:text-gray-400 cursor-pointer"></i><br>
                        <select required v-model="producto.idMedidaVenta" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                            <option disabled value="">Seleccionar medida de venta</option>
                            <option v-for="(medida, it) in lista_medidas" :key="it" v-bind:value="medida._id">
                                {{ medida.nombre }} ({{ medida.abreviacion }})
                            </option>
                        </select>
                    </div>
                    <div class="grid grid-cols-2 gap-8 my-4">
                        <div class="col-span-1">
                            <label class="uppercase">Precio compra</label><br>
                            <input type="number" required v-model="producto.precioCompra" step="0.01" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        </div>
                        <div class="col-span-1">
                            <label class="uppercase">Precio venta</label><br>
                            <input type="number" required v-model="producto.precioVenta" step="0.01" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        </div>
                    </div>
                    <div class="my-4">
                        <label class="uppercase">Precio mayorista</label><br>
                        <div class="grid grid-cols-9">
                            <input type="number" required v-model="producto.precioMayorista" step="0.01" class="col-span-4 mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                            <span class="col-span-1 pt-3 font-bold text-center">X</span>
                            <input type="number" required v-model="producto.cantidadMayorista" class="col-span-4 mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                            <span class="col-end-9 sm:col-end-10 text-right text-xs uppercase">Unidades...</span>
                        </div>
                    </div>
                </div>

                <div v-show="stepCounter == 4">
                    <div class="my-4">
                        <label class="uppercase">Unidad equivalente</label>
                        <p class="my-4 text-justify text-xs text-gray-500">1 Unidad Equivalente es cuánto de cierta medida de venta corresponde a una "unidad" de producto.</p>
                        <div class="grid grid-cols-9 gap-4">
                            <span class="col-span-2 block text-center">1 unidad</span>
                            <span class="col-span-1 block text-center font-bold font-xl">=</span>
                            <input type="number" required v-model="producto.cantidadEquivalente" step="0.001" class="col-span-3 pl-2 py-1 rounded-full border-2 border-yellow-500">
                            <select required v-model="producto.idMedidaAsociada" class="col-span-3 pl-2 py-1 rounded-full border-2 border-yellow-500">
                                <option disabled value="">Seleccionar medida de venta</option>
                                <option v-for="(medida, it) in lista_medidas" :key="it" v-bind:value="medida._id">
                                    {{ medida.nombre }} ({{ medida.abreviacion }})
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div v-show="stepCounter == 5">
                    <div class="my-4">
                        <label class="uppercase">Código de barras</label>
                        <p class="my-4 text-justify text-xs text-gray-500">Adicionalmente puede ingresar un código de barras (si dispone de uno) para identificar sus productos.</p>
                        <input type="text" v-model="producto.codigoBarras" class="pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4 mt-10 mb-2">
                    <a href="/productos/registrar" v-show="stepCounter == 1" class="bg-red-500 hover:bg-red-400 rounded-2xl p-4 font-bold text-white text-center text-xl">Cancelar</a>
                    <button type="button" v-show="stepCounter > 1" @click="goToPaso(-1)" class="bg-yellow-500 hover:bg-yellow-400 rounded-2xl p-4 font-bold text-white text-xl">Anterior</button>
                    <button type="button" v-show="stepCounter < maxStep" @click="goToPaso(1)" class="bg-yellow-500 hover:bg-yellow-400 rounded-2xl p-4 font-bold text-white text-xl">Siguiente</button>
                    <button type="submit" v-show="stepCounter == maxStep" class="bg-indigo-500 hover:bg-indigo-400 rounded-2xl p-4 font-bold text-white text-xl">Terminar</button>
                </div>
            </form>
        </div>

        <div v-show="onNew && newMarca">
            <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto mb-4">
                <h1 class="font-bold text-4xl">Agregar marca</h1>
                <form @submit.prevent="agregarMarca">
                    <div class="my-4">
                        <label class="uppercase">Nombre</label>
                        <input type="text" required v-model="p_marca.nombre" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-10 mb-2">
                        <button type="button" @click="newMarca = onNew = false" class="bg-red-500 hover:bg-red-400 rounded-2xl p-4 font-bold text-white text-xl">Cancelar</button>
                        <button type="submit" class="bg-indigo-500 hover:bg-indigo-400 rounded-2xl p-4 font-bold text-white text-xl">Agregar</button>
                    </div>
                </form>
            </div>
        </div>

        <div v-show="onNew && newProveedor">
            <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto mb-4">
                <h1 class="font-bold text-4xl">Agregar proveedor</h1>
                <form @submit.prevent="agregarProveedor">
                    <div class="my-4">
                        <label class="uppercase">Nombre</label>
                        <input type="text" required v-model="p_proveedor.nombre" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-10 mb-2">
                        <button type="button" @click="newProveedor = onNew = false" class="bg-red-500 hover:bg-red-400 rounded-2xl p-4 font-bold text-white text-xl">Cancelar</button>
                        <button type="submit" class="bg-indigo-500 hover:bg-indigo-400 rounded-2xl p-4 font-bold text-white text-xl">Agregar</button>
                    </div>
                </form>
            </div>
        </div>

        <div v-show="onNew && newSeccion">
            <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto mb-4">
                <h1 class="font-bold text-4xl">Agregar sección</h1>
                <form @submit.prevent="agregarSeccion">
                    <div class="my-4">
                        <label class="uppercase">Nombre</label>
                        <input type="text" required v-model="p_seccion.nombre" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-10 mb-2">
                        <button type="button" @click="newSeccion = onNew = false" class="bg-red-500 hover:bg-red-400 rounded-2xl p-4 font-bold text-white text-xl">Cancelar</button>
                        <button type="submit" class="bg-indigo-500 hover:bg-indigo-400 rounded-2xl p-4 font-bold text-white text-xl">Agregar</button>
                    </div>
                </form>
            </div>
        </div>

        <div v-show="onNew && newCategoria">
            <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto mb-4">
                <h1 class="font-bold text-4xl">Agregar categoría</h1>
                <form @submit.prevent="agregarCategoria">
                    <div class="my-4">
                        <label class="uppercase">Nombre</label>
                        <input type="text" required v-model="p_categoria.nombre" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-10 mb-2">
                        <button type="button" @click="newCategoria = onNew = false" class="bg-red-500 hover:bg-red-400 rounded-2xl p-4 font-bold text-white text-xl">Cancelar</button>
                        <button type="submit" class="bg-indigo-500 hover:bg-indigo-400 rounded-2xl p-4 font-bold text-white text-xl">Agregar</button>
                    </div>
                </form>
            </div>
        </div>

        <div v-show="onNew && newMedida">
            <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto mb-4">
                <h1 class="font-bold text-4xl">Agregar medida de venta</h1>
                <form @submit.prevent="agregarMedidaVenta">
                    <div class="my-4">
                        <label class="uppercase">Nombre</label>
                        <input type="text" required v-model="p_medidaVenta.nombre" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                    </div>
                    <div class="my-4">
                        <label class="uppercase">Abreviación</label>
                        <input type="text" required v-model="p_medidaVenta.abreviacion" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-10 mb-2">
                        <button type="button" @click="newMedida = onNew = false" class="bg-red-500 hover:bg-red-400 rounded-2xl p-4 font-bold text-white text-xl">Cancelar</button>
                        <button type="submit" class="bg-indigo-500 hover:bg-indigo-400 rounded-2xl p-4 font-bold text-white text-xl">Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
const moment = require('moment');

class Producto{
    constructor(){
        this.nombre = "";
        this.descripcion = "";
        this.cantidad = null;
        this.fechaCaducidad = null;

        this.codigoMarca = "";
        this.codigoProveedor = "";

        this.precioCompra = null;
        this.precioVenta = null;
        this.precioMayorista = null;
        this.cantidadMayorista = null;

        this.codigoSeccion = "";
        this.codigoCategoria = "";
        this.idMedidaVenta = "";

        this.cantidadEquivalente = null;
        this.idMedidaAsociada = "";
        this.codigoBarras = undefined;
        this.idProducto = "";
    }
}

export default {
    data(){
        return {
            stepCounter: 1,
            maxStep: 5,
            producto: new Producto(),

            onNew: false,
            newMarca: false,
            newProveedor: false,
            newSeccion: false,
            newCategoria: false,
            newMedida: false,

            p_marca: {},
            p_proveedor: {},
            p_seccion: {},
            p_categoria: {},
            p_medidaVenta: {},

            lista_marcas: [],
            lista_proveedores: [],
            lista_secciones: [],
            lista_categorias: [],
            lista_medidas: [],
        }
    },
    created(){
        this.stepCounter = 1;
        this.obtenerMarcas();
        this.obtenerProveedores();
        this.obtenerSecciones();
        this.obtenerCategorias();
        this.obtenerMedidasVenta();
    },
    methods: {
        obtenerMarcas(){
            fetch('/api/marcas')
                .then(res => res.json())
                .then(data => {
                    this.lista_marcas = data;
                });
        },
        obtenerProveedores(){
            fetch('/api/proveedores')
                .then(res => res.json())
                .then(data => {
                    this.lista_proveedores = data;
                });
        },
        obtenerSecciones(){
            fetch('/api/secciones')
                .then(res => res.json())
                .then(data => {
                    this.lista_secciones = data;
                })
        },
        obtenerCategorias(){
            fetch('/api/categorias')
                .then(res => res.json())
                .then(data => {
                    this.lista_categorias = data;
                });
        },
        obtenerMedidasVenta(){
            fetch('/api/medidas-venta')
                .then(res => res.json())
                .then(data => {
                    this.lista_medidas = data;
                })
        },
        goToPaso(paso){
            this.stepCounter = this.stepCounter + paso;
            this.stepCounter = Math.min(Math.max(this.stepCounter, 1), this.maxStep);
        },
        agregarProducto(){
            let codigoSeccionF = ("00" + this.producto.codigoSeccion).slice(-3);
            let codigoCategoriaF = ("00" + this.producto.codigoCategoria).slice(-3);
            this.producto.idProducto = codigoSeccionF + codigoCategoriaF + moment().format('x');
            console.log("Seccion", this.producto.codigoSeccion, "Categoria", this.producto.codigoCategoria);
            fetch('/api/productos', {
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
                });
            this.stepCounter = 1;
        },

        agregarMarca(){
            fetch('/api/marcas', {
                method: 'POST',
                body: JSON.stringify(this.p_marca),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.p_marca = {};
                this.newMarca = false;
                this.onNew = false;
                this.obtenerMarcas();
            })
        },
        agregarProveedor(){
            fetch('/api/proveedores', {
                method: 'POST',
                body: JSON.stringify(this.p_proveedor),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.p_proveedor = {};
                this.newProveedor = false;
                this.onNew = false;
                this.obtenerProveedores();
            })
        },
        agregarSeccion(){
            fetch('/api/secciones', {
                method: 'POST',
                body: JSON.stringify(this.p_seccion),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.p_seccion = {};
                this.newSeccion = false;
                this.onNew = false;
                this.obtenerSecciones();
            })
        },
        agregarCategoria(){
            fetch('/api/categorias', {
                method: 'POST',
                body: JSON.stringify(this.p_categoria),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.p_categoria = {};
                this.newCategoria = false;
                this.onNew = false;
                this.obtenerCategorias();
            })
        },
        agregarMedidaVenta(){
            fetch('/api/medidas-venta', {
                method: 'POST',
                body: JSON.stringify(this.p_medidaVenta),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.p_medidaVenta = {};
                this.newMedida = false;
                this.onNew = false;
                this.obtenerMedidasVenta();
            })
        },
    }
}
</script>