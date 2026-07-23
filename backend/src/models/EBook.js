const mongoose = require('mongoose');

const ebookSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Book title is required'], trim: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  description: { type: String },
  thumbnail: { type: String },
  pdfUrl: { type: String, required: [true, 'PDF file is required'] },
  pdfPublicId: { type: String }, // Cloudinary public_id
  fileSize: { type: Number }, // bytes
  pageCount: { type: Number },
  price: { type: Number, default: 0 },
  isFree: { type: Boolean, default: true },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  downloadCount: { type: Number, default: 0 },
  tags: [{ type: String }],
  language: { type: String, default: 'en' },
  year: { type: Number },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('EBook', ebookSchema);
