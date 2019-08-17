'use strict'
const Concepto = use('App/Models/Almacen');

class InventarioController {
    async registrarConcepto({request,response}){
        let concepto = new Concepto();
        concepto.concepto = request.input('concepto');
        concepto.descripcion = request.input('descripcion');
        concepto.cantidad = request.input('cantidad');
        concepto.precio_lista = request.input('precio_lista');
        concepto.precio_publico = request.input('precio_publico');
        await concepto.save();

        return response.status(200).json(concepto);
    }
}

module.exports = InventarioController
