const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    let foodName = req.body.name || 'file';
    foodName = foodName.toLowerCase().replace(/\s+/g, '');
    cb(null, foodName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
