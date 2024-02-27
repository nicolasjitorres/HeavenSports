# SPRINT 6

Reuniones semanales, con comunicacion continua por Whatsapp.

## Reunion 1

**Peralta Diego:**

**Por motivos de salud no pude realizar las tareas que se me asignaron (-Scipt de datos y -CRUD) los cuales fueron realizados por Yacuk Maria y Torres Nicolas**

- Que se hizo ayer: 
- Impedimentos: -
- Que se hara:                            

**Torres Nicolas:**
- Que se hizo ayer: Creacion del esquema de la base de datos, dibujo del modelo relacional y carga del script de datos.
- Impedimentos: Las relaciones se complicaron bastante, aunque se pre-supone que puede haber cambios mas adelante, por lo que tomamos esta BD como "prueba".                             
- Que se hara: Diseño del CRUD de productos, implementando sequelize.              

**Yacuk Maria:**
- Que se hizo ayer: Resumen y carga de tareas en Trello.
- Impedimentos: -
- Que se hara: Creación de la carpeta database que incluye los archivos de configuracion de Sequelize y los archivos de modelos que representan a las tablas junto con sus relaciones.


## Reunion 2:

**Peralta Diego:**
- Que se hizo ayer: 
- Impedimentos: -
- Que se hara: Actualizacion del retro.md y el daily/weekly.md.

**Torres Nicolas:**
- Que se hizo ayer: Implementar sequelize en el CRUD de usuarios y productos, creacion de nuevas vistas que sirven para la edicion de productos ( y sus relacions), y para la edicion de usuarios. Se implemento la funcionalidad del carrito de compras. Se actualizaron algunos diseños e implementaron nuevas disposiciones de elementos. Se actualizo la forma de trabajar con cookies, porque se encontro una vulnerabilidad por la que podrian peligrar los datos de los usuarios.
- Impedimentos: Mas que nada a la hora de implementar el CRUD utilizando sequelize, los async await y  try-catch, generaron bastantes incovenientes a la hora de realizar las tareas acordadas, por lo que se puso en primer lugar el backend. Mas adelante se realizaran las correcciones competentes en cuanto al frontend.
- Que se hara: Terminar de pulir detalles y realizar unas cuantas pruebas de software para verificar el funcionamiento.

**Yacuk Maria:**
- Que se hizo ayer: Script data.sql para poblar las tablas. Actualizacion del archivo structure.sql y DER. 
- Impedimentos: -
- Que se hara: Actualizacion de Trello.

-------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------


# SPRINT 5

Reuniones semanales, con comunicacion continua por Whatsapp.

## Reunion 1

**Peralta Diego:**
- Que se hizo ayer: Creacion del metodo para listar todos los usuarios registrados, la vista 'usuarios.ejs' y detail de cada usuario.
- Impedimentos: -
- Que se hara: Edicion de la vista 'info/about.ejs'.

**Torres Nicolas:**
- Que se hizo ayer: Distribucion de tareas y detalles en el tablero de trabajo. Correcciones de estilos pendientes.
- Impedimentos:
- Que se hara: Creacion de la rama para poder realizar la implementacion del 'create' de usuario y la vista 'register.ejs'.

**Yacuk Maria:**
- Que se hizo ayer: Creacion de los metodos correspondientes para el detalle del usuario y la vista 'profile.ejs'. Creacion del metodo delete.Validaciones en userRoutes (falta en el controller y en el formulario).
- Impedimentos: -
- Que se hara: Acomodado de userDatabase.json y modificacion del metodo saveUser para que mantenga el orden. Creacion del metodo "generateId".Verificacion en userController de si el email no existe ya en la BD. Movida de multer a la nueva carpeta "Middlewares".


## Reunion 2:

**Peralta Diego:**
- Que se hizo ayer: Pair Programming con middlewares de admin.
- Impedimentos: -
- Que se hara: visibilidad de los botones de edicion y eliminar en el detail del producto solo para admin. Creacion de la vista 'info/error.ejs' a la cual se redireccionara al usuario cuando no tenga los permisos para acceder a la ruta.

**Torres Nicolas:**
- Que se hizo ayer: Correcion de estilos y rutas pendientes.
- Impedimentos:
- Que se hara: Implementacion de la funcion 'login' de usuario, que tendra como objetivo permitir a un usuario loguearse por si mismo dentro de la pagina una vez realizado el registro. Implementacion de cookies y session para poder restringir el acceso a los usuarios a ciertas vistas que no esten permitidas ver, y para que se muestre una vista cada vez que se entre a una ruta que no este definida.

