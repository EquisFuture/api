'use strict'
const cliente = use('App/Models/Cliente')
class ClienteController {
    async registrarCliente({request,response}){
        try {
            
            let input = request.all()
            let cli = new cliente()
            cli.nombre_cliente = input.nombre_proveedor
            cli.direccion = input.direccion
            cli.telefono = input.telefono
            cli.correo = input.correo
            await cli.save()
            return response.status(200).send({mensaje: 'Cliente guardado'})
        } catch (error) {
            return response.status(150).send({mensaje: error})
            
        }
        
    }

    async getClientes({response}){
        let clientes = await clientes.all()
        return response.status(200).send(clientes)
    }
}

module.exports = ClienteController
