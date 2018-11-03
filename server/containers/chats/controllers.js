const express = require('express');
const router = express.Router();
const services = require('./services');
const fs = require('fs');

const tryRequire = (path) => {
    try {
        return require(`${path}`);
    } catch (err) {
        return null;
    }
};
// const storage = multer.diskStorage({
//     destination : (req,file,cb)=>{
//       cb(null,'../public/img/upload/');
//     },
//     filename : (req,file,cb)=>{
//       cb(null,'image-' + file.originalname);
//     }
//   })
//   const upload = multer({storage: storage});
//   ,upload.single('selectedFile')
// routes
router.get('/getAll', getAll);
router.post('/add', addRoom);
router.post('/uploadImage', uploadImage);
// ,
function addRoom(req, res, next) {
    services.create(req.body)
    .then(() => {
        let imageFile = req.files.imageFile;
        let imageName = `${imageFile.name}`;
        let isExistImage = fs.existsSync(`../public/img/upload/${imageName}`);

        //not exist then save image to folder
        if (!isExistImage) {
            imageFile.mv(`../public/img/upload/${imageName}`);
        }

        res.json({ 'success': 'success' })
    })
    .catch(err => next(err));
    // let imageFile = req.files.selectedFile;
}
function getAll(req, res, next) {
    services.getAll()
        .then(rooms => res.json(rooms))
        .catch(err => next(err));
}
function uploadImage(req, res, next) {
    let imageFile = req.files.selectedFile;
    let imageName = `image-${imageFile.name}`;
    let isExistImage = fs.existsSync(`../public/img/upload/${imageName}`);

    //not exist then save image to folder
    if (!isExistImage) {
        imageFile.mv(`../public/img/upload/${imageName}`);
    }

    return res.json({ imageName: imageName });
}
module.exports = router;