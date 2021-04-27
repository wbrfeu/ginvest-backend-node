import { DaoUsuarios } from '../database/dao-usuarios.js'
import { v4 as uuidv4 } from 'uuid'

async function leOuCriaUsuario(usuario) {
    const dao = new DaoUsuarios()
    const usuarioBanco = await dao.leUsuario(usuario.email)
    
    if (usuarioBanco === null) {
        usuario.id_usuario = uuidv4()
        dao.salvaUsuario(usuario)
        return usuario
    }
    return usuarioBanco 
}

export { leOuCriaUsuario }