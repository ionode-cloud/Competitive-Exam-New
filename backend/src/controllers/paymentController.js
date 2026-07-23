const Purchase = require('../models/Purchase');
const Payment = require('../models/Payment');
const User = require('../models/User');
const MockTest = require('../models/MockTest');
const { paginate, paginateResponse } = require('../utils/pagination');

// ===== ORDERS =====

exports.getOrders = async (req, res, next) => {
  try {
    const { search, status, productType, page = 1, limit = 10, sort = '-createdAt' } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (productType) filter.productType = productType;
    if (search) filter.orderId = { $regex: search, $options: 'i' };

    const { skip, limit: lim } = paginate(null, page, limit);
    const [data, total] = await Promise.all([
      Purchase.find(filter).sort(sort).skip(skip).limit(lim)
        .populate('student', 'name email')
        .populate('paymentId'),
      Purchase.countDocuments(filter),
    ]);
    res.json({ success: true, ...paginateResponse(data, total, page, lim) });
  } catch (err) { next(err); }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Purchase.findById(req.params.id)
      .populate('student', 'name email phone')
      .populate('paymentId');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: order });
  } catch (err) { next(err); }
};

exports.refundOrder = async (req, res, next) => {
  try {
    const order = await Purchase.findByIdAndUpdate(req.params.id,
      { status: 'refunded' },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: order, message: 'Order marked as refunded' });
  } catch (err) { next(err); }
};

// ===== PAYMENTS =====

exports.getPayments = async (req, res, next) => {
  try {
    const { status, method, page = 1, limit = 10, sort = '-createdAt' } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (method) filter.method = method;

    const { skip, limit: lim } = paginate(null, page, limit);
    const [data, total] = await Promise.all([
      Payment.find(filter).sort(sort).skip(skip).limit(lim)
        .populate('student', 'name email')
        .populate('purchase', 'orderId productName'),
      Payment.countDocuments(filter),
    ]);
    res.json({ success: true, ...paginateResponse(data, total, page, lim) });
  } catch (err) { next(err); }
};

// Razorpay webhook handler
exports.razorpayWebhook = async (req, res, next) => {
  try {
    const event = req.body.event;
    const payload = req.body.payload;

    if (event === 'payment.captured') {
      const paymentData = payload.payment.entity;
      await Payment.findOneAndUpdate(
        { razorpayPaymentId: paymentData.id },
        { status: 'captured', method: paymentData.method },
        { upsert: true }
      );
      // Update purchase status
      if (paymentData.order_id) {
        await Purchase.findOneAndUpdate(
          { razorpayOrderId: paymentData.order_id },
          { status: 'completed', razorpayPaymentId: paymentData.id }
        );
      }
    }

    if (event === 'payment.failed') {
      const paymentData = payload.payment.entity;
      await Payment.findOneAndUpdate(
        { razorpayPaymentId: paymentData.id },
        { status: 'failed', errorCode: paymentData.error_code, errorDescription: paymentData.error_description }
      );
    }

    res.json({ status: 'ok' });
  } catch (err) { next(err); }
};

// Revenue summary
exports.getRevenueStats = async (req, res, next) => {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [todayRevenue, monthRevenue, totalRevenue] = await Promise.all([
      Purchase.aggregate([
        { $match: { status: 'completed', createdAt: { $gte: todayStart } } },
        { $group: { _id: null, total: { $sum: '$finalAmount' } } },
      ]),
      Purchase.aggregate([
        { $match: { status: 'completed', createdAt: { $gte: monthStart } } },
        { $group: { _id: null, total: { $sum: '$finalAmount' } } },
      ]),
      Purchase.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$finalAmount' } } },
      ]),
    ]);

    res.json({
      success: true,
      data: {
        today: todayRevenue[0]?.total || 0,
        thisMonth: monthRevenue[0]?.total || 0,
        total: totalRevenue[0]?.total || 0,
      },
    });
  } catch (err) { next(err); }
};
