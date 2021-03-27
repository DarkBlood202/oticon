<template>
    <div>
        <div class="container bg-white rounded-xl shadow-md p-4 px-6 mx-auto mb-4">
            <h1 class="font-bold text-4xl">Reporte de Productos</h1>
            <div class="flex flex-nowrap overflow-x-auto my-4">
                <table class="bg-gray-100 rounded-3xl text-sm w-full">
                    <thead>
                        <tr>
                            <th class="border-2 border-white px-4">ID</th>
                            <th class="border-2 border-white px-4">Nombre</th>
                            <th class="border-2 border-white px-4">Descripción</th>
                            <th class="border-2 border-white px-4">Cantidad</th>
                            <th class="border-2 border-white px-4">Fecha de caducidad</th>
                            <th class="border-2 border-white px-4">Marca</th>
                            <th class="border-2 border-white px-4">Proveedor</th>
                            <th class="border-2 border-white px-4">Sección</th>
                            <th class="border-2 border-white px-4">Categoría</th>
                            <th class="border-2 border-white px-4">Medida de venta</th>
                            <th class="border-2 border-white px-4">Precio de compra</th>
                            <th class="border-2 border-white px-4">Precio de venta</th>
                            <th class="border-2 border-white px-4">Precio mayorista</th>
                            <th class="border-2 border-white px-4">Cantidad equivalente</th>
                            <th class="border-2 border-white px-4">Código de barras</th>
                            <th class="border-2 border-white px-4">Código antiguo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(producto, it) in lista_productos" :key="it">
                            <td class="font-normal border-2 border-white px-4 text-center">{{ ("0000" + producto.idProducto).slice(-5) }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.nombre }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.descripcion }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.cantidad }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.fechaCaducidad ? (producto.fechaCaducidad.substring(0,10)).split("-").reverse().join("/") : "No aplica" }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.codigoMarca ? getMarcaByCodigo(producto.codigoMarca) : "Sin marca" }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.codigoProveedor ? getProveedorByCodigo(producto.codigoProveedor) : "Sin proveedor" }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.codigoSeccion ? getSeccionByCodigo(producto.codigoSeccion) : "Sin sección" }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.codigoCategoria ? getCategoriaByCodigo(producto.codigoCategoria) : "Sin categoría" }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.idMedidaVenta ? getMedidaVentaByID(producto.idMedidaVenta).nombre + " (" + getMedidaVentaByID(producto.idMedidaVenta).abreviacion + ")" : "Sin medida de venta" }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.precioCompra ? producto.precioCompra.toFixed(2) : "No definido" }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.precioVenta ? producto.precioVenta.toFixed(2) : "No definido" }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.precioMayorista ? producto.precioMayorista.toFixed(2) + " (x" + producto.cantidadMayorista + ")" : "No definido" }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.cantidadEquivalente && producto.idMedidaAsociada ? producto.cantidadEquivalente + getMedidaVentaByID(producto.idMedidaAsociada) : "No definida" }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.codigoBarras ? producto.codigoBarras : "No tiene" }}</td>
                            <td class="font-normal border-2 border-white px-4 text-center">{{ producto.codigoAntiguo ? producto.codigoAntiguo : "No tiene" }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            lista_productos: [],
        }
    },
    created(){
        this.getProductos();
    },
    methods:{
        getProductos(){
            axios.get('/api/productos')
                .then(res => {
                    this.lista_productos = res.data;
                });
        },
        async getSeccionByCodigo(codigo){
            const res = await axios.get('/api/secciones/'+parseInt(codigo));
            console.log("Sección:", res.data[0].nombre);
            return res.data[0].nombre;
        },
        async getCategoriaByCodigo(codigo){
            const res = await axios.get('/api/categorias/'+parseInt(codigo));
            console.log("Categoría:", res.data[0].nombre);
            return res.data[0].nombre;
        },
        async getMarcaByCodigo(codigo){
            const res = await axios.get('/api/marcas/'+parseInt(codigo));
            console.log("Marca:", res.data[0].nombre);
            return res.data[0].nombre;
        },
        async getProveedorByCodigo(codigo){
            const res = await axios.get('/api/proveedores/'+parseInt(codigo));
            console.log("Proveedor:", res.data[0].nombre);
            return res.data[0].nombre;
        },
        getMedidaVentaByID(id){
            axios.get('/api/medidas-venta/' + id)
                .then(res => {
                    return res.data[0]
                });
            return {
                nombre: "[MEDIDA]",
                abreviacion: "[ABREV.]"
            }
        },
    }
}
</script>