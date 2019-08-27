'use strict'
const Cliente = use('App/Models/Cliente')
class ClienteController {
    async registrarCliente({request,response}){
        console.log('entro al registro')
        try {
            
            // let input = request.all()
            let cli = new Cliente()
            cli.nombre_cliente = request.input('nombre_cliente')
            cli.direccion = request.input('direccion')
            cli.telefono = request.input('telefono')
            cli.correo = request.input('correo')
            await cli.save()
            return response.status(200).send({mensaje: 'Cliente guardado'})
        } catch (error) {
            return response.status(150).send({mensaje: error})
            
        }
        
    }

    async getClientes({response}){
        let clientes = await Cliente.all()
        return response.status(200).send(clientes)
    }
}

module.exports = ClienteController
