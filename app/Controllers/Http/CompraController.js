'use strict'
const Compra = use('App/Models/Compra')

class CompraController {
    async registrar({request, response}){
        const nueva = new Compra()
        try {
            
            nueva.cantidad = request.input('cantidad')
            nueva.unidad = request.input('unidad')
            nueva.concepto = request.input('concepto')
            nueva.costo_unitario = request.input('costo_unitario')
            nueva.costo_total = request.input('costo_total')
            nueva.autoriza = request.input('autoriza')
            nueva.proveedor = request.input('proveedor')
            await nueva.save()
            return response.status(200).send({mensaje: 'registro exitoso'})
        } catch (error) {
            return response.status(150).send({mensaje: 'registro fallido', error: error})
            
        }
    }
}

module.exports = CompraController
