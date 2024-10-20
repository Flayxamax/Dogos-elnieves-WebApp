const usuarioDAO = require('../dataAccess/UsuarioDAO');


class UsuarioController{

    static async crearUsuario(req, res){
        try {
            const {usuario, contrasena, rol} = req.body;
            if(!usuario || !contrasena || !rol){
                //TO DO middleware errores
                return res.status(400).json({ message: 'Los campos usuario, contraseña y rol son requeridos' });
            }
            const newUsuario = {usuario, contrasena, rol}
            const user = await usuarioDAO.create(newUsuario);
            res.status(201).json(user);
        } catch (error) {
            //TO DO middleware errores
            res.status(500).json({ error: 'Error al crear usuario' });
        }
    }

    static async obtenerUsuarioPorId(req, res) {
        try {
            const id = req.params.id;
            console.log(`Buscando usuario con ID: ${id}`);
            const usuario = await usuarioDAO.findById(id);

            if (!usuario) {
                //TO DO middleware errores
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.status(200).json(usuario);
        } catch (error) {
            //TO DO middleware errores
            res.status(500).json({ error: 'Error al obtener el usuario' });
        }
    }

    static async obtenerUsuarios(req, res) {
        try {
            const usuarios = await usuarioDAO.findAll();
            
            if (usuarios.length === 0) {
                //TO DO middleware errores
                return res.status(404).json({ message: 'No hay usuarios registrados' });
            }
            
            res.status(200).json(usuarios);
        } catch (error) {
            //TO DO middleware errores
            res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
    }


    static async actualizarUsuario(req, res) {
        try {
            const id = req.params.id;

            const usuarioexists = await usuarioDAO.findById(id);

            if (!usuarioexists) {
                //TO DO middleware errores
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const usuarioData = req.body;

            const usuario = await usuarioDAO.update(id, usuarioData)

            if (!usuario) {
               //TO DO middleware errores
               return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.status(200).json(usuario);
        } catch (error) {
           //TO DO middleware errores
           res.status(500).json({ error: 'Error al actualizar el usuario' });
        }
    }

    static async eliminarUsuario(req, res) {
        try {
            const id = req.params.id;
            const usuarioexists = await usuarioDAO.findById(id);

            if (!usuarioexists) {
               //TO DO middleware errores
               return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const usuario = await usuarioDAO.delete(id);
            const msjReturn = { mensaje: 'Usuario Eliminado Correctamente' };

            res.status(200).json(msjReturn)
        } catch (error) {
            //TO DO middleware errores
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    }

}

module.exports = UsuarioController;