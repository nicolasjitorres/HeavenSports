const path = require('path');
const multer = require('multer');

const multerMiddleware = (name) => {
	const imgStorage = path.join(__dirname, `../../public/images/${name}`);
	var mDStorage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, imgStorage);
		},
		filename: function (req, file, cb) {
			cb(null, name + '-' + Date.now() + path.extname(file.originalname));
		}
	});

	return multer({
		storage: mDStorage
	});
}


module.exports = multerMiddleware;