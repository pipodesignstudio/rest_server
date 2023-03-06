const { Router } = require('express');
const { usersGet, usersPost, usersDelete, usersPatch, usersPut } = require('../controllers/user');
const router = Router();

router.get('/', usersGet);
router.post('/', usersPost);
router.delete('/', usersDelete);
router.patch('/', usersPatch);
router.put('/:id', usersPut)

module.exports = router;