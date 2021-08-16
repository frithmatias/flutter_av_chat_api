const { Router } = require('express');
const router = Router(); // es una función no es una clase.

const messagesController = require('../controllers/messages');
const { verificaToken } = require('../middlewares/validar-jwt');

router.get('/:idTo', verificaToken, messagesController.getMessages);

module.exports = router;

