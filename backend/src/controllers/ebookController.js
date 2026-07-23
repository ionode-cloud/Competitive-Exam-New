const EBook = require('../models/EBook');
const { paginate, paginateResponse } = require('../utils/pagination');
const path = require('path');

exports.getEBooks = async (req, res, next) => {
  try {
    const { search, subject, status, page = 1, limit = 10, sort = '-createdAt' } = req.query;
    const filter = {};
    if (search) filter.title = { $regex: search, $options: 'i' };
    if (subject) filter.subject = subject;
    if (status) filter.status = status;
    const { skip, limit: lim } = paginate(null, page, limit);
    const [data, total] = await Promise.all([
      EBook.find(filter).sort(sort).skip(skip).limit(lim).populate('subject', 'name').populate('createdBy', 'name'),
      EBook.countDocuments(filter),
    ]);
    res.json({ success: true, ...paginateResponse(data, total, page, lim) });
  } catch (err) { next(err); }
};

exports.getEBook = async (req, res, next) => {
  try {
    const ebook = await EBook.findById(req.params.id).populate('subject', 'name').populate('createdBy', 'name');
    if (!ebook) return res.status(404).json({ success: false, message: 'EBook not found' });
    res.json({ success: true, data: ebook });
  } catch (err) { next(err); }
};

exports.createEBook = async (req, res, next) => {
  try {
    const ebookData = { ...req.body, createdBy: req.user._id };

    if (req.files?.pdf?.[0]) {
      ebookData.pdfUrl = `${req.protocol}://${req.get('host')}/uploads/pdfs/${path.basename(req.files.pdf[0].path)}`;
      ebookData.fileSize = req.files.pdf[0].size;
    }
    if (req.files?.thumbnail?.[0]) {
      ebookData.thumbnail = `${req.protocol}://${req.get('host')}/uploads/images/${path.basename(req.files.thumbnail[0].path)}`;
    }

    const ebook = await EBook.create(ebookData);
    res.status(201).json({ success: true, data: ebook });
  } catch (err) { next(err); }
};

exports.updateEBook = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (req.files?.pdf?.[0]) {
      updateData.pdfUrl = `${req.protocol}://${req.get('host')}/uploads/pdfs/${path.basename(req.files.pdf[0].path)}`;
      updateData.fileSize = req.files.pdf[0].size;
    }
    if (req.files?.thumbnail?.[0]) {
      updateData.thumbnail = `${req.protocol}://${req.get('host')}/uploads/images/${path.basename(req.files.thumbnail[0].path)}`;
    }
    const ebook = await EBook.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!ebook) return res.status(404).json({ success: false, message: 'EBook not found' });
    res.json({ success: true, data: ebook });
  } catch (err) { next(err); }
};

exports.deleteEBook = async (req, res, next) => {
  try {
    const ebook = await EBook.findById(req.params.id);
    if (!ebook) return res.status(404).json({ success: false, message: 'EBook not found' });
    await ebook.deleteOne();
    res.json({ success: true, message: 'EBook deleted' });
  } catch (err) { next(err); }
};

exports.incrementDownload = async (req, res, next) => {
  try {
    const ebook = await EBook.findByIdAndUpdate(req.params.id, { $inc: { downloadCount: 1 } }, { new: true });
    res.json({ success: true, data: ebook });
  } catch (err) { next(err); }
};
