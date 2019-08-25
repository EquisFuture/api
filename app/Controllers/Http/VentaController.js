'use strict'
const Venta = use('App/Models/Venta')
const Dventa = use('App/Models/DetallesVenta')
const User = use('App/Models/User')
const Cliente = use('App/Models/Cliente')
const Concepto = use('App/Models/Almacen')
class VentaController {

    async registrarDventa({request,response},folio,obj){
        console.log(folio)
        console.log(obj)
        try{
            await Dventa.find({ folio_venta: folio })
                        .updateOne({ $push: { conceptos:  {concepto: obj.concepto, descripcion: obj.descripcion , cantidad: obj.cantidad, total: obj.cantidad * obj.precio }} });
        }catch(msj){
            return response.status(150).send({error: msj})
        }
    }

    async gVenta(v){
        let vent = new Venta();
        vent = v
            await vent.save()
        
    }
    async gDventa(){
        let det_Venta = new Dventa();
            det_Venta = await Venta.query().pickInverse();
            console.log('detventa')
            console.log(det_Venta);
            await det_Venta.save()
        return det_Venta;
    }

    async registrarVenta({request,response}){
        console.log("entramos")
        let venta = new Venta();
        let subtotal = 0
        let total = 0
        try{
            console.log("entro al try")
            venta.cliente = request.input('cliente')
            venta.subtotal = request.input('subtotal')
            venta.impuestos = request.input('impuestos')
            venta.total = request.input('total')
            venta.fecha = request.input('fecha')
            this.gVenta(venta);
          
            
            let det_Venta = new Dventa();
            det_Venta = this.gDventa()
            console.log(det_Venta.folio_venta)
            console.log("pasamos el save")
            try{
                let listado = request.input('listado');
                listado.forEach(e => {
                    this.registrarDventa({request,response},venta.id,e)
                    subtotal = e.subtotal * e.cantidad;
                    impuesto = subtotal * .16
                });
            }
            catch{
                return response.status(300).send({mensaje: 'fallo listado'})
            }
            total = subtotal + impuesto;
            venta.subtotal = subtotal;
            venta.total = total;
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
async buscar({request,response}){
    let venta = await Concepto .query()
                                    .where('', 'like', '%'+request.input('concepto')+'%')
                                    .fetch();
    return response.status(200).json(inventario);
}
}

module.exports = VentaController
