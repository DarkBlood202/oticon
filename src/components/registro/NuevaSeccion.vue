<template>
    <div>
        <div class="container bg-white rounded-xl shadow-md p-4 px-6 m-auto">
            <h1 class="font-bold text-4xl">Agregar nueva sección</h1>
            <form @submit.prevent="agregarSeccion">
                <div class="my-4">
                    <label class="uppercase">Nombre</label><br>
                    <input type="text" required v-model="seccion.nombre" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                </div>
                <div class="my-4">
                    <label class="uppercase">Codigo</label><br>
                    <input type="text" required v-model="seccion.codigo" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                </div>
                <div class="grid grid-cols-2 gap-4 mt-10 mb-2">
                    <a href="/productos/registrar" class="col-span-1 mt-8 bg-red-500 hover:bg-red-400 rounded-2xl p-4 font-bold text-center text-white text-xl">Cancelar</a>
                    <button type="submit" class="col-span-1 col-end-3 mt-8 bg-indigo-500 hover:bg-indigo-400 rounded-2xl p-4 font-bold text-white text-xl">Terminar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            seccion: {},
        }
    },
    methods: {
        agregarSeccion(){
            fetch('/api/secciones', {
                method: 'POST',
                body: JSON.stringify(this.seccion),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.seccion = {}
            });
        }
    }
}
</script>