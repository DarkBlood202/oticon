<template>
    <div>
        <div class="container bg-white rounded-xl shadow-md p-4 px-6">
            <h1 class="font-bold text-4xl">Registro de Productos</h1>
            <form @submit.prevent="agregarProducto">
                <div id="step-1">
                    <h3 class="text-gray-500 text-xl my-4 mb-8">Paso 1 de 3</h3>
                    <div class="my-4">
                        <label class="uppercase">Nombre</label><br>
                        <input type="text" v-model="producto.nombre" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                    </div>
                    <div class="my-4">
                        <label class="uppercase">Descripcion</label><br>
                        <input type="text" v-model="producto.descripcion" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                    </div>
                    <div class="grid grid-cols-2 gap-4 my-4">
                        <div class="col-span-1">
                            <label class="uppercase">Cantidad</label><br>
                            <input type="number" v-model="producto.cantidad" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        </div>
                        <div class="col-span-1">
                            <label class="uppercase">Fecha caducidad</label><br>
                            <input type="date" v-model="producto.fechaCaducidad" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        </div>
                    </div>
                </div>

                <div id="step-2">
                    <h3 class="text-gray-500 text-xl my-4 mt-16 mb-8">Paso 2 de 3</h3>
                    <div class="grid grid-cols-2 gap-8 my-4">
                        <div class="col-span-1">
                            <label class="uppercase">Marca</label><br>
                            <input type="text" v-model="producto.marca" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        </div>
                        <div class="col-span-1">
                            <label class="uppercase">Proveedor</label><br>
                            <input type="text" v-model="producto.proveedor" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        </div>
                    </div>
                    <div class="my-4">
                        <label class="uppercase">Seccion</label><br>
                        <select disabled class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                            <option value="">----</option>
                            <option value="">XX: Seccion 1</option>
                            <option value="">XX: Seccion 2</option>
                            <option value="">XX: Seccion 3</option>
                            <option value="">Nueva seccion...</option>
                        </select>
                    </div>
                    <div class="my-4">
                        <label class="uppercase">Categoria</label><br>
                        <select disabled class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                            <option value="">----</option>
                            <option value="">XX: Categoria 1</option>
                            <option value="">XX: Categoria 2</option>
                            <option value="">XX: Categoria 3</option>
                            <option value="">Nueva categoria...</option>
                        </select>
                    </div>
                </div>

                <div id="step-3">
                    <h3 class="text-gray-500 text-xl my-4 mt-16 mb-8">Paso 3 de 3</h3>
                    <div class="my-4">
                        <label class="uppercase">Medida de venta</label><br>
                        <select disabled class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                            <option value="">----</option>
                            <option value="">Kilogramos (kg)</option>
                            <option value="">Metros (m)</option>
                            <option value="">Litros (L)</option>
                            <option value="">Nueva medida...</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-2 gap-8 my-4">
                        <div class="col-span-1">
                            <label class="uppercase">Precio compra</label><br>
                            <input type="number" v-model="producto.precioCompra" step="0.01" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        </div>
                        <div class="col-span-1">
                            <label class="uppercase">Precio venta</label><br>
                            <input type="number" v-model="producto.precioVenta" step="0.01" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        </div>
                    </div>
                    <div class="my-4">
                        <label class="uppercase">Precio mayorista</label><br>
                        <div class="grid grid-cols-9">
                            <input type="number" v-model="producto.precioMayorista" step="0.01" class="col-span-4 mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                            <span class="col-span-1 pt-3 font-bold text-center">X</span>
                            <input type="number" v-model="producto.cantidadMayorista" class="col-span-4 mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                            <span class="col-end-9 sm:col-end-10 text-right text-xs uppercase">Unidades...</span>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4 mt-10 mb-2">
                    <button type="button" class="bg-red-500 hover:bg-red-400 rounded-2xl p-4 font-bold text-white text-xl">Cancelar</button>
                    <button type="button" class="bg-yellow-500 hover:bg-yellow-400 rounded-2xl p-4 font-bold text-white text-xl">Siguiente</button>
                    <button type="button" class="bg-yellow-500 hover:bg-yellow-400 rounded-2xl p-4 font-bold text-white text-xl">Anterior</button>
                    <button type="submit" class="bg-indigo-500 hover:bg-indigo-400 rounded-2xl p-4 font-bold text-white text-xl">Terminar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
// class Producto{
    // constructor(){
        // this.nombre = "";
        // this.descripcion = "";
        // this.cantidad = 0;
        // this.marca = "";
        // this.proveedor = "";
        // this.precioCompra = 0.00;
        // this.precioVenta = 0.00;
        // this.precioMayorista = 0.00;
        // this.cantidadMayorista = 0;
    // }
// }

export default {
    data(){
        return {
            // producto: new Producto();
            producto: {},
        }
    },
    methods: {
        agregarProducto(){
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
                    // this.producto = new Producto();
                    this.producto = {};
                });
        }
    }
}
</script>