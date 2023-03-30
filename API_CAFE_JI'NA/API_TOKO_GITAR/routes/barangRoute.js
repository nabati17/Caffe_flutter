const router = require('express').Router();
const barangController = require('../controllers/barangController')
const utilApps = require('../utils/utils_apps')
const multer = require('multer');
const BarangModel = require('../models/BarangModel');
const { isObjectIdOrHexString } = require('mongoose');
const uploadFile = multer({
    storage: utilApps.uploadFile
}).single('gambar');

router.post('/input', uploadFile, (req, res) => {
    if(req.file === undefined) {
        res.json({
            status: false,
            msg: 'File Tidak Boleh Kosong'
        })
    } else {
        req.body.gambar = req.file.filename
    }

    barangController.input(req.body)
    .then(result =>{
        res.json(result);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/get-all-menu', (req, res) => {
    barangController.getAllMenu()
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json(err);
        });
    });

    router.get('/get-barang-by-id/:idBarang', (req, res) => {
        barangController.getBarangById(req.params.idBarang)
            .then((result) => {
                res.json(result);
            }).catch((err) => {
                res.json(err);
            });
        });

router.put('/update/:idBarang', uploadFile, (req, res) => {
    if(req.file !== undefined) {
        req.body.gambar = req.file.filename
    }

    barangController.update(req.params.idBarang, req.body)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(err);
    });
})

router.delete('/delete-data/:idBarang', (req,res) => {
    barangController.deleteData(req.params.idBarang)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(err);
    });
})

module.exports = router;