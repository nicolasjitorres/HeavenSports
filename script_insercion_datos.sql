INSERT INTO marcas values (default, "Nike");
INSERT INTO marcas values (default, "Adidas");
INSERT INTO marcas values (default, "Formal");
INSERT INTO marcas values (default, "Converse");
INSERT INTO marcas values (default, "Puma");
INSERT INTO marcas values (default, "Disney Kids");
INSERT INTO marcas values (default, "Vans");
INSERT INTO marcas values (default, "Reebok");
/*
INSERT INTO marcas values (default, "Nike Air Force 1");
INSERT INTO marcas values (default, "Adidas Superstar");
INSERT INTO marcas values (default, "Formal Elegance");
INSERT INTO marcas values (default, "Formal Elegance II");
INSERT INTO marcas values (default, "Converse Chuck Taylor All Star");
INSERT INTO marcas values (default, "Puma RS-X Reinvention");
INSERT INTO marcas values (default, "Disney Kids Sneakers");
INSERT INTO marcas values (default, "Vans Old Skool");
INSERT INTO marcas values (default, "Reebok Nano 9");
*/
select * from marcas;


INSERT INTO imagenes values (default, "default","png");
INSERT INTO imagenes values (default, "zapa-1","jpeg");
INSERT INTO imagenes values (default, "zapa-2","jpeg");
INSERT INTO imagenes values (default, "zapa-3","jpeg");
INSERT INTO imagenes values (default, "zapa-4","jpeg");
INSERT INTO imagenes values (default, "zapa-5","jpeg");
INSERT INTO imagenes values (default, "zapa-6","jpeg");
INSERT INTO imagenes values (default, "zapa-7","jpeg");
INSERT INTO imagenes values (default, "zapa-8","jpeg");
INSERT INTO imagenes values (default, "zapa-9","jpeg");
select * from imagenes;


INSERT INTO roles values (default, "Administrador","Administra el sitio");
INSERT INTO roles values (default, "Usuario","Usuario del sitio/comprador");
select * from roles;


INSERT INTO talles values (default, "24","");
INSERT INTO talles values (default, "25","");
INSERT INTO talles values (default, "26","");
INSERT INTO talles values (default, "27","");
INSERT INTO talles values (default, "28","");
INSERT INTO talles values (default, "29","");
INSERT INTO talles values (default, "30","");
INSERT INTO talles values (default, "31","");
INSERT INTO talles values (default, "32","");
INSERT INTO talles values (default, "33","");
INSERT INTO talles values (default, "34","");
INSERT INTO talles values (default, "35","");
INSERT INTO talles values (default, "36","");
INSERT INTO talles values (default, "37","");
INSERT INTO talles values (default, "38","");
INSERT INTO talles values (default, "39","");
INSERT INTO talles values (default, "40","");
INSERT INTO talles values (default, "41","");
INSERT INTO talles values (default, "42","");
INSERT INTO talles values (default, "43","");
INSERT INTO talles values (default, "44","");
select * from talles;


INSERT INTO colores values (default, "Amarillo","#FFFF00");
INSERT INTO colores values (default, "Azul","#0000FF");
INSERT INTO colores values (default, "Blanco","#FFFFFF");
INSERT INTO colores values (default, "Gris","#808080");
INSERT INTO colores values (default, "Marrón","#A52A2A");
INSERT INTO colores values (default, "Negro","	#000000");
INSERT INTO colores values (default, "Rojo","#FF0000");
INSERT INTO colores values (default, "Rosado","#FFC0CB");
INSERT INTO colores values (default, "Verde","	#008000");
select * from colores;


INSERT INTO categorias values (default, "Casual","");
INSERT INTO categorias values (default, "Deportivo","");
INSERT INTO categorias values (default, "Formal","");
INSERT INTO categorias values (default, "Niños","");
INSERT INTO categorias values (default, "Urbano","");
select * from categorias;


INSERT INTO usuarios values (default, "Nicolas","Torres","0123456789","nicotorres@prueba.com","123","1","1");
INSERT INTO usuarios values (default, "Diego","Peralta","0123456789","diegoperalta@prueba.com","123","1","1");
INSERT INTO usuarios values (default, "Maria","Yacuk","0123456789","mariayacuk@prueba.com","123","1","1");
select * from usuarios;


INSERT INTO productos values (default, "Zapatilla Air Force 1","Zapatilla icónica de nike con suela tipo air, reconfortante y fabricada con los mejores materiales.","1");
INSERT INTO productos values (default, "Zapatilla Superstar","Zapatilla clásica de Adidas con puntera de concha","2");
INSERT INTO productos values (default, "Zapato Elegance","Zapato formal con estilo elegante","3");
INSERT INTO productos values (default, "Zapatilla Chuck Taylor All Star","Zapatilla clásica de lona con suela de goma","4");
INSERT INTO productos values (default, "Zapatilla RS-X Reinvention","Zapatilla deportiva con diseño moderno","5");
INSERT INTO productos values (default, "Zapatilla Sneakers","Zapatilla infantil con personajes de Disney","6");
INSERT INTO productos values (default, "Zapatilla Old Skool","Zapatilla clásica de skate con la icónica raya lateral","7");
INSERT INTO productos values (default, "Zapatilla Nano 9","Zapatilla de entrenamiento cruzado para rendimiento óptimo","8");
INSERT INTO productos values (default, "Zapato Elegance II","Zapato formal con diseño elegante y refinado","3");
select * from productos;


