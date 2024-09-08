import rol from '../models/rol.js';
import Usuario from '../models/usuario.js';
import bcrypt from 'bcrypt';
// Crear un nuevo usuario
export const crearUsuario = async (req, res) => {
    try {
      const { name, email, password, id_rol } = req.body;
      // Obtén la fecha y hora actuales
      const now = new Date();

      // Ajusta la hora a la zona horaria America/Bogota (UTC-5)
      const offset = -5; // Offset en horas para America/Bogota
      const localNow = new Date(now.getTime() + offset * 60 * 60 * 1000);

      const passwordHashed = bcrypt
        .hashSync(password, 12)
        .replace("$2b", "$2y");
      const nuevoUsuario = await Usuario.create({
        name,
        email,
        email_verified_at: null,
        remember_token: null,
        password: passwordHashed,
        id_rol,
        estado: 1,
        created_at: localNow,
        updated_at: localNow,
      });
      res.status(200).send({
        status: "success",
        mensaje: "Usuario creado exitosamente",
        usuario: nuevoUsuario,
      });
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al crear el usuario: " + error
        });
    }
};

export const cambiarEstado = async (req, res) => {
    try {
      const { id } = req.body;
      const usuario = await Usuario.findByPk(id);
  
      if (usuario) {
        const estadoActual = usuario.estado;
        const nuevoEstado = estadoActual === 0 ? 1 : 0;
        usuario.estado = nuevoEstado;
        await usuario.save(); 
        res.status(200).send({
          status: "success",
          mensaje: "Se ha actualizado el actualizado exitosamente"
        });
      } else {
        res.status(404).send({
          status: "error",
          mensaje: "Registro no encontrado"
        });
      }
    } catch (error) {
      res.status(400).send({
        status: "error",
        mensaje: "Error al cambiar el estado: " + error
      });
    }
  };


// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({attributes:["id","name","email","password","id_rol","estado"],include:{
            model:rol,
            attributes:["nombre"],
            as:"Rol"
        }});
        if (usuarios.length === 0) {
            const columnNames = Object.keys(Usuario.getAttributes());
            const emptyObject = columnNames.reduce((acc, curr) => ({ ...acc, [curr]: "" }), {});
            res.status(200).send([emptyObject]);
        } else {
          // Transformar los datos para aplanar el objeto Cliente_Contratista_Cliente
          const transformedUsuarios = usuarios.map((usuario) => {
            // Convertir el cliente en un objeto simple
            const usuarioData = usuario.toJSON();

            // Extraer el estado y eliminar la propiedad anidada
            if (usuarioData.Rol) {
              usuarioData.nombre_rol = usuarioData.Rol.nombre;
              delete usuarioData.Rol;
            }
            // Reorganizar los atributos, moviendo 'estado' al final
            const { estado, ...rest } = usuarioData;
            return { ...rest, estado };
          });   
          res.status(200).send(transformedUsuarios);
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al obtener los usuarios: " + error
        });
    }
};

// Actualizar un usuario
export const actualizarUsuario = async (req, res) => {
    try {
      const { id } = req.body;
      const { name, email, password, id_rol } = req.body;
      const usuario = await Usuario.findByPk(id);
      // Obtén la fecha y hora actuales
      const now = new Date();

      // Ajusta la hora a la zona horaria America/Bogota (UTC-5)
      const offset = -5; // Offset en horas para America/Bogota
      const localNow = new Date(now.getTime() + offset * 60 * 60 * 1000);
      if (usuario) {
        if (password) {
          usuario.password = bcrypt
            .hashSync(password, 12)
            .replace("$2b", "$2y");
        }
        usuario.name = name || usuario.name;
        usuario.email = email || usuario.email;
        usuario.id_rol = id_rol || usuario.id_rol;
        usuario.updated_at = localNow;
        await usuario.save();
        console.log(usuario);
        res.status(200).send({
          status: "success",
          mensaje: "Usuario actualizado exitosamente",
          usuario,
        });
      } else {
        res.status(404).send({
          status: "error",
          mensaje: "Usuario no encontrado",
        });
      }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al actualizar el usuario: " + error
        });
    }
};

// Eliminar un usuario
export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);

        if (usuario) {
            await usuario.destroy();
            res.status(200).send({
                status: "success",
                mensaje: "Usuario eliminado exitosamente"
            });
        } else {
            res.status(404).send({
                status: "error",
                mensaje: "Usuario no encontrado"
            });
        }
    } catch (error) {
        res.status(400).send({
            status: "error",
            mensaje: "Error al eliminar el usuario: " + error
        });
    }
};
export default Usuario