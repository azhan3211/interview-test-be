const express = require('express');
const noteController = require('../controller/notecontroller');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/notes/', authenticateToken, noteController.create);
router.get('/notes/', authenticateToken, noteController.getAll);
router.get('/notes/:id', authenticateToken, noteController.getNoteById);
router.put('/notes/:id', authenticateToken, noteController.update);
router.delete('/notes/:id', authenticateToken, noteController.delete);

module.exports = router;
