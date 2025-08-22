import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const multerMiddleware = (name) => {
	const imgStorage = path.join(__dirname, `../../public/images/${name}`);
	var mDStorage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, imgStorage);
		},
		filename: function (req, file, cb) {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
			cb(null, name + '-' + uniqueSuffix + path.extname(file.originalname));
		}
	});

	return multer({
		storage: mDStorage
	});
}


export default multerMiddleware;