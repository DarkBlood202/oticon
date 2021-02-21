<template>
    <div>
        <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto h-screen mb-4">
            <h1 class="font-bold text-4xl">Registro de Productos</h1>
            <h3 class="text-gray-500 text-xl my-4 mb-8">Paso {{ stepCounter }} de 4</h3>
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
                            <label class="uppercase">Marca</label><br>
                            <input type="text" required v-model="producto.marca" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        </div>
                        <div class="col-span-1">
                            <label class="uppercase">Proveedor</label><br>
                            <input type="text" required v-model="producto.proveedor" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        </div>
                    </div>
                    <div class="my-4">
                        <label class="uppercase">Seccion</label><br>
                        <select required v-model="producto.codigoSeccion" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                            <option aria-disabled="" value="">Seleccionar sección</option>
                            <option v-for="(seccion, it) in lista_secciones" :key="it" v-bind:value="seccion.codigo">
                                {{ seccion.codigo }}: {{ seccion.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="my-4">
                        <label class="uppercase">Categoria</label><br>
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
                        <label class="uppercase">Medida de venta</label><br>
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
                            <input type="number" required v-model="producto.unidadEquivalente.cantidadEquivalente" step="0.001" class="col-span-3 pl-2 py-1 rounded-full border-2 border-yellow-500">
                            <select required v-model="producto.unidadEquivalente.idMedidaAsociada" class="col-span-3 pl-2 py-1 rounded-full border-2 border-yellow-500">
                                <option disabled value="">Seleccionar medida de venta</option>
                                <option v-for="(medida, it) in lista_medidas" :key="it" v-bind:value="medida._id">
                                    {{ medida.nombre }} ({{ medida.abreviacion }})
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4 mt-10 mb-2">
                    <a href="/productos/registrar" v-show="stepCounter == 1" class="bg-red-500 hover:bg-red-400 rounded-2xl p-4 font-bold text-white text-center text-xl">Cancelar</a>
                    <button type="button" v-show="stepCounter > 1" @click="goToPaso(-1)" class="bg-yellow-500 hover:bg-yellow-400 rounded-2xl p-4 font-bold text-white text-xl">Anterior</button>
                    <button type="button" v-show="stepCounter < 4" @click="goToPaso(1)" class="bg-yellow-500 hover:bg-yellow-400 rounded-2xl p-4 font-bold text-white text-xl">Siguiente</button>
                    <button type="submit" v-show="stepCounter == 4" class="bg-indigo-500 hover:bg-indigo-400 rounded-2xl p-4 font-bold text-white text-xl">Terminar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
class Producto{
    constructor(){
        this.nombre = "";
        this.descripcion = "";
        this.cantidad = null;
        this.fechaCaducidad = null;
        this.marca = "";
        this.proveedor = "";
        this.precioCompra = null;
        this.precioVenta = null;
        this.precioMayorista = null;
        this.cantidadMayorista = null;
        this.codigoSeccion = "";
        this.codigoCategoria = "";
        this.idMedidaVenta = "";
        this.unidadEquivalente = {
            cantidadEquivalente: null,
            idMedidaAsociada: ""
        };
        // this.id = "";
        // this.codigoBarras = "";
    }
}

export default {
    data(){
        return {
            stepCounter: 1,
            producto: new Producto(),
            lista_secciones: [],
            lista_categorias: [],
            lista_medidas: [],
        }
    },
    created(){
        this.stepCounter = 1;
        this.obtenerSecciones();
        this.obtenerCategorias();
        this.obtenerMedidasVenta();
    },
    methods: {
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
            this.stepCounter = Math.min(Math.max(this.stepCounter, 1), 4);
        },
        agregarProducto(){
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
        }
    }
}
</script>