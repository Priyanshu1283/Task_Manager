const { Router } = require('express');
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require('../controllers/task.controller');
const verifyJWT = require('../middlewares/auth.middleware');
const { taskValidator } = require('../validators/auth.validator');

const router = Router();

router.use(verifyJWT); // Secure all task routes

router.post('/', taskValidator, createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/:id', taskValidator, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
