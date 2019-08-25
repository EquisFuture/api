'use strict'
const Venta = use('App/Models/Venta')
const Dventa = use('App/Models/DetallesVenta')
const User = use('App/Models/User')
const Cliente = use('App/Models/Cliente')
const Concepto = use('App/Models/Almacen')
class VentaController {

    async registrarDventa({request,response},folio,obj){
            let d_venta = new Dventa();
            console.log(folio)
        try{/*
            await Dventa.find({ folio_venta: folio })
                        .updateOne({ $push: { conceptos:  {concepto: obj.concepto, descripcion: obj.descripcion , cantidad: obj.cantidad, total: obj.cantidad * obj.precio }} });*/
            console.log('entro al try')
            d_venta.folio_venta = folio
            d_venta.concepto = obj.concepto
            d_venta.cantidad = obj.cantidad
            d_venta.descripcion = obj.descripcion
            d_venta.total = obj.precio * obj.cantidad
            console.log('paso el foreach')
            await d_venta.save()
        }catch(msj){
            return response.status(150).send({error: msj})
        }
    }

    async gVenta(v){
        let vent = new Venta();
        vent = v
            await vent.save()
            console.log('vent2')
            console.log(vent)
            return vent;
        
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

    async registrarVenta({request,response}){
        let venta = new Venta();
        let subtotal = 0
        let total = 0
        try{
            venta.cliente = request.input('cliente')
            venta.subtotal = request.input('subtotal')
            venta.impuestos = request.input('impuestos')
            venta.total = request.input('total')
            venta.fecha = request.input('fecha')
            await venta.save();
            try{
                let listado = request.input('listado');
                
                listado.forEach(e => {
                    this.registrarDventa({request,response},venta.id,e)
                    subtotal = e.subtotal * e.cantidad;
                    e.impuesto = subtotal * .16
                });
            }
            catch{
                return response.status(300).send({mensaje: 'fallo listado'})
            }
            total = subtotal + impuesto;
            venta.subtotal = subtotal;
            venta.total = total;
            console.log('llego aqui')
            await venta.save();
            return response.status(200).send({mensaje: 'registro exitoso'});
        }catch(error){
            return response.status(150).send({mensaje: 'registro fallido', error: error})
        }
    }

async obtenerVentas({response}){
    //let ventas = await Venta.query().join('Users','ventas.cliente','users.id').fetch();
    
    let ventas = await Venta.query().fetch();
    /*let nombres;
    for(let v in ventas.cliente){
       nombres = await Cliente.query().where('id',1).fetch();
        v = nombres.nombre_proveedor;
    }*/
   
    return response.status(200).json(ventas);
}
async buscarVenta({request,response}){
    let venta = await Venta .query()
                                    .where('fecha', 'ilike', '%'+request.input('fecha')+'%')
                                    .fetch();
    return response.status(200).json(venta);
}
}

module.exports = VentaController
