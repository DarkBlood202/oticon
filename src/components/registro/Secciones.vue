<template>
    <div>
        <div v-show="!modificando && !agregando" class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto">
            <h1 class="font-bold text-4xl">Secciones<i @click="agregando = true" class="text-3xl ml-4 fas fa-plus-circle hover:text-gray-400 cursor-pointer"></i></h1>
            <i class="absolute ml-2.5 mt-6 fas fa-search"></i>
            <form class="flex my-4 mb-8 gap-4">
                <input @input="buscarSeccion" v-model="query" type="text" placeholder="Buscar..." class="rounded-full border-2 border-yellow-500 pl-7 px-4 py-1 w-3/5">
                <select v-model="filtro" class="rounded-full border-2 border-yellow-500 px-4 py-1 w-2/5">
                    <option value="0">Ordenar por...</option>
                    <option value="1">A-Z</option>
                    <option value="2">Z-A</option>
                </select>
            </form>
            <div class="flex flex-nowrap overflow-x-auto">
                <table class="bg-gray-100 rounded-3xl text-sm w-full">
                    <tbody>
                        <tr v-for="(seccion, it) in lista_secciones" :key="it">
                            <td class="font-normal border-2 border-white px-4 text-center">{{ seccion.nombre }}</td>
                            <td class="font-normal border-2 border-white px-6 text-center"><button @click="seleccionarSeccion(seccion.codigo)" class="font-bold hover:text-gray-300 anicon">n</button></td>
                            <td class="font-normal border-2 border-white px-6 text-center"><button @click="eliminarSeccion(seccion.codigo)" class="font-bold text-red-500 hover:text-red-300 font-mono">X</button></td>
                        </tr>
                    </tbody>
                </table>    
            </div>
        </div>
        <div v-show="modificando">
            <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto mb-4">
                <h1 class="font-bold text-4xl">Modificar sección</h1>
                <form @submit.prevent="modificarSeccion">
                    <div class="my-4">
                        <label class="uppercase">Nombre</label>
                        <input type="text" required v-model="seccion.nombre" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-10 mb-2">
                        <button type="button" @click="modificando = false" class="bg-red-500 hover:bg-red-400 rounded-2xl p-4 font-bold text-white text-xl">Cancelar</button>
                        <button type="submit" class="bg-indigo-500 hover:bg-indigo-400 rounded-2xl p-4 font-bold text-white text-xl">Modificar</button>
                    </div>
                </form>
            </div>
        </div>
        <div v-show="agregando">
            <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto mb-4">
                <h1 class="font-bold text-4xl">Agregar sección</h1>
                <form @submit.prevent="agregarSeccion">
                    <div class="my-4">
                        <label class="uppercase">Nombre</label>
                        <input type="text" required v-model="n_seccion.nombre" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-10 mb-2">
                        <button type="button" @click="agregando = false" class="bg-red-500 hover:bg-red-400 rounded-2xl p-4 font-bold text-white text-xl">Cancelar</button>
                        <button type="submit" class="bg-indigo-500 hover:bg-indigo-400 rounded-2xl p-4 font-bold text-white text-xl">Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

class Seccion{
    constructor(obj){
        this.nombre = obj.nombre;
        this.codigo = obj.codigo;
    }
}

export default {
    data(){
        return {
            lista_secciones: [],
            query: "",
            filtro: 0,

            seccion: {},
            n_seccion: {},
            selected: null,
            modificando: false,
            agregando: false,
        }
    },
    created(){
        this.obtenerSecciones();
    },
    methods: {
        obtenerSecciones(){
            axios.get('/api/secciones')
                .then(res => {
                    this.lista_secciones = res.data;
                });
        },
        buscarSeccion(){
            if(this.query != ""){
                axios.get('/buscar/seccion/' + this.query)
                    .then(res => {
                        this.lista_secciones = res.data;
                    });
            }
            else{
                this.obtenerSecciones();
            }
        },
        eliminarSeccion(codigo){
            axios.delete('/api/secciones/' + codigo)
                .then(res => {
                    this.obtenerSecciones();
                });
        },
        seleccionarSeccion(codigo){
            axios.get('/api/secciones/' + codigo)
                .then(res => {
                    this.seccion = new Seccion(res.data[0]);
                    this.selected = res.data[0].codigo
                    this.modificando = true;
                });
        },
        modificarSeccion(){
            axios.put('/api/secciones/' + this.selected, this.seccion)
                .then(res => {
                    this.obtenerSecciones();
                    this.modificando = false;
                });
        },
        agregarSeccion(){
            axios.post('/api/secciones', this.n_seccion)
                .then(res => {
                    this.n_seccion = {};
                    this.obtenerSecciones();
                    this.agregando = false;
                });
        },
    }
}
</script>