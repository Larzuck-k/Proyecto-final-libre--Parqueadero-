import { UniqueConstraintError, ValidationError } from "sequelize";

const errorHandlerMiddleware = (error, req, res, next) => {
  if (error instanceof UniqueConstraintError) {
    // Si ocurre un error de llave única
    let errorMessage = error.errors[0].message;
    if (error.errors[0].path == "email") {
      errorMessage = "El correo proporcionado ya existe";
    }
    res.status(400).send({
      status: "error",
      mensaje: errorMessage, // Muestra el mensaje del error
    });
  }

  if (error instanceof ValidationError) {
    const errorMessages = error.errors.map((err) => ({
      campo: err.path, // Campo que causó el error
      mensaje: err.message,
    }));

    return res.status(400).send({
      status: "error",
      mensaje: "Errores de validación",
      errores: errorMessages,
    });
  }

  // Si es otro tipo de error, envía un error general
  return res.status(500).send({
    status: "error",
    mensaje: "Error interno del servidor: " + error.message,
  });
};

export default errorHandlerMiddleware;
