import Vue from 'vue';
import NavBar from './components/NavBar.vue';
import Productos from './components/Productos.vue';

import RegistrarProductos from './components/registro/RegistrarProductos.vue';
import NuevoProducto from './components/registro/NuevoProducto.vue';
import ImportarProductos from './components/registro/ImportarProductos.vue';

new Vue({
    el: '#nav',
    render: h => h(NavBar),
});

new Vue({
    el: "#product-table",
    render: h => h(Productos),
});

new Vue({
    el: "#register-view",
    render: h => h(RegistrarProductos),
});

new Vue({
    el: "#register-single-product",
    render: h => h(NuevoProducto),
});

new Vue({
    el: "#import-products",
    render: h => h(ImportarProductos),
});