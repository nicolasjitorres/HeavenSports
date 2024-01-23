const path = require('path');
const multer = require('multer');

const imgStorage = path.join(__dirname, '../../public/images/users');
var mDStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, imgStorage);
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: mDStorage});

module.exports = upload;