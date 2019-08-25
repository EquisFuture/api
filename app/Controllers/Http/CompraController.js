'use strict'
const Compra = use('App/Models/Compra')
const articulo = use('App/Models/DetallesCompra')
const user = use('App/Models/User')
const proveedor = use('App/Models/Proveedor')
var jwt = require('jsonwebtoken')

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
        let usuario = new user()
        let token;
        try {
            token = request.header('auth')
            
            let u = jwt.verify(token,'garnachas@123')
            nueva.costo_total = request.input('costo_total')
            nueva.autoriza = u['usuariobd'].id
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
                return response.status(300).send({mensaje: 'Error durante registro de articulos'})
            }
            nueva.costo_total = monto
            await nueva.save()
            return response.status(200).send({mensaje: 'registro exitoso'})
        }  catch (error) {
            return response.status(150).send({mensaje: 'registro fallido', error: error})
            
        }
    }

    async bcompra({request,response}){
        let art = new articulo()
        try{

             art = await articulo.find({'folio_compra': request.input('folio_compra')})
            return response.status(200).send(art)
        }catch(msn){
            return response.status(300).send(msn)
        }
    }

    async dcompra({request, response}){
        let art = new articulo()
        let comp = new Compra()
        try{
            comp = await Compra.find(request.input('folio_compra'))
            art = await articulo.find({'folio_compra': comp.id})
            art.forEach(element => {
               this.darticulo({request,response},element)
            });
            await comp.delete()
            return response.status(200).send({notificacion: 'Registros borrados...'})
        }catch(msj){
            return response.status(300).send(msj)
        }
    }

    async darticulo({request,response},object){
        try {
            await object.delete()
        } catch (error) {
            return response.status(304).send(error)
        }
    }

    async compras({request, response}){
        let c = new Compra()
        c = await Compra.all()
   
       
        return response.status(200).send(c)
    }

    async autorizacompra({params,response}){
        let usuario = await user.find(params.id)
        return response.status(200).send({usuario: usuario.username})
    }
    async proveedorcompra({params,response}){
        let prov = await proveedor.find(params.id)
        return response.status(200).send({proveedor: prov.nombre_proveedor})

    }
   async buscador({params, response}){
       let proveedores = await proveedor.findBy('nombre_proveedor', params.keyword)
       let busqueda = []
       busqueda.push(await Compra.all()) 
       let arreglo = [];
       busqueda.forEach(element => {
           if(element.proveedor == proveedores.id){
               arreglo.push()
           }
       });
       return response.status(200).send(arreglo)
   }
}

module.exports = CompraController
