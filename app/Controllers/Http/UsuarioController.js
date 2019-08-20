'use strict'

const Usuario = use('App/Models/User')
var Hash = use('Hash')
var jwt = require('jsonwebtoken')

class UsuarioController {

    async registrarUsuario({request, response}){
        // Busca si el usuario y correo que se quieren registrar ya existen
        const usuario_existente = await Usuario.findBy('username',request.input('username'));
        const correo_existente = await Usuario.findBy('email',request.input('email'));

        // Si existe el usuario o el correo, manda un error
        if(usuario_existente || correo_existente){
            return response.status(400).json({error: 'El usuario y/o correo ya existe!'})
        }
        // Si no existen ni el usuario ni el correo, lo registra y regresa el mismo usuario
        else{
            const usuario = new Usuario();
            usuario.username = request.input('username');
            usuario.email = request.input('email')
            usuario.password = request.input('password');
            await usuario.save();

            return response.status(200).json(await Usuario.query().orderBy('id').fetch());
        }
    }

    async login ({request,response}){
        let usuario = new Usuario();
        usuario = request.all();
        let usuariobd =  await Usuario.findBy('email', usuario.email)  
        if(usuariobd !== null)
        {
            const verificar = await Hash.verify(usuario.password,usuariobd.password)
            if ( verificar){
                return response.status(200).json({token: jwt.sign({usuariobd},'garnachas@123'),id:usuariobd.id,username:usuariobd.username})
            }
            else{
                return response.status(403).send({Error: 'Contraseña Incorrecta, Intente de nuevo'})
            } 
        }
        else{
            return response.status(404).send({Error: 'Correo no encontrado, Intente de nuevo'})
        }
    }
}

module.exports = UsuarioController
