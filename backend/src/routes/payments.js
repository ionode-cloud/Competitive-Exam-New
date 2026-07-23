const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/rbac');

router.get('/', protect, adminOnly, ctrl.getPayments);
router.get('/stats/revenue', protect, adminOnly, ctrl.getRevenueStats);
router.post('/webhook', ctrl.razorpayWebhook);

module.exports = router;
