'use strict'
const Venta = use('App/Models/Venta')
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
    let ventas = await Venta.query().fetch();
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
