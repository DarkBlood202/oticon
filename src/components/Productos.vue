<template>
    <div>
        <div v-show="!modificando && !onNew" class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto mb-4">
            <h1 class="font-bold text-4xl">Productos</h1>
            <i class="absolute ml-2.5 mt-6 fas fa-search"></i>
            <form class="flex my-4 mb-8 gap-4">
                <input @input="buscarProducto" v-model="query" type="text" placeholder="Buscar por nombre, id, código..." class="rounded-full border-2 border-yellow-500 pl-7 px-4 py-1 w-3/5">
                <select v-model="filtro" @change="filtrarProductos" class="rounded-full border-2 border-yellow-500 px-4 py-1 w-2/5">
                    <option value="0">Ordenar por...</option>
                    <option value="3">ID ascendente</option>
                    <option value="4">ID descendente</option>
                    <option value="1">A-Z</option>
                    <option value="2">Z-A</option>
                </select>
            </form>
            <div class="flex flex-nowrap overflow-x-auto">
                <table class="bg-gray-100 rounded-3xl text-sm w-full">
                    <thead>
                        <tr>
                            <th class="border-2 border-white px-4">ID</th>
                            <th class="border-2 border-white px-4">Nombre</th>
                            <th class="border-2 border-white px-4">Cantidad</th>
                            <th class="border-2 border-white px-4">Precio compra</th>
                            <th class="border-2 border-white px-4">Precio venta</th>
                            <th class="border-2 border-white px-4">Fecha caducidad</th>
                            <th class="border-2 border-white px-4"></th>
                            <th class="border-2 border-white px-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(producto, it) in lista_productos" :key="it">
                            <td class="font-normal border-2 border-white px-4 text-center">{{ ("0000" + producto.idProducto).slice(-5) }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.nombre }}</td>
                            <td v-bind:class="producto.cantidad <= 100 ? ['bg-red-100', 'font-bold', 'text-red-900'] : (producto.cantidad <= 333 ? 'bg-yellow-100' : 'bg-green-100')" class="font-normal border-2 border-white px-4 text-center">{{ producto.cantidad }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.precioCompra ? producto.precioCompra.toFixed(2) : "-NO DEFINIDO-" }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.precioVenta  ? producto.precioVenta.toFixed(2) : "-NO DEFINIDO-" }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.fechaCaducidad ? (producto.fechaCaducidad.substring(0,10)).split("-").reverse().join("/") : "-NO DEFINIDO-" }}</td>
                            <td class="font-normal border-2 border-white px-6 text-center"><button @click="seleccionarProducto(producto._id)" class="font-bold hover:text-gray-300 anicon">n</button></td>
                            <td class="font-normal border-2 border-white px-6 text-center"><button @click="eliminarProducto(producto._id)" class="font-bold text-red-500 hover:text-red-300 font-mono">X</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="container mt-4">
                <div class="flex gap-4">
                    <div class="flex-auto text-center">
                        <div class="inline-block mr-2 w-6 h-4 bg-green-100"></div>
                        <span class="text-gray-400 text-sm">Stock disponible</span>
                    </div>
                    <div class="flex-auto text-center">
                        <div class="inline-block mr-2 w-6 h-4 bg-yellow-100"></div>
                        <span class="text-gray-400 text-sm">Stock regular</span>
                    </div>
                    <div class="flex-auto text-center">
                        <div class="inline-block mr-2 w-6 h-4 bg-red-100"></div>
                        <span class="text-gray-400 text-sm">Stock bajo</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="modificando && !onNew" class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto mb-4">
            <h1 class="font-bold text-4xl">Modificar productos</h1>
            <h3 class="text-gray-500 text-xl my-4 mb-8">Paso {{ stepCounter }} de {{ maxStep }}</h3>
            <form @submit.prevent="modificarProducto()">
                <div v-show="stepCounter == 1">
                    <div class="my-4">
                        <label class="uppercase">Nombre</label><br>
                        <input type="text" required v-model="producto.nombre" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        <label v-if="showRed" v-bind:class="producto.nombre ? ['hidden'] : ['block', 'text-xs','text-red-500']">Nombre no puede quedar vacío.</label>
                    </div>
                    <div class="my-4">
                        <label class="uppercase">Descripcion</label><br>
                        <input type="text" required v-model="producto.descripcion" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        <label v-if="showRed" v-bind:class="producto.descripcion ? ['hidden'] : ['block', 'text-xs','text-red-500']">Descripción no puede quedar vacía.</label>
                    </div>
                    <div class="grid grid-cols-2 gap-4 my-4">
                        <div class="col-span-1">
                            <label class="uppercase">Cantidad</label><br>
                            <input type="number" min="0" required v-model="producto.cantidad" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                            <label v-if="showRed" v-bind:class="producto.cantidad ? ['hidden'] : ['block', 'text-xs','text-red-500']">Cantidad no puede quedar vacía.</label>
                            <label v-if="showRed" v-bind:class="producto.cantidad >= 0 ? ['hidden'] : ['block', 'text-xs','text-red-500']">Cantidad no puede ser negativa.</label>
                            <label v-if="showRed" v-bind:class="producto.cantidad == parseInt(producto.cantidad, 10) ? ['hidden'] : ['block', 'text-xs','text-red-500']">Cantidad solo puede tomar valores enteros.</label>
                        </div>
                        <div class="col-span-1">
                            <label class="uppercase">Fecha caducidad</label><br>
                            <input type="date" v-model="reqFecha" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        </div>
                    </div>
                </div>

                <div v-show="stepCounter == 2">
                    <div class="grid grid-cols-2 gap-8 my-4">
                        <div class="col-span-1">
                            <label class="uppercase">Marca</label><i @click="newMarca = onNew = true" class="ml-4 fas fa-plus-circle hover:text-gray-400 cursor-pointer"></i><br>
                            <select v-model="producto.codigoMarca" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                                <option value="">Seleccionar marca</option>
                                <option v-for="(marca, it) in lista_marcas" :key="it" v-bind:value="marca.codigo">
                                    {{ marca.codigo }}: {{ marca.nombre }}
                                </option>
                            </select>
                        </div>
                        <div class="col-span-1">
                            <label class="uppercase">Proveedor</label><i @click="newProveedor = onNew = true" class="ml-4 fas fa-plus-circle hover:text-gray-400 cursor-pointer"></i><br>
                            <select v-model="producto.codigoProveedor" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                                <option value="">Seleccionar proveedor</option>
                                <option v-for="(proveedor, it) in lista_proveedores" :key="it" v-bind:value="proveedor.codigo">
                                    {{ proveedor.codigo }}: {{ proveedor.nombre }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="my-4">
                        <label class="uppercase">Seccion</label><i @click="newSeccion = onNew = true" class="ml-4 fas fa-plus-circle hover:text-gray-400 cursor-pointer"></i><br>
                        <select required v-model="producto.codigoSeccion" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                            <option aria-disabled="" value="">Seleccionar sección</option>
                            <option v-for="(seccion, it) in lista_secciones" :key="it" v-bind:value="seccion.codigo">
                                {{ seccion.codigo }}: {{ seccion.nombre }}
                            </option>
                        </select>
                        <label v-if="showRed" v-bind:class="producto.codigoSeccion ? ['hidden'] : ['block', 'text-xs','text-red-500']">Sección no puede quedar vacía.</label>
                    </div>
                    <div class="my-4">
                        <label class="uppercase">Categoria</label><i @click="newCategoria = onNew = true" class="ml-4 fas fa-plus-circle hover:text-gray-400 cursor-pointer"></i><br>
                        <select required v-model="producto.codigoCategoria" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                            <option disabled value="">Seleccionar categoría</option>
                            <option v-for="(categoria, it) in lista_categorias" :key="it" v-bind:value="categoria.codigo">
                                {{ categoria.codigo }}: {{ categoria.nombre }}
                            </option>
                        </select>
                        <label v-if="showRed" v-bind:class="producto.codigoCategoria ? ['hidden'] : ['block', 'text-xs','text-red-500']">Categoría no puede quedar vacía.</label>
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
                        <label v-if="showRed" v-bind:class="producto.idMedidaVenta ? ['hidden'] : ['block', 'text-xs','text-red-500']">Medida de venta no puede quedar vacía.</label>
                    </div>
                    <div class="grid grid-cols-2 gap-8 my-4">
                        <div class="col-span-1">
                            <label class="uppercase">Precio compra</label><br>
                            <input type="number" min="0.01" required v-model="producto.precioCompra" step="0.01" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                            <label v-if="showRed" v-bind:class="producto.precioCompra ? ['hidden'] : ['block', 'text-xs','text-red-500']">Precio de compra no puede quedar vacío.</label>
                            <label v-if="showRed" v-bind:class="producto.precioCompra >= 0 ? ['hidden'] : ['block', 'text-xs','text-red-500']">Precio de compra no puede ser negativo.</label>
                        </div>
                        <div class="col-span-1">
                            <label class="uppercase">Precio venta</label><br>
                            <input type="number" min="0.01" required v-model="producto.precioVenta" step="0.01" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                            <label v-if="showRed" v-bind:class="producto.precioVenta ? ['hidden'] : ['block', 'text-xs','text-red-500']">Precio de venta no puede quedar vacío.</label>
                            <label v-if="showRed" v-bind:class="parseFloat(producto.precioVenta) > parseFloat(producto.precioCompra) ? ['hidden'] : ['block', 'text-xs','text-red-500']">Precio de venta debe ser mayor a precio de compra.</label>
                            <label v-if="showRed" v-bind:class="producto.precioVenta >= 0 ? ['hidden'] : ['block', 'text-xs','text-red-500']">Precio de venta no puede ser negativo.</label>
                        </div>
                    </div>
                    <div class="my-4">
                        <label class="uppercase">Precio mayorista</label><br>
                        <div class="grid grid-cols-9">
                            <input type="number" min="0.01" v-model="producto.precioMayorista" step="0.01" class="col-span-4 mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                            <span class="col-span-1 pt-3 font-bold text-center">X</span>
                            <input type="number" min="0" v-model="producto.cantidadMayorista" class="col-span-4 mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
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
                            <input type="number" v-model="producto.cantidadEquivalente" step="0.001" class="col-span-3 pl-2 py-1 rounded-full border-2 border-yellow-500">
                            <select v-model="producto.idMedidaAsociada" class="col-span-3 pl-2 py-1 rounded-full border-2 border-yellow-500">
                                <option value="">Seleccionar medida de venta</option>
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
                    <button type="button" @click="modificando = false" v-show="stepCounter == 1" class="bg-red-500 hover:bg-red-400 rounded-2xl p-4 font-bold text-white text-xl">Cancelar</button>
                    <button type="button" v-show="stepCounter > 1" @click="goToPaso(-1)" class="bg-yellow-500 hover:bg-yellow-400 rounded-2xl p-4 font-bold text-white text-xl">Anterior</button>
                    <button type="button" v-show="stepCounter < maxStep" @click="goToPaso(1)" v-bind:class="nextIsDisabled ? ['bg-gray-300', 'hover:bg-gray-300', 'text-gray-200', 'cursor-not-allowed'] : ['bg-yellow-500', 'hover:bg-yellow-400']" class="rounded-2xl p-4 font-bold text-white text-xl">Siguiente</button>
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
    constructor(obj){
        this.nombre = obj.nombre;
        this.descripcion = obj.descripcion;
        this.cantidad = obj.cantidad;
        this.fechaCaducidad = obj.fechaCaducidad;

        this.codigoMarca = obj.codigoMarca;
        this.codigoProveedor = obj.codigoProveedor;

        this.precioCompra = obj.precioCompra;
        this.precioVenta = obj.precioVenta;
        this.precioMayorista = obj.precioMayorista;
        this.cantidadMayorista = obj.cantidadMayorista;

        this.codigoSeccion = obj.codigoSeccion;
        this.codigoCategoria = obj.codigoCategoria;
        this.idMedidaVenta = obj.idMedidaVenta;

        this.cantidadEquivalente = obj.cantidadEquivalente;
        this.idMedidaAsociada = obj.idMedidaAsociada;
        this.codigoBarras = obj.codigoBarras;
        this.idProducto = obj.idProducto;
    }
}

