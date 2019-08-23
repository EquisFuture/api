'use strict'
const Compra = use('App/Models/Compra')
const articulo = use('App/Models/DetallesCompra')

class CompraController {
    async regarticulo({request,response}, folio, object){
        let art = new articulo()
        try{

            art.folio_compra = folio
            art.concepto = object.concepto
            art.descripcion = object.descripcion
            art.cantidad = object.cantidad
            art.udm = object.udm
            art.precio = object.precio
            await art.save()
            
        }catch(msj){
            return response.status(150).send({error: msj})
        }
    }
    async registrar({request, response}){
        let nueva = new Compra()
        let monto = 0
        let importe = 0
        try {
            nueva.costo_total = request.input('costo_total')
            nueva.autoriza = request.input('autoriza')
            nueva.proveedor = request.input('proveedor')
            await nueva.save()
            try{
                let listado = request.input('listado')
                listado.forEach(element => {
                    this.regarticulo({request,response},nueva.id,element)
                    importe = element.precio * element.cantidad
                    monto = monto + importe
                    
                }); 
            }catch{
                return response.status(300).send({mensaje: 'valio cabeza'})
            }
            nueva.costo_total = monto
            await nueva.save()
            return response.status(200).send({mensaje: 'registro exitoso'})
        } catch (error) {
            return response.status(150).send({mensaje: 'registro fallido', error: error})
            
        }
    }

    async barticulo({request,response}){
        let art = new articulo()
        try{

             art = await articulo.find({'folio_compra': request.input('folio_compra')})
            return response.status(200).send(art)
        }catch(msn){
            return response.status(300).send(msn)
        }
    }
}

module.exports = CompraController
