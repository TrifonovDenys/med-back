import multer from 'multer';

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {},
    filename: (req, file, cb) => {
        cb(null);
    },
});

const upload = multer({ multerStorage });
