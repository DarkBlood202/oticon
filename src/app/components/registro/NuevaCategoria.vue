<template>
    <div>
        <div class="container bg-white rounded-xl shadow-md p-4 px-6">
            <h1 class="font-bold text-4xl">Agregar nueva categoria</h1>
            <form>
                <div class="my-4">
                    <label class="uppercase">Nombre</label><br>
                    <input type="text" v-model="categoria.nombre" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                </div>
                <div class="my-4">
                    <label class="uppercase">Codigo</label><br>
                    <input type="text" v-model="categoria.codigo" class="mt-1 pl-2 py-1 rounded-full border-2 border-yellow-500 w-full">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            categoria: {}
        }
    }
}
</script>