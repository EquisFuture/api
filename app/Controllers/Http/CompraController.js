'use strict'
const Compra = use('App/Models/Compra')
const articulo = use('App/Models/DetallesCompra')
const user = use('App/Models/User')
const proveedor = use('App/Models/Proveedor')
var jwt = require('jsonwebtoken')
const inventario = use('App/Models/Almacen')

class CompraController {
    // registra articulos en mongoDB
    async regarticulo({request,response}, folio, object){
        let art = new articulo()
        try{

            art.folio_compra = folio
            art.concepto = object.concepto
            art.descripcion = object.descripcion
            art.cantidad = object.cantidad
            art.udm = object.udm
            art.precio = object.precio
            this.actualizaInventario(art)
            await art.save()
            
        }catch(msj){
            return response.status(150).send({error: msj})
        }
    }
    // Registra la compra
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
    // Durante la compra revisa el inventario y actualiza
    async actualizaInventario(object){
        try {
            console.log('actualizando inventario...')
            let art_inventario = new inventario()
            let existente_c = await inventario.query()
            .where('concepto', 'ilike', ''+object.concepto+'')
            .andWhere('descripcion', 'ilike', '%'+object.descripcion+'%')
            .orderBy('id')
            .fetch();
            console.log("resultado consulta: " + JSON.parse(JSON.stringify(existente_c)))
            try {
                
                console.log(JSON.parse(JSON.stringify(existente_c))[0].id)
            } catch (error) {
                console.log('no results')
            }

            if(JSON.stringify(existente_c).length > 3){
               
                console.log('actualizando articulo...')
                art_inventario = await inventario.find(JSON.parse(JSON.stringify(existente_c))[0].id)
                art_inventario.cantidad = art_inventario.cantidad + object.cantidad
                art_inventario.precio_lista = object.precio
                art_inventario.precio_publico = object.precio * 1.3
                await art_inventario.save()
                console.log('articulo actualizado')
                
            }else{
                console.log('registrando nuevo articulo...')
                art_inventario.concepto = object.concepto
                art_inventario.descripcion = object.descripcion
                art_inventario.cantidad = object.cantidad
                art_inventario.udm = object.udm
                art_inventario.precio_lista = object.precio
                art_inventario.precio_publico = object.precio * 1.3
                await art_inventario.save()
                console.log('articulo nuevo registrado')

            }
        } catch (error) {
            console.log('Error: ')
            console.log(error)
        }
    }
    // busca articulos en mongoDB de acuerdo al folio de compra
    async bcompra({params,response}){
        let art = new articulo()
        try{

             art = await articulo.find({'folio_compra': params.folio})
            return response.status(200).send(art)
        }catch(msn){
            return response.status(300).send(msn)
        }
    }
// elimina una compra de PostgreSQL y sus articulos en MongoDB
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
// Elimina articulos de mongoDB solicitados por dcompra
    async darticulo({request,response},object){
        try {
            await object.delete()
        } catch (error) {
            return response.status(304).send(error)
        }
    }
// retorna todas las compras
    async compras({request, response}){
        let c = new Compra()
        c = await Compra.all()
   
       
        return response.status(200).send(c)
    }
// devuelve el comprador especificado por ID
    async autorizacompra({params,response}){
        let usuario = await user.find(params.id)
        return response.status(200).send({usuario: usuario.username})
    }
    // devuelve el proveedor especificado por ID
    async proveedorcompra({params,response}){
        let prov = await proveedor.find(params.id)
        return response.status(200).send({proveedor: prov.nombre_proveedor})

    }

    
// barra de busqueda
   async buscador({params, response}){
       let result = []
       let temp = {}
       let r
       let b_proveedor = await proveedor.query().where('nombre_proveedor','ilike','%'+params.keyword+'%').orderBy('id').fetch()
       console.log(JSON.stringify(b_proveedor))
       r = JSON.parse(JSON.stringify(b_proveedor))
       try{
           r.forEach(element => {
               console.log('registro: ' + element.id)
              temp = this.buscadorProCompra(element.id)
               if(temp !== {}){
                   result.push(temp)
               }
               temp = {}
           })
           console.log('//')
           result.forEach(element => {
               console.log(element)
           });
           return response.status(200).send(result)
       }catch(error){
           console.log(error)
       }
   }

   async buscadorProCompra(id){
       try {
           
           let b_compra = await Compra.query().where('proveedor','=', id).orderBy('id').fetch()
           return JSON.stringify(b_compra)
       } catch (error) {
           console.log(error)
       }
   }
   async filtrar({params, response}){
       
   }
}

module.exports = CompraController
