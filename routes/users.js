/* 
    path: api/users
*/

const { Router } = require('express');
const router = Router(); // es una función no es una clase.

const usersController = require('../controllers/users');
const { verificaToken } = require('../middlewares/validar-jwt');

router.get('/', verificaToken, usersController.getUsuarios);

module.exports = router;

