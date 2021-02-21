<template>
    <div>
        <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto mb-4">
            <h1 class="font-bold text-4xl">Registro de Productos</h1>
            <h3 class="text-gray-500 text-xl my-4 mb-8">¿Qué desea hacer?</h3>
            <div class="text-white font-bold text-xl sm:text-2xl text-center grid grid-cols-2 gap-x-16 gap-y-2">
                <a href="/productos/registrar/nuevo" class="col-span-2 sm:col-span-1 bg-yellow-500 hover:bg-yellow-400 rounded-2xl p-4 sm:px-8 py-10 sm:py-32 my-4 anicon">
                    <span class="text-4xl">a</span>
                    <button class="font-sans">Deseo registrar un nuevo producto</button>
                </a>
                <a href="/productos/registrar/importar" class="col-span-2 sm:col-span-1 bg-yellow-500 hover:bg-yellow-400 rounded-2xl p-4 sm:px-8 py-10 sm:py-32 my-4 anicon">
                    <span class="text-4xl">c</span>
                    <button class="font-sans">Deseo importar productos desde una hoja de datos</button></a>
            </div>
        </div>
    </div>
</template>