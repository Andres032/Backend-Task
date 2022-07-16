const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const { crearTask, actualizarEstado} = require('../controllers/task');
const { getTask } = require('../controllers/task');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Obtener tareas
router.get('/', getTask);

// Crear una tarea
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearTask
);

router.patch('/:id', actualizarEstado );

module.exports = router;