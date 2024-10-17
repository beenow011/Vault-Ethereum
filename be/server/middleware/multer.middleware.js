const multer = require('multer');

// Store the file data in memory for encryption
const storage = () => multer.memoryStorage();

// Expect a file upload with the field name 'file'
module.exports = { uploadUserImage: multer({ storage: storage() }).single('file') }; 
