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
            usuario.rol = request.input('rol');
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
                return response.status(200).json({token: jwt.sign({usuariobd},'garnachas@123'), usuario: usuariobd.username})
            }
            else{
                return response.status(403).send({Error: 'Contraseña Incorrecta, Intente de nuevo'})
            } 
        }
        else{
            return response.status(404).send({Error: 'Correo no encontrado, Intente de nuevo'})
        }
    }

    async loginAndroid ({request,response, params}){
        console.log('Peticion')
        let usuario = new Usuario();
        usuario = request.all();
        let usuariobd =  await Usuario.findBy('email', params.correo)  
        let arreglo = new Array();

        if(usuariobd !== null)
        {
            // arreglo[0]=usuariobd.email
            // arreglo[1]=usuariobd.password
            arreglo.push(usuariobd.email)
            arreglo.push(usuariobd.password)
            console.log(arreglo)
            return response.status(200).send(arreglo)
        
        //    return response.status(200).json(JSON.stringify({email: usuariobd.email, password: usuariobd.password}))
        //     const verificar = await Hash.verify(usuario.password,usuariobd.password)
        //     if ( verificar){
        //         return response.status(200).json({token: jwt.sign({usuariobd},'garnachas@123')})
        //     }
        //     else{
        //         return response.status(403).send({Error: 'Contraseña Incorrecta, Intente de nuevo'})
        //     } 
        // }
        // else{
        //     return response.status(404).send({Error: 'Correo no encontrado, Intente de nuevo'})
        // }
        }else{
            console.log('error compa')
            return response.status(150).send({mensaje: 'error'})
        }
    } 

    async loginAndroid2 ({request,response, params}){ 

        console.log('Entre'); 
        return response.send('true');
     /** 
        console.log('Peticion')
        let usuario = new Usuario();
        usuario = request.all();
        let usuariobd =  await Usuario.findBy('email', params.correo)  
        let arreglo = new Array();

        if(usuariobd !== null)
        {
            // arreglo[0]=usuariobd.email
            // arreglo[1]=usuariobd.password
            arreglo.push(usuariobd.email)
            arreglo.push(usuariobd.password)
            console.log(arreglo)
            return response.status(200).send(arreglo)
        
        //    return response.status(200).json(JSON.stringify({email: usuariobd.email, password: usuariobd.password}))
        //     const verificar = await Hash.verify(usuario.password,usuariobd.password)
        //     if ( verificar){
        //         return response.status(200).json({token: jwt.sign({usuariobd},'garnachas@123')})
        //     }
        //     else{
        //         return response.status(403).send({Error: 'Contraseña Incorrecta, Intente de nuevo'})
        //     } 
        // }
        // else{
        //     return response.status(404).send({Error: 'Correo no encontrado, Intente de nuevo'})
        // }
        }else{
            console.log('error compa')
            return response.status(150).send({mensaje: 'error'})
        } 
        */
    }


    async obtenerUsuarios({response}){
        return response.status(200).json(await Usuario.query().orderBy('id').fetch());
    }

    async editarUsuario({request, response}){
        const id = request.input('id');

        const usuario = await Usuario.find(id);

        usuario.username = request.input('username');
        usuario.email = request.input('email');
        usuario.rol = request.input('rol');
        
        await usuario.save();

        return response.status(200).json(await Usuario.query().orderBy('id').fetch());
    }

    async buscarUsuario({request, response}){
        let usuarios = await Usuario    .query()
                                        .where('username', 'ilike', '%'+request.input('username')+'%')
                                        .orWhere('email', 'ilike', '%'+request.input('username')+'%')
                                        .orderBy('id')
                                        .fetch();
        return response.status(200).json(usuarios);
    }
}

module.exports = UsuarioController
