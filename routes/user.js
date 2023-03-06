const {Router} = require('express');
const { usersGet, usersPost, usersDelete, usersPatch } = require('../controllers/user');
const router = Router();

router.get('/', usersGet);
router.post('/', usersPost);
router.delete('/', usersDelete);
router.patch('/', usersPatch);
router.put('/', (req, res) => {
    res.json({
        msg: 'hola'
    })
  })

module.exports = router;