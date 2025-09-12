import db from "./models/index.js";
import { Sequelize } from "sequelize";

(async () => {
  try {
    const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: "127.0.0.1",
        dialect: process.env.DB_DIALECT,
      }
    );

    await sequelize.authenticate();
    console.log("Conexión establecida a MySQL");

    await db.sequelize.sync({ force: true }); // alter para actualizar tablas sin perder datos
    console.log("Tablas creadas.");
    process.exit(0);
  } catch (err) {
    console.error("Error al inicializar la BD:", err);
    process.exit(1);
  }
})();
