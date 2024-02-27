-- Datos de muestra para la tabla 'categorias'
INSERT INTO categorias (nombre, descripcion) VALUES
('Deportivo', 'Categoría de zapatillas deportivas'),
('Casual', 'Categoría de calzado casual'),
('Running', 'Categoría de zapatillas de running'),
('Baloncesto', 'Categoría de zapatillas de baloncesto'),
('Niños', 'Categoría de zapatillas para niños');

-- Datos de muestra para la tabla 'colores'
INSERT INTO colores (nombre) VALUES
('Negro'),
('Blanco'),
('Rojo'),
('Azul'),
('Verde'),
('Rosa'),
('Celeste'),
('Amarillo'),
('Gris');

-- Datos de muestra para la tabla 'marcas'
INSERT INTO marcas (nombre) VALUES
('Nike'),
('Adidas'),
('Reebok'),
('Puma'),
('New Balance');

-- Datos de muestra para la tabla 'roles'
INSERT INTO roles (nombre, descripcion) VALUES
('Cliente', 'Rol para usuarios registrados como clientes'),
('Administrador', 'Rol para usuarios registrados como administradores');

-- Datos de muestra para la tabla 'talles'
INSERT INTO talles (numero, descripcion) VALUES
(34, 'Talle 34 para zapatillas'),
(35, 'Talle 35 para zapatillas'),
(36, 'Talle 36 para zapatillas'),
(37, 'Talle 37 para zapatillas'),
(38, 'Talle 38 para zapatillas'),
(39, 'Talle 39 para zapatillas'),
(40, 'Talle 40 para zapatillas'),
(41, 'Talle 41 para zapatillas'),
(42, 'Talle 42 para zapatillas');

INSERT INTO imagenes (nombre) VALUES
('default.png');

-- Luego de cargar estos datos, entrar en la pagina y cargar un usuario (random), entrar en la base de datos y ejecutar lo siguiente:
-- update usuarios set id_rol = 2;
-- Esto convertira al usuario creado en administrador, luego de esto cargar un producto de prueba usando la pagina