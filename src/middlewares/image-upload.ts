import multer, { diskStorage } from 'multer';


export const uploadImage = (uploadPath: string) => {
  const storage = diskStorage({
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}.${file.originalname?.split('.')[1]}`;
      cb(null, fileName);
    },
    destination: uploadPath,
  });
  return multer({
    storage, 
    fileFilter(req, file, callback) {
      const validMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'] as const;
      if (!(validMimeTypes.find(mimeType => mimeType === file.mimetype))) {
        callback(new Error(`Image can only be of the following formats, ${validMimeTypes.join(' ')}`));
        return;
      }
      callback(null, true);
    },
  });
};