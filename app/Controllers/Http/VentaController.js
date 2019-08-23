'use strict'
const Venta = use('App/Models/Venta')
const User = use('App/Models/User')
const Cliente = use('App/Models/Cliente')
class VentaController {

    async agregarVenta({request,response}){
        
        let venta_existe //= await Venta.findOne({})
        if(venta_existe){
            return response.status(400).json({error: 'Ya existe esa venta!'})
        }else{
            let venta = new Venta();
            venta.folio_venta = request.input('folio')
            
    
            await venta.save();
    
            return response.status(200).json(venta);
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
