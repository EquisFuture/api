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
}

module.exports = VentaController
