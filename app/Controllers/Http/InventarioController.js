'use strict'
const Concepto = use('App/Models/Almacen');

class InventarioController {
    async registrarConcepto({request,response}){
        let concepto = new Concepto();
        concepto.concepto = request.input('concepto');
        concepto.descripcion = request.input('descripcion');
        concepto.cantidad = request.input('cantidad');
        concepto.udm = request.input('udm');
        concepto.precio_lista = request.input('precio_lista');
        concepto.precio_publico = request.input('precio_publico');
        await concepto.save();

        return response.status(200).json(await Concepto.query().orderBy('id').fetch());
    }

    async editarConcepto({request,response}){
        const id = request.input('id');
        const concepto = await Concepto.find(id);
        concepto.concepto = request.input('concepto');
        concepto.descripcion = request.input('descripcion');
        concepto.udm = request.input('udm');
        concepto.precio_lista = request.input('precio_lista');
        concepto.precio_publico = request.input('precio_publico');
        await concepto.save();

        return response.status(200).json(await Concepto.query().orderBy('id').fetch());
    }

    async obtenerInventario({response}){
        let inventario = await Concepto.query().orderBy('id').fetch();
        return response.status(200).json(inventario);
    }

    async buscar({request,response}){
        let inventario = await Concepto .query()
                                        .where('concepto', 'ilike', '%'+request.input('concepto')+'%')
                                        .orWhere('descripcion', 'ilike', '%'+request.input('concepto')+'%')
                                        .orderBy('id')
                                        .fetch();
        return response.status(200).json(inventario);
    }
}

module.exports = InventarioController
