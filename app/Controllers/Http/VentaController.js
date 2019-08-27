'use strict'
const Venta = use('App/Models/Venta')
const Dventa = use('App/Models/DetallesVenta')
const User = use('App/Models/User')
const Cliente = use('App/Models/Cliente')
const Concepto = use('App/Models/Almacen')
class VentaController {

    async registrarDventa({request,response},folio,obj){
            let d_venta = new Dventa();
            console.log(obj)
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
    async registrarVenta({request,response}){
        console.log('entro al metodo registrarventa')
        let venta = new Venta();
        let subtotal = 0
        let total = 0
        let impuesto = 0
        let token;
        try{
            console.log('entro al try')
            /*token = request.header('auth')
            
            let u = jwt.verify(token,'garnachas@123')*/
            venta.cliente = request.input('cliente')
            venta.subtotal = 0
            venta.impuestos = 0
            venta.total = 0
            
            venta.fecha = "190827"
           
            await venta.save();
            try{

                let listado = request.input('listado');
                
                listado.forEach(e => {
                    console.log('entro al foreach')
                    this.registrarDventa({request,response},venta.id,e)
                    
                    console.log(e.precio * e.cantidad)
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
            this.gVenta(total,venta.fecha,venta.id)
            console.log('paso el save')
            return response.status(200).send({mensaje: 'registro exitoso'});
        }catch(error){
            return response.status(150).send({mensaje: 'registro fallido', error: error})
        }
    }
    async gVenta(total,fecha,id){
        try{
            let vent = await Venta.query().pickInverse()
        let subtotal = total - (total * .16);
        let impuesto = 16
        console.log('total')
        console.log(total)
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
