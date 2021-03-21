<template>
    <div>
        <div v-show="!modificando && !agregando" class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto">
            <h1 class="font-bold text-4xl">Proveedores<i @click="agregando = true" class="text-3xl ml-4 fas fa-plus-circle hover:text-gray-400 cursor-pointer"></i></h1>
            <i class="absolute ml-2.5 mt-6 fas fa-search"></i>
            <form class="flex my-4 mb-8 gap-4">
                <input @input="buscarProveedor" v-model="query" type="text" placeholder="Buscar..." class="rounded-full border-2 border-yellow-500 pl-7 px-4 py-1 w-3/5">
                <select v-model="filtro" class="rounded-full border-2 border-yellow-500 px-4 py-1 w-2/5">
                    <option value="0">Ordenar por...</option>
                    <option value="1">A-Z</option>
                    <option value="2">Z-A</option>
                </select>
            </form>
            <div class="flex flex-nowrap overflow-x-auto">
                <table class="bg-gray-100 rounded-3xl text-sm w-full">
                    <tbody>
                        <tr v-for="(proveedor, it) in lista_proveedores" :key="it">
                            <td class="font-normal border-2 border-white px-4 text-center">{{ proveedor.nombre }}</td>
                            <td class="font-normal border-2 border-white px-6 text-center"><button @click="seleccionarProveedor(proveedor.codigo)" class="font-bold hover:text-gray-300 anicon">n</button></td>
                            <td class="font-normal border-2 border-white px-6 text-center"><button @click="eliminarProveedor(proveedor.codigo)" class="font-bold text-red-500 hover:text-red-300 font-mono">X</button></td>
                        </tr>
                    </tbody>
                </table>    
            </div>
        </div>
        <div v-show="modificando">
            <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto mb-4">
                <h1 class="font-bold text-4xl">Modificar proveedor</h1>
                <form @submit.prevent="modificarProveedor">
                    <div class="my-4">
                        <label class="uppercase">Nombre</label>
                        <input type="text" @input="buscarProveedorExacto" required v-model="proveedor.nombre" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        <label v-if="showRed" v-bind:class="!exists ? ['hidden'] : ['block', 'text-xs','text-red-500']">Proveedor ya existente.</label>
                        <label v-if="showRed" v-bind:class="proveedor.nombre ? ['hidden'] : ['block', 'text-xs','text-red-500']">Proveedor no puede quedar vacía.</label>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-10 mb-2">
                        <button type="button" @click="modificando = false" class="bg-red-500 hover:bg-red-400 rounded-2xl p-4 font-bold text-white text-xl">Cancelar</button>
                        <button type="submit" v-bind:class="modIsDisabled ? ['bg-gray-300', 'hover:bg-gray-300', 'text-gray-200', 'cursor-not-allowed'] : ['bg-indigo-500', 'hover:bg-indigo-400']" class="rounded-2xl p-4 font-bold text-white text-xl">Modificar</button>
                    </div>
                </form>
            </div>
        </div>
        <div v-show="agregando">
            <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto mb-4">
                <h1 class="font-bold text-4xl">Agregar proveedor</h1>
                <form @submit.prevent="agregarProveedor">
                    <div class="my-4">
                        <label class="uppercase">Nombre</label>
                        <input type="text" @input="buscarProveedorExacto" required v-model="n_proveedor.nombre" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        <label v-if="showRed" v-bind:class="!exists ? ['hidden'] : ['block', 'text-xs','text-red-500']">Proveedor ya existente.</label>
                        <label v-if="showRed" v-bind:class="n_proveedor.nombre ? ['hidden'] : ['block', 'text-xs','text-red-500']">Proveedor no puede quedar vacía.</label>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-10 mb-2">
                        <button type="button" @click="agregando = false" class="bg-red-500 hover:bg-red-400 rounded-2xl p-4 font-bold text-white text-xl">Cancelar</button>
                        <button type="submit" v-bind:class="addIsDisabled ? ['bg-gray-300', 'hover:bg-gray-300', 'text-gray-200', 'cursor-not-allowed'] : ['bg-indigo-500', 'hover:bg-indigo-400']" class="rounded-2xl p-4 font-bold text-white text-xl">Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require ('axios');

class Proveedor{
    constructor(obj){
        this.nombre = obj.nombre;
        this.codigo = obj.codigo;
    }
}

export default {
    data(){
        return {
            lista_proveedores: [],
            query: "",
            filtro: 0,

            proveedor: {},
            n_proveedor: {},
            selected: null,
            modificando: false,
            agregando: false,

            exists: false,
            addIsDisabled: true,
            modIsDisabled: true,
            showRed: false,
        }
    },
    created(){
        this.obtenerProveedores();

        this.interval = setInterval(() => this.validacion(), 100);
    },
    methods: {
        obtenerProveedores(){
            axios.get('/api/proveedores')
                .then(res => {
                    this.lista_proveedores = res.data;
                });
        },
        buscarProveedor(){
            if(this.query != ""){
                axios.get('/buscar/proveedor/' + this.query)
                    .then(res => {
                        this.lista_proveedores = res.data;
                    });
            }
            else{
                this.obtenerProveedores();
            }
        },
        buscarProveedorExacto(){
            if(!this.showRed){ this.showRed = true; }
            if(this.agregando){
                if(this.n_proveedor.nombre != ""){
                    axios.get('/buscar/proveedor-e/' + this.n_proveedor.nombre)
                        .then(res => {
                            if(res.data[0]){
                                if(this.n_proveedor.nombre == res.data[0].nombre){
                                    this.exists = true;
                                }
                                else{
                                    this.exists = false;
                                }
                            }
                            else{
                                this.exists = false;
                            }
                        });
                }
            }
            else if(this.modificando){
                if(this.proveedor.nombre != ""){
                    axios.get('/buscar/proveedor-e/' + this.proveedor.nombre)
                        .then(res => {
                            if(res.data[0]){
                                if(this.proveedor.nombre == res.data[0].nombre){
                                    this.exists = true;
                                }
                                else{
                                    this.exists = false;
                                }
                            }
                            else{
                                this.exists = false;
                            }
                        });
                }
            }
            
        },
        eliminarProveedor(codigo){
            axios.delete('/api/proveedores/' + codigo)
                .then(res => {
                    this.obtenerProveedores();
                });
        },
        seleccionarProveedor(codigo){
            axios.get('/api/proveedores/' + codigo)
                .then(res => {
                    this.proveedor = new Proveedor(res.data[0]);
                    this.selected = res.data[0].codigo
                    this.modificando = true;
                });
        },
        modificarProveedor(){
            if(!this.modIsDisabled){
                axios.put('/api/proveedores/' + this.selected, this.proveedor)
                .then(res => {
                    this.obtenerProveedores();
                    this.modificando = false;
                });
            }
        },
        agregarProveedor(){
            if(!this.addIsDisabled){
                axios.post('/api/proveedores', this.n_proveedor)
                .then(res => {
                    this.n_proveedor = {};
                    this.obtenerProveedores();
                    this.agregando = false;
                });
            }
        },

        validacion(){
            if(this.agregando){
                if(
                    !this.n_proveedor.nombre ||
                    this.exists
                ){
                    this.addIsDisabled = true;
                }
                else{
                    this.addIsDisabled = false;
                }
            }
            else if(this.modificando){
                if(
                    !this.proveedor.nombre ||
                    this.exists
                ){
                    this.modIsDisabled = true;
                }
                else{
                    this.modIsDisabled = false;
                }
            }
            
        },
    }
}
</script>