export default {
    data(){
        return {
            producto : new Producto({
                nombre : "",
                descripcion : "",
                cantidad : null,
                fechaCaducidad : null,

                codigoMarca : null,
                codigoProveedor : null,

                precioCompra : null,
                precioVenta : null,
                precioMayorista : null,
                cantidadMayorista : null,

                codigoSeccion : null,
                codigoCategoria : null,

                idMedidaVenta : "",
                cantidadEquivalente: null,
                idMedidaAsociada: "",
                codigoBarras: undefined,
                idProducto: null
            }),

            onNew: false,
            newMarca: false,
            newProveedor: false,
            newSeccion: false,
            newCategoria: false,
            newMedida: false,
            nextIsDisabled: true,
            showRed: false,

            p_marca: {},
            p_proveedor: {},
            p_seccion: {},
            p_categoria: {},
            p_medidaVenta: {},

            lista_productos: [],
            lista_marcas: [],
            lista_proveedores: [],
            lista_categorias: [],
            lista_secciones: [],
            lista_medidas: [],

            stockState: 0,
            stepCounter: 1,
            maxStep: 5,
            modificando: false,
            reqProducto: "",
            reqFecha: null,
            query: "",
            filtro: 0,
        }
    },
    created(){
        this.obtenerProductos();
        this.obtenerMarcas();
        this.obtenerProveedores();
        this.obtenerSecciones();
        this.obtenerCategorias();
        this.obtenerMedidasVenta();

        this.interval = setInterval(() => this.validacion(), 100);
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
        obtenerProductos(){
            fetch('/api/productos')
                .then(res => res.json())
                .then(data => {
                    this.lista_productos = data;
                })
        },
        obtenerCategorias(){
            fetch('/api/categorias')
                .then(res => res.json())
                .then(data => {
                    this.lista_categorias = data;
                });
        },
        obtenerSecciones(){
            fetch('/api/secciones')
                .then(res => res.json())
                .then(data => {
                    this.lista_secciones = data;
                })
        },
        obtenerMedidasVenta(){
            fetch('/api/medidas-venta')
                .then(res => res.json())
                .then(data => {
                    this.lista_medidas = data;
                })
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

        seleccionarProducto(id){
            fetch('/api/productos/' + id)
                .then(res => res.json())
                .then(data => {
                    this.producto = new Producto(data);
                    this.reqProducto = data._id;
                    this.reqFecha = moment(this.producto.fechaCaducidad).format('YYYY-MM-DD');
                    this.modificando = true;
                })
        },
        modificarProducto(){
            this.fixFecha();
            let codigoSeccionF = ("00" + this.producto.codigoSeccion).slice(-3);
            let codigoCategoriaF = ("00" + this.producto.codigoCategoria).slice(-3);
            this.producto.idProducto = codigoSeccionF + codigoCategoriaF + this.producto.idProducto.slice(6);
            fetch('api/productos/' + this.reqProducto, {
                method: 'PUT',
                body:   JSON.stringify(this.producto),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.obtenerProductos();
            });
            this.stepCounter = 1;
            this.modificando = false;
        },
        eliminarProducto(id){
            fetch('/api/productos/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.obtenerProductos();
            });
        },

        goToPaso(paso){
            if(paso == 1 && !this.showRed){
                this.showRed = true;
            }
            if(paso == 1 && this.nextIsDisabled){
                return;
            }

            if(paso == 1){ this.showRed = false; }
            if(paso == -1){ this.showRed = true; }

            this.stepCounter = this.stepCounter + paso;
            this.stepCounter = Math.min(Math.max(this.stepCounter, 1), this.maxStep);
        },

        validacion(){
            switch(this.stepCounter){
                case 1:
                    if(
                        this.producto.nombre &&
                        this.producto.descripcion &&
                        this.producto.cantidad &&
                        this.producto.cantidad >= 0 &&
                        this.producto.cantidad == parseInt(this.producto.cantidad, 10)
                    ){
                        this.nextIsDisabled = false;
                    }
                    else{
                        this.nextIsDisabled = true;
                    }
                    break;
                
                case 2:
                    if(
                        this.producto.codigoSeccion &&
                        this.producto.codigoCategoria
                    ){
                        this.nextIsDisabled = false;
                    }
                    else{
                        this.nextIsDisabled = true;
                    }
                    break;

                case 3:
                    if(
                        this.producto.idMedidaVenta &&
                        this.producto.precioCompra &&
                        this.producto.precioCompra >= 0 &&
                        this.producto.precioVenta &&
                        this.producto.precioVenta >= 0 &&
                        parseFloat(this.producto.precioVenta) > parseFloat(this.producto.precioCompra)
                    ){
                        this.nextIsDisabled = false;
                    }
                    else{
                        this.nextIsDisabled = true;
                    }
                    break;
            }
        },

        fixFecha(){
            if(
                this.producto.fechaCaducidad &&
                this.reqFecha &&
                typeof this.producto.fechaCaducidad != 'undefined' &&
                typeof this.reqFecha != 'undefined'
            ){
                this.producto.fechaCaducidad = moment(this.reqFecha).format();
            }
            else{
                this.reqFecha = null;
                this.producto.fechaCaducidad = null;
            }
        },

        buscarProducto(){
            if(this.query != ""){
                fetch('/buscar/producto/' + this.query)
                    .then(res => res.json())
                    .then(data => {
                        this.lista_productos = data;
                    });
            }
            else{
                this.obtenerProductos();
            }
        },
        ordenarProductos(prop, orden='asc'){
            return function innerSort(a,b){
                if(!a.hasOwnProperty(prop) || !b.hasOwnProperty(prop)){
                    return 0;
                }
            
                const varA = (typeof a[prop] === 'string') ? a[prop].toUpperCase() : a[prop];
                const varB = (typeof b[prop] === 'string') ? b[prop].toUpperCase() : b[prop];

                let comp = 0;
                if(varA > varB){
                    comp = 1;
                }
                else if(varA < varB){
                    comp = -1
                }
                return(
                    (orden === 'desc') ? (comp * -1) : comp
                );
            }
        },
        filtrarProductos(){
            switch(this.filtro){
                case "0":
                    this.obtenerProductos();
                    break;
                case "1":
                    this.lista_productos.sort(this.ordenarProductos('nombre'));
                    break;
                case "2":
                    this.lista_productos.sort(this.ordenarProductos('nombre', 'desc'));
                    break;
                case "3":
                    this.lista_productos.sort(this.ordenarProductos('idProducto', 'asc'));
                    break;
                case "4":
                    this.lista_productos.sort(this.ordenarProductos('idProducto', 'desc'));
                    break;
            }
        }
    }
}
</script>