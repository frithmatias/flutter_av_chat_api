// /api/auth
const { Router } = require('express');
const { check } = require('express-validator');


const router = Router(); // es una función no es una clase.

const authController = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { verificaToken } = require('../middlewares/validar-jwt');

router.post('/register', [

    // middlewares 
    check('name', 'El nombre es obligatorio').not().isEmpty(), // chequea que exista el campo password
    check('email', 'El email es obligatorio').isEmail(), // chequea que exista el campo email y sea válido
    check('password', 'El password es obligatorio').not().isEmpty(), // chequea que exista el campo password
    validarCampos

], authController.registerUser);


router.post('/login', [

    // middlewares 
    check('email', 'El email es obligatorio').isEmail(), // chequea que exista el campo email y sea válido
    check('password', 'El password es obligatorio').not().isEmpty(), // chequea que exista el campo password
    validarCampos

], authController.loginUser);


router.get('/newtoken', verificaToken, authController.newToken);

module.exports = router;

