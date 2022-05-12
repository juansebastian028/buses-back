const { Router } = require('express');

const { validateUploadFile } = require('../middlewares');
const { cargarArchivo, showImage } = require('../controllers/uploads');


const router = Router();

router.post( '/', validateUploadFile, cargarArchivo );
router.get('/:file', showImage  )

module.exports = router;