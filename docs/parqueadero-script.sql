-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS `Parqueadero`;
USE Parqueadero;

-- Tabla Rol
CREATE TABLE Rol (
    ID_Rol INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL
);

Insert into rol VALUES('Administrador','Empleado');

-- Tabla Usuario (Admin y Empleado)
CREATE TABLE Usuario (
    ID_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Contraseña VARCHAR(100) NOT NULL,
    ID_Rol INT,
    FOREIGN KEY (ID_Rol) REFERENCES Rol(ID_Rol)
);

-- Tabla Contratista
CREATE TABLE Contratista (
    ID_Contratista INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Teléfono VARCHAR(15),
    Fecha_Inicio_Contrato DATE,
    Fecha_Fin_Contrato DATE,
    ID_Usuario INT,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

-- Tabla Cliente_Normal
CREATE TABLE Cliente_Normal (
    ID_Cliente INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Teléfono VARCHAR(15)
);

-- Tabla Parqueadero
CREATE TABLE Parqueadero (
    ID_Parqueadero INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Ubicación VARCHAR(255) NOT NULL,
    ID_Usuario INT,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

-- Tabla Espacio
CREATE TABLE Espacio (
    ID_Espacio INT AUTO_INCREMENT PRIMARY KEY,
    Número INT NOT NULL,
    Estado ENUM('Disponible', 'Ocupado') NOT NULL,
    Tipo_Ocupación ENUM('Contratista', 'Cliente_Normal') NOT NULL,
    Fila CHAR(1) NOT NULL,
    ID_Parqueadero INT,
    FOREIGN KEY (ID_Parqueadero) REFERENCES Parqueadero(ID_Parqueadero)
);

-- Tabla Reserva
CREATE TABLE Reserva (
    ID_Reserva INT AUTO_INCREMENT PRIMARY KEY,
    Fecha_Hora_Inicio DATETIME NOT NULL,
    Fecha_Hora_Fin DATETIME NOT NULL,
    Monto_Pagado DECIMAL(10, 2) NOT NULL,
    ID_Cliente INT,
    ID_Espacio INT,
    FOREIGN KEY (ID_Cliente) REFERENCES Cliente_Normal(ID_Cliente),
    FOREIGN KEY (ID_Espacio) REFERENCES Espacio(ID_Espacio)
);

-- Tabla Contrato
CREATE TABLE Contrato (
    ID_Contrato INT AUTO_INCREMENT PRIMARY KEY,
    Fecha_Inicio DATE NOT NULL,
    Fecha_Fin DATE NOT NULL,
    Monto DECIMAL(10, 2) NOT NULL,
    ID_Contratista INT,
    ID_Espacio INT,
    FOREIGN KEY (ID_Contratista) REFERENCES Contratista(ID_Contratista),
    FOREIGN KEY (ID_Espacio) REFERENCES Espacio(ID_Espacio)
);

-- Tabla Factura
CREATE TABLE Factura (
    ID_Factura INT AUTO_INCREMENT PRIMARY KEY,
    Fecha_Emisión DATETIME NOT NULL,
    Monto_Total DECIMAL(10, 2) NOT NULL,
    ID_Cliente INT NULL,
    ID_Contratista INT NULL,
    ID_Reserva INT NULL,
    ID_Contrato INT NULL,
    FOREIGN KEY (ID_Cliente) REFERENCES Cliente_Normal(ID_Cliente),
    FOREIGN KEY (ID_Contratista) REFERENCES Contratista(ID_Contratista),
    FOREIGN KEY (ID_Reserva) REFERENCES Reserva(ID_Reserva),
    FOREIGN KEY (ID_Contrato) REFERENCES Contrato(ID_Contrato)
);

-- Tabla DetalleFactura
CREATE TABLE DetalleFactura (
    ID_DetalleFactura INT AUTO_INCREMENT PRIMARY KEY,
    ID_Factura INT,
    ID_Espacio INT,
    Monto DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (ID_Factura) REFERENCES Factura(ID_Factura),
    FOREIGN KEY (ID_Espacio) REFERENCES Espacio(ID_Espacio)
);