**Yacuk Maria:**
- Que se hizo ayer: Pair Programming con middlewares de admin.
- Impedimentos: -
- Que se hara: visibilidad de los botones de edicion en el detail del producto solo para admin. Vista del profile adicional para admin.

-------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------

# SPRINT 4

Reuniones semanales, con comunicacion continua por Whatsapp.

Se puede resumir en lo siguiente:

## Reunion 1

**Peralta Diego:**
- Que se hizo ayer:  Vista dinamica del index.
- Impedimentos: -
- Que se hara: Edicion de estilos en home y formularios. Retoques en la vista index.

**Torres Nicolas:**
- Que se hizo ayer: Distribucion de tareas y detalles en el tablero de trabajo. Correcciones de estilos pendientes.
- Impedimentos: Algunas rutas y botones no funcionales. Esto fue detallado en el tablero de trabajo.
- Que se hara: CRUD: metodos GET, POST y PUT para la creacion y edicion de un producto. Adecuacion para carga de imagenes y reemplazo en la edicion.

**Yacuk Maria:**
- Que se hizo ayer: Implementacion del Feedback del Sprint 3.
- Impedimentos: - 
- Que se hara: Actualizacion y retoques de tarjetas en Trello.


## Reunion 2:

**Peralta Diego:**
- Que se hizo ayer: CRUD: metodo Get de un producto invividual para mostrar su detalle.
- Impedimentos: -
- Que se hara: Implementacion de muestreo dinamico del detalle de un producto (ruta parametrizada).

**Torres Nicolas:**
- Que se hizo ayer: Correccion de estilos en pagina de carga y edicion. Finalizacion de la pagina "About".
- Impedimentos: Coordinar los estilos para hacerlos amigables, pero no pesados, usando como referencia otras paginas.
- Que se hara: Control general.

**Yacuk Maria:**
- Que se hizo ayer: CRUD: metodo DELETE. Implementacion de la accion para borrado de un producto. Correccion de algunas rutas. Retoques en tablero de trabajo.
- Impedimentos: -
- Que se hara: Actualizacion del retro.md y el daily/weekly.md.

-------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------

# SPRINT 3

Las reuniones no fueron homogeneas, con esto me refiero no fueron necesariamente diarias, ni estuvieron todos los integrantes del grupo, pero nos mantuvimos en contacto a traves del grupo de Whatsapp.

Se puede resumir en lo siguiente:

## Reunion 1

**Peralta Diego:**
- Que se hizo ayer: Revision del feedback del Sprint 2. Actualizacion de tareas globales en el trello.
- Impedimentos: -
- Que se hara: Cambios en el trabajo aplicando correcciones de acuerdo al feedback del Sprint 2.

**Sandez Matias:**
- Que se hizo ayer: Revision del feedback del Sprint 2.
- Impedimentos: -
- Que se hara: 

**Torres Nicolas:**
- Que se hizo ayer: Revision del feedback del Sprint 2.
- Impedimentos: -
- Que se hara: Cambios en el trabajo aplicando correcciones de acuerdo al feedback del Sprint 2.

**Yacuk Maria:**
- Que se hizo ayer: Revision del feedback del Sprint 2.
- Impedimentos: -
- Que se hara: Repaso de conceptos para aplicar al nuevo sprint.


## Reunion 2:

**Peralta Diego:**
- Que se hizo ayer: Arreglos en el formulario de login, register, el carrito, el formulario de carga de producto, footer.
- Impedimentos: -
- Que se hara: Formulario para cargar y editar productos, en ejs con estilos e imagenes.

**Sandez Matias:**
- Que se hizo ayer:
- Impedimentos:
- Que se hara:

**Torres Nicolas:**
- Que se hizo ayer: Actualizacion de estilos en el home. Implementacion con template engines. Ordenamiento de carpetas y archivos para adecuarse al template.
- Impedimentos: -
- Que se hara: Correcciones y actualizaciones varias.

**Yacuk Maria:**
- Que se hizo ayer: Creacion de los parciales head, header y footer, e implementacion de estilos en todas las paginas para adecurse a los parciales. 
- Impedimentos: -
- Que se hara: Plasmado de conclusiones de las reuniones. Revision de los items pedidos en el enunciado del Sprint 3 para completar algunos faltantes.