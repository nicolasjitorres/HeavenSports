CREATE DATABASE heaven_db;

USE heaven_db;

/* Creacion de la tabla de categorias del producto */
CREATE TABLE categorias (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre VARCHAR(50),
    descripcion VARCHAR(100)
);

/* Creacion de la tabla de colores de productos */
CREATE TABLE colores (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50),
    hexadecimal varchar(50)
);

/* Creacion de la tabla de imagenes tanto de usuarios como productos */
CREATE TABLE imagenes (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    codigo varchar(100),
    extension varchar(10)
);

/* Creacion de la tabla de marcas de productos */
CREATE TABLE marcas (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre VARCHAR(50)
);

/* Creacion de la tabla de los roles de usuario */
CREATE TABLE roles (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion VARCHAR(200)
);

/* Creacion de la tabla de los talles */
CREATE TABLE talles (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    numero INT,
    descripcion VARCHAR(100)
);

/* Creacion de la tabla de los usuarios */
CREATE TABLE usuarios (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    telefono VARCHAR(10),
    email VARCHAR(150),
    contrasena VARCHAR(20),
    id_imagen_perfil INT,
    id_rol INT,
    FOREIGN KEY (id_imagen_perfil) REFERENCES imagenes(id),
    FOREIGN KEY (id_rol) REFERENCES roles(id)
); 

/* Creacion de la tabla del carrito */
CREATE TABLE carritos (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT UNIQUE,
    precio_total BIGINT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

/* Creacion de la tabla de los productos */
CREATE TABLE productos (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion VARCHAR(200),
    id_marca INT,
    FOREIGN KEY (id_marca) REFERENCES marcas(id)
);

/* Creacion de la tabla intermedia que relaciona productos con categorias */
CREATE TABLE producto_categoria (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_producto INT,
    id_categoria INT,
    FOREIGN KEY (id_producto) REFERENCES productos(id),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);

/* Creacion de la tabla intermedia que relaciona productos con colores */
CREATE TABLE producto_color (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_producto INT,
    id_color INT,
    precio BIGINT,
    descuento INT,
    FOREIGN KEY (id_producto) REFERENCES productos(id),
    FOREIGN KEY (id_color) REFERENCES colores(id)
);

/* Creacion de la tabla intermedia que relaciona un producto con un color con los talles */
CREATE TABLE producto_color_talle (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_producto_color INT,
    id_talle INT,
    stock INT,
    FOREIGN KEY (id_producto_color) REFERENCES producto_color(id),
    FOREIGN KEY (id_talle) REFERENCES talles(id)
);

/* Creacion de la tabla intermedia que relaciona productos con imagenes */
CREATE TABLE producto_imagen (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_producto INT,
    id_imagen INT,
    FOREIGN KEY (id_producto) REFERENCES productos(id),
    FOREIGN KEY (id_imagen) REFERENCES imagenes(id)
);

/* Creacion de la tabla intermedia que relaciona un producto con un color y un talle con el carrito del usuario */
CREATE TABLE carrito_producto_color_talle (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_carrito INT,
    id_producto_color_talle INT,
    cantidad_producto INT,
    FOREIGN KEY (id_carrito) REFERENCES carritos(id),
    FOREIGN KEY (id_producto_color_talle) REFERENCES producto_color_talle(id)
);
