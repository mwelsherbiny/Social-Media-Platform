import multer from "multer";

const maxFileSize = 10 * 1024 * 1024; // 10MB

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const imageUpload = multer({
  fileFilter,
  storage,
  limits: {
    fileSize: maxFileSize,
  },
});
export default imageUpload;
