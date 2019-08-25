'use strict'
const proveedor = use('App/Models/Proveedor')

class ProveedorController {
    async registrarProveedor({request,response}){
        try {
            
            let input = request.all()
            let pro = new proveedor()
            pro.nombre_proveedor = input.nombre_proveedor
            pro.direccion = input.direccion
            pro.telefono = input.telefono
            pro.correo = input.correo
    
            await pro.save()
            return response.status(200).send({mensaje: 'Registro guardado'})
        } catch (error) {
            return response.status(150).send({mensaje: error})
            
        }
        
    }

    async getProveedores({response}){
        let proveedores = await proveedor.all()
            
        return response.status(200).send(proveedores)
    }
}

module.exports = ProveedorController
