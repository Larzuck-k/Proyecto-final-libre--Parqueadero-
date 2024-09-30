const validarDatos = (req, res, next) => {
  const camposVacios = [];
  const camposExcluidos = ["id"];
  const ruta = req.path; // Obtener la ruta actual

  // Recorremos los campos del cuerpo de la solicitud (req.body)
  Object.keys(req.body).forEach((campo) => {
    // Condición para verificar si el campo está vacío y no es 'password' o 'contraseña'
    // Además de excluir campos según la ruta
    if (
      !camposExcluidos.includes(campo) &&
      !req.body[campo] && // Si el campo está vacío
      !(
        (ruta === "/usuarios/editar" && campo === "password") ||
        (ruta === "/usuarios/editar" && campo === "contraseña")
      ) // Excluir 'campo_a_excluir' si estamos en '/cierta-ruta'
    ) {
      camposVacios.push(campo); // Agregar el campo vacío a la lista
    }
  });

  // Si hay campos vacíos, enviamos una respuesta con los errores
  if (camposVacios.length > 0) {
    return res.status(400).json({
      status: "error",
      mensaje: "Los siguientes campos están vacíos: " + camposVacios,
      campos: camposVacios, // Mostrar los campos vacíos
    });
  }

  // Si no hay campos vacíos, continuamos al siguiente middleware o ruta
  next();
};
export default validarDatos;
