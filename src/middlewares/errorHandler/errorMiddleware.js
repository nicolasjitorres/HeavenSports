export default (err, req, res, next) => {
  console.error(err.stack || err);
  
  res
    .status(500)
    .render("info/error", { message: "Error interno del servidor" });
};
