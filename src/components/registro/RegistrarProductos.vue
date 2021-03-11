<template>
    <div>
        <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto mb-4">
            <h1 class="font-bold text-4xl">Registro de Productos</h1>
            <h3 class="text-gray-500 text-xl my-4 mb-8">¿Qué desea hacer?</h3>
            <div class="text-white font-bold text-xl text-center sm:text-2xl grid grid-cols-2 gap-4 my-4">
                <a href="/productos/registrar/nuevo" class="bg-yellow-500 hover:bg-yellow-400 rounded-2xl py-4 anicon">
                    <span class="text-4xl">a</span><br>
                    <span class="font-sans">Registrar nuevo producto</span>
                </a>
                <a href="/productos/registrar/importar" class="bg-yellow-500 hover:bg-yellow-400 rounded-2xl py-4 anicon">
                    <span class="text-4xl">c</span><br>
                    <span class="font-sans">Importar productos desde una hoja de datos</span>
                </a>
            </div>
        </div>
    </div>
</template>