INSERT INTO producto_imagen values (default, "1","1");
INSERT INTO producto_imagen values (default, "2","2");
INSERT INTO producto_imagen values (default, "3","3");
INSERT INTO producto_imagen values (default, "4","4");
INSERT INTO producto_imagen values (default, "5","5");
INSERT INTO producto_imagen values (default, "6","6");
INSERT INTO producto_imagen values (default, "7","7");
INSERT INTO producto_imagen values (default, "8","8");
INSERT INTO producto_imagen values (default, "9","9");
select * from producto_imagen;


INSERT INTO producto_color values (default, "1","3","1600","10");
INSERT INTO producto_color values (default, "1","6","1600","10");
INSERT INTO producto_color values (default, "2","3","90","5");
INSERT INTO producto_color values (default, "2","6","90","5");
INSERT INTO producto_color values (default, "3","6","150","15");
INSERT INTO producto_color values (default, "3","5","150","15");
INSERT INTO producto_color values (default, "4","7","50","0");
INSERT INTO producto_color values (default, "4","2","50","0");
INSERT INTO producto_color values (default, "4","3","50","0");
INSERT INTO producto_color values (default, "5","6","80","20");
INSERT INTO producto_color values (default, "5","9","80","20");
INSERT INTO producto_color values (default, "5","4","80","20");
INSERT INTO producto_color values (default, "6","2","40","15");
INSERT INTO producto_color values (default, "6","8","40","15");
INSERT INTO producto_color values (default, "7","6","70","10");
INSERT INTO producto_color values (default, "7","3","70","10");
INSERT INTO producto_color values (default, "7","2","70","10");
INSERT INTO producto_color values (default, "8","4","110","15");
INSERT INTO producto_color values (default, "8","1","110","15");
INSERT INTO producto_color values (default, "8","6","110","15");
INSERT INTO producto_color values (default, "9","6","160","20");
INSERT INTO producto_color values (default, "9","5","160","20");
INSERT INTO producto_color values (default, "9","4","160","20");
select * from producto_color;


INSERT INTO producto_color_talle values (default, "1","11","3");
INSERT INTO producto_color_talle values (default, "1","20","4");
INSERT INTO producto_color_talle values (default, "2","18","2");
INSERT INTO producto_color_talle values (default, "2","19","4");
INSERT INTO producto_color_talle values (default, "2","20","1");
INSERT INTO producto_color_talle values (default, "3","17","1");
INSERT INTO producto_color_talle values (default, "4","16","2");
INSERT INTO producto_color_talle values (default, "4","14","5");
INSERT INTO producto_color_talle values (default, "5","11","3");
INSERT INTO producto_color_talle values (default, "5","20","4");
INSERT INTO producto_color_talle values (default, "6","18","2");
INSERT INTO producto_color_talle values (default, "6","19","4");
INSERT INTO producto_color_talle values (default, "6","20","1");
INSERT INTO producto_color_talle values (default, "7","17","1");
INSERT INTO producto_color_talle values (default, "8","16","2");
INSERT INTO producto_color_talle values (default, "8","14","5");
INSERT INTO producto_color_talle values (default, "9","11","3");
INSERT INTO producto_color_talle values (default, "9","20","4");
INSERT INTO producto_color_talle values (default, "10","18","2");
INSERT INTO producto_color_talle values (default, "10","19","4");
INSERT INTO producto_color_talle values (default, "10","20","1");
INSERT INTO producto_color_talle values (default, "11","17","1");
INSERT INTO producto_color_talle values (default, "12","16","2");
INSERT INTO producto_color_talle values (default, "12","14","5");
INSERT INTO producto_color_talle values (default, "13","5","2");
INSERT INTO producto_color_talle values (default, "13","8","4");
INSERT INTO producto_color_talle values (default, "14","6","1");
INSERT INTO producto_color_talle values (default, "14","4","4");
INSERT INTO producto_color_talle values (default, "15","11","3");
INSERT INTO producto_color_talle values (default, "15","20","4");
INSERT INTO producto_color_talle values (default, "16","18","2");
INSERT INTO producto_color_talle values (default, "16","19","4");
INSERT INTO producto_color_talle values (default, "16","20","1");
INSERT INTO producto_color_talle values (default, "17","17","1");
INSERT INTO producto_color_talle values (default, "18","16","2");
INSERT INTO producto_color_talle values (default, "18","14","5");
INSERT INTO producto_color_talle values (default, "19","11","3");
INSERT INTO producto_color_talle values (default, "19","20","4");
INSERT INTO producto_color_talle values (default, "20","18","2");
INSERT INTO producto_color_talle values (default, "20","19","4");
INSERT INTO producto_color_talle values (default, "21","20","1");
INSERT INTO producto_color_talle values (default, "22","17","1");
INSERT INTO producto_color_talle values (default, "23","16","2");
INSERT INTO producto_color_talle values (default, "23","14","5");
select * from producto_color_talle;


INSERT INTO producto_categoria values (default, "1","2");
INSERT INTO producto_categoria values (default, "2","1");
INSERT INTO producto_categoria values (default, "3","3");
INSERT INTO producto_categoria values (default, "4","5");
INSERT INTO producto_categoria values (default, "5","2");
INSERT INTO producto_categoria values (default, "6","4");
INSERT INTO producto_categoria values (default, "7","5");
INSERT INTO producto_categoria values (default, "8","2");
INSERT INTO producto_categoria values (default, "9","3");
select * from producto_categoria;


INSERT INTO carritos values (default, "","");
select * from carritos;


INSERT INTO carrito_producto_color_talle values (default, "","","");
INSERT INTO carrito_producto_color_talle values (default, "","","");
select * from carrito_producto_color_talle;