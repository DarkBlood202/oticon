<template>
    <div>
        <!-- Menu -->
        <div v-show="menu" class="bg-white w-screen h-screen">
            <div class="bg-yellow-500 text-white px-4 py-3 w-full flex flex-row-reverse">
                <button @click="cerrarMenu" class="font-bold text-2xl sm:px-2">✕</button>
                <span class="flex-shrink-0 flex-grow font-bold text-2xl">Menú</span>
            </div>
            <a href="" class="hover:bg-gray-100 p-4 text-xl block w-full">
                Mi cuenta
                </a>
            <a href="/productos/registrar" class="hover:bg-gray-100 p-4 text-xl block w-full">
                Registrar producto
            </a>
            <a href="" class="hover:bg-gray-100 p-4 text-xl block w-full">
                Vender producto
            </a>
            <a href="/productos" class="hover:bg-gray-100 p-4 text-xl block w-full">
                Lista de productos
            </a>
            <a href="" class="hover:bg-gray-100 p-4 text-xl block w-full">
                Reportes
            </a>
            <a href="" class="hover:bg-gray-100 p-4 text-xl block w-full">
                Cerrar sesión
            </a>
        </div>

        <!-- TopBar -->
        <nav v-show="!menu" class="bg-yellow-500 text-white px-4 py-2 mb-4 w-full">
            <div class="flex gap-4 items-center">
                <a href="/" class="flex-grow font-bold text-2xl">OTICON</a>
                <div class="flex-shrink-0">Usuario</div>
                <button @click="abrirMenu" class="font-bold text-4xl sm:px-2 anicon">E</button>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    data(){
        return {
            menu: false,
        }
    },
    methods: {
        abrirMenu(){
            this.menu = true;
        },
        cerrarMenu(){
            this.menu = false;
        }
    }
}
</script>