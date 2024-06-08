const express = require('express'); 
const router = express.Router();
const upload = require('../upload');
const { bucket } = require('../firebaseConfig');

router.post('/upload', upload.single('image'), async (req, res) => { 
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const folderName = 'Images'; // Specify the name of the folder
        const fileName =  req.file.originalname + '-' + Date.now();
        const filePath = `${folderName}/${fileName}`; // Construct the file path with folder name
        
        const blob = bucket.file(filePath);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
            },
            predefinedAcl: 'publicRead', // Set the file to be publicly readable
        });

        blobStream.on('error', (err) => {
            res.status(500).send(err);
        });

        blobStream.on('finish', async () => {
            // Get the public URL of the uploaded file
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
            res.status(200).send({ fileUrl: publicUrl });
        });

        blobStream.end(req.file.buffer);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Upload multiple images
router.post('/upload/multiple', upload.array('images', 10), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No files uploaded.');
        }

        const folderName = 'Images'; // Name of the folder
        
        const filePromises = req.files.map(async (file) => {
            const fileName = file.originalname + '-' + Date.now();
            const filePath = `${folderName}/${fileName}`; // File path with folder name
            
            const blob = bucket.file(filePath);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
                predefinedAcl: 'publicRead', // Setting the file to be publicly readable
            });

            return new Promise((resolve, reject) => {
                blobStream.on('error', (err) => {
                    reject(err);
                });

                blobStream.on('finish', () => {
                    // Get the public URL of the uploaded file
                    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
                    resolve(publicUrl);
                });

                blobStream.end(file.buffer);
            });
        });

        // Wait for all file uploads to complete
        const fileUrls = await Promise.all(filePromises);

        res.status(200).send({ fileUrls });
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;
