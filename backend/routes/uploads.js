import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
const schoolDocumentsDir = path.join(uploadsDir, 'school_documents');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(schoolDocumentsDir)) {
  fs.mkdirSync(schoolDocumentsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create school-specific folder
    const mobile = req.params.mobile;
    const schoolDir = path.join(schoolDocumentsDir, mobile);

    if (!fs.existsSync(schoolDir)) {
      fs.mkdirSync(schoolDir, { recursive: true });
    }

    cb(null, schoolDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension);
    cb(null, `${basename}-${uniqueSuffix}${extension}`);
  }
});

// File filter to allow only PDFs, DOC, DOCX, and images
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/jpg',
    'image/png'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, DOCX, JPEG, JPG, and PNG files are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

/**
 * POST /api/uploads/:mobile/document
 * Upload a single document file
 */
router.post('/:mobile/document', upload.single('document'), (req, res) => {
  try {
    const { mobile } = req.params;

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid mobile number format'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        ok: false,
        error: 'No file uploaded'
      });
    }

    // Return file information
    const fileInfo = {
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploadedAt: new Date().toISOString()
    };

    res.json({
      ok: true,
      message: 'File uploaded successfully',
      file: fileInfo
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to upload file: ' + error.message
    });
  }
});

/**
 * POST /api/uploads/:mobile/documents
 * Upload multiple document files
 */
router.post('/:mobile/documents', upload.array('documents', 20), (req, res) => {
  try {
    const { mobile } = req.params;

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid mobile number format'
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        ok: false,
        error: 'No files uploaded'
      });
    }

    // Return information for all uploaded files
    const filesInfo = req.files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
      uploadedAt: new Date().toISOString()
    }));

    res.json({
      ok: true,
      message: `${req.files.length} files uploaded successfully`,
      files: filesInfo
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to upload files: ' + error.message
    });
  }
});

/**
 * GET /api/uploads/:mobile/documents
 * List all documents for a school
 */
router.get('/:mobile/documents', (req, res) => {
  try {
    const { mobile } = req.params;

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid mobile number format'
      });
    }

    const schoolDir = path.join(schoolDocumentsDir, mobile);

    if (!fs.existsSync(schoolDir)) {
      return res.json({
        ok: true,
        documents: []
      });
    }

    const files = fs.readdirSync(schoolDir);
    const documents = files.map(filename => {
      const filePath = path.join(schoolDir, filename);
      const stats = fs.statSync(filePath);

      return {
        filename,
        path: filePath,
        size: stats.size,
        uploadedAt: stats.mtime.toISOString()
      };
    });

    res.json({
      ok: true,
      documents
    });
  } catch (error) {
    console.error('Error listing documents:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to list documents: ' + error.message
    });
  }
});

/**
 * DELETE /api/uploads/:mobile/document/:filename
 * Delete a specific document
 */
router.delete('/:mobile/document/:filename', (req, res) => {
  try {
    const { mobile, filename } = req.params;

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid mobile number format'
      });
    }

    const filePath = path.join(schoolDocumentsDir, mobile, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        ok: false,
        error: 'File not found'
      });
    }

    fs.unlinkSync(filePath);

    res.json({
      ok: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to delete file: ' + error.message
    });
  }
});

export default router;
