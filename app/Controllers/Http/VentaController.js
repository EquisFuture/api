'use strict'
const Venta = use('App/Models/Venta')
const Dventa = use('App/Models/DetallesVenta')
const inventario = use('App/Models/Almacen')
const User = use('App/Models/User')
const Cliente = use('App/Models/Cliente')
const Concepto = use('App/Models/Almacen')
class VentaController {

    async registrarDventa({request,response},folio,obj){
            let d_venta = new Dventa();
        try{/*
            await Dventa.find({ folio_venta: folio })
                        .updateOne({ $push: { conceptos:  {concepto: obj.concepto, descripcion: obj.descripcion , cantidad: obj.cantidad, total: obj.cantidad * obj.precio }} });*/
            
            d_venta.folio_venta = folio
            d_venta.concepto = obj.concepto
            d_venta.cantidad = obj.cantidad
            d_venta.descripcion = obj.descripcion
            d_venta.total = obj.precio * obj.cantidad
            this.actualizaInventario(d_venta)
            await d_venta.save()
        }catch(msj){
            return response.status(150).send({error: msj})
        }
    }
    async registrarVenta({request,response}){
        console.log('entro al metodo registrarventa')
        let venta = new Venta();
        let subtotal = 5656
        let total = 0
        let impuesto = 0
        let token;
        try{
            console.log('entro al try')
            /*token = request.header('auth')
            
            let u = jwt.verify(token,'garnachas@123')*/
            venta.cliente = request.input('cliente')
            venta.subtotal = request.input('costo_total')
            venta.impuestos = (venta.subtotal * 0.16)
            venta.total = (request.input('costo_total') + venta.impuestos)
            venta.fecha = "190827"
            console.log(venta);
            await venta.save();
            try{

                let listado = request.input('listado');
                
                listado.forEach(e => {
                    this.registrarDventa({request,response},venta.id,e)
                    subtotal = (e.precio * e.cantidad)
                    impuesto = (subtotal * .16)
                    total = total + (subtotal + impuesto);
                });
            }
            catch{
                return response.status(300).send({mensaje: 'fallo listado'})
            }
            /*console.log('total')
            console.log(total)
            venta.subtotal = total - (total * .16);
            venta.impuesto = 16;
            venta.total = total;
            console.log('llego aqui')
            console.log(venta)
            await venta.save()*/
            return response.status(200).send({mensaje: 'registro exitoso'});
        }catch(error){
            return response.status(150).send({mensaje: 'registro fallido', error: error})
        }
    }
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
                art_inventario.cantidad = art_inventario.cantidad - object.cantidad
                await art_inventario.save()
                console.log('articulo actualizado')
                
            }else{
                console.log('ocurrio un error')

            }
        } catch (error) {
            console.log('Error: ')
            console.log(error)
        }
    }
    async bventa({params,response}){
        let art = new Dventa()
        try{

             art = await Dventa.find({'folio_venta': params.folio})
            return response.status(200).send(art)
        }catch(msn){
            return response.status(300).send(msn)
        }
    }
    async gVenta(total,fecha,id){
        try{
            console.log('entro al try gVenta')
            let vent = await Venta.find(id);
            console.log('paso el buscar venta')
        let subtotal = total - (total * .16);
        let impuesto = 16
        console.log('id')
        console.log(id)
             vent.id = id
            vent.subtotal = subtotal
            vent.impuesto = impuesto
            vent.total = total
            vent.fecha = fecha
            console.log('vent')
            console.log(vent)
            await vent.save()
        }
        catch{
            return 'fallo'
        }
        
            
        
    }

async obtenerVentas({response}){
    //let ventas = await Venta.query().join('Users','ventas.cliente','users.id').fetch();
    let ventas = await Venta.all();
    /*let nombres;
    for(let v in ventas.cliente){
       nombres = await Cliente.query().where('id',1).fetch();
        v = nombres.nombre_proveedor;
    }*/
   
    return response.status(200).json(ventas);
}
async buscarVenta({request,response}){
    let venta = await Venta .query()
                                    .where('fecha', 'like', '%'+request.input('fecha')+'%')
                                    .fetch();
    return response.status(200).json(venta);
}


async gDventa(){
    let det_Venta = new Dventa();
        det_Venta = await Venta.query().pickInverse();
        console.log('detventa1')
        console.log(det_Venta);
        let v = new Dventa(det_Venta);
        await v.save()
        console.log('pasamos')
    return v;
}
}

module.exports = VentaController
