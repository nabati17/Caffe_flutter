const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/registrasi',(req,res) => {
    userController.registrasi(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.json(error);
        });
});

router.post('/login',(req,res) => {
    userController.login(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.json(error);
        });
});

module.exports = router;