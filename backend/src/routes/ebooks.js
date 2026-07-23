const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ebookController');
const { protect } = require('../middleware/auth');
const { adminOnly, contentManager } = require('../middleware/rbac');
const { uploadMultiple } = require('../middleware/upload');

router.get('/', protect, adminOnly, ctrl.getEBooks);
router.get('/:id', protect, adminOnly, ctrl.getEBook);
router.post('/', protect, contentManager, uploadMultiple, ctrl.createEBook);
router.put('/:id', protect, contentManager, uploadMultiple, ctrl.updateEBook);
router.delete('/:id', protect, contentManager, ctrl.deleteEBook);
router.patch('/:id/download', ctrl.incrementDownload);

module.exports = router;
