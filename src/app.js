import Vue from 'vue';

import NavBar from './components/NavBar.vue';
import DesktopMenu from './components/DesktopMenu.vue';

import Productos from './components/Productos.vue';

import NuevoProducto from './components/registro/NuevoProducto.vue';
import ImportarProductos from './components/registro/ImportarProductos.vue';

import Marcas from './components/registro/Marcas.vue';
import Proveedores from './components/registro/Proveedores.vue';
import Secciones from './components/registro/Secciones.vue';
import Categorias from './components/registro/Categorias.vue';
import MedidasVenta from './components/registro/MedidasVenta.vue';

new Vue({
    el: '#nav',
    render: h => h(NavBar),
});

new Vue({
    el: '#desktop-menu',
    render: h => h(DesktopMenu),
})

new Vue({
    el: "#product-table",
    render: h => h(Productos),
});

new Vue({
    el: "#register-single-product",
    render: h => h(NuevoProducto),
});

new Vue({
    el: "#import-products",
    render: h => h(ImportarProductos),
});

new Vue({
    el: "#marcas-view",
    render: h => h(Marcas),
});

new Vue({
    el: "#proveedores-view",
    render: h => h(Proveedores),
});

new Vue({
    el: "#secciones-view",
    render: h => h(Secciones),
});

new Vue({
    el: "#categorias-view",
    render: h => h(Categorias),
});

new Vue({
    el: "#medidas-view",
    render: h => h(MedidasVenta),
});