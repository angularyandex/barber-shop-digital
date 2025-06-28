import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

// Настройка Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Настройка multer для загрузки в память
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Проверка типа файла
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Можно загружать только изображения'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Загрузка изображения в Cloudinary
export const uploadToCloudinary = async (buffer, folder = 'beauty-salon') => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { width: 800, height: 600, crop: 'limit' },
          { quality: 'auto' },
          { format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    ).end(buffer);
  });
};

// Удаление изображения из Cloudinary
export const deleteFromCloudinary = async (imageUrl) => {
  try {
    // Извлечение public_id из URL
    const publicId = imageUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`beauty-salon/${publicId}`);
  } catch (error) {
    console.error('Ошибка удаления изображения:', error);
  }
};

// Middleware для загрузки одного изображения
export const uploadSingle = (fieldName) => {
  return async (req, res, next) => {
    upload.single(fieldName)(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      if (req.file) {
        try {
          const imageUrl = await uploadToCloudinary(req.file.buffer);
          req.body[fieldName] = imageUrl;
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: 'Ошибка загрузки изображения'
          });
        }
      }

      next();
    });
  };
};

// Middleware для загрузки нескольких изображений
export const uploadMultiple = (fieldName, maxCount = 5) => {
  return async (req, res, next) => {
    upload.array(fieldName, maxCount)(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      if (req.files && req.files.length > 0) {
        try {
          const imageUrls = await Promise.all(
            req.files.map(file => uploadToCloudinary(file.buffer))
          );
          req.body[fieldName] = imageUrls;
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: 'Ошибка загрузки изображений'
          });
        }
      }

      next();
    });
  };
};