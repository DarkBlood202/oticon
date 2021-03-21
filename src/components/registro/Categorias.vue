<template>
    <div>
        <div v-show="!modificando && !agregando" class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto">
            <h1 class="font-bold text-4xl">Categorías<i @click="agregando = true" class="text-3xl ml-4 fas fa-plus-circle hover:text-gray-400 cursor-pointer"></i></h1>
            <i class="absolute ml-2.5 mt-6 fas fa-search"></i>
            <form class="flex my-4 mb-8 gap-4">
                <input @input="buscarCategoria" v-model="query" type="text" placeholder="Buscar..." class="rounded-full border-2 border-yellow-500 pl-7 px-4 py-1 w-3/5">
                <select v-model="filtro" class="rounded-full border-2 border-yellow-500 px-4 py-1 w-2/5">
                    <option value="0">Ordenar por...</option>
                    <option value="1">A-Z</option>
                    <option value="2">Z-A</option>
                </select>
            </form>
            <div class="flex flex-nowrap overflow-x-auto">
                <table class="bg-gray-100 rounded-3xl text-sm w-full">
                    <tbody>
                        <tr v-for="(categoria, it) in lista_categorias" :key="it">
                            <td class="font-normal border-2 border-white px-4 text-center">{{ categoria.nombre }}</td>
                            <td class="font-normal border-2 border-white px-6 text-center"><button @click="seleccionarCategoria(categoria.codigo)" class="font-bold hover:text-gray-300 anicon">n</button></td>
                            <td class="font-normal border-2 border-white px-6 text-center"><button @click="eliminarCategoria(categoria.codigo)" class="font-bold text-red-500 hover:text-red-300 font-mono">X</button></td>
                        </tr>
                    </tbody>
                </table>    
            </div>
        </div>
        <div v-show="modificando">
            <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto mb-4">
                <h1 class="font-bold text-4xl">Modificar categoría</h1>
                <form @submit.prevent="modificarCategoria">
                    <div class="my-4">
                        <label class="uppercase">Nombre</label>
                        <input type="text" @input="buscarCategoriaExacta" required v-model="categoria.nombre" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        <label v-if="showRed" v-bind:class="!exists ? ['hidden'] : ['block', 'text-xs','text-red-500']">Categoría ya existente.</label>
                        <label v-if="showRed" v-bind:class="categoria.nombre ? ['hidden'] : ['block', 'text-xs','text-red-500']">Categoría no puede quedar vacía.</label>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-10 mb-2">
                        <button type="button" @click="modificando = false" class="bg-red-500 hover:bg-red-400 rounded-2xl p-4 font-bold text-white text-xl">Cancelar</button>
                        <button type="submit" v-bind:class="modIsDisabled ? ['bg-gray-300', 'hover:bg-gray-300', 'text-gray-200', 'cursor-not-allowed'] : ['bg-indigo-500', 'hover:bg-indigo-400']" class="rounded-2xl p-4 font-bold text-white text-xl">Agregar</button>
                    </div>
                </form>
            </div>
        </div>
        <div v-show="agregando">
            <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto mb-4">
                <h1 class="font-bold text-4xl">Agregar categoría</h1>
                <form @submit.prevent="agregarCategoria">
                    <div class="my-4">
                        <label class="uppercase">Nombre</label>
                        <input type="text" @input="buscarCategoriaExacta" required v-model="n_categoria.nombre" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                        <label v-if="showRed" v-bind:class="!exists ? ['hidden'] : ['block', 'text-xs','text-red-500']">Categoría ya existente.</label>
                        <label v-if="showRed" v-bind:class="n_categoria.nombre ? ['hidden'] : ['block', 'text-xs','text-red-500']">Categoría no puede quedar vacía.</label>
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
const axios = require('axios');

class Categoria{
    constructor(obj){
        this.nombre = obj.nombre;
        this.codigo = obj.codigo;
    }
}

export default {
    data(){
        return {
            lista_categorias: [],
            query: "",
            filtro: 0,

            categoria: {},
            n_categoria: {},
            selected: "",
            modificando: false,
            agregando: false,

            exists: false,
            addIsDisabled: true,
            modIsDisabled: true,
            showRed: false,
        }
    },
    created(){
        this.obtenerCategorias();

        this.interval = setInterval(() => this.validacion(), 100);
    },
    methods: {
        obtenerCategorias(){
            axios.get('/api/categorias')
                .then(res => {
                    this.lista_categorias = res.data;
                });
        },
        buscarCategoria(){
            if(this.query != ""){
                axios.get('/buscar/categoria/' + this.query)
                    .then(res => {
                        this.lista_categorias = res.data;
                    });
            }
            else{
                this.obtenerCategorias();
            }
        },
        buscarCategoriaExacta(){
            if(!this.showRed){ this.showRed = true; }
            if(this.agregando){
                if(this.n_categoria.nombre != ""){
                    axios.get('/buscar/categoria-e/' + this.n_categoria.nombre)
                        .then(res => {
                            if(res.data[0]){
                                if(this.n_categoria.nombre == res.data[0].nombre){
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
                if(this.categoria.nombre != ""){
                    axios.get('/buscar/categoria-e/' + this.categoria.nombre)
                        .then(res => {
                            if(res.data[0]){
                                if(this.categoria.nombre == res.data[0].nombre){
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
        eliminarCategoria(codigo){
            axios.delete('/api/categorias/' + codigo)
                .then(res => {
                    this.obtenerCategorias();
                });
        },
        seleccionarCategoria(codigo){
            axios.get('/api/categorias/' + codigo)
                .then(res => {
                    this.categoria = new Categoria(res.data[0]);
                    this.selected = res.data[0].codigo
                    this.modificando = true;
                });
        },
        modificarCategoria(){
            if(!this.modIsDisabled){
                axios.put('/api/categorias/' + this.selected, this.categoria)
                .then(res => {
                    this.obtenerCategorias();
                    this.modificando = false;
                });
            }
        },
        agregarCategoria(){
            if(!this.addIsDisabled){
                axios.post('/api/categorias', this.n_categoria)
                .then(res => {
                    this.n_categoria = {};
                    this.obtenerCategorias();
                    this.agregando = false;
                });
            }
        },

        validacion(){
            if(this.agregando){
                if(
                    !this.n_categoria.nombre ||
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
                    !this.categoria.nombre ||
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