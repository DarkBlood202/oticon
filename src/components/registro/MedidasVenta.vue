<template>
    <div>
        <div v-show="!modificando && !agregando" class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto">
            <h1 class="font-bold text-4xl">Medidas de venta<i @click="agregando = true" class="text-3xl ml-4 fas fa-plus-circle hover:text-gray-400 cursor-pointer"></i></h1>
            <i class="absolute ml-2.5 mt-6 fas fa-search"></i>
            <form class="flex my-4 mb-8 gap-4">
                <input @input="buscarMedida" v-model="query" type="text" placeholder="Buscar..." class="rounded-full border-2 border-yellow-500 pl-7 px-4 py-1 w-3/5">
                <select v-model="filtro" class="rounded-full border-2 border-yellow-500 px-4 py-1 w-2/5">
                    <option value="0">Ordenar por...</option>
                    <option value="1">A-Z</option>
                    <option value="2">Z-A</option>
                </select>
            </form>
            <div class="flex flex-nowrap overflow-x-auto">
                <table class="bg-gray-100 rounded-3xl text-sm w-full">
                    <tbody>
                        <tr v-for="(medida, it) in lista_medidas" :key="it">
                            <td class="font-normal border-2 border-white px-4 text-center">{{ medida.nombre }} ({{ medida.abreviacion }})</td>
                            <td class="font-normal border-2 border-white px-6 text-center"><button @click="seleccionarMedida(medida._id)" class="font-bold hover:text-gray-300 anicon">n</button></td>
                            <td class="font-normal border-2 border-white px-6 text-center"><button @click="eliminarMedida(medida._id)" class="font-bold text-red-500 hover:text-red-300 font-mono">X</button></td>
                        </tr>
                    </tbody>
                </table>    
            </div>
        </div>
        <div v-show="modificando">
            <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto mb-4">
                <h1 class="font-bold text-4xl">Modificar medida de venta</h1>
                <form @submit.prevent="modificarMedida">
                    <div class="my-4">
                        <label class="uppercase">Nombre</label>
                        <input type="text" required v-model="medida.nombre" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                    </div>
                    <div class="my-4">
                        <label class="uppercase">Abreviación</label>
                        <input type="text" required v-model="medida.abreviacion" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
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
                <h1 class="font-bold text-4xl">Agregar medida de venta</h1>
                <form @submit.prevent="agregarMedida">
                    <div class="my-4">
                        <label class="uppercase">Nombre</label>
                        <input type="text" required v-model="n_medida.nombre" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                    </div>
                    <div class="my-4">
                        <label class="uppercase">Abreviación</label>
                        <input type="text" required v-model="n_medida.abreviacion" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
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

class MedidaVenta{
    constructor(obj){
        this.nombre = obj.nombre;
        this.abreviacion = obj.abreviacion;
    }
}

export default {
    data(){
        return {
            lista_medidas: [],
            query: "",
            filtro: 0,

            medida: {},
            n_medida: {},
            selected: null,
            modificando: false,
            agregando: false,
        }
    },
    created(){
        this.obtenerMedidas();
    },
    methods: {
        obtenerMedidas(){
            axios.get('/api/medidas-venta')
                .then(res => {
                    this.lista_medidas = res.data;
                });
        },
        buscarMedida(){
            if(this.query != ""){
                axios.get('/buscar/medidas-venta/' + this.query)
                    .then(res => {
                        this.lista_medidas = res.data;
                    });
            }
            else{
                this.obtenerMedidas();
            }
        },
        eliminarMedida(id){
            axios.delete('/api/medidas-venta/' + id)
                .then(res => {
                    this.obtenerMedidas();
                });
        },
        seleccionarMedida(id){
            axios.get('/api/medidas-venta/' + id)
                .then(res => {
                    this.medida = new MedidaVenta(res.data);
                    this.selected = res.data._id
                    this.modificando = true;
                });
        },
        modificarMedida(){
            axios.put('/api/medidas-venta/' + this.selected, this.medida)
                .then(res => {
                    this.obtenerMedidas();
                    this.modificando = false;
                });
        },
        agregarMedida(){
            axios.post('/api/medidas-venta', this.n_medida)
                .then(res => {
                    this.n_medida = {};
                    this.obtenerMedidas();
                    this.agregando = false;
                });
        },
    }
}
</